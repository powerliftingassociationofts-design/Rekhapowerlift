"use client";
import React from "react";
import { Link } from 'react-router-dom';
import TestimonialsImg1 from '../../assets/images/testimonial/testimonial-one-client-1-1.jpg';
import TestimonialsImg2 from '../../assets/images/testimonial/testimonial-one-client-1-2.jpg';
import TestimonialsImg3 from '../../assets/images/testimonial/testimonial-one-client-1-3.jpg';
import TestimonialsImg4 from '../../assets/images/testimonial/testimonial-one-client-1-4.jpg';
import TestimonialsImg5 from '../../assets/images/testimonial/testimonial-one-client-1-5.jpg';
import TestimonialsImg6 from '../../assets/images/testimonial/testimonial-one-client-1-6.jpg';

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

export default function TestimonialsPage() {
  return (
    <div>
      {/* Testimonials Page Start */}
      <section className="testimonial-page">
        <div className="container">
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                <div className="testimonial-one__single">
                  <div className="testimonial-one__client-info-and-review">
                    <div className="testimonial-one__client-info">
                      <div className="testimonial-one__client-img">
                        <img
                          src={testimonial.clientImage}
                          alt={testimonial.clientName}
                        />
                      </div>
                      <div className="testimonial-one__client-content">
                        <h4 className="testimonial-one__client-name">
                          <Link to="#">
                            {testimonial.clientName}
                          </Link>
                        </h4>
                        <p className="testimonial-one__sub-title">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-one__review">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <span key={i} className="icon-star"></span>
                      ))}
                      {Array.from(
                        { length: 5 - testimonial.rating },
                        (_, i) => (
                          <span
                            key={i + testimonial.rating}
                            className="icon-star clr-start"
                          ></span>
                        )
                      )}
                    </div>
                  </div>
                  <p className="testimonial-one__text">{testimonial.text}</p>
                  <div className="testimonial-one__quote">
                    <span className="icon-quote"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Page End */}
    </div>
  );
}
