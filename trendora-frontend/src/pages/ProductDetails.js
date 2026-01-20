import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleAddToCart = async () => {
        if (!user) { alert("Please login."); return; }
        
        try {
            await axios.post('http://localhost:8080/api/cart/add', {
                userId: user.id,
                productId: product.id,
                quantity: quantity,
                size: size
            });
            alert("Added to Cart!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) { alert("Please login."); return; }
        
        try {
            await axios.post('http://localhost:8080/api/wishlist/add', {
                userId: user.id,
                productId: product.id
            });
            alert("Added to Wishlist!");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // Fetch specific product details
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleBuyNow = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert("Please login to purchase items.");
            navigate('/login');
            return;
        }
        // Navigate to Checkout page and pass the order details
        navigate('/checkout', { 
            state: { 
                product: product, 
                size: size, 
                quantity: quantity,
                totalPrice: product.price * quantity
            } 
        });
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
    if (!product) return <div className="text-center mt-5">Product not found</div>;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container mt-5 mb-5 flex-grow-1">
                <div className="row">
                    {/* Left Column: Image */}
                    <div className="col-md-6 mb-4">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="img-fluid rounded shadow-sm w-100" 
                            style={{ objectFit: 'cover', maxHeight: '600px' }}
                        />
                    </div>

                    {/* Right Column: Details */}
                    <div className="col-md-6">
                        <h6 className="text-muted text-uppercase">{product.category}</h6>
                        <h1 className="display-5 fw-bold">{product.name}</h1>
                        <h3 className="text-dark mb-4 fw-semibold">LKR {product.price}</h3>
                        
                        <p className="lead mb-4 text-muted" style={{ fontSize: '1rem' }}>
                            {product.description || "This premium item is crafted with attention to detail, perfect for elevating your everyday style. Features high-quality materials and a modern fit."}
                        </p>

                        <hr className="my-4" />

                        {/* Size Selector */}
                        <div className="mb-4">
                            <label className="fw-bold mb-2 d-block">Select Size</label>
                            <div className="d-flex gap-2">
                                {['S', 'M', 'L', 'XL'].map((s) => (
                                    <button 
                                        key={s}
                                        className={`btn ${size === s ? 'btn-dark' : 'btn-outline-secondary'} px-4 py-2 rounded-0`}
                                        onClick={() => setSize(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-4" style={{ maxWidth: '120px' }}>
                            <label className="fw-bold mb-2">Quantity</label>
                            <input 
                                type="number" 
                                className="form-control text-center" 
                                value={quantity} 
                                min="1" 
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} 
                            />
                        </div>

                        {/* Buy Now Button */}
                        <div classname="d-flex gap-2">
                        <button 
                            className="btn btn-dark btn-lg w-100 rounded-0 py-3 text-uppercase fw-bold letter-spacing-2"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </button>
                        <button 
            className="btn btn-outline-dark rounded-0 px-4"
            onClick={handleAddToCart}
            title="Add to Cart"
        >
            <i className="fas fa-shopping-cart"></i>
        </button>
        <button 
            className="btn btn-outline-danger rounded-0 px-4"
            onClick={handleAddToWishlist}
            title="Add to Wishlist"
        >
            <i className="fas fa-heart"></i>
        </button>
                        </div>
                        <div className="mt-4 pt-3 border-top">
                            <small className="text-muted d-block mb-1"><i className="fas fa-truck me-2"></i> Free standard shipping</small>
                            <small className="text-muted d-block"><i className="fas fa-undo me-2"></i> Free returns within 30 days</small>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;