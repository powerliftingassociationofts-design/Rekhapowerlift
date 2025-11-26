import React from "react";
import { Link } from "react-router-dom";
import "./ResultsList.css";

const resultsCategories = [
  "AF FITNESS STUDIO",
  "DISTRICT COMBINED RESULTS",
  "FITNESS SECRET",
  "Gym point",
  "NATIONAL SELECTED PLAYERS",
  "Origin Fitness",
  "Ozzie FITNESS CENTER",
  "Pottens FITNESS",
  "SD Fitness",
  "STATE SELECTED PLAYERS LIST",
];

const ResultsList = () => {
  return (
    <section className="results-section py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-8xl font-extrabold text-pink-600 mb-18 tracking-wide">
          🏆 Powerlifting Results
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {resultsCategories.map((category, index) => (
            <Link key={index} to={`/results/${encodeURIComponent(category)}`}>
              <div className="result-card text-center cursor-pointer">
                <h3 className="result-card-title">{category}</h3>
                <div className="result-card-underline"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsList;
