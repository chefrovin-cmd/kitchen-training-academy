# KitchenPro Academy - Complete Implementation

A premium culinary training platform built with Next.js 16, React 19, Firebase, and Vercel technologies. Created and curated by Chef Rovin Dhar.

## Project Features

### Core Functionality
- **User Authentication** - Firebase Auth with role-based access control
- **Interactive Dashboard** - Personalized learning hub with progress tracking
- **Course Management** - Browse, track, and complete structured culinary courses
- **Recipe Library** - Professional recipes with step-by-step instructions from Chef Rovin Dhar
- **Exam System** - Assessment with MCQ and image-based questions
- **Psychometric Tests** - Personality and leadership readiness assessments
- **Gamification** - Points, levels (Trainee → Executive Chef), badges, leaderboards
- **Responsive Design** - Optimized for mobile and desktop platforms

### Technical Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **File Storage**: Vercel Blob for video and PDF hosting
- **Icons**: Lucide React icons
- **UI Components**: shadcn/ui pre-built components

## Project Structure

```
/app
  /(auth)/ - Public authentication pages
    /login - User login
    /signup - Account creation
  /(dashboard)/ - Protected user interface
    /dashboard - Main dashboard with hero banner
    /courses - Course listing and details
    /recipes - Recipe browser and details
    /exams - Exam listing and testing interface
    /psychometric - Personality assessments
    /leaderboard - User rankings
  /(admin)/ - Admin management interface
    /admin/dashboard - Admin controls

/components
  /dashboard - Sidebar, header, layout components
  /gamification - Badge showcase, level progression
  /ui - shadcn/ui components

/lib
  /firebase.ts - Firebase initialization
  /auth-context.tsx - Authentication state management
  /auth-service.ts - Auth operations
  /firestore-service.ts - Database operations
  /types.ts - TypeScript type definitions
  /gamification-utils.ts - Points, levels, badge logic

/public/images
  /chef - Chef Rovin Dhar and staff photos
  /kitchens - Commercial kitchen environments
  /recipes - Food photography and plating
  /backgrounds - UI background images
  /certificates - Certificate templates
```

## Design System

### Color Palette (Premium Culinary Theme)
- **Primary**: Warm Gold (oklch 0.55 0.18 65) - Main brand color
- **Secondary**: Warm Rust (oklch 0.62 0.15 35) - Accents
- **Accent**: Warm Orange (oklch 0.58 0.2 40) - Call-to-action
- **Background**: Cream White (light) / Deep Charcoal (dark)
- **Neutral**: Warm grays and off-whites

### Visual Elements
- Professional high-resolution photography throughout
- Chef Rovin Dhar featured prominently on dashboard and certificates
- Commercial kitchen imagery for course headers
- Premium food photography for recipes
- Smooth animations for achievements and level ups

### Typography
- **Sans-serif**: Geist font family (Google Fonts)
- **Mono**: Geist Mono for code/technical content

## Key Features Deep Dive

### Dashboard
The main user hub featuring:
- Hero banner with Chef Rovin Dhar's image and branding
- Real-time stats: Points earned, current level, badges, learning streak
- Assigned courses with progress visualization
- Quick access buttons to main sections
- Daily challenge for bonus points

### Gamification System
**5-Level Progression:**
1. Trainee (0-500 points)
2. Junior Chef (500-1500 points)
3. Senior Chef (1500-3000 points)
4. Head Chef (3000-5000 points)
5. Executive Chef (5000+ points)

**8 Badge Types:**
- Food Safety Master
- Knife Skills Expert
- Recipe Creator
- Exam Champion
- Consistency King
- Team Player
- Leadership Ready
- Culinary Excellence

**Points System:**
- Course completion: 100 points
- Exam pass: 150 points
- Badge unlock: 200 points
- Lesson completion: 25 points
- Daily login: 10 points

### Courses
Structured learning modules including:
- FSSAI Fundamentals (Food Safety)
- Advanced Knife Skills
- Food Safety Mastery
- And more professional courses

Each course includes:
- Progress tracking with lesson checkmarks
- Video and text-based content
- Professional instructor guidance from Chef Rovin Dhar
- Completion certificates
- Estimated duration and difficulty levels

### Recipes
Professional recipe collection featuring:
- Step-by-step instructions with images
- Ingredient lists with proper measurements
- Chef's pro tips for techniques
- Nutrition information per serving
- Save and share functionality
- Multiple cuisine categories

### Exams & Assessments
- Multiple choice questions (MCQ)
- Image-based questions for visual learning
- Timer functionality with countdown
- Negative marking system
- Certificate generation upon passing
- Detailed results analysis

### Psychometric Tests
- Leadership readiness assessments
- Chef personality profiles
- Stress management evaluations
- Detailed personality insights
- Career development recommendations

### Leaderboard
- Real-time ranking system by points
- Top 3 featured prominently with medals
- Full leaderboard with peer rankings
- Level and badge display
- Competitive gamification

## Setup Instructions

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Firebase project account

### Installation

1. **Clone and Install**
```bash
git clone <repository>
cd kitchenpro-academy
pnpm install
```

2. **Configure Firebase**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

3. **Run Development Server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
pnpm build
pnpm start
```

## Firestore Schema

### Collections
- **users** - User profiles and metadata
- **courses** - Course content and structure
- **lessons** - Individual lesson content
- **recipes** - Recipe database
- **exams** - Exam definitions and questions
- **examAttempts** - User exam attempt history
- **psychometricTests** - Assessment definitions
- **badges** - Badge definitions and unlock criteria
- **userProgress** - Individual progress tracking
- **leaderboard** - Cached ranking data
- **notifications** - User notifications

## Authentication & Authorization

### User Roles
- **Staff** (default) - Standard users with course access
- **Trainer** - Can create and modify courses
- **Chef** - Senior instructor role
- **Admin** - Full system access

Role-based access controlled via middleware and route protection.

## Performance Optimizations

- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Firebase Firestore for real-time data
- Progressive image loading
- Optimized animations with CSS transitions
- Mobile-first responsive design

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## API Integrations

- **Firebase Auth** - User authentication and session management
- **Firestore** - NoSQL database for all data
- **Firebase Storage** - File storage for media
- **Vercel Blob** - Optimized file serving for videos/PDFs
- **Firebase Messaging** (Future) - Push notifications

## Environment Variables

See `.env.example` for all required environment variables.

All `NEXT_PUBLIC_*` variables are exposed to the browser and safe to commit.

## Deployment

### Deploy to Vercel
```bash
vercel deploy
```

The application is optimized for Vercel deployment with:
- Next.js 16 support
- Automatic HTTPS
- Edge caching
- Serverless functions
- Blob integration

### Deploy to Other Platforms
Build command: `pnpm build`
Start command: `pnpm start`

## Future Enhancements

- Real-time notifications and messaging
- Video streaming integration
- Advanced analytics dashboard
- Mobile app versions (React Native)
- Multilingual support (English/Hindi)
- Integration with kitchen management systems
- QR code attendance tracking
- Advanced psychometric scoring
- AI-powered learning recommendations

## Contributing

This project was built by the v0 AI assistant for Chef Rovin Dhar's culinary training platform.

## License

Proprietary - Chef Rovin Dhar's KitchenPro Academy

## Contact

For inquiries about KitchenPro Academy, contact Chef Rovin Dhar through the academy website.

---

**Build Date:** May 26, 2026
**Version:** 1.0.0
**Status:** Production Ready
