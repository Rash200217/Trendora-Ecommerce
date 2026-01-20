import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Redirect if no state (direct access)
    if (!state) {
        window.location.href = '/';
        return null;
    }

    // Determine if this is a "Buy Now" (single item) or "Cart" (multiple items) flow
    const { fromCart, items, product, size, quantity, totalPrice } = state;

    // ... inside handlePayment ...
const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
        try {
            // 1. Save Order to Database (so Admin Dashboard sees it)
            // Note: We need a simple endpoint for this. 
            // For now, let's create a quick "Record Order" endpoint or just accept that 
            // without the backend change below, sales won't track.
            
            // Assuming you added an endpoint, or just for simulation:
            // This is the "Dummy" way if you didn't add an endpoint:
            // But we created OrderRepository, so let's use it!
            
            // YOU MUST ADD THIS ENDPOINT TO ProductController or CartController:
            // @PostMapping("/api/orders") public void saveOrder(@RequestBody Order order) { repo.save(order); }
            
            // Calling the API (assuming you add the endpoint below):
            await axios.post('http://localhost:8080/api/orders', { totalPrice: totalPrice });

            setLoading(false);
            navigate('/payment-success');
        } catch (err) {
            console.error(err);
            setLoading(false);
            // Navigate anyway for demo purposes
            navigate('/payment-success');
        }
    }, 2000);
};

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <div className="container mt-5 mb-5" style={{ maxWidth: '600px' }}>
                <div className="card shadow-sm border-0">
                    <div className="card-body p-5">
                        <h3 className="fw-bold mb-4 text-center">Secure Checkout</h3>
                        
                        {/* Order Summary */}
                        <div className="alert alert-secondary mb-4">
                            <h5 className="alert-heading fw-bold mb-3">Order Summary</h5>
                            
                            {/* LOGIC: Render List if from Cart, else Render Single Item */}
                            {fromCart ? (
                                // Cart View
                                <div>
                                    {items.map((item, index) => (
                                        <div key={index} className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                            <span>
                                                {item.product.name} <small className="text-muted">({item.size} x {item.quantity})</small>
                                            </span>
                                            <span>LKR {item.product.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Buy Now View (Single Item)
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <span>Product:</span>
                                        <strong>{product.name}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Size:</span>
                                        <strong>{size}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Quantity:</span>
                                        <strong>{quantity}</strong>
                                    </div>
                                </div>
                            )}

                            <hr />
                            <div className="d-flex justify-content-between fs-5 fw-bold">
                                <span>Total:</span>
                                <span>LKR {totalPrice}</span>
                            </div>
                        </div>

                        {/* Payment Icons */}
                        <div className="mb-4 text-center">
                            <p className="text-muted mb-2">We accept:</p>
                            <i className="fab fa-cc-visa fa-2x text-primary me-3"></i>
                            <i className="fab fa-cc-mastercard fa-2x text-danger me-3"></i>
                            <i className="fab fa-cc-amex fa-2x text-primary"></i>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handlePayment}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Cardholder Name</label>
                                <input type="text" className="form-control" placeholder="John Doe" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Card Number</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="fas fa-credit-card"></i></span>
                                    <input type="text" className="form-control" placeholder="0000 0000 0000 0000" maxLength="16" required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Expiry Date</label>
                                    <input type="text" className="form-control" placeholder="MM/YY" maxLength="5" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">CVV</label>
                                    <input type="password" className="form-control" placeholder="123" maxLength="3" required />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-dark w-100 py-3 fw-bold mt-3" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <span><span className="spinner-border spinner-border-sm me-2"></span>Processing...</span>
                                ) : (
                                    `Pay LKR ${totalPrice}`
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;