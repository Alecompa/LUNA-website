# LUNA Website

Official website for the Laboratory for Underground Nuclear Astrophysics (LUNA) at Gran Sasso National Laboratory.

## About LUNA

LUNA (Laboratory for Underground Nuclear Astrophysics) is a cutting-edge research facility that studies charged-particle induced reactions of astrophysical interest deep underground. Our 400kV accelerator and state-of-the-art detection systems enable us to explore stellar nucleosynthesis and understand the nuclear reactions that power stars.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components built with shadcn/ui
- **Animations:** Framer Motion
- **Content:** Markdown-based content management
- **Image Optimization:** Next.js Image component

## Project Structure

```
LUNA-website/
├── app/                          # Next.js app directory
│   ├── components/               # Page-specific components
│   │   ├── content-display.tsx   # Markdown content renderer
│   │   ├── content-preview-card.tsx
│   │   ├── experiments.tsx       # Experiments showcase
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── hero.tsx              # Homepage hero section
│   │   ├── image-carousel.tsx    # Interactive image gallery
│   │   ├── news-preview.tsx
│   │   ├── science-posts-preview.tsx
│   │   └── team.tsx              # Team member display
│   ├── about/                    # About page
│   ├── blog/                     # Science blog posts
│   ├── contact/                  # Contact page
│   ├── experiments/              # Individual experiment pages
│   ├── news/                     # News and articles
│   ├── publications/             # Publications page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # Shared UI components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   └── ... (other UI primitives)
│   └── theme-provider.tsx        # Dark mode support
├── content/                      # Markdown content
│   ├── articles/                 # News articles
│   │   ├── 14Npg.md
│   │   ├── pubblication.md
│   │   └── shades.md
│   ├── experiments/              # Experiment descriptions
│   │   ├── 14n-pg.md            # Ongoing experiments
│   │   ├── shades.md
│   │   ├── 12c-12c.md
│   │   ├── 3he-3he-past.md      # Past experiments
│   │   └── ...
│   └── posts/                    # Blog posts
│       └── physics-post.md
├── public/                       # Static assets
│   └── images/                   # Image assets
│       ├── hero/                 # Hero section images
│       ├── experiments/          # Experiment images
│       ├── articles/             # Article images
│       └── posts/                # Blog post images
├── utils/                        # Utility functions
│   ├── markdown.ts               # Markdown processing
│   └── processLatex.ts           # LaTeX equation rendering
└── lib/
    └── utils.ts                  # Shared utilities
```

## Features

### 🏠 Homepage
- Dynamic hero section with rotating background images
- Latest news preview section
- **Ongoing experiments showcase** - automatically displays current research
- **Image carousel** with hover effects and fullscreen viewer
- Blog posts preview
- Team member gallery

### 📰 News & Blog
- Markdown-based content management
- Support for LaTeX equations
- Image embedding and optimization
- Individual article/post pages with dynamic routing

### 🔬 Experiments
- **Dedicated experiments page** with ongoing and past experiments
- Markdown-based content management with frontmatter metadata
- Automatic categorization by status (ongoing/past)
- Homepage automatically displays only ongoing experiments
- Detailed experiment pages with:
  - Principal Investigator information
  - Facility details
  - Scientific goals and methodology
  - Astrophysical impact
  - Tags for categorization
- Support for LaTeX equations in experiment descriptions

### 🎨 Interactive Features
- **Image Carousel:**
  - Hover to view descriptions with darkening effect
  - Click to open fullscreen viewer
  - Navigate with arrow buttons or keyboard (←/→)
  - Smooth zoom animations
  - Escape key to close
- Dark mode support
- Responsive design for all devices
- Smooth animations and transitions

### 📚 Publications
- Comprehensive publication listing
- Searchable and filterable

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LUNA-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Adding News Articles

1. Create a new `.md` file in `content/articles/`
2. Add frontmatter with metadata:
```markdown
---
title: "Your Article Title"
date: "2025-01-15"
author: "Author Name"
excerpt: "Brief description"
image: "/images/articles/your-image.jpg"
---

Your article content here...
```

### Adding Blog Posts

1. Create a new `.md` file in `content/posts/`
2. Follow the same frontmatter format as articles
3. Use LaTeX for equations: `$E = mc^2$` (inline) or `$$...$$` (block)

### Adding Experiments

1. Create a new `.md` file in `content/experiments/` with a descriptive slug (e.g., `14n-pg.md`)
2. Add comprehensive frontmatter:
```markdown
---
title: "$^{14}$N(p,$\\gamma$)$^{15}$O at Bellotti IBF"
date: "2024-06-15"
status: "ongoing"  # or "past"
pi: "Principal Investigator Name"
facility: "Facility Name"
excerpt: "Brief description for preview cards"
coverImage: "/images/experiments/your-image.jpg"
tags: ["tag1", "tag2", "tag3"]
---

## Overview
Your detailed experiment description...

## Scientific Goals
- Goal 1
- Goal 2

## Experimental Setup
Detailed methodology...
```

3. **Important fields:**
   - `status`: Must be either `"ongoing"` or `"past"`
   - Ongoing experiments automatically appear on the homepage
   - Use LaTeX for scientific notation in title and content
   - Tags help categorize experiments

### Adding Images

1. Place images in appropriate subdirectory in `public/images/`
2. Reference in markdown: `![Alt text](/images/folder/image.jpg)`
3. Next.js will automatically optimize images

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Component Development

The project uses:
- **shadcn/ui** for base components (in `components/ui/`)
- Custom components for page-specific features (in `app/components/`)
- Tailwind CSS for styling
- Framer Motion for animations

### Adding New Pages

1. Create a new directory in `app/` (e.g., `app/new-page/`)
2. Add a `page.tsx` file
3. The route will automatically be available at `/new-page`

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

Build the project:
```bash
npm run build
```

The output will be in the `.next` directory. Serve it using:
```bash
npm run start
```

## Environment Variables

Create a `.env.local` file for environment-specific variables (if needed):
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Add appropriate license information]

## Contact

For questions about the LUNA project or this website, please visit our [contact page](http://localhost:3000/contact).

---

Built with ❤️ by the LUNA Collaboration
