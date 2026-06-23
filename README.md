# Grocify

> Plan smarter. Shop happier.

Grocify is a smart grocery shopping list manager for iOS and Android. Organize your list by category and priority, track quantities, and gain insights into your shopping habits — all synced to the cloud with real-time updates.

## Features

- **Shopping List** — Add, remove, and manage grocery items with name, category, quantity, and priority
- **Categories** — Organize items across Produce, Dairy, Meat, Bakery, Frozen Foods, Beverages, Snacks, Household Items, and Personal Care
- **Priority Levels** — Mark items as Low, Medium, or High priority
- **Completed Items** — Toggle items as purchased and clear them in bulk
- **Planner** — View live stats (pending count, high-priority items, total units) before you shop
- **Insights** — User profile and shopping analytics
- **Authentication** — Sign in with Google, Facebook, or GitHub via Clerk SSO

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Expo SDK 56 / React Native 0.85 |
| Routing | Expo Router (file-based) |
| Styling | NativeWind 4 (Tailwind CSS) |
| State | Zustand 5 |
| Database | PostgreSQL (Neon serverless) |
| ORM | Drizzle ORM |
| Auth | Clerk (Google, Facebook, GitHub OAuth) |
| Language | TypeScript |

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- A [Clerk](https://clerk.com) project with Google, Facebook, and GitHub OAuth configured
- A [Neon](https://neon.tech) PostgreSQL database

### Environment Variables

Create a `.env.local` file in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_DATABASE_URL=your_neon_postgres_connection_string
```

### Install & Run

```bash
npm install
```

Push the database schema:

```bash
npx drizzle-kit push
```

Start the development server:

```bash
npx expo start
```

Then open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), or [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/).

## Project Structure

```
src/
  app/                  # Expo Router screens
    (auth)/             # Sign-in screen
    (tabs)/             # Main tab screens (List, Planner, Insights)
    api/                # API route handlers
  components/           # Shared UI components
  hooks/                # Custom hooks (useSocialAuth)
  lib/
    db/                 # Drizzle schema, client, and actions
    env.ts              # Validated environment variables
  store/                # Zustand grocery store
  types/                # Shared TypeScript types
```

## Database Schema

```
groceryItems
├── id          text (primary key, UUID)
├── name        text
├── category    text
├── quantity    integer (default: 1)
├── purchased   boolean (default: false)
├── priority    "low" | "medium" | "high" (default: "medium")
└── updatedAt   bigint
```

## API Routes

| Method | Path | Description |
|---|---|---|
| GET | `/api/items` | List all items |
| POST | `/api/items` | Create a new item |
| PATCH | `/api/items/[id]` | Update quantity or purchased status |
| DELETE | `/api/items/[id]` | Delete an item |
| DELETE | `/api/items/clear-purchased` | Delete all purchased items |
