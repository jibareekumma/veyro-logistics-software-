

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser, parseErrors } from '../../api/auth'
import { getOverview, getStaff, inviteStaff, getParcel } from '../../api/admin'

import AdminHeader from "./AdminHeader.jsx"
import "../../stylings/admin-stylings/AdminDashboard.scss"

import totalCusIcon from "../../assets/icons/total-admin.png"
import newCustomer from "../../assets/icons/add-admin.png"
import linkAdmin from "../../assets/icons/link-admin.png"
import activeAdmmin from "../../assets/icons/verified2.png"

import crownIcon from "../../assets/icons/crown.png"

const ROLES = ['support', 'operations', 'finance', 'super_admin']

const formatRole = function(role){
    if (!role) return ''
    return role.replace('_', ' ')
}

const AdminDashboard = function(){

    const navigate = useNavigate()
    const user = getStoredUser()
    const isSuperAdmin = user && user.role === 'super_admin'

    const [overview, setOverview] = useState(null)
    const [staff, setStaff] = useState([])
    const [form, setForm] = useState({ full_name: '', email: '', role: 'support' })
    const [errors, setErrors] = useState({})
    const [inviteLink, setInviteLink] = useState('')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [trackingId, setTrackingId] = useState('')
    const [trackError, setTrackError] = useState('')
    const [checking, setChecking] = useState(false)

    useEffect(function(){
        const load = async function(){
            try {
                setOverview(await getOverview())
                if (isSuperAdmin) {
                    setStaff(await getStaff())
                }
            } catch (error) {
                if (error.status === 401) {
                    navigate('/login')
                } else if (error.status === 403) {
                    navigate('/dashboard')
                }
            }  
        }
        load()
    }, [])

    const handleChange = function(e){
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleInvite = async function(e){
        e.preventDefault()
        if (loading) return
        setErrors({})
        setInviteLink('')
        setCopied(false)
        setLoading(true)
        try {
            const data = await inviteStaff(form)
            setInviteLink(`${window.location.origin}/accept-invite/${data.invite_token}`)
            setForm({ full_name: '', email: '', role: 'support' })
            setStaff(await getStaff())
        } catch (error) {
            setErrors(parseErrors(error))
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async function(){
        try {
            await navigator.clipboard.writeText(inviteLink)
            setCopied(true)
            setTimeout(function(){ setCopied(false) }, 2000)
        } catch (error) {
            setCopied(false)
        }
    }

    const handleLogout = function(){
        logoutUser()
        navigate('/login')
    }

    const handleTrack = async function(e){
        e.preventDefault()
        if (checking) return
        const id = trackingId.trim().toUpperCase()
        if (!id) {
            setTrackError('Enter a tracking ID.')
            return
        }
        setTrackError('')
        setChecking(true)
        try {
            await getParcel(id)
            navigate(`/parcel-dashboard/${id}`)
        } catch (error) {
            if (error.status === 404) {
                setTrackError('No shipment found with that tracking ID.')
            } else if (error.status === 401) {
                navigate('/login')
            } else if (error.status === 403) {
                navigate('/dashboard')
            } else {
                setTrackError('Could not check this tracking ID. Please try again.')
            }
        } finally {
            setChecking(false)
        }
    }

    return <>
        <div className='admin-dashboard'>

            <div className='admin-main'>

                <AdminHeader/> 

                <div className='admin-content'>

                    <div className='page-head'>
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p>
                                Welcome back, {user ? user.full_name : ''}
                                <span className='role-badge'>{user ? formatRole(user.role) : ''}</span>
                            </p>
                        </div>
                        <button className='logout-button' onClick={handleLogout}>Logout</button>
                    </div>

                    <form className='tracking-search-form' role='search' onSubmit={handleTrack}>
                        <label className='sr-only' htmlFor='tracking-id'>Search by tracking ID</label>
                        <input
                            id='tracking-id'
                            type='search'
                            name='tracking_id'
                            placeholder='Enter tracking ID'
                            className='admin-search-input'
                            value={trackingId}
                            onChange={function(e){ setTrackingId(e.target.value) }}
                            required
                        />
                        <button type='submit' className='manage-parcel-button' disabled={checking}>
                            {checking ? 'Checking...' : 'Manage Parcel'}
                        </button>
                    </form>

                    {trackError && <p className='field-error'>{trackError}</p>}

                    <section>
                        <h2 className='sr-only'>Overview</h2>
                        {overview ? (
                            <div className='stats-grid'>
                                <div className='stat-card'>
                                    <span className='stat-icon'>
                                        <img src={totalCusIcon} alt="Total Customer Icon" className='total-customer-icon admin-icon'/>
                                    </span>
                                    <h3>{overview.total_customers}</h3>
                                    <p>Total customers</p>
                                </div>
                                <div className='stat-card'>
                                    <span className='stat-icon'>
                                        <img src={newCustomer} alt="New Customer Icon" className='new-customer-icon admin-icon'/>
                                    </span>
                                    <h3>{overview.new_customers_7d}</h3>
                                    <p>New customers (7 days)</p>
                                </div>
                                <div className='stat-card'>
                                    <span className='stat-icon'>
                                        <img src={linkAdmin} alt="Link Admin Icon" className='link-customer-icon admin-icon'/>
                                    </span>
                                    <h3>{overview.total_staff}</h3>
                                    <p>Total staff</p>
                                </div>
                                <div className='stat-card'>
                                    <span className='stat-icon'>
                                        <img src={activeAdmmin} alt="Active Admin Icon" className='active-admin-icon admin-icon'/>
                                    </span>
                                    <h3>{overview.active_staff}</h3>
                                    <p>Active staff</p>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </section>

                    {isSuperAdmin && (
                        <section className='staff-section'>

                            <div className='invite-panel'>
                                <div className='section-head'>
                                    <img src={crownIcon} alt="Crown Icon" className='crown-icon admin-icon' />
                                    <div>
                                        <h2>Staff Section</h2>
                                        <p>Invite new staff members to join the platform.</p>
                                    </div>
                                </div>

                                <form className='invite-form' onSubmit={handleInvite}>
                                    <div className='form-field'>
                                        <label>Full name</label>
                                        <input name='full_name' placeholder='e.g. John Doe' value={form.full_name} onChange={handleChange} />
                                        {errors.full_name && <p className='field-error'>{errors.full_name}</p>}
                                    </div>
                                    <div className='form-field'>
                                        <label>Email</label>
                                        <input name='email' placeholder='e.g. john@veyro.com' value={form.email} onChange={handleChange} />
                                        {errors.email && <p className='field-error'>{errors.email}</p>}
                                    </div>
                                    <div className='form-field'>
                                        <label>Role</label>
                                        <select name='role' value={form.role} onChange={handleChange}>
                                            {ROLES.map(function(role){
                                                return <option key={role} value={role}>{role}</option>
                                            })}
                                        </select>
                                        {errors.role && <p className='field-error'>{errors.role}</p>}
                                    </div>
                                    <div className='form-action'>
                                        <button className='invite-button' type='submit' disabled={loading}>
                                            {loading ? 'Creating invite...' : 'Create invite link'}
                                        </button>
                                    </div>
                                    {errors.general && <p className='field-error form-error'>{errors.general}</p>}
                                </form>

                                {inviteLink && (
                                    <div className='invite-link'>
                                        <span className='icon-placeholder'></span>
                                        <div className='invite-link-body'>
                                            <p>Send this link to the new staff member. It works once and expires in 7 days.</p>
                                            <input readOnly value={inviteLink} onFocus={function(e){ e.target.select() }} />
                                        </div>
                                        <button className='copy-button' type='button' onClick={handleCopy}>
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className='staff-list'>
                                <h3>Staff Members</h3>

                                {staff.length > 0 ? (
                                    <div className='table-wrap'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {staff.map(function(member){
                                                    return (
                                                        <tr key={member.id}>
                                                            <td>{member.full_name}</td>
                                                            <td>{member.email}</td>
                                                            <td>{member.role}</td>
                                                            <td>
                                                                <span className={`status-badge ${String(member.status).toLowerCase()}`}>
                                                                    {member.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className='empty-state'>
                                        <span className='icon-placeholder'></span>
                                        <strong>No staff members found</strong>
                                        <p>Invite your first staff member to get started.</p>
                                    </div>
                                )}
                            </div>

                        </section>
                    )}

                </div>
            </div>

        </div>
    </>
}

export default AdminDashboard