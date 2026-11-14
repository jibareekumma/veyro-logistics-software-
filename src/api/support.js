

import { API_BASE, authRequest } from './auth'

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
    return {
        subject: form.subject.trim(),
        category: form.category,
        tracking_id: form.trackingId.trim(),
        description: form.description.trim()
    }
}

const listTickets = function(params = {}){
    return authRequest(`/support/${buildQuery(params)}`, 'GET', null, API_BASE)
}

const getTicketStats = function(){
    return authRequest('/support/stats/', 'GET', null, API_BASE)
}

const getTicket = function(ticketId){
    return authRequest(`/support/${encodeURIComponent(ticketId)}/`, 'GET', null, API_BASE)
}

const createTicket = function(form){
    return authRequest('/support/', 'POST', buildPayload(form), API_BASE)
}

const mapTicketErrors = function(data){
    const result = { subject: '', category: '', trackingId: '', description: '', general: '' }
    if (!data) {
        result.general = 'Cannot reach the server. Please try again.'
        return result
    }
    Object.keys(data).forEach(function(key){
        const value = data[key]
        const message = Array.isArray(value) ? value[0] : String(value)
        if (key === 'tracking_id') {
            result.trackingId = message
        } else if (key === 'subject' || key === 'category' || key === 'description') {
            result[key] = message
        } else {
            result.general = message
        }
    })
    return result
}

export { listTickets, getTicketStats, getTicket, createTicket, mapTicketErrors }