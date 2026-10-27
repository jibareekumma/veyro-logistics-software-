


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import searchIcon from "../assets/icons/search-icon.png"
import arrowRight from "../assets/icons/right-arrow.png"
import boxIcon from "../assets/icons/nav-shipments.png"

import { listShipments } from "../api/shipment.js"
import { getStatusInfo, formatPlace, getEtaDate } from "../api/shipmentDisplays.js"
import useTrackSearch from "../api/useTrackSearch.js"

import "../stylings/dashboard-stylings/Shipments.css"


const RecentShipments = function(){

    const navigate = useNavigate();
    const track = useTrackSearch()

    const [shipments, setShipments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(function(){
        let active = true

        listShipments({ page_size: 5 })
            .then(function(data){
                if (active) {
                    setShipments(data.results)
                }
            })
            .catch(function(){
                if (active) {
                    setError('Could not load your shipments.')
                }
            })
            .finally(function(){
                if (active) {
                    setLoading(false)
                }
            })

        return function(){
            active = false
        }
    }, [])

    return<>

        <div className="shipments-container">
            <div className="shipments-header">
                <h3>Recent Shipments</h3>
                <div className="view-all">
                    <p
                    onClick = {() => navigate('/recentshipmentspage')}
                    >View all</p>
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

                {loading && <p className="empty-message">Loading shipments...</p>}

                {!loading && error && <p className="empty-message">{error}</p>}

                {!loading && !error && shipments.length === 0 && (
                    <p className="empty-message">No recent shipments</p>
                )}

                {!loading && !error && shipments.map( (a) => {
                    const info = getStatusInfo(a.status)
                    return (
                        <div className="table-row" key={a.tracking_id}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/tracking/${a.tracking_id}`)}>
                            <p className="tracking-id">{a.tracking_id}</p>
                            <div className="status-cell">
                                <span className={`status ${info.dashClass}`}>{info.label}</span>
                            </div>
                            <p className="destination">{formatPlace(a.receiver_city, a.receiver_country)}</p>
                            <p className="eta">{getEtaDate(a)}</p>
                            <img className="chevron" src={arrowRight} alt="Right Arrow"
                            loading="lazy"/>
                        </div>
                    )
                })}
            </div>
        </div>


        <button className="create-shipment"
            onClick={() => navigate("/createShipments")}
        >
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
                <input type="text" placeholder='Track by tracking ID'
                value={track.value}
                onChange={(e) => track.setValue(e.target.value)}
                onKeyDown={track.onKeyDown}/>
            </div>
            <button onClick={track.submit}>
                Track
                <img src={arrowRight} alt="Right Arrow"
                loading="lazy"/>
            </button>
        </div>
    </>
}



export default RecentShipments;