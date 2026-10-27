

import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser } from '../api/auth'
import useTrackSearch from "../api/useTrackSearch.js"
import CustomerStats from './CustomerStats'
import Header from './Header'
import Sidebar from './Sidebar'
import DesktopTopbar from './DesktopTopbar'
import RecentShipments from './RecentShipments'
import DashboardAside from './DashboardAside'
import "../stylings/dashboard-stylings/Greetings.css"
import "../stylings/dashboard-stylings/Layout.css"






// Photos/Icon Imports 

import searchIcon from "../assets/icons/search-icon.png"


const UserDashboard = function(){

    const navigate = useNavigate()
    const user = getStoredUser()
    const track = useTrackSearch()

    // const handleLogout = function(){
    //     logoutUser()
    //     navigate('/login')
    // }


    const hour = new Date().getHours();
    const greeting =
    hour < 12
    ? "Good Morning"
    : hour < 18
    ? "Good Afternoon"
    : "Good Evening";




    return <div className='dashboard-layout'>

        <Sidebar/>

        <div className='dashboard-main'>

            <DesktopTopbar/>

            <div className='mobile-only'>
                <Header/>
            </div>

            <div className='dashboard-content'>

                <div className='content-left'>

                    <div className='mobile-only'>
                        <div className='search-container'>
                            <div className='inputs'>
                                <img src={searchIcon} alt="search icon" 
                                loading='lazy'/>
                                <input type="text" placeholder='Search shipments, tracking ids...'
                                value={track.value}
                                onChange={(e) => track.setValue(e.target.value)}
                                onKeyDown={track.onKeyDown}/>
                            </div>
                            <button
                            onClick={track.submit}
                            >Search</button>
                        </div>
                    </div>

                    <div className='greetings'>
                    <h4>WELCOME BACK,</h4>
                    {user && <h3 className='h3'>{greeting}, {user.full_name} </h3>}
                    <p>Here's what's happening with your shipments</p>
                    
                    </div>


                    <CustomerStats/>

                    <RecentShipments/>

                </div>

                <DashboardAside/>

            </div>

        </div>

    </div>
}



export default UserDashboard;