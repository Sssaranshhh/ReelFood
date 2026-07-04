import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ReelItem.css'

const ReelItem = ({ reel, isActive }) => {
    const videoRef = useRef(null)
    const [muted, setMuted] = useState(true)
    const [showMuteHint, setShowMuteHint] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (isActive) {
            // Reduced delay for faster play
            const playTimeout = setTimeout(() => {
                video.muted = muted
                const playPromise = video.play()
                if (playPromise !== undefined) {
                    playPromise.catch(err => {
                        // Ensure video is muted and try again
                        video.muted = true
                        setMuted(true)
                        video.play().catch(e => console.log('Still blocked:', e))
                    })
                }
            }, 50)

            return () => clearTimeout(playTimeout)
        } else {
            video.pause()
            video.currentTime = 0
        }
    }, [isActive])

    // Sync muted state to video element
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        video.muted = muted
    }, [muted])

    const toggleMute = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setMuted(prev => !prev)
        // Show hint briefly
        setShowMuteHint(true)
        setTimeout(() => setShowMuteHint(false), 1200)
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
                preload="auto"
            />

            {/* Mute / Unmute button */}
            <button
                className="mute-btn"
                onClick={toggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
            >
                {muted ? '🔇' : '🔊'}
            </button>

            {/* Mute hint toast */}
            {showMuteHint && (
                <div className="mute-toast">
                    {muted ? 'Muted' : 'Unmuted'}
                </div>
            )}

            <div className="reel-overlay">
                <div className="reel-content">
                    <div className="reel-tag">🧑‍🍳 Partner Kitchen</div>
                    {reel.name && <span className="reel-name">{reel.name}</span>}
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
