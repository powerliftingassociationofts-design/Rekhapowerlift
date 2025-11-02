import React, { useEffect, useState } from "react";
import BackToTop from "../../../components/elements/BackToTop";
import Header from "../../../components/Layout/Header";
import navImg1 from "../../../assets/images/resources/logo-1.png";
import Footer from "../../../components/Layout/Footer";
import SiteBreadcrumb from "../../../components/Common/Breadcumb";
import bannerbg from "../../../assets/images/backgrounds/page6-header-bg.jpg";
import CtaTwo from "../../../components/Common/CtaSection/CtaTwo";
import SuccessStoriesMain from "./SuccessStoriesMain";

const SuccessStories = () => {
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
    <>
      <Header
        navImg={navImg1}
        parentMenu="inspire"
        activeMenu="/inspire/success-stories"
      />
      {/* Breadcrumb */}
      <SiteBreadcrumb
        pageTitle="Success Stories"
        pageName={
          <span style={{ color: '#ff1493', fontSize: '25px', fontWeight: '700' }}>
            Success Stories
          </span>
        }
        breadcrumbsImg={bannerbg}
      />
      {/* Main Content */}
      <SuccessStoriesMain />
      {/* Call to Action */}
      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />
    </>
  );
};

export default SuccessStories;