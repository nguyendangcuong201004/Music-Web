# Music-Web

Music-Web is a full-stack online music streaming platform built with Node.js, TypeScript, Express and MongoDB. It renders pages on the server using the Pug template engine (SSR) and ships with an admin dashboard for managing topics, songs, singers, roles, admin accounts and site settings. Images and audio files are stored on Cloudinary, and the application is deployed to Vercel as a Serverless Function.

Live demo: https://music-web-eta.vercel.app/topics

## Features

### Client
- Browse music topics and view songs grouped by topic
- Song detail page with audio playback and lyrics
- Like a song, add songs to favorites, and track listen counts
- Playlist page
- Song search that supports diacritic-insensitive matching (powered by `unidecode`), returning both an HTML results page and a JSON endpoint for search suggestions

### Admin (`/admin`)
- Login, register and logout with cookie-based token authentication
- Role management (CRUD) and a permission matrix page that assigns fine-grained permissions per role (view / create / edit / delete for each module)
- Permission checks enforced in every admin controller; unauthorized access returns a dedicated 403 page
- Topic management: full CRUD, soft delete, status toggle, thumbnail upload to Cloudinary
- Song management: full CRUD with avatar and audio uploads to Cloudinary, lyrics, status toggles and soft delete
- Singer management: full CRUD with avatar upload, song counts per singer and soft delete
- Admin account management: full CRUD with role assignment, duplicate-email validation, MD5-hashed passwords and audit fields (createdBy, updatedBy, deletedBy)
- User account management: list, create, edit, delete and status toggles
- Personal profile page (`/admin/my-account`) for viewing and editing the logged-in account
- General settings page (website name, phone, email, address, copyright) stored as a single document in MongoDB
- Rich text editing with TinyMCE, including image upload directly to Cloudinary

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Web framework | Express.js |
| View engine | Pug (server-side rendering) |
| Database | MongoDB with Mongoose ODM |
| Slug generation | mongoose-slug-updater |
| File uploads | Multer (memory storage) streamed to Cloudinary |
| Sessions and flash messages | express-session, connect-flash, express-flash, cookie-parser |
| Other libraries | method-override, streamifier, unidecode |
| Deployment | Vercel Serverless Functions |

## Architecture

The application follows a classic layered MVC structure with server-side rendering:

```
Request
  |
  v
index.ts (Express app)
  |-- static assets (/public, /tinymce from node_modules)
  |-- cookie-parser, express-session, express-flash, method-override, body-parser
  |
  +-- routes/client/*   --> client controllers --> Pug views (topics, songs, search)
  |
  +-- routes/admin/*    --> requireAuth middleware (validates token cookie,
  |                          loads res.locals.user and res.locals.role)
  |                          |
  |                          +--> controller-level permission checks
  |                                 (checkPermission against role.permissions)
  |                                 |
  |                                 +--> controllers --> Mongoose models --> MongoDB
  |                                 |
  |                                 +--> multer (memory) --> Cloudinary helper --> media URL
  |
  v
Pug views rendered on the server (layouts, partials, mixins)
```

Key architectural points:
- `config/database.ts` opens a single Mongoose connection at startup; `config/system.ts` holds the `/admin` URL prefix used across routes and views.
- Uploads never touch disk: Multer keeps files in memory, `middlewares/admin/uploadCloud.middleware.ts` streams each buffer to Cloudinary via `helpers/uploadToCloudiary.helper.ts`, then rewrites `req.body[field]` with the resulting CDN URL.
- Authentication uses a random 30-character token stored on the Account document and in a browser cookie; `middlewares/admin/auth.middleware.ts` resolves the current user and role on every admin request.
- Authorization is data-driven: each Role stores a flat array of permission keys (for example `songs_edit`, `roles_permissions`), editable from the permissions matrix UI.
- Deletes are soft by default (`deleted: true` plus `deletedAt`) so records can be recovered.
- For Vercel, `index.ts` exports the Express app as the Serverless Function handler when `NODE_ENV=production`; locally it starts an HTTP listener on `process.env.PORT`.

### Project Structure

```
Music-Web/
├── config/
│   ├── database.ts            # MongoDB connection (Mongoose)
│   └── system.ts              # Shared config (admin URL prefix)
├── controllers/
│   ├── admin/                 # Auth, dashboard, my-account, topics, songs,
│   │                          # singers, roles, accounts, users, settings, upload
│   └── client/                # Topics, songs, search
├── helpers/
│   ├── generate.helper.ts     # Random string generator (auth tokens)
│   ├── hashPassword.helper.ts # Password hashing
│   ├── storage.helper.ts      # Multer memory storage
│   └── uploadToCloudiary.helper.ts # Stream buffer upload to Cloudinary
├── middlewares/
│   └── admin/
│       ├── auth.middleware.ts        # requireAuth, checkPermission, notPermission (403 page)
│       └── uploadCloud.middleware.ts # Buffer-to-Cloudinary upload middleware
├── models/                    # Mongoose schemas: Song, Topic, Singer, Role,
│                              # Account, User, FavoriteSong, Setting
├── routes/
│   ├── client/                # Public routes
│   └── admin/                 # Protected admin routes
├── views/
│   ├── client/                # Client-facing Pug templates
│   └── admin/                 # Admin templates (layouts, partials, mixins,
│                              # auth pages, error pages, module pages)
├── public/                    # Static assets served at /
├── dist/                      # Compiled JavaScript output (deployed to Vercel)
├── index.ts                   # Application entry point
├── vercel.json                # Vercel build/route configuration
└── tsconfig.json              # TypeScript configuration
```

### Data Model

| Model | Collection | Purpose |
|---|---|---|
| Song | songs | title, avatar, description, singerId, topicId, like, listen, lyrics, audio, slug, status, deleted |
| Topic | topics | title, avatar, description, slug, status, deleted |
| Singer | singers | fullName, avatar, slug, status, deleted |
| Role | roles | title, description, permissions (array of permission keys), deleted |
| Account | accounts | admin users: fullName, email, password, token, phone, avatar, roleId, status, audit fields |
| User | users | client users: fullName, email, password, phone, avatar, status |
| FavoriteSong | favorite-songs | userId and songId pairs for favorites |
| Setting | settings | single document holding general site settings |

## Getting Started

### Prerequisites
- Node.js 18 or later (LTS recommended)
- npm
- A free MongoDB Atlas account
- A free Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/nguyendangcuong201004/Music-Web.git
cd Music-Web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MongoDB Atlas

1. Create a free account at https://www.mongodb.com/cloud/atlas and create an M0 (free tier) cluster.
2. Under Database Access, create a database user with read/write privileges.
3. Under Network Access, allow connections from anywhere (`0.0.0.0/0`) for local development and Vercel.
4. From the Database Connect dialog, choose Drivers (Node.js) and copy the connection string.
5. Replace `<password>` with your real password and append a database name after `.mongodb.net/`, for example:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/music-web?retryWrites=true&w=majority
```

Collections are created automatically by Mongoose when the first documents are saved.

### 4. Set up Cloudinary

1. Create a free account at https://cloudinary.com.
2. Open the Dashboard and locate the API Keys section.
3. Copy the `Cloud Name`, `API Key` and `API Secret`. These are required for image and audio uploads from the admin panel (and TinyMCE image uploads).

### 5. Create the environment file

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/music-web?retryWrites=true&w=majority
CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_api_key
CLOUD_SECRET=your_api_secret
```

Required environment variables:

| Variable | Description |
|---|---|
| PORT | Port for the local development server |
| NODE_ENV | Set to `production` on Vercel so the app is exported as a Serverless Function instead of listening on a port |
| MONGO_URL | MongoDB Atlas connection string |
| CLOUD_NAME | Cloudinary cloud name |
| CLOUD_KEY | Cloudinary API key |
| CLOUD_SECRET | Cloudinary API secret |

### 6. Build and run

```bash
# Compile TypeScript to dist/
npx tsc

# Start the development server (nodemon + ts-node)
npm start
```

Then open http://localhost:3000.

Main URLs:

| Page | Path |
|---|---|
| Topics | `/topics` |
| Songs by topic | `/songs/:topicSlug` |
| Song detail | `/songs/detail/:songSlug` |
| Playlist | `/songs/playlist` |
| Search results | `/search/result?keyword=...` |
| Search suggestions (JSON) | `/search/suggest?keyword=...` |
| Admin login | `/admin/auth/login` |
| Admin register | `/admin/auth/register` |
| Admin dashboard | `/admin/dashboard` |

First run workflow:
1. Register the first admin account at `/admin/auth/register`.
2. Optionally create roles at `/admin/roles/create` and assign permissions at `/admin/roles/permissions`.
3. Create singers under `/admin/singers`, topics under `/admin/topics`, then songs under `/admin/songs`.

## Deployment on Vercel

The app runs as a Vercel Serverless Function defined in `vercel.json`, which points all traffic at `dist/index.js`. Because of this, compiled output must be committed together with its runtime assets.

1. Build and sync assets before committing:

```bash
npx tsc && cp -r views public dist/
```

2. Commit and push the code, including the `dist/` directory.
3. In Vercel, import the GitHub repository (default settings; `vercel.json` handles the rest).
4. Configure Environment Variables in Project Settings:

| Variable | Value |
|---|---|
| NODE_ENV | production |
| MONGO_URL | Your MongoDB Atlas connection string |
| CLOUD_NAME | Your Cloudinary cloud name |
| CLOUD_KEY | Your Cloudinary API key |
| CLOUD_SECRET | Your Cloudinary API secret |

5. Deploy.

Note: `NODE_ENV=production` is required. When it is set, the entry point exports the Express app for the Serverless runtime instead of calling `app.listen()`. Missing this variable (or `MONGO_URL`) causes `FUNCTION_INVOCATION_FAILED` errors on Vercel.
