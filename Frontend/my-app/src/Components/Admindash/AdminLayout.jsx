import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem('admin')) || {};
  const username = adminData.email.split('@')[0];
  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-profile">
          <h2>PetPals Connect</h2>
          <div className="admin-info">
            <p className="admin-name">{username || 'Admin'}</p>
            <p className="admin-email">{adminData.email || 'admin@example.com'}</p>
          </div>
        </div>
        <nav className="admin-nav">
          
          <Link to="/PetAddForm" className="nav-item">
            <i className="fas fa-plus"></i> Add Pet
          </Link>
          <Link to="/viewPetDetails" className="nav-item">
            <i className="fas fa-paw"></i> View Pets
          </Link>
          <Link to="/Petrequestlist" className="nav-item">
            <i className="fas fa-list"></i> View Requests
          </Link>
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;