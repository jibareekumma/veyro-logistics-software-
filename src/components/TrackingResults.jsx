import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import leftArr from "../assets/icons/left-arr.png"

import locationIcon from "../assets/icons/nav-addresses.png"
import calendar from "../assets/icons/calendar2.png"
import route from "../assets/icons/route.png"

import Header from "./Header"

import "../stylings/TrackingResults.css"

import TrackingMap from "./TrackingMap"
import PackageDetails from "./PackageDetails"

import { trackShipment } from "../api/shipment.js"
import { getStatusInfo, getEventType, getDeliveryLabel, formatDate, formatDateTime } from "../api/shipmentDisplays.js"
import useTrackSearch from "../api/useTrackSearch.js"


const TrackingResults = function(){

    const navigate = useNavigate();
    const { trackingId } = useParams();
    const track = useTrackSearch();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(trackingId));
    const [problem, setProblem] = useState('');

    useEffect(function(){
        if (!trackingId) {
            setData(null);
            setProblem('');
            setLoading(false);
            return;
        }

        let active = true;
        setLoading(true);
        setProblem('');
        setData(null);

        trackShipment(trackingId)
            .then(function(result){
                if (active) {
                    setData(result);
                }
            })
            .catch(function(error){
                if (active) {
                    setProblem(error.status === 404 ? 'notfound' : 'error');
                }
            })
            .finally(function(){
                if (active) {
                    setLoading(false);
                }
            });

        return function(){
            active = false;
        };
    }, [trackingId]);

    const renderLookup = function(title, message){
        return <>
            <Header/>
            <div className="tracking-lookup">
                <h4>{title}</h4>
                <p>{message}</p>
                <div className="lookup-form">
                    <input
                        type="text"
                        placeholder="e.g. VY-82K4-91AX"
                        value={track.value}
                        onChange={function(event){ track.setValue(event.target.value); }}
                        onKeyDown={track.onKeyDown}
                    />
                    <button type="button" onClick={track.submit}>Track</button>
                </div>
                <button type="button" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            </div>
        </>
    };

    if (!trackingId) {
        return renderLookup('Track a Package', 'Enter a tracking ID to see where your shipment is.');
    }

    if (loading) {
        return <>
            <Header/>
            <div className="tracking-lookup">
                <p>Loading tracking details...</p>
            </div>
        </>
    }

    if (problem === 'notfound') {
        return renderLookup('Tracking ID not found', `We couldn't find a shipment with the ID ${trackingId}. Check it and try again.`);
    }

    if (problem === 'error' || !data) {
        return renderLookup('Something went wrong', 'We could not load this shipment right now. Please try again.');
    }

    const info = getStatusInfo(data.status);

    const LocationUI = [
        {
            id: 1,
            icon: locationIcon,
            title: "Current Location",
            text: data.current_location
        },
        {
            id: 2,
            icon: calendar,
            title: "Estimated Delivery",
            text: formatDate(data.estimated_delivery)
        },
        {
            id: 3,
            icon: route,
            title: "Delivery Type",
            text: getDeliveryLabel(data.delivery_method)
        }
    ]

    const TrackingHistory = data.events.map(function(event){
        const eventInfo = getStatusInfo(event.status);
        const type = getEventType(event.status);
        return {
            id: event.id,
            date: formatDateTime(event.created_at),
            title: event.note || eventInfo.label,
            description: event.location ? `Location: ${event.location}` : `Status: ${eventInfo.label}`,
            status: eventInfo.label,
            type: type,
            icon: type === 'delivered' ? '✓' : '●',
        };
    });

    return<>

        <Header/>

        <div id="tracking-result-container">

            <div className="tracking-texts">

                <div className="section1">
                    <div className="back"
                    onClick = {() => navigate("/dashboard")}
                    >
                        <img src={leftArr} alt="Left Arrow" />
                        <p>Back to Dashboard</p>
                    </div>
                    <h4>Tracking Results</h4>
                </div>

                <div className="tracking-header">

                    <div className="section2">
                        <div className="id">
                            <h3>{data.tracking_id}</h3>
                            <span>{info.label}</span>
                        </div>
                        <div className="routes">
                            <p>Shipment from {data.origin_city}, {data.origin_country} → {data.destination_city}, {data.destination_country}</p>
                            <p>Last updated {formatDateTime(data.updated_at)}</p>
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
                <TrackingMap
                    origin={{ city: data.origin_city, country: data.origin_country }}
                    destination={{ city: data.destination_city, country: data.destination_country }}
                />
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

                {data.package && (
                    <div className="tracking-package">
                        <PackageDetails shipment={data}/>
                    </div>
                )}

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