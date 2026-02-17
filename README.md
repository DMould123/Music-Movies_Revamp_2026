# React Music & Movies Revamp 2026 🎬🎵✨

A full-stack MERN application for browsing movies and music albums with user authentication, favorites, and CRUD operations. Originally created as a 2023 school exam project, now completely revamped with modern best practices, retro-future Y2K aesthetic, and enterprise-grade security.

## ✨ Features

- 🔐 **Authentication**: JWT-based auth with secure httpOnly cookies (username-free registration)
- 🎬 **Movies**: Browse, search, view details with advanced filtering
- ⏱️ **Runtime Sorting**: Sort movies by longest/shortest runtime
- � **Albums**: Browse vinyl collection with responsive carousel
- 🔀 **Album Filters**: Sort by album duration (longest/shortest) or release year (oldest/newest)
- �🌙 **Dark/Light Theme Toggle**: Switch between themes with localStorage persistence
- 📱 **Responsive**: Mobile-friendly UI optimized for all screen sizes including Nest Hub (1024x600)
- ✅ **Validation**: Zod schemas on client and server with real-time error feedback
- 🔄 **React Query**: Data fetching with caching and automatic refetch
- 🎭 **Enhanced UX**: Password visibility toggles, animated backgrounds, loading states
- 🎉 **Celebrations**: Confetti + toast notifications on add/edit/delete
- 🔍 **Search + Sort**: Search ignores leading "the", multiple sort options (year, rating, runtime)
- 🛡️ **Admin Allowlist**: Dashboard and movie management restricted to admins
- 🖼️ **Cloudinary Media**: Album artwork hosted via Cloudinary
- 🔒 **Security**: Environment secrets properly managed, no exposed credentials
- ⚡ **CI/CD**: Automated testing and builds via GitHub Actions

## 🏗️ Architecture

```
├── backend/          # Node.js/Express API server
│   ├── controllers/  # Request handlers (auth, movies)
│   ├── models/       # Mongoose schemas (User, Movie)
│   ├── routes/       # API routes with auth middleware
│   ├── middleware/   # JWT verification
│   ├── validation/   # Zod schemas for input validation
│   └── __tests__/    # Jest unit tests
└── client/           # React frontend
    ├── src/
    │   ├── components/    # UI components (NavBar, Home, Albums, etc.)
    │   ├── pages/         # Route pages (Login, Register, Dashboard, etc.)
    │   ├── context/       # React Context for user and theme state
    │   ├── styles/        # CSS files (theme.css, responsive.css, navbar.css, etc.)
    │   └── api.js         # Configured Axios instance
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (see `.env.example`):

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:3000
PORT=3001
```

4. Seed the database with movies:

```bash
npm run seed
```

5. Start the server:

```bash
npm start
```

Server runs on `http://localhost:3001`

### Client Setup

1. Navigate to client:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001
```

_If not set, the dev server will proxy API calls to localhost:3001_

4. Start the dev server:

```bash
npm start
```

Client runs on `http://localhost:3000`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/logout` - Logout user

### Movies

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (protected)
- `PUT /api/movies/:id` - Update movie (protected)
- `DELETE /api/movies/:id` - Delete movie (protected)

### Health

- `GET /api/health` - API health check

## 🧪 Testing & Code Quality

```bash
# Backend
cd backend
npm test              # Run Jest tests
npm run lint          # ESLint check
npm run format        # Prettier format

# Pre-commit hooks run automatically via Husky + lint-staged
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT with httpOnly cookies, bcrypt password hashing
- **Validation**: Zod schemas
- **Testing**: Jest + Supertest
- **Code Quality**: ESLint + Prettier
- **Dev Tools**: Nodemon, Morgan (logging)

### Frontend

- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Context (User + Theme) + React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **UI Components**: Bootstrap, React Icons (FaEye/FaEyeSlash for password toggles)
- **Styling**: Custom retro Y2K CSS with theme variables, responsive.css breakpoints (320px-1400px+)
- **Notifications**: React Hot Toast
- **Celebrations**: canvas-confetti
- **Carousel**: React Slick for albums showcase with responsive settings
- **Error Handling**: Error Boundaries
- **Loading States**: Skeleton loaders with retro aesthetics

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ httpOnly cookies (CSRF protection)
- ✅ Secure cookies in production (HTTPS only)
- ✅ Input validation on client and server
- ✅ CORS configured for specific origin
- ✅ Protected routes with auth middleware
- ✅ Environment secrets properly gitignored (.env files excluded from repository)
- ✅ MongoDB credentials secured with no exposed secrets
- ✅ Removed username field to simplify registration (name, email, password only)

## 📦 Available Scripts

### Backend

- `npm start` - Start dev server with nodemon
- `npm run seed` - Populate database from movies.json
- `npm test` - Run Jest tests
- `npm run lint` - Lint with ESLint
- `npm run format` - Format with Prettier

### Client

- `npm start` - Start dev server (port 3000)
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run format` - Format with Prettier

## 🚢 Deployment

### Backend Deployment

1. Set environment variables on hosting platform (Render, Railway, etc.)
2. Ensure `MONGODB_URI` points to production database
3. Set `CLIENT_ORIGIN` to deployed frontend URL
4. Set `NODE_ENV=production`
5. Deploy with `npm start`

### Client Deployment

1. Build: `npm run build`
2. Deploy `build` folder to static hosting (Netlify, Vercel, etc.)
3. Set `REACT_APP_API_URL` to backend URL
4. Configure redirects for SPA routing (see `public/_redirects`)

## 📝 Environment Variables

### Backend Required

```env
MONGODB_URI=        # MongoDB connection string
JWT_SECRET=         # Secret key for JWT signing
CLIENT_ORIGIN=      # Frontend URL for CORS
PORT=               # Server port (default: 3001)
```

### Client Optional

```env
REACT_APP_API_URL=  # Backend API URL (uses proxy if omitted)
```

## 🤝 Contributing & Development Workflow

1. Install dependencies: `npm install` in both backend and client
2. Husky pre-commit hooks run automatically
3. Lint-staged formats code on commit
4. Write tests for new features
5. CI runs on push via GitHub Actions (build and test)
6. All secrets must be in `.env` files (never commit `.env` to git)

## 🚀 Recent Updates (February 2026)

- **Feb 17**: Backend validation refinement for movie release year constraints and clearer error messaging.

- **Feb 16**: Documentation touch-up for project continuity and maintenance tracking.

- **Feb 1-2**: Major UX overhaul:
  - ✅ Added dark/light theme toggle with ThemeContext and localStorage persistence
  - ✅ Comprehensive responsive design framework (responsive.css with 6 breakpoints)
  - ✅ Special optimization for Nest Hub 1024x600 display
  - ✅ Runtime sorting (longest/shortest) with "Xh Ym" format display
  - ✅ Improved runtime visibility with cyan color (#00E5FF) and gradient background
  - ✅ Enhanced runtime/rating spacing and padding
  - ✅ Fixed logout button cut-off on Nest Hub
  - ✅ Theme toggle positioning with 100px left margin on larger screens
  - ✅ Removed favorites feature (simplified app - all movies on slider are favorites)
  - ✅ All responsive breakpoints tested: 320px, 480px, 768px, 1024px, 1200px, 1400px+

## 🎓 Project Evolution

This project showcases progression from a basic MERN exam project (2023) to a production-ready application with:

**Original (2023)**:

- Basic CRUD operations
- Simple authentication
- Hardcoded URLs
- Minimal validation

**Enhanced (2026)**:

- ✅ React Query for caching & state management
- ✅ Form validation with React Hook Form + Zod
- ✅ Protected routes & auth middleware
- ✅ Skeleton loaders & error boundaries
- ✅ Password visibility toggles & confirm password
- ✅ Inline editing capability
- ✅ Unit tests with Jest
- ✅ ESLint + Prettier + Husky
- ✅ CI/CD with GitHub Actions (automated build and test)
- ✅ Environment-based configuration
- ✅ Security best practices (httpOnly cookies, CORS, proper secret management)
- ✅ **Retro-Future Y2K Design System**: Custom CSS with movie-themed color palette
- ✅ **Animated Backgrounds**: Y2K grid dots, scanner lines, and chrome effects
- ✅ **Glass-Morphism UI**: Frosted glass cards with backdrop blur
- ✅ **Responsive Dashboard**: Grid layout with hover animations and smooth transitions
- ✅ **Simplified Auth Flow**: Removed username requirement for streamlined UX
- ✅ **20 Curated Movies**: With Cloudinary images and runtime data
- ✅ **Admin Allowlist**: Dashboard access restricted by approved emails
- ✅ **Advanced Sorting**: Sort by year, rating, and runtime (longest/shortest)
- ✅ **Search Enhancement**: Search ignores leading "the"
- ✅ **Celebrations**: Confetti + toast feedback on add/edit/delete actions
- ✅ **Dark/Light Theme Toggle**: Theme context with CSS variables and localStorage persistence
- ✅ **Comprehensive Responsive Design**: 6 breakpoints (320px-1400px+) with Nest Hub optimization
- ✅ **Runtime Display**: Formatted as "Xh Ym" with enhanced visibility (cyan color)

## 📸 Screenshots

### Retro Y2K Design System

The app features a stunning retro-future aesthetic inspired by Y2K culture:

- **Movie-Themed Colors**: Crimson (#DC143C), Gold (#FFD700), and Violet (#9400D3)
- **Glass-Morphism Effects**: Frosted glass cards with backdrop blur
- **Animated Backgrounds**: Y2K grid patterns and scanner lines
- **Chrome Borders**: Gradient borders with shifting animations
- **Responsive Forms**: "Box Office" login, "Join the Cast" registration
- **Director's Cut Dashboard**: Professional movie management interface with grid layout

### Key Pages

- **Login/Register**: Retro-themed authentication with password visibility toggles
- **Dashboard**: Full CRUD operations with inline editing and movie cards
- **Home**: Browse 20 curated movies with ratings, runtimes, and advanced sorting
- **Albums**: Responsive carousel showcasing music albums

## 🎨 Design Philosophy

The 2026 revamp embraces a **retro-future Y2K aesthetic** that merges nostalgia with modern web design:

- **Color Palette**: Movie theater-inspired crimson, gold, and violet gradients
- **Typography**: Bold, uppercase headings with letter-spacing for that classic blockbuster feel
- **Animations**: Smooth transitions, hover effects, and pulsing title animations
- **Accessibility**: Proper contrast ratios maintained despite creative color choices
- **Mobile-First**: All retro effects scale beautifully on tablets and phones

## 📄 License

This project was created as a school exam project in 2023 and has been enhanced for portfolio purposes.

---

**Built with ❤️ using the MERN stack**

**Repository**: [Music-Movies_Revamp_2026](https://github.com/DMould123/Music-Movies_Revamp_2026)

**Author**: David Mould
