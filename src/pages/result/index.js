import React, { useEffect, useState } from 'react';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import navImg1 from '../../assets/images/resources/logo-1.png';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import ResultsMain from './ResultsMain';


const bannerbg = "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=80";

const Results = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 300);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <Header navImg={navImg1} parentMenu="Results" activeMenu="/Results" />

      {/* ✅ Breadcrumb with background */}
      <SiteBreadcrumb
        pageTitle="Results"
          pageName={
    <span style={{ color: '#ff1493', fontSize: '25px', fontWeight: '700' }}>
      Results
    </span>
  }
        // pageName="Results"
        breadcrumbsImg={bannerbg}
      />

      {/* Main results section */}
      <ResultsMain />

      {/* Call to action section */}
      <CtaTwo />

      {/* Back to top */}
      <BackToTop scroll={isVisible} />

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default Results;
