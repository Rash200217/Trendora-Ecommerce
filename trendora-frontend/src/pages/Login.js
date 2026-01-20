import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send login request
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                username: username,
                password: password
            });

            // 1. Get User Data
            const user = res.data;

            // 2. Save to Local Storage (Browser Memory)
            localStorage.setItem('user', JSON.stringify(user));

            // 3. ROLE-BASED REDIRECT
            // If Admin -> Go to Admin Panel
            // If User -> Go to Home Page
            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (err) {
            console.error(err);
            alert("Invalid Username or Password");
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1 py-5">
                <div className="card shadow border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <i className="fas fa-user-circle fa-3x text-dark mb-3"></i>
                        <h3 className="fw-bold">Welcome Back</h3>
                        <p className="text-muted small">Please login to your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="mb-3 text-end">
                            <Link to="/forgot-password" className="text-muted small text-decoration-none">
                                Forgot Password?
                            </Link>
                        </div>

                        <button className="btn btn-dark w-100 py-2 fw-bold" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <small>Don't have an account? <Link to="/signup" className="fw-bold text-dark">Sign Up</Link></small>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;