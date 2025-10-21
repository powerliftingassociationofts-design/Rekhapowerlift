import React from "react";
import { FaUserTie, FaCertificate } from "react-icons/fa";

const RefereesMain = () => {
  const referees = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "International Referee",
      description:
        "One of Telangana’s most respected officials, Rajesh Kumar has officiated at multiple WPC International Championships and is known for his discipline and fairness.",
      image:
       "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Anjali Reddy",
      role: "National Referee",
      description:
        "A dedicated powerlifting judge from Hyderabad, Anjali has represented Telangana in WPC Nationals and contributes to referee training programs across the region.",
      image:
        "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "State Referee",
      description:
        "Based in Warangal, Vikram has been part of the Telangana State Powerlifting Committee and frequently judges district-level competitions.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      name: "Deepika Rao",
      role: "Technical Official",
      description:
        "Specializing in competition logistics, Deepika ensures fair play, equipment verification, and technical accuracy at all WPC Telangana meets.",
      image:  "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="referee-page py-5">
      <div className="container">
        {/* Page Title */}
        <div className="section-title text-center mb-5">
          <h2 className="section-title__title">🏋️‍♂️ WPC Telangana Referee Panel</h2>
          <p className="section-title__text">
            Our referees uphold the highest standards of fairness and technical precision. They represent the integrity and spirit of WPC Telangana at state, national, and international platforms.
          </p>
        </div>

        {/* Referee Cards */}
        <div className="row">
          {referees.map((ref) => (
            <div
              key={ref.id}
              className="col-xl-3 col-lg-4 col-md-6 mb-4 wow fadeInUp"
              data-wow-delay={`${ref.id * 150}ms`}
            >
              <div className="referee-card">
                <div className="referee-card__image">
                  <img src={ref.image} alt={ref.name} />
                  <div className="referee-hover">
                    <FaUserTie className="hover-icon" />
                  </div>
                </div>
                <div className="referee-card__content">
                  <h3>{ref.name}</h3>
                  <p className="ref-role">
                    <FaCertificate /> {ref.role}
                  </p>
                  <p className="ref-desc">{ref.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        .referee-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .referee-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        }

        .referee-card__image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .referee-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .referee-card:hover img {
          transform: scale(1.08);
        }

        .referee-hover {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .referee-card:hover .referee-hover {
          opacity: 1;
        }

        .hover-icon {
          font-size: 2rem;
          color: #fff;
        }

        .referee-card__content {
          padding: 20px;
        }

        /* Referee name in dark pink */
        .referee-card__content h3 {
          font-size: 1.3rem;
          color: #ff1493;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .ref-role {
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .ref-desc {
          color: #555;
          font-size: 0.95rem;
        }

        /* Section title and description */
        .section-title__title {
          font-weight: 700;
          color: #ff1493;
          font-size: 2rem;
        }

        .section-title__text {
          color: #fff;
          font-weight: 700;
          max-width: 700px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  );
};

export default RefereesMain;
