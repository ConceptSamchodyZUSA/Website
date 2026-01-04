const sharp = require('sharp');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const sourceLogo = path.join(publicDir, 'logo-facebook.png'); // 1600x1600 source

const iconsToGenerate = [
  { output: 'favicon.png', width: 64, height: 64 },
  { output: 'apple-touch-icon.png', width: 180, height: 180 },
  { output: 'logo192.png', width: 192, height: 192 },
  { output: 'logo512.png', width: 512, height: 512 }
];

async function generateIcons() {
  try {
    console.log('Generating web icons from logo-facebook.png...');

    for (const icon of iconsToGenerate) {
      const outputPath = path.join(publicDir, icon.output);
      await sharp(sourceLogo)
        .resize(icon.width, icon.height)
        .png()
        .toFile(outputPath);
      console.log(`Generated ${icon.output} (${icon.width}x${icon.height})`);
    }

    // Generate favicon.ico (requires specific format, but sharp can output png which we can rename or use as is if supported,
    // but standard practice is .ico. Sharp doesn't natively support .ico write easily without plugins,
    // so we'll stick to a small png for favicon.png which is widely supported, and maybe just copy it to .ico if needed,
    // or just rely on modern browsers using the png).
    // Actually, let's just make a 32x32 png and call it favicon.ico for compatibility if the user wants,
    // but strictly .ico is a container.
    // For now, updating favicon.png is the most important for modern browsers.

    console.log('Icon generation complete!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
