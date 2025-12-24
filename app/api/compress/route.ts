import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File
    const quality = parseInt(formData.get('quality') as string) || 75

    if (!file) {
      return NextResponse.json({ message: 'No image uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileType = file.type

    let compressedBuffer: Buffer
    let outputMimeType = fileType

    // Compress based on original format, preserving the format
    if (fileType === 'image/png') {
      compressedBuffer = await sharp(buffer)
        .rotate()
        .png({ compressionLevel: 9, quality })
        .toBuffer()
    } else if (fileType === 'image/webp') {
      compressedBuffer = await sharp(buffer)
        .rotate()
        .webp({ quality })
        .toBuffer()
    } else if (fileType === 'image/avif') {
      compressedBuffer = await sharp(buffer)
        .rotate()
        .avif({ quality })
        .toBuffer()
    } else {
      // Default to JPEG for other formats (JPEG, BMP, etc.)
      compressedBuffer = await sharp(buffer)
        .rotate()
        .jpeg({ quality, progressive: true })
        .toBuffer()
      outputMimeType = 'image/jpeg'
    }

    return new NextResponse(
      new Uint8Array(compressedBuffer).buffer as BodyInit,
      {
        status: 200,
        headers: {
          'Content-Type': outputMimeType,
          'Content-Length': compressedBuffer.length.toString(),
        },
      }
    )
  } catch (error) {
    console.error('Compression error:', error)
    return NextResponse.json(
      { message: 'Compression failed', error: String(error) },
      { status: 500 }
    )
  }
}
