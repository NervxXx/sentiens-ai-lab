import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizePublicImages() {
  console.log('🔍 Optimizing public images...\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Optimize favicon
  try {
    const faviconPath = path.join(publicDir, 'favicon.png');
    const faviconStats = await fs.stat(faviconPath);
    console.log(`🖼️  Original favicon: ${(faviconStats.size / 1024).toFixed(1)} KB`);
    
    // Create optimized favicon (32x32)
    const optimizedFavicon = path.join(publicDir, 'favicon-32.png');
    await sharp(faviconPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(optimizedFavicon);
    
    const optimizedStats = await fs.stat(optimizedFavicon);
    console.log(`✅ Optimized favicon: ${(optimizedStats.size / 1024).toFixed(1)} KB (${Math.round((1 - optimizedStats.size / faviconStats.size) * 100)}% smaller)`);
    
    // Also create WebP version
    const faviconWebp = path.join(publicDir, 'favicon-32.webp');
    await sharp(faviconPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(faviconWebp);
    
    const webpStats = await fs.stat(faviconWebp);
    console.log(`🌐 Favicon WebP: ${(webpStats.size / 1024).toFixed(1)} KB (${Math.round((1 - webpStats.size / faviconStats.size) * 100)}% smaller)`);
    
  } catch (error) {
    console.error('❌ Error optimizing favicon:', error.message);
  }
  
  // Check preview image
  try {
    const previewPath = path.join(publicDir, 'my-preview.png');
    const previewStats = await fs.stat(previewPath);
    console.log(`\n🖼️  Preview image: ${(previewStats.size / 1024).toFixed(1)} KB`);
    
    if (previewStats.size > 100 * 1024) { // If larger than 100KB
      console.log('⚠️  Preview image is quite large. Consider optimizing or resizing.');
      
      // Create compressed version
      const compressedPreview = path.join(publicDir, 'my-preview-compressed.jpg');
      await sharp(previewPath)
        .resize(800, null, { // Resize to 800px width, maintain aspect ratio
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(compressedPreview);
      
      const compressedStats = await fs.stat(compressedPreview);
      console.log(`✅ Compressed preview: ${(compressedStats.size / 1024).toFixed(1)} KB (${Math.round((1 - compressedStats.size / previewStats.size) * 100)}% smaller)`);
    }
    
  } catch (error) {
    console.error('❌ Error processing preview image:', error.message);
  }
  
  console.log('\n✅ Public image optimization complete!');
}

optimizePublicImages();