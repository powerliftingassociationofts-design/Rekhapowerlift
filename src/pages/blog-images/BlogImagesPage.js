import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogImagesPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('wpc_blogs');
    if (savedBlogs && id) {
      const allBlogs = JSON.parse(savedBlogs);
      const currentBlog = allBlogs.find(b => b.id.toString() === id.toString());
      setBlog(currentBlog);
    }
    setLoading(false);
  }, [id]);

  const openLightbox = (image, index) => {
    setSelectedImage({ ...image, index });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!blog || !blog.blogImages) return;
    
    const currentIndex = selectedImage.index;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < blog.blogImages.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : blog.blogImages.length - 1;
    }
    
    setSelectedImage({ ...blog.blogImages[newIndex], index: newIndex });
  };

  if (loading) {
    return (
      <section className="blog-images-page" style={{ 
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
        padding: "60px 0"
      }}>
        <div className="container">
          <div className="text-center">
            <i className="fa fa-spinner fa-spin fa-3x" style={{ color: "#667eea" }}></i>
            <p style={{ marginTop: "20px", fontSize: "1.2rem", color: "#6c757d" }}>Loading images...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!blog || !blog.blogImages || blog.blogImages.length === 0) {
    return (
      <section className="blog-images-page" style={{ 
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
        padding: "60px 0"
      }}>
        <div className="container">
          <div className="text-center">
            <i className="fa fa-exclamation-triangle fa-3x" style={{ color: "#f5576c" }}></i>
            <h2 style={{ marginTop: "20px", color: "#333" }}>No Images Found</h2>
            <p style={{ color: "#6c757d", marginBottom: "30px" }}>This blog doesn't have any additional images.</p>
            <Link 
              to={`/blog-details/${id}`}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "12px 25px",
                borderRadius: "25px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1rem",
                display: "inline-block",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)"
              }}
            >
              <i className="fa fa-arrow-left" style={{ marginRight: "10px" }}></i>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <section className="blog-images-page" style={{ 
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
        padding: "60px 0"
      }}>
        <div className="container">
          {/* Header Section */}
          <div className="page-header text-center mb-5">
            <div className="breadcrumb-nav mb-4">
              <Link 
                to="/gallery" 
                style={{ 
                  color: "#667eea", 
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500"
                }}
              >
                Gallery
              </Link>
              <span style={{ margin: "0 10px", color: "#6c757d" }}>{'>'}</span>
              <Link 
                to={`/blog-details/${id}`} 
                style={{ 
                  color: "#667eea", 
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500"
                }}
              >
                {blog.title.length > 30 ? blog.title.substring(0, 30) + '...' : blog.title}
              </Link>
              <span style={{ margin: "0 10px", color: "#6c757d" }}>{'>'}</span>
              <span style={{ color: "#6c757d", fontSize: "1rem" }}>All Images</span>
            </div>
            
            <h1 style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "15px"
            }}>
              <i className="fa fa-images" style={{ marginRight: "15px", color: "#667eea" }}></i>
              Blog Gallery
            </h1>
            
            <p style={{ 
              color: "#6c757d", 
              fontSize: "1.2rem",
              marginBottom: "10px"
            }}>
              {blog.title}
            </p>
            
            <div className="gallery-stats" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "15px 25px",
              display: "inline-block",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255,255,255,0.2)"
            }}>
              <span style={{ 
                color: "#333", 
                fontWeight: "600",
                fontSize: "1rem"
              }}>
                <i className="fa fa-image" style={{ marginRight: "8px", color: "#667eea" }}></i>
                {blog.blogImages.length} Images
              </span>
              <span style={{ 
                color: "#6c757d", 
                marginLeft: "20px",
                fontSize: "0.9rem"
              }}>
                <i className="fa fa-calendar" style={{ marginRight: "6px" }}></i>
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Images Grid */}
          <div className="images-gallery-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
            marginBottom: "50px"
          }}>
            {blog.blogImages.map((image, index) => (
              <div 
                key={image.id || index} 
                className="gallery-image-item"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer"
                }}
                onClick={() => openLightbox(image, index)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 45px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="image-container" style={{ 
                  position: "relative",
                  paddingTop: "75%", // 4:3 aspect ratio
                  overflow: "hidden"
                }}>
                  <img 
                    src={image.url} 
                    alt={image.name || `Gallery image ${index + 1}`}
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                  />
                  
                  <div className="image-overlay" style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    background: "linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))",
                    opacity: "0",
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "2rem"
                  }}
                  onMouseOver={(e) => e.target.style.opacity = "1"}
                  onMouseOut={(e) => e.target.style.opacity = "0"}
                  >
                    <i className="fa fa-search-plus"></i>
                  </div>
                  
                  <div className="image-number" style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(79, 172, 254, 0.3)"
                  }}>
                    {index + 1}
                  </div>
                </div>
                
                {image.name && (
                  <div className="image-info" style={{
                    padding: "20px"
                  }}>
                    <h4 style={{
                      margin: "0",
                      color: "#333",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      lineHeight: "1.4"
                    }}>
                      {image.name}
                    </h4>
                    <p style={{
                      margin: "8px 0 0 0",
                      color: "#6c757d",
                      fontSize: "0.9rem"
                    }}>
                      <i className="fa fa-image" style={{ marginRight: "6px" }}></i>
                      Image {index + 1} of {blog.blogImages.length}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Section */}
          <div className="gallery-navigation text-center">
            <div className="nav-buttons">
              <Link 
                to={`/blog-details/${id}`}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  padding: "12px 25px",
                  borderRadius: "25px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  display: "inline-block",
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
                  marginRight: "15px"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.3)";
                }}
              >
                <i className="fa fa-arrow-left" style={{ marginRight: "10px" }}></i>
                Back to Blog
              </Link>
              
              <Link 
                to="/gallery"
                style={{
                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                  padding: "12px 25px",
                  borderRadius: "25px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  display: "inline-block",
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 20px rgba(79, 172, 254, 0.3)"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(79, 172, 254, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 6px 20px rgba(79, 172, 254, 0.3)";
                }}
              >
                <i className="fa fa-th" style={{ marginRight: "10px" }}></i>
                Gallery Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
            padding: "20px",
            boxSizing: "border-box"
          }}
          onClick={closeLightbox}
        >
          <div className="lightbox-content" style={{
            position: "relative",
            maxWidth: "90%",
            maxHeight: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url}
              alt={selectedImage.name || "Gallery image"}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "15px",
                boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
                objectFit: "contain"
              }}
            />
            
            {/* Navigation Arrows */}
            {blog.blogImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  style={{
                    position: "absolute",
                    left: "-60px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-50%) scale(1.1)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(-50%) scale(1)"}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                
                <button
                  onClick={() => navigateImage('next')}
                  style={{
                    position: "absolute",
                    right: "-60px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-50%) scale(1.1)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(-50%) scale(1)"}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </>
            )}
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 20px rgba(240, 147, 251, 0.3)"
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
              <i className="fa fa-times"></i>
            </button>
            
            {/* Image Info */}
            {selectedImage.name && (
              <div style={{
                position: "absolute",
                bottom: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)",
                backdropFilter: "blur(10px)",
                color: "#333",
                padding: "15px 25px",
                borderRadius: "25px",
                textAlign: "center",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                whiteSpace: "nowrap"
              }}>
                <strong>{selectedImage.name}</strong>
                <br />
                <span style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                  Image {selectedImage.index + 1} of {blog.blogImages.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BlogImagesPage;