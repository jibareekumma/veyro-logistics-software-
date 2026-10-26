

import search from "../../assets/icons/search-icon.png"
import download from "../../assets/icons/download-btn.png"

import "../../stylings/shipments/RecentShipmentsPage.scss"

import CreateShipments from "./CreateShipments.jsx";
import { useNavigate } from "react-router-dom";


const RecentShipmentsHeader = function({ query = "", onQueryChange = function(){} }){

    const navigate = useNavigate();

    return<>
        
        <div className="recent-shipments-header">
            <div className="texts">
                <span className="eyebrow">Shipments</span>
                <h4>Shipments</h4>
                <p>Manage, track and view all your shipments in one place</p>
            </div>


            <div className="search-bar">
                <img src={search} alt="Search Icon"
                 />
                 <input
                    type="text"
                    placeholder="Search by tracking ID, destination..."
                    value={query}
                    onChange={function(event){ onQueryChange(event.target.value); }}
                 />
            </div>


            <button className="create-shipment-btn"
            onClick={()=> navigate('/createShipments')}            >
                <img src={download} alt="Download Button" />
                <p>Create Shipment</p>
            </button>
        </div>
    </>
}


export default RecentShipmentsHeader;