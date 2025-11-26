import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogManager from '../../components/Admin/BlogManager';
import { seedSampleData } from '../../data/sampleData';
import logo from '../../assets/images/plat2.png';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const adminStatus = localStorage.getItem('isAdminLoggedIn');
    const loginTime = localStorage.getItem('adminLoginTime');
    const currentTime = Date.now();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

    if (adminStatus === 'true' && loginTime && (currentTime - parseInt(loginTime)) < sessionDuration) {
      setIsLoggedIn(true);
    } else {
      // Session expired or not logged in
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('adminLoginTime');
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin');
  };

  const handleSeedData = () => {
    if (window.confirm('This will add sample blogs and images if none exist. Continue?')) {
      seedSampleData();
      alert('Sample data seeded successfully! Refresh the page to see the changes.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-loading">
        <img src={logo} alt="WPC Telangana Logo" className="loading-logo" />
        <i className="fa fa-spinner fa-spin"></i>
        <p>Verifying credentials...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-brand">
            <img src={logo} alt="WPC Telangana Logo" className="admin-logo" />
            <h1>
              <i className="fa fa-dashboard"></i>
              WPC Telangana Admin Dashboard
            </h1>
          </div>
          <div className="admin-actions">
            <button onClick={handleSeedData} className="seed-data-btn">
              <i className="fa fa-database"></i>
              Seed Sample Data
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fa fa-sign-out"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <BlogManager />
      </div>
    </div>
  );
};

export default AdminDashboard;