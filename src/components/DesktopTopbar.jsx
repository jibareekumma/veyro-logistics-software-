

import { useState, useEffect, useRef } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { getStoredUser } from '../api/auth'

import searchIcon from "../assets/icons/search-icon.png"
import bellIcon from "../assets/icons/bell-icon.png"
import chevronDown from "../assets/icons/chevron-down.png"

import "../stylings/dashboard-stylings/Topbar.css"


const DesktopTopbar = function(){

    const user = getStoredUser()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const dropdownRef = useRef(null)
    const navigate = useNavigate()

    const getInitials = function(name){
        return name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map( (n) => n[0] )
            .join('')
            .toUpperCase()
    }

    useEffect(function(){

        const handleClickOutside = function(e){
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setDropdownOpen(false)
            }
        }

        const handleEscape = function(e){
            if(e.key === 'Escape'){
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return function(){
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }

    }, [])


    const handleLogout = function(){

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')

        setDropdownOpen(false)
        navigate('/login')

    }


    return <header className='topbar'>

        <div className='topbar-search'>
            <img src={searchIcon} alt="search icon"
            loading='lazy'/>
            <input type="text" placeholder='Search shipments, tracking IDs, or destinations...'/>
        </div>

        <div className='topbar-actions'>

            <div className='bell'>
                <img src={bellIcon} alt="notifications icon"
                loading='lazy'/>
                <span className='dot'>3</span>
            </div>

            {user && <div className='profile-container' ref={dropdownRef}>

                <div
                    className='profile'
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    role='button'
                    tabIndex={0}
                    aria-expanded={dropdownOpen}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' || e.key === ' '){
                            e.preventDefault()
                            setDropdownOpen(!dropdownOpen)
                        }
                    }}
                >

                    <div className='avatar'>{getInitials(user.full_name)}</div>

                    <div className='names'>
                        <h5>{user.full_name}</h5>
                        <p>Customer</p>
                    </div>

                    <img
                        className={dropdownOpen ? 'chevron rotate' : 'chevron'}
                        src={chevronDown}
                        alt="dropdown icon"
                        loading='lazy'
                    />

                </div>


                {dropdownOpen && <div className='profile-dropdown'>

                    <NavLink
                        to='/profile'
                        onClick={() => setDropdownOpen(false)}
                    >
                        Profile
                    </NavLink>

                    <button
                        type='button'
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>

                </div>}

            </div>}

        </div>

    </header>
}


export default DesktopTopbar;