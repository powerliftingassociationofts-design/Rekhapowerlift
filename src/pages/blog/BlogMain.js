import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogMain.css';

const BlogMain = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'General', 'Competition', 'Training', 'News', 'Events', 'Athletes'];

  useEffect(() => {
    // Load blogs from localStorage
    const savedBlogs = localStorage.getItem('wpc_blogs');
    if (savedBlogs) {
      const allBlogs = JSON.parse(savedBlogs);
      // Only show published blogs
      const publishedBlogs = allBlogs.filter(blog => blog.published);
      setBlogs(publishedBlogs);
      setFilteredBlogs(publishedBlogs);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter blogs based on search term and category
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="blog-page">
        <div className="container">
          <div className="blog-loading">
            <i className="fa fa-spinner fa-spin fa-2x"></i>
            <p>Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <section className="blog-page">
        <div className="container">
          {/* Search and Filter Section */}
          <div className="blog-controls">
            <div className="search-container">
              <div className="search-box">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="filter-container">
              <label>Filter by Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="results-count">
              <span>{filteredBlogs.length} blog(s) found</span>
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="no-blogs-found">
              <i className="fa fa-search fa-3x"></i>
              <h3>No blogs found</h3>
              <p>
                {searchTerm || selectedCategory !== 'All'
                  ? 'Try adjusting your search criteria'
                  : 'No blogs have been published yet'}
              </p>
            </div>
          ) : (
            <div className="row">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${
                    index % 3 === 0 ? "Left" : index % 3 === 1 ? "Up" : "Right"
                  }`}
                  data-wow-delay={`${(index + 1) * 100}ms`}
                >
                  <div className="blog-one__single modern-blog-card">
                    {blog.featuredImage && (
                      <div className="blog-one__img">
                        <img src={blog.featuredImage} alt={blog.title} />
                        <div className="blog-one__hover">
                          <Link to={`/blog-details/${blog.id}`}>
                            <div className="blog-one__hover-icon-1">
                              <span className="blog-one__hover-icon-2"></span>
                            </div>
                          </Link>
                        </div>
                        <div className="blog-category-badge">
                          {blog.category}
                        </div>
                      </div>
                    )}
                    
                    <div className="blog-one__content">
                      <ul className="blog-one__meta list-unstyled">
                        <li>
                          <span className="icon-user"></span>
                          By {blog.author}
                        </li>
                        <li>
                          <span className="icon-calendar"></span>
                          {formatDate(blog.createdAt)}
                        </li>
                      </ul>
                      
                      <h3 className="blog-one__title">
                        <Link to={`/blog-details/${blog.id}`}>{blog.title}</Link>
                      </h3>
                      
                      <p className="blog-excerpt">
                        {truncateText(blog.excerpt || blog.content)}
                      </p>
                      
                      {blog.tags && (
                        <div className="blog-tags">
                          {blog.tags.split(',').slice(0, 3).map((tag, i) => (
                            <span key={i} className="tag">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="blog-one__btn-box-two">
                        <Link
                          to={`/blog-details/${blog.id}`}
                          className="blog-one__btn-2 thm-btn"
                        >
                          Read More
                          <span className="icon-arrow-right"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default BlogMain;
