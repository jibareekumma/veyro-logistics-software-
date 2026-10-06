

import { NavLink } from 'react-router-dom'

import logo from "../assets/logo2.png"
import dashboardIcon from "../assets/icons/nav-dashboard.png"
import shipmentsIcon from "../assets/icons/nav-shipments.png"
import searchIcon from "../assets/icons/search-icon.png"
import addressesIcon from "../assets/icons/nav-addresses.png"
import supportIcon from "../assets/icons/nav-support.png"
import bellIcon from "../assets/icons/bell-icon.png"
import profileIcon from "../assets/icons/nav-profile.png"

import "../stylings/dashboard-stylings/Sidebar.css"


const Sidebar = function(){

    const links = [
        { id: 1, label: 'Dashboard', to: '/dashboard', icon: dashboardIcon },
        { id: 2, label: 'Shipments', to: '/shipments', icon: shipmentsIcon },
        { id: 3, label: 'Track a Package', to: '/track', icon: searchIcon },
        { id: 4, label: 'Addresses', to: '/addresses', icon: addressesIcon },
        { id: 5, label: 'Support', to: '/support', icon: supportIcon },
        { id: 6, label: 'Notifications', to: '/notifications', icon: bellIcon, badge: 3 },
        { id: 7, label: 'Profile', to: '/profile', icon: profileIcon },
    ]

    return <aside className='sidebar'>
        <img className='logo' src={logo} alt="Veyro logo"
        loading='lazy'/>

        <nav>
            {links.map( (a) => (
                <NavLink to={a.to} key={a.id} className='nav-link'>
                    <img src={a.icon} alt={a.label + " icon"}
                    loading='lazy'/>
                    <span>{a.label}</span>
                    {a.badge && <span className='badge'>{a.badge}</span>}
                </NavLink>
            ))}
        </nav>

        <div className='tagline'>
            <p>GLOBAL LOGISTICS.</p>
            <p>SIMPLIFIED.</p>
        </div>
    </aside>
}


export default Sidebar;