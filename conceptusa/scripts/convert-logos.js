const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '../public');

// Increased dimensions for better quality (2x scale)
const filesToConvert = [
  { input: 'logo-facebook.svg', output: 'logo-facebook.png', width: 1600, height: 1600 },
  { input: 'facebook-cover.svg', output: 'facebook-cover.png', width: 1702, height: 630 },
  { input: 'logo-concept-wide.svg', output: 'logo-concept-wide.png', width: 800, height: 290 } // Also doubled for better video overlay quality
];

async function convert() {
  for (const file of filesToConvert) {
    const inputPath = path.join(publicDir, file.input);
    const outputPath = path.join(publicDir, file.output);

    try {
      console.log(`Converting ${file.input} to ${file.output} (High Quality)...`);
      await sharp(inputPath)
        .resize(file.width, file.height)
        .png({ quality: 100, compressionLevel: 9 }) // Max quality
        .toFile(outputPath);
      console.log(`Successfully created ${outputPath} [${file.width}x${file.height}]`);
    } catch (error) {
      console.error(`Error converting ${file.input}:`, error);
    }
  }
}

convert();
