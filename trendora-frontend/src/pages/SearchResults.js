import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // Get "?q=shirt" from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (query) {
            axios.get(`http://localhost:8080/api/products/search?query=${query}`)
                .then(res => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [query]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4">Search Results for: <span className="text-primary">"{query}"</span></h2>
                
                {loading ? (
                    <div className="text-center mt-5"><div className="spinner-border" /></div>
                ) : (
                    <div className="row">
                        {products.length === 0 ? (
                            <div className="col-12 text-center mt-5">
                                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                                <h4>No products found.</h4>
                                <p className="text-muted">Try searching for generic terms like "Pants", "Shirt", or "Man".</p>
                            </div>
                        ) : (
                            products.map(product => (
                                <div className="col-md-4 mb-4" key={product.id}>
                                    <div className="card product-card h-100 border-0">
                                        <div className="overflow-hidden rounded position-relative">
                                            <Link to={`/product/${product.id}`}>
                                                <img 
                                                    src={product.imageUrl} 
                                                    className="card-img-top" 
                                                    alt={product.name} 
                                                    style={{ height: '350px', objectFit: 'cover' }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="card-body text-center pt-3">
                                            <h5 className="card-title fw-bold">
                                                <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">{product.name}</Link>
                                            </h5>
                                            <p className="card-text text-muted">LKR {product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;