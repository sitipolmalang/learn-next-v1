This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## .env 
# Google OAuth / API Credentials
GOOGLE_CLIENT_ID="google_client_id"
GOOGLE_CLIENT_SECRET="google_client_secret"


# Database Credentials
NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET="your_nextauth_secret_here"
DATABASE_URL=postgres://username:password@localhost:5432/dbname

## .env.local
AUTH_SECRET="your_auth_secret"
