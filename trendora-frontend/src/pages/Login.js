import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/login', formData);
            const user = res.data;
            
            // Role-based redirection
            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
            localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: "400px"}}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input className="form-control mb-3" placeholder="Username" 
                    onChange={e => setFormData({...formData, username: e.target.value})} />
                <input className="form-control mb-3" type="password" placeholder="Password" 
                    onChange={e => setFormData({...formData, password: e.target.value})} />
                <button className="btn btn-dark w-100">Login</button>
            </form>
            <p className="mt-3">New here? <a href="/signup">Sign up</a></p>
        </div>
    );
};
export default Login;