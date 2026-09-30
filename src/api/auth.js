const API_URL = 'http://127.0.0.1:8000/api/auth'

const request = async function(path, method, body, token){
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    const response = await fetch(`${API_URL}${path}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined
    })
    const data = await response.json().catch(function(){
        return {}
    })
    if (!response.ok) {
        const error = new Error('Request failed')
        error.data = data
        throw error
    }
    return data
}

const parseErrors = function(error){
    const result = {}
    if (!error.data) {
        result.general = 'Cannot reach the server. Please try again.'
        return result
    }
    Object.keys(error.data).forEach(function(key){
        const value = error.data[key]
        result[key] = Array.isArray(value) ? value[0] : String(value)
    })
    if (result.detail) {
        result.general = result.detail
    } else if (result.non_field_errors) {
        result.general = result.non_field_errors
    }
    return result
}

const clearSession = function(){
    ['veyro_access', 'veyro_refresh', 'veyro_user'].forEach(function(key){
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
    })
}

const saveSession = function(data, remember){
    clearSession()
    const store = remember ? localStorage : sessionStorage
    store.setItem('veyro_access', data.tokens.access)
    store.setItem('veyro_refresh', data.tokens.refresh)
    store.setItem('veyro_user', JSON.stringify(data.user))
}

const getAccessToken = function(){
    return localStorage.getItem('veyro_access') || sessionStorage.getItem('veyro_access')
}

const registerUser = function(payload){
    return request('/register/', 'POST', payload)
}

const loginUser = function(payload){
    return request('/login/', 'POST', payload)
}

const getCurrentUser = function(){
    return request('/me/', 'GET', null, getAccessToken())
}

export { registerUser, loginUser, getCurrentUser, saveSession, clearSession, getAccessToken, parseErrors }