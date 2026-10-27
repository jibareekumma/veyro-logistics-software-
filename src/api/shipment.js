

import { API_BASE, authRequest } from './auth'

const packageKeys = ['description', 'category', 'weight', 'length', 'width', 'height']

const toCamel = function(text){
    return text.replace(/_([a-z])/g, function(match, letter){
        return letter.toUpperCase()
    })
}

const buildQuery = function(params){
    const search = new URLSearchParams()
    Object.keys(params).forEach(function(key){
        if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
            search.append(key, params[key])
        }
    })
    const text = search.toString()
    return text ? `?${text}` : ''
}

const buildPayload = function(form){
    const pkg = form.package
    const sender = form.sender
    const receiver = form.receiver
    return {
        description: pkg.description.trim(),
        category: pkg.category,
        weight: pkg.weight,
        length: pkg.length,
        width: pkg.width,
        height: pkg.height,
        fragile: pkg.fragile,
        sender_full_name: sender.fullName.trim(),
        sender_phone: sender.phone.trim(),
        sender_email: sender.email.trim(),
        sender_address: sender.address.trim(),
        sender_city: sender.city.trim(),
        sender_country: sender.country,
        receiver_full_name: receiver.fullName.trim(),
        receiver_phone: receiver.phone.trim(),
        receiver_email: receiver.email.trim(),
        receiver_address: receiver.address.trim(),
        receiver_city: receiver.city.trim(),
        receiver_country: receiver.country,
        delivery_method: form.deliveryMethod
    }
}

const createShipment = function(form){
    return authRequest('/shipments/', 'POST', buildPayload(form), API_BASE)
}

const listShipments = function(params = {}){
    return authRequest(`/shipments/${buildQuery(params)}`, 'GET', null, API_BASE)
}

const getShipmentStats = function(){
    return authRequest('/shipments/stats/', 'GET', null, API_BASE)
}

const trackShipment = function(trackingId){
    return authRequest(`/shipments/track/${encodeURIComponent(trackingId.trim())}/`, 'GET', null, API_BASE)
}

const mapServerErrors = function(data){
    const result = { package: {}, sender: {}, receiver: {}, general: '' }
    if (!data) {
        result.general = 'Cannot reach the server. Please try again.'
        return result
    }
    Object.keys(data).forEach(function(key){
        const value = data[key]
        const message = Array.isArray(value) ? value[0] : String(value)
        if (key.startsWith('sender_')) {
            result.sender[toCamel(key.slice(7))] = message
        } else if (key.startsWith('receiver_')) {
            result.receiver[toCamel(key.slice(9))] = message
        } else if (packageKeys.includes(key)) {
            result.package[key] = message
        } else {
            result.general = message
        }
    })
    return result
}

export { createShipment, listShipments, getShipmentStats, trackShipment, mapServerErrors }