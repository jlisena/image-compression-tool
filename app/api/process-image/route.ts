import { NextResponse } from "next/server";
import sharp from "sharp";

interface LogEntry {
  operation: string;
  details: string;
}

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
  evenDimensionsMode: "add" | "remove",
  evenDimensionsPaddingWidth: "left" | "right",
  evenDimensionsPaddingHeight: "top" | "bottom",
  appendFilenameEnabled: boolean,
  appendFilenameText: string
) => {
  let pipeline = sharp(originalImageBuffer).rotate();
  let processedImageMimeType = originalFileType;
  const logs: LogEntry[] = [];

  // Base transformations
  if (trimImageEnabled) {
    const beforeTrim = await pipeline.metadata();
    if (trimImageMode === "transparency" || trimImageMode === "both") {
      // Trim with alpha channel only - removes transparent pixels
      pipeline = pipeline.trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } });
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
    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
    pipeline = sharp(data);
    if (
        beforeTrim.width !== info.width ||
        beforeTrim.height !== info.height
    ) {
      logs.push({
        operation: "Trim Image",
        details:
          trimImageMode === "both"
            ? "Removed transparent and white edges"
            : trimImageMode === "transparency"
            ? "Removed transparent edges"
            : "Removed white edges",
      });
    }
  }

  if (resizeImageEnabled) {
    let width: number | undefined;
    let height: number | undefined;
    let resizeImageDetails = "";

    if (resizeImageMode === "percentage" && resizeImagePercentage) {
      // Calculate dimensions based on percentage
      const metadata = await sharp(originalImageBuffer).metadata();
      const originalWidth = metadata.width || 0;
      const originalHeight = metadata.height || 0;
      const factor = resizeImagePercentage / 100;
      width = Math.round(originalWidth * factor);
      height = Math.round(originalHeight * factor);
      resizeImageDetails = `Scaled to ${resizeImagePercentage}% (${width}px width and ${height}px height)`;
    } else if (resizeImageMode === "manual" && (resizeImageWidth || resizeImageHeight)) {
      width = resizeImageWidth || undefined;
      height = resizeImageHeight || undefined;
      const dims = [];
      dims.push(
        width ? `${width}px width` : `auto width`
      );
      dims.push(
        height ? `${height}px height` : `auto height`
      );
      resizeImageDetails = `Resized to ${dims.join(" and ")}`;
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
      if (resizeImageDetails) {
        logs.push({
          operation: "Resize Image",
          details: resizeImageDetails,
        });
      }
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
  
  // Log quality if not default
  if (imageQuality !== 75) {
    logs.push({
      operation: "Image Quality",
      details: `Quality set to ${imageQuality}%`,
    });
  }

  // Apply even dimensions (add padding or crop) if enabled (all formats supported)
  if (evenDimensionsEnabled) {
    const metadata = await pipeline.metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    if (width % 2 !== 0 || height % 2 !== 0) {
      if (evenDimensionsMode === "add") {
        // Add mode: extend image with padding
        const padLeft =
          evenDimensionsPaddingWidth === "left" && width % 2 !== 0 ? 1 : 0;
        const padRight =
          evenDimensionsPaddingWidth === "right" && width % 2 !== 0 ? 1 : 0;
        const padTop =
          evenDimensionsPaddingHeight === "top" && height % 2 !== 0 ? 1 : 0;
        const padBottom =
          evenDimensionsPaddingHeight === "bottom" && height % 2 !== 0 ? 1 : 0;

        // Determine background color based on format
        let backgroundColor;
        if (originalFileType === "image/jpeg") {
          // JPEG: use white padding
          backgroundColor = { r: 255, g: 255, b: 255 };
        } else {
          // PNG, WebP, AVIF: use transparent padding
          backgroundColor = { r: 0, g: 0, b: 0, alpha: 0 };
        }

        pipeline = pipeline.extend({
          left: padLeft,
          right: padRight,
          top: padTop,
          bottom: padBottom,
          background: backgroundColor,
        });

        const paddingDesc = [];
        if (padLeft || padRight) {
          const side = padLeft ? "left" : "right";
          paddingDesc.push(`1px ${side}`);
        }
        if (padTop || padBottom) {
          const side = padTop ? "top" : "bottom";
          paddingDesc.push(`1px ${side}`);
        }
        logs.push({
          operation: "Even Dimensions",
          details: `Added padding (${paddingDesc.join(", ")})`,
        });
      } else {
        // Remove mode: crop pixels from image
        const cropLeft =
          evenDimensionsPaddingWidth === "left" && width % 2 !== 0 ? 1 : 0;
        const cropRight =
          evenDimensionsPaddingWidth === "right" && width % 2 !== 0 ? 1 : 0;
        const cropTop =
          evenDimensionsPaddingHeight === "top" && height % 2 !== 0 ? 1 : 0;
        const cropBottom =
          evenDimensionsPaddingHeight === "bottom" && height % 2 !== 0 ? 1 : 0;

        const newWidth = width - cropLeft - cropRight;
        const newHeight = height - cropTop - cropBottom;

        pipeline = pipeline.extract({
          left: cropLeft,
          top: cropTop,
          width: newWidth,
          height: newHeight,
        });

        const cropDesc = [];
        if (cropLeft || cropRight) {
          const side = cropLeft ? "left" : "right";
          cropDesc.push(`1px ${side}`);
        }
        if (cropTop || cropBottom) {
          const side = cropTop ? "top" : "bottom";
          cropDesc.push(`1px ${side}`);
        }
        logs.push({
          operation: "Even Dimensions",
          details: `Removed pixels (${cropDesc.join(", ")})`,
        });
      }
    }
  }
  
  // Log filename append if enabled
  if (appendFilenameEnabled && appendFilenameText) {
    logs.push({
      operation: "Append Filename",
      details: `Added suffix "${appendFilenameText}"`,
    });
  }

  return { pipeline, processedImageMimeType, logs };
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
    const evenDimensionsMode =
      (formData.get("evenDimensionsMode") as "add" | "remove") || "add";
    const evenDimensionsPaddingWidth =
      (formData.get("evenDimensionsPaddingWidth") as "left" | "right") ||
      "left";
    const evenDimensionsPaddingHeight =
      (formData.get("evenDimensionsPaddingHeight") as "top" | "bottom") ||
      "bottom";
    const appendFilenameEnabled = formData.get("appendFilenameEnabled") === "true";
    const appendFilenameText = (formData.get("appendFilenameText") as string) || "";

    if (!originalFile) {
      return NextResponse.json(
        { message: "No image uploaded" },
        { status: 400 }
      );
    }

    const originalImageBuffer = Buffer.from(await originalFile.arrayBuffer());
    const originalFileType = originalFile.type;

    // Process image with all transformations in one call
    const { pipeline, processedImageMimeType, logs } = await processImage(
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
      evenDimensionsMode,
      evenDimensionsPaddingWidth,
      evenDimensionsPaddingHeight,
      appendFilenameEnabled,
      appendFilenameText
    );

    const compressedBuffer = await pipeline.toBuffer();

    return new NextResponse(
      new Uint8Array(compressedBuffer).buffer as BodyInit,
      {
        status: 200,
        headers: {
          "Content-Type": processedImageMimeType,
          "Content-Length": compressedBuffer.length.toString(),
          "X-Compression-Logs": JSON.stringify(logs),
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
