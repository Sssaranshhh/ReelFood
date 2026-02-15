import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Profile.css'

const Profile = () => {
    const { partnerId } = useParams()
    const [partner, setPartner] = useState(null)
    const [foodItems, setFoodItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPartnerData = async () => {
            try {
                setLoading(true)

                // Fetch all food items and filter by partner
                const response = await axios.get('http://localhost:3000/api/food', { withCredentials: true })
                const partnerFoodItems = response.data.foodItems.filter(
                    item => item.foodPartner._id === partnerId
                )

                if (partnerFoodItems.length > 0) {
                    setPartner(partnerFoodItems[0].foodPartner)
                    setFoodItems(partnerFoodItems)
                } else {
                    setError('Food partner not found')
                }

                setLoading(false)
            } catch (err) {
                console.error('Error fetching partner data:', err)
                setError('Failed to load store information')
                setLoading(false)
            }
        }

        fetchPartnerData()
    }, [partnerId])

    if (loading) {
        return (
            <div className="profile-container loading">
                <div className="loading-spinner">Loading profile...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="profile-container error">
                <div className="error-message">{error}</div>
            </div>
        )
    }

    if (!partner) {
        return (
            <div className="profile-container empty">
                <div className="empty-message">Store not found</div>
            </div>
        )
    }

    // Get first letter of business name for avatar
    const avatarLetter = partner.name.charAt(0).toUpperCase()

    // Calculate statistics
    const totalMeals = foodItems.length
    const customerServe = totalMeals * 350 // Mock calculation: ~350 customers per meal item

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-info">
                    <div className="avatar">
                        {avatarLetter}
                    </div>
                    <div className="business-details">
                        <div className="business-name">{partner.name}</div>
                        <div className="business-address">{partner.address}</div>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat-item">
                        <div className="stat-label">total meals</div>
                        <div className="stat-value">{totalMeals}</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">customer serve</div>
                        <div className="stat-value">{customerServe >= 1000 ? `${(customerServe / 1000).toFixed(1)}K` : customerServe}</div>
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="video-grid">
                {foodItems.map(item => (
                    <div key={item._id} className="video-cell">
                        <video
                            className="video-thumbnail"
                            src={item.video}
                            muted
                            playsInline
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => {
                                e.target.pause()
                                e.target.currentTime = 0
                            }}
                        />
                        <div className="video-label">video</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile
