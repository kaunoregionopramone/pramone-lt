# Kauno Krašto Pramonininkų ir Darbdavių Asociacija

Modern website for the Kaunas Region Industrialists and Employers Association, built with Next.js and featuring a comprehensive member directory.

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Member Directory**: Comprehensive listing of association members with detailed profiles
- **News & Events**: Publishable news articles and events with custom publication dates
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Content Management**: Integrated with Sanity CMS for easy content updates
- **SEO Optimized**: Built-in metadata, Open Graph images, and sitemap generation
- **Social Sharing**: Automatic preview images for social media sharing
- **Performance**: Optimized images, fonts, and loading speeds

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Icons**: React Icons (Font Awesome)
- **Deployment**: Vercel
- **Analytics**: Vercel Speed Insights

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Sanity project credentials in `.env.local`

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the website

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   ├── Header.tsx      # Site navigation
│   │   ├── Footer.tsx      # Site footer
│   │   ├── MemberItem.tsx  # Member card component
│   │   └── ...
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home/Members page
├── public/                 # Static assets
│   └── images/            # Image assets
├── sanity/                # Sanity CMS configuration
│   └── lib/               # Sanity utilities and queries
└── ...
```

## 🎨 Design Features

- **Hero Section**: Clean introduction with organization branding
- **Member Cards**: Interactive cards with hover effects and company logos
- **Contact Information**: Prominent display of association contact details
- **Navigation**: Smooth navigation with active state indicators
- **Animations**: Subtle fade-in animations for enhanced user experience

## 📱 Member Profiles Include

- Company name and logo
- Business address
- Leadership information
- Business activity description
- Visual indicators for easy scanning

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **Header**: Navigation with contact information and social links
- **MemberItem**: Individual member card with company details
- **Footer**: Organization information and additional links

## 🌐 Environment Variables

Create a `.env.local` file with:

```env
# Required - Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
SANITY_API_TOKEN=your_api_token

# Optional - Site URL for Open Graph metadata
# If not set, relative URLs will be used for OG images
NEXT_PUBLIC_SITE_URL=https://www.pramone.lt
```

## 📄 Content Management

The website uses Sanity CMS for content management. Content types include:

### Members (Nariai)
- Company information
- Contact details  
- Business activity
- Logo/branding assets

### News & Events (Naujienos ir Renginiai)
- Publication date (publikavimo data) - used for sorting
- News articles and event announcements
- Cover images
- Event-specific fields (dates, location, registration)

### Leadership (Vadovybė)
- Leadership team profiles
- Contact information

### Organization Settings
- About KKPDA content
- Mission & Vision statements
- Partners
- Legal documents

## 🚀 Deployment

The project is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on every push to main

## 📞 Contact Information

**Kauno Krašto Pramonininkų ir Darbdavių Asociacija**
- Address: Donelaičio g. 2, 119 kab., Kaunas
- Phone: +370 37 409 578
- Email: info@pramone.lt
- Company Code: 134778710

## 📝 License

This project is proprietary and confidential.

---

Built with ❤️ for the Kaunas business community
