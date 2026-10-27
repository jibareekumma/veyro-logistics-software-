

const statusMap = {
    pending: { label: 'Processing', listClass: 'processing', dashClass: 'processing' },
    picked_up: { label: 'In Transit', listClass: 'transit', dashClass: 'in-transit' },
    in_transit: { label: 'In Transit', listClass: 'transit', dashClass: 'in-transit' },
    out_for_delivery: { label: 'In Transit', listClass: 'transit', dashClass: 'in-transit' },
    delivered: { label: 'Delivered', listClass: 'delivered', dashClass: 'delivered' },
    exception: { label: 'Needs Attention', listClass: 'attention', dashClass: 'delayed' },
    cancelled: { label: 'Cancelled', listClass: 'attention', dashClass: 'delayed' }
}

const eventTypes = {
    pending: 'confirmed',
    picked_up: 'transit',
    in_transit: 'transit',
    out_for_delivery: 'transit',
    delivered: 'delivered',
    exception: 'confirmed',
    cancelled: 'confirmed'
}

const deliveryLabels = {
    standard: 'Standard',
    express: 'Express',
    priority: 'Priority'
}

const countryCodes = {
    'Canada': 'ca',
    'United States': 'us',
    'United Kingdom': 'gb',
    'Nigeria': 'ng',
    'Ghana': 'gh',
    'Kenya': 'ke',
    'South Africa': 'za',
    'Germany': 'de',
    'France': 'fr',
    'United Arab Emirates': 'ae'
}

const getStatusInfo = function(status){
    return statusMap[status] || { label: status, listClass: 'processing', dashClass: 'processing' }
}

const getEventType = function(status){
    return eventTypes[status] || 'transit'
}

const getDeliveryLabel = function(method){
    return deliveryLabels[method] || method
}

const getCountryCode = function(country){
    return countryCodes[country] || ''
}

const formatDate = function(value){
    if (!value) {
        return ''
    }
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatDateTime = function(value){
    if (!value) {
        return ''
    }
    return new Date(value).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

const formatPlace = function(city, country){
    return `${city}, ${country}`
}

const getEtaDate = function(shipment){
    if (shipment.status === 'cancelled') {
        return '—'
    }
    return formatDate(shipment.status === 'delivered' ? shipment.updated_at : shipment.estimated_delivery)
}

const getEtaText = function(shipment){
    if (shipment.status === 'cancelled') {
        return 'Cancelled'
    }
    if (shipment.status === 'delivered') {
        return `Delivered ${formatDate(shipment.updated_at)}`
    }
    return `ETA ${formatDate(shipment.estimated_delivery)}`
}

export { getStatusInfo, getEventType, getDeliveryLabel, getCountryCode, formatDate, formatDateTime, formatPlace, getEtaDate, getEtaText }