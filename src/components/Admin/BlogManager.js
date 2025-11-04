import React, { useState, useEffect, useRef } from 'react';
import './BlogManager.css';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [blogImages, setBlogImages] = useState([]);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const fileInputRef = useRef(null);
  const blogImagesInputRef = useRef(null);
  const contentTextareaRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'General',
    tags: '',
    published: true
  });

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const savedBlogs = localStorage.getItem('wpc_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem('wpc_blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const blogData = {
      ...formData,
      blogImages: blogImages,
      id: editingBlog ? editingBlog.id : Date.now(),
      createdAt: editingBlog ? editingBlog.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'WPC Telangana Admin'
    };

    if (editingBlog) {
      // Update existing blog
      setBlogs(prev => prev.map(blog => 
        blog.id === editingBlog.id ? blogData : blog
      ));
    } else {
      // Add new blog
      setBlogs(prev => [blogData, ...prev]);
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      category: 'General',
      tags: '',
      published: true
    });
    setBlogImages([]);
    setShowImageGallery(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (blogImagesInputRef.current) {
      blogImagesInputRef.current.value = '';
    }
    setEditingBlog(null);
    setShowEditor(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      featuredImage: blog.featuredImage,
      category: blog.category,
      tags: blog.tags,
      published: blog.published
    });
    setBlogImages(blog.blogImages || []);
    setShowImageGallery(false);
    setShowEditor(true);
  };

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== blogId));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      alert('Please select only image files.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB.');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          featuredImage: event.target.result
        }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBlogImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Check total image limit
    if (blogImages.length + files.length > 100) {
      alert(`Maximum 100 images allowed per blog. Current: ${blogImages.length}, Trying to add: ${files.length}`);
      return;
    }

    setUploading(true);

    try {
      const newImages = await Promise.all(
        files.map((file, index) => {
          return new Promise((resolve, reject) => {
            // Validate file
            if (!file.type.startsWith('image/')) {
              reject(new Error(`${file.name} is not an image file`));
              return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
              reject(new Error(`${file.name} exceeds 5MB size limit`));
              return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
              resolve({
                id: Date.now() + index,
                name: file.name,
                url: event.target.result,
                size: file.size
              });
            };
            reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
            reader.readAsDataURL(file);
          });
        })
      );

      setBlogImages(prev => [...prev, ...newImages]);
    } catch (error) {
      alert(`Error uploading images: ${error.message}`);
    } finally {
      setUploading(false);
      if (blogImagesInputRef.current) {
        blogImagesInputRef.current.value = '';
      }
    }
  };

  const removeBlogImage = (imageId) => {
    setBlogImages(prev => prev.filter(img => img.id !== imageId));
  };

  const insertImageIntoContent = (imageUrl) => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const textBefore = formData.content.substring(0, cursorPosition);
    const textAfter = formData.content.substring(cursorPosition);
    
    const imageMarkdown = `\n![Image](${imageUrl})\n`;
    const newContent = textBefore + imageMarkdown + textAfter;
    
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));

    // Set cursor position after the inserted image
    setTimeout(() => {
      const newPosition = cursorPosition + imageMarkdown.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 10);
  };

  const categories = ['General', 'Competition', 'Training', 'News', 'Events', 'Athletes'];

  return (
    <div className="blog-manager">
      <div className="blog-manager-header">
        <h2>
          <i className="fa fa-file-text"></i>
          Blog Management
        </h2>
        <button 
          className="add-blog-btn"
          onClick={() => {
            setShowEditor(true);
            setEditingBlog(null);
            setFormData({
              title: '',
              content: '',
              excerpt: '',
              featuredImage: '',
              category: 'General',
              tags: '',
              published: true
            });
            setBlogImages([]);
            setShowImageGallery(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            if (blogImagesInputRef.current) {
              blogImagesInputRef.current.value = '';
            }
          }}
        >
          <i className="fa fa-plus"></i>
          Add New Blog
        </button>
      </div>

      {showEditor && (
        <div className="blog-editor">
          <div className="editor-header">
            <h3>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
            <button 
              className="close-editor-btn"
              onClick={() => setShowEditor(false)}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Blog Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description (shown in blog list)"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content *</label>
              <div className="content-editor-container">
                <div className="content-toolbar">
                  <button 
                    type="button"
                    className="toolbar-btn"
                    onClick={() => setShowImageGallery(!showImageGallery)}
                  >
                    <i className="fa fa-image"></i>
                    Images ({blogImages.length}/100)
                  </button>
                  <small className="content-help">
                    Tip: You can insert images from the gallery below into your content
                  </small>
                </div>
                <textarea
                  ref={contentTextareaRef}
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog content here... You can insert images using the gallery below."
                  rows="12"
                  required
                />
              </div>
            </div>

            {/* Blog Images Gallery */}
            {showImageGallery && (
              <div className="blog-images-section">
                <div className="blog-images-header">
                  <h4>
                    <i className="fa fa-images"></i>
                    Blog Images ({blogImages.length}/100)
                  </h4>
                  <div className="blog-images-actions">
                    <input
                      ref={blogImagesInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBlogImagesUpload}
                      style={{ display: 'none' }}
                    />
                    <button 
                      type="button"
                      className="upload-images-btn"
                      onClick={() => blogImagesInputRef.current?.click()}
                      disabled={blogImages.length >= 100}
                    >
                      <i className="fa fa-plus"></i>
                      Add Images
                    </button>
                  </div>
                </div>

                {blogImages.length === 0 ? (
                  <div className="no-blog-images">
                    <i className="fa fa-image fa-3x"></i>
                    <p>No images uploaded yet</p>
                    <small>Upload images to insert them into your blog content</small>
                  </div>
                ) : (
                  <div className="blog-images-grid">
                    {blogImages.map(image => (
                      <div key={image.id} className="blog-image-item">
                        <div className="blog-image-preview">
                          <img src={image.url} alt={image.name} />
                          <div className="blog-image-overlay">
                            <button
                              type="button"
                              className="insert-image-btn"
                              onClick={() => insertImageIntoContent(image.url)}
                              title="Insert into content"
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                            <button
                              type="button"
                              className="delete-image-btn"
                              onClick={() => removeBlogImage(image.id)}
                              title="Delete image"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <div className="blog-image-info">
                          <span className="image-name" title={image.name}>
                            {image.name.length > 20 ? image.name.substring(0, 20) + '...' : image.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="featuredImage">Featured Image</label>
                <div className="image-upload-container">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  
                  {!formData.featuredImage ? (
                    <div 
                      className="image-upload-placeholder"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <div className="uploading-indicator">
                          <i className="fa fa-spinner fa-spin"></i>
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        <div className="upload-prompt">
                          <i className="fa fa-cloud-upload fa-2x"></i>
                          <p>Click to upload image</p>
                          <small>Max 5MB, JPG/PNG/GIF</small>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="image-preview-container">
                      <img src={formData.featuredImage} alt="Preview" className="image-preview" />
                      <div className="image-actions">
                        <button 
                          type="button"
                          className="change-image-btn"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <i className="fa fa-edit"></i>
                          Change
                        </button>
                        <button 
                          type="button"
                          className="remove-image-btn"
                          onClick={removeImage}
                        >
                          <i className="fa fa-trash"></i>
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="powerlifting, competition, training (comma separated)"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Publish immediately
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                <i className="fa fa-save"></i>
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blog-list">
        <h3>Existing Blogs ({blogs.length})</h3>
        
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <i className="fa fa-file-text-o"></i>
            <p>No blogs created yet. Click "Add New Blog" to get started!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-card">
                {blog.featuredImage && (
                  <div className="blog-card-image">
                    <img src={blog.featuredImage} alt={blog.title} />
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="category">{blog.category}</span>
                    <span className={`status ${blog.published ? 'published' : 'draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h4>{blog.title}</h4>
                  <p>{blog.excerpt || blog.content.substring(0, 100) + '...'}</p>
                  <div className="blog-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(blog)}
                    >
                      <i className="fa fa-edit"></i>
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <i className="fa fa-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;