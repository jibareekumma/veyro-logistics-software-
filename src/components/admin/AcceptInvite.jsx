
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { saveSession, parseErrors } from '../../api/auth'
import { acceptInvite } from '../../api/admin'

const AcceptInvite = function(){

    const { token } = useParams()
    const navigate = useNavigate()

    const [values, setValues] = useState({ password: '', confirm_password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = function(e){
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        if (loading) return
        setErrors({})
        setLoading(true)
        try {
            const data = await acceptInvite({ token: token, ...values })
            saveSession(data, true)
            navigate('/admin')
        } catch (error) {
            setErrors(parseErrors(error))
        } finally {
            setLoading(false)
        }
    }

    return <>
        <div className='accept-invite'>
            <h1>Join the VEYRO team</h1>
            <p>Create your password to activate your staff account.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={values.password} onChange={handleChange} autoComplete='new-password' />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div>
                    <label>Confirm password</label>
                    <input type='password' name='confirm_password' value={values.confirm_password} onChange={handleChange} autoComplete='new-password' />
                    {errors.confirm_password && <p>{errors.confirm_password}</p>}
                </div>
                {errors.general && <p>{errors.general}</p>}
                <button type='submit' disabled={loading}>
                    {loading ? 'Activating...' : 'Activate account'}
                </button>
            </form>
        </div>
    </>
}

export default AcceptInvite