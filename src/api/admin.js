import { API_BASE, authRequest } from './auth'

const ADMIN_URL = `${API_BASE}/admin`

const getOverview = function(){
    return authRequest('/overview/', 'GET', null, ADMIN_URL)
}

const getStaff = function(){
    return authRequest('/staff/', 'GET', null, ADMIN_URL)
}

const inviteStaff = function(payload){
    return authRequest('/staff/', 'POST', payload, ADMIN_URL)
}

const acceptInvite = function(payload){
    return authRequest('/accept-invite/', 'POST', payload, ADMIN_URL)
}

export { getOverview, getStaff, inviteStaff, acceptInvite }