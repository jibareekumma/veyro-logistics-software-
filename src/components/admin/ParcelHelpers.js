

const STATUS_LABELS = {
    pending: 'Pending',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    exception: 'Delayed',
    cancelled: 'Cancelled'
}

const STAGES = ['picked_up', 'in_transit', 'out_for_delivery', 'delivered']

const UPDATE_OPTIONS = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled']

const FINAL_STATUSES = ['delivered', 'cancelled']

const MANAGER_ROLES = ['support', 'operations', 'super_admin']

const NEXT_STATUS = {
    pending: 'picked_up',
    picked_up: 'in_transit',
    in_transit: 'out_for_delivery',
    out_for_delivery: 'delivered'
}

const getNextStatus = function(status){
    return NEXT_STATUS[status] || 'in_transit'
}

const getProgressStatus = function(parcel){
    if (parcel.status !== 'exception' && parcel.status !== 'cancelled') {
        return parcel.status
    }
    const earlier = parcel.events.find(function(event){
        return event.status !== 'exception' && event.status !== 'cancelled'
    })
    return earlier ? earlier.status : 'pending'
}

const getStageIndex = function(parcel){
    return STAGES.indexOf(getProgressStatus(parcel))
}

const getNextStop = function(status){
    if (status === 'delivered') {
        return { title: 'Completed', text: 'This shipment has been delivered.' }
    }
    if (status === 'cancelled') {
        return { title: 'Cancelled', text: 'No further movement is expected.' }
    }
    if (status === 'exception') {
        return { title: 'Resolve Delay', text: 'Update the status once the issue is cleared.' }
    }
    return {
        title: STATUS_LABELS[getNextStatus(status)],
        text: 'Update the status when this stage is reached.'
    }
}

const canManageParcels = function(user){
    return Boolean(user && MANAGER_ROLES.includes(user.role))
}

const formatTime = function(value){
    if (!value) {
        return ''
    }
    return new Date(value).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

export { STATUS_LABELS, STAGES, UPDATE_OPTIONS, FINAL_STATUSES, getNextStatus, getProgressStatus, getStageIndex, getNextStop, canManageParcels, formatTime }