

import veyroLogo from '../assets/logo2.png'
import bellIcon from "../assets/icons/bell-icon.png"

import pfp from "../assets/photos/pfp.jpeg"


import "../stylings/dashboard-stylings/Header-Dashboard.css"

const Header = function(){
    return<>
    
    <div className='dashboard-header'>
                <div className='logo'>
                    <img src={veyroLogo} alt="Veyro Logo" 
                    loading='lazy'/>
                </div>
                <div className='icons'>
                    <img src={bellIcon} alt="Bell Icon"
                    loading='lazy' />
                    
                    <img src={pfp} alt="Profile Image" loading='lazy'
                    className='pfp'
                    />
                   
                </div>
            </div>
    
    
    </>
}


export default Header;