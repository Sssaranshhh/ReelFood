import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './FoodPartnerStore.css'

const FoodPartnerStore = () => {
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
                const response = await axios.get('http://localhost:3000/api/food')
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
            <div className="store-container loading">
                <div className="loading-spinner">Loading store...</div>
            </div>
        )
    }

    if (error)  {
        return (
            <div className="store-container error">
                <div className="error-message">{error}</div>
            </div>
        )
    }

    if (!partner) {
        return (
            <div className="store-container empty">
                <div className="empty-message">Store not found</div>
            </div>
        )
    }

    return (
        <div className="store-container">
            <div className="store-header">
                <h1 className="store-name">{partner.name}</h1>
                <div className="store-info">
                    <p><strong>Contact:</strong> {partner.contactName}</p>
                    <p><strong>Phone:</strong> {partner.phone}</p>
                    <p><strong>Address:</strong> {partner.address}</p>
                </div>
            </div>

            <div className="store-items">
                <h2 className="section-title">Our Menu</h2>
                <div className="items-grid">
                    {foodItems.map(item => (
                        <div key={item._id} className="food-card">
                            <video
                                className="food-video"
                                src={item.video}
                                controls
                                playsInline
                            />
                            <div className="food-details">
                                <h3 className="food-name">{item.name}</h3>
                                <p className="food-description">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FoodPartnerStore
