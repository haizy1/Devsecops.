import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react'; // Using lucide-react for icons
import "./Navbar.css";
import logoImage from '../components/img/slac.jpg';

const Navbar = () => {
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className={`navbar-logo ${isActive('/')}`}>
          <img 
            src={logoImage} 
            alt="SLAC Logo" 
            className="navbar-logo-image"
          />
        </Link>

        {/* Navigation Menu */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student" className={`nav-link ${isActive('/student/search-demand')}`}>
              Search COLOC/LOC
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/student/createdemande" className={`nav-link ${isActive('/student/createdemande')}`}>
              Create demande
            </Link>
          </li>

          {/* Icons Section */}
          <li className="nav-item navbar-icons">
            {/* Notifications Icon */}
            <Link to="/student/notifications" className={`nav-icon ${isActive('/student/notifications')}`}>
              <Bell size={24} />
            </Link>

            {/* Profile Icon */}
            <div 
              className="nav-icon profile-icon" 
              onClick={toggleProfileMenu}
              ref={profileMenuRef}
            >
              <User size={24} />
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile-etudiant" className="profile-dropdown-item">
                    <User size={18} /> View My Profile
                  </Link>
                  <div className="profile-dropdown-item logout">
                    <LogOut size={18} /> Log Out
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
