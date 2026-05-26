# KitchenPro Academy - Deployment & Setup Guide

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Firebase
You need a Firebase project. Get one free at [console.firebase.google.com](https://console.firebase.google.com)

Create `.env.local`:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

**Demo Mode:** The app works without Firebase configured - you'll see demo data and can navigate all pages.

## Production Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository**
   - Push to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository

2. **Set Environment Variables**
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add all `NEXT_PUBLIC_FIREBASE_*` variables
   - Deploy will use these automatically

3. **One-Click Deploy**
   ```bash
   vercel deploy
   ```

### Deploy Anywhere Else

**Build:**
```bash
pnpm build
```

**Start:**
```bash
pnpm start
```

**Important:** Set environment variables before running `pnpm start`

## Firebase Setup

### Create Firestore Database

1. Go to Firebase Console
2. Select your project
3. Click "Cloud Firestore" → "Create Database"
4. Choose "Start in production mode"
5. Select region (e.g., asia-south1 for India)

### Firestore Security Rules

```firestore
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Public courses
    match /courses/{document=**} {
      allow read: if request.auth != null;
    }
    
    // Recipes are public
    match /recipes/{document=**} {
      allow read: if request.auth != null;
    }
    
    // User progress - private
    match /userProgress/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Exam attempts
    match /examAttempts/{document=**} {
      allow create: if request.auth != null;
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    
    // Leaderboard - public read
    match /leaderboard/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

### Enable Authentication

1. In Firebase Console → Authentication
2. Click "Get Started"
3. Enable "Email/Password" provider

## Vercel Blob Setup (Optional)

For video/PDF hosting:

1. Add Vercel Blob integration in Vercel dashboard
2. Add token to environment variables:
   ```
   BLOB_READ_WRITE_TOKEN=your-token
   ```

## Database Seeding

To populate initial data (courses, recipes, exams):

1. Create admin user
2. Use Admin Dashboard to add content
3. Or write a seed script using Firestore client

## Key Files to Know

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with auth provider |
| `lib/firebase.ts` | Firebase initialization |
| `lib/auth-context.tsx` | Authentication state |
| `app/(dashboard)/*` | User pages |
| `app/(admin)/*` | Admin pages |
| `lib/gamification-utils.ts` | Points/levels logic |

## Troubleshooting

### Firebase Error on Load
- Check `.env.local` has all variables
- Verify Firebase credentials are correct
- Try demo mode (leave env vars empty)

### Images Not Loading
- Check `public/images/` exists
- Ensure image paths in components match actual files
- For production, upload images to Vercel Blob

### Auth Not Working
- Verify Firebase Authentication is enabled
- Check Firestore rules allow writes to `/users/{userId}`
- Check browser console for specific errors

## Performance Tips

1. **Image Optimization**
   - Use `Image` component from next/image
   - Compress images before uploading
   - Use WebP format when possible

2. **Database**
   - Create indexes for filtered queries
   - Use collection groups for complex searches
   - Cache leaderboard data

3. **Caching**
   - Enable Next.js ISR for static pages
   - Cache course data at 1 hour intervals
   - Use Vercel Edge caching

## Monitoring & Analytics

Add to production:
- Vercel Analytics (automatic with Vercel)
- Sentry for error tracking
- Firebase Analytics for user behavior
- Custom dashboards in admin panel

## Next Steps

1. ✅ Deploy to Vercel or your server
2. ✅ Configure Firebase
3. ✅ Set up admin user
4. ✅ Add initial courses/recipes
5. ✅ Configure email notifications
6. ✅ Launch to users

## Support

For issues:
- Check browser console (F12)
- Review Firebase Console logs
- Check Vercel deployment logs
- Review application README.md

---

**Created for Chef Rovin Dhar's KitchenPro Academy**
