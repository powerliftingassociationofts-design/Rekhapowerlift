// import React from 'react';
// import { Link } from 'react-router-dom';

// const MenuItems = ({ parentMenu, secondParentMenu, activeMenu }) => {
//   return (
//     <ul className="main-menu__list">
//       <li className={parentMenu === 'Home' ? 'current-menu-item' : ''}>
//         <Link to="/" className={activeMenu === '/' ? 'active-menu' : ''}>
//           Home
//         </Link>
//       </li>
//       <li className={parentMenu === 'Pages' ? 'dropdown current-menu-item' : 'dropdown'}>
//         <Link to="#">Pages</Link>
//         <ul className="sub-menu">
//           <li>
//             <Link to="/about" className={activeMenu === '/about' ? 'active-menu' : ''}>
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/team" className={activeMenu === '/team' ? 'active-menu' : ''}>
//               Committee Members
//             </Link>
//           </li>
//           <li>
//             <Link to="/team-details" className={activeMenu === '/team-details' ? 'active-menu' : ''}>
//               Referees
//             </Link>
//           </li>
//           <li>
//             <Link to="/testimonials" className={activeMenu === '/testimonials' ? 'active-menu' : ''}>
//               Testimonials
//             </Link>
//           </li>
//           <li>
//             <Link to="/pricing" className={activeMenu === '/pricing' ? 'active-menu' : ''}>
//               Results
//             </Link>
//           </li>
//           <li>
//             <Link to="/gallery" className={activeMenu === '/gallery' ? 'active-menu' : ''}>
//               Gallery
//             </Link>
//           </li>
//           <li>
//             <Link to="/gallery-details" className={activeMenu === '/gallery-details' ? 'active-menu' : ''}>
//               Gallery Details
//             </Link>
//           </li>
//           <li>
//             <Link to="/faq" className={activeMenu === '/faq' ? 'active-menu' : ''}>
//               FAQ
//             </Link>
//           </li>
//           <li>
//             <Link to="/404" className={activeMenu === '/404' ? 'active-menu' : ''}>
//               404 Error
//             </Link>
//           </li>
//         </ul>
//       </li>


//       <li className={parentMenu === 'Events' ? 'dropdown current-menu-item' : 'dropdown'}>
//         <Link to="#">Events</Link>
//         <ul className="sub-menu">
//           <li className={parentMenu === 'Championships' ? 'dropdown current-menu-item' : 'dropdown'}>
//             <Link
//               to="/event"
//               className={`flex items-center justify-between ${activeMenu === '/event' ? 'active-menu' : ''}`}
//             >
//               {/* Championships <span className="ml-2">▼ </span> */}
//                Championships <span className="ml-2">+</span>
//             </Link>


//             <ul className="sub-menu">
//               <li>
//                 <Link to="/event-details/year-1" className={activeMenu === '/state-championship' ? 'active-menu' : ''}>
//                   State Championship
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-3" className={activeMenu === '/gym-point-championship' ? 'active-menu' : ''}>
//                   Gym Point Championship
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-4" className={activeMenu === '/origin-championship' ? 'active-menu' : ''}>
//                   Origin Championship
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-5" className={activeMenu === '/ozzie-championship' ? 'active-menu' : ''}>
//                   Ozzie Championship
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-6" className={activeMenu === '/potens-championship' ? 'active-menu' : ''}>
//                   Potens Championship
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-7" className={activeMenu === '/second-state-championship' ? 'active-menu' : ''}>
//                   Second State Championship
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-8" className={activeMenu === '/telangana-first-state-championship' ? 'active-menu' : ''}>
//                   Telangana First State Championship
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-9" className={activeMenu === '/fsg-independence-day' ? 'active-menu' : ''}>
//                   FSG Independence Day
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/event-details/year-10" className={activeMenu === '/af-championship' ? 'active-menu' : ''}>
//                   AF Championship3
//                 </Link>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </li>

//       <li className={parentMenu === 'Membership' ? 'dropdown current-menu-item' : 'dropdown'}>
//         <Link to="#">Membership</Link>
//         <ul className="sub-menu">
//           <li>
//             <Link to="/event" className={activeMenu === '/event' ? 'active-menu' : ''}>
//               How to Join
//             </Link>
//           </li>
//           <li>
//             <Link to="/event-details" className={activeMenu === '/event-details' ? 'active-menu' : ''}>
//               Benefits & Rules
//             </Link>
//           </li>
//         </ul>
//       </li>
//       <li className={parentMenu === 'Blog' ? 'dropdown current-menu-item' : 'dropdown'}>
//         <Link to="#">Blog</Link>
//         <ul className="sub-menu">
//           <li>
//             <Link to="/blog" className={activeMenu === '/blog' ? 'active-menu' : ''}>
//               Blog
//             </Link>
//           </li>
//           <li>
//             <Link to="/blog-list" className={activeMenu === '/blog-list' ? 'active-menu' : ''}>
//               Blog List
//             </Link>
//           </li>
//           <li>
//             <Link to="/blog-details" className={activeMenu === '/blog-details' ? 'active-menu' : ''}>
//               Blog Details
//             </Link>
//           </li>
//         </ul>
//       </li>
//       <li className={parentMenu === 'Contact' ? 'current-menu-item' : ''}>
//         <Link to="/contact" className={activeMenu === '/contact' ? 'active-menu' : ''}>
//           Contact
//         </Link>
//       </li>
//     </ul>
//   );
// };

// export default MenuItems;













































































import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = ({ parentMenu, secondParentMenu, activeMenu }) => {
  return (
    <ul className="main-menu__list">
      {/* Home */}
      <li className={parentMenu === 'Home' ? 'current-menu-item' : ''}>
        <Link to="/" className={activeMenu === '/' ? 'active-menu' : ''}>
          Home
        </Link>
      </li>

      {/* Events Dropdown */}
      <li className={parentMenu === 'Events' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Events</Link>
        <ul className="sub-menu">
          <li className={parentMenu === 'Championships' ? 'dropdown current-menu-item' : 'dropdown'}>
            <Link to="/event">Championships</Link>
            <ul className="sub-menu">
              <li>
                <Link to="/event-details/year-1" className={activeMenu === '/state-championship' ? 'active-menu' : ''}>
                  State Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-3" className={activeMenu === '/gym-point-championship' ? 'active-menu' : ''}>
                  Gym Point Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-4" className={activeMenu === '/origin-championship' ? 'active-menu' : ''}>
                  Origin Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-5" className={activeMenu === '/ozzie-championship' ? 'active-menu' : ''}>
                  Ozzie Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-6" className={activeMenu === '/potens-championship' ? 'active-menu' : ''}>
                  Potens Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-7" className={activeMenu === '/second-state-championship' ? 'active-menu' : ''}>
                  Second State Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-8" className={activeMenu === '/telangana-first-state-championship' ? 'active-menu' : ''}>
                  Telangana First State Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-9" className={activeMenu === '/fsg-independence-day' ? 'active-menu' : ''}>
                  FSG Independence Day
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-10" className={activeMenu === '/af-championship' ? 'active-menu' : ''}>
                  AF Championship
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/colloboration" className={activeMenu === '/collaboration' ? 'active-menu' : ''}>
              Upcoming Events
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={activeMenu === '/gallery' ? 'active-menu' : ''}>
              Past Results
            </Link>
          </li>
        </ul>
      </li>

      {/* InKSPIRE */}
      <li className={parentMenu === 'inspire' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="/inspire/success-stories">InKSPIRE</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/inspire/success-stories" className={activeMenu === '/inspire/success-stories' ? 'active-menu' : ''}>
              Success Stories
            </Link>
          </li>
          <li>
            <Link to="/blogs" className={activeMenu === '/blogs' ? 'active-menu' : ''}>
              Blogs
            </Link>
          </li>
        </ul>
      </li>

      {/* Results */}
      <li className={parentMenu === 'Results' ? 'current-menu-item' : ''}>
        <Link to="/results" className={activeMenu === '/results' ? 'active-menu' : ''}>
          Results
        </Link>
      </li>

      {/* Organization Dropdown */}
      <li className={parentMenu === 'Organization' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Organization</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/team" className={activeMenu === '/team' ? 'active-menu' : ''}>
              Board Members
            </Link>
          </li>
          <li>
            <Link to="/referees" className={activeMenu === '/referees' ? 'active-menu' : ''}>
              Referees
            </Link>
          </li>
          <li>
            <Link to="/colloboration" className={activeMenu === '/collaboration' ? 'active-menu' : ''}>
              Collaborations
            </Link>
          </li>
          <li>
            <Link to="/about" className={activeMenu === '/about' ? 'active-menu' : ''}>
              About WPC Telangana
            </Link>
          </li>
        </ul>
      </li>

      {/* Registration Dropdown */}
      <li className={parentMenu === 'Registration' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Registration</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/registration" className={activeMenu === '/registration' ? 'active-menu' : ''}>
              Athlete Registration
            </Link>
          </li>
          <li>
            <Link to="/registration" className={activeMenu === '/registration' ? 'active-menu' : ''}>
              ID Lookup
            </Link>
          </li>
        </ul>
      </li>

      {/* Contact */}
      <li className={parentMenu === 'Contact' ? 'current-menu-item' : ''}>
        <Link to="/contact" className={activeMenu === '/contact' ? 'active-menu' : ''}>
          Contact
        </Link>
      </li>

      {/* Admin Link (Hidden/Subtle) */}
      <li className={parentMenu === 'Admin' ? 'current-menu-item' : ''} style={{ opacity: 0.3 }}>
        <Link 
          to="/admin" 
          className={activeMenu === '/admin' ? 'active-menu' : ''}
          title="Admin Panel"
          style={{ fontSize: '0.8rem', color: '#999' }}
        >
          <i className="fas fa-user-shield"></i>
        </Link>
      </li>
    </ul>
  );
};

export default MenuItems;
