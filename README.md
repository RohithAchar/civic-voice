# CivicVoice: Smart Citizen Engagement Platform

CivicVoice is a transparent, accountability-driven platform that bridges citizens and civic authorities. **Current hackathon MVP:** capture an issue and email it straight to BBMP so it lands in the right inbox immediately.

## 🎯 The Problem

In Bangalore, civic issues go unresolved not because authorities don't care, but because of broken communication:

- BBMP receives 500+ complaints daily through phone calls, emails, and in-person visits
- Citizens have **ZERO visibility** on complaint status after filing
- No accountability - complaints disappear into a black hole
- No data-driven decision making for municipalities
- Citizens lose trust and stop reporting issues

**Real Example:** A pothole near your college has been there for 3 months. People complain, but nobody knows if BBMP even received it, who's assigned to it, or when it'll be fixed.

## 💡 The Solution

CivicVoice is a transparent, accountability-driven platform that bridges citizens and civic authorities.

### For Citizens:

- Report any civic issue in under a minute (photo + location + description + severity)
- Email goes directly to BBMP (MVP flow)

### For Municipal Authorities (future):

- Centralized dashboard showing all complaints
- Categorization of issues by type and severity
- Priority scoring based on severity, location, and number of reports
- Route optimization for field workers (save time and fuel)
- Analytics showing hotspots, trends, and resolution metrics

### For Everyone (future):

- Public transparency dashboard showing:
  - Total complaints vs resolved
  - Average resolution time
  - Most reported issues by area
  - Authority performance metrics

## 🚀 Current MVP (Hackathon)

1. Take a photo or upload one (camera-first mobile flow)
2. Auto-capture GPS location (with manual override)
3. Add description, category, and severity
4. We generate an email and send it directly to BBMP
5. You get a simple confirmation that it was sent

## 🔜 Roadmap (post-MVP)

- Real-time tracking and status updates
- Interactive map of all issues
- Admin dashboard for authorities
- Analytics (hotspots, trends, resolution metrics)
- Gamification (points, badges, leaderboards)

## 🎨 User Journey

### Citizen Flow:

1. Opens app/website
2. Clicks "Report Issue"
3. Takes photo of pothole
4. App auto-detects location and suggests category
5. Adds brief description
6. Submits
7. Gets unique complaint ID
8. Receives notification when BBMP assigns it to a worker
9. Gets update when work is in progress
10. Gets final notification when resolved with before/after photos

### Authority Flow:

1. Logs into admin dashboard
2. Sees 50 new complaints today
3. Filters by "high priority" and "roads"
4. Assigns 10 complaints to Field Worker A
5. Field Worker A gets notification with optimized route
6. Updates status to "in progress"
7. Completes work and uploads after-photo
8. Marks as "resolved"
9. Citizen gets notification automatically

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Shadcn UI** - Beautiful, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend & Database

- **PostgreSQL** - Relational database
- **Prisma ORM** - Type-safe database client
- **Next.js API Routes** - Serverless API endpoints

### Authentication

- **Clerk** - Complete authentication solution
- Automatic user sync to database on login

### Media & Storage

- **Cloudinary** - Image and video management platform
  - Image upload and storage
  - Automatic optimization and transformations
  - CDN delivery for fast loading

### Development Tools

- **TypeScript/JavaScript** - Type safety and modern JS
- **ESLint** - Code linting
- **Prisma Studio** - Database GUI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Clerk account ([Sign up here](https://clerk.com))
- Cloudinary account ([Sign up here](https://cloudinary.com)) - for image storage

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary (Image Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Setup Steps

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up your database:**

   ```bash
   npm run prisma:migrate
   ```

3. **Configure Clerk:**

   - Sign up at [clerk.com](https://clerk.com) and create a new application
   - Copy your publishable key and secret key to `.env`
   - Users will automatically be saved to your database when they log in (no webhook setup needed!)

4. **Configure Cloudinary:**

   - Sign up at [cloudinary.com](https://cloudinary.com) (free tier available)
   - Get your Cloud Name, API Key, and API Secret from the dashboard
   - Add them to your `.env` file
   - Cloudinary will handle all image uploads, storage, and optimization

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database Management

- Generate Prisma Client: `npm run prisma:generate`
- Create migration: `npm run prisma:migrate`
- Open Prisma Studio: `npm run prisma:studio`
- Push schema changes: `npm run prisma:push`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
