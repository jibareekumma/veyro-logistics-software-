

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
import { registerUser, saveSession, parseErrors } from '../../api/auth'






const Register = function(){


    const navigate = useNavigate();

    const [values, setValues] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        country: ''
    })
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const getPasswordStrength = (password) => {
        if (!password) return { label: '', level: 0 }

        let score = 0
        if (password.length >= 8) score++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
        if (/\d/.test(password)) score++
        if (/[^a-zA-Z0-9]/.test(password)) score++

        if (score <= 1) return { label: 'Weak', level: 1 }
        if (score === 2) return { label: 'Good', level: 2 }
        if (score === 3) return { label: 'Very Good', level: 3 }
        return { label: 'Strong', level: 4 }
    }

    const passwordStrength = getPasswordStrength(values.password)

    const navLinks = ['Home', 'Track Shipment', 'Services', 'About', 'Contact']

    const formItems = [


        {
            id: 1,
            name: 'full_name',
            label: 'Username',
            icon: userIcon,
            placeholder: "Enter your full name",
            type: 'text'
        },
        {
            id: 2,
            name: 'email',
            label: 'Email Address',
            icon: mailIcon,
            placeholder: "Enter your email address",
            type: 'text'
        },
        {
            id: 3,
            name: 'phone',
            label: 'Phone Number',
            icon: phoneIcon,
            placeholder: "+1 555 000 8888",
            type: 'tel'
        },
        {
            id: 4,
            name: 'password',
            label: 'Password',
            icon: lockIcon,
            placeholder: "Create a password",
            type: 'password'
        },
        {
            id: 5,
            name: 'confirm_password',
            label: 'Confirm Password',
            icon: lockIcon,
            placeholder: "Confirm your password",
            type: 'password'
        },
        {
            id: 6,
            name: 'country',
            label: 'Country/Region',
            icon: globeIcon,
            placeholder: "Input your country",
            type: 'text'
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
        if (!agreed) {
            setErrors({ general: 'Please accept the Terms of Services and Privacy Policy.' })
            return
        }
        setErrors({})
        setLoading(true)
        try {
            const data = await registerUser(values)
            saveSession(data, true)
            navigate('/dashboard')
        } catch (error) {
            setErrors(parseErrors(error))
        } finally {
            setLoading(false)
        }
    }

    return<>
        

        <div className="register-container">



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
                <p className='nav-hint'>Already have an account?</p>
                <a onClick = {() => navigate('/login')}
                >Sign In</a>
            </div >


            <div className='register-body'>

                <div className='register-main'>

                    <div className='text-container'>
                        <h5>CUSTOMER REGISTRATION</h5>
                        <h3>Create Your <br />
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
                                        <img src={a.icon} alt="" />
                                        <input
                                            type={
                                                a.name === 'password'
                                                    ? (showPassword ? 'text' : 'password')
                                                    : a.name === 'confirm_password'
                                                        ? (showConfirmPassword ? 'text' : 'password')
                                                        : a.type
                                            }
                                            name={a.name}
                                            value={values[a.name]}
                                            onChange={handleChange}
                                            placeholder={a.placeholder}
                                            autoComplete={
                                                a.name === 'password' || a.name === 'confirm_password'
                                                    ? 'new-password'
                                                    : a.name === 'email' ? 'email' : 'off'
                                            }
                                        />
                                        {(a.name === 'password' || a.name === 'confirm_password') && (
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => a.name === 'password'
                                                    ? setShowPassword(prev => !prev)
                                                    : setShowConfirmPassword(prev => !prev)
                                                }
                                                aria-label={
                                                    (a.name === 'password' ? showPassword : showConfirmPassword)
                                                        ? 'Hide password' : 'Show password'
                                                }
                                                aria-pressed={a.name === 'password' ? showPassword : showConfirmPassword}
                                            >
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    {(a.name === 'password' ? showPassword : showConfirmPassword) ? (
                                                        <>
                                                            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <path d="M3 3l18 18" />
                                                            <path d="M10.6 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a10 10 0 0 0 4-.8" />
                                                        </>
                                                    )}
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    {a.name === 'password' && values.password && (
                                        <div className={`password-strength strength-${passwordStrength.level}`}>
                                            <div className="strength-top">
                                                <span>Password strength</span>
                                                <span className="strength-label">{passwordStrength.label}</span>
                                            </div>
                                            <div
                                                className="strength-track"
                                                role="progressbar"
                                                aria-valuemin={0}
                                                aria-valuemax={4}
                                                aria-valuenow={passwordStrength.level}
                                                aria-label={`Password strength: ${passwordStrength.label}`}
                                            >
                                                {[1, 2, 3, 4].map(level => (
                                                    <span key={level} className={level <= passwordStrength.level ? 'filled' : ''} />
                                                ))}
                                            </div>
                                            <small>Use 8+ characters with uppercase and lowercase letters, a number, and a symbol.</small>
                                        </div>
                                    )}
                                    {errors[a.name] && <p className='error-text'>{errors[a.name]}</p>}
                                </div>
                            ) )}
                        </form>
                       <div className='tick-box'>
                        <input type="checkbox" 
                         checked={agreed}
                         onChange={(e) => setAgreed(e.target.checked)}
                        /> <p>I agree to the 
                            <mark>Terms of Services </mark> and 
                            <mark>Privacy Policy</mark>
                        </p>
                       </div>
                    </div>

                    <div className='buttons-container'>

                            {errors.general && <p className='error-text general-error'>{errors.general}</p>}

                            <button onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Creating Account...' : 'Create Account »'}
                            </button>

                            <div className='or'>
                                <span></span>
                                <p>or</p>
                                <span></span>
                            </div>

                            <div className='google-btn'>
                                <img src = {googleIcon}/>
                                <p>Continue with Google</p>
                            </div>

                            <div className='last-texts'>
                                <p>Already have an account?</p>
                                
                               <a onClick = {() => navigate('/login')}
                                >Sign In</a>
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



export default Register;
