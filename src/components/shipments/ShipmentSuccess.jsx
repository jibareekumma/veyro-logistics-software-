


import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deliveryOptions, formatPrice } from "./ShipmentHelpers.js";
import { CheckIcon } from "./ShipmentIcons";

const ShipmentSuccess = function({ shipment, onReset }){

    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const method = deliveryOptions.find(function(option){
        return option.id === shipment.delivery_method;
    });

    const handleCopy = async function(){
        try {
            await navigator.clipboard.writeText(shipment.tracking_id);
            setCopied(true);
            setTimeout(function(){ setCopied(false); }, 2000);
        } catch (error) {
            setCopied(false);
        }
    };

    return <>

        <div className="shipment-success">
            <div className="success-icon">
                <CheckIcon size={32}/>
            </div>
            <h4>Shipment Created</h4>
            <p>Your shipment is ready to go. Use the tracking ID below to follow it anytime.</p>

            <div className="tracking-box">
                <div>
                    <span className="tracking-label">Tracking ID</span>
                    <span className="tracking-id">{shipment.tracking_id}</span>
                </div>
                <button type="button" className="copy-btn" onClick={handleCopy}>
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>

            <div className="success-details">
                <div className="row">
                    <span>Item</span>
                    <span>{shipment.description}</span>
                </div>
                <div className="row">
                    <span>Route</span>
                    <span>{shipment.sender_city} → {shipment.receiver_city}</span>
                </div>
                <div className="row">
                    <span>Delivery</span>
                    <span>{method ? `${method.name} (${method.days})` : shipment.delivery_method}</span>
                </div>
                <div className="row">
                    <span>Total</span>
                    <span>{formatPrice(shipment.total_cost)}</span>
                </div>
            </div>

            <div className="success-actions">
                <button type="button" onClick={function(){ navigate('/tracking'); }}>Track Package</button>
                <button type="button" className="secondary" onClick={onReset}>Create Another Shipment</button>
            </div>
        </div>

    </>
}


export default ShipmentSuccess;