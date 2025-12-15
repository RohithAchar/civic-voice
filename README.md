This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- ✅ Next.js 16 with App Router
- ✅ Clerk Authentication
- ✅ PostgreSQL with Prisma ORM
- ✅ Shadcn UI Components
- ✅ Automatic user sync to database on login

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Clerk account ([Sign up here](https://clerk.com))

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
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

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
