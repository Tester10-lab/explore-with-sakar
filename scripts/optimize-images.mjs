import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const MAX_SIZE_BYTES = 500 * 1024; // 500 KB threshold
const MAX_WIDTH = 1600;

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function optimizeImages() {
  console.log(`Scanning ${PUBLIC_DIR} for images larger than ${MAX_SIZE_BYTES / 1024} KB...`);
  const allFiles = getAllFiles(PUBLIC_DIR);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  const largeImages = allFiles.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) return false;
    const stat = fs.statSync(file);
    return stat.size > MAX_SIZE_BYTES;
  });

  console.log(`Found ${largeImages.length} images requiring optimization.\n`);

  let totalSavedBytes = 0;

  for (const file of largeImages) {
    const ext = path.extname(file).toLowerCase();
    const originalStat = fs.statSync(file);
    const originalSize = originalStat.size;

    try {
      const inputBuffer = fs.readFileSync(file);
      const image = sharp(inputBuffer);
      const metadata = await image.metadata();

      let pipeline = sharp(inputBuffer).rotate();

      // If very tall or wide, scale down to max 1280 to ensure file is under 500KB
      const targetDimension = (ext === '.png' && !metadata.hasAlpha) ? 1200 : MAX_WIDTH;
      if ((metadata.width && metadata.width > targetDimension) || (metadata.height && metadata.height > targetDimension)) {
        pipeline = pipeline.resize({ width: targetDimension, height: targetDimension, fit: 'inside', withoutEnlargement: true });
      }

      let optimizedBuffer;
      if (ext === '.png') {
        optimizedBuffer = await pipeline
          .png({ quality: 75, compressionLevel: 9, palette: true, colours: 256 })
          .toBuffer();
      } else if (ext === '.webp') {
        optimizedBuffer = await pipeline
          .webp({ quality: 75, effort: 6 })
          .toBuffer();
      } else {
        // jpg or jpeg
        optimizedBuffer = await pipeline
          .jpeg({ quality: 75, mozjpeg: true })
          .toBuffer();
      }

      if (optimizedBuffer.length < originalSize) {
        fs.writeFileSync(file, optimizedBuffer);
        const saved = originalSize - optimizedBuffer.length;
        totalSavedBytes += saved;
        console.log(
          `✓ ${path.relative(PUBLIC_DIR, file)}: ${(originalSize / 1024).toFixed(1)} KB -> ${(
            optimizedBuffer.length / 1024
          ).toFixed(1)} KB (saved ${(saved / 1024).toFixed(1)} KB)`
        );
      } else {
        console.log(
          `- ${path.relative(PUBLIC_DIR, file)}: already optimal (${(originalSize / 1024).toFixed(1)} KB)`
        );
      }
    } catch (err) {
      console.error(`✗ Failed to optimize ${file}:`, err.message);
    }
  }

  console.log(`\nOptimization Complete! Total space saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
