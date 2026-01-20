import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // --- DATA STATES ---
    const [stats, setStats] = useState({ productCount: 0, userCount: 0, totalSales: 0 });
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [heroImages, setHeroImages] = useState([]); 

    // --- FORM STATES ---
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, imageUrl: '', category: 'MAN', description: '' });
    const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
    const [newHeroUrl, setNewHeroUrl] = useState('');

    // --- INITIALIZATION ---
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        // SECURITY: If not logged in OR not an Admin, kick them out
        if (!user || user.role !== 'ADMIN') {
            navigate('/login');
            return;
        }

        // Load all data
        fetchStats();
        fetchProducts();
        fetchUsers();
        fetchHeroImages();
    }, [navigate]);

    // --- API HELPER FUNCTIONS ---
    const fetchStats = () => axios.get('http://localhost:8080/api/admin/stats').then(res => setStats(res.data)).catch(console.error);
    const fetchProducts = () => axios.get('http://localhost:8080/api/products').then(res => setProducts(res.data)).catch(console.error);
    const fetchUsers = () => axios.get('http://localhost:8080/api/admin/users').then(res => setUsers(res.data)).catch(console.error);
    const fetchHeroImages = () => axios.get('http://localhost:8080/api/hero-images').then(res => setHeroImages(res.data)).catch(console.error);

    // --- HANDLERS: PRODUCTS ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/products', newProduct);
            alert('Product Added Successfully!');
            setNewProduct({ ...newProduct, name: '', price: 0, imageUrl: '', description: '' }); 
            fetchProducts();
            fetchStats();
        } catch (err) { alert('Error adding product.'); }
    };

    const handleDeleteProduct = async (id) => {
        if(window.confirm("Are you sure you want to delete this product? It will be removed from all carts.")) {
            try {
                await axios.delete(`http://localhost:8080/api/products/${id}`);
                fetchProducts();
                fetchStats();
            } catch (err) { alert('Error deleting product.'); }
        }
    };

    // --- HANDLERS: HOMEPAGE SLIDER ---
    const handleAddHeroImage = async (e) => {
        e.preventDefault();
        if(!newHeroUrl) return;
        try {
            await axios.post('http://localhost:8080/api/hero-images', { imageUrl: newHeroUrl });
            setNewHeroUrl('');
            fetchHeroImages();
        } catch (err) { alert('Error adding image.'); }
    };

    const handleDeleteHeroImage = async (id) => {
        if(window.confirm("Remove this banner?")) {
            await axios.delete(`http://localhost:8080/api/hero-images/${id}`);
            fetchHeroImages();
        }
    };

    // --- HANDLERS: USER & ADMIN ---
    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (newAdmin.password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/admin/create-admin', newAdmin);
            alert('New Admin Created Successfully!');
            setNewAdmin({ username: '', password: '' });
            fetchUsers();
            fetchStats();
        } catch (err) { alert('Username already exists or error occurred.'); }
    };

    const handlePassReset = async (userId) => {
        const newPass = prompt("Enter new password for this user (min 8 chars):");
        if (newPass) {
            if (newPass.length < 8) {
                alert("Password too short. Update cancelled.");
                return;
            }
            try {
                await axios.put(`http://localhost:8080/api/admin/user/${userId}/reset-password`, { newPassword: newPass });
                alert("Password updated.");
            } catch (err) { alert('Error updating password.'); }
        }
    };

    // --- SUB-COMPONENTS (VIEWS) ---

    // 1. SIDEBAR NAVIGATION
    const Sidebar = () => (
        <div className="bg-dark text-white min-vh-100 p-3" style={{ width: '250px', position: 'fixed', left: 0, top: 0, zIndex: 1000 }}>
            <h4 className="text-center fw-bold mb-4 mt-2" style={{ letterSpacing: '2px' }}>TULOS ADMIN</h4>
            <ul className="nav flex-column gap-2">
                <li className="nav-item">
                    <button className={`btn w-100 text-start text-white ${activeTab === 'dashboard' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <i className="fas fa-chart-line me-2"></i> Dashboard
                    </button>
                </li>
                <hr className="border-secondary my-2" />
                <li className="nav-item text-muted small text-uppercase mb-1 ms-1">Store Management</li>
                <li className="nav-item">
                    <button className={`btn w-100 text-start text-white ${activeTab === 'Homepage' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('Homepage')}>
                        <i className="fas fa-images me-2"></i> Homepage
                    </button>
                </li>
                {['New Collection', 'Man', 'Woman', 'Kids'].map(cat => (
                    <li className="nav-item" key={cat}>
                        <button className={`btn w-100 text-start text-white ${activeTab === cat ? 'btn-secondary' : ''}`} onClick={() => {
                            setActiveTab(cat);
                            // Auto-select category for the "Add Product" form
                            const mapCat = cat === 'Man' ? 'MAN' : cat === 'Woman' ? 'WOMAN' : cat === 'Kids' ? 'KIDS' : 'MAN';
                            setNewProduct(prev => ({ ...prev, category: mapCat }));
                        }}>
                            <i className="fas fa-tag me-2"></i> {cat}
                        </button>
                    </li>
                ))}
                <hr className="border-secondary my-2" />
                <li className="nav-item text-muted small text-uppercase mb-1 ms-1">Users</li>
                <li className="nav-item">
                    <button className={`btn w-100 text-start text-white ${activeTab === 'users' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('users')}>
                        <i className="fas fa-users-cog me-2"></i> Manage Users
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`btn w-100 text-start text-warning ${activeTab === 'create-admin' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('create-admin')}>
                        <i className="fas fa-user-shield me-2"></i> Create Admin
                    </button>
                </li>
                <li className="nav-item mt-5">
                    <button className="btn btn-danger w-100" onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}>
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                </li>
            </ul>
        </div>
    );

    // 2. DASHBOARD VIEW
    const DashboardView = () => (
        <div className="row g-4 fade-in">
            <div className="col-md-4">
                <div className="card text-white bg-primary shadow-sm h-100 p-3 border-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="text-uppercase opacity-75">Total Sales</h6>
                            <h2 className="fw-bold mb-0">LKR {stats.totalSales}</h2>
                        </div>
                        <i className="fas fa-coins fa-3x opacity-25"></i>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-white bg-success shadow-sm h-100 p-3 border-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="text-uppercase opacity-75">Total Products</h6>
                            <h2 className="fw-bold mb-0">{stats.productCount}</h2>
                        </div>
                        <i className="fas fa-box-open fa-3x opacity-25"></i>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-white bg-warning shadow-sm h-100 p-3 border-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="text-uppercase opacity-75">Total Users</h6>
                            <h2 className="fw-bold mb-0">{stats.userCount}</h2>
                        </div>
                        <i className="fas fa-users fa-3x opacity-25"></i>
                    </div>
                </div>
            </div>
        </div>
    );

    // 3. HOMEPAGE MANAGER VIEW
    const HomepageManager = () => (
        <div className="fade-in">
            <h4 className="mb-4 fw-bold">Homepage Slider Manager</h4>
            
            <div className="card p-4 mb-4 bg-white border-0 shadow-sm">
                <h6 className="mb-3">Add New Banner Image</h6>
                <form onSubmit={handleAddHeroImage} className="d-flex gap-2">
                    <input 
                        className="form-control" 
                        placeholder="Enter Image URL (e.g. https://images.unsplash.com/...)" 
                        value={newHeroUrl}
                        onChange={e => setNewHeroUrl(e.target.value)}
                        required 
                    />
                    <button className="btn btn-dark px-4"><i className="fas fa-plus"></i> Add</button>
                </form>
            </div>

            <h6 className="mb-3 text-muted">Active Banners ({heroImages.length})</h6>
            <div className="row">
                {heroImages.map(img => (
                    <div className="col-md-6 mb-4" key={img.id}>
                        <div className="card shadow-sm border-0 overflow-hidden position-relative">
                            <img src={img.imageUrl} className="card-img-top" alt="Banner" style={{height: '200px', objectFit: 'cover'}} />
                            <div className="card-body py-2 bg-light">
                                <small className="text-muted text-truncate d-block">{img.imageUrl}</small>
                            </div>
                            <button 
                                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 shadow"
                                onClick={() => handleDeleteHeroImage(img.id)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 4. PRODUCT MANAGER VIEW
    const ProductManager = ({ filter }) => {
        // Filter logic: 'New Collection' shows everything, others filter by category string
        const filtered = filter === 'New Collection' 
            ? products 
            : products.filter(p => p.category?.toUpperCase() === (filter === 'Man' ? 'MAN' : filter === 'Woman' ? 'WOMAN' : 'KIDS'));

        return (
            <div className="fade-in">
                <h4 className="mb-4 fw-bold">Manage: <span className="text-primary">{filter}</span></h4>
                
                <div className="card p-4 mb-4 bg-white border-0 shadow-sm">
                    <h6 className="mb-3">Add New Item to Store</h6>
                    <form onSubmit={handleAddProduct}>
                        <div className="row g-2">
                            <div className="col-md-4">
                                <input className="form-control" placeholder="Product Name" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" type="number" placeholder="Price (LKR)" required value={newProduct.price === 0 ? '' : newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                            </div>
                            <div className="col-md-4">
                                <input className="form-control" placeholder="Image URL" required value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
                            </div>
                            <div className="col-md-2">
                                <select className="form-select" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                                    <option value="MAN">Man</option>
                                    <option value="WOMAN">Woman</option>
                                    <option value="KIDS">Kids</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <textarea className="form-control" placeholder="Description..." rows="2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
                            </div>
                            <div className="col-12 text-end mt-2">
                                <button className="btn btn-dark px-4"><i className="fas fa-plus me-1"></i> Add Product</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="table-responsive bg-white shadow-sm rounded">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light"><tr><th>Image</th><th>Name</th><th>Price</th><th>Category</th><th>Action</th></tr></thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id}>
                                    <td><img src={p.imageUrl} alt="" width="50" height="50" className="rounded object-fit-cover" /></td>
                                    <td className="fw-semibold">{p.name}</td>
                                    <td>LKR {p.price}</td>
                                    <td><span className="badge bg-secondary">{p.category}</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(p.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No products found in this category.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // 5. USER MANAGER VIEW
    const UserManager = () => (
        <div className="card shadow-sm border-0 fade-in">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">User Management</h5>
                <span className="badge bg-info text-dark">{users.length} Registered Users</span>
            </div>
            <div className="table-responsive">
                <table className="table mb-0 align-middle">
                    <thead className="bg-light"><tr><th>ID</th><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>#{u.id}</td>
                                <td className="fw-bold">{u.username}</td>
                                <td>
                                    <span className={`badge ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-warning shadow-sm" onClick={() => handlePassReset(u.id)}>
                                        <i className="fas fa-key me-1"></i> Reset Pass
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // 6. CREATE ADMIN VIEW
    const CreateAdmin = () => (
        <div className="row justify-content-center fade-in">
            <div className="col-md-6">
                <div className="card shadow-lg border-0 mt-4">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                                <i className="fas fa-user-shield fa-2x text-white"></i>
                            </div>
                            <h3 className="fw-bold">Create New Admin</h3>
                            <p className="text-muted small">This user will have full access to the system.</p>
                        </div>
                        <form onSubmit={handleCreateAdmin}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Username</label>
                                <input className="form-control form-control-lg" required onChange={e => setNewAdmin({...newAdmin, username: e.target.value})} value={newAdmin.username} />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Password</label>
                                <input className="form-control form-control-lg" type="password" placeholder="Min 8 characters" required onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} value={newAdmin.password} />
                            </div>
                            <button className="btn btn-warning w-100 fw-bold py-2 shadow-sm">
                                <i className="fas fa-check-circle me-2"></i> Create Admin User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- MAIN RENDER ---
    return (
        <div className="d-flex bg-light min-vh-100">
            <Sidebar />
            <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: '250px' }}>
                {/* Top Header */}
                <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
                    <div>
                        <h2 className="fw-bold m-0">Admin Panel</h2>
                        <p className="text-muted m-0">Manage your store, products, and users.</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-white p-2 rounded shadow-sm border">
                            <i className="fas fa-calendar-alt text-muted me-2"></i>
                            <small className="fw-bold">{new Date().toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>

                {/* Content Area Switching */}
                {activeTab === 'dashboard' && <DashboardView />}
                {activeTab === 'Homepage' && <HomepageManager />}
                {['New Collection', 'Man', 'Woman', 'Kids'].includes(activeTab) && <ProductManager filter={activeTab} />}
                {activeTab === 'users' && <UserManager />}
                {activeTab === 'create-admin' && <CreateAdmin />}
            </div>
        </div>
    );
};

export default AdminPanel;