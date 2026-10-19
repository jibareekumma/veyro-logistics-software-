import veyroLogo from '../assets/logo2.png'
import bellIcon from "../assets/icons/bell-icon.png"


import "../stylings/dashboard-stylings/Header-Dashboard.css"


import Sidebar from './Sidebar'

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

                    <Sidebar showToggle/>
                   
                </div>
            </div>
    
    
    </>
}


export default Header;