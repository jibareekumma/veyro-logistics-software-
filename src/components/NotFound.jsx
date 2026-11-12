

import { Link, useNavigate } from 'react-router-dom'

import { hasSession } from '../api/auth'

import logo from "../assets/logo2.png"

import "../stylings/NotFound.scss"


const NotFound = function(){

    const navigate = useNavigate()

    const homePath = hasSession() ? '/dashboard' : '/'
    const homeLabel = hasSession() ? 'Go to Dashboard' : 'Go to Home'

    const handleBack = function(){
        if (window.history.length > 1) {
            navigate(-1)
            return
        }
        navigate(homePath)
    }

    return <>

        <div className="not-found">

            <img className="not-found-logo" src={logo} alt="Veyro logo" />

            <div className="not-found-card">

                <span className="not-found-code">404</span>

                <h3>Page not found</h3>

                <p>
                    The page you're looking for doesn't exist, was moved, or the link is incorrect.
                </p>

                <div className="not-found-actions">

                    <button type="button" className="not-found-back" onClick={handleBack}>
                        Go Back
                    </button>

                    <Link to={homePath} className="not-found-home">
                        {homeLabel}
                    </Link>

                </div>

                <Link to="/tracking" className="not-found-track">
                    Track a shipment instead
                </Link>

            </div>

        </div>

    </>
}


export default NotFound;