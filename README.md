# Image Compression Tool

A web-based image compression utility that allows you to optimize images in multiple formats while maintaining quality control. Upload images, adjust compression settings, and download the optimized results.

## Features

- Support for multiple image formats (JPEG, PNG, WebP, AVIF)
- Adjustable quality slider for fine-tuned compression control
- Batch processing with visual preview
- Format-preserving compression
- Lightweight and responsive design
- Dark mode support

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Frontend:** React 19, TypeScript
- **Image Processing:** Sharp
- **Styling:** Tailwind CSS 4, PostCSS
- **UI Components:** Shadcn UI (Radix UI), Lucide Icons
- **File Management:** JSZip for batch downloads
- **Theme Management:** next-themes

## Installation

### Prerequisites

- Node.js 18+ (with npm or preferred package manager)

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd inizio-img-compression
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:3000

## Usage

1. Upload one or more images using the dropzone
2. Use the quality slider to adjust compression level (50-90)
3. Preview compressed images in the grid
4. Download individual images or batch download as ZIP
