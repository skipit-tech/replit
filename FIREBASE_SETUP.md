# Firebase Setup Guide for Developers

This application is ready for Firebase integration. Follow these steps to enable authentication, database, and storage features.

## Prerequisites
- A Google account
- Access to [Firebase Console](https://console.firebase.google.com)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "skipit-prod")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"
5. (Optional) Enable **Google** sign-in:
   - Click on "Google"
   - Toggle "Enable" to ON
   - Enter your project support email
   - Click "Save"

## Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose a location (select closest to your users)
4. Start in **Production mode** (recommended) or Test mode
5. Click "Enable"

### Firestore Security Rules (Production Mode)

If you chose production mode, add these security rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

## Step 4: Enable Storage

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Choose your security rules (start in production mode)
4. Select the same location as your Firestore database
5. Click "Done"

### Storage Security Rules

Add these security rules for profile photos:

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile photos
    match /profile-photos/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
\`\`\`

## Step 5: Get Your Firebase Configuration

1. Go to Project Settings (gear icon in the left sidebar)
2. Scroll down to "Your apps" section
3. Click the Web icon `</>` to add a web app
4. Register your app with a nickname (e.g., "skipit-web")
5. Copy the `firebaseConfig` object values

## Step 6: Add Environment Variables

Add these environment variables to your project:

### For Local Development (.env.local)

Create a `.env.local` file in your project root:

\`\`\`bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable from above
4. Make sure they're available for Production, Preview, and Development
5. Redeploy your application

## Step 7: Test Your Integration

1. Restart your development server
2. The app should now connect to Firebase
3. Try creating an account on the sign-up page
4. Try editing your profile and uploading a photo
5. Check Firebase Console to see your data

## Troubleshooting

### "Firebase not configured" messages
- Double-check all environment variables are set correctly
- Ensure variable names start with `NEXT_PUBLIC_`
- Restart your development server after adding variables

### Authentication errors
- Verify Email/Password is enabled in Firebase Console
- Check that your domain is authorized in Firebase (Authentication > Settings > Authorized domains)

### Storage upload errors
- Confirm Storage is enabled
- Verify storage security rules are set correctly
- Check file size is under 5MB

### Firestore permission errors
- Review your Firestore security rules
- Ensure users are authenticated before accessing data

## Current Status

Without Firebase configuration, the app runs in **Demo Mode** with:
- Mock user profile data
- Temporary photo uploads (not persisted)
- Simulated profile updates

Once Firebase is configured, all features will work with real authentication and cloud storage.

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore)
- [Firebase Storage Guide](https://firebase.google.com/docs/storage)
