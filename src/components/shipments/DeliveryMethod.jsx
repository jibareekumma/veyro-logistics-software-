

import { useState } from "react";

import "../../stylings/shipments/DeliveryMethod.scss"

import { deliveryOptions, formatPrice } from "./ShipmentHelpers.js";
import { BoxIcon, TruckIcon, PlaneIcon, ChevronIcon } from "./ShipmentIcons";

const optionIcons = {
    standard: BoxIcon,
    express: TruckIcon,
    priority: PlaneIcon
};

const DeliveryMethod = function({ selected, onSelect, pricing }){

    const [isOpen, setIsOpen] = useState(true);
    const [showBreakdown, setShowBreakdown] = useState(false);

    return <>

        <div className={`delivery-method ${isOpen ? '' : 'collapsed'}`}>
            <div
                className="headings"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={function(){ setIsOpen(!isOpen); }}
                onKeyDown={function(e){
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
            >
                <div className="icons">
                    <BoxIcon/>
                </div>
                <div className="texts">
                    <h5>Delivery Method</h5>
                    <p>Choose how you want to deliver your package.</p>
                </div>
                <span className={`collapse-icon ${isOpen ? 'open' : ''}`}>
                    <ChevronIcon/>
                </span>
            </div>

            {isOpen && (
                <>
                    <div className="options" role="radiogroup" aria-label="Delivery method">
                        {deliveryOptions.map(function(option){
                            const Icon = optionIcons[option.id];
                            const isSelected = selected === option.id;
                            return (
                                <button
                                    type="button"
                                    key={option.id}
                                    role="radio"
                                    aria-checked={isSelected}
                                    className={`option-card ${isSelected ? 'selected' : ''}`}
                                    onClick={function(){ onSelect(option.id); }}
                                >
                                    <span className="option-icon"><Icon/></span>
                                    <span className="option-info">
                                        <span className="option-name">{option.name}</span>
                                        <span className="option-days">{option.days}</span>
                                    </span>
                                    <span className="option-price">{formatPrice(option.price)}</span>
                                    <span className="option-radio" />
                                </button>
                            );
                        })}
                    </div>

                    <div className="cost-bar">
                        <div className="cost-summary">
                            <div className="cost-icon">
                                <BoxIcon/>
                            </div>
                            <div className="cost-texts">
                                <h6>Estimated Cost</h6>
                                <p>Final cost may vary based on weight, dimensions and destination.</p>
                            </div>
                            <div className="cost-amount">
                                <strong>{formatPrice(pricing.total)}</strong>
                                <button type="button" onClick={function(){ setShowBreakdown(!showBreakdown); }}>
                                    {showBreakdown ? 'Hide breakdown' : 'View breakdown'}
                                </button>
                            </div>
                        </div>

                        {showBreakdown && (
                            <ul className="cost-breakdown">
                                <li><span>Base Shipping Fee</span><span>{formatPrice(pricing.base)}</span></li>
                                <li><span>Fuel Surcharge</span><span>{formatPrice(pricing.fuel)}</span></li>
                                <li><span>Insurance (optional)</span><span>{formatPrice(pricing.insurance)}</span></li>
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>

    </>
}


export default DeliveryMethod;