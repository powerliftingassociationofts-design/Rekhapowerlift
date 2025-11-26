import React, { useEffect, useState } from 'react';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
import RegistrationMain from './RegistrationMain';

const Registration = () => {
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
                parentMenu='registration'
                activeMenu="/registration"
            />
            {/* SiteBreadcrumb */}
            <SiteBreadcrumb
                pageTitle="Registration"
                pageName="Registration"
                breadcrumbsImg={bannerbg}
            />
            {/* SiteBreadcrumb End */}
            
            {/* Registration Main */}
            <RegistrationMain />
            {/* Registration Main End */}
            
            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
};

export default Registration;
