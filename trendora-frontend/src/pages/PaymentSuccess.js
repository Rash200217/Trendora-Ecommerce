import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    {/* Animated Tick Mark Icon */}
                    <div className="mb-4">
                        <i className="fas fa-check-circle text-success" style={{ fontSize: '5rem' }}></i>
                    </div>
                    
                    <h1 className="fw-bold mb-3">Payment Successful!</h1>
                    <p className="text-muted lead mb-5">
                        Thank you for your purchase. Your order has been placed successfully.
                    </p>
                    
                    <div className="d-flex gap-3 justify-content-center">
                        <Link to="/" className="btn btn-dark px-4 py-2">Back to Home</Link>
                        <Link to="/new-collection" className="btn btn-outline-dark px-4 py-2">Continue Shopping</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentSuccess;