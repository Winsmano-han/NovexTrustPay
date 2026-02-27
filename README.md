# NovexTrustPay React Platform

Production-ready React + TypeScript banking frontend with modern UI, OTP verification flow, password recovery, and transaction PIN integration through Supabase.

## Stack
- React 19 + TypeScript + Vite
- Framer Motion (scroll/entrance animations)
- React Hook Form + Zod validation
- Supabase (Auth + Postgres + RPC)

## Local Run
```bash
npm install
npm run dev
```

## Environment
Create `.env` from `.env.example`:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup
1. Open Supabase SQL editor.
2. Run `supabase/schema.sql`.
3. In Supabase Auth settings:
   - enable Email OTP sign-in
   - enable email/password sign-up

## Auth Flows Implemented
- Register: 4-step onboarding -> email OTP verification
- Login: email/password or email OTP
- Forgot password: OTP-based recovery path
- Reset password: secure update after OTP session
- Transaction PIN: secure hash storage via Postgres RPC `set_transaction_pin`

## Pages
- `/` Home
- `/login`
- `/register`
- `/verify-otp`
- `/forgot-password`
- `/reset-password`
- `/dashboard`

## Build
```bash
npm run build
```

## Deploy (Vercel)
```bash
vercel --prod
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel Project Settings -> Environment Variables.
