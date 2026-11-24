

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getParcel } from "../../api/admin"
import { formatDateTime } from "../../api/shipmentDisplays.js"
import { STATUS_LABELS, getNextStop } from "./ParcelHelpers.js"

import AdminHeader from "./AdminHeader.jsx"
import ParcelDashboardHeader from "./ParcelDashboardHeader.jsx"
import ParcelDashboardDetails from "./ParcelDashboardDetails.jsx"
import ParcelDashboardRoute from "./ParcelDashboardRoute.jsx"


import "../../stylings/admin-stylings/AdminDashboard.scss"
import "../../stylings/admin-stylings/ParcelDashboardLayout.scss"
import "../../stylings/admin-stylings/ParcelDashboardForms.scss"

const ParcelDashboard = function(){

    const navigate = useNavigate()
    const { trackingId } = useParams()

    const [parcel, setParcel] = useState(null)
    const [loading, setLoading] = useState(true)
    const [problem, setProblem] = useState('')

    useEffect(function(){
        let active = true
        setLoading(true)
        setProblem('')
        setParcel(null)

        getParcel(trackingId)
            .then(function(result){
                if (active) {
                    setParcel(result)
                }
            })
            .catch(function(error){
                if (!active) {
                    return
                }
                if (error.status === 401) {
                    navigate('/login')
                } else if (error.status === 403) {
                    navigate('/dashboard')
                } else {
                    setProblem(error.status === 404 ? 'notfound' : 'error')
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
    }, [trackingId])

    const renderShell = function(content){
        return <>
            <div className='admin-dashboard'>
                <div className='admin-main'>
                    <AdminHeader/>
                    <div className='admin-content'>
                        {content}
                    </div>
                </div>
            </div>
        </>
    }

    if (loading) {
        return renderShell(<p>Loading parcel...</p>)
    }

    if (problem === 'notfound') {
        return renderShell(
            <div className='parcel-lookup-error'>
                <h4>Tracking ID not found</h4>
                <p>No shipment exists with the ID {trackingId}.</p>
                <button type='button' onClick={function(){ navigate('/admin') }}>Back to Admin Dashboard</button>
            </div>
        )
    }

    if (problem === 'error' || !parcel) {
        return renderShell(
            <div className='parcel-lookup-error'>
                <h4>Something went wrong</h4>
                <p>This parcel could not be loaded right now. Please try again.</p>
                <button type='button' onClick={function(){ navigate('/admin') }}>Back to Admin Dashboard</button>
            </div>
        )
    }

    const latest = parcel.events[0]
    const statusLabel = STATUS_LABELS[parcel.status] || parcel.status
    const nextStop = getNextStop(parcel.status)

    const statusText = latest && latest.note
        ? latest.note
        : `Parcel is ${statusLabel.toLowerCase()}${parcel.current_location ? ` at ${parcel.current_location}` : ''}.`

    return renderShell(
        <>
            <ParcelDashboardHeader parcel={parcel}/>

            <div className="parcel-dashboard-grid">
                <div className="parcel-dashboard-main-panel">
                    <ParcelDashboardDetails parcel={parcel} onUpdate={setParcel}/>
                </div>

                <aside className="parcel-dashboard-side-panel">
                    <div className="parcel-side-card current-status-card">
                        <h3>Current Status</h3>
                        <div className="parcel-side-status">
                            <span className="status-indicator"></span>
                            <strong>{statusLabel}</strong>
                        </div>
                        <p>{statusText}</p>
                        <small>{latest ? formatDateTime(latest.created_at) : ''}</small>
                    </div>

                    <div className="parcel-side-card next-stop-card">
                        <h3>Next Stop</h3>
                        <div className="parcel-side-status">
                            <span className="next-stop-indicator"></span>
                            <strong>{nextStop.title}</strong>
                        </div>
                        <p>{nextStop.text}</p>
                    </div>

                    <ParcelDashboardRoute parcel={parcel}/>
                </aside>
            </div>
        </>
    )
}

export default ParcelDashboard