

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import active from "../assets/icons/active.png"
import intransit from "../assets/icons/intransit.png"
import delivered from "../assets/icons/delivered.png"
import alert from "../assets/icons/alert.png"
import alert2 from "../assets/icons/alert2.png"

import arrowRight from "../assets/icons/right-arrow.png"
import cancel from "../assets/icons/cancel.png"

import { getShipmentStats } from "../api/shipment.js"
import { formatDate } from "../api/shipmentDisplays.js"

import "../stylings/dashboard-stylings/Stats.css"


const CustomerStats = function(){

    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [alertDismissed, setAlertDismissed] = useState(false)

    useEffect(function(){
        let isActive = true

        getShipmentStats()
            .then(function(data){
                if (isActive) {
                    setStats(data)
                }
            })
            .catch(function(){
                if (isActive) {
                    setStats(null)
                }
            })

        return function(){
            isActive = false
        }
    }, [])

    const cards = [
        { id: 1, icon: active, title: 'Active', value: stats ? stats.active : null, time: 'Right now' },
        { id: 2, icon: intransit, title: 'In Transit', value: stats ? stats.in_transit : null, time: 'Right now' },
        { id: 3, icon: delivered, title: 'Delivered', value: stats ? stats.delivered : null, time: 'All time' },
        { id: 4, icon: alert, title: 'Needs Attention', value: stats ? stats.needs_attention : null, time: 'Right now' },
    ]

    const attention = stats ? stats.attention : null

    return<>



        <div className="stats-container">
            {cards.map( (a) => (
                <div className="stat-item" key={a.id}>
                    <div className="headers">
                        <img src={a.icon} alt="stat-icon"
                        loading="lazy"/>
                        <h5>{a.title}</h5>
                    </div>

                    <div className="stat-details">
                        <div className="figures">
                            <h4>{a.value === null ? '–' : a.value}</h4>
                        </div>
                        <p>{a.time}</p>
                    </div>
                </div>
            ))}
        </div>


        {attention && !alertDismissed && (
            <div className="alert-container">
                <div className="icon"><img src={alert2} alt="alert icon"
                loading="lazy"/></div>

                <div className="texts">
                    <h3>Needs Attention</h3>
                    <p>Shipment {attention.tracking_id} is delayed.
                        Current Location {attention.location}, ETA updated to {formatDate(attention.estimated_delivery)}
                    </p>
                    <p className="resolve">We're working to resolve this and will keep you updated.</p>
                    <div className="btn"
                    onClick={function(){ navigate(`/tracking/${attention.tracking_id}`) }}>
                        <p>View Details </p>
                        <img src={arrowRight} alt="Right Arrow"
                        loading="lazy"/></div>
                </div>

                <img src={cancel} alt="cancel icon"
                loading="lazy"
                onClick={function(){ setAlertDismissed(true) }}/>
            </div>
        )}
    </>
}



export default CustomerStats;