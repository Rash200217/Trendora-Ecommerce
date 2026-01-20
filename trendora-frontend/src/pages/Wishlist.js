import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchWishlist();
    }, []);

    const fetchWishlist = () => {
        axios.get(`http://localhost:8080/api/wishlist/${user.id}`)
             .then(res => setWishlist(res.data));
    };

    const removeFromWishlist = async (id) => {
        await axios.delete(`http://localhost:8080/api/wishlist/${id}`);
        fetchWishlist();
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 fw-bold">My Wishlist</h2>
                <div className="row">
                    {wishlist.length === 0 ? <p>No items in wishlist.</p> : wishlist.map(item => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card product-card h-100 border-0">
                                <Link to={`/product/${item.product.id}`}>
                                    <img src={item.product.imageUrl} className="card-img-top" alt={item.product.name} style={{height: '300px', objectFit:'cover'}}/>
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{item.product.name}</h5>
                                    <p className="text-muted">LKR {item.product.price}</p>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromWishlist(item.id)}>
                                        <i className="fas fa-times me-1"></i> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Wishlist;