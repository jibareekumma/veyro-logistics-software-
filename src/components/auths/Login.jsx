import '../../stylings/Register.css'

import { useState } from 'react'

import veyroLogo from '../../assets/logo2.png'

import userIcon from '../../assets/icons/user_icon.png'
import mailIcon from '../../assets/icons/mail-icon.png'
import phoneIcon from '../../assets/icons/phone_icon.png'
import lockIcon from '../../assets/icons/lock_icon.png'
import globeIcon from '../../assets/icons/globe_icon.png'

import googleIcon from '../../assets/icons/google-icon.png' 
import { useNavigate } from 'react-router-dom'
import { loginUser, saveSession, parseErrors } from '../../api/auth'






const Login = function(){

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [remember, setRemember] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const navLinks = ['Home', 'Track Shipment', 'Services', 'About', 'Contact']

    const formItems = [


        {
            id: 1,
            name: 'email',
            label: 'Email Address',
            icon: mailIcon,
            placeholder: "Enter your email address",
            type: 'text'
        },
        {
            id: 2,
            name: 'password',
            label: 'Password',
            icon: lockIcon,
            placeholder: "Enter your password",
            type: 'password'
        },
   

    ]

    const featureItems = [


        {
            id: 1,
            title: 'Track Shipments',
            text: 'Real-time updates from pickup to delivery.',
            icon: globeIcon
        },
        {
            id: 2,
            title: 'Manage Orders',
            text: 'Easily create and manage your shipments.',
            icon: userIcon
        },
        {
            id: 3,
            title: 'Get Support',
            text: 'Our team is here to help whenever you need us.',
            icon: phoneIcon
        },


    ]

    const handleChange = function(e){
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        if (loading) return
        setErrors({})
        setLoading(true)
        try {
            const data = await loginUser(values)
            saveSession(data, remember)
            navigate('/dashboard')
        } catch (error) {
            setErrors(parseErrors(error))
        } finally {
            setLoading(false)
        }
    }

    return<>
        

        <div className="register-container login-container">



            <div className='register-nav'>
                <div></div>
                <img src={veyroLogo} alt="Veyro Logo" />
                <ul className='nav-links'>
                    {navLinks.map( (a) =>(
                        <li key={a}>
                            <a>{a}</a>
                        </li>
                    ) )}
                </ul>
                <p className='nav-hint'>Don't have an account yet?</p>
                
               <a onClick = {() => navigate('/register')}
                >Register</a>
            </div >


            <div className='register-body'>

                <div className='register-main'>

                    <div className='text-container'>
                        <h5>CUSTOMER LOGIN</h5>
                        <h3>Login Into Your <br />
                       <mark> Customer Account </mark></h3>
                       <p>Join VEYRO to track your shipments, manage 
                        orders and enjoy a seamless logistics experience
                       </p>
                    </div>

                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            {formItems.map( (a) =>(
                                <div className='form-item' key={a.id}>
                                    <label>{a.label}</label>
                                    <div className='input'>
                                        <img src={a.icon} />
                                        <input type={a.type} 
                                         name={a.name}
                                         value={values[a.name]}
                                         onChange={handleChange}
                                         placeholder={a.placeholder}   
                                        />
                                    </div>
                                    {errors[a.name] && <p className='error-text'>{errors[a.name]}</p>}
                                </div>
                            ) )}
                        </form>
                       <div className='tick-box'>
                        <input type="checkbox" 
                         checked={remember}
                         onChange={(e) => setRemember(e.target.checked)}
                        /> <p>Remember me
                        </p>
                       </div>
                    </div>

                    <div className='buttons-container'>

                            {errors.general && <p className='error-text general-error'>{errors.general}</p>}

                            <button onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In »'}
                            </button>

                            <div className='or'>
                                <span></span>
                                <p>or</p>
                                <span></span>
                            </div>

                            <div className='google-btn'>
                                <img src = {googleIcon}/>
                                <p>Login with Google</p>
                            </div>

                            <div className='last-texts'>
                                <p>Don't have an account yet?</p>
                                
                                <a onClick = {() => navigate('/register')}
                                >Register</a>
                            </div>
                    </div>

                </div>

                <div className='side-panel'>
                    <div className='features'>
                        {featureItems.map( (a) =>(
                            <div className='feature-item' key={a.id}>
                                <img src={a.icon} />
                                <h4>{a.title}</h4>
                                <p>{a.text}</p>
                            </div>
                        ) )}
                    </div>
                </div>

            </div>
        </div>
    </>
}



export default Login;