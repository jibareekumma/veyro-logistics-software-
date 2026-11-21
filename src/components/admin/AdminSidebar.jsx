

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import NotificationDot from '../notifications/NotificationDot'

import hamburgerMenu from "../../assets/icons/hamburger.png"

import veyroLogo from "../../assets/logo2.png"
import customerIcon from "../../assets/icons/link-admin.png"
import staffIcon from "../../assets/icons/total-admin.png"
import supportIcon from "../../assets/icons/nav-support.png"
import notificationIcon from "../../assets/icons/bell-icon.png"
import profileIcon from "../../assets/icons/user_icon.png"
import dashboardIcon from "../../assets/icons/dashboard-icon.png"

const NAV_ITEMS = [
    { label: 'Dashboard', to: '/admin',
       icon: dashboardIcon,
     },
    { label: 'Customers', to: '/admin/customers',
        icon: customerIcon,
     },
    { label: 'Staff', to: '/admin/staff',
        icon: staffIcon,
     },
    { label: 'Support', to: '/admin/support',
        icon: supportIcon,
     },
    { label: 'Notifications', to: '/admin/notifications', hasDot: true,
        icon: notificationIcon,
     },
    { label: 'Profile', to: '/admin/profile',
        icon: profileIcon,
     }
]

const getLinkClass = function({ isActive }){
    return isActive ? 'nav-link active' : 'nav-link'
}

const AdminSidebar = function({ showToggle }){

    const [isOpen, setIsOpen] = useState(false)

    const openSidebar = function(){
        setIsOpen(true)
    }

    const closeSidebar = function(){
        setIsOpen(false)
    }

    return <>
        {showToggle && (
            <button className='menu-button' onClick={openSidebar} aria-label='Open menu'>
                <img src={hamburgerMenu} alt="Hamburger Menu" className='hamburger-menu  smaller-icon' />
            </button>
        )}

        <div
            className={isOpen ? 'sidebar-overlay show' : 'sidebar-overlay'}
            onClick={closeSidebar}
        ></div>

        <aside className={isOpen ? 'admin-sidebar open' : 'admin-sidebar'}>
            <div className='sidebar-logo'>
                <img src={veyroLogo} alt="Veyro Logo" className='veyro-logo' />
            </div>

            <nav className='sidebar-nav'>
                {NAV_ITEMS.map(function(item){
                    return (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            end
                            className={getLinkClass}
                            onClick={closeSidebar}
                        >
                            <img src={item.icon} alt="Navigation Item Ico n" className='navigation-icon' />
                            <span>{item.label}</span>
                            {item.hasDot && <NotificationDot />}
                        </NavLink>
                    )
                })}
            </nav>

            <p className='sidebar-footer'>Global logistics. Simplified.</p>
        </aside>
    </>
}

export default AdminSidebar