# Garage Bouaïla

Premium automotive garage website for Garage Bouaïla in Safi, Morocco.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Firebase Auth, Firestore, and Storage for the admin dashboard
- Vercel-ready deployment

## Pages

- `/` public landing page with hero, vehicles, services, about, before/after, gallery, reviews, contact, map placeholder, and footer
- `/contact` direct contact page
- `/admin` owner dashboard for services, repair photos, phone, opening hours, and reviews

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Firebase Setup

Create a Firebase project, enable Email/Password Authentication, Firestore, and Storage.

Create `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

Do not invent the WhatsApp number. Add the real number in international format when available, for example `2126XXXXXXXX`.

## Images

All public website images are local and organized in:

```text
public/images/hero
public/images/vehicles
public/images/services
public/images/garage
public/images/before-after
public/images/logo
```

Replace these files with real Garage Bouaïla photos when available, keeping the same paths or updating `src/lib/images.ts`.

## Vercel Deployment

1. Push the project to GitHub.
2. Import it in Vercel.
3. Add the Firebase and WhatsApp environment variables in Vercel Project Settings.
4. Deploy.
