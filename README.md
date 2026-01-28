# Image Compression Tool

A web-based image compression tool for optimizing images at scale with flexible processing options.

## Features

- Support for multiple image formats (JPEG, PNG, WebP, AVIF)
- Adjustable image quality slider
- Trim transparent or solid white edges
- Resize images by width, height, or percentage (auto aspect ratio)
- Ensure even image dimensions (±1px padding)
- Batch processing with visual preview
- Compression statistics (ratio, file size reduction)
- Per-image processing log
- Batch download as ZIP

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Frontend:** React 19, TypeScript
- **Image Processing:** Sharp
- **Styling:** Tailwind CSS 4, PostCSS
- **UI Components:** shadcn/ui (Radix UI), Lucide Icons
- **File Management:** JSZip (batch downloads)
- **Theme Management:** next-themes

## Installation (Local)

### Prerequisites

- **Node.js:** 22+ (recommended)
- **npm** or preferred package manager
- **nvm**

### Setup

1. Clone the repository and change directory:

```bash
git clone git@github.com:jlisena/image-compression-tool.git
cd image-compression-tool
```

2. Use the correct Node version:
   > Note: run `nvm install lts/jod` if not installed

```bash
nvm use
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:3000

## Usage

1. Upload one or more images using the dropzone
2. Adjust settings if needed
3. Preview compressed images in the grid
4. Download individual images or download all as a ZIP
