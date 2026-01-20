import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchCart();
    }, []);

    const fetchCart = () => {
        axios.get(`http://localhost:8080/api/cart/${user.id}`)
             .then(res => setCartItems(res.data))
             .catch(err => console.error(err));
    };

    const removeFromCart = async (id) => {
        await axios.delete(`http://localhost:8080/api/cart/${id}`);
        fetchCart();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    // --- NEW FUNCTION: Handle Navigation to Checkout ---
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        
        navigate('/checkout', { 
            state: { 
                fromCart: true,           // Flag to tell Checkout page this is from Cart
                items: cartItems,         // Pass all items
                totalPrice: calculateTotal() 
            } 
        });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 fw-bold">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <div className="alert alert-info">Your cart is empty.</div>
                ) : (
                    <div className="row">
                        <div className="col-md-8">
                            {cartItems.map(item => (
                                <div className="card mb-3 border-0 shadow-sm" key={item.id}>
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-2">
                                            <img src={item.product.imageUrl} className="img-fluid rounded-start" alt={item.product.name} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold">{item.product.name}</h5>
                                                <p className="card-text text-muted mb-1">Size: {item.size} | Qty: {item.quantity}</p>
                                                <p className="card-text fw-bold">LKR {item.product.price * item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-center">
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-4">
                            <div className="card p-4 border-0 shadow-sm bg-light">
                                <h4 className="fw-bold mb-3">Summary</h4>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Subtotal</span>
                                    <strong>LKR {calculateTotal()}</strong>
                                </div>
                                {/* UPDATED BUTTON WITH ONCLICK EVENT */}
                                <button 
                                    className="btn btn-dark w-100 py-2" 
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
export default Cart;