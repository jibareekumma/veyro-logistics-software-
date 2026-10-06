

import searchIcon from "../assets/icons/search-icon.png"
import arrowRight from "../assets/icons/right-arrow.png"
import boxIcon from "../assets/icons/nav-shipments.png"
import trackIcon from "../assets/icons/search-icon.png"
import addressesIcon from "../assets/icons/nav-addresses.png"
import supportIcon from "../assets/icons/nav-support.png"
import shipIcon from "../assets/icons/nav-shipments.png"

import trackBg from "../assets/photos/track-bg.jpeg"
import promoBg from "../assets/photos/promo-ship.jpeg"

import "../stylings/dashboard-stylings/Aside.css"


const DashboardAside = function(){

    const actions = [
        { id: 1, icon: boxIcon, title: 'Create Shipment', text: 'Start a new shipment' },
        { id: 2, icon: trackIcon, title: 'Track a Package', text: 'Check shipment status' },
        { id: 3, icon: addressesIcon, title: 'Addresses', text: 'Manage saved addresses' },
        { id: 4, icon: supportIcon, title: 'Support', text: 'Get help & open a ticket' },
    ]

    return <div className="dashboard-aside">

        <div className="track-panel">
            <img className="bg" src={trackBg} alt="shipping port"
            loading="lazy"/>

            <div className="overlay">
                <h5>TRACK YOUR SHIPMENT</h5>
                <h3>Enter Tracking ID</h3>
                <p>Get real-time updates on your shipment's location and estimated delivery.</p>

                <div className="track-form">
                    <div className="inputs">
                        <img src={searchIcon} alt="search icon"
                        loading="lazy"/>
                        <input type="text" placeholder='e.g. VY-82K4-91AX'/>
                    </div>
                    <button>
                        Track
                        <img src={arrowRight} alt="Right Arrow"
                        loading="lazy"/>
                    </button>
                </div>
            </div>
        </div>


        <div className="quick-actions">
            <h3>Quick Actions</h3>

            <div className="actions-grid">
                {actions.map( (a) => (
                    <div className="action-card" key={a.id}>
                        <img src={a.icon} alt={a.title + " icon"}
                        loading="lazy"/>
                        <h5>{a.title}</h5>
                        <p>{a.text}</p>
                    </div>
                ))}
            </div>

            <div className="promo">
                <img className="bg" src={promoBg} alt="cargo ship at sea"
                loading="lazy"/>

                <div className="promo-text">
                    <img src={shipIcon} alt="ship icon"
                    loading="lazy"/>
                    <h4>Your shipments. Our priority.</h4>
                    <p>Fast, secure and reliable logistics solutions for your business, anywhere in the world.</p>
                    <div className="btn">
                        <p>Learn more</p>
                        <img src={arrowRight} alt="Right Arrow"
                        loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}



export default DashboardAside;