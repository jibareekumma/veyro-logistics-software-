import leftArr from "../assets/icons/left-arr.png"

import locationIcon from "../assets/icons/nav-addresses.png"
import calendar from "../assets/icons/calendar2.png"
import route from "../assets/icons/route.png"

import Header from "./Header"

import "../stylings/TrackingResults.css"

import TrackingMap from "./TrackingMap"
import PackageDetails from "./PackageDetails"


const TrackingResults = function(){

    const LocationUI = [
        {
            id: 1,
            icon: locationIcon,
            title: "Current Location",
            text: "Chicago, USA"
        },
        {
            id: 2,
            icon: calendar,
            title: "Estimated Delivery",
            text: "Oct 18, 2026"
        },
        {
            id: 3,
            icon: route,
            title: "Delivery Type",
            text: "Express"
        }
    ]

    const TrackingHistory = [
        {
            id: 1,
            date: "Oct 12, 2026 14:32",
            title: "Arrived at Chicago Hub",
            description: "Package arrived and is being processed.",
            status: "In Transit",
            type: "transit",
            icon: "●",
        },
        {
            id: 2,
            date: "Oct 11, 2026 09:17",
            title: "Departed Atlanta Hub",
            description: "Package is on the way to Chicago.",
            status: "In Transit",
            type: "transit",
            icon: "●",
        },
        {
            id: 3,
            date: "Oct 10, 2026 16:03",
            title: "Arrived at Atlanta Hub",
            description: "Package arrived and is being processed.",
            status: "In Transit",
            type: "transit",
            icon: "●",
        },
        {
            id: 4,
            date: "Oct 10, 2026 10:34",
            title: "Picked up from Sender",
            description: "Package collected from Miami, FL.",
            status: "Delivered",
            type: "delivered",
            icon: "C",
        },
        {
            id: 5,
            date: "Oct 10, 2026 08:12",
            title: "Label Created",
            description: "Tracking ID VY-82K4-91AX generated.",
            status: "Confirmed",
            type: "confirmed",
            icon: "D",
        },
    ]

    return<>

        <Header/>

        <div id="tracking-result-container">

            <div className="tracking-texts">

                <div className="section1">
                    <div className="back">
                        <img src={leftArr} alt="Left Arrow" />
                        <p>Back to Track a Package</p>
                    </div>
                    <h4>Tracking Results</h4>
                </div>

                <div className="tracking-header">

                    <div className="section2">
                        <div className="id">
                            <h3>VY-82K4-91AX</h3>
                            <span>In Transit</span>
                        </div>
                        <div className="routes">
                            <p>Shipment from Miami, USA → Toronto, Canada</p>
                            <p>Last updated Oct 12, 2026, 14:32 (EST)</p>
                        </div>
                    </div>

                    <div className="details">
                        {LocationUI.map((location) => (
                            <div key={location.id} className="detail">
                                <div className="detail-icon">
                                    <img src={location.icon} alt="UI Icon" />
                                </div>
                                <div className="detail-text">
                                    <p>{location.title}</p>
                                    <h5>{location.text}</h5>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="tracking-ui">
                <TrackingMap/>
            </div>

            <div className="tracking-lower">

                <div className="tracking-recent">
                    <div className="tracking-recent__header">
                        <h4>Tracking History</h4>

                        <span className="tracking-recent__live">
                            <span></span>
                            Live Updates
                        </span>
                    </div>

                    <div className="tracking-recent__timeline">
                        {TrackingHistory.map((item) => (
                            <div className="tracking-recent__item" key={item.id}>
                                <div className={`tracking-recent__icon ${item.type}`}>
                                    {item.icon}
                                </div>

                                <div className="tracking-recent__details">
                                    <span className="tracking-recent__date">{item.date}</span>
                                    <p className="tracking-recent__title">{item.title}</p>
                                    <p className="tracking-recent__description">{item.description}</p>
                                </div>

                                <span className={`tracking-recent__status ${item.type}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tracking-package">
                    <PackageDetails/>
                </div>

                <div className="tracking-actions">

                    <button className="download">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <path d="M7 10l5 5 5-5" />
                            <path d="M12 15V3" />
                        </svg>
                        <p>Download Receipt</p>
                    </button>

                    <button className="report">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                        </svg>
                        <p>Report a Problem</p>
                    </button>

                </div>

            </div>

        </div>

    </>
}


export default TrackingResults;