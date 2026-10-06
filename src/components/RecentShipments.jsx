

import searchIcon from "../assets/icons/search-icon.png"
import arrowRight from "../assets/icons/right-arrow.png"
import boxIcon from "../assets/icons/box.png"

import "../stylings/dashboard-stylings/Shipments.css"


const RecentShipments = function(){

    const shipments = [
        { id: 1, trackingId: 'VY-82K4-91AX', status: 'Delayed', destination: 'Atlanta, USA', eta: 'Oct 12, 2026' },
        { id: 2, trackingId: 'VY-77A6-4GPL', status: 'In Transit', destination: 'Chicago, USA', eta: 'Oct 12, 2026' },
        { id: 3, trackingId: 'VY-33L8-2XMD', status: 'Delivered', destination: 'Toronto, CA', eta: 'Oct 5, 2026' },
        { id: 4, trackingId: 'VY-16F9-1LNP', status: 'In Transit', destination: 'New York, USA', eta: 'Oct 14, 2026' },
        { id: 5, trackingId: 'VY-46T3-9B80', status: 'Delivered', destination: 'Miami, USA', eta: 'Oct 3, 2026' },
    ]

    const getStatusClass = function(status){
        return status.toLowerCase().replace(/\s+/g, '-')
    }

    return<>

        <div className="shipments-container">
            <div className="shipments-header">
                <h3>Recent Shipments</h3>
                <div className="view-all">
                    <p>View all</p>
                    <img src={arrowRight} alt="Right Arrow"
                    loading="lazy"/>
                </div>
            </div>

            <div className="shipments-table">
                <div className="table-head">
                    <p>Tracking ID</p>
                    <p>Status</p>
                    <p>Destination</p>
                    <p>ETA</p>
                    <span></span>
                </div>

                {shipments.map( (a) => (
                    <div className="table-row" key={a.id}>
                        <p className="tracking-id">{a.trackingId}</p>
                        <div className="status-cell">
                            <span className={`status ${getStatusClass(a.status)}`}>{a.status}</span>
                        </div>
                        <p className="destination">{a.destination}</p>
                        <p className="eta">{a.eta}</p>
                        <img className="chevron" src={arrowRight} alt="Right Arrow"
                        loading="lazy"/>
                    </div>
                ))}
            </div>
        </div>


        <button className="create-shipment">
            <img src={boxIcon} alt="box icon"
            loading="lazy"/>
            <span>Create Shipment</span>
            <img src={arrowRight} alt="Right Arrow"
            loading="lazy"/>
        </button>


        <div className="bottom-track">
            <div className="track-input">
                <img src={searchIcon} alt="search icon"
                loading="lazy"/>
                <input type="text" placeholder='Track by tracking ID'/>
            </div>
            <button>
                Track
                <img src={arrowRight} alt="Right Arrow"
                loading="lazy"/>
            </button>
        </div>
    </>
}



export default RecentShipments;