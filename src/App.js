import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TeamDetailsPage from "./pages/team/TeamDetailsPage";
import HomeTwo from "./pages/home-2";
import HomeThree from "./pages/home-3";
import OnePageHome from "./pages/one-page-style-one";
import OnePageHomeTwo from "./pages/one-page-style-two";
import OnepageHomeThree from "./pages/one-page-style-three";
import About from "./pages/about";
import Team from "./pages/team";
import TestimonialsMain from "./pages/testimonials/TestimonialsMain";
import Testimonials from "./pages/testimonials";
import Pricing from "./pages/pricing";
import Faq from "./pages/faq";
import NoPage from "./pages/NoPage";
import Services from "./pages/services";
import EventProdigy from "./pages/event-prodigy";
import StellarEvents from "./pages/stellar-events-co";
import EliteEventManagement from "./pages/elite-event-management";
import InfiniteOccasions from "./pages/infinite-occasions";
import DreamEvent from "./pages/dream-event-planners";
import Gallery from "./pages/gallery";
import Colloboration from "./pages/colloboration";
import GalleryDetails from "./pages/gallery-details";
import Event from "./pages/event";
import EventDetails from "./pages/event-details";
// New Blog System
import BlogListPage from "./pages/blog/BlogListPage";
import BlogDetailsPage from "./pages/blog/BlogDetailsPage";
import AdminDashboardPageWithAuth from "./pages/admin/AdminDashboardPageWithAuth";
import AdminQuickAccess from "./components/AdminQuickAccess";
import Contact from "./pages/contact";
import Results from "./pages/result";
import Referees from "./pages/referees";
import Inspire from "./pages/inspire";
import InspireDetails from "./pages/inspire/InspireDetails";
import SuccessStories from "./pages/inspire/success-stories";
import Registration from "./pages/registration";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="home-2" element={<HomeTwo />} />
        <Route path="home-3" element={<HomeThree />} />
        <Route path="about" element={<About />} />
        <Route path="one-page-style-one" element={<OnePageHome />} />
        <Route path="one-page-style-two" element={<OnePageHomeTwo />} />
        <Route path="one-page-style-three" element={<OnepageHomeThree />} />
        <Route path="team" element={<Team />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/testimonials-main" element={<TestimonialsMain />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="results" element={<Results />} />
        <Route path="referees" element={<Referees />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="colloboration" element={<Colloboration />} />
        <Route path="gallery-details" element={<GalleryDetails />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NoPage />} />
        <Route path="services" element={<Services />} />
        <Route path="event-prodigy" element={<EventProdigy />} />
        <Route path="stellar-events-co" element={<StellarEvents />} />
        <Route path="elite-event-management" element={<EliteEventManagement />} />
        <Route path="infinite-occasions" element={<InfiniteOccasions />} />
        <Route path="dream-event-planners" element={<DreamEvent />} />
        <Route path="event-details" element={<EventDetails />} />
        <Route path="event" element={<Event />} />
        
        {/* New Blog System */}
        <Route path="blogs" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogDetailsPage />} />
        <Route path="admin" element={<AdminDashboardPageWithAuth />} />
        <Route path="admin/blog-dashboard" element={<AdminDashboardPageWithAuth />} />
        
        <Route path="contact" element={<Contact />} />
        <Route path="registration" element={<Registration />} />
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        <Route path="/inspire" element={<Inspire />} />
        <Route path="/inspire/success-stories" element={<SuccessStories />} />
        <Route path="/inspire-details/:id" element={<InspireDetails />} />
        <Route path="/team" element={<Home />} />
        <Route path="/team-details/:id" element={<TeamDetailsPage />} />
      </Routes>
      
      {/* Admin Quick Access - Available on all pages */}
      <AdminQuickAccess />
    </BrowserRouter>
  );
}
