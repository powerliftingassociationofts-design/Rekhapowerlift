import React from "react";
import { Link } from "react-router-dom";

const InspireMain = () => {
  const stories = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "National Powerlifter",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=60",
      quote:
        "Powerlifting taught me discipline and resilience. WPC Telangana gave me the platform to prove my strength at the national level.",
    },
    {
      id: 2,
      name: "Deepika Rao",
      role: "Women's Powerlifting Champion",
      image:
        "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=900&q=80",
      quote:
        "I started as a beginner at a local gym. Today, I proudly represent Telangana in national events thanks to WPC’s support and guidance.",
    },
    {
      id: 3,
      name: "Imran Shaik",
      role: "Youth Category Gold Medalist",
      image:
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote:
        "WPC Telangana inspires every young athlete to stay consistent and confident. Hard work truly pays off here.",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Coach & Mentor",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
      quote:
        "The goal is not just lifting weights,but lifting others with your story. WPC Telangana builds a strong,supportive community.",
    },
    {
      id: 5,
      name: "Deepa Kumar",
      role: "Senior Powerlifting Trainer",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
      quote:
        "Guiding young athletes under WPC Telangana has been an inspiring journey. Strength comes from unity and purpose.",
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "State Powerlifting Champion",
      image:
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
      quote:
        "Joining WPC Telangana helped me transform my training and mindset. Now, I compete with confidence at state and national levels.",
    },
    {
      id: 7,
      name: "Anjali Mehra",
      role: "Women’s Fitness Ambassador",
      image:
        "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80",
      quote:
        "Being part of WPC Telangana motivates women to take strength training seriously and empowers them to achieve their fitness goals.",
    },
    {
      id: 8,
      name: "Raghav Varma",
      role: "Junior Gold Medalist",
      image:
        "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote:
        "I learned that patience and perseverance are key. WPC Telangana coaches pushed me to my best and prepared me for national competitions.",
    },
    {
      id: 9,
      name: "Priya Nair",
      role: "Athlete & Motivational Speaker",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      quote:
        "Sharing my journey at WPC Telangana inspires upcoming athletes to believe in themselves and chase their dreams without fear.",
    },
    {
      id: 10,
      name: "Suresh Reddy",
      role: "Powerlifting Mentor & Trainer",
      image:
        "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote:
        "Mentoring young lifters and watching their progress is the most rewarding part of being with WPC Telangana. Strength is cultivated here with care.",
    },
    {
      id: 11,
      name: "Kavya Sharma",
      role: "Regional Powerlifting Champion",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      quote:
        "Training with WPC Telangana strengthened both my body and mind. Achieving medals is just part of my journey here.",
    },
    {
      id: 12,
      name: "Arjun Reddy",
      role: "National Bench Press Record Holder",
      image:
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80",
      quote:
        "I broke my limits thanks to the guidance and encouragement from WPC Telangana.persistence and dedication.",
    },
  ];

  return (
    <section className="blog-page collaboration-page" style={{ background: "#121212" }}>
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="section-title__title" style={{ color: "#ff1493" }}>
            Inspiring Strength Stories
          </h2>
          <p className="section-title__text" style={{ color: "#ddd" }}>
            Meet the powerlifters who embody strength, discipline, and determination under WPC Telangana. These athletes remind us that dedication builds champions.
          </p>
        </div>

        <div className="row">
          {stories.map((athlete) => (
            <div key={athlete.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
              <div className="inspire-card">
                <div className="inspire-card__img">
                  <img src={athlete.image} alt={athlete.name} />
                  <div className="inspire-card__overlay"></div>
                </div>
                <div className="inspire-card__content text-center">
                  <h3 className="inspire-card__name">{athlete.name}</h3>
                  <p className="inspire-card__role">{athlete.role}</p>
                  <p className="inspire-card__quote">{athlete.quote}</p>
                  <p className="inspire-card__id">ID: {athlete.id}</p>
                  <Link to={`/inspire-details/${athlete.id}`} className="inspire-card__btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .inspire-card {
          background: #1e1e1e;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .inspire-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.7);
        }
        .inspire-card__img {
          position: relative;
        }
        .inspire-card__img img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
        }
        .inspire-card__overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.4);
        }
        .inspire-card__content {
          padding: 20px;
          color: #fff;
        }
        .inspire-card__name {
          font-size: 20px;
          color: #ff1493;
          margin-bottom: 5px;
        }
        .inspire-card__role {
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
        }
        .inspire-card__quote {
          color: #ccc;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .inspire-card__id {
          font-weight: bold;
          color: #fff;
          margin-bottom: 15px;
        }
        .inspire-card__btn {
          display: inline-block;
          padding: 8px 15px;
          background: #ff1493;
          color: #fff;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.3s;
        }
        .inspire-card__btn:hover {
          background: #e0137a;
        }
      `}</style>
    </section>
  );
};

export default InspireMain;
