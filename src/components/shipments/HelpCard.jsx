
import "../../stylings/shipments/OrderSummary.css"

import { HeadsetIcon } from "./ShipmentIcons";

const HelpCard = function({ onContact }){

    return <>

        <div className="help-card">
            <div className="help-head">
                <div className="icons">
                    <HeadsetIcon/>
                </div>
                <div className="texts">
                    <h5>Need help?</h5>
                    <p>Our support team is here for you.</p>
                </div>
            </div>
            <button type="button" className="contact-btn" onClick={onContact}>
                Contact Support
            </button>
        </div>

    </>
}


export default HelpCard;