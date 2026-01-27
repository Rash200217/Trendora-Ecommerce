import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ==========================================
// 1. SUB-COMPONENTS (Defined OUTSIDE to fix focus issues)
// ==========================================

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => (
    <div className="bg-dark text-white min-vh-100 p-3 position-fixed start-0 top-0 overflow-y-auto" style={{ width: '250px', zIndex: 1000 }}>
        <h4 className="text-center fw-bold mb-4 mt-2" style={{ letterSpacing: '2px' }}>ADMIN PANEL</h4>
        <ul className="nav flex-column gap-2">
            <li className="nav-item">
                <button className={`btn w-100 text-start text-white ${activeTab === 'dashboard' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('dashboard')}>
                    <i className="fas fa-chart-line me-2"></i> Dashboard
                </button>
            </li>
            <hr className="border-secondary my-2" />
            <li className="nav-item text-muted small text-uppercase mb-1 ms-1">Store</li>
            <li className="nav-item">
                <button className={`btn w-100 text-start text-white ${activeTab === 'Homepage' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('Homepage')}>
                    <i className="fas fa-images me-2"></i> Homepage
                </button>
            </li>
            {['New Collection', 'Man', 'Woman', 'Kids'].map(cat => (
                <li className="nav-item" key={cat}>
                    <button className={`btn w-100 text-start text-white ${activeTab === cat ? 'btn-secondary' : ''}`} onClick={() => setActiveTab(cat)}>
                        <i className="fas fa-tag me-2"></i> {cat}
                    </button>
                </li>
            ))}
            <hr className="border-secondary my-2" />
            <li className="nav-item text-muted small text-uppercase mb-1 ms-1">System</li>
            <li className="nav-item">
                <button className={`btn w-100 text-start text-white ${activeTab === 'users' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('users')}>
                    <i className="fas fa-users-cog me-2"></i> Users
                </button>
            </li>
            <li className="nav-item">
                <button className={`btn w-100 text-start text-warning ${activeTab === 'create-admin' ? 'btn-secondary' : ''}`} onClick={() => setActiveTab('create-admin')}>
                    <i className="fas fa-user-shield me-2"></i> Create Admin
                </button>
            </li>
            <li className="nav-item mt-5">
                <button className="btn btn-primary w-100" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                </button>
            </li>
        </ul>
    </div>
);

const DashboardView = ({ stats }) => (
    <div className="row g-4 fade-in">
        <div className="col-md-4">
            <div className="card text-white bg-primary shadow-sm h-100 p-3 border-0">
                <div className="d-flex justify-content-between align-items-center">
                    <div><h6 className="opacity-75">Total Sales</h6><h2 className="fw-bold">LKR {stats.totalSales}</h2></div>
                    <i className="fas fa-coins fa-3x opacity-25"></i>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card text-white bg-success shadow-sm h-100 p-3 border-0">
                <div className="d-flex justify-content-between align-items-center">
                    <div><h6 className="opacity-75">Products</h6><h2 className="fw-bold">{stats.productCount}</h2></div>
                    <i className="fas fa-box-open fa-3x opacity-25"></i>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card text-white bg-warning shadow-sm h-100 p-3 border-0">
                <div className="d-flex justify-content-between align-items-center">
                    <div><h6 className="opacity-75">Users</h6><h2 className="fw-bold">{stats.userCount}</h2></div>
                    <i className="fas fa-users fa-3x opacity-25"></i>
                </div>
            </div>
        </div>
    </div>
);

const ProductManager = ({ filter, products, newProduct, setNewProduct, handleAddProduct, handleDeleteProduct }) => {
    // Filter Logic
    const filtered = filter === 'New Collection' 
        ? products 
        : products.filter(p => p.category && p.category.toUpperCase() === (filter === 'Man' ? 'MAN' : filter === 'Woman' ? 'WOMAN' : 'KIDS'));

    return (
        <div className="fade-in">
            <h4 className="mb-4 fw-bold">Manage: <span className="text-primary">{filter}</span></h4>
            
            {/* ADD PRODUCT FORM */}
            <div className="card p-4 mb-4 bg-white border-0 shadow-sm">
                <h6 className="mb-3">Add New Item</h6>
                <form onSubmit={handleAddProduct}>
                    <div className="row g-2">
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Product Name" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                        </div>
                        <div className="col-md-2">
                            <input className="form-control" type="number" placeholder="Price" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                        </div>
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Image URL" required value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                                <option value="MAN">Man</option>
                                <option value="WOMAN">Woman</option>
                                <option value="KIDS">Kid</option>
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

            {/* PRODUCT TABLE */}
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
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(p.id)}><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No products found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const HomepageManager = ({ heroImages, newHeroUrl, setNewHeroUrl, handleAddHeroImage, handleDeleteHeroImage }) => (
    <div className="fade-in">
        <h4 className="mb-4 fw-bold">Homepage Slider</h4>
        <div className="card p-4 mb-4 bg-white border-0 shadow-sm">
            <form onSubmit={handleAddHeroImage} className="d-flex gap-2">
                <input className="form-control" placeholder="Image URL..." value={newHeroUrl} onChange={e => setNewHeroUrl(e.target.value)} required />
                <button className="btn btn-dark px-4">Add Banner</button>
            </form>
        </div>
        <div className="row">
            {heroImages.map(img => (
                <div className="col-md-6 mb-4" key={img.id}>
                    <div className="card shadow-sm border-0 position-relative">
                        <img src={img.imageUrl} className="card-img-top" alt="Banner" style={{height: '200px', objectFit: 'cover'}} />
                        <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" onClick={() => handleDeleteHeroImage(img.id)}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const UserManager = ({ users, handlePassReset }) => (
    <div className="card shadow-sm border-0 fade-in">
        <div className="card-header bg-white py-3 d-flex justify-content-between"><h5 className="mb-0 fw-bold">User Management</h5><span className="badge bg-info text-dark">{users.length} Users</span></div>
        <div className="table-responsive">
            <table className="table mb-0 align-middle">
                <thead className="bg-light"><tr><th>ID</th><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>#{u.id}</td>
                            <td className="fw-bold">{u.username}</td>
                            <td><span className={`badge ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>{u.role}</span></td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => handlePassReset(u.id)}>Reset Pass</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const CreateAdmin = ({ newAdmin, setNewAdmin, handleCreateAdmin }) => (
    <div className="row justify-content-center fade-in">
        <div className="col-md-6">
            <div className="card shadow-lg border-0 mt-4 p-5">
                <div className="text-center mb-4"><i className="fas fa-user-shield fa-3x text-warning mb-3"></i><h3>Create Admin</h3></div>
                <form onSubmit={handleCreateAdmin}>
                    <div className="mb-3"><label className="fw-bold">Username</label><input className="form-control" required onChange={e => setNewAdmin({...newAdmin, username: e.target.value})} value={newAdmin.username} /></div>
                    <div className="mb-4"><label className="fw-bold">Password</label><input className="form-control" type="password" required onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} value={newAdmin.password} /></div>
                    <button className="btn btn-warning w-100 fw-bold">Create Admin</button>
                </form>
            </div>
        </div>
    </div>
);

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);

    // --- DATA STATES ---
    const [stats, setStats] = useState({ productCount: 0, userCount: 0, totalSales: 0 });
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [heroImages, setHeroImages] = useState([]); 

    // --- FORM STATES ---
    const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '', category: 'MAN', description: '' });
    const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
    const [newHeroUrl, setNewHeroUrl] = useState('');

    const API_URL = 'http://localhost:8080/api';

    // --- FETCH DATA ---
    const loadAllData = useCallback(async () => {
        try {
            const [statsRes, prodRes, usersRes, heroRes] = await Promise.all([
                axios.get(`${API_URL}/admin/stats`),
                axios.get(`${API_URL}/products`),
                axios.get(`${API_URL}/admin/users`),
                axios.get(`${API_URL}/hero-images`)
            ]);
            setStats(statsRes.data);
            setProducts(prodRes.data);
            setUsers(usersRes.data);
            setHeroImages(heroRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error loading admin data", error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'ADMIN') {
            navigate('/login');
            return;
        }
        loadAllData();
    }, [navigate, loadAllData]);

    // --- HANDLERS ---
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/products`, newProduct);
            alert('Product Added!');
            setNewProduct({ ...newProduct, name: '', price: '', imageUrl: '', description: '' }); 
            loadAllData();
        } catch (err) { alert('Error adding product.'); }
    };

    const handleDeleteProduct = async (id) => {
        if(window.confirm("Delete this product?")) {
            await axios.delete(`${API_URL}/products/${id}`);
            loadAllData();
        }
    };

    const handleAddHeroImage = async (e) => {
        e.preventDefault();
        if(!newHeroUrl) return;
        await axios.post(`${API_URL}/hero-images`, { imageUrl: newHeroUrl });
        setNewHeroUrl('');
        loadAllData();
    };

    const handleDeleteHeroImage = async (id) => {
        if(window.confirm("Remove this banner?")) {
            await axios.delete(`${API_URL}/hero-images/${id}`);
            loadAllData();
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (newAdmin.password.length < 8) return alert("Password must be at least 8 characters.");
        try {
            await axios.post(`${API_URL}/admin/create-admin`, newAdmin);
            alert(`Admin '${newAdmin.username}' Created!`);
            setNewAdmin({ username: '', password: '' });
            loadAllData();
        } catch (err) { alert('Error creating admin.'); }
    };

    const handlePassReset = async (userId) => {
        const newPass = prompt("Enter new password (min 8 chars):");
        if (newPass && newPass.length >= 8) {
            await axios.put(`${API_URL}/admin/user/${userId}/reset-password`, { newPassword: newPass });
            alert("Password updated.");
        }
    };

    // Auto-select category for form when changing tabs
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (['Man', 'Woman', 'Kids'].includes(tab)) {
            const mapCat = tab === 'Man' ? 'MAN' : tab === 'Woman' ? 'WOMAN' : 'KIDS';
            setNewProduct(prev => ({ ...prev, category: mapCat }));
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="d-flex bg-light min-vh-100">
            {/* Sidebar passes handleTabChange instead of simple setActiveTab */}
            <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} handleLogout={handleLogout} />
            
            <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: '250px' }}>
                <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
                    <div><h2 className="fw-bold m-0">Admin Panel</h2><p className="text-muted m-0">Welcome back, Admin.</p></div>
                    <div className="bg-white p-2 rounded shadow-sm border"><small className="fw-bold">{new Date().toLocaleDateString()}</small></div>
                </div>

                {activeTab === 'dashboard' && <DashboardView stats={stats} />}
                
                {activeTab === 'Homepage' && <HomepageManager 
                    heroImages={heroImages} 
                    newHeroUrl={newHeroUrl} 
                    setNewHeroUrl={setNewHeroUrl} 
                    handleAddHeroImage={handleAddHeroImage} 
                    handleDeleteHeroImage={handleDeleteHeroImage} 
                />}
                
                {['New Collection', 'Man', 'Woman', 'Kids'].includes(activeTab) && <ProductManager 
                    filter={activeTab} 
                    products={products}
                    newProduct={newProduct}
                    setNewProduct={setNewProduct}
                    handleAddProduct={handleAddProduct}
                    handleDeleteProduct={handleDeleteProduct}
                />}
                
                {activeTab === 'users' && <UserManager users={users} handlePassReset={handlePassReset} />}
                
                {activeTab === 'create-admin' && <CreateAdmin 
                    newAdmin={newAdmin} 
                    setNewAdmin={setNewAdmin} 
                    handleCreateAdmin={handleCreateAdmin} 
                />}
            </div>
        </div>
    );
};

export default AdminPanel;
