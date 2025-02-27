import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  // Path to the mock document file
  const filePath = path.join(process.cwd(), 'public', 'aiq.pdf'); 

  // Read the file from the filesystem
  const fileBuffer = fs.readFileSync(filePath);

  // Set headers to prompt the browser to download the file
  const headers = new Headers({
    'Content-Type': 'application/pdf', // Change MIME type for other file formats
    'Content-Disposition': 'attachment; filename="aiq.pdf"',
  });

  // Return the file as a response
  return new NextResponse(fileBuffer, {
    headers,
  });
}
