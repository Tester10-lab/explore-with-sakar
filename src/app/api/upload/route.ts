import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { getSessionFromRequest } from '@/lib/auth';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'image/avif',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_BASE64_FALLBACK_SIZE = 500 * 1024; // 500KB cap for serverless data URL fallback

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate admin user
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    // 2. Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
    }

    // 3. Validate mime type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type (${file.type}). Only JPG, PNG, WEBP, SVG, AVIF, and GIF are permitted.` },
        { status: 400 }
      );
    }

    // 4. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds the 10MB limit.` },
        { status: 400 }
      );
    }

    // 5. Try writing to /public/uploads, or fallback to Data URL in read-only environments (e.g. Vercel)
    let publicUrl = '';
    const ext = path.extname(file.name) || '.jpg';
    const sanitizedBase = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .slice(0, 30);
    const uniqueName = `${Date.now()}-${sanitizedBase || 'image'}${ext.toLowerCase()}`;

    const arrayBuffer = await file.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);

    // Auto-optimize standard bitmap images with sharp
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      try {
        let pipeline = sharp(buffer).rotate();
        const metadata = await pipeline.metadata();
        if ((metadata.width && metadata.width > 1920) || (metadata.height && metadata.height > 1920)) {
          pipeline = pipeline.resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true });
        }
        if (file.type === 'image/jpeg') {
          buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
        } else if (file.type === 'image/png') {
          buffer = await pipeline.png({ quality: 80, compressionLevel: 8 }).toBuffer();
        } else if (file.type === 'image/webp') {
          buffer = await pipeline.webp({ quality: 80 }).toBuffer();
        }
      } catch (sharpErr) {
        console.warn('Sharp optimization skipped for upload:', sharpErr);
      }
    }

    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, uniqueName);
      fs.writeFileSync(filePath, buffer);
      publicUrl = `/uploads/${uniqueName}`;
    } catch (fsErr) {
      console.warn('Read-only filesystem detected, falling back to base64 Data URL:', fsErr);
      if (buffer.length > MAX_BASE64_FALLBACK_SIZE) {
        return NextResponse.json(
          {
            error: `Image size (${(buffer.length / 1024).toFixed(0)} KB) exceeds the 500 KB limit for serverless storage fallback. Please upload a smaller image or configure cloud storage.`,
          },
          { status: 413 }
        );
      }
      publicUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueName,
      size: buffer.length,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error?.message || 'File upload failed' }, { status: 500 });
  }
}
