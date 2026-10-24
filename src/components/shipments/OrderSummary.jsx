

import "../../stylings/shipments/OrderSummary.scss"

import { formatPrice } from "./ShipmentHelpers.js";
import { BoxIcon, LockIcon } from "./ShipmentIcons";

const OrderSummary = function({ pricing, onSubmit, isSubmitting }){

    return <>

        <div className="order-summary">
            <div className="headings">
                <div className="icons">
                    <BoxIcon/>
                </div>
                <h5>Order Summary</h5>
            </div>

            <div className="estimated">
                <span>Estimated Cost</span>
                <strong>{formatPrice(pricing.total)}</strong>
            </div>

            <ul className="lines">
                <li><span>Base Shipping Fee</span><span>{formatPrice(pricing.base)}</span></li>
                <li><span>Fuel Surcharge</span><span>{formatPrice(pricing.fuel)}</span></li>
                <li><span>Insurance (optional)</span><span>{formatPrice(pricing.insurance)}</span></li>
            </ul>

            <button type="button" className="send-btn" onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Shipment →'}
            </button>

            <p className="secure-note">
                <LockIcon size={14}/>
                <span>Your information is secure and encrypted.</span>
            </p>
        </div>

    </>
}


export default OrderSummary;