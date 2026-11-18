import { Navigate } from 'react-router-dom'
import { hasSession, getStoredUser } from '../../api/auth'

const STAFF_ROLES = ['support', 'operations', 'finance', 'super_admin']

const AdminRoute = function({ children }){
    if (!hasSession()) {
        return <Navigate to='/login' replace />
    }
    const user = getStoredUser()
    if (!user || !STAFF_ROLES.includes(user.role)) {
        return <Navigate to='/dashboard' replace />
    }
    return children
}

export default AdminRoute