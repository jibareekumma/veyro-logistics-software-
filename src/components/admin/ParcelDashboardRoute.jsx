

import { useNavigate } from 'react-router-dom'

import '../../stylings/admin-stylings/ParcelDashboardRoute.scss'

import upperRight from "../../assets/icons/upper-right.png"

import { formatDate } from '../../api/shipmentDisplays.js'
import { STATUS_LABELS, formatTime } from './ParcelHelpers.js'

const ParcelDashboardRoute = function({ parcel }){

    const navigate = useNavigate()

    const routeEvents = parcel.events.slice().reverse().map(function(event, index, list){
        const label = STATUS_LABELS[event.status] || event.status
        return {
            id: event.id,
            date: formatDate(event.created_at),
            time: formatTime(event.created_at),
            title: event.location ? `${label} · ${event.location}` : label,
            status: index === list.length - 1 ? 'active' : 'completed'
        }
    })

    return <>
        <div className="parcel-route-container">

            <div className="parcel-route-header">
                <h3>Shipment Route</h3>
                <span className="route-info-placeholder"></span>
            </div>

            <div className="parcel-route-timeline">

                {routeEvents.map(function(event){
                    return (
                        <div className={`route-event ${event.status}`} key={event.id}>

                            <div className="route-event-indicator">
                                <span></span>
                            </div>

                            <div className="route-event-content">

                                <div className="route-event-time">
                                    <span>{event.date}</span>
                                    <span>•</span>
                                    <span>{event.time}</span>
                                </div>

                                <p>{event.title}</p>

                            </div>

                        </div>
                    )
                })}

            </div>

            <button
                className="full-tracking-button"
                type="button"
                onClick={function(){ navigate(`/tracking/${parcel.tracking_id}`) }}
            >
                View Full Tracking
                <img src={upperRight} alt="View More Icon" loading='lazy'
                className='upper-right-arr'/>
            </button>

        </div>
    </>
}

export default ParcelDashboardRoute;