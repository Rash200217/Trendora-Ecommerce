import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    // State for Mobile Menu Toggle
    const [isOpen, setIsOpen] = useState(false);
    
    // Search State
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsOpen(false);
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`);
            setSearchTerm('');
            setIsOpen(false);
        }
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/" style={{ letterSpacing: '2px' }} onClick={closeMenu}>
                    TRENDORA
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setIsOpen(!isOpen)} 
                    aria-controls="navbarNav" 
                    aria-expanded={isOpen} 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-uppercase fw-semibold" to="/new-collection" onClick={closeMenu}>New Collection</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link text-uppercase fw-semibold" to="/category/men" onClick={closeMenu}>Men</Link></li>
                        <li className="nav-item"><Link className="nav-link text-uppercase fw-semibold" to="/category/women" onClick={closeMenu}>Women</Link></li>
                        <li className="nav-item"><Link className="nav-link text-uppercase fw-semibold" to="/category/kids" onClick={closeMenu}>Kids</Link></li>
                    </ul>

                    {/* SEARCH BAR */}
                    <form className="d-flex me-lg-3 my-3 my-lg-0" onSubmit={handleSearch}>
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

                    {/* ICONS & USER ACTIONS */}
                    <div className="d-flex align-items-center gap-3">
                        {user ? (
                            <>
                                {/* Wishlist & Cart Icons */}
                                <Link to="/wishlist" className="text-dark position-relative me-2" onClick={closeMenu}>
                                    <i className="fas fa-heart fs-5"></i>
                                </Link>
                                <Link to="/cart" className="text-dark position-relative me-3" onClick={closeMenu}>
                                    <i className="fas fa-shopping-bag fs-5"></i>
                                </Link>
                                
                                {/* DISPLAY USERNAME HERE */}
                                <span className="fw-bold text-uppercase small border-end pe-3 me-2">
                                    Hi, {user.username}
                                </span>

                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="btn btn-sm btn-outline-dark" onClick={closeMenu}>Admin</Link>
                                )}
                                <button onClick={handleLogout} className="btn btn-sm btn-primary text-white">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-dark rounded-pill px-4" onClick={closeMenu}>Login</Link>
                                <Link to="/signup" className="btn btn-dark rounded-pill px-4" onClick={closeMenu}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
