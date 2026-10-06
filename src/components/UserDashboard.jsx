import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser } from '../api/auth'



// Photos/Icon Imports 
import veyroLogo from '../assets/logo2.png'
import bellIcon from "../assets/icons/bell-icon.png"
import searchIcon from "../assets/icons/search-icon.png"


const UserDashboard = function(){

    const navigate = useNavigate()
    const user = getStoredUser()

    const handleLogout = function(){
        logoutUser()
        navigate('/login')
    }


    const hour = new Date().getHours();
    const greeting =
    hour < 12
    ? "Good Morning"
    : hour < 18
    ? "Good Afternoon"
    : "Good Evening";



    return <>


        <div className='dashboard-header'>
            <div className='logo'>
                <img src={veyroLogo} alt="Veyro Logo" 
                loading='lazy'/>
            </div>
            <div className='icons'>
                <img src={bellIcon} alt="Bell Icon"
                loading='lazy' />
                <div className='pfp'></div>
            </div>
        </div>



        <div className='search-container'>
            <div className='inputs'>
                <img src={searchIcon} alt="search icon" 
                loading='lazy'/>
                <input type="text" placeholder='Search shipments, tracking ids...'/>
            </div>
            <button>Search</button>
        </div>
        <h2>WELCOME BACK</h2>
        {user && <p>{greeting}, {user.full_name} </p>}
        <button onClick={handleLogout}>Log out</button>
    </>
}


export default UserDashboard;