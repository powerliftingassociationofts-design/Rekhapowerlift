# Git LFS Setup and Deployment Guide

## ⚠️ IMPORTANT: This project uses Git LFS (Large File Storage) for images and PDFs

### Prerequisites
Before cloning or pulling this repository, ensure you have Git LFS installed:

```bash
# Install Git LFS (if not already installed)
git lfs install
```

### Cloning the Repository
When cloning for the first time:

```bash
# Clone with LFS support
git clone https://github.com/powerliftingassociationofts-design/Rekhapowerlift.git
cd Rekhapowerlift

# Ensure all LFS files are downloaded
git lfs pull
```

### Pulling Updates
When pulling updates to an existing repository:

```bash
# Pull latest changes
git pull origin main

# Pull latest LFS files
git lfs pull
```

### Verifying LFS Files
To check if all LFS files are properly downloaded:

```bash
# Check LFS status
git lfs status

# List all LFS files
git lfs ls-files

# Verify specific images exist
ls -la src/assets/images/slider/hero1.jpeg
ls -la src/assets/images/resources/main-slider-*.jpg
ls -la public/images/shapes/main-slider-*.png
```

### Deployment to Vercel

1. **Connect Repository to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Vercel automatically supports Git LFS

2. **Build Settings:**
   - Framework: Create React App (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables (if needed):**
   - No special environment variables required for images

### Troubleshooting

#### Images Not Loading Locally
```bash
# Reinstall LFS hooks
git lfs install --force

# Re-download all LFS files
git lfs fetch --all
git lfs checkout
```

#### Images Not Loading on Vercel
- Vercel automatically handles Git LFS files
- Check if files exist in build after deployment
- Verify file paths are correct in imports

#### File Size Issues
Current LFS files include:
- All images (*.jpg, *.jpeg, *.png)
- All PDFs (*.pdf)
- Video files (*.mp4, *.mov, *.avi, *.mkv)
- Archive files (*.zip)

### Git LFS File Tracking
Files tracked by LFS are configured in `.gitattributes`:
```
*.pdf filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.jpeg filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text
*.avi filter=lfs diff=lfs merge=lfs -text
*.mkv filter=lfs diff=lfs merge=lfs -text
```

### Quick Start
```bash
# 1. Clone with LFS
git clone https://github.com/powerliftingassociationofts-design/Rekhapowerlift.git
cd Rekhapowerlift

# 2. Download LFS files
git lfs pull

# 3. Install dependencies
npm install

# 4. Start development server
npm start

# 5. Build for production
npm run build
```

### Support
If you encounter issues with missing images:
1. Ensure Git LFS is installed (`git lfs version`)
2. Run `git lfs pull` to download all LFS files
3. Check `.gitattributes` to see what files should be in LFS
4. Contact the repository maintainer if issues persist