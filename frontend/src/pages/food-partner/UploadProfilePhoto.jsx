import React, { useState } from 'react'
import axios from 'axios'
import './UploadProfilePhoto.css'

const UploadProfilePhoto = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file')
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image file size must be less than 5MB')
                return
            }

            setSelectedFile(file)

            // Create preview URL
            const previewUrl = URL.createObjectURL(file)
            setPreview(previewUrl)
            setError(null)
            setSuccess(false)
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image first')
            return
        }

        setUploading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('photo', selectedFile)

            const response = await axios.post(
                'http://localhost:3000/api/food-partner/upload-photo',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            console.log('Profile photo uploaded:', response.data)
            setSuccess(true)

            // Clear selection after 2 seconds
            setTimeout(() => {
                setSelectedFile(null)
                setPreview(null)
                setSuccess(false)
            }, 2000)

        } catch (err) {
            console.error('Upload error:', err)
            setError(err.response?.data?.message || 'Failed to upload profile photo')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="upload-photo-page">
        <div className="upload-photo-container">
            <div className="upload-photo-card">
                <div className="upload-photo-header">
                    <h2 className="upload-photo-title">Profile Photo</h2>
                    <p className="upload-photo-subtitle">Upload your business logo or photo</p>
                </div>

                <div className="photo-upload-area">
                    {!preview ? (
                        <label htmlFor="photo-input" className="photo-upload-label">
                            <div className="upload-icon">📷</div>
                            <div className="upload-text">
                                <span className="upload-primary">Click to upload photo</span>
                                <span className="upload-secondary">JPG, PNG, GIF (max 5MB)</span>
                            </div>
                            <input
                                type="file"
                                id="photo-input"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                                style={{ display: 'none' }}
                            />
                        </label>
                    ) : (
                        <div className="photo-preview-container">
                            <img
                                src={preview}
                                alt="Preview"
                                className="photo-preview"
                            />
                            <div className="photo-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => {
                                        setPreview(null)
                                        setSelectedFile(null)
                                        setSuccess(false)
                                    }}
                                    disabled={uploading}
                                >
                                    Change Photo
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpload}
                                    disabled={uploading}
                                >
                                    {uploading ? 'Uploading...' : 'Upload'}
                                </button>
                            </div>
                        </div>
                    )}
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
                        Profile photo updated successfully!
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}

export default UploadProfilePhoto
