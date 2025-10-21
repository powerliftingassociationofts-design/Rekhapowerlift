import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import navImg1 from '../../assets/images/resources/logo-1.png';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import EventMain from './EventDetails';


import EventBanner1 from '../../assets/images/resources/schedule-one-1-1.jpg';
import EventBanner2 from '../../assets/images/resources/schedule-one-1-2.jpg';
import EventBanner3 from '../../assets/images/resources/event-details-img-box-img-11.jpg';
import EventBanner4 from '../../assets/images/resources/schedule-one-1-4.jpg';
import EventBanner5 from '../../assets/images/resources/schedule-one-1-5.jpg';
import EventBanner6 from '../../assets/images/resources/schedule-one-1-6.jpg';
import EventBanner7 from '../../assets/images/resources/schedule-one-1-7.jpg';
import EventBanner8 from '../../assets/images/resources/schedule-one-1-8.jpg';
import EventBanner9 from '../../assets/images/resources/schedule-one-1-10.jpg';

import DefaultBanner from '../../assets/images/backgrounds/page-header-bg.jpg';

const Event = () => {
  const { eventId } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const bannerMap = {
    'year-1': EventBanner1, 
    'year-3': EventBanner3, 
    'year-4': EventBanner4,
    'year-5': EventBanner5, 
    'year-6': EventBanner6, 
    'year-7': EventBanner7, 
    'year-8': EventBanner9, 
    'year-9': EventBanner2, 
    'year-10': EventBanner8, 
  };

  const titleMap = {
    'year-1': 'State Championship',
    'year-3': 'Gym Point Championship',
    'year-4': 'Origin Championship',
    'year-5': 'Ozzie Championship',
    'year-6': 'Potens Championship',
    'year-7': 'Second State Championship',
    'year-8': 'Telangana First State Championship',
    'year-9': 'FSG Independence Day',
    'year-10': 'AF Championship',
  };


  const breadcrumbsImg = bannerMap[eventId] || DefaultBanner;
  const pageTitle = titleMap[eventId] || 'Event Details';

  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <React.Fragment>
      <Header
        navImg={navImg1}
        parentMenu="event-details"
        activeMenu="/event-details"
      />

     
      <SiteBreadcrumb
        pageTitle={pageTitle} 
        pageName={
  <span style={{ color: '#ff1493', fontSize: '25px', fontWeight: '700' }}>
    {pageTitle}
  </span>
}


 


        // pageName={pageTitle} 
        breadcrumbsImg={breadcrumbsImg}
      />
      <EventMain />
      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />
    </React.Fragment>
  );
};

export default Event;
