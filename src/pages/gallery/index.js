import React, { useEffect, useState } from 'react';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import navImg1 from '../../assets/images/resources/logo-1.png';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import bannerbg from '../../assets/images/backgrounds/page9-header-bg.jpg';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import GalleryMain from './GalleryMain';


// Breadcrumbs Background Image

const Gallery = () => {

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
            parentMenu='Gallery'
            activeMenu="/Gallery"
        />
        {/* SiteBreadcrumb */}
        <SiteBreadcrumb
            pageTitle="Gallery"
             pageName={
    <span style={{ color: '#ff1493', fontSize: '25px', fontWeight: '700' }}>
      Gallery
    </span>
  }
            // pageName="Gallery"
            breadcrumbsImg={bannerbg}
        />
        {/* SiteBreadcrumb */}
        <GalleryMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    );
}

export default Gallery;