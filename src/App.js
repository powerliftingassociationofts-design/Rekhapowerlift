import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TeamDetailsPage from "./pages/team/TeamDetailsPage";
import OnePageHome from "./pages/one-page-style-one";
import About from "./pages/about";
import Team from "./pages/team";
import TestimonialsMain from "./pages/testimonials/TestimonialsMain";
import Testimonials from "./pages/testimonials";
import Faq from "./pages/faq";
import NoPage from "./pages/NoPage";
import Services from "./pages/services";
import Gallery from "./pages/gallery";
import Colloboration from "./pages/colloboration";
import GalleryDetails from "./pages/gallery-details";
import Event from "./pages/event";
import EventDetails from "./pages/event-details";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import Referees from "./pages/referees";
import Inspire from "./pages/inspire";
import InspireDetails from "./pages/inspire/InspireDetails";
import SuccessStories from "./pages/inspire/success-stories";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Registration from "./pages/registration";
import ScrollToTop from "./ScrollToTop";
import Results from "./pages/result";
import ResultsMain from "./pages/result/ResultsMain";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="one-page-style-one" element={<OnePageHome />} />
        <Route path="team" element={<Team />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/testimonials-main" element={<TestimonialsMain />} />
        <Route path="referees" element={<Referees />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="colloboration" element={<Colloboration />} />
        <Route path="gallery-details" element={<GalleryDetails />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NoPage />} />
        <Route path="services" element={<Services />} />
        <Route path="event-details" element={<EventDetails />} />
        <Route path="event" element={<Event />} />
        <Route path="blog" element={<Blog />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="contact" element={<Contact />} />
        <Route path="registration" element={<Registration />} />
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        <Route path="/inspire" element={<Inspire />} />
        <Route path="/inspire/success-stories" element={<SuccessStories />} />
        <Route path="/inspire-details/:id" element={<InspireDetails />} />
        <Route path="/team" element={<Home />} />
        <Route path="/team-details/:id" element={<TeamDetailsPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:category" element={<ResultsMain />} />
      </Routes>
    </BrowserRouter>
  );
}
