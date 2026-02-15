import React, { useEffect, useRef, useState } from 'react'
import ReelItem from './ReelItem'
import './ReelsFeed.css'

const ReelsFeed = () => {
    const containerRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Mock data - replace with actual API data
    const reels = [
        {
            id: 1,
            videoUrl: 'https://ik.imagekit.io/ewkwuxuol/dae5f3f4-fcc7-404b-b8a5-bb7dbdd351a0_2MvOd5zgj',
            description: 'Delicious homemade pasta with fresh tomato sauce and basil. Perfect for a cozy dinner!',
            storeId: 'store-1',
            storeName: 'Italian Kitchen'
        },
        {
            id: 2,
            videoUrl: 'https://ik.imagekit.io/ewkwuxuol/a56d3c3d-750a-4135-ba56-42ddab8c26a8_Kbc6zP_CL',
            description: 'Amazing sushi rolls made with the freshest ingredients',
            storeId: 'store-2',
            storeName: 'Sushi Paradise'
        },
        {
            id: 3,
            videoUrl: 'https://ik.imagekit.io/ewkwuxuol/dae5f3f4-fcc7-404b-b8a5-bb7dbdd351a0_2MvOd5zgj',
            description: 'Crispy fried chicken with our secret spice blend that will blow your mind',
            storeId: 'store-3',
            storeName: 'Chicken Delight'
        }
    ]

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            const scrollTop = container.scrollTop
            const itemHeight = container.clientHeight
            const index = Math.round(scrollTop / itemHeight)
            setCurrentIndex(index)
        }

        container.addEventListener('scroll', handleScroll)
        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

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
