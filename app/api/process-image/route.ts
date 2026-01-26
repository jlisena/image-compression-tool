import { NextResponse } from "next/server";
import sharp from "sharp";

const processImage = async (
  originalImageBuffer: Buffer,
  originalFileType: string,
  imageQuality: number,
  trimImageEnabled: boolean,
  trimImageMode: "transparency" | "white" | "both",
  resizeImageEnabled: boolean,
  resizeImageMode: "manual" | "percentage",
  resizeImageWidth: number | null,
  resizeImageHeight: number | null,
  resizeImagePercentage: number | null,
  evenDimensionsEnabled: boolean,
  evenDimensionsPaddingWidth: "left" | "right",
  evenDimensionsPaddingHeight: "top" | "bottom"
) => {
  let pipeline = sharp(originalImageBuffer).rotate();
  let processedImageMimeType = originalFileType;

  // Base transformations
  if (trimImageEnabled) {
    if (trimImageMode === "transparency" || trimImageMode === "both") {
      pipeline = pipeline.trim();
    }
    if (trimImageMode === "white" || trimImageMode === "both") {
      // For "both" mode, we need to materialize after transparency trim
      // so the white trim operates on the result
      if (trimImageMode === "both") {
        const buffer = await pipeline.toBuffer();
        pipeline = sharp(buffer).trim({ background: "#ffffff" });
      } else {
        pipeline = pipeline.trim({ background: "#ffffff" });
      }
    }
  }

  if (resizeImageEnabled) {
    let width: number | undefined;
    let height: number | undefined;

    if (resizeImageMode === "percentage" && resizeImagePercentage) {
      // Calculate dimensions based on percentage
      const metadata = await sharp(originalImageBuffer).metadata();
      const originalWidth = metadata.width || 0;
      const originalHeight = metadata.height || 0;
      const factor = resizeImagePercentage / 100;
      width = Math.round(originalWidth * factor);
      height = Math.round(originalHeight * factor);
    } else if (resizeImageMode === "manual" && (resizeImageWidth || resizeImageHeight)) {
      width = resizeImageWidth || undefined;
      height = resizeImageHeight || undefined;
    }

    if (width || height) {
      // If both dimensions are specified, use "fill" to force exact dimensions
      // If only one is specified, use "inside" to maintain aspect ratio
      const fitMode = width && height ? "fill" : "inside";
      pipeline = pipeline.resize(width, height, {
        // Upscale (false) or downscale based on original size
        withoutEnlargement: false,
        fit: fitMode,
      });
      // Materialize the resize so even dimensions check gets the correct dimensions
      const resizedBuffer = await pipeline.toBuffer({ resolveWithObject: false }) as Buffer;
      pipeline = sharp(resizedBuffer);
    }
  }

  // Apply format-specific compression
  if (originalFileType === "image/png") {
    pipeline = pipeline.png({ compressionLevel: 9, quality: imageQuality });
  } else if (originalFileType === "image/webp") {
    pipeline = pipeline.webp({ quality: imageQuality });
  } else if (originalFileType === "image/avif") {
    pipeline = pipeline.avif({ quality: imageQuality });
  } else {
    // Default to JPEG for other formats
    pipeline = pipeline.jpeg({ quality: imageQuality, progressive: true });
    processedImageMimeType = "image/jpeg";
  }

  // Apply even dimensions padding if enabled (PNG, WebP, AVIF only)
  if (
    evenDimensionsEnabled &&
    (originalFileType === "image/png" ||
      originalFileType === "image/webp" ||
      originalFileType === "image/avif")
  ) {
    const metadata = await pipeline.metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    if (width % 2 !== 0 || height % 2 !== 0) {
      const padLeft =
        evenDimensionsPaddingWidth === "left" && width % 2 !== 0 ? 1 : 0;
      const padRight =
        evenDimensionsPaddingWidth === "right" && width % 2 !== 0 ? 1 : 0;
      const padTop =
        evenDimensionsPaddingHeight === "top" && height % 2 !== 0 ? 1 : 0;
      const padBottom =
        evenDimensionsPaddingHeight === "bottom" && height % 2 !== 0 ? 1 : 0;

      pipeline = pipeline.extend({
        left: padLeft,
        right: padRight,
        top: padTop,
        bottom: padBottom,
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent
      });
    }
  }

  return { pipeline, processedImageMimeType };
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const originalFile = formData.get("image") as File;
    const imageQuality = parseInt(formData.get("imageQuality") as string) || 75;
    const trimImageEnabled = formData.get("trimImageEnabled") === "true";
    const trimImageMode =
      (formData.get("trimImageMode") as "transparency" | "white" | "both") ||
      "transparency";
    const resizeImageEnabled = formData.get("resizeImageEnabled") === "true";
    const resizeImageMode = (formData.get("resizeImageMode") as "manual" | "percentage") || "manual";
    const resizeImageWidth = formData.get("resizeImageWidth")
      ? parseInt(formData.get("resizeImageWidth") as string)
      : null;
    const resizeImageHeight = formData.get("resizeImageHeight")
      ? parseInt(formData.get("resizeImageHeight") as string)
      : null;
    const resizeImagePercentage = formData.get("resizeImagePercentage")
      ? parseInt(formData.get("resizeImagePercentage") as string)
      : null;
    const evenDimensionsEnabled =
      formData.get("evenDimensionsEnabled") === "true";
    const evenDimensionsPaddingWidth =
      (formData.get("evenDimensionsPaddingWidth") as "left" | "right") ||
      "left";
    const evenDimensionsPaddingHeight =
      (formData.get("evenDimensionsPaddingHeight") as "top" | "bottom") ||
      "bottom";

    if (!originalFile) {
      return NextResponse.json(
        { message: "No image uploaded" },
        { status: 400 }
      );
    }

    const originalImageBuffer = Buffer.from(await originalFile.arrayBuffer());
    const originalFileType = originalFile.type;

    // Process image with all transformations in one call
    const { pipeline, processedImageMimeType } = await processImage(
      originalImageBuffer,
      originalFileType,
      imageQuality,
      trimImageEnabled,
      trimImageMode,
      resizeImageEnabled,
      resizeImageMode,
      resizeImageWidth,
      resizeImageHeight,
      resizeImagePercentage,
      evenDimensionsEnabled,
      evenDimensionsPaddingWidth,
      evenDimensionsPaddingHeight
    );

    const compressedBuffer = await pipeline.toBuffer();

    return new NextResponse(
      new Uint8Array(compressedBuffer).buffer as BodyInit,
      {
        status: 200,
        headers: {
          "Content-Type": processedImageMimeType,
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
