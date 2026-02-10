# ChatterBox on Firebase Studio

This is a Next.js real-time chat application built with Firebase and ShadCN UI.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Firebase Setup

This project uses Firebase Firestore for real-time chat functionality. To get it working, you need to:

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2.  **Register a Web App**: In your project's dashboard, go to **Project Settings** > **General**. Under "Your apps", click the web icon (`</>`) to register a new web app.

3.  **Get Firebase Config**: After registering, Firebase will provide you with a `firebaseConfig` object. You will need these values.

4.  **Set Environment Variables**: Create a file named `.env.local` in the root of your project (next to `package.json`). Add your Firebase config values to this file, prefixed with `NEXT_PUBLIC_`:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

5.  **Set up Firestore**: In the Firebase Console, go to the **Firestore Database** section in the left sidebar.
    *   Click **Create database**.
    *   Choose to start in **test mode**. This allows open access for development. You can (and should) secure this with security rules later for a production app.
    *   Choose a location for your database.
    *   The application will automatically create a `messages` collection when the first message is sent.

Once these steps are complete, restart your development server (`npm run dev`) for the environment variables to be loaded. You should now be able to use the chat application.

---

To learn more about what you can do with this starter, take a look at `src/app/page.tsx`.
