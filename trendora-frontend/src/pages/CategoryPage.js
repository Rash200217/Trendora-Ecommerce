import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CategoryPage = ({ isCollection }) => {
    const { categoryName } = useParams(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const title = isCollection 
        ? "New Collection" 
        : (categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : '');

    useEffect(() => {
        setLoading(true);
        let apiEndpoint = '';

        if (isCollection) {
            apiEndpoint = 'http://localhost:8080/api/products';
        } else {
            let dbCategory = categoryName.toUpperCase(); 
            if (categoryName.toLowerCase() === 'men') dbCategory = 'MAN';
            if (categoryName.toLowerCase() === 'women') dbCategory = 'WOMAN';
            if (categoryName.toLowerCase() === 'kids') dbCategory = 'KIDS';

            apiEndpoint = `http://localhost:8080/api/products/category/${dbCategory}`;
        }

        axios.get(apiEndpoint)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching category:", err);
                setLoading(false);
            });
    }, [categoryName, isCollection]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <div className="container mt-5 flex-grow-1">
                <h1 className="text-center display-4 fw-bold mb-5">{title}</h1>

                {loading ? (
                    <div className="text-center"><div className="spinner-border" /></div>
                ) : (
                    <div className="row">
                        {products.length > 0 ? products.map(product => (
                            <div className="col-md-6 col-lg-4 mb-5" key={product.id}>
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
                                            <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
                                                {product.name}
                                            </Link>
                                        </h5>
                                        <p className="card-text text-muted fs-5">LKR {product.price}</p>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center">
                                <h4>No products found in this category.</h4>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;