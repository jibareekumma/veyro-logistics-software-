

import '../../stylings/Landing.css'

import veyroLogo from '../../assets/logo2.png'

// import Icons
import trackingIcon from "../../assets/icons/tracking-icon.png"
import secureIcon from "../../assets/icons/secured-icon.png"
import globalIcon from "../../assets/icons/global-reach-icon.png"
import priceIcon from "../../assets/icons/competive-price-icon.png"

import oceanFreight from "../../assets/photos/ocean1.png"
import warehouse from "../../assets/photos/warehouse1.png"
import trucking from "../../assets/photos/road1.png"

import truckIcon from "../../assets/icons/intransit.png"
import oceanIcon from "../../assets/icons/ship1.png"
import houseIcon from "../../assets/icons/house_icon1.png"

import rightArr from "../../assets/icons/right-arrow.png"



import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'






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


    const builtServices = [
        {
            id: 1,
            title: 'Road Freight',
            image: trucking,
            icon: truckIcon,
            paragraph: 'Flexible and reliable trucking across USA & Canada etc'
        },
        {
            id: 2,
            title: 'Ocean Freight',
            image: oceanFreight,
            icon: oceanIcon,
            paragraph: 'Cost effective global shipping for larger loads'
        },
        {
            id: 3,
            title: 'Warehousing',
            image: warehouse,
            icon: houseIcon,
            paragraph: 'Secure storage and inventory management'
        }
    ]

 
    const [currentStep, setCurrentStep] = useState(2);

    const navigate = useNavigate()

    return <>

        <main className = 'landing-container'>


        <div className = 'landing-header'>
            <div className='header-bg' aria-hidden='true'>
                <div className='header-grid'></div>

                <svg viewBox='0 0 1200 800' preserveAspectRatio='xMidYMid slice'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path id='hbr1' className='route-line'
                        d='M120 640 C 220 480, 320 420, 420 420' />
                    <path id='hbr2' className='route-line'
                        d='M420 420 C 560 420, 640 600, 760 560' />
                    <path id='hbr3' className='route-line'
                        d='M760 560 C 900 520, 1000 400, 1080 300' />
                    <path id='hbr4' className='route-line'
                        d='M1080 300 C 1040 200, 980 150, 900 140' />
                    <path id='hbr5' className='route-line'
                        d='M560 700 C 640 700, 700 640, 760 560' />
                    <path id='hbr6' className='route-line'
                        d='M120 640 C 260 720, 420 740, 560 700' />
                    <path id='hbr7' className='route-line'
                        d='M420 420 C 520 300, 700 200, 900 140' />

                    <circle className='hub' cx='120' cy='640' r='5' />
                    <circle className='hub' cx='420' cy='420' r='5' />
                    <circle className='hub' cx='760' cy='560' r='5' />
                    <circle className='hub' cx='1080' cy='300' r='5' />
                    <circle className='hub' cx='900' cy='140' r='5' />
                    <circle className='hub' cx='560' cy='700' r='5' />

                    <circle className='hub-ring' cx='420' cy='420' r='5' />
                    <circle className='hub-ring ring-two' cx='760' cy='560' r='5' />
                    <circle className='hub-ring ring-three' cx='1080' cy='300' r='5' />

                    <g className='packet'>
                        <animateMotion dur='3s' begin='-1s' repeatCount='indefinite'>
                            <mpath href='#hbr1' />
                        </animateMotion>
                        <circle className='packet-halo' r='9' />
                        <circle className='packet-core' r='3.5' />
                    </g>
                    <g className='packet'>
                        <animateMotion dur='5s' begin='0s' repeatCount='indefinite'>
                            <mpath href='#hbr2' />
                        </animateMotion>
                        <circle className='packet-halo' r='9' />
                        <circle className='packet-core' r='3.5' />
                    </g>
                    <g className='packet'>
                        <animateMotion dur='4s' begin='-2s' repeatCount='indefinite'>
                            <mpath href='#hbr3' />
                        </animateMotion>
                        <circle className='packet-halo' r='9' />
                        <circle className='packet-core' r='3.5' />
                    </g>
                    <g className='packet'>
                        <animateMotion dur='3s' begin='-0.5s' repeatCount='indefinite'>
                            <mpath href='#hbr4' />
                        </animateMotion>
                        <circle className='packet-halo' r='9' />
                        <circle className='packet-core' r='3.5' />
                    </g>
                    <g className='packet'>
                        <animateMotion dur='3.5s' begin='-1.5s' repeatCount='indefinite'>
                            <mpath href='#hbr5' />
                        </animateMotion>
                        <circle className='packet-halo' r='9' />
                        <circle className='packet-core' r='3.5' />
                    </g>
                    <g className='packet'>
                        <animateMotion dur='5s' begin='-3s' repeatCount='indefinite'>
                            <mpath href='#hbr6' />
                        </animateMotion>
                        <circle className='packet-halo' r='9' />
                        <circle className='packet-core' r='3.5' />
                    </g>
                    <g className='packet'>
                        <animateMotion dur='6s' begin='-4s' repeatCount='indefinite'>
                            <mpath href='#hbr7' />
                        </animateMotion>
                        <circle className='packet-halo' r='9' />
                        <circle className='packet-core' r='3.5' />
                    </g>
                </svg>
            </div>

            <nav>
                <div className='nav-ph'></div>
                <img src = {veyroLogo} alt="Veyro Logo" />
                <button onClick = {() => navigate('/register')}
               >Sign Up</button>            </nav>

            <div className = 'header-texts'>
                <h5>LOGISTICS & SHIPMENT TRACKING</h5>
                <h2>Your Cargo <br />
                    <mark>Our Priority</mark></h2>
                <p>Fast, secure and reliable logistics 
                    solutions for businesses and individuals. 
                    Track your shipments in real time, from pickup
                    to delivery
                </p>
                <div className='btns'>
                    <button className='one'
                    onClick = {() => navigate('/login')}
                    >Track Your Shipment »</button>
                    <button className='two'
                    onClick = {() => navigate('/register')}
                    >Get Started</button>
                </div>
            </div>
        </div>



        <div className='details-container'>
            
            {details.map( (a) =>(
                <div className='item' key={a.id}>
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
            <div className='container'>
                <h5>TRACK YOUR SHIPMENT</h5>
                <h4>ENTER YOUR TRACKING ID</h4>

                <form>
                    <input type="text" 
                    placeholder='e.g VYR-TRK-8492716'
                    maxLength={16}
                    />
                    <button
                    onClick = {() => navigate('/login')}
                    >Track »</button>
                </form>
            </div>

            <div className="tracking-UI">
                <div></div>

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



        <div className='built-container'>
            <div className='built-texts'>
                <h4>Built for Modern Logistics</h4>
                <p>VEYRO combines technology and experience 
                    to deliver smarter, faster and more transparent 
                    shipping solutions.
                </p>
                <button>Learn More »</button>
            </div>

            <div className='built-ph'>
                <div className='route-top'>
                    <div className='route-id'>
                        <span>Shipment</span>
                        <strong>VYR-TRK-8492716</strong>
                    </div>
                    <span className='route-status'>In Transit</span>
                </div>

                <svg className='route-map' viewBox='0 0 400 150'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                >
                    <path className='route-base'
                        d='M30 120 C 120 20, 280 20, 370 110' />
                    <path className='route-flow'
                        d='M30 120 C 84 60, 163.2 36, 237.36 45.84' />
                    <circle className='route-origin' cx='30' cy='120' r='6' />
                    <circle className='route-dest' cx='370' cy='110' r='6' />
                    <circle className='route-ring' cx='237.36' cy='45.84' r='6' />
                    <circle className='route-now' cx='237.36' cy='45.84' r='6' />
                </svg>

                <div className='route-ends'>
                    <div>
                        <strong>New York, US</strong>
                        <span>Picked up Sep 27</span>
                    </div>
                    <div>
                        <strong>Lagos, NG</strong>
                        <span>Delivery Oct 05</span>
                    </div>
                </div>

                <div className='route-stats'>
                    <div>
                        <strong>3</strong>
                        <span>Countries</span>
                    </div>
                    <div>
                        <strong>24/7</strong>
                        <span>Tracking</span>
                    </div>
                    <div>
                        <strong>Live</strong>
                        <span>Status updates</span>
                    </div>
                </div>
            </div>

            <div className='built-services'>

        {builtServices.map((a) => (
            <div className='built-item' key={a.id}>
                <img src={a.image} alt={a.title} className='image'/>
                <div className='icon'><img src={a.icon}/></div>
                <div className='texts'>
                    <h5>{a.title}</h5>
                    <p>{a.paragraph}</p>
                </div>
                <div className='arr'><img src={rightArr} /></div>
            </div>
        ))}

            </div>
        </div>



        <div className='closing-container'>
            <h5>LET'S MOVE YOUR WORLD</h5>
            <h4>Smarter Logistics. Stronger Business.</h4>
            <button>Get Started »</button>
        </div>



        </main>
    </>
}


export default Landing;