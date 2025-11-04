import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const BlogDetailsMain = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('wpc_blogs');
    if (savedBlogs && id) {
      const allBlogs = JSON.parse(savedBlogs);
      const currentBlog = allBlogs.find(b => b.id.toString() === id.toString());

      if (currentBlog) {
        setBlog(currentBlog);

        const related = allBlogs
          .filter(b => b.category === currentBlog.category && b.id !== currentBlog.id && b.published)
          .slice(0, 3);

        setRelatedBlogs(related);
      }
    }
    setLoading(false);
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="blog-details">
        <div className="container">
          <div className="blog-loading">
            <i className="fa fa-spinner fa-spin fa-2x"></i>
            <p>Loading blog...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="blog-details">
        <div className="container">
          <div className="blog-not-found">
            <i className="fa fa-exclamation-triangle fa-3x"></i>
            <h2>Blog Not Found</h2>
            <p>The blog you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="back-to-blog-btn">
              <i className="fa fa-arrow-left"></i>
              Back to Blogs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <section className="blog-details" style={{ 
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        padding: "60px 0"
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="blog-details__main" style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "25px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "40px"
              }}>
                
                {/* Header Section */}
                <div className="blog-header mb-4">
                  <div className="blog-meta" style={{ marginBottom: "20px" }}>
                    <span style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      marginRight: "15px"
                    }}>
                      {blog.category}
                    </span>
                    <span style={{ color: "#6c757d", fontSize: "1rem", marginRight: "20px" }}>
                      <i className="fa fa-user" style={{ marginRight: "8px" }}></i>
                      {blog.author}
                    </span>
                    <span style={{ color: "#6c757d", fontSize: "1rem" }}>
                      <i className="fa fa-calendar" style={{ marginRight: "8px" }}></i>
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                  
                  <h1 style={{ 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    marginBottom: "20px",
                    lineHeight: "1.2"
                  }}>
                    {blog.title}
                  </h1>
                  
                  {blog.excerpt && (
                    <p style={{ 
                      color: "#6c757d", 
                      fontSize: "1.2rem",
                      lineHeight: "1.6",
                      marginBottom: "30px",
                      fontStyle: "italic"
                    }}>
                      {blog.excerpt}
                    </p>
                  )}
                </div>

                {/* Main Content Layout */}
                <div className="row align-items-start">
                  {/* Left Side - Featured Image */}
                  <div className="col-lg-5 col-md-12 mb-4 mb-lg-0">
                    {blog.featuredImage && (
                      <div className="featured-image-container" style={{ 
                        position: "relative",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)"
                      }}>
                        <img 
                          src={blog.featuredImage} 
                          alt={blog.title} 
                          style={{ 
                            width: "100%", 
                            height: "400px",
                            objectFit: "cover",
                            transition: "transform 0.3s ease"
                          }}
                          onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
                          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                        />
                        <div className="image-badge" style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                          color: "white",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          boxShadow: "0 4px 15px rgba(79, 172, 254, 0.3)"
                        }}>
                          <i className="fa fa-star" style={{ marginRight: "6px" }}></i>
                          Featured
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Side - Content */}
                  <div className="col-lg-7 col-md-12">
                    <div className="blog-content-area">
                      <div className="blog-text" style={{ 
                        fontSize: "1.1rem",
                        lineHeight: "1.8",
                        color: "#333",
                        marginBottom: "30px"
                      }}>
                        {blog.content.split('\n').map((paragraph, index) => {
                          if (paragraph.trim()) {
                            // Check if the paragraph contains markdown image syntax
                            const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
                            const imageMatch = imageRegex.exec(paragraph);
                            
                            if (imageMatch) {
                              // Skip inline images in content, we'll show them in gallery
                              return null;
                            } else {
                              // Regular paragraph
                              return (
                                <p key={index} style={{ marginBottom: "20px" }}>
                                  {paragraph}
                                </p>
                              );
                            }
                          }
                          return null;
                        })}
                      </div>

                      {/* Blog Images Gallery - Show only 2 initially */}
                      {blog.blogImages && blog.blogImages.length > 0 && (
                        <div className="blog-images-preview" style={{ marginTop: "40px" }}>
                          <h3 style={{ 
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontSize: "1.6rem",
                            fontWeight: "600",
                            marginBottom: "25px"
                          }}>
                            <i className="fa fa-images" style={{ marginRight: "12px", color: "#667eea" }}></i>
                            Gallery ({blog.blogImages.length} images)
                          </h3>
                          
                          <div className="images-grid" style={{
                            display: "grid",
                            gridTemplateColumns: blog.blogImages.length === 1 ? "1fr" : "1fr 1fr",
                            gap: "20px",
                            marginBottom: "25px"
                          }}>
                            {blog.blogImages.slice(0, 2).map((image, imgIndex) => (
                              <div key={image.id || imgIndex} className="preview-image" style={{
                                position: "relative",
                                height: "200px",
                                borderRadius: "15px",
                                overflow: "hidden",
                                cursor: "pointer",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.3s ease"
                              }}>
                                <img 
                                  src={image.url} 
                                  alt={image.name || `Image ${imgIndex + 1}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.3s ease"
                                  }}
                                  onMouseOver={(e) => {
                                    e.target.style.transform = "scale(1.05)";
                                    e.target.parentElement.style.transform = "translateY(-5px)";
                                    e.target.parentElement.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.15)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.target.style.transform = "scale(1)";
                                    e.target.parentElement.style.transform = "translateY(0)";
                                    e.target.parentElement.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
                                  }}
                                  onClick={() => {
                                    // Create lightbox for image
                                    const overlay = document.createElement('div');
                                    overlay.style.cssText = `
                                      position: fixed;
                                      top: 0;
                                      left: 0;
                                      width: 100%;
                                      height: 100%;
                                      background: rgba(0,0,0,0.95);
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                      z-index: 9999;
                                      cursor: pointer;
                                      padding: 20px;
                                      box-sizing: border-box;
                                    `;
                                    
                                    const img = document.createElement('img');
                                    img.src = image.url;
                                    img.style.cssText = `
                                      max-width: 90%;
                                      max-height: 90%;
                                      border-radius: 15px;
                                      box-shadow: 0 25px 80px rgba(0,0,0,0.5);
                                      object-fit: contain;
                                    `;
                                    
                                    const closeBtn = document.createElement('div');
                                    closeBtn.innerHTML = '&times;';
                                    closeBtn.style.cssText = `
                                      position: absolute;
                                      top: 30px;
                                      right: 40px;
                                      color: white;
                                      font-size: 50px;
                                      font-weight: bold;
                                      cursor: pointer;
                                      z-index: 10000;
                                      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                                    `;
                                    
                                    overlay.appendChild(img);
                                    overlay.appendChild(closeBtn);
                                    document.body.appendChild(overlay);
                                    
                                    const closeModal = () => document.body.removeChild(overlay);
                                    overlay.onclick = (e) => e.target === overlay && closeModal();
                                    closeBtn.onclick = closeModal;
                                  }}
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
                                  fontSize: "1.5rem"
                                }}
                                onMouseOver={(e) => e.target.style.opacity = "1"}
                                onMouseOut={(e) => e.target.style.opacity = "0"}
                                >
                                  <i className="fa fa-search-plus"></i>
                                </div>
                                
                                {image.name && (
                                  <div className="image-caption" style={{
                                    position: "absolute",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                                    color: "white",
                                    padding: "20px 15px 15px",
                                    fontSize: "0.9rem",
                                    fontWeight: "500"
                                  }}>
                                    {image.name.length > 25 ? image.name.substring(0, 25) + '...' : image.name}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {blog.blogImages.length > 2 && (
                            <div className="gallery-toggle text-center">
                              <Link
                                to={`/blog-images/${blog.id}`}
                                style={{
                                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                  color: "white",
                                  border: "none",
                                  padding: "12px 30px",
                                  borderRadius: "25px",
                                  fontSize: "1rem",
                                  fontWeight: "600",
                                  textDecoration: "none",
                                  display: "inline-block",
                                  transition: "all 0.3s ease",
                                  boxShadow: "0 6px 20px rgba(79, 172, 254, 0.3)"
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.transform = "translateY(-3px)";
                                  e.target.style.boxShadow = "0 8px 25px rgba(79, 172, 254, 0.4)";
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.transform = "translateY(0)";
                                  e.target.style.boxShadow = "0 6px 20px rgba(79, 172, 254, 0.3)";
                                }}
                              >
                                <i className="fa fa-images" style={{ marginRight: "8px" }}></i>
                                View All {blog.blogImages.length} Images
                              </Link>
                            </div>
                          )}
                        </div>
                      )}

                      {blog.tags && (
                        <div className="blog-tags" style={{ marginTop: "40px" }}>
                          <h4 style={{ 
                            color: "#333",
                            marginBottom: "15px",
                            fontSize: "1.2rem",
                            fontWeight: "600"
                          }}>
                            <i className="fa fa-tags" style={{ marginRight: "8px", color: "#667eea" }}></i>
                            Tags:
                          </h4>
                          <div className="tag-list">
                            {blog.tags.split(',').map((tag, index) => (
                              <span key={index} style={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                padding: "6px 16px",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                fontWeight: "500",
                                marginRight: "10px",
                                marginBottom: "10px",
                                display: "inline-block",
                                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.2)"
                              }}>
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="blog-navigation" style={{ 
                  marginTop: "50px",
                  paddingTop: "30px",
                  borderTop: "2px solid rgba(255,255,255,0.3)"
                }}>
                  <Link 
                    to="/gallery" 
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
                    Back to Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Blogs Section */}
          {relatedBlogs.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="related-blogs-section" style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "25px",
                  padding: "40px",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}>
                  <h3 style={{ 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "2rem",
                    fontWeight: "600",
                    marginBottom: "30px",
                    textAlign: "center"
                  }}>
                    <i className="fa fa-newspaper-o" style={{ marginRight: "12px", color: "#667eea" }}></i>
                    Related Blog Posts
                  </h3>
                  
                  <div className="row">
                    {relatedBlogs.map(relatedBlog => (
                      <div key={relatedBlog.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="related-blog-card" style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,249,250,0.8) 100%)",
                          borderRadius: "15px",
                          overflow: "hidden",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                          transition: "all 0.3s ease",
                          border: "1px solid rgba(255,255,255,0.3)",
                          height: "100%"
                        }}>
                          {relatedBlog.featuredImage && (
                            <div className="related-blog-img" style={{ height: "180px", overflow: "hidden" }}>
                              <img 
                                src={relatedBlog.featuredImage} 
                                alt={relatedBlog.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  transition: "transform 0.3s ease"
                                }}
                                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                              />
                            </div>
                          )}
                          <div className="related-blog-content" style={{ padding: "20px" }}>
                            <span style={{ 
                              color: "#6c757d", 
                              fontSize: "0.9rem",
                              marginBottom: "10px",
                              display: "block"
                            }}>
                              <i className="fa fa-calendar" style={{ marginRight: "6px" }}></i>
                              {formatDate(relatedBlog.createdAt)}
                            </span>
                            <h4 style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              lineHeight: "1.4",
                              marginBottom: "15px"
                            }}>
                              <Link 
                                to={`/blog-details/${relatedBlog.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#333",
                                  transition: "color 0.3s ease"
                                }}
                                onMouseOver={(e) => e.target.style.color = "#667eea"}
                                onMouseOut={(e) => e.target.style.color = "#333"}
                              >
                                {relatedBlog.title}
                              </Link>
                            </h4>
                            <Link 
                              to={`/blog-details/${relatedBlog.id}`}
                              style={{
                                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                color: "white",
                                padding: "8px 16px",
                                borderRadius: "20px",
                                textDecoration: "none",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                display: "inline-block",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 15px rgba(79, 172, 254, 0.2)"
                              }}
                              onMouseOver={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 20px rgba(79, 172, 254, 0.3)";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 15px rgba(79, 172, 254, 0.2)";
                              }}
                            >
                              Read More <i className="fa fa-arrow-right" style={{ marginLeft: "6px" }}></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default BlogDetailsMain;