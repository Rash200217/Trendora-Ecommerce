import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            await axios.put('http://localhost:8080/api/auth/forgot-password', {
                username: formData.username,
                newPassword: formData.newPassword
            });
            alert("Password Reset Successful! Please Login.");
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("User not found or error occurred.");
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1 py-5">
                <div className="card shadow border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <i className="fas fa-lock-open fa-3x text-primary mb-3"></i>
                        <h3 className="fw-bold">Reset Password</h3>
                        <p className="text-muted small">Enter your username and a new password.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Username</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">New Password</label>
                            <input 
                                type="password"
                                className="form-control" 
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Confirm Password</label>
                            <input 
                                type="password"
                                className="form-control" 
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                required 
                            />
                        </div>

                        <button className="btn btn-dark w-100 py-2 fw-bold" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                    
                    <div className="text-center mt-3">
                        <Link to="/login" className="text-decoration-none">Back to Login</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;