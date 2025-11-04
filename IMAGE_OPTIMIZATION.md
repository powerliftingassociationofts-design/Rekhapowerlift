# Image Optimization Tips for Vercel

## 1. Convert images to WebP for better compression
You can use online tools or imagemagick to convert:
- hero1.jpeg → hero1.webp
- main-slider-*.jpg → main-slider-*.webp

## 2. Implement lazy loading
Add loading="lazy" to images that are not immediately visible

## 3. Use responsive images
Consider different sizes for mobile/desktop:
- hero1-mobile.webp (smaller resolution)
- hero1-desktop.webp (full resolution)

## 4. Enable Vercel's automatic image optimization
Add this to your vercel.json:
```json
{
  "images": {
    "domains": [],
    "formats": ["image/webp"],
    "minimumCacheTTL": 60
  }
}
```

## 5. Consider using next/image if you migrate to Next.js
Next.js provides automatic image optimization