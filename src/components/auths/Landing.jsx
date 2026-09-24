
import '../../stylings/Landing.css'

import veyroLogo from '../../assets/logo2.png'

// import Icons
import trackingIcon from "../../assets/icons/tracking-icon.png"
import secureIcon from "../../assets/icons/secured-icon.png"
import globalIcon from "../../assets/icons/global-reach-icon.png"
import priceIcon from "../../assets/icons/competive-price-icon.png"
import { useState } from 'react'


const Landing = function(){

    const details = [
        {
            id: 1,
            text: 'Real-Time Tracking',
            paragraph: 'Know where your shipment is, anytime anywhere',
            image: trackingIcon,
            alt: 'Tracking Icon',
            className: 'Tracking Icon'
        },
        {
            id: 2,
            text: 'Secure & Reliable',
            paragraph: 'Your Cargo is protected at every step',
            image: secureIcon,
            alt: 'Secure Icon',
            className : 'Secure Icon'
        },
        {
            id: 3,
            text: 'Global Reach',
            paragraph: 'USA, Canada & Nigeria, still expanding',
            image: globalIcon,
            alt: 'Global Icon',
            className: 'Global Icon'
        },
        {
            id: 4,
            text: 'Competive Rates',
            paragraph: 'Quality service without high cost',
            image: priceIcon,
            alt: 'Price Icon',
            className: 'Price Icon'
        }
    ]


    const trackingUI = [
        {
            status: "Picked Up",
            date: 'Sep 27, 2026',
            time: '10:45'
        },
        {
            status: "In Transit",
            date: 'Sep 29, 2026',
            time: '14:30'
        },
        {
            status: "Quee for Delivery",
            date: 'Oct 04, 2026',
            time: '09:15'
        },
        {
            status: "Delivered",
            date: 'Oct 05, 2026',
            time: '16:10'
        }
    ]
 
    const [currentStep, setCurrentStep] = useState(2);


    return <>

        <main className = 'landing-container'>


        <div className = 'landing-header'>
            <nav>
                <img src = {veyroLogo} alt="Veyro Logo" />
                <button>Sign Up</button>
            </nav>

            <div className = 'header-texts'>
                <h5>LOGISTICS & SHIPMENT TRACKING</h5>
                <h2>Your Cargo <br />
                    <mark>OUr Priority</mark></h2>
                <p>Fast, secure and reliable logistics 
                    solutions for businesses and individuals. 
                    Track your shipments in real time, from pickup
                    to delivery
                </p>
                <div className='btns'>
                    <button>Track Your Shipment »</button>
                    <button>Get Started</button>
                </div>
            </div>
        </div>



        <div className='details-container'>
            
            {details.map( (a) =>(
                <div>
                    <img src = {a.image} 
                    alt={a.alt} className = {a.className} />
                    <div className = "a-texts">
                        <h5>{a.text}</h5>
                        <p>{a.paragraph}</p>
                    </div>
                </div>
            ))}
        </div>



        <div className='tracking-container'>
            <div>
                <h5>TRACK YOUR SHIPMENT</h5>
                <h4>ENTER YOUR TRACKING ID</h4>

                <form>
                    <input type="text" maxLength={16}
                    />
                    <button>Track »</button>
                </form>
            </div>

            <div className="tracking-UI">

        {trackingUI.map((item, index) => (
            <div
                className={`tracking-step ${
                    index <= currentStep ? "reached" : ""
                }`}
                key={item.status}
            >

                {/* Point */}
                <div className="tracking-point"></div>

                {/* Information */}
                <div className="tracking-info">
                    <span className="tracking-status">
                        {item.status}
                    </span>

                    <span className="tracking-date">
                        {item.date}
                    </span>

                    <span className="tracking-time">
                        {item.time}
                    </span>
                </div>

                {/* Connecting line */}
                {index < trackingUI.length - 1 && (
                    <div className="tracking-line"></div>
                )}

            </div>
        ))}

    </div>
        </div>




        </main>
    </>
}


export default Landing;

