# Promptopia 🚀

An open-source AI prompt discovery and sharing web platform built with the **Next.js 13 App Router**, **React**, **Tailwind CSS**, **MongoDB**, and **NextAuth.js**.

---

## Overview

**Promptopia** is a collaborative platform designed for AI practitioners and enthusiasts to discover, craft, and share creative prompts for modern AI models like ChatGPT, Claude, and Midjourney. Built as a hands-on exploration of the Next.js App Router, it demonstrates full-stack features including serverless API route handlers, database persistence with Mongoose, OAuth authentication, and interactive client-side filtering.

---

## Key Features

- **Prompt Discovery Feed**: Explore AI prompts shared by community members with real-time keyword, tag, and username filtering.
- **Tag-Based Exploration**: Click any tag (e.g., `#webdev`, `#idea`, `#productivity`) to instantly filter the feed by that topic.
- **Google OAuth Authentication**: Secure authentication powered by NextAuth.js with automatic MongoDB user profile synchronization.
- **Full CRUD Management**: Authenticated users can create, edit, and delete their own prompt cards.
- **Creator Profiles**: Personalized profile pages showcasing all prompts authored by a specific user.
- **One-Click Clipboard Copy**: Built-in copy-to-clipboard button on every card with visual checkmark confirmation.
- **Framer Motion Animations**: Smooth page transitions, hover states, and card reveal animations.
- **Route Protection**: Edge-based route protection using Next.js `middleware.js` to safeguard creation and editing routes.

---

## Tech Stack & Architecture

- **Framework**: [Next.js 13](https://nextjs.org/) (App Router, Server Components, Route Handlers)
- **Frontend**: React 18, Tailwind CSS, Framer Motion, React Hot Toast
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Google OAuth 2.0)
- **Database & ORM**: MongoDB with [Mongoose](https://mongoosejs.com/)
- **Icons & Assets**: Custom SVG icon suite

```
promptopia/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js   # NextAuth Google OAuth handler
│   │   ├── prompt/
│   │   │   ├── new/route.js              # POST: Create prompt endpoint
│   │   │   ├── [id]/route.js             # GET, PATCH, DELETE prompt by ID
│   │   │   └── route.js                  # GET: All prompts feed endpoint
│   │   └── users/[id]/posts/route.js     # GET: Prompts by user ID
│   ├── create-prompt/page.jsx            # Create prompt route
│   ├── update-prompt/page.jsx            # Edit existing prompt route
│   ├── profile/                          # My Profile & Member Profile routes
│   ├── layout.jsx                        # Root layout with SessionProvider
│   └── page.jsx                          # Home feed landing page
├── components/
│   ├── Feed.jsx                          # Search bar & dynamic prompt feed
│   ├── Form.jsx                          # Reusable creation / editing form
│   ├── Nav.jsx                           # Responsive navbar with user drawer
│   ├── Profile.jsx                       # Profile grid layout
│   ├── PromptCard.jsx                    # Prompt card with copy action
│   └── Provider.jsx                      # NextAuth SessionProvider wrapper
├── models/
│   ├── Prompt.js                         # Mongoose prompt schema
│   └── User.js                           # Mongoose user profile schema
├── utils/
│   └── dbConfig.js                       # Cached MongoDB connection pool
├── middleware.js                         # Next.js route protection middleware
└── tailwind.config.js                    # Tailwind styling configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **MongoDB Database**: Local instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- **Google Cloud Console**: OAuth 2.0 Client ID and Secret

### 1. Clone the Repository

```bash
git clone git@github.com:iamjunaidjutt/promptopia.git
cd promptopia
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env` (or `.env.local`) file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/promptopia?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore Promptopia.

---

## License

This project was developed for educational and training purposes.
