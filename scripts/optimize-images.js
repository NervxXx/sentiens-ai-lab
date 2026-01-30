import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputLogo = path.join(__dirname, '..', 'src', 'assets', 'logo.png');
const outputDir = path.join(__dirname, '..', 'src', 'assets');

// Create different sizes for different use cases
const sizes = [
  { name: 'logo-40', width: 40, height: 40 },    // Header logo
  { name: 'logo-48', width: 48, height: 48 },    // Footer logo
  { name: 'logo-80', width: 80, height: 80 },    // Mobile menu
  { name: 'logo-120', width: 120, height: 120 }, // High DPI displays
];

// Quality settings for different formats
const qualitySettings = {
  webp: 85,
  avif: 80,
  png: 90
};

async function optimizeImages() {
  console.log('🔍 Optimizing logo images...\n');
  
  try {
    // Check if input file exists
    await fs.access(inputLogo);
    console.log('✅ Found source logo:', path.basename(inputLogo));
    
    // Create optimized versions
    for (const size of sizes) {
      console.log(`\n🖼️  Creating ${size.name} (${size.width}x${size.height})...`);
      
      // PNG version
      const pngOutput = path.join(outputDir, `${size.name}.png`);
      await sharp(inputLogo)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: qualitySettings.png, compressionLevel: 9 })
        .toFile(pngOutput);
      
      const pngStats = await fs.stat(pngOutput);
      console.log(`  📦 PNG: ${(pngStats.size / 1024).toFixed(1)} KB`);
      
      // WebP version
      const webpOutput = path.join(outputDir, `${size.name}.webp`);
      await sharp(inputLogo)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: qualitySettings.webp, effort: 6 })
        .toFile(webpOutput);
      
      const webpStats = await fs.stat(webpOutput);
      console.log(`  🌐 WebP: ${(webpStats.size / 1024).toFixed(1)} KB (${Math.round((1 - webpStats.size / pngStats.size) * 100)}% smaller)`);
      
      // AVIF version (if supported)
      try {
        const avifOutput = path.join(outputDir, `${size.name}.avif`);
        await sharp(inputLogo)
          .resize(size.width, size.height, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .avif({ quality: qualitySettings.avif, effort: 6 })
          .toFile(avifOutput);
        
        const avifStats = await fs.stat(avifOutput);
        console.log(`  🔵 AVIF: ${(avifStats.size / 1024).toFixed(1)} KB (${Math.round((1 - avifStats.size / pngStats.size) * 100)}% smaller)`);
      } catch (avifError) {
        console.log('  ⚠️  AVIF not supported on this system');
      }
    }
    
    console.log('\n✅ Image optimization complete!');
    console.log('\n📊 Summary:');
    console.log('- Created multiple sizes for different use cases');
    console.log('- Generated WebP versions (modern browsers)');
    console.log('- Generated AVIF versions (cutting-edge browsers)');
    console.log('- Maintained PNG fallback for compatibility');
    console.log('- Applied optimal compression settings');
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error.message);
    process.exit(1);
  }
}

// Run the optimization
optimizeImages();
