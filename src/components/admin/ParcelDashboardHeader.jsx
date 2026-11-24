

import { useNavigate } from "react-router-dom"

import leftArr from "../../assets/icons/left-arr.png"
import packageIcon from "../../assets/icons/nav-shipments.png"

import { STATUS_LABELS, STAGES, getStageIndex } from "./ParcelHelpers.js"

import "../../stylings/admin-stylings/ParcelDashboardHeader.scss"



const ParcelDashboardHeader = function({ parcel }){

    const navigate = useNavigate()

    const currentIndex = getStageIndex(parcel)

    const parcelStages = STAGES.map(function(stage, index){
        let status = 'pending'
        if (index < currentIndex || (index === currentIndex && stage === 'delivered')) {
            status = 'completed'
        } else if (index === currentIndex) {
            status = 'active'
        }
        return {
            id: index + 1,
            label: STATUS_LABELS[stage],
            status: status,
            icon: status === 'completed' ? 'check' : status === 'active' ? 'diamond' : ''
        }
    })

    const lineWidth = currentIndex <= 0 ? 0 : (currentIndex / (STAGES.length - 1)) * 100

    const places = [parcel.sender_city, parcel.current_location, parcel.receiver_city].filter(function(place, index, list){
        return place && place !== list[index - 1]
    })

    return<>

    <div className="parcel-header-container">
        
        <div className="go-back" onClick={function(){ navigate('/admin') }}>
           <img src={leftArr} alt="Left Arrow" 
           loading="lazy"/>
           <h4>Parcel Control</h4>
        </div>


        <div className="parcel-header-texts">
            <div className="image-container">
            <img src={packageIcon} alt="Package Icon UI" loading="lazy"/>
            </div>

            <div className="texts">
                <h4>{parcel.tracking_id}</h4>
                <p>{places.join(' → ')}</p>
            </div>

            <div className={`status ${parcel.status}`}>
                <p>{STATUS_LABELS[parcel.status] || parcel.status}</p>
            </div>

        </div>



        <div className="parcel-header-UI">
             <div className="parcel-progress">

                <div className="progress-line">
                    <span style={{ width: `${lineWidth}%` }}></span>
                </div>

                {parcelStages.map(function(stage){
                    return (
                        <div className={`progress-stage ${stage.status}`} key={stage.id}>

                            <div className="stage-circle">
                                {stage.icon === 'check' && <span className="check-icon"></span>}
                                {stage.icon === 'diamond' && <span className="diamond-icon"></span>}
                            </div>

                            <p>{stage.label}</p>

                        </div>
                    )
                })}

            </div>
        </div>

        </div>
    </>
}


export default ParcelDashboardHeader;