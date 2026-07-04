import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './Navigation.css'
import { API_URL } from '../config'

const Navigation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null)

    // Load user state from localStorage
    const loadUser = () => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error(e)
            }
        } else {
            setUser(null)
        }
    }

    useEffect(() => {
        loadUser()

        // Listen for custom auth events
        window.addEventListener('authChange', loadUser)
        return () => window.removeEventListener('authChange', loadUser)
    }, [])

    const handleLogout = async () => {
        try {
            // Log out from backend
            const isPartner = user?.role === 'partner'
            const logoutUrl = isPartner 
                ? `${API_URL}/api/auth/food-partner/logout` 
                : `${API_URL}/api/auth/user/logout`
            
            await axios.get(logoutUrl, { withCredentials: true })
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            // Always clean up local storage and state
            localStorage.removeItem('user')
            setUser(null)
            window.dispatchEvent(new Event('authChange'))
            navigate('/')
        }
    }

    // Hide navigation on auth pages for cleaner look
    const isAuthPage = ['/user/login', '/user/register', '/food-partner/login', '/food-partner/register'].includes(location.pathname)
    if (isAuthPage) return null

    return (
        <nav className="global-nav">
            {/* Desktop Brand Logo */}
            <div className="nav-brand-container">
                <Link to="/" className="nav-brand">
                    <span className="brand-icon-mini">🍔</span>
                    <span className="brand-text-mini">ReelFood</span>
                </Link>
            </div>

            {/* Navigation links */}
            <div className="nav-links">
                <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                    <span className="nav-icon">🏠</span>
                    <span className="nav-label">Feed</span>
                </Link>

                {user?.role === 'partner' && (
                    <>
                        <Link to="/create-food" className={`nav-item ${location.pathname === '/create-food' ? 'active' : ''}`}>
                            <span className="nav-icon">➕</span>
                            <span className="nav-label">Add Food Item</span>
                        </Link>
                        <Link to="/upload-profile-photo" className={`nav-item ${location.pathname === '/upload-profile-photo' ? 'active' : ''}`}>
                            <span className="nav-icon">📷</span>
                            <span className="nav-label">Store Photo</span>
                        </Link>
                        <Link to={user._id ? `/food-partner/${user._id}` : '/food-partner/login'} className={`nav-item ${location.pathname.startsWith('/food-partner/') ? 'active' : ''}`}>
                            <span className="nav-icon">👤</span>
                            <span className="nav-label">My Store</span>
                        </Link>
                    </>
                )}

                {user ? (
                    <button onClick={handleLogout} className="nav-item nav-logout-btn">
                        <span className="nav-icon">🚪</span>
                        <span className="nav-label">Logout</span>
                    </button>
                ) : (
                    <>
                        <Link to="/user/login" className={`nav-item ${location.pathname === '/user/login' ? 'active' : ''}`}>
                            <span className="nav-icon">🔑</span>
                            <span className="nav-label">Sign In</span>
                        </Link>
                        <Link to="/user/register" className={`nav-item ${location.pathname === '/user/register' ? 'active' : ''}`}>
                            <span className="nav-icon">👥</span>
                            <span className="nav-label">Sign Up</span>
                        </Link>
                    </>
                )}
            </div>

            {/* Desktop User Status Info */}
            {user && (
                <div className="nav-user-status">
                    <div className="status-dot"></div>
                    <div className="status-info">
                        <span className="status-name">{user.fullName || user.name}</span>
                        <span className="status-role">{user.role === 'partner' ? 'Food Partner' : 'User'}</span>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
