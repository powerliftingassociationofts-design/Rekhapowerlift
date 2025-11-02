import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/blogService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    metaDescription: '',
    eventDate: '',
    eventTime: '',
    location: '',
    category: 'General',
    tags: '',
    featured: false,
    published: true
  });

  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    loadBlogs();
    BlogService.initializeSampleData();
  }, []);

  const loadBlogs = () => {
    const allBlogs = BlogService.getAllBlogs();
    setBlogs(allBlogs);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: images.map(img => img.id),
        featuredImage: featuredImage
      };

      if (isEditing && currentBlog) {
        blogData.id = currentBlog.id;
      }

      BlogService.saveBlog(blogData);
      loadBlogs();
      resetForm();
      alert(isEditing ? 'Blog updated successfully!' : 'Blog created successfully!');
    } catch (error) {
      alert('Error saving blog: ' + error.message);
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      metaDescription: blog.metaDescription,
      eventDate: blog.eventDate,
      eventTime: blog.eventTime,
      location: blog.location,
      category: blog.category,
      tags: blog.tags.join(', '),
      featured: blog.featured,
      published: blog.published
    });
    setImages(BlogService.getBlogImages(blog.id));
    setFeaturedImage(blog.featuredImage || null);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      BlogService.deleteBlog(blogId);
      loadBlogs();
      alert('Blog deleted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      metaDescription: '',
      eventDate: '',
      eventTime: '',
      location: '',
      category: 'General',
      tags: '',
      featured: false,
      published: true
    });
    setCurrentBlog(null);
    setIsEditing(false);
    setShowForm(false);
    setImages([]);
    setFeaturedImage(null);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      for (const file of files) {
        const blogId = currentBlog?.id || 'temp_' + Date.now();
        const imageData = await BlogService.saveImage(file, blogId);
        setImages(prev => [...prev, imageData]);
      }
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDelete = (imageId) => {
    const blogId = currentBlog?.id || 'temp_' + Date.now();
    BlogService.deleteImage(blogId, imageId);
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleFeatureImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageData = await BlogService.saveFeatureImage(file);
      setFeaturedImage(imageData);
    } catch (error) {
      alert('Error uploading feature image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFeatureImageDelete = () => {
    setFeaturedImage(null);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...BlogService.getCategories()];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Blog Administration</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create New Blog
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="blog-form-modal">
            <div className="modal-header">
              <h2>{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Event Time</label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Brief description for SEO (160 characters max)"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="General">General</option>
                    <option value="Championship">Championship</option>
                    <option value="Training">Training</option>
                    <option value="News">News</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g., powerlifting, championship, training"
                  />
                </div>
              </div>

              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  Featured Blog
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                  />
                  Published
                </label>
              </div>

              {/* Feature Image Section */}
              <div className="feature-image-section">
                <h3>Feature Image</h3>
                <p className="feature-image-description">
                  This image will be displayed as the main image for the blog card and details page.
                </p>
                
                {!featuredImage ? (
                  <div className="feature-image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFeatureImageUpload}
                      disabled={isUploading}
                      id="feature-image-input"
                    />
                    <label htmlFor="feature-image-input" className="feature-image-upload-btn">
                      <i className="fas fa-cloud-upload-alt"></i>
                      {isUploading ? 'Uploading...' : 'Upload Feature Image'}
                    </label>
                  </div>
                ) : (
                  <div className="feature-image-preview">
                    <img src={featuredImage.data} alt="Feature" />
                    <div className="feature-image-overlay">
                      <button
                        type="button"
                        className="delete-feature-image-btn"
                        onClick={handleFeatureImageDelete}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <p className="feature-image-info">{featuredImage.name}</p>
                  </div>
                )}
              </div>

              {/* Image Upload Section */}
              <div className="image-upload-section">
                <h3>Images (Max 100, 5MB each)</h3>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading || images.length >= 100}
                />
                {isUploading && <p>Uploading images...</p>}
                
                <div className="image-gallery">
                  {images.map(image => (
                    <div key={image.id} className="image-item">
                      <img src={image.data} alt={image.name} />
                      <button
                        type="button"
                        className="delete-image-btn"
                        onClick={() => handleImageDelete(image.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog List */}
      <div className="blog-list-section">
        <div className="list-header">
          <h2>Manage Blogs</h2>
          <div className="filters">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="blog-table">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="blog-row">
              <div className="blog-thumbnail">
                {blog.featuredImage ? (
                  <img src={blog.featuredImage.data} alt={blog.title} />
                ) : (
                  <div className="placeholder-thumbnail">
                    <i className="fas fa-image"></i>
                  </div>
                )}
              </div>
              <div className="blog-info">
                <h3>{blog.title}</h3>
                <p className="blog-meta">
                  {blog.category} • {new Date(blog.eventDate).toLocaleDateString()} • {blog.location}
                </p>
                <p className="blog-description">
                  {blog.description.substring(0, 150)}...
                </p>
                <div className="blog-tags">
                  {blog.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="blog-status">
                  {blog.featured && <span className="status-badge featured">Featured</span>}
                  <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="blog-actions">
                <button 
                  className="btn btn-edit"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;