

import AdminHeader from "./AdminHeader.jsx"
import ParcelDashboardHeader from "./ParcelDashboardHeader.jsx"
import ParcelDashboardDetails from "./ParcelDashboardDetails.jsx"
import ParcelDashboardRoute from "./ParcelDashboardRoute.jsx"


import "../../stylings/admin-stylings/AdminDashboard.scss"
import "../../stylings/admin-stylings/ParcelDashboardLayout.scss"

const ParcelDashboard = function(){

    return <>
        <div className='admin-dashboard'>

            <div className='admin-main'>

                <AdminHeader/>

                <div className='admin-content'>

                   <ParcelDashboardHeader/>

                   <div className="parcel-dashboard-grid">
                       <div className="parcel-dashboard-main-panel">
                           <ParcelDashboardDetails/>
                       </div>

                       <aside className="parcel-dashboard-side-panel">
                           <div className="parcel-side-card current-status-card">
                               <h3>Current Status</h3>
                               <div className="parcel-side-status">
                                   <span className="status-indicator"></span>
                                   <strong>At Hub</strong>
                               </div>
                               <p>Your parcel has arrived at Chicago Hub and will be processed for delivery.</p>
                               <small>Oct 31, 2026 · 08:10 AM</small>
                           </div>

                           <div className="parcel-side-card next-stop-card">
                               <h3>Next Stop</h3>
                               <div className="parcel-side-status">
                                   <span className="next-stop-indicator"></span>
                                   <strong>Out for Delivery</strong>
                               </div>
                               <p>Estimated: Today</p>
                           </div>

                           <ParcelDashboardRoute/>
                       </aside>
                   </div>


                </div>

            </div>
        </div>
    </>
}

export default ParcelDashboard