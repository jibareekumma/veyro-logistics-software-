
import { NavLink } from 'react-router-dom'

import veyroLogo from '../../assets/logo2.png'
import bellIcon from "../../assets/icons/bell-icon.png"

import NotificationDot from '../notifications/NotificationDot'

import "../../stylings/dashboard-stylings/Header-Dashboard.css"

import AdminSidebar from './AdminSidebar'

const AdminHeader = function(){
    return<>

    <div className='dashboard-header'>
                <div className='logo'>
                    <img src={veyroLogo} alt="Veyro Logo"
                    loading='lazy'/>
                </div>
                <div className='icons'>
                    <NavLink to='/admin/notifications' className='header-bell' aria-label='Notifications'>
                        <img src={bellIcon} alt="Bell Icon"
                        loading='lazy' />
                        <NotificationDot className='floating'/>
                    </NavLink>

                    <AdminSidebar showToggle/>

                </div>
            </div>

    </>
}

export default AdminHeader