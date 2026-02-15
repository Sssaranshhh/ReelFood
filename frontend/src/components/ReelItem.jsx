import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ReelItem.css'

const ReelItem = ({ reel, isActive }) => {
    const videoRef = useRef(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (isActive) {
            // Small delay to ensure video is ready
            const playTimeout = setTimeout(() => {
                video.play().catch(err => {
                    console.log('Auto-play prevented:', err)
                    // Try unmuting and playing again if blocked
                    video.muted = true
                    video.play().catch(e => console.log('Still blocked:', e))
                })
            }, 100)

            return () => clearTimeout(playTimeout)
        } else {
            video.pause()
            video.currentTime = 0
        }
    }, [isActive])

    return (
        <div className="reel-item">
            <video
                ref={videoRef}
                className="reel-video"
                src={reel.videoUrl}
                loop
                playsInline
                muted
                preload="auto"
            />

            <div className="reel-overlay">
                <div className="reel-content">
                    <p className="reel-description">{reel.description}</p>
                    <Link
                        to={`/food-partner/${reel.foodPartnerId}`}
                        className="visit-store-btn"
                    >
                        Visit Store
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ReelItem
