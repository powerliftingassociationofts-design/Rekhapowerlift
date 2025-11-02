import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/authService';

const AdminQuickAccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Admin Button */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
        transition: 'all 0.3s ease',
        transform: isVisible ? 'scale(1.1)' : 'scale(1)'
      }}>
        <i 
          className="fas fa-user-shield" 
          style={{ 
            color: 'white', 
            fontSize: '1.2rem' 
          }}
        ></i>
      </div>

      {/* Dropdown Menu */}
      {isVisible && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          background: 'white',
          borderRadius: '10px',
          padding: '15px',
          minWidth: '200px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{
            marginBottom: '15px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e9ecef'
          }}>
            <h4 style={{ 
              margin: 0, 
              fontSize: '1rem', 
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-dumbbell" style={{ color: '#667eea' }}></i>
              Admin Panel
            </h4>
          </div>

          {isAuthenticated ? (
            <div>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ 
                  color: '#28a745', 
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <i className="fas fa-check-circle"></i>
                  Logged in as {AuthService.getCurrentUser()?.username}
                </span>
              </div>
              
              <Link 
                to="/admin"
                style={{
                  display: 'block',
                  padding: '8px 12px',
                  background: '#667eea',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  marginBottom: '8px',
                  transition: 'background 0.3s ease'
                }}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          ) : (
            <div>
              <p style={{ 
                margin: '0 0 15px 0', 
                fontSize: '0.9rem', 
                color: '#666' 
              }}>
                Access admin panel
              </p>
              
              <Link 
                to="/admin"
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  background: '#667eea',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  transition: 'background 0.3s ease'
                }}
              >
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>

              <div style={{ 
                marginTop: '10px', 
                fontSize: '0.8rem', 
                color: '#999',
                textAlign: 'center'
              }}>
                For authorized users only
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminQuickAccess;