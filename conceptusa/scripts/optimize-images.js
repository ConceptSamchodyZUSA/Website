#!/usr/bin/env node

/**
 * Script do optymalizacji obrazów z Supabase
 * Automatycznie konwertuje JPG/PNG na WebP i generuje responsywne wersje
 *
 * Użycie: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'optimized-images');
const SIZES = [400, 800, 1200]; // Responsive sizes

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    // Directory already exists
  }
}

async function optimizeImage(imagePath, filename) {
  const basename = path.parse(filename).name;

  console.log(`🔄 Optimizing: ${filename}`);

  try {
    // Generate multiple sizes in WebP format
    for (const size of SIZES) {
      const outputPath = path.join(OUTPUT_DIR, `${basename}-${size}w.webp`);

      await sharp(imagePath)
        .resize(size, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      console.log(`  ✅ Generated: ${basename}-${size}w.webp`);
    }

    // Generate original size WebP
    const originalPath = path.join(OUTPUT_DIR, `${basename}-original.webp`);
    await sharp(imagePath)
      .webp({ quality: 90 })
      .toFile(originalPath);

    console.log(`  ✅ Generated: ${basename}-original.webp`);
  } catch (err) {
    console.error(`  ❌ Error optimizing ${filename}:`, err.message);
  }
}

async function optimizeLocalImages() {
  await ensureDir(OUTPUT_DIR);

  const publicDir = path.join(__dirname, '..', 'public');

  // Optimize background image
  const backgroundPath = path.join(publicDir, 'background.jpg');
  try {
    await fs.access(backgroundPath);
    await optimizeImage(backgroundPath, 'background.jpg');
  } catch (err) {
    console.log('⚠️  background.jpg not found, skipping');
  }

  console.log('\n✅ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update App.js to use WebP images with fallback');
  console.log('2. For Supabase images, serve them through a proxy that converts to WebP');
  console.log('3. Or manually download, optimize, and re-upload to Supabase');
}

// Run optimization
optimizeLocalImages().catch(console.error);
