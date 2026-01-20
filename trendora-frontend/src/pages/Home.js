import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const [products, setProducts] = useState([]);
    
    // Carousel State
    const [heroImages, setHeroImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Fetch Products
        axios.get('http://localhost:8080/api/products').then(res => setProducts(res.data.slice(0, 3)));
        
        // Fetch Hero Images
        axios.get('http://localhost:8080/api/hero-images').then(res => {
            if(res.data.length > 0) setHeroImages(res.data);
            else {
                // Fallback default image if admin hasn't added any
                setHeroImages([{ imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }]);
            }
        });
    }, []);

    // Slider Logic
    const nextSlide = () => {
        setCurrentSlide(prev => (prev === heroImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? heroImages.length - 1 : prev - 1));
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            {/* --- CAROUSEL HERO SECTION --- */}
            <div className="position-relative" style={{ height: '70vh', marginBottom: '3rem', backgroundColor: '#000' }}>
                
                {/* Image Display */}
                {heroImages.length > 0 && (
                    <div 
                        className="w-100 h-100 d-flex align-items-center justify-content-center text-center text-white"
                        style={{ 
                            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${heroImages[currentSlide].imageUrl}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'background-image 0.5s ease-in-out'
                        }}
                    >
                        <div>
                            <h5 className="text-uppercase letter-spacing-2 mb-2">New Collection</h5>
                            <h1 className="display-3 fw-bold mb-4">TRENDORA SPRING 2026</h1>
                            <Link to="/new-collection" className="btn btn-light btn-lg rounded-pill px-5 shadow-sm fw-bold">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                )}

                {/* Arrow Keys (Only show if more than 1 image) */}
                {heroImages.length > 1 && (
                    <>
                        <button 
                            className="btn btn-link position-absolute top-50 start-0 translate-middle-y text-white fs-1 ms-3" 
                            onClick={prevSlide}
                            style={{ textDecoration: 'none', opacity: 0.7 }}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button 
                            className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-white fs-1 me-3" 
                            onClick={nextSlide}
                            style={{ textDecoration: 'none', opacity: 0.7 }}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </>
                )}
                
                {/* Dots Indicators */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
                    {heroImages.map((_, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setCurrentSlide(idx)}
                            style={{ 
                                width: '12px', 
                                height: '12px', 
                                borderRadius: '50%', 
                                backgroundColor: currentSlide === idx ? '#fff' : 'rgba(255,255,255,0.5)', 
                                cursor: 'pointer' 
                            }} 
                        />
                    ))}
                </div>
            </div>

            {/* Links and Products Grid (Same as before) */}
            <div className="container text-center mb-5">
                {/* ... existing links ... */}
                <div className="btn-group" role="group">
                    <Link to="/new-collection" className="btn btn-outline-dark px-4 rounded-pill me-2">All</Link>
                    <Link to="/category/men" className="btn btn-outline-dark px-4 rounded-pill me-2">Man</Link>
                    <Link to="/category/women" className="btn btn-outline-dark px-4 rounded-pill me-2">Woman</Link>
                    <Link to="/category/kids" className="btn btn-outline-dark px-4 rounded-pill">Kid</Link>
                </div>
            </div>

            <div className="container flex-grow-1">
                <h3 className="text-center mb-5 fw-bold text-uppercase">Featured Items</h3>
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-4 mb-5" key={product.id}>
                            <div className="card product-card h-100 border-0">
                                <div className="overflow-hidden rounded position-relative">
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{ height: '350px', objectFit: 'cover' }} />
                                    </Link>
                                </div>
                                <div className="card-body text-center pt-3">
                                    <h5 className="card-title fw-bold">
                                        <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">{product.name}</Link>
                                    </h5>
                                    <p className="card-text text-muted fs-5">LKR {product.price}</p>
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

export default Home;