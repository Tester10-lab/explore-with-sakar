import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const MAX_SIZE_BYTES = 500 * 1024; // 500 KB threshold
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;

const isCheckOnly = process.argv.includes('--check');

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
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

async function run() {
  const allFiles = getAllFiles(PUBLIC_DIR);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  const largeImages = allFiles.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) return false;
    const stat = fs.statSync(file);
    return stat.size > MAX_SIZE_BYTES;
  });

  if (isCheckOnly) {
    console.log(`[CHECK MODE] Scanning ${PUBLIC_DIR} for images > 500 KB...`);
    if (largeImages.length === 0) {
      console.log('✓ All images in public/ are within the 500 KB limit. (0 oversized)');
      process.exit(0);
    } else {
      console.error(`✗ Found ${largeImages.length} image(s) exceeding 500 KB:`);
      largeImages.forEach((f) => {
        const sizeKb = (fs.statSync(f).size / 1024).toFixed(1);
        console.error(`  - ${path.relative(PUBLIC_DIR, f)}: ${sizeKb} KB`);
      });
      process.exit(1);
    }
  }

  console.log(`Scanning ${PUBLIC_DIR} for images larger than ${MAX_SIZE_BYTES / 1024} KB...`);
  console.log(`Found ${largeImages.length} images requiring optimization.\n`);

  let totalSavedBytes = 0;

  for (const file of largeImages) {
    const ext = path.extname(file).toLowerCase();
    const originalStat = fs.statSync(file);
    const originalSize = originalStat.size;

    try {
      const inputBuffer = fs.readFileSync(file);
      const metadata = await sharp(inputBuffer).metadata();

      let pipeline = sharp(inputBuffer).rotate();

      // Constrain width to 1920 without enlargement
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }

      let optimizedBuffer;
      if (ext === '.png') {
        optimizedBuffer = await pipeline
          .png({ quality: 80, compressionLevel: 9, palette: !metadata.hasAlpha })
          .toBuffer();
      } else if (ext === '.webp') {
        optimizedBuffer = await pipeline
          .webp({ quality: 82, effort: 6 })
          .toBuffer();
      } else {
        // jpg or jpeg
        optimizedBuffer = await pipeline
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
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

run();
