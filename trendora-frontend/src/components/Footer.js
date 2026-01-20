import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light pt-5 pb-4 mt-5 border-top">
            <div className="container text-center text-md-start">
                <div className="row text-center text-md-start">
                    
                    {/* Brand Section */}
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold fw-bold" style={{letterSpacing: '2px'}}>Trendora</h5>
                        <p>
                            Elevating fashion with a touch of elegance. Join us in defining the new standard of style.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold">Collections</h5>
                        <p><Link to="/category/men/" className="text-dark text-decoration-none">Men</Link></p>
                        <p><Link to="/category/women/" className="text-dark text-decoration-none">Women</Link></p>
                        <p><Link to="/category/kids/" className="text-dark text-decoration-none">Kids</Link></p>
                        <p><Link to="/new-collection" className="text-dark text-decoration-none">New Collection</Link></p>
                    </div>

                    {/* "Work with us" Section from PDF */}
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold">Company</h5>
                        <p><a href="#!" className="text-dark text-decoration-none">About Us</a></p>
                        <p><a href="#!" className="text-dark text-decoration-none">Work with us</a></p> {/* [cite: 18, 41] */}
                        <p><a href="#!" className="text-dark text-decoration-none">Privacy Policy</a></p>
                        <p><a href="#!" className="text-dark text-decoration-none">Terms</a></p>
                    </div>

                    {/* Contact / Socials */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold">Contact</h5>
                        <p><i className="fas fa-home mr-3"></i> 123 Fashion St, ABC, YZ</p>
                        <p><i className="fas fa-envelope mr-3"></i> info@trendora.com</p>
                        <div className="d-flex justify-content-center justify-content-md-start mt-4">
                            {/* Social Icons (using text placeholders if FontAwesome isn't installed) */}
                            <a href="#!" className="btn btn-outline-dark btn-floating m-1" role="button">FB</a>
                            <a href="#!" className="btn btn-outline-dark btn-floating m-1" role="button">TW</a>
                            <a href="#!" className="btn btn-outline-dark btn-floating m-1" role="button">IG</a>
                        </div>
                    </div>
                </div>

                <hr className="mb-4" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p>© 2026 <strong>Trendora</strong>. All Rights Reserved.</p>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <p className="text-center text-md-end">Designed by RashDesigns.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;