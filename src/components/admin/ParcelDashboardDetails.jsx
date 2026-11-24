

import { useState } from 'react'

import { addParcelEvent, updateParcelEvent, deleteParcelEvent } from '../../api/admin'
import { getStoredUser, parseErrors } from '../../api/auth'
import { formatDate, formatDateTime, getDeliveryLabel } from '../../api/shipmentDisplays.js'
import { STATUS_LABELS, UPDATE_OPTIONS, FINAL_STATUSES, getNextStatus, canManageParcels } from './ParcelHelpers.js'

import '../../stylings/admin-stylings/ParcelDashboardDetails.scss'
import '../../stylings/admin-stylings/ParcelDashboardForms.scss'

const ParcelDashboardDetails = function({ parcel, onUpdate }){

    const canManage = canManageParcels(getStoredUser())
    const isFinal = FINAL_STATUSES.includes(parcel.status)

    const [activeTab, setActiveTab] = useState('Details')
    const [panel, setPanel] = useState('')
    const [form, setForm] = useState({ status: '', location: '', note: '' })
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({ location: '', note: '' })
    const [removingId, setRemovingId] = useState(null)

    const tabs = ['Details', 'Tracking', 'Actions']

    const switchTab = function(tab){
        setActiveTab(tab)
        setErrors({})
        setEditingId(null)
        setRemovingId(null)
    }

    const openPanel = function(name){
        setErrors({})
        setForm({
            status: name === 'problem' ? 'exception' : getNextStatus(parcel.status),
            location: '',
            note: ''
        })
        setPanel(name)
    }

    const handleFormChange = function(e){
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEditChange = function(e){
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        if (saving) return
        setSaving(true)
        setErrors({})
        try {
            const updated = await addParcelEvent(parcel.tracking_id, form)
            onUpdate(updated)
            setPanel('')
            setActiveTab('Tracking')
        } catch (error) {
            setErrors(parseErrors(error))
        } finally {
            setSaving(false)
        }
    }

    const startEdit = function(event){
        setErrors({})
        setRemovingId(null)
        setEditingId(event.id)
        setEditForm({ location: event.location, note: event.note })
    }

    const saveEdit = async function(){
        if (saving) return
        setSaving(true)
        setErrors({})
        try {
            const updated = await updateParcelEvent(parcel.tracking_id, editingId, editForm)
            onUpdate(updated)
            setEditingId(null)
        } catch (error) {
            setErrors(parseErrors(error))
        } finally {
            setSaving(false)
        }
    }

    const confirmRemove = async function(){
        if (saving) return
        setSaving(true)
        setErrors({})
        try {
            const updated = await deleteParcelEvent(parcel.tracking_id, removingId)
            onUpdate(updated)
            setRemovingId(null)
        } catch (error) {
            setErrors(parseErrors(error))
            setRemovingId(null)
        } finally {
            setSaving(false)
        }
    }

    const renderForm = function(kind){
        const isProblem = kind === 'problem'
        return (
            <form className='parcel-inline-form' onSubmit={handleSubmit}>

                {!isProblem && (
                    <div className='form-field'>
                        <label>New status</label>
                        <select name='status' value={form.status} onChange={handleFormChange}>
                            {UPDATE_OPTIONS.map(function(option){
                                return <option key={option} value={option}>{STATUS_LABELS[option]}</option>
                            })}
                        </select>
                        {errors.status && <p className='field-error'>{errors.status}</p>}
                    </div>
                )}

                <div className='form-field'>
                    <label>Location</label>
                    <input
                        name='location'
                        value={form.location}
                        onChange={handleFormChange}
                        placeholder={`Current: ${parcel.current_location}`}
                    />
                    {errors.location && <p className='field-error'>{errors.location}</p>}
                </div>

                <div className='form-field'>
                    <label>{isProblem ? 'Describe the problem' : 'Note (optional)'}</label>
                    <textarea
                        name='note'
                        rows='3'
                        maxLength='255'
                        value={form.note}
                        onChange={handleFormChange}
                        placeholder={isProblem ? 'e.g. Delayed at customs, awaiting clearance' : 'e.g. Departed sorting hub'}
                    />
                    {errors.note && <p className='field-error'>{errors.note}</p>}
                </div>

                {errors.general && <p className='field-error'>{errors.general}</p>}

                <div className='form-buttons'>
                    <button type='button' className='cancel' onClick={function(){ setPanel('') }}>Cancel</button>
                    <button type='submit' className={isProblem ? 'danger' : ''} disabled={saving}>
                        {saving ? 'Saving...' : isProblem ? 'Report and notify customer' : 'Update status'}
                    </button>
                </div>

            </form>
        )
    }

    return <>
        <div className="parcel-details-container">

            <div className="parcel-details-tabs">
                {tabs.map(function(tab){
                    return (
                        <button
                            key={tab}
                            className={activeTab === tab ? 'active' : ''}
                            onClick={() => switchTab(tab)}
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
                            <strong>{parcel.customer_name}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Customer Email</span>
                            <strong>{parcel.customer_email}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Tracking ID</span>
                            <strong>{parcel.tracking_id}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Item</span>
                            <strong>{parcel.description}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Service Type</span>
                            <strong>{getDeliveryLabel(parcel.delivery_method)} Delivery</strong>
                        </div>

                        <div className="detail-row">
                            <span>Package Weight</span>
                            <strong>{Number(parcel.weight)} kg</strong>
                        </div>

                        <div className="detail-row">
                            <span>Dimensions</span>
                            <strong>{Number(parcel.length)} × {Number(parcel.width)} × {Number(parcel.height)} cm</strong>
                        </div>

                        <div className="detail-row">
                            <span>Sender</span>
                            <strong>{parcel.sender_full_name} · {parcel.sender_phone}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Pickup Location</span>
                            <strong>{parcel.sender_city}, {parcel.sender_country}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Receiver</span>
                            <strong>{parcel.receiver_full_name} · {parcel.receiver_phone}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Destination</span>
                            <strong>{parcel.receiver_city}, {parcel.receiver_country}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Created</span>
                            <strong>{formatDate(parcel.created_at)}</strong>
                        </div>

                    </section>
                )}

                {activeTab === 'Tracking' && (
                    <section className="tracking-section">

                        <h3>Tracking History</h3>

                        {errors.general && <p className='field-error'>{errors.general}</p>}

                        {parcel.events.map(function(event, index){
                            const isEditing = editingId === event.id
                            const isRemoving = removingId === event.id
                            const stateClass = index === 0 ? 'active' : 'completed'
                            const delayedClass = event.status === 'exception' ? ' delayed' : ''

                            return (
                                <div className={`tracking-event ${stateClass}${delayedClass}`} key={event.id}>
                                    <span className="event-dot"></span>
                                    <div className="event-body">
                                        <strong>{STATUS_LABELS[event.status] || event.status}</strong>

                                        {isEditing ? (
                                            <div className="event-edit">
                                                <input
                                                    name='location'
                                                    value={editForm.location}
                                                    onChange={handleEditChange}
                                                    placeholder='Location'
                                                />
                                                <textarea
                                                    name='note'
                                                    rows='2'
                                                    maxLength='255'
                                                    value={editForm.note}
                                                    onChange={handleEditChange}
                                                    placeholder='Note'
                                                />
                                                {errors.note && <p className='field-error'>{errors.note}</p>}
                                                <div className="event-tools">
                                                    <button type='button' onClick={saveEdit} disabled={saving}>
                                                        {saving ? 'Saving...' : 'Save'}
                                                    </button>
                                                    <button type='button' onClick={function(){ setEditingId(null) }}>Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p>{event.note || 'No note added.'}</p>
                                                <small>{event.location ? `${event.location} · ` : ''}{formatDateTime(event.created_at)}</small>

                                                {canManage && (
                                                    <div className="event-tools">
                                                        {isRemoving ? (
                                                            <>
                                                                <button type='button' className='remove' onClick={confirmRemove} disabled={saving}>
                                                                    {saving ? 'Removing...' : 'Confirm remove'}
                                                                </button>
                                                                <button type='button' onClick={function(){ setRemovingId(null) }}>Keep</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button type='button' onClick={function(){ startEdit(event) }}>Edit</button>
                                                                <button type='button' className='remove' onClick={function(){ setErrors({}); setRemovingId(event.id) }}>Remove</button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                    </section>
                )}

                {activeTab === 'Actions' && (
                    <section className="parcel-actions-section">

                        <h3>Manage Parcel</h3>

                        <div className="action-info">
                            <span>Current Status</span>
                            <strong>{STATUS_LABELS[parcel.status] || parcel.status}</strong>
                        </div>

                        {!canManage && (
                            <p className="action-note">Your role can view this parcel but cannot change it.</p>
                        )}

                        {canManage && isFinal && (
                            <p className="action-note">
                                This shipment is {STATUS_LABELS[parcel.status].toLowerCase()} and can no longer be updated. If it was marked by mistake, remove its latest event in the Tracking tab.
                            </p>
                        )}

                        {canManage && !isFinal && (
                            <>
                                <div className="parcel-action-card">
                                    <div>
                                        <strong>Update Parcel Status</strong>
                                        <p>Change the current shipment stage and location.</p>
                                    </div>
                                    <button type="button" onClick={function(){ openPanel('status') }}>Update Status →</button>
                                </div>

                                {panel === 'status' && renderForm('status')}

                                <div className="parcel-action-card">
                                    <div>
                                        <strong>Report a Delay</strong>
                                        <p>Record an issue. The customer is notified by email.</p>
                                    </div>
                                    <button type="button" onClick={function(){ openPanel('problem') }}>Report Issue →</button>
                                </div>

                                {panel === 'problem' && renderForm('problem')}
                            </>
                        )}

                    </section>
                )}

            </div>

        </div>
    </>
}

export default ParcelDashboardDetails;