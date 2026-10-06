

import { getStoredUser } from '../api/auth'

import searchIcon from "../assets/icons/search-icon.png"
import bellIcon from "../assets/icons/bell-icon.png"
import chevronDown from "../assets/icons/chevron-down.png"

import "../stylings/dashboard-stylings/Topbar.css"


const DesktopTopbar = function(){

    const user = getStoredUser()

    const getInitials = function(name){
        return name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map( (n) => n[0] )
            .join('')
            .toUpperCase()
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

            {user && <div className='profile'>
                <div className='avatar'>{getInitials(user.full_name)}</div>
                <div className='names'>
                    <h5>{user.full_name}</h5>
                    <p>Customer</p>
                </div>
                <img src={chevronDown} alt="dropdown icon"
                loading='lazy'/>
            </div>}
        </div>
    </header>
}


export default DesktopTopbar;