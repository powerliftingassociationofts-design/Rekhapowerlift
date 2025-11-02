import React, { useEffect, useState } from 'react';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import navImg1 from '../../assets/images/plat2.png';
import Footer from '../../components/Layout/Footer';
import AdminDashboard from './AdminDashboard';

const AdminDashboardPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <React.Fragment>
            <Header
                navImg={navImg1}
                parentMenu='admin'
                activeMenu="/admin/blog-dashboard"
            />
            
            <div style={{ marginTop: '100px', minHeight: '100vh' }}>
                <AdminDashboard />
            </div>
            
            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
};

export default AdminDashboardPage;