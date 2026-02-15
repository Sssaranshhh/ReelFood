import React, { useRef, useEffect } from 'react'
import './ReelItem.css'

const ReelItem = ({ reel, isActive }) => {
    const videoRef = useRef(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (isActive) {
            video.play().catch(err => {
                console.log('Auto-play prevented:', err)
            })
        } else {
            video.pause()
            video.currentTime = 0
        }
    }, [isActive])

    const handleVisitStore = () => {
        // Navigate to store page - implement navigation logic
        console.log('Visit store:', reel.storeId)
    }

    return (
        <div className="reel-item">
            <video
                ref={videoRef}
                className="reel-video"
                src={reel.videoUrl}
                loop
                playsInline
                muted
            />

            <div className="reel-overlay">
                <div className="reel-content">
                    <p className="reel-description">{reel.description}</p>
                    <button className="visit-store-btn" onClick={handleVisitStore}>
                        Visit Store
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReelItem
