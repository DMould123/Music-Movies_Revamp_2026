# React Music & Movies 🎬🎵

A full-stack MERN application for browsing movies and music albums with user authentication, favorites, and CRUD operations. Originally created as a 2023 school exam project, now enhanced with modern best practices.

## ✨ Features

- 🔐 **Authentication**: JWT-based auth with secure httpOnly cookies
- 🎬 **Movies**: Browse, search, view details, and manage favorites
- ⭐ **Favorites**: Toggle favorites (requires login)
- 📊 **Dashboard**: Add, edit, and delete movies (admin)
- 🎵 **Albums**: Browse music albums
- 📱 **Responsive**: Mobile-friendly UI with skeleton loaders
- ✅ **Validation**: Zod schemas on client and server
- 🔄 **React Query**: Data fetching with caching and automatic refetch
- 🎨 **Enhanced UX**: Password visibility toggles, confirm password, error boundaries

## 🏗️ Architecture

```
├── backend/          # Node.js/Express API server
│   ├── controllers/  # Request handlers (auth, movies, favorites)
│   ├── models/       # Mongoose schemas (User, Movie, Favorite)
│   ├── routes/       # API routes with auth middleware
│   ├── middleware/   # JWT verification
│   ├── validation/   # Zod schemas for input validation
│   └── __tests__/    # Jest unit tests
└── client/           # React frontend
    ├── src/
    │   ├── components/    # UI components (NavBar, Home, Albums, etc.)
    │   ├── pages/         # Route pages (Login, Register, Dashboard, etc.)
    │   ├── context/       # React Context for user state
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

### Favorites

- `GET /api/favorites` - Get user's favorite movies (protected)
- `POST /api/favorites/:movieId/toggle` - Toggle favorite status (protected)

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
- **State Management**: React Context + React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **UI Components**: Bootstrap, React Icons
- **Notifications**: React Hot Toast
- **Carousel**: React Slick
- **Error Handling**: Error Boundaries
- **Loading States**: Skeleton loaders

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ httpOnly cookies (CSRF protection)
- ✅ Secure cookies in production (HTTPS only)
- ✅ Input validation on client and server
- ✅ CORS configured for specific origin
- ✅ Protected routes with auth middleware

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
5. CI runs on push via GitHub Actions

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
- ✅ Favorites feature with database relations
- ✅ Skeleton loaders & error boundaries
- ✅ Password visibility toggles & confirm password
- ✅ Inline editing capability
- ✅ Unit tests with Jest
- ✅ ESLint + Prettier + Husky
- ✅ CI/CD with GitHub Actions
- ✅ Environment-based configuration
- ✅ Security best practices (httpOnly cookies, CORS)

## 📸 Screenshots

_(Add screenshots of your app here)_

## 📄 License

This project was created as a school exam project in 2023 and has been enhanced for portfolio purposes.

---

**Built with ❤️ using the MERN stack**
git clone https://github.com/your-username/movies-music-app.git

````

2. Navigate to the project directory:

```bash
cd movies-music-app
````

3. Install the required dependencies for both the front-end and back-end:

   ```bash
   cd client && npm install
   ```

   ```bash
   cd server && npm install
   ```

4. Start the back-end server:

   ```bash
   cd server && npm start
   ```

5. Start the front-end development server:

   ```bash
   cd client && npm start
   ```

6. Open your web browser and visit http://localhost:3000 to access the Movies & Music app.

**Note**: You will need an active internet connection to load the necessary CSS and JavaScript files.

## Features

- 🌟 Explore a collection of movies with details like name, release year, image, rating, & bio
- 🔍 Search for movies by name
- ➕ Add new movies to the collection
- 🗑️ Delete movies from the collection
- 🔐 User authentication and registration
- 👤 User profile management
- 📱 Responsive design for optimal viewing on various devices
- 🏗️ Well-structured and organized codebase for easy maintenance and future expansions

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Author

- David Mould
