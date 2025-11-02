import React, { useEffect, useState } from 'react';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import navImg1 from '../../assets/images/resources/logo-1.png';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import bannerbg from '../../assets/images/backgrounds/page-header-bg.jpg';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import RefereesMain from './RefereesMain';


// Breadcrumbs Background Image

const Referees = () => {

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
        <div className="referees-page">
        <React.Fragment>
        <Header
            navImg={navImg1}
            parentMenu='Referees'
            activeMenu="/Referees"
        />
        {/* SiteBreadcrumb */}
        <SiteBreadcrumb
            pageTitle="Referees"
          pageName={
    <span style={{ color: '#000000', fontSize: '25px', fontWeight: '700' }}>
      Referees
    </span>
  }
            // pageName="Referees"
            breadcrumbsImg={bannerbg}
        />
        {/* SiteBreadcrumb */}
        <RefereesMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    </div>
    );
}

export default Referees;