import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from '../../components/Layout/Footer';
import BackToTop from '../../components/elements/BackToTop';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import Header from "../../components/Layout/Header";
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import S3Image from '../../components/Common/S3Image';

import "./results.css";

const bannerbg = `/images/resources/schedule-one-1-6.jpg`;
const navImg1 = `/images/resources/logo-1.png`;


// Helper function to get S3 keys for images
// All images now served from AWS S3 bucket
function getS3Images(folderPath, count) {
  const images = [];
  for (let i = 1; i <= count; i++) {
    images.push(`results/${folderPath}/${i}.png`);
  }
  return images;
}

const resultsData = {
  "AF FITNESS STUDIO": getPublicImages("AF FITNESS STUDIO", 5),
  "DISTRICT COMBINED RESULTS": getPublicImages("DISTRICT COMBINED RESULTS", 8),
  "FITNESS SECRET": getPublicImages("FITNESS SECRET", 7),
  "Gym point": getPublicImages("Gym point", 6),
  "NATIONAL SELECTED PLAYERS": getPublicImages("NATIONAL SELECTED PLAYERS", 35),
  "Origin Fitness": getPublicImages("Origin Fitness", 6),
  "Ozzie FITNESS CENTER": getPublicImages("Ozzie FITNESS CENTER", 6),
  "Pottens FITNESS": getPublicImages("Pottens FITNESS", 5),
  "SD Fitness": getPublicImages("SD Fitness", 4),
  "STATE SELECTED PLAYERS LIST": getPublicImages("STATE SELECTED PLAYERS LIST", 6),
};

const resultDescriptions = {
  "AF FITNESS STUDIO": "AF Fitness Studio athletes showcased exceptional strength and discipline.",
  "DISTRICT COMBINED RESULTS": "District-level champions who performed outstandingly across categories.",
  "FITNESS SECRET": "Team Fitness Secret continues to inspire with powerful performances.",
  "Gym point": "Gym Point members delivered strong results with great competitive spirit.",
  "NATIONAL SELECTED PLAYERS": "Athletes who qualified for National championship level.",
  "Origin Fitness": "Origin Fitness participants demonstrated superior conditioning and performance.",
  "Ozzie FITNESS CENTER": "Ozzie Fitness Center athletes displayed remarkable discipline.",
  "Pottens FITNESS": "Pottens Fitness continues developing rising champions.",
  "SD Fitness": "SD Fitness has shown continuous progress with strong results.",
  "STATE SELECTED PLAYERS LIST": "Athletes selected to represent the state in competitions."
};

const ResultsMain = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const images = resultsData[decodedCategory] || [];
  const description = resultDescriptions[decodedCategory] || "";

  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => setIsVisible(window.scrollY > 300);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ LIGHTBOX / FULLSCREEN VIEWER STATE
  const [currentIndex, setCurrentIndex] = useState(null);

  const openViewer = (index) => setCurrentIndex(index);
  const closeViewer = () => setCurrentIndex(null);

  const showNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const showPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // ✅ Swipe Support
  let startX = 0;
  const onTouchStart = (e) => (startX = e.touches[0].clientX);
  const onTouchMove = (e) => {
    if (!startX) return;
    let endX = e.touches[0].clientX;
    if (startX - endX > 50) showNext();
    if (endX - startX > 50) showPrev();
  };

  return (
    <React.Fragment>

      <Header navImg={navImg1} parentMenu="Results" activeMenu="/results" />

      <SiteBreadcrumb pageTitle="Results" pageName="Results" breadcrumbsImg={bannerbg} />

      <div className="container mx-auto px-4 py-16">
        <Link to="/results" className="inline-block mb-8 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-all">
          ← Back to Results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-extrabold text-pink-600 mb-6">{decodedCategory}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
          </div>

          <div className="center-image-grid">
            {images.map((src, index) => (
              <div key={index} className="image-card" onClick={() => openViewer(index)}>
                <img 
                  src={src} 
                  alt={`${decodedCategory} result ${index + 1}`}
                  onError={(e) => {
                    console.error(`Failed to load image: ${src}`);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log(`✓ Loaded: ${src}`)}
                />
              </div>
            ))}
          </div>
        </div>

        <CtaTwo />
        <BackToTop scroll={isVisible} />
        <Footer />
      </div>

      {/* ✅ Fullscreen Image Viewer */}
      {currentIndex !== null && (
        <div className="viewer-overlay" onClick={closeViewer} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
          <span className="viewer-close" onClick={closeViewer}>×</span>
          <span className="viewer-prev" onClick={(e) => { e.stopPropagation(); showPrev(); }}>‹</span>
          <img src={images[currentIndex]} alt="" className="viewer-image" />
          <span className="viewer-next" onClick={(e) => { e.stopPropagation(); showNext(); }}>›</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default ResultsMain;
