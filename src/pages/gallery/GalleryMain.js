"use client";
import React from "react";
import { Link } from "react-router-dom";

// ================= Gallery Images =================
import GalleryImg1 from '../../assets/images/resources/schedule-one-1-1.jpg'
import GalleryImg2 from '../../assets/images/resources/schedule-one-1-8.jpg'
import GalleryImg3 from '../../assets/images/resources/schedule-one-1-10.jpg'
import GalleryImg4 from '../../assets/images/resources/schedule-one-1-4.jpg'
import GalleryImg5 from '../../assets/images/resources/schedule-one-1-5.jpg'
import GalleryImg6 from '../../assets/images/resources/schedule-one-1-6.jpg'
import GalleryImg7 from '../../assets/images/resources/schedule-one-1-2.jpg'
import GalleryImg8 from '../../assets/images/resources/schedule-one-1-7.jpg'

import TeamImg1 from '../../assets/images/team/team-1-1.jpg'
import TeamImg2 from '../../assets/images/team/team-1-2.jpg'
import TeamImg3 from '../../assets/images/team/team-1-3.jpg'
import TeamImg4 from '../../assets/images/team/team-1-4.jpg'
import TeamImg5 from '../../assets/images/team/team-1-5.jpg'
import TeamImg6 from '../../assets/images/team/team-1-6.jpg'
import TeamImg7 from '../../assets/images/team/team-1-7.jpg'
import TeamImg8 from '../../assets/images/team/team-1-8.jpg'
import TeamImg9 from '../../assets/images/team/team-1-9.jpg'
import TeamImg10 from '../../assets/images/team/team-1-10.jpg'
import TeamImg11 from '../../assets/images/team/team-1-11.jpg'
import TeamImg12 from '../../assets/images/team/team-1-12.jpg'

const galleryItems = [
  { src: GalleryImg1, alt: "Gallery 1", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg2, alt: "Gallery 2", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg3, alt: "Gallery 3", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg4, alt: "Gallery 4", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg5, alt: "Gallery 5", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg6, alt: "Gallery 6", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg7, alt: "Gallery 7", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg8, alt: "Gallery 8", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
];

// ================= Team Images & Members =================


const teamMembers = [
  { id: "rekha", name: "Inturi Rekha", role: "President,WPC Telangana", img: TeamImg1, description: "" },
  { id: "kumari", name: "Inturi Kumari", role: "Chairman,WPC Telangana", img: TeamImg2, description: "" },
  { id: "pradeep", name: "Dr.H.A.Pradeep Kumar", role: "Vice Chairman,WPC Telangana", img: TeamImg3, description: "" },
  { id: "guru", name: "Mr.Guru Parminder Singh", role: "State Secretary,WPC Telangana", img: TeamImg6, description: "" },
  { id: "moneess", name: "Mr.Moneess Pulelu", role: "Secretary-Rangareddy,WPC Telangana", img: TeamImg4, description: "" },
  { id: "abdul", name: "Mr.Abdul Ateeq", role: "Secretary-hyderabad,WPC Telangana", img: TeamImg5, description: "" },
  { id: "vijay", name: "Mr.G.VijaY", role: "Treasurer,WPC Telangana", img: TeamImg7, description: "" },
   { id: "kiran", name: "Mr.Kiran Kumar", role: "President-Medchal,WPC Telangana", img: TeamImg12, description: "" },
  { id: "mazhar", name: "Mr.Mir Mazhar Ali khan", role: " President-Hyderabad District,WPC Telangana", img: TeamImg10, description: "" },
  { id: "abhilash", name: "Mr.Abhilash babde", role: "President-Rangareddy,WPC Telangana", img: TeamImg9, description: "" },
  { id: "manoj", name: "Mr.Deeti manoj Kumar", role: "State Media Coordinator,WPC Telangana", img: TeamImg8, description: "" },
  { id: "sukanya", name: "Ms.Sukanya Chowdary", role: "State Media Coordinator,WPC Telangana", img: TeamImg11, description: "" },
];

// ================= Merged Component =================
export default function HomePage() {
  return (
    <>
      {/* ================= Gallery Section ================= */}
      <section className="gallery-one">
        <div className="container">
          <div className="row masonary-layout">
            {galleryItems.map((item, index) => (
              <div key={index} className="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div className="gallery-one__single">
                  <div className="gallery-one__img position-relative">
                    <img src={item.src} alt={item.alt} className="w-100" />
                    <div className="gallery-one__content position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "rgba(0,0,0,0.5)" }}>
                      <div className="gallery-one__sub-title-box">
                        <div className="gallery-one__sub-title-shape"></div>
                        <p className="gallery-one__sub-title">{item.subtitle}</p>
                      </div>
                      <h4 className="gallery-one__title">
                        <Link to={item.href} className="text-white">{item.title}</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Team Section ================= */}
      <section className="team-page py-5">
        <div className="container">
          <div className="row">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`col-xl-4 col-lg-6 col-md-6 wow fadeIn${index % 2 === 0 ? "Left" : "Right"}`}
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="team-one__single">
                  <div className="team-one__img-box position-relative">
                    <div className="team-one__img">
                      <img src={member.img} alt={member.name} className="w-100" />
                      <div className="team-one__content">
                        <h4 className="team-one__name">
                          <Link to={`/team-details/${member.id}`}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title">{member.role}</p>
                      </div>
                      <div className="team-one__content-hover">
                        <h4 className="team-one__name-hover">
                          <Link to={`/team-details/${member.id}`}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title-hover">{member.role}</p>
                        <p className="team-one__text-hover">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
