

const API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/auth`

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
        error.status = response.status
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

const getStorage = function(){
    if (localStorage.getItem('veyro_refresh')) {
        return localStorage
    }
    if (sessionStorage.getItem('veyro_refresh')) {
        return sessionStorage
    }
    return null
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
    const storage = getStorage()
    return storage ? storage.getItem('veyro_access') : null
}

const hasSession = function(){
    return getStorage() !== null
}

const getStoredUser = function(){
    const storage = getStorage()
    if (!storage) {
        return null
    }
    try {
        return JSON.parse(storage.getItem('veyro_user'))
    } catch (error) {
        return null
    }
}

const refreshAccessToken = async function(){
    const storage = getStorage()
    if (!storage) {
        return null
    }
    try {
        const data = await request('/token/refresh/', 'POST', { refresh: storage.getItem('veyro_refresh') })
        storage.setItem('veyro_access', data.access)
        if (data.refresh) {
            storage.setItem('veyro_refresh', data.refresh)
        }
        return data.access
    } catch (error) {
        if (error.status === 401) {
            clearSession()
        }
        return null
    }
}

const authRequest = async function(path, method, body){
    try {
        return await request(path, method, body, getAccessToken())
    } catch (error) {
        if (error.status !== 401) {
            throw error
        }
        const newToken = await refreshAccessToken()
        if (!newToken) {
            throw error
        }
        return request(path, method, body, newToken)
    }
}

const registerUser = function(payload){
    return request('/register/', 'POST', payload)
}

const loginUser = function(payload){
    return request('/login/', 'POST', payload)
}

const getCurrentUser = function(){
    return authRequest('/me/', 'GET', null)
}

const logoutUser = function(){
    clearSession()
}

export { registerUser, loginUser, getCurrentUser, saveSession, clearSession, getAccessToken, hasSession, getStoredUser, logoutUser, parseErrors }