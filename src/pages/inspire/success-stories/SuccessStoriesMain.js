import React, { useState } from "react";
import InteractiveBook from '../../../components/InteractiveBook/InteractiveBook';
import S3Image from '../../../components/Common/S3Image';

// S3 Keys for images - all images now served from AWS S3
const s3Keys = {
  inspireimg1: 'images/Inspire/Inspireimg1.jpg',
  inspireimg2: 'images/Inspire/Inspireimg2.jpg',
  inspireimg3: 'images/Inspire/Inspireimg3.jpg',
  inspireimg4: 'images/Inspire/Inspireimg4.jpg',
  inspireimg5: 'images/Inspire/Inspireimg5.jpg',
  inspireimg6: 'images/Inspire/Inspireimg6.jpg',
  inspireimg7: 'images/Inspire/Inspireimg7.jpg',
  inspireimg8: 'images/Inspire/Inspireimg8.jpg',
  inspireimg9: 'images/Inspire/Inspireimg9.jpg'
};

const SuccessStoriesMain = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showInteractiveBook, setShowInteractiveBook] = useState(false);


  const successStories = [
    {
      id: 1,
      name: "Surineni Diza",
      role: "National Powerlifter",
      category: "national",
      image: s3Keys.inspireimg1,
      achievement: "National Champion 2023",
      story: "Started his journey as a novice lifter in 2018. Through dedication and proper training under WPC Telangana, he achieved his dream of becoming a national champion. His deadlift record of 280kg stands as an inspiration for upcoming lifters.",
      quote: "WPC Telangana gave me the platform to prove my strength at the national level. The journey taught me that with proper guidance and unwavering determination, any goal is achievable.",
      medals: ["Gold - National Championship 2023", "Silver - State Championship 2022", "Bronze - Regional Championship 2021"],
      personalBest: { squat: "250kg", bench: "180kg", deadlift: "280kg" }
    },
    {
      id: 2,
      name: "Aashritha",
      role: "Women's Powerlifting Champion",
      category: "women",
      image: s3Keys.inspireimg2,
      achievement: "Women's State Record Holder",
      story: "Deepika broke barriers in women's powerlifting by becoming the first woman from Telangana to lift 200kg in deadlift. Her journey from a fitness enthusiast to a record holder is truly inspiring.",
      quote: "I started as a beginner at a local gym. Today, I proudly represent Telangana in national events thanks to WPC's support and guidance.",
      medals: ["Gold - Women's Championship 2023", "State Record - Deadlift 200kg", "Gold - Regional Women's Meet 2022"],
      personalBest: { squat: "150kg", bench: "100kg", deadlift: "200kg" }
    },
    {
      id: 3,
      name: "Tapasya",
      role: "Youth Category Gold Medalist",
      category: "youth",
      image: s3Keys.inspireimg3,
      achievement: "Youth National Champion",
      story: "At just 19 years old, Imran became the youngest powerlifter from Telangana to win a national championship. His discipline and training regimen serve as an example for young athletes.",
      quote: "WPC Telangana inspires every young athlete to stay consistent and confident. Hard work truly pays off here.",
      medals: ["Gold - Youth National Championship 2023", "Gold - Junior State Championship 2022"],
      personalBest: { squat: "200kg", bench: "140kg", deadlift: "240kg" }
    },
    {
      id: 4,
      name: "Deeti Manoj Kumar",
      role: "Coach & Mentor",
      category: "coach",
      image: s3Keys.inspireimg4,
      achievement: "Best Coach Award 2023",
      story: "Sneha transitioned from being a competitive lifter to one of the most respected coaches in WPC Telangana. She has trained over 50 athletes, with 15 of them achieving state-level recognition.",
      quote: "The goal is not just lifting weights, but lifting others with your story. WPC Telangana builds a strong, supportive community.",
      achievements: ["Best Coach Award 2023", "Trained 15 State Champions", "10+ Years Coaching Experience"],
      specialization: "Youth Development & Women's Training"
    },
    {
      id: 5,
      name: "Karan",
      role: "Senior Powerlifting Trainer",
      category: "coach",
      image: s3Keys.inspireimg5,
      achievement: "Lifetime Achievement Award",
      story: "With over 15 years of experience in powerlifting, Deepa has been instrumental in developing the powerlifting culture in Telangana. Her training methods have produced numerous champions.",
      quote: "Guiding young athletes under WPC Telangana has been an inspiring journey. Strength comes from unity and purpose.",
      achievements: ["Lifetime Achievement Award", "20+ State Champions Trained", "15+ Years Experience"],
      specialization: "Technical Training & Competition Preparation"
    },
    {
      id: 6,
      name: "Pranay",
      role: "State Powerlifting Champion",
      category: "state",
      image: s3Keys.inspireimg6,
      achievement: "Three-time State Champion",
      story: "Vikram's consistency in state championships is unmatched. He has won the state championship three consecutive times and is preparing for international competitions.",
      quote: "Joining WPC Telangana helped me transform my training and mindset. Now, I compete with confidence at state and national levels.",
      medals: ["Gold - State Championship 2023", "Gold - State Championship 2022", "Gold - State Championship 2021"],
      personalBest: { squat: "230kg", bench: "160kg", deadlift: "270kg" }
    },
    {
      id: 7,
      name: "Rishikesh Reddy",
      role: "Women's Fitness Ambassador",
      category: "women",
      image: s3Keys.inspireimg7,
      achievement: "Women's Empowerment Award",
      story: "Anjali has been actively promoting women's participation in powerlifting. Through her workshops and seminars, she has encouraged over 200 women to take up strength training.",
      quote: "Being part of WPC Telangana motivates women to take strength training seriously and empowers them to achieve their fitness goals.",
      impact: ["200+ Women Trained", "15 Workshops Conducted", "Women's Empowerment Award 2023"],
      personalBest: { squat: "140kg", bench: "90kg", deadlift: "180kg" }
    },
    {
      id: 8,
      name: "sai Teja Manthena",
      role: "Junior Gold Medalist",
      category: "youth",
      image: s3Keys.inspireimg8,
      achievement: "Junior National Record Holder",
      story: "Raghav set a new junior national record in bench press with a lift of 150kg at just 17 years old. His technique and dedication are exemplary for young lifters.",
      quote: "I learned that patience and perseverance are key. WPC Telangana coaches pushed me to my best and prepared me for national competitions.",
      medals: ["Junior National Record - Bench Press 150kg", "Gold - Junior Championship 2023"],
      personalBest: { squat: "180kg", bench: "150kg", deadlift: "220kg" }
    },
    {
      id: 9,
      name: "Thirupathi Rao",
      role: "Junior Gold Medalist",
      category: "youth",
      image: s3Keys.inspireimg9,
      achievement: "Junior National Record Holder",
      story: "Raghav set a new junior national record in bench press with a lift of 150kg at just 17 years old. His technique and dedication are exemplary for young lifters.",
      quote: "I learned that patience and perseverance are key. WPC Telangana coaches pushed me to my best and prepared me for national competitions.",
      medals: ["Junior National Record - Bench Press 150kg", "Gold - Junior Championship 2023"],
      personalBest: { squat: "180kg", bench: "150kg", deadlift: "220kg" }
    }
    

  ];

  const categories = [
    { key: 'all', label: 'All Stories' },
    // { key: 'national', label: 'National Champions' },
    // { key: 'state', label: 'State Champions' },
    // { key: 'women', label: 'Women Champions' },
    // { key: 'youth', label: 'Youth Champions' },
    // { key: 'coach', label: 'Coaches & Mentors' }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory);



  // Interactive Book Functions
  const openInteractiveBook = (storyOrId) => {
    let story = storyOrId;
    if (typeof storyOrId === 'number') {
      story = successStories.find(s => s.id === storyOrId);
    }
    if (story) {
      setSelectedStory(story);
      setShowInteractiveBook(true);
    }
  };

  const closeInteractiveBook = () => {
    setShowInteractiveBook(false);
    setSelectedStory(null);
  };





  return (
    <>
      <section className="success-stories-page" style={{ background: "linear-gradient(to right, #4A0AB4 0%, #46e8d0 100%)", minHeight: "100vh" }}>
        <div className="container">
          {/* Header Section */}
          <div className="section-title text-center mb-5">
            <h1 className="section-title__title" style={{ color: "#ff1493", fontSize: "3rem", fontWeight: "bold" }}>
              Success Stories Book
            </h1>
            <p className="section-title__text" style={{ color: "#ddd", fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto" }}>
              Click on any story card to open an interactive book with detailed athlete journeys
            </p>
          </div>

          {/* Category Filter */}
          <div className="category-filter text-center mb-5">
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.key}
                  className={`filter-btn ${selectedCategory === category.key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.key)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stories Grid */}
          <div className="row">
           
            {filteredStories.map((story) => (
              <div key={story.id} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                <div className="story-book-card" onClick={() => openInteractiveBook(story.id)}>
                  <div className="book-spine"></div>
                  <div className="book-cover">
                    <div className="cover-image">
                      <S3Image 
                        s3Key={story.image} 
                        alt={story.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div className="cover-overlay">
                        <div className="book-title">{story.name}</div>
                        <div className="book-subtitle">{story.role}</div>
                        <div className="cover-actions">
                          <div className="open-book-btn">
                            📖 Read Story
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Interactive Book Modal */}
      {showInteractiveBook && selectedStory && (
        <InteractiveBook 
          story={selectedStory}
          onClose={closeInteractiveBook}
        />
      )}

      <style>{`
        .success-stories-page {
          padding: 60px 0;
        }
        
        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }
        
        .filter-btn {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.1);
          color: #ff1493;
          border: 2px solid #ff1493;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
          background: #ff1493;
          color: #fff;
          transform: translateY(-2px);
        }

        /* Book Card Styles */
        .story-book-card {
          perspective: 1000px;
          cursor: pointer;
          margin-bottom: 30px;
          height: 400px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .story-book-card:hover {
          transform: rotateY(-5deg) rotateX(2deg);
        }

        .book-spine {
          position: absolute;
          left: -10px;
          top: 0;
          width: 20px;
          height: 100%;
          background: linear-gradient(to bottom, #8B4513, #A0522D);
          border-radius: 5px 0 0 5px;
          box-shadow: -5px 0 10px rgba(0,0,0,0.3);
        }

        .book-cover {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
          border-radius: 0 10px 10px 0;
          box-shadow: 5px 5px 20px rgba(0,0,0,0.5);
          overflow: hidden;
          position: relative;
          border: 3px solid #ff1493;
        }

        .cover-image {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .cover-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cover-image img[src=""],
        .cover-image img:not([src]),
        .cover-image img[src*="undefined"] {
          display: none;
        }

        .cover-image img[src=""]::before,
        .cover-image img:not([src])::before,
        .cover-image img[src*="undefined"]::before {
          content: "Image Loading...";
          display: block;
          background: #f0f0f0;
          color: #666;
          text-align: center;
          padding: 50px;
        }

        .cover-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          padding: 20px;
          color: white;
          text-align: center;
        }

        .book-title {
          font-size: 18px;
          font-weight: bold;
          color: #f2f5f4 !important;
          margin-bottom: 8px;
        }

        .book-subtitle {
          font-size: 14px;
          color: #f2f5f4 !important;
          margin-bottom: 15px;
        }

        .open-book-btn {
          background: rgba(255, 20, 147, 0.8);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .story-book-card:hover .open-book-btn {
          background: #ff1493;
          transform: scale(1.1);
        }

        /* Book Modal Styles */
        .book-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .book-container {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }

        .close-book-btn {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ff1493;
          color: white;
          border: none;
          font-size: 18px;
          cursor: pointer;
          z-index: 1001;
          transition: all 0.3s ease;
        }

        .close-book-btn:hover {
          background: #e0137a;
          transform: scale(1.1);
        }

        .open-book {
          display: flex;
          width: 800px;
          height: 600px;
          background: #f8f8f8;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          overflow: hidden;
          position: relative;
        }

        .book-left-page {
          flex: 1;
          padding: 40px;
          background: linear-gradient(to right, #ffffff, #f9f9f9);
          border-right: 2px solid #e0e0e0;
          transition: transform 0.6s ease;
          transform-origin: right center;
        }

        .book-left-page.flipping {
          transform: rotateY(-180deg);
        }

        .book-right-page {
          flex: 1;
          padding: 40px;
          background: linear-gradient(to left, #ffffff, #f9f9f9);
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .book-page {
          height: 100%;
          overflow-y: auto;
          color: #333;
        }

        .page-header h1 {
          color: #ff1493;
          font-size: 2.5rem;
          margin-bottom: 10px;
          text-align: center;
        }

        .page-subtitle {
          color: #46e8d0;
          font-size: 1.2rem;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .page-image {
          text-align: center;
          margin: 30px 0;
        }

        .page-image img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #ff1493;
          box-shadow: 0 10px 20px rgba(255, 20, 147, 0.3);
        }

        .achievement-section {
          background: rgba(255, 20, 147, 0.1);
          padding: 20px;
          border-radius: 10px;
          border-left: 5px solid #ff1493;
          margin: 20px 0;
        }

        .achievement-section h3 {
          color: #ff1493;
          margin-bottom: 10px;
        }

        .achievement-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .story-content {
          line-height: 1.8;
          font-size: 1rem;
          margin: 20px 0;
          text-align: justify;
        }

        .page-quote {
          background: rgba(70, 232, 208, 0.1);
          border-left: 5px solid #46e8d0;
          padding: 20px;
          margin: 25px 0;
          font-style: italic;
          position: relative;
          border-radius: 0 10px 10px 0;
        }

        .quote-mark {
          font-size: 3rem;
          color: #46e8d0;
          font-weight: bold;
        }

        .stats-section {
          margin: 30px 0;
        }

        .stats-section h3 {
          color: #ff1493;
          margin-bottom: 15px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .stat-item {
          text-align: center;
          background: rgba(255, 20, 147, 0.05);
          padding: 15px;
          border-radius: 10px;
          border: 2px solid rgba(255, 20, 147, 0.2);
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 5px;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff1493;
        }

        .medals-section,
        .achievements-section {
          margin: 25px 0;
        }

        .medals-section h3,
        .achievements-section h3 {
          color: #ff1493;
          margin-bottom: 15px;
        }

        .medals-list,
        .achievements-list {
          list-style: none;
          padding: 0;
        }

        .medal-item,
        .achievement-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          padding: 10px;
          background: rgba(255, 20, 147, 0.05);
          border-radius: 8px;
        }

        .medal-icon,
        .achievement-icon {
          margin-right: 10px;
          font-size: 1.2rem;
        }

        .specialization-section {
          background: rgba(70, 232, 208, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
        }

        .specialization-section h3 {
          color: #46e8d0;
          margin-bottom: 10px;
        }

        .inspiration-footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #ff1493;
        }

        .join-btn {
          display: inline-block;
          padding: 12px 25px;
          background: #ff1493;
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          margin-top: 10px;
          transition: all 0.3s ease;
        }

        .join-btn:hover {
          background: #e0137a;
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }

        .page-number {
          color: #666;
          font-size: 0.9rem;
        }

        .book-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding: 0 20px;
        }

        .nav-btn {
          padding: 10px 20px;
          background: #ff1493;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-btn:hover:not(:disabled) {
          background: #e0137a;
          transform: translateY(-2px);
        }

        .nav-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .page-indicator {
          display: flex;
          gap: 10px;
        }

        .page-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ccc;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .page-dot.active {
          background: #ff1493;
          transform: scale(1.2);
        }

        /* PDF Functionality Styles */
        .cover-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .pdf-link {
          background: rgba(70, 232, 208, 0.8);
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 11px;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .pdf-link:hover {
          background: #46e8d0;
          transform: scale(1.05);
          color: white;
          text-decoration: none;
        }

        .pdf-actions {
          background: rgba(70, 232, 208, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: center;
        }

        .pdf-actions h4 {
          color: #46e8d0;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .pdf-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .pdf-btn {
          padding: 10px 20px;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .view-btn {
          background: #46e8d0;
          color: white;
        }

        .view-btn:hover {
          background: #3bc4b8;
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }

        .download-btn {
          background: #ff1493;
          color: white;
        }

        .download-btn:hover {
          background: #e0137a;
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }

        .footer-divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, transparent, #ff1493, transparent);
          margin: 20px 0;
        }

        /* PDF Viewer Styles */
        .pdf-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
          backdrop-filter: blur(5px);
        }

        .pdf-viewer-container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          max-width: 90vw;
          max-height: 90vh;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .pdf-viewer-header {
          background: linear-gradient(45deg, #ff1493, #46e8d0);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pdf-viewer-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .close-pdf-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-pdf-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .pdf-viewer-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: #f5f5f5;
          min-height: 400px;
        }

        .pdf-loading, .pdf-error {
          text-align: center;
          color: #666;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ff1493;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .pdf-viewer-controls {
          background: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #e0e0e0;
        }

        .pdf-nav-btn {
          background: #ff1493;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .pdf-nav-btn:hover:not(:disabled) {
          background: #e0137a;
          transform: translateY(-2px);
        }

        .pdf-nav-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .pdf-page-info {
          font-weight: 600;
          color: #333;
          font-size: 16px;
        }

        /* PDF Modal Styles */
        .pdf-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
          backdrop-filter: blur(8px);
        }

        .pdf-book-container {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
        }

        .close-pdf-btn {
          position: absolute;
          top: -25px;
          right: -25px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ff1493;
          color: white;
          border: none;
          font-size: 20px;
          cursor: pointer;
          z-index: 1002;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(255, 20, 147, 0.4);
        }

        .close-pdf-btn:hover {
          background: #e0137a;
          transform: scale(1.1) rotate(90deg);
        }

        .pdf-book {
          display: flex;
          width: 900px;
          height: 650px;
          background: #f8f8f8;
          border-radius: 15px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          overflow: hidden;
          position: relative;
          perspective: 1000px;
        }

        .pdf-left-page {
          flex: 1;
          padding: 40px;
          background: linear-gradient(to right, #ffffff, #fdfdfd);
          border-right: 3px solid #ddd;
          position: relative;
          overflow-y: auto;
        }

        .pdf-right-page {
          width: 100px;
          background: linear-gradient(to left, #f0f0f0, #e8e8e8);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 20px 10px;
          position: relative;
        }

        .pdf-binding {
          position: absolute;
          left: 0;
          top: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(to bottom, #8B4513, #A0522D, #8B4513);
          box-shadow: inset -2px 0 5px rgba(0,0,0,0.3);
        }

        .pdf-page-content {
          height: 100%;
          color: #333;
          font-family: 'Georgia', serif;
          line-height: 1.6;
        }

        .pdf-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #ff1493;
          padding-bottom: 20px;
        }

        .pdf-header h1 {
          color: #ff1493;
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .pdf-subtitle {
          color: #46e8d0;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .pdf-page-number {
          background: rgba(255, 20, 147, 0.1);
          color: #ff1493;
          padding: 5px 15px;
          border-radius: 15px;
          font-size: 0.9rem;
          display: inline-block;
        }

        .pdf-image-section {
          text-align: center;
          margin: 25px 0;
        }

        .pdf-image-section img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #ff1493;
          box-shadow: 0 10px 25px rgba(255, 20, 147, 0.3);
        }

        .achievement-highlight {
          background: rgba(255, 20, 147, 0.1);
          padding: 15px;
          border-radius: 10px;
          border-left: 5px solid #ff1493;
          font-weight: 600;
          font-size: 1.1rem;
          margin: 15px 0;
        }

        .pdf-quote {
          background: rgba(70, 232, 208, 0.1);
          border-left: 5px solid #46e8d0;
          padding: 20px;
          margin: 25px 0;
          font-style: italic;
          position: relative;
          border-radius: 0 10px 10px 0;
        }

        .quote-icon {
          font-size: 2rem;
          color: #46e8d0;
          font-weight: bold;
        }

        .pdf-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 25px 0;
        }

        .pdf-stat-card {
          background: rgba(255, 20, 147, 0.05);
          padding: 20px;
          border-radius: 15px;
          text-align: center;
          border: 2px solid rgba(255, 20, 147, 0.2);
          transition: transform 0.3s ease;
        }

        .pdf-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(255, 20, 147, 0.2);
        }

        .pdf-stat-card h3 {
          color: #ff1493;
          margin-bottom: 10px;
          font-size: 1rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .pdf-medals-list,
        .pdf-achievements-list {
          list-style: none;
          padding: 0;
          margin: 20px 0;
        }

        .pdf-medal-item,
        .pdf-achievement-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          padding: 12px;
          background: rgba(255, 20, 147, 0.05);
          border-radius: 8px;
          border-left: 4px solid #ff1493;
        }

        .medal-emoji,
        .achievement-emoji {
          margin-right: 12px;
          font-size: 1.3rem;
        }

        .legacy-text {
          font-size: 1.1rem;
          line-height: 1.8;
          margin: 20px 0;
          text-align: justify;
        }

        .join-section {
          background: rgba(70, 232, 208, 0.1);
          padding: 25px;
          border-radius: 15px;
          text-align: center;
          margin: 25px 0;
        }

        .pdf-join-btn {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(45deg, #ff1493, #46e8d0);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          margin-top: 15px;
        }

        .pdf-join-btn:hover {
          background: linear-gradient(45deg, #46e8d0, #ff1493);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 20, 147, 0.3);
          color: white;
          text-decoration: none;
        }

        .pdf-footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #ff1493;
          color: #666;
          font-size: 0.9rem;
        }

        .pdf-page-info {
          text-align: center;
          color: #666;
          font-size: 0.85rem;
        }

        .pdf-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
          padding: 0 20px;
        }

        .pdf-nav-btn {
          padding: 12px 25px;
          background: #ff1493;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .pdf-nav-btn:hover:not(:disabled) {
          background: #e0137a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 20, 147, 0.4);
        }

        .pdf-nav-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .pdf-page-indicator {
          display: flex;
          gap: 12px;
        }

        .pdf-page-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ccc;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pdf-page-dot.active {
          background: #ff1493;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(255, 20, 147, 0.5);
        }

        .pdf-page-dot:hover {
          background: #ff1493;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .pdf-book {
            width: 90vw;
            height: 80vh;
            flex-direction: column;
          }

          .pdf-left-page {
            border-right: none;
            border-bottom: 3px solid #ddd;
            padding: 20px;
            flex: 1;
          }

          .pdf-right-page {
            height: 80px;
            width: 100%;
            flex-direction: row;
            padding: 10px 20px;
          }

          .pdf-navigation {
            flex-direction: column;
            gap: 15px;
          }

          .pdf-header h1 {
            font-size: 2rem;
          }

          .pdf-subtitle {
            font-size: 1.1rem;
          }

          .pdf-stats-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .pdf-nav-btn {
            padding: 10px 20px;
            font-size: 0.8rem;
          }

          .close-pdf-btn {
            top: -15px;
            right: -15px;
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .pdf-image-section img {
            width: 150px;
            height: 150px;
          }
        }
          .open-book {
            width: 95vw;
            height: 70vh;
            flex-direction: column;
          }
          
          .book-left-page,
          .book-right-page {
            flex: none;
            height: 90%;
            padding: 20px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .filter-btn {
            width: 200px;
          }

          .pdf-viewer-container {
            max-width: 95vw;
            max-height: 95vh;
          }

          .pdf-viewer-header h2 {
            font-size: 1.2rem;
          }

          .pdf-viewer-content {
            padding: 10px;
          }

          .pdf-viewer-controls {
            flex-direction: column;
            gap: 10px;
          }

          .pdf-nav-btn {
            padding: 8px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
};

export default SuccessStoriesMain;