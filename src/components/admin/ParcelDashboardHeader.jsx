

import leftArr from "../../assets/icons/left-arr.png"
import packageIcon from "../../assets/icons/nav-shipments.png"

import "../../stylings/admin-stylings/ParcelDashboardHeader.scss"



const ParcelDashboardHeader = function(){

    const parcelStages = [
    { id: 1, label: 'Picked Up', status: 'completed', icon: 'check' },
    { id: 2, label: 'In Transit', status: 'completed', icon: 'check' },
    { id: 3, label: 'At Hub', status: 'active', icon: 'diamond' },
    { id: 4, label: 'Out for Delivery', status: 'pending', icon: '' }
]

    return<>

    <div className="parcel-header-container">
        
        <div className="go-back">
           <img src={leftArr} alt="Left Arrow" 
           loading="lazy"/>
           <h4>Parcel Control</h4>
        </div>


        <div className="parcel-header-texts">
            <div className="image-container">
            <img src={packageIcon} alt="Package Icon UI" loading="lazy"/>
            </div>

            <div className="texts">
                <h4>VY-82K4-91AX</h4>
                <p>Miami → Chicago → Toronto</p>
            </div>

            <div className="status">
                <p>In Transit</p>
            </div>

        </div>



        <div className="parcel-header-UI">
             <div className="parcel-progress">

                <div className="progress-line">
                    <span></span>
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