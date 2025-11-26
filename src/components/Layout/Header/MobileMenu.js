"use client";
import React from 'react';
import { Link } from 'react-router-dom';
import MobileLogo from '../../../assets/images/plat2.png'

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  // Remove unused state and functions for now to fix errors
  // Can be added back when needed for submenu functionality
  return (
    <>
      {/*End Mobile Menu */}
      <div className="mobile-nav__wrapper">
        <div
          className="mobile-nav__overlay mobile-nav__toggler"
          onClick={handleMobileMenu}
          role="button"
          aria-label="Close mobile menu overlay"
        />
        {/* /.mobile-nav__overlay */}
        <div className="mobile-nav__content">
          <span
            className="mobile-nav__close mobile-nav__toggler"
            onClick={handleMobileMenu}
            role="button"
            aria-label="Close mobile menu"
            style={{
              cursor: 'pointer',
              zIndex: 10001,
              touchAction: 'manipulation'
            }}
          >
            <i className="fa fa-times" />
          </span>
          <div className="logo-box">
            <Link to="/" aria-label="logo image">
            <img src={MobileLogo} alt="Logo" />
            </Link>
          </div>
          {/* /.logo-box */}
          <div className="mobile-nav__container">
           <ul className="main-menu__list">
                 <li>
                   <Link to="/">
                     Home
                   </Link>
                 </li>
           
                 <li className="dropdown">
                   <Link to="/about">
                     About
                   </Link>
                   <ul className="sub-menu">
                     <li>
                       <Link to="/team">
                         Committee Members
                       </Link>
                     </li>
                     <li>
                       <Link to="/referees">
                         Referees
                       </Link>
                     </li>
                     <li>
                       <Link to="/colloboration">
                         Partnerships
                       </Link>
                     </li>
                   </ul>
                 </li>
           
                 {/* <li className={parentMenu === 'Events' ? 'dropdown current-menu-item' : 'dropdown'}>
                   <Link to="/event" className={activeMenu === '/event' ? 'active-menu' : ''}>
                     Events
                   </Link>
                   <ul className="sub-menu">
                     <li>
                       <Link to="/event" className={activeMenu === '/event' ? 'active-menu' : ''}>
                         All Events
                       </Link>
                       <ul className="sub-menu">
                         <li>
                           <Link to="/event-details/year-1">State Championship</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-3">Gym Point Championship</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-4">Origin Championship</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-5">Ozzie Championship</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-6">Potens Championship</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-7">Second State Championship</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-8">Telangana First State Championship</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-9">FSG Independence Day</Link>
                         </li>
                         <li>
                           <Link to="/event-details/year-10">AF Championship</Link>
                         </li>
                       </ul>
                     </li>
                   </ul>
                 </li> */}
                 <li>
                   <Link to="/gallery">
                     Blogs
                   </Link>
                 </li>
                 <li>
                   <Link to="/results">
                     Results
                   </Link>
                   <ul className="sub-menu">
                     
                     {/* <li>
                       <Link to="/gallery">
                         Photo Gallery
                       </Link>
                     </li> */}
                   </ul>
                 </li>
           
                 <li>
                   <Link to="/inspire/success-stories">
                     Inkspire
                   </Link>
                  
                 </li>
           
                 <li>
                   <Link to="/registration">
                     Register
                   </Link>
                 </li>
           
                 <li>
                   <Link to="/contact">
                     Contact
                   </Link>
                 </li>
               </ul>
          </div>
          {/* /.mobile-nav__container */}
          
          {/* /.mobile-nav__contact */}
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <Link to="#" className="fab fa-twitter" />
              <Link to="#" className="fab fa-facebook-square" />
              <Link to="#" className="fab fa-pinterest-p" />
              <Link to="#" className="fab fa-instagram" />
            </div>
            {/* /.mobile-nav__social */}
          </div>
          {/* /.mobile-nav__top */}
        </div>
        {/* /.mobile-nav__content */}
      </div>

      <div
        className="nav-overlay"
        style={{ display: `${isSidebar ? "block" : "none"}` }}
        onClick={handleSidebar}
      />
    </>
  );
};
export default MobileMenu;
