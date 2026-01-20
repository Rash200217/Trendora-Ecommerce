import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // The backend defaults the role to 'CUSTOMER', so we just send username/password
            await axios.post('http://localhost:8080/api/signup', formData);
            alert('Signup successful! You can now login.');
            navigate('/login'); // Redirect to login page
        } catch (err) {
            console.error(err);
            alert('Signup failed. Username might already be taken.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <div className="card shadow p-4 border-0">
                <h2 className="text-center mb-4">Create Account</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input 
                            className="form-control" 
                            type="text"
                            required
                            onChange={e => setFormData({ ...formData, username: e.target.value })} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            className="form-control" 
                            type="password"
                            required
                            onChange={e => setFormData({ ...formData, password: e.target.value })} 
                        />
                    </div>
                    <button className="btn btn-dark w-100">Sign Up</button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;