

import packageIcon from "../../assets/icons/nav-shipments.png"

import "../../stylings/shipments/PackageDetails.scss"

import PackagePhotos from "./PackagePhotos";
import { categories } from "./ShipmentHelpers.js";

const PackageDetails = function({ data, errors, onChange, photos, setPhotos }){

    const handleNumber = function(field){
        return function(e){
            const cleaned = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            onChange({ [field]: cleaned });
        };
    };

    const toggleFragile = function(){
        onChange({ fragile: !data.fragile });
    };

    const dimensionError = errors.length || errors.width || errors.height;

    return<>

        <div className="package-details">
            <div className="headings">
                <div className="icons">
                    <img src={packageIcon} alt="Package Icon" />
                </div>
                <div className="texts">
                    <h5>Package Details</h5>
                    <p>Tell us what you're shipping</p>
                </div>
            </div>

            <form onSubmit={function(e){ e.preventDefault(); }} noValidate>
                <div className={`item item-description ${errors.description ? 'has-error' : ''}`}>
                    <label htmlFor="package-description">Item / Description *</label>
                    <input
                        id="package-description"
                        type="text"
                        placeholder="e.g. Laptop, Clothing, Office Supplies"
                        value={data.description}
                        onChange={function(e){ onChange({ description: e.target.value }); }}
                    />
                    {errors.description && <span className="field-error">{errors.description}</span>}
                </div>

                <div className={`item item-category ${errors.category ? 'has-error' : ''}`}>
                    <label htmlFor="package-category">Category *</label>
                    <select
                        id="package-category"
                        className={data.category === '' ? 'is-empty' : ''}
                        value={data.category}
                        onChange={function(e){ onChange({ category: e.target.value }); }}
                    >
                        <option value="" disabled>Select category</option>
                        {categories.map(function(category){
                            return <option key={category} value={category}>{category}</option>;
                        })}
                    </select>
                    {errors.category && <span className="field-error">{errors.category}</span>}
                </div>

                <div className="item-physics">
                    <div className={`item-weight ${errors.weight ? 'has-error' : ''}`}>
                        <label htmlFor="package-weight">Weight(kg) *</label>
                        <input
                            id="package-weight"
                            type="text"
                            inputMode="decimal"
                            placeholder="e.g. 2.5"
                            value={data.weight}
                            onChange={handleNumber('weight')}
                        />
                        {errors.weight && <span className="field-error">{errors.weight}</span>}
                    </div>
                    <div className={`item-dimension ${dimensionError ? 'has-error' : ''}`}>
                        <label>Dimension(cm) *</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            placeholder="L(cm)"
                            aria-label="Length in centimetres"
                            value={data.length}
                            onChange={handleNumber('length')}
                        />
                        <input
                            type="text"
                            inputMode="decimal"
                            placeholder="W(cm)"
                            aria-label="Width in centimetres"
                            value={data.width}
                            onChange={handleNumber('width')}
                        />
                        <input
                            type="text"
                            inputMode="decimal"
                            placeholder="H(cm)"
                            aria-label="Height in centimetres"
                            value={data.height}
                            onChange={handleNumber('height')}
                        />
                        {dimensionError && <span className="field-error">{dimensionError}</span>}
                    </div>
                </div>

                <div className="fragile">
                    <h5>Fragile</h5>
                    <div
                        className="toggle-container"
                        role="switch"
                        aria-checked={data.fragile}
                        tabIndex={0}
                        onClick={toggleFragile}
                        onKeyDown={function(e){
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleFragile();
                            }
                        }}
                    >
                        <div className={`toggle-switch ${data.fragile ? 'active' : ''}`}>
                            <div className="toggle-thumb" />
                        </div>
                        <span className="toggle-label">{data.fragile ? 'Yes' : 'No'}</span>
                    </div>
                </div>

                <PackagePhotos photos={photos} setPhotos={setPhotos}/>
            </form>

        </div>

    </>
}


export default PackageDetails;