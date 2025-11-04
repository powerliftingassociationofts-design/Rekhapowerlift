import React from "react";
import { FaMedal, FaDumbbell } from "react-icons/fa";

const ResultsMain = () => {
  const results = [
    {
      id: 1,
      category: "Men's 75kg",
      name: "Rohit Sharma",
      gym: "Iron Beast Gym",
      medal: "Gold",
      event: "Benchpress",
      image:
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      category: "Women's 63kg",
      name: "Priya Reddy",
      gym: "Phoenix Fitness",
      medal: "Silver",
      event: "Deadlift",
      image:
      "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      category: "Junior 67.5kg",
      name: "Arjun Kumar",
      gym: "Muscle Factory",
      medal: "Bronze",
      event: "Powerlifting",
      image:
       "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="results-page py-5">
      <div className="container">
        {/* Title Section */}
        <div className="section-title text-center mb-5">
          <h2 className="section-title__title">
            🏆 WPC-Telangana Open District Championship 2025
          </h2>
          <p className="section-title__text">
            Congratulations to all our outstanding athletes who showcased power,
            dedication, and sportsmanship. Here are the top results from the
            championship!
          </p>
        </div>

        {/* Results Grid */}
        <div className="row">
          {results.map((result) => (
            <div
              key={result.id}
              className="col-xl-4 col-lg-4 col-md-6 mb-4 wow fadeInUp"
              data-wow-delay={`${result.id * 150}ms`}
            >
              <div className="result-card">
                <div className="result-card__image">
                  <img src={result.image} alt={result.name} />
                  <div className={`medal-badge medal-${result.medal.toLowerCase()}`}>
                    <FaMedal /> {result.medal}
                  </div>
                </div>
                <div className="result-card__content">
                  <h3>{result.category}</h3>
                  <p>
                    <strong>Athlete:</strong> {result.name}
                  </p>
                  <p>
                    <strong>Gym:</strong> {result.gym}
                  </p>
                  <p>
                    <strong>Event:</strong> {result.event}
                  </p>
                  <FaDumbbell className="result-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        .result-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .result-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        }

        .result-card__image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .result-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .result-card:hover img {
          transform: scale(1.08);
        }

        .medal-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
          color: #fff;
          font-size: 0.9rem;
        }

        .medal-gold {
          background: linear-gradient(45deg, #FFD700, #E6B800);
        }
        .medal-silver {
          background: linear-gradient(45deg, #C0C0C0, #A9A9A9);
        }
        .medal-bronze {
          background: linear-gradient(45deg, #CD7F32, #A0522D);
        }

        .result-card__content {
          padding: 20px;
          text-align: center;
        }

        .result-card__content h3 {
          color: #ff1493; /* dark pink for category */
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .result-card__content p {
          margin: 5px 0;
          color: #555;
        }

        .result-icon {
          font-size: 1.5rem;
          color: #ff1493; /* dark pink for dumbbell icon */
          margin-top: 10px;
        }

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

export default ResultsMain;
