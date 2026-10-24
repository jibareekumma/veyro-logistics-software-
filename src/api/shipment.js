

import { API_BASE, authRequest } from './auth'

const packageKeys = ['description', 'category', 'weight', 'length', 'width', 'height']

const toCamel = function(text){
    return text.replace(/_([a-z])/g, function(match, letter){
        return letter.toUpperCase()
    })
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

const listShipments = function(){
    return authRequest('/shipments/', 'GET', null, API_BASE)
}

const trackShipment = async function(trackingId){
    const response = await fetch(`${API_BASE}/shipments/track/${encodeURIComponent(trackingId.trim())}/`)
    const data = await response.json().catch(function(){
        return {}
    })
    if (!response.ok) {
        const error = new Error('Request failed')
        error.data = data
        error.status = response.status
        throw error
    }
    return data
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

export { createShipment, listShipments, trackShipment, mapServerErrors }