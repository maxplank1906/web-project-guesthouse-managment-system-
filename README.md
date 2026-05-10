# Family Palace Guesthouse Management System

A premium, full-stack web application built for **Family Palace Guesthouse** in Islamabad (G-13). This system provides a seamless experience for guests to explore rooms, view gallery highlights, and manage reservations, while offering a robust administrative dashboard for management.

## 🏨 Features

### For Guests
- **Premium UI/UX:** A high-end, responsive design built with a "Luxury Slate" aesthetic.
- **Room Selection:** Browse different categories (Standard, Family, Executive) with detailed features and live pricing.
- **Dynamic Gallery:** A masonry-style gallery showing the guesthouse interiors and facilities.
- **WhatsApp Integration:** Direct booking and concierge support via WhatsApp.
- **Secure Authentication:** Guest accounts powered by Firebase (Google Login & Email/Password).
- **Reservation History:** Personal dashboard to track the status of current and past bookings.

### For Administrators
- **Executive Dashboard:** Real-time overview of revenue, active bookings, and user growth.
- **Booking Management:** Interface to accept, reject, or delete reservation requests.
- **Room Management:** Update room availability, pricing, and details in real-time.
- **User Management:** Monitor active guest accounts.
- **Dynamic Content:** Ability to update the gallery and site configurations via Firestore.

## 🛠 Tech Stack

- **Frontend:** React 18 with TypeScript & Vite
- **Styling:** Tailwind CSS (Modern Utility-First)
- **Animations:** Framer Motion (`motion/react`)
- **Database:** Firebase Firestore (NoSQL)
- **Authentication:** Firebase Auth
- **Icons:** Lucide React
- **Deployment:** Vercel / Cloud Run

## 🚀 Getting Started

### 1. Environment Variables
To run this project, you need to configure your Firebase credentials. Create a `.env` file in the root (refer to `.env.example`):

```env
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_APP_ID=your_id
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_FIRESTORE_DATABASE_ID=(default)
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_MEASUREMENT_ID=your_id
```

> **Note:** If you are pasting values into Vercel or other environments, avoid using quotes around the values (e.g., use `my-project-id` instead of `"my-project-id"`). The app includes a utility to automatically clean up accidental quotes if they are added.

### 2. Installation
```bash
npm install
```

### 3. Development
```bash
npm run dev
```

### 4. Build
```bash
npm run build
```

## 🛡 Security Rules

The project includes a hardened `firestore.rules` file that implements:
- **RBAC (Role-Based Access Control):** Only users verified as "Admins" in the database can access management functions.
- **Validation Blueprints:** Strict schema validation for every write operation to prevent data corruption.
- **Relational Integrity:** Ensures bookings are always linked to valid users and rooms.

## 📸 Image Handling

The application uses a custom `LazyImage` component for performance. 
- **Auto-Optimization:** A utility in `src/lib/utils.ts` handles pathing for local assets and external URLs.
- **Error Handling:** Graceful fallbacks if a remote image fails to load.

---

*Developed by abdulmoiz*
