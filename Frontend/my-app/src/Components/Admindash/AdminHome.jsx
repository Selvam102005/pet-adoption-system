import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminHome.css';

const AdminHome = () => {
  const adminData = JSON.parse(localStorage.getItem('admin')) || {};
  const [stats, setStats] = useState({
    totalPets: 0,
    totalRequests: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Make parallel API calls with authentication if needed
        const token = localStorage.getItem('adminToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const [petsResponse, requestsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/pets/count', { headers }),
          axios.get('http://localhost:8000/api/adopts/count', { headers })
        ]);

        setStats({
          totalPets: petsResponse.data.count || 0,
          totalRequests: requestsResponse.data.count || 0,
          loading: false,
          error: null
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load statistics'
        }));
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);
  const username = adminData.email.split('@')[0];
  if (stats.loading) {
    return (
      <div className="admin-home">
        <h1>Welcome back, {username || 'Admin'}!</h1>
        <div className="stats-container">
          <div className="stat-card loading-skeleton"></div>
          <div className="stat-card loading-skeleton"></div>
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="admin-home">
        <h1>Welcome back, {username || 'Admin'}!</h1>
        <div className="error-message">{stats.error}</div>
      </div>
    );
  }

  return (
    <div className="admin-home">
      <h1>Welcome back, {username || 'Admin'}!</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Pets</h3>
          <p>{stats.totalPets.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Requests</h3>
          <p>{stats.totalRequests.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;