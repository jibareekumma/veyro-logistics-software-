
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser, hasSession, clearSession } from '../api/auth'

const ProtectedRoute = function({ children }){

    const [status, setStatus] = useState(hasSession() ? 'checking' : 'denied')

    useEffect(function(){
        if (!hasSession()) {
            return
        }
        let active = true
        getCurrentUser()
            .then(function(){
                if (active) {
                    setStatus('allowed')
                }
            })
            .catch(function(error){
                if (!active) {
                    return
                }
                if (error.status === 401) {
                    clearSession()
                    setStatus('denied')
                } else {
                    setStatus('allowed')
                }
            })
        return function(){
            active = false
        }
    }, [])

    if (status === 'checking') {
        return <p>Loading...</p>
    }

    if (status === 'denied') {
        return <Navigate to='/login' replace />
    }

    return children
}

const PublicRoute = function({ children }){

    if (hasSession()) {
        return <Navigate to='/dashboard' replace />
    }

    return children
}

export { ProtectedRoute, PublicRoute }