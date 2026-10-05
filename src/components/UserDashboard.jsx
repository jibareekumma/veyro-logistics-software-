import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser } from '../api/auth'


const UserDashboard = function(){

    const navigate = useNavigate()
    const user = getStoredUser()

    const handleLogout = function(){
        logoutUser()
        navigate('/login')
    }

    return <>
        <h2>SUCCESSFULLY LOGGED IN</h2>
        {user && <p>Welcome, {user.full_name} ({user.email})</p>}
        <button onClick={handleLogout}>Log out</button>
    </>
}


export default UserDashboard;