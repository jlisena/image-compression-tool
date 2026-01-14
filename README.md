# Image Compression Tool

A web-based image compression utility that allows you to optimize images in multiple formats while maintaining quality control. Upload images, adjust compression settings, and download the optimized results.

## Features

- Support for multiple image formats (JPEG, PNG, WebP, AVIF)
- Adjustable quality slider for fine-tuned compression control
- Trim transparency to remove transparent edges
- Resize images while maintaining aspect ratio
- Even dimensions padding for compatibility
- Batch processing with visual preview
- Compression statistics (ratio, file size reduction)
- Batch download as ZIP

## Tech Stack

- **Framework:** Next.js 15 with App Router and Turbopack
- **Frontend:** React 19, TypeScript
- **Image Processing:** Sharp
- **Styling:** Tailwind CSS 4, PostCSS
- **UI Components:** Shadcn UI (Radix UI), Lucide Icons
- **File Management:** JSZip for batch downloads
- **Theme Management:** next-themes

## Installation

### Prerequisites

- **Node.js:** 22.14.0 (recommended) or 18+
- npm or preferred package manager

### Setup

```bash
git clone git@github.com:jlisena/inizio-img-compression.git
cd inizio-img-compression
```

2. Use the correct Node version (run `nvm install <version>` if not installed):

```bash
nvm use 22.14.0
# or if you prefer Node 18
nvm use 18
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
2. Use advanced settings if needed
3. Preview compressed images in the grid
4. Download individual images or batch download as ZIP
