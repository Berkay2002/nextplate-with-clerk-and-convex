# Next.js Project Boilerplate with Clerk, shadcn/ui, and Convex

A clean, general-purpose boilerplate for setting up a Next.js project with Clerk authentication, shadcn/ui components, and Convex database.

> **Note:** This boilerplate provides a starting point for your Next.js application with modern authentication, UI components, and database solutions. You can extend it according to your project needs.

## Features

- **Authentication** with [Clerk](https://clerk.dev/)
- **UI components** with [shadcn/ui](https://ui.shadcn.com/)
- **Database** with [Convex](https://www.convex.dev/)
- **Type safety** with TypeScript
- **Styling** with Tailwind CSS
- **Routing** with Next.js App Router

## Project Structure

```
my-project/
├── app/
│   ├── (auth)/                # Authentication routes
│   │   ├── sign-in/[[...sign-in]]/
│   │   ├── sign-up/[[...sign-up]]/
│   │   └── onboarding/
│   ├── (dashboard)/           # Protected routes
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── layout.tsx         # Shared dashboard layout
│   ├── api/                   # API routes
│   │   └── webhooks/
│   │       └── clerk/
│   ├── globals.css
│   └── layout.tsx             # Root layout
├── components/
│   ├── auth/                  # Auth-related components
│   ├── dashboard/             # Dashboard components
│   ├── shared/                # Shared components (navbar, sidebar)
│   └── ui/                    # shadcn/ui components
├── convex/                    # Convex database
│   ├── _generated/
│   ├── auth.ts                # Auth functions
│   ├── schema.ts              # Schema definition
│   └── users.ts               # User data functions
├── lib/
│   └── utils.ts
├── public/
├── middleware.ts              # Clerk middleware
└── .env.local
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables in `.env.local`:

```
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_****
CLERK_SECRET_KEY=sk_test_****
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
CLERK_WEBHOOK_SECRET=whsec_****

# Convex
NEXT_PUBLIC_CONVEX_URL=https://******.convex.cloud
```

4. Initialize Convex:

```bash
npx convex dev
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- **Authentication**: Configure Clerk in the Clerk Dashboard
- **UI Components**: Add or customize shadcn/ui components
- **Database**: Modify the Convex schema in `convex/schema.ts`

## License

MIT

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
