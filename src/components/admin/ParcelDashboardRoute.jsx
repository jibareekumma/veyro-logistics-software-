

import '../../stylings/admin-stylings/ParcelDashboardRoute.scss'

import upperRight from "../../assets/icons/upper-right.png"

const ParcelDashboardRoute = function(){

    const routeEvents = [
        {
            id: 1,
            date: 'Oct 30, 2026',
            time: '09:14 AM',
            title: 'Package picked up in Miami',
            status: 'completed'
        },
        {
            id: 2,
            date: 'Oct 30, 2026',
            time: '04:22 PM',
            title: 'Arrived at Atlanta Hub',
            status: 'completed'
        },
        {
            id: 3,
            date: 'Oct 31, 2026',
            time: '08:10 AM',
            title: 'In transit to Chicago',
            status: 'active'
        }
    ]

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

            <button className="full-tracking-button" type="button">
                View Full Tracking
                <img src={upperRight} alt="View More Icon" loading='lazy'
                className='upper-right-arr'/>
            </button>

        </div>
    </>
}

export default ParcelDashboardRoute;