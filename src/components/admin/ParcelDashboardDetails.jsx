

import { useState } from 'react'
import '../../stylings/admin-stylings/ParcelDashboardDetails.scss'

const ParcelDashboardDetails = function(){

    const [activeTab, setActiveTab] = useState('Details')

    const tabs = ['Details', 'Tracking', 'Actions']

    return <>
        <div className="parcel-details-container">

            <div className="parcel-details-tabs">
                {tabs.map(function(tab){
                    return (
                        <button
                            key={tab}
                            className={activeTab === tab ? 'active' : ''}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    )
                })}
            </div>

            <div className="parcel-details-content">

                {activeTab === 'Details' && (
                    <section className="details-section">

                        <h3>Parcel Details</h3>

                        <div className="detail-row">
                            <span>Customer</span>
                            <strong>John Doe</strong>
                        </div>

                        <div className="detail-row">
                            <span>Tracking ID</span>
                            <strong>VY-82K4-91AX</strong>
                        </div>

                        <div className="detail-row">
                            <span>Service Type</span>
                            <strong>Express Delivery</strong>
                        </div>

                        <div className="detail-row">
                            <span>Package Weight</span>
                            <strong>2.5 kg</strong>
                        </div>

                        <div className="detail-row">
                            <span>Dimensions</span>
                            <strong>30 × 20 × 15 cm</strong>
                        </div>

                        <div className="detail-row">
                            <span>Pickup Location</span>
                            <strong>Miami, FL</strong>
                        </div>

                        <div className="detail-row">
                            <span>Destination</span>
                            <strong>Toronto, Canada</strong>
                        </div>

                    </section>
                )}

                {activeTab === 'Tracking' && (
                    <section className="tracking-section">

                        <h3>Tracking History</h3>

                        <div className="tracking-event completed">
                            <span className="event-dot"></span>
                            <div>
                                <strong>Picked Up</strong>
                                <p>Parcel collected from sender.</p>
                                <small>Nov 20, 2026 · 09:30 AM</small>
                            </div>
                        </div>

                        <div className="tracking-event completed">
                            <span className="event-dot"></span>
                            <div>
                                <strong>In Transit</strong>
                                <p>Parcel is moving to the next hub.</p>
                                <small>Nov 21, 2026 · 02:15 PM</small>
                            </div>
                        </div>

                        <div className="tracking-event active">
                            <span className="event-dot"></span>
                            <div>
                                <strong>At Hub</strong>
                                <p>Parcel has arrived at the sorting hub.</p>
                                <small>Nov 23, 2026 · 08:45 AM</small>
                            </div>
                        </div>

                        <div className="tracking-event pending">
                            <span className="event-dot"></span>
                            <div>
                                <strong>Out for Delivery</strong>
                                <p>Waiting for dispatch.</p>
                                <small>Pending</small>
                            </div>
                        </div>

                    </section>
                )}

                {activeTab === 'Actions' && (
                    <section className="parcel-actions-section">

                        <h3>Manage Parcel</h3>

                        <div className="action-info">
                            <span>Current Status</span>
                            <strong>At Hub</strong>
                        </div>

                        <div className="parcel-action-card">
                            <div>
                                <strong>Update Parcel Status</strong>
                                <p>Change the current shipment stage.</p>
                            </div>
                            <button type="button">Update Status →</button>
                        </div>

                        <div className="parcel-action-card">
                            <div>
                                <strong>Assign Dispatcher</strong>
                                <p>Assign a staff member to handle delivery.</p>
                            </div>
                            <button type="button">Assign Staff →</button>
                        </div>

                        <div className="parcel-action-card">
                            <div>
                                <strong>Report a Delay</strong>
                                <p>Record an issue affecting this shipment.</p>
                            </div>
                            <button type="button">Report Issue →</button>
                        </div>

                    </section>
                )}

            </div>

        </div>
    </>
}

export default ParcelDashboardDetails;