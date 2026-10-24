

import { deliveryOptions, formatPrice } from "./ShipmentHelpers.js";
import { CheckIcon } from "./ShipmentIcons";

const ShipmentSuccess = function({ form, pricing, onReset }){

    const method = deliveryOptions.find(function(option){
        return option.id === form.deliveryMethod;
    });

    return <>

        <div className="shipment-success">
            <div className="success-icon">
                <CheckIcon size={32}/>
            </div>
            <h4>Shipment Created</h4>
            <p>Your shipment is ready to go. You can track it anytime from your dashboard.</p>

            <div className="success-details">
                <div className="row">
                    <span>Item</span>
                    <span>{form.package.description}</span>
                </div>
                <div className="row">
                    <span>Route</span>
                    <span>{form.sender.city} → {form.receiver.city}</span>
                </div>
                <div className="row">
                    <span>Delivery</span>
                    <span>{method.name} ({method.days})</span>
                </div>
                <div className="row">
                    <span>Total</span>
                    <span>{formatPrice(pricing.total)}</span>
                </div>
            </div>

            <button type="button" onClick={onReset}>Create Another Shipment</button>
        </div>

    </>
}


export default ShipmentSuccess;