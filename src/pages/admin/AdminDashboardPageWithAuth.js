import React, { useState, useEffect } from 'react';
import { AuthService } from '../../services/authService';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminDashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const authStatus = AuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        setCurrentUser(AuthService.getCurrentUser());
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Set up session extension on user activity
    const extendSessionOnActivity = () => {
      if (AuthService.isAuthenticated()) {
        AuthService.extendSession();
      }
    };

    // Add event listeners for user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, extendSessionOnActivity, true);
    });

    // Set up periodic auth check (every 5 minutes)
    const authCheckInterval = setInterval(() => {
      const authStatus = AuthService.isAuthenticated();
      if (!authStatus && isAuthenticated) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        alert('Your session has expired. Please log in again.');
      }
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, extendSessionOnActivity, true);
      });
      clearInterval(authCheckInterval);
    };
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentUser(AuthService.getCurrentUser());
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      {/* Admin Header with User Info and Logout */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <i className="fas fa-dumbbell" style={{ fontSize: '1.5rem' }}></i>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem' }}>WPC Telangana Admin</h2>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
              Welcome, {currentUser?.username}
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            textAlign: 'right',
            fontSize: '0.8rem',
            opacity: 0.8
          }}>
            <div>Logged in since:</div>
            <div>{currentUser?.loginTime ? new Date(currentUser.loginTime).toLocaleString() : ''}</div>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Admin Dashboard */}
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;