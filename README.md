# Smartify Web Application

A full-stack premium React application designed for smart home automation integration, electrician contracting, and custom engineering service requests. Engineered with top-tier Framer Motion UI/UX physics and strict responsiveness optimizations.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS v4, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Deployment:** Render / Railway Ready (Node + Static files serving)

## 📁 Project Structure

This project technically utilizes a monolithic repository architecture where the Node.js backend (`/server`) and React frontend (`/src`) share the root deployment scripts.

- `src/` - React Frontend Application components, Framer Motion physics, and global CSS logic.
- `server/` - Express Backend housing the specific REST API routes and CORS configuration.
- `dist/` - Production-compiled React payload (generated after running `npm run build`).

## 🛠 Installation & Setup

1. **Clone and Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Duplicate `.env.example` into `.env` at the root folder:
   - `VITE_API_URL` -> Localhost port for your Node backend during development (`http://localhost:5000`)
   - `MONGO_URI` -> Provide a secure MongoDB Atlas cluster linking string to persist the forms data natively.

3. **Development Environment**
   You need two terminals running locally for hot-reloading:
   
   *Terminal 1 (Vite Frontend):*
   ```bash
   npm run dev
   ```

   *Terminal 2 (Express Backend):*
   ```bash
   node server/server.js
   ```

## 🌐 Production Deployment

This application is strictly pre-configured to handle standard cloud container deployments (Render, Railway, Heroku).

1. Build the production standard React files targeting standard web workers:
   ```bash
   npm run build
   ```

2. Deploy the `Node.js` instance using the standard bootloader:
   ```bash
   npm start
   ```

> **Note:** The Express server automatically intercepts standard root domain `GET` requests and structurally links them into the localized mapping of `../dist/index.html`. This ensures React Router DOM maintains correct client-side SPA routing without triggering massive cloud 404 faults.

## 📡 API Endpoints

- `POST /api/contact` - Transmits basic user requests
- `POST /api/electrician` - Handles massive multipart nested schemas + Upload certifications
- `POST /api/custom-plan` - Processes complex boolean routing algorithms mapping the Smart Property configurations
