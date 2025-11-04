import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackToTop from "../../components/elements/BackToTop";
import Header from "../../components/Layout/Header";
import navImg1 from "../../assets/images/resources/logo-1.png";
import Footer from "../../components/Layout/Footer";
import SiteBreadcrumb from "../../components/Common/Breadcumb";
import bannerbg from "../../assets/images/backgrounds/page6-header-bg.jpg";
import CtaTwo from "../../components/Common/CtaSection/CtaTwo";
import inspireimg1 from '../../assets/images/Inspire/img1.jpg';


const InspireDetails = () => {
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => setIsVisible(window.scrollY > 300);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const stories = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "National Powerlifter",
      image: inspireimg1,
      quote: "Powerlifting taught me discipline and resilience. WPC Telangana gave me the platform to prove my strength at the national level.",
      achievements: [
        "Gold Medal - WPC India Nationals 2024",
        "Best Lifter Award - Telangana Open 2023",
        "Record Bench Press - 182.5 kg (75kg Category)"
      ],
    },
    {
      id: 2,
      name: "Deepika Rao",
      role: "Women's Powerlifting Champion",
      image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "I started as a beginner at a local gym. Today, I proudly represent Telangana in national events thanks to WPC’s support and guidance.",
      achievements: [
        "National Silver Medalist - WPC India 2024",
        "Women’s Empowerment Award - Telangana Sports 2023",
        "Coach for 20+ Female Powerlifters"
      ],
    },
    {
      id: 3,
      name: "Imran Shaik",
      role: "Youth Category Gold Medalist",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "WPC Telangana inspires every young athlete to stay consistent and confident. Hard work truly pays off here.",
      achievements: [
        "Gold - Telangana State Youth Powerlifting 2024",
        "Young Achiever Award - Hyderabad Fitness Expo"
      ],
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Coach & Mentor",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a7?auto=format&fit=crop&w=800&q=80",
      quote: "The goal is not just lifting weights, but lifting others with your story. WPC Telangana builds a strong, supportive community.",
      achievements: [
        "Certified WPC India Coach",
        "Mentored 3 National Medalists",
        "Head Coach - Hyderabad Strength Academy"
      ],
    },
    {
      id: 5,
      name: "Deepa Kumar",
      role: "Senior Powerlifting Trainer",
      image: "https://images.unsplash.com/photo-1603415526960-f4e3b39f0e6b?auto=format&fit=crop&w=800&q=80",
      quote: "Guiding young athletes under WPC Telangana has been an inspiring journey. Strength comes from unity and purpose.",
      achievements: [
        "Trainer of multiple state champions",
        "Organized Powerlifting workshops"
      ],
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "State Powerlifting Champion",
      image: "https://images.unsplash.com/photo-1621939405796-72d5de3b0466?auto=format&fit=crop&w=800&q=80",
      quote: "Joining WPC Telangana helped me transform my training and mindset. Now, I compete with confidence at state and national levels.",
      achievements: [
        "Gold Medal - Telangana State Powerlifting 2024",
        "Best Lifter Award - Hyderabad Open 2023"
      ],
    },
    {
      id: 7,
      name: "Anjali Mehra",
      role: "Women’s Fitness Ambassador",
      image: "https://images.unsplash.com/photo-1584438783969-0c9dbb8c1c5b?auto=format&fit=crop&w=800&q=80",
      quote: "Being part of WPC Telangana motivates women to take strength training seriously and empowers them to achieve their fitness goals.",
      achievements: [
        "Women’s Champion - Telangana Fitness Challenge 2023",
        "Ambassador for Women Powerlifting Programs"
      ],
    },
    {
      id: 8,
      name: "Raghav Varma",
      role: "Junior Gold Medalist",
      image: "https://images.unsplash.com/photo-1599058917211-49700926e3fa?auto=format&fit=crop&w=800&q=80",
      quote: "I learned that patience and perseverance are key. WPC Telangana coaches pushed me to my best and prepared me for national competitions.",
      achievements: [
        "Gold Medal - Telangana Junior Nationals 2024",
        "Best Junior Athlete Award 2023"
      ],
    },
    {
      id: 9,
      name: "Priya Nair",
      role: "Athlete & Motivational Speaker",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      quote: "Sharing my journey at WPC Telangana inspires upcoming athletes to believe in themselves and chase their dreams without fear.",
      achievements: [
        "Speaker at Telangana Fitness Summit 2024",
        "Mentored 50+ young athletes"
      ],
    },
    {
      id: 10,
      name: "Suresh Reddy",
      role: "Powerlifting Mentor & Trainer",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
      quote: "Mentoring young lifters and watching their progress is the most rewarding part of being with WPC Telangana. Strength is cultivated here with care.",
      achievements: [
        "Trainer of 5 National Medalists",
        "Certified WPC Strength Coach"
      ],
    },
    {
      id: 11,
      name: "Kavya Sharma",
      role: "Regional Powerlifting Champion",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      quote: "Training with WPC Telangana strengthened both my body and mind. Achieving medals is just part of my journey here.",
      achievements: [
        "Gold Medal - Regional Championship 2023",
        "Best Female Lifter Award"
      ],
    },
    {
      id: 12,
      name: "Arjun Reddy",
      role: "National Bench Press Record Holder",
      image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80",
      quote: "I broke my limits thanks to the guidance and encouragement from WPC Telangana. Strength comes from persistence and dedication.",
      achievements: [
        "National Bench Press Record 2024",
        "Gold Medal - Telangana Open 2023"
      ],
    },
  ];

  const athlete = stories.find((story) => story.id === parseInt(id));

  return (
    <>
      <Header navImg={navImg1} parentMenu="Inspire" activeMenu="/inspire" />

      <SiteBreadcrumb
        pageTitle="Inspire Details"
        pageName="Inspire"
        breadcrumbsImg={bannerbg}
      />

      <section className="blog-page inspire-details-page py-5">
        <div className="container">
          {!athlete ? (
            <div className="text-center my-5">
              <h3>Story not found</h3>
              <Link to="/inspire" className="thm-btn">
                Back to Inspire Page
              </Link>
            </div>
          ) : (
            <div className="row align-items-center">
              <div className="col-md-5">
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-md-7">
                <h2 className="mb-3">{athlete.name}</h2>
                <h5 className="text-primary mb-3">{athlete.role}</h5>
                <p className="lead mb-4">“{athlete.quote}”</p>
                <h4>Achievements</h4>
                <ul>
                  {athlete.achievements.map((ach, index) => (
                    <li key={index}>🏅 {ach}</li>
                  ))}
                </ul>
                <Link to="/inspire" className="thm-btn mt-4">
                  ← Back to Inspire Stories
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />

     <style>{`
  .inspire-details-page { animation: fadeIn 0.6s ease-in-out; }
  ul { list-style: none; padding: 0; }
  ul li { font-size: 16px; margin-bottom: 8px; }

  /* Updated button color to dark pink */
  .thm-btn {
    display: inline-block; 
    padding: 10px 20px;
    background: #ff1493; 
    color: #fff;
    border-radius: 8px; 
    font-weight: 600;
    text-decoration: none; 
    transition: background 0.3s;
  }
  .thm-btn:hover { background: #e0137a; }

  /* Optional: change role color to dark pink too */
  .text-primary { color: #ff1493 !important; }

  @keyframes fadeIn { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
`}</style>

    </>
  );
};

export default InspireDetails;
