import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogService } from '../../services/blogService';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    const filterBlogs = () => {
      let filtered = blogs;

      if (searchTerm) {
        filtered = BlogService.searchBlogs(searchTerm).filter(blog => blog.published);
      }

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(blog => blog.category === selectedCategory);
      }

      setFilteredBlogs(filtered);
      setCurrentPage(1);
    };

    filterBlogs();
  }, [blogs, searchTerm, selectedCategory]);

  const loadBlogs = () => {
    setIsLoading(true);
    BlogService.initializeSampleData();
    const allBlogs = BlogService.getAllBlogs()
      .filter(blog => blog.published)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBlogs(allBlogs);
    setIsLoading(false);
  };

  const categories = ['all', ...BlogService.getCategories()];
  
  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="blog-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      {/* Header Section */}
      <div className="blog-header">
        <div className="blog-header-content">
          <h1>Powerlifting News & Events</h1>
          <p>Stay updated with the latest powerlifting events, training tips, and championship news from WPC Telangana.</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="blog-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search blogs, events, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="search-icon fas fa-search"></i>
        </div>

        <div className="filter-section">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>
          Showing {currentBlogs.length} of {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Blog Grid */}
      {currentBlogs.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <h3>No blogs found</h3>
          <p>Try adjusting your search criteria or browse all categories.</p>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="blog-grid">
          {currentBlogs.map(blog => {
            // Use featured image if available, otherwise use first image from gallery
            const featuredImage = blog.featuredImage ? blog.featuredImage.data : null;
            const galleryImages = BlogService.getBlogImages(blog.id);
            const displayImage = featuredImage || (galleryImages.length > 0 ? galleryImages[0].data : null);

            return (
              <article key={blog.id} className="blog-card">
                <div className="blog-card-image">
                  {displayImage ? (
                    <img src={displayImage} alt={blog.title} />
                  ) : (
                    <div className="placeholder-image">
                      <i className="fas fa-dumbbell"></i>
                    </div>
                  )}
                  <div className="blog-card-overlay">
                    <Link to={`/blog/${blog.slug}`} className="read-more-btn">
                      Read More
                    </Link>
                  </div>
                  {blog.featured && <span className="featured-badge">Featured</span>}
                </div>

                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-category">{blog.category}</span>
                    <span className="blog-date">{formatDate(blog.eventDate)}</span>
                  </div>

                  <h2 className="blog-title">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <div className="blog-event-info">
                    <div className="event-detail">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{formatDate(blog.eventDate)}</span>
                    </div>
                    {blog.eventTime && (
                      <div className="event-detail">
                        <i className="fas fa-clock"></i>
                        <span>{blog.eventTime}</span>
                      </div>
                    )}
                    <div className="event-detail">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{blog.location}</span>
                    </div>
                  </div>

                  <p className="blog-description">
                    {truncateText(blog.metaDescription || blog.description, 120)}
                  </p>

                  <div className="blog-tags">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="blog-tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="blog-card-footer">
                    <div className="blog-author">
                      <i className="fas fa-user"></i>
                      <span>By {blog.author}</span>
                    </div>
                    <div className="blog-image-count">
                      {galleryImages.length > 0 && (
                        <>
                          <i className="fas fa-images"></i>
                          <span>{galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
            Previous
          </button>

          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;