import React, { useEffect, useRef, useState } from 'react'
import ReelItem from './ReelItem'
import './ReelsFeed.css'
import axios from 'axios'

const ReelsFeed = () => {
    const containerRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [reels, setReels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch food items from API
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:3000/api/food")

                const transformedReels = response.data.foodItems.map(item => ({
                    id: item._id,
                    videoUrl: item.video,
                    description: item.description || item.name,
                    foodPartnerId: item.foodPartner._id,
                    name: item.name
                }))

                setReels(transformedReels)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching food items:', err)
                setError('Failed to load videos')
                setLoading(false)
            }
        }

        fetchFoodItems()
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            const scrollTop = container.scrollTop
            const itemHeight = container.clientHeight
            const index = Math.round(scrollTop / itemHeight)

            // Update state to trigger video play/pause
            setCurrentIndex(index)
        }

        // Reduced debounce for faster response
        let scrollTimeout
        const debouncedScroll = () => {
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(handleScroll, 50) // Reduced from 100ms
        }

        container.addEventListener('scroll', debouncedScroll)

        // Set initial index on mount
        handleScroll()

        return () => {
            container.removeEventListener('scroll', debouncedScroll)
            clearTimeout(scrollTimeout)
        }
    }, [])

    // Trigger play for first video when reels load
    useEffect(() => {
        if (reels.length > 0) {
            // Small delay to ensure video element is rendered
            const timer = setTimeout(() => {
                setCurrentIndex(prev => prev)
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [reels.length])

    if (loading) {
        return (
            <div className="reels-feed loading">
                <div className="loading-spinner">Loading videos...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="reels-feed error">
                <div className="error-message">{error}</div>
            </div>
        )
    }

    if (reels.length === 0) {
        return (
            <div className="reels-feed empty">
                <div className="empty-message">No videos available</div>
            </div>
        )
    }

    return (
        <div className="reels-feed" ref={containerRef}>
            {reels.map((reel, index) => (
                <ReelItem
                    key={reel.id}
                    reel={reel}
                    isActive={index === currentIndex}
                />
            ))}
        </div>
    )
}

export default ReelsFeed