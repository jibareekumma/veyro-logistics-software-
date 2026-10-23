


import "../../stylings/shipments/PartyDetails.css"

import { countries, savedAddresses } from "./shipmentHelpers";
import { UserIcon } from "./ShipmentIcons";

const PartyDetails = function({ section, title, subtitle, placeholders, data, errors, onChange }){

    const handleText = function(field){
        return function(e){
            onChange({ [field]: e.target.value });
        };
    };

    const handlePhone = function(e){
        onChange({ phone: e.target.value.replace(/[^\d+\s()-]/g, '') });
    };

    const handleLocation = function(field){
        return function(e){
            onChange({ [field]: e.target.value, useSaved: false });
        };
    };

    const handleSaved = function(e){
        if (e.target.checked) {
            onChange({ ...savedAddresses[section], useSaved: true });
            return;
        }
        onChange({ address: '', city: '', country: '', useSaved: false });
    };

    const renderInput = function(field, label, placeholder, type, handler){
        return (
            <div className={`item item-${field} ${errors[field] ? 'has-error' : ''}`}>
                <label htmlFor={`${section}-${field}`}>{label}</label>
                <input
                    id={`${section}-${field}`}
                    type={type}
                    placeholder={placeholder}
                    value={data[field]}
                    onChange={handler}
                />
                {errors[field] && <span className="field-error">{errors[field]}</span>}
            </div>
        );
    };

    return <>

        <div className="party-details">
            <div className="headings">
                <div className="icons">
                    <UserIcon/>
                </div>
                <div className="texts">
                    <h5>{title}</h5>
                    <p>{subtitle}</p>
                </div>
                <label className="saved-address">
                    <input type="checkbox" checked={data.useSaved} onChange={handleSaved} />
                    <span>Use saved address</span>
                </label>
            </div>

            <form onSubmit={function(e){ e.preventDefault(); }} noValidate>
                {renderInput('fullName', 'Full Name *', placeholders.fullName, 'text', handleText('fullName'))}
                {renderInput('phone', 'Phone Number *', placeholders.phone, 'tel', handlePhone)}
                {renderInput('email', 'Email (optional)', placeholders.email, 'email', handleText('email'))}
                {renderInput('address', 'Address *', placeholders.address, 'text', handleLocation('address'))}
                {renderInput('city', 'City *', placeholders.city, 'text', handleLocation('city'))}

                <div className={`item item-country ${errors.country ? 'has-error' : ''}`}>
                    <label htmlFor={`${section}-country`}>Country *</label>
                    <select
                        id={`${section}-country`}
                        className={data.country === '' ? 'is-empty' : ''}
                        value={data.country}
                        onChange={handleLocation('country')}
                    >
                        <option value="" disabled>Select country</option>
                        {countries.map(function(country){
                            return <option key={country} value={country}>{country}</option>;
                        })}
                    </select>
                    {errors.country && <span className="field-error">{errors.country}</span>}
                </div>
            </form>
        </div>

    </>
}


export default PartyDetails;