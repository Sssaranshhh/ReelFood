import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CreateFood.css'
import { API_URL } from '../../config'

const CreateFood = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null
  })
  const [videoPreview, setVideoPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file')
        return
      }

      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setError('Video file size must be less than 100MB')
        return
      }

      setFormData(prev => ({
        ...prev,
        video: file
      }))

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setVideoPreview(previewUrl)
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter a food name')
      return
    }
    if (!formData.video) {
      setError('Please select a video to upload')
      return
    }

    setUploading(true)

    try {
      const uploadData = new FormData()
      uploadData.append('name', formData.name)
      uploadData.append('description', formData.description)
      uploadData.append('video', formData.video)

      const response = await axios.post(
        `${API_URL}/api/food`,
        uploadData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log('Food created successfully:', response.data)

      // Reset form
      setFormData({ name: '', description: '', video: null })
      setVideoPreview(null)
      setSuccess(true)

      // Navigate after brief success display
      setTimeout(() => navigate('/'), 1500)

    } catch (err) {
      console.error('Upload error:', err)
      setError(err.response?.data?.message || 'Failed to upload food video')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="create-food-container">
      <div className="create-food-card">
        <div className="create-food-header">
          <h1 className="create-food-title">Upload Food Video</h1>
          <p className="create-food-subtitle">Share your delicious creations</p>
        </div>

        <form className="create-food-form" onSubmit={handleSubmit}>
          {/* Food Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Food Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="e.g., Margherita Pizza"
              value={formData.name}
              onChange={handleInputChange}
              disabled={uploading}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Describe your dish (optional)"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              disabled={uploading}
            />
          </div>

          {/* Video Upload */}
          <div className="form-group">
            <label htmlFor="video" className="form-label">Video *</label>
            <div className="video-upload-area">
              {!videoPreview ? (
                <label htmlFor="video" className="video-upload-label">
                  <div className="upload-icon">📹</div>
                  <div className="upload-text">
                    <span className="upload-primary">Click to upload video</span>
                    <span className="upload-secondary">MP4, MOV, AVI (max 100MB)</span>
                  </div>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                    disabled={uploading}
                    style={{ display: 'none' }}
                  />
                </label>
              ) : (
                <div className="video-preview-container">
                  <video
                    src={videoPreview}
                    controls
                    className="video-preview"
                  />
                  <button
                    type="button"
                    className="remove-video-btn"
                    onClick={() => {
                      setVideoPreview(null)
                      setFormData(prev => ({ ...prev, video: null }))
                    }}
                    disabled={uploading}
                  >
                    Remove Video
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="success-alert">
              ✓ Food video uploaded successfully! Redirecting...
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Food Video'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateFood