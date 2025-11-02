import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogService } from '../../services/blogService';
import './BlogDetails.css';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const loadBlog = () => {
      setIsLoading(true);
      const allBlogs = BlogService.getAllBlogs();
      const foundBlog = allBlogs.find(b => b.slug === slug);
      
      if (!foundBlog) {
        setIsLoading(false);
        return;
      }

      setBlog(foundBlog);
      setImages(BlogService.getBlogImages(foundBlog.id));
      
      // Load related blogs (same category, excluding current blog)
      const related = allBlogs
        .filter(b => b.category === foundBlog.category && b.id !== foundBlog.id && b.published)
        .slice(0, 3);
      setRelatedBlogs(related);
      
      setIsLoading(false);
    };

    loadBlog();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const shareOnSocialMedia = (platform) => {
    const url = window.location.href;
    const title = blog.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };

    window.open(shareUrls[platform], '_blank');
  };

  if (isLoading) {
    return (
      <div className="blog-details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading blog details...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-details-container">
        <div className="blog-not-found">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Blog Not Found</h2>
          <p>The blog you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="back-to-blogs-btn">
            <i className="fas fa-arrow-left"></i>
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const descriptionLength = blog.description.length;
  const showMoreThreshold = 500;
  const shouldShowMore = descriptionLength > showMoreThreshold;

  return (
    <div className="blog-details-container">
      {/* Back Navigation */}
      <div className="breadcrumb">
        <Link to="/blog" className="breadcrumb-link">
          <i className="fas fa-arrow-left"></i>
          Back to Blogs
        </Link>
        <span className="breadcrumb-separator">•</span>
        <span className="breadcrumb-current">{blog.category}</span>
      </div>

      {/* Blog Header */}
      <header 
        className="blog-header"
        style={{
          backgroundImage: blog.featuredImage 
            ? `url(${blog.featuredImage.data})` 
            : images.length > 0 
              ? `url(${images[0].data})` 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="blog-header-content">
          <div className="blog-meta">
            <span className="blog-category">{blog.category}</span>
            {blog.featured && <span className="featured-badge">Featured</span>}
          </div>
          
          <h1 className="blog-title">{blog.title}</h1>
          
          <div className="blog-author-info">
            <div className="author-details">
              <i className="fas fa-user"></i>
              <span>By {blog.author}</span>
            </div>
            <div className="publish-date">
              <i className="fas fa-calendar-alt"></i>
              <span>Published on {formatDate(blog.createdAt)}</span>
            </div>
          </div>

          {/* Event Information */}
          <div className="event-info-card">
            <h3><i className="fas fa-calendar-check"></i> Event Details</h3>
            <div className="event-details">
              <div className="event-detail">
                <i className="fas fa-calendar-alt"></i>
                <div>
                  <strong>Date:</strong>
                  <span>{formatDate(blog.eventDate)}</span>
                </div>
              </div>
              {blog.eventTime && (
                <div className="event-detail">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Time:</strong>
                    <span>{formatTime(blog.eventTime)}</span>
                  </div>
                </div>
              )}
              <div className="event-detail">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Location:</strong>
                  <span>{blog.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="blog-content">
        <div className="blog-main">
          {/* Featured Image */}
          {(blog.featuredImage || images.length > 0) && (
            <div className="featured-image">
              <img 
                src={blog.featuredImage ? blog.featuredImage.data : images[0].data} 
                alt={blog.title}
                onClick={() => openImageModal(0)}
              />
              <div className="image-overlay">
                <button onClick={() => openImageModal(0)}>
                  <i className="fas fa-expand"></i>
                  View Full Size
                </button>
              </div>
            </div>
          )}

          {/* Blog Description */}
          <div className="blog-description">
            <div className={`description-content ${showFullDescription ? 'expanded' : ''}`}>
              {shouldShowMore && !showFullDescription ? (
                <>
                  {blog.description.substring(0, showMoreThreshold)}...
                </>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: blog.description.replace(/\n/g, '<br>') }} />
              )}
            </div>
            
            {shouldShowMore && (
              <button 
                className="show-more-btn"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <>
                    <i className="fas fa-chevron-up"></i>
                    Show Less
                  </>
                ) : (
                  <>
                    <i className="fas fa-chevron-down"></i>
                    Show More
                  </>
                )}
              </button>
            )}
          </div>

          {/* Image Gallery */}
          {images.length > 1 && (
            <div className="image-gallery">
              <h3><i className="fas fa-images"></i> Event Gallery ({images.length} images)</h3>
              <div className="gallery-grid">
                {images.map((image, index) => (
                  <div key={image.id} className="gallery-item">
                    <img 
                      src={image.data} 
                      alt={`${blog.title} - ${index + 1}`}
                      onClick={() => openImageModal(index)}
                    />
                    <div className="gallery-overlay">
                      <button onClick={() => openImageModal(index)}>
                        <i className="fas fa-search-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="blog-tags-section">
              <h3>Tags</h3>
              <div className="blog-tags">
                {blog.tags.map(tag => (
                  <span key={tag} className="blog-tag">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="share-section">
            <h3>Share This Event</h3>
            <div className="share-buttons">
              <button onClick={() => shareOnSocialMedia('facebook')} className="share-btn facebook">
                <i className="fab fa-facebook-f"></i>
                Facebook
              </button>
              <button onClick={() => shareOnSocialMedia('twitter')} className="share-btn twitter">
                <i className="fab fa-twitter"></i>
                Twitter
              </button>
              <button onClick={() => shareOnSocialMedia('linkedin')} className="share-btn linkedin">
                <i className="fab fa-linkedin-in"></i>
                LinkedIn
              </button>
              <button onClick={() => shareOnSocialMedia('whatsapp')} className="share-btn whatsapp">
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="related-blogs">
              <h3>Related Events</h3>
              <div className="related-blogs-list">
                {relatedBlogs.map(relatedBlog => (
                  <div key={relatedBlog.id} className="related-blog-item">
                    <Link to={`/blog/${relatedBlog.slug}`}>
                      <h4>{relatedBlog.title}</h4>
                      <div className="related-blog-meta">
                        <span><i className="fas fa-calendar-alt"></i> {formatDate(relatedBlog.eventDate)}</span>
                        <span><i className="fas fa-map-marker-alt"></i> {relatedBlog.location}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Info */}
          <div className="quick-info">
            <h3>Quick Info</h3>
            <div className="info-items">
              <div className="info-item">
                <i className="fas fa-folder"></i>
                <span>Category: {blog.category}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-images"></i>
                <span>Images: {images.length}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-tags"></i>
                <span>Tags: {blog.tags.length}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-edit"></i>
                <span>Last Updated: {formatDate(blog.updatedAt)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && images.length > 0 && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImageModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-image-container">
              <img 
                src={images[currentImageIndex].data} 
                alt={`${blog.title} - ${currentImageIndex + 1}`}
              />
            </div>

            {images.length > 1 && (
              <>
                <button className="modal-nav prev" onClick={prevImage}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="modal-nav next" onClick={nextImage}>
                  <i className="fas fa-chevron-right"></i>
                </button>
                
                <div className="modal-counter">
                  {currentImageIndex + 1} of {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;