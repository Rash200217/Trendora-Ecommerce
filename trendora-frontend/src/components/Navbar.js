import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Search State
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`); // Redirect to search page
            setSearchTerm(''); // Clear input
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/" style={{ letterSpacing: '2px' }}>
                    TRENDORA
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-uppercase fw-semibold" to="/new-collection">New Collection</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link text-uppercase fw-semibold" to="/category/men">Men</Link></li>
                        <li className="nav-item"><Link className="nav-link text-uppercase fw-semibold" to="/category/women">Women</Link></li>
                        <li className="nav-item"><Link className="nav-link text-uppercase fw-semibold" to="/category/kids">Kids</Link></li>
                    </ul>

                    {/* --- NEW SEARCH BAR --- */}
                    <form className="d-flex me-3" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input 
                                className="form-control border-end-0 rounded-start" 
                                type="search" 
                                placeholder="Search..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary border-start-0 rounded-end" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>

                    {/* Icons & User Actions */}
                    <div className="d-flex align-items-center gap-3">
                        {user ? (
                            <>
                                <Link to="/wishlist" className="text-dark position-relative me-2"><i className="fas fa-heart fs-5"></i></Link>
                                <Link to="/cart" className="text-dark position-relative me-3"><i className="fas fa-shopping-bag fs-5"></i></Link>
                                
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="btn btn-sm btn-outline-dark">Admin</Link>
                                )}
                                <button onClick={handleLogout} className="btn btn-sm btn-primary text-white">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-dark rounded-pill px-4">Login</Link>
                                <Link to="/signup" className="btn btn-dark rounded-pill px-4">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;