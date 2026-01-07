import { NextResponse } from "next/server";
import sharp from "sharp";

const buildPipeline = (
  buffer: Buffer,
  trimTransparency: boolean,
  resizeEnabled: boolean,
  resizeWidth: number | null
) => {
  let pipeline = sharp(buffer).rotate();

  if (trimTransparency) {
    pipeline = pipeline.trim();
  }

  if (resizeEnabled && resizeWidth) {
    pipeline = pipeline.resize(resizeWidth, undefined, {
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  return pipeline;
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const quality = parseInt(formData.get("quality") as string) || 75;
    const trimTransparency = formData.get("trimTransparency") === "true";
    const resizeEnabled = formData.get("resizeEnabled") === "true";
    const resizeWidth = formData.get("resizeWidth")
      ? parseInt(formData.get("resizeWidth") as string)
      : null;
    const evenDimensions = formData.get("evenDimensions") === "true";
    const widthPaddingPosition =
      (formData.get("widthPaddingPosition") as "left" | "right") || "left";
    const heightPaddingPosition =
      (formData.get("heightPaddingPosition") as "top" | "bottom") || "bottom";

    if (!file) {
      return NextResponse.json(
        { message: "No image uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileType = file.type;

    let outputMimeType = fileType;

    // Build the base pipeline with rotation, trim, and resize
    const pipeline = buildPipeline(
      buffer,
      trimTransparency,
      resizeEnabled,
      resizeWidth
    );

    // Apply format-specific compression
    let compressedImage = pipeline;
    if (fileType === "image/png") {
      compressedImage = pipeline.png({ compressionLevel: 9, quality });
    } else if (fileType === "image/webp") {
      compressedImage = pipeline.webp({ quality });
    } else if (fileType === "image/avif") {
      compressedImage = pipeline.avif({ quality });
    } else {
      // Default to JPEG for other formats (JPEG, BMP, etc.)
      compressedImage = pipeline.jpeg({ quality, progressive: true });
      outputMimeType = "image/jpeg";
    }

    // Apply even dimensions padding if enabled (PNG, WebP, AVIF only)
    if (
      evenDimensions &&
      (fileType === "image/png" ||
        fileType === "image/webp" ||
        fileType === "image/avif")
    ) {
      const metadata = await compressedImage.metadata();
      const width = metadata.width || 0;
      const height = metadata.height || 0;

      if (width % 2 !== 0 || height % 2 !== 0) {
        const padLeft =
          widthPaddingPosition === "left" && width % 2 !== 0 ? 1 : 0;
        const padRight =
          widthPaddingPosition === "right" && width % 2 !== 0 ? 1 : 0;
        const padTop =
          heightPaddingPosition === "top" && height % 2 !== 0 ? 1 : 0;
        const padBottom =
          heightPaddingPosition === "bottom" && height % 2 !== 0 ? 1 : 0;

        compressedImage = compressedImage.extend({
          left: padLeft,
          right: padRight,
          top: padTop,
          bottom: padBottom,
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent
        });
      }
    }

    const compressedBuffer = await compressedImage.toBuffer();

    return new NextResponse(
      new Uint8Array(compressedBuffer).buffer as BodyInit,
      {
        status: 200,
        headers: {
          "Content-Type": outputMimeType,
          "Content-Length": compressedBuffer.length.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json(
      { message: "Image processing failed", error: String(error) },
      { status: 500 }
    );
  }
}
