

const CATEGORY_OPTIONS = [
    { value: 'shipments', label: 'Shipments' },
    { value: 'account', label: 'Account' },
    { value: 'tracking', label: 'Tracking' },
    { value: 'billing', label: 'Billing' },
    { value: 'general', label: 'General' }
]

const STATUS_OPTIONS = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
]

const formatDate = function(value){
    return new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

const formatTime = function(value){
    return new Date(value).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const statusClass = function(status){
    return status.replace('_', '-')
}

export { CATEGORY_OPTIONS, STATUS_OPTIONS, formatDate, formatTime, statusClass }