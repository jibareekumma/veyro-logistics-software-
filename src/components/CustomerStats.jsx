

import active from "../assets/icons/active.png"
import intransit from "../assets/icons/intransit.png"
import delivered from "../assets/icons/delivered.png"
import alert from "../assets/icons/alert.png"
import alert2 from "../assets/icons/alert2.png"

import arrowRight from "../assets/icons/right-arrow.png"
import cancel from "../assets/icons/cancel.png"

import "../stylings/dashboard-stylings/Stats.css"


const CustomerStats = function(){

    const stats = [
        {
            id: 1,
            icon: active,
            title: 'Active',
            number: 5,
            time: "In Last 7 days",
            trend: '↑ 1',
            tone: 'up'
        },
        {
            id: 2,
            icon: intransit,
            title: 'In Transit',
            number: 7,
            time: "In Last 7 days",
            trend: '↑ 2',
            tone: 'up'
        },
        {
            id: 3,
            icon: delivered,
            title: 'Delivered',
            number: 18,
            time: "In Last 7 days",
            trend: '↑ 4',
            tone: 'up'
        },
        {
            id: 4,
            icon: alert,
            title: 'Needs Attention',
            number: 2,
            time: "In Last 3 days",
            trend: '↓ 1',
            tone: 'down'
        },
    ]

    return<>
       


        <div className="stats-container">
            {stats.map( (a) => (
                <div className="stat-item" key={a.id}>
                    <div className="headers">
                        <img src={a.icon} alt="stat-icon" 
                        loading="lazy"/>
                        <h5>{a.title}</h5>
                    </div>

                    <div className="stat-details">
                        <div className="figures">
                            <h4>{a.number}</h4>
                            <span className={`trend ${a.tone}`}>{a.trend}</span>
                        </div>
                        <p>{a.time}</p>
                    </div>
                </div>
            ))}
        </div>



        <div className="alert-container">
            <div className="icon"><img src={alert2} alt="alert icon" 
            loading="lazy"/></div>

            <div className="texts">
                <h3>Needs Attention</h3>
                <p>Shipment VY-82K4-91AX is delayed.
                    Current Location Atlantis, USA, ETA updated to Oct 12, 2026
                </p>
                <p className="resolve">We're working to resolve this and will keep you updated.</p>
                <div className="btn">
                    <p>View Details </p>
                    <img src={arrowRight} alt="Right Arrow" 
                    loading="lazy"/></div>
            </div>

            <img src={cancel} alt="cancel icon" 
            loading="lazy"/>
        </div>
    </>
}



export default CustomerStats;