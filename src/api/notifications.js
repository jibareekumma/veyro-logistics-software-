

import { API_BASE, authRequest } from './auth'

const NOTIFICATIONS_BASE = `${API_BASE}/notifications`

const getNotifications = function(){
    return authRequest('/', 'GET', null, NOTIFICATIONS_BASE)
}

const markNotificationRead = function(id){
    return authRequest(`/${id}/read/`, 'POST', {}, NOTIFICATIONS_BASE)
}

const markAllNotificationsRead = function(){
    return authRequest('/read-all/', 'POST', {}, NOTIFICATIONS_BASE)
}

export { getNotifications, markNotificationRead, markAllNotificationsRead }