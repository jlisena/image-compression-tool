import { NextResponse } from "next/server";
import sharp from "sharp";

const processImage = async (
  originalImageBuffer: Buffer,
  originalFileType: string,
  imageQuality: number,
  trimBorderEnabled: boolean,
  trimBorderMode: "transparency" | "white" | "both",
  resizeImageEnabled: boolean,
  resizeImageWidth: number | null,
  evenDimensionsEnabled: boolean,
  evenDimensionsPaddingWidth: "left" | "right",
  evenDimensionsPaddingHeight: "top" | "bottom"
) => {
  let pipeline = sharp(originalImageBuffer).rotate();
  let processedImageMimeType = originalFileType;

  // Base transformations
  if (trimBorderEnabled) {
    if (trimBorderMode === "transparency" || trimBorderMode === "both") {
      pipeline = pipeline.trim();
    }
    if (trimBorderMode === "white" || trimBorderMode === "both") {
      // For "both" mode, we need to materialize after transparency trim
      // so the white trim operates on the result
      if (trimBorderMode === "both") {
        const buffer = await pipeline.toBuffer();
        pipeline = sharp(buffer).trim({ background: "#ffffff" });
      } else {
        pipeline = pipeline.trim({ background: "#ffffff" });
      }
    }
  }

  if (resizeImageEnabled && resizeImageWidth) {
    pipeline = pipeline.resize(resizeImageWidth, undefined, {
      // Upscale (false) or downscale based on original size
      withoutEnlargement: false,
      fit: "inside",
    });
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
    const trimBorderEnabled = formData.get("trimBorderEnabled") === "true";
    const trimBorderMode =
      (formData.get("trimBorderMode") as "transparency" | "white" | "both") ||
      "transparency";
    const resizeImageEnabled = formData.get("resizeImageEnabled") === "true";
    const resizeImageWidth = formData.get("resizeImageWidth")
      ? parseInt(formData.get("resizeImageWidth") as string)
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
      trimBorderEnabled,
      trimBorderMode,
      resizeImageEnabled,
      resizeImageWidth,
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
