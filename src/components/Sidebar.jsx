import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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


const Sidebar = function({ showToggle }){

    const [open, setOpen] = useState(false)

    const links = [
        { id: 1, label: 'Dashboard', to: '/dashboard', icon: dashboardIcon },
        { id: 2, label: 'Shipments', to: '/shipments', icon: shipmentsIcon },
        { id: 3, label: 'Track a Package', to: '/track', icon: searchIcon },
        { id: 4, label: 'Addresses', to: '/addresses', icon: addressesIcon },
        { id: 5, label: 'Support', to: '/support', icon: supportIcon },
        { id: 6, label: 'Notifications', to: '/notifications', icon: bellIcon, badge: 3 },
        { id: 7, label: 'Profile', to: '/profile', icon: profileIcon },
    ]

    useEffect(function(){
        if(!open){
            return
        }

        const onKey = function(e){
            if(e.key === 'Escape'){
                setOpen(false)
            }
        }

        const onResize = function(){
            if(window.innerWidth >= 768){
                setOpen(false)
            }
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKey)
        window.addEventListener('resize', onResize)

        return function(){
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('resize', onResize)
        }
    }, [open])

    const sidebarClass = 'sidebar' + (showToggle ? ' drawer' : '') + (open ? ' open' : '')

    const drawer = <>

        <div
            className={open ? 'sidebar-overlay show' : 'sidebar-overlay'}
            onClick={() => setOpen(false)}
        ></div>

        <aside className={sidebarClass}>
            <button
                className='menu-close'
                onClick={() => setOpen(false)}
                aria-label='Close menu'
            >&times;</button>

            <img className='logo' src={logo} alt="Veyro logo"
            loading='lazy'/>

            <nav>
                {links.map( (a) => (
                    <NavLink to={a.to} key={a.id} className='nav-link'
                    onClick={() => setOpen(false)}>
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
    </>

    return <>

        {showToggle && (
            <button
                className={open ? 'menu-toggle hidden' : 'menu-toggle'}
                onClick={() => setOpen(true)}
                aria-label='Open menu'
                aria-expanded={open}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        )}

        {showToggle ? createPortal(drawer, document.body) : drawer}
    </>
}


export default Sidebar;