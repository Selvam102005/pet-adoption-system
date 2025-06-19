import React from 'react';
import { Link, Outlet} from 'react-router-dom';
import Navigationbar from "../Navigationbar";
import './AdminLayout.css';

const AdminLayout = () => {
  const adminData = JSON.parse(localStorage.getItem('admin')) || {};
  const name = adminData.name;
  const email = adminData.email;
  return (
    <>
    <Navigationbar />
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-profile">
          <h2>PetPals Connect</h2>
          <div className="admin-info">
            <p className="admin-name">{name || 'Admin'}</p>
            <p className="admin-email">{email || 'admin@example.com'}</p>
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
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AdminLayout;