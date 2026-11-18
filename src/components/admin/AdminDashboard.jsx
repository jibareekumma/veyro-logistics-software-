import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser, parseErrors } from '../../api/auth'
import { getOverview, getStaff, inviteStaff } from '../../api/admin'

const ROLES = ['support', 'operations', 'finance', 'super_admin']

const AdminDashboard = function(){

    const navigate = useNavigate()
    const user = getStoredUser()
    const isSuperAdmin = user && user.role === 'super_admin'

    const [overview, setOverview] = useState(null)
    const [staff, setStaff] = useState([])
    const [form, setForm] = useState({ full_name: '', email: '', role: 'support' })
    const [errors, setErrors] = useState({})
    const [inviteLink, setInviteLink] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(function(){
        const load = async function(){
            try {
                setOverview(await getOverview())
                if (isSuperAdmin) {
                    setStaff(await getStaff())
                }
            } catch (error) {
                if (error.status === 401) {
                    navigate('/login')
                } else if (error.status === 403) {
                    navigate('/dashboard')
                }
            }
        }
        load()
    }, [])

    const handleChange = function(e){
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleInvite = async function(e){
        e.preventDefault()
        if (loading) return
        setErrors({})
        setInviteLink('')
        setLoading(true)
        try {
            const data = await inviteStaff(form)
            setInviteLink(`${window.location.origin}/accept-invite/${data.invite_token}`)
            setForm({ full_name: '', email: '', role: 'support' })
            setStaff(await getStaff())
        } catch (error) {
            setErrors(parseErrors(error))
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = function(){
        logoutUser()
        navigate('/login')
    }

    return <>
        <div className='admin-dashboard'>

            <header>
                <h1>Admin Dashboard</h1>
                <p>{user ? user.full_name : ''} ({user ? user.role : ''})</p>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <section>
                <h2>Overview</h2>
                {overview ? (
                    <div>
                        <div><h3>{overview.total_customers}</h3><p>Total customers</p></div>
                        <div><h3>{overview.new_customers_7d}</h3><p>New customers (7 days)</p></div>
                        <div><h3>{overview.total_staff}</h3><p>Total staff</p></div>
                        <div><h3>{overview.active_staff}</h3><p>Active staff</p></div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </section>

            {isSuperAdmin && (
                <section>
                    <h2>Staff</h2>

                    <form onSubmit={handleInvite}>
                        <h3>Invite staff</h3>
                        <div>
                            <label>Full name</label>
                            <input name='full_name' value={form.full_name} onChange={handleChange} />
                            {errors.full_name && <p>{errors.full_name}</p>}
                        </div>
                        <div>
                            <label>Email</label>
                            <input name='email' value={form.email} onChange={handleChange} />
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div>
                            <label>Role</label>
                            <select name='role' value={form.role} onChange={handleChange}>
                                {ROLES.map(function(role){
                                    return <option key={role} value={role}>{role}</option>
                                })}
                            </select>
                            {errors.role && <p>{errors.role}</p>}
                        </div>
                        {errors.general && <p>{errors.general}</p>}
                        <button type='submit' disabled={loading}>
                            {loading ? 'Creating invite...' : 'Create invite link'}
                        </button>
                    </form>

                    {inviteLink && (
                        <div>
                            <p>Send this link to the new staff member. It works once and expires in 7 days.</p>
                            <input readOnly value={inviteLink} onFocus={function(e){ e.target.select() }} />
                        </div>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map(function(member){
                                return (
                                    <tr key={member.id}>
                                        <td>{member.full_name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.role}</td>
                                        <td>{member.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
            )}

        </div>
    </>
}

export default AdminDashboard