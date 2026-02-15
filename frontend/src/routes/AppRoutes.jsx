import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import FoodPartnerStore from '../pages/general/FoodPartnerStore'
import Profile from '../pages/food-partner/Profile'
import UploadProfilePhoto from '../pages/food-partner/UploadProfilePhoto'

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/" element={<Home />} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/upload-profile-photo" element={<UploadProfilePhoto />} />
                <Route path="/food-partner/:partnerId" element={<Profile />} />
            </Routes>
        </Router>
    )
}