// Blog Data Management Service
const BLOG_STORAGE_KEY = 'powerlifting_blogs';
const BLOG_IMAGES_KEY = 'powerlifting_blog_images';

export class BlogService {
  // Get all blogs
  static getAllBlogs() {
    try {
      const blogs = localStorage.getItem(BLOG_STORAGE_KEY);
      return blogs ? JSON.parse(blogs) : [];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  }

  // Get blog by ID
  static getBlogById(id) {
    const blogs = this.getAllBlogs();
    return blogs.find(blog => blog.id === id);
  }

  // Save blog
  static saveBlog(blogData) {
    try {
      const blogs = this.getAllBlogs();
      const newBlog = {
        id: blogData.id || Date.now().toString(),
        title: blogData.title,
        description: blogData.description,
        metaDescription: blogData.metaDescription || blogData.description.substring(0, 160),
        eventDate: blogData.eventDate,
        eventTime: blogData.eventTime,
        location: blogData.location,
        author: blogData.author || 'Admin',
        createdAt: blogData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        published: blogData.published !== undefined ? blogData.published : true,
        images: blogData.images || [],
        featuredImage: blogData.featuredImage || null,
        tags: blogData.tags || [],
        category: blogData.category || 'General',
        featured: blogData.featured || false,
        slug: blogData.slug || this.generateSlug(blogData.title)
      };

      const existingIndex = blogs.findIndex(blog => blog.id === newBlog.id);
      if (existingIndex >= 0) {
        blogs[existingIndex] = newBlog;
      } else {
        blogs.push(newBlog);
      }

      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
      return newBlog;
    } catch (error) {
      console.error('Error saving blog:', error);
      throw error;
    }
  }

  // Delete blog
  static deleteBlog(id) {
    try {
      const blogs = this.getAllBlogs();
      const filteredBlogs = blogs.filter(blog => blog.id !== id);
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(filteredBlogs));
      
      // Also remove associated images
      this.deleteBlogImages(id);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }

  // Search blogs
  static searchBlogs(searchTerm) {
    const blogs = this.getAllBlogs();
    const term = searchTerm.toLowerCase();
    
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(term) ||
      blog.description.toLowerCase().includes(term) ||
      blog.location.toLowerCase().includes(term) ||
      blog.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  // Filter blogs
  static filterBlogs(filters) {
    let blogs = this.getAllBlogs();

    if (filters.category && filters.category !== 'all') {
      blogs = blogs.filter(blog => blog.category === filters.category);
    }

    if (filters.featured) {
      blogs = blogs.filter(blog => blog.featured);
    }

    if (filters.published !== undefined) {
      blogs = blogs.filter(blog => blog.published === filters.published);
    }

    if (filters.dateFrom) {
      blogs = blogs.filter(blog => new Date(blog.eventDate) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      blogs = blogs.filter(blog => new Date(blog.eventDate) <= new Date(filters.dateTo));
    }

    return blogs;
  }

  // Get categories
  static getCategories() {
    const blogs = this.getAllBlogs();
    const categories = new Set(blogs.map(blog => blog.category));
    return Array.from(categories);
  }

  // Get tags
  static getTags() {
    const blogs = this.getAllBlogs();
    const allTags = blogs.flatMap(blog => blog.tags);
    const uniqueTags = new Set(allTags);
    return Array.from(uniqueTags);
  }

  // Generate slug from title
  static generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  // Image management
  static saveImage(file, blogId) {
    return new Promise((resolve, reject) => {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('Image size must be less than 5MB'));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('File must be an image'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imageData = {
            id: Date.now().toString(),
            blogId: blogId,
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result,
            uploadedAt: new Date().toISOString()
          };

          const images = this.getBlogImages(blogId);
          
          // Check image limit (100 images per blog)
          if (images.length >= 100) {
            reject(new Error('Maximum 100 images allowed per blog'));
            return;
          }

          images.push(imageData);
          this.saveBlogImages(blogId, images);
          resolve(imageData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  // Get blog images
  static getBlogImages(blogId) {
    try {
      const allImages = localStorage.getItem(BLOG_IMAGES_KEY);
      const imagesData = allImages ? JSON.parse(allImages) : {};
      return imagesData[blogId] || [];
    } catch (error) {
      console.error('Error fetching blog images:', error);
      return [];
    }
  }

  // Save blog images
  static saveBlogImages(blogId, images) {
    try {
      const allImages = localStorage.getItem(BLOG_IMAGES_KEY);
      const imagesData = allImages ? JSON.parse(allImages) : {};
      imagesData[blogId] = images;
      localStorage.setItem(BLOG_IMAGES_KEY, JSON.stringify(imagesData));
    } catch (error) {
      console.error('Error saving blog images:', error);
      throw error;
    }
  }

  // Delete blog images
  static deleteBlogImages(blogId) {
    try {
      const allImages = localStorage.getItem(BLOG_IMAGES_KEY);
      const imagesData = allImages ? JSON.parse(allImages) : {};
      delete imagesData[blogId];
      localStorage.setItem(BLOG_IMAGES_KEY, JSON.stringify(imagesData));
    } catch (error) {
      console.error('Error deleting blog images:', error);
    }
  }

  // Delete single image
  static deleteImage(blogId, imageId) {
    try {
      const images = this.getBlogImages(blogId);
      const filteredImages = images.filter(img => img.id !== imageId);
      this.saveBlogImages(blogId, filteredImages);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  // Save feature image
  static saveFeatureImage(file) {
    return new Promise((resolve, reject) => {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('Feature image size must be less than 5MB'));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('File must be an image'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imageData = {
            id: Date.now().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result,
            uploadedAt: new Date().toISOString()
          };
          resolve(imageData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  }

  // Initialize with sample data if empty
  static initializeSampleData() {
    const blogs = this.getAllBlogs();
    if (blogs.length === 0) {
      const sampleBlogs = [
        {
          id: '1',
          title: 'WPC Telangana State Championship 2024',
          description: 'Join us for the most prestigious powerlifting event in Telangana. Athletes from across the state will compete for the championship title in various weight categories. This event showcases the strength and determination of our powerlifting community.',
          metaDescription: 'WPC Telangana State Championship 2024 - Premier powerlifting competition featuring athletes from across the state competing in various categories.',
          eventDate: '2024-12-15',
          eventTime: '09:00',
          location: 'Gachibowli Indoor Stadium, Hyderabad',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          published: true,
          images: [],
          featuredImage: null,
          tags: ['championship', 'powerlifting', 'telangana', 'competition'],
          category: 'Championship',
          featured: true,
          slug: 'wpc-telangana-state-championship-2024'
        },
        {
          id: '2',
          title: 'Powerlifting Training Workshop',
          description: 'Learn proper powerlifting techniques from certified coaches. This comprehensive workshop covers squat, bench press, and deadlift fundamentals, safety protocols, and training methodologies for beginners and intermediate lifters.',
          metaDescription: 'Professional powerlifting training workshop covering fundamental techniques, safety, and training methods for all levels.',
          eventDate: '2024-11-20',
          eventTime: '10:00',
          location: 'Iron Paradise Gym, Madhapur',
          author: 'Coach Ramesh',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          published: true,
          images: [],
          featuredImage: null,
          tags: ['training', 'workshop', 'technique', 'coaching'],
          category: 'Training',
          featured: false,
          slug: 'powerlifting-training-workshop'
        }
      ];

      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(sampleBlogs));
    }
  }
}

export default BlogService;