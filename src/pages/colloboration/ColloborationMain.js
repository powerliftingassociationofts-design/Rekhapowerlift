// import React from "react";  


// import { FaCheckCircle } from "react-icons/fa"; // icons for bullet points

// const CollaborationPage = () => {
//   const cards = [
//     {
//       id: 1,
//       title: "Partner Gym Benefits",
//       items: [
//         "₹250 per athlete referred for WPC registration",
//         "State-level recognition and promotion",
//         "Social media and poster marketing",
//         "Priority hosting for local events",
//       ],
//       // ✅ verified gym image (works in browser + React)
//       image:
//         "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
//     },
//     {
//       id: 2,
//       title: "Achievements",
//       items: [
//         "10+ State Champions selected for Nationals",
//         "State-level recognition and promotion",
//         "3 International Medalists from Telangana",
//         "Multiple National Record Holders",
//       ],
//       // ✅ verified medals/trophy image
//       image:
//         "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
//     },
//   ];

//   return (
//     <>
//       <section className="blog-page collaboration-page py-5">
//         <div className="container">
//           {/* Section Title */}
//           <div className="section-title text-center mb-5">
//             <h2 className="section-title__title">
//               Collaborations & Achievements
//             </h2>
//             <p className="section-title__text">
//               WPC Telangana actively partners with fitness centers, academies,
//               and gyms to build strength awareness and athlete participation.
//             </p>
//           </div>

//           {/* Cards Grid */}
//           <div className="row justify-content-center">
//             {cards.map((card, index) => (
//               <div
//                 key={card.id}
//                 className={`col-xl-5 col-lg-6 col-md-8 mb-4 wow fadeIn${
//                   index % 2 === 0 ? "Left" : "Right"
//                 }`}
//                 data-wow-delay={`${(index + 1) * 100}ms`}
//               >
//                 <div className="collab-card">
//                   <div className="collab-card__img">
//                     <img src={card.image} alt={card.title} />
//                     <div className="collab-card__overlay">
//                       <h4>{card.title}</h4>
//                     </div>
//                   </div>
//                   <div className="collab-card__content">
//                     <h3>{card.title}</h3>
//                     <ul>
//                       {card.items.map((item, idx) => (
//                         <li key={idx}>
//                           <FaCheckCircle className="me-2 text-success" />
//                           {item}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Hover & style effects */}
//       <style>{`
//         .collab-card {
//           background: #fff;
//           border-radius: 15px;
//           overflow: hidden;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//           transition: all 0.4s ease;
//         }
//         .collab-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 8px 25px rgba(0,0,0,0.15);
//         }
//         .collab-card__img {
//           position: relative;
//           overflow: hidden;
//         }
//         .collab-card__img img {
//           width: 100%;
//           height: 280px;
//           object-fit: cover;
//           transition: transform 0.6s ease;
//         }
//         .collab-card:hover .collab-card__img img {
//           transform: scale(1.08);
//         }
//         .collab-card__overlay {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           background: rgba(0,0,0,0.5);
//           color: #fff;
//           padding: 12px 20px;
//           text-align: center;
//           opacity: 0;
//           transition: opacity 0.4s ease;
//         }
//         .collab-card:hover .collab-card__overlay {
//           opacity: 1;
//         }
//         .collab-card__content {
//           padding: 20px;
//           text-align: left;
//         }
//         .collab-card__content h3 {
//           font-size: 1.4rem;
//           font-weight: 600;
//           margin-bottom: 15px;
//           color: #111;
//         }
//         .collab-card__content ul {
//           list-style: none;
//           padding: 0;
//         }
//         .collab-card__content ul li {
//           margin-bottom: 10px;
//           font-size: 1rem;
//           color: #333;
//           display: flex;
//           align-items: center;
//         }
//       `}</style>
//     </>
//   );
// };

// export default CollaborationPage;






"use client";
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // icons for bullet points
import TestimonialsImg1 from '../../assets/images/testimonial/testimonial-one-client-1-1.jpg';
import TestimonialsImg2 from '../../assets/images/testimonial/testimonial-one-client-1-2.jpg';
import TestimonialsImg3 from '../../assets/images/testimonial/testimonial-one-client-1-3.jpg';
import TestimonialsImg4 from '../../assets/images/testimonial/testimonial-one-client-1-4.jpg';
import TestimonialsImg5 from '../../assets/images/testimonial/testimonial-one-client-1-5.jpg';
import TestimonialsImg6 from '../../assets/images/testimonial/testimonial-one-client-1-6.jpg';


// Collaboration images
const cards = [
  {
    id: 1,
    title: "Partner Gym Benefits",
    items: [
      "₹250 per athlete referred for WPC registration",
      "State-level recognition and promotion",
      "Social media and poster marketing",
      "Priority hosting for local events",
    ],
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Achievements",
    items: [
      "10+ State Champions selected for Nationals",
      "State-level recognition and promotion",
      "3 International Medalists from Telangana",
      "Multiple National Record Holders",
    ],
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
  },
];

// Testimonials images and data

const testimonials = [
  {
    clientName: "Rajesh Kumar",
    role: "National Powerlifter",
    clientImage: TestimonialsImg1,
    text: "Being part of WPC Telangana has completely changed my approach to training. The competitions are well organized and the community is truly supportive.",
    rating: 5,
  },
  {
    clientName: "Priya Sharma",
    role: "Athlete & Coach",
    clientImage: TestimonialsImg2,
    text: "I’m amazed by the professional standards of the events. The WPC team ensures everything runs smoothly and gives athletes the best experience.",
    rating: 5,
  },
  {
    clientName: "Anil Reddy",
    role: "Event Volunteer",
    clientImage: TestimonialsImg3,
    text: "Volunteering with WPC has been one of my most rewarding experiences. The passion and discipline of the athletes are truly inspiring.",
    rating: 4,
  },
  {
    clientName: "Sneha Patel",
    role: "Fitness Trainer",
    clientImage: TestimonialsImg4,
    text: "The WPC events have helped me connect with so many talented athletes. The level of motivation and energy is unmatched!",
    rating: 5,
  },
  {
    clientName: "Rahul Verma",
    role: "Champion Lifter",
    clientImage: TestimonialsImg5,
    text: "Every event feels like a festival of strength! I’m proud to represent WPC Telangana and be part of such a dedicated community.",
    rating: 5,
  },
  {
    clientName: "Divya Singh",
    role: "Participant",
    clientImage: TestimonialsImg6,
    text: "From registration to award ceremonies, everything was perfectly organized. WPC really sets a high standard for powerlifting events in India.",
    rating: 4,
  },
];

export default function CollaborationPage() {
  return (
    <>
      {/* Collaboration Cards Section */}
      <section className="blog-page collaboration-page py-5">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2 className="section-title__title">
              Collaborations & Achievements
            </h2>
            <p className="section-title__text">
              WPC Telangana actively partners with fitness centers, academies,
              and gyms to build strength awareness and athlete participation.
            </p>
          </div>

          <div className="row justify-content-center">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`col-xl-5 col-lg-6 col-md-8 mb-4 wow fadeIn${
                  index % 2 === 0 ? "Left" : "Right"
                }`}
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="collab-card">
                  <div className="collab-card__img">
                    <img src={card.image} alt={card.title} />
                    <div className="collab-card__overlay">
                      <h4>{card.title}</h4>
                    </div>
                  </div>
                  <div className="collab-card__content">
                    <h3>{card.title}</h3>
                    <ul>
                      {card.items.map((item, idx) => (
                        <li key={idx}>
                          <FaCheckCircle className="me-2 text-success" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-page py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2 className="section-title__title">Testimonials</h2>
            <p className="section-title__text">
              See what our athletes, volunteers, and partners have to say about WPC Telangana.
            </p>
          </div>

          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-xl-6 col-lg-6 col-md-6 mb-4">
                <div className="testimonial-one__single p-3 shadow-sm bg-white rounded">
                  <div className="testimonial-one__client-info-and-review d-flex align-items-center mb-2">
                    <div className="testimonial-one__client-info d-flex align-items-center">
                      <div className="testimonial-one__client-img me-3">
                        <img
                          src={testimonial.clientImage}
                          alt={testimonial.clientName}
                          className="rounded-circle"
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="testimonial-one__client-content">
                        <h4 className="testimonial-one__client-name">
                          <Link to="#">{testimonial.clientName}</Link>
                        </h4>
                        <p className="testimonial-one__sub-title">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-one__review ms-auto">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <span key={i} className="icon-star text-warning"></span>
                      ))}
                      {Array.from({ length: 5 - testimonial.rating }, (_, i) => (
                        <span key={i + testimonial.rating} className="icon-star text-muted"></span>
                      ))}
                    </div>
                  </div>
                  <p className="testimonial-one__text">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        /* Collaboration Cards */
        .collab-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
        }
        .collab-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .collab-card__img {
          position: relative;
          overflow: hidden;
        }
        .collab-card__img img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .collab-card:hover .collab-card__img img {
          transform: scale(1.08);
        }
        .collab-card__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.5);
          color: #fff;
          padding: 12px 20px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .collab-card:hover .collab-card__overlay {
          opacity: 1;
        }
        .collab-card__content {
          padding: 20px;
          text-align: left;
        }
        .collab-card__content h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: #111;
        }
        .collab-card__content ul {
          list-style: none;
          padding: 0;
        }
        .collab-card__content ul li {
          margin-bottom: 10px;
          font-size: 1rem;
          color: #333;
          display: flex;
          align-items: center;
        }

        /* Testimonials */
        .testimonial-one__single {
          border-radius: 12px;
        }
        .testimonial-one__client-name a {
          color: #111;
          text-decoration: none;
          font-weight: 600;
        }
        .testimonial-one__sub-title {
          font-size: 0.9rem;
          color: #555;
        }
        .icon-star {
          font-size: 1rem;
        }
        .testimonial-one__text {
          font-size: 0.95rem;
          color: #333;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
