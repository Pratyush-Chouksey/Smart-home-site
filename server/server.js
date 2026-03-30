import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolving __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configure CORS on Express to allow the Vite dev URL natively (useful for local dev)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Secure MongoDB Connection via Environment Variable
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected Securely'))
    .catch(err => console.error('❌ MongoDB Connection Error Validation Failed: ', err));
} else {
  console.warn('⚠️ No MONGO_URI provided in environment variables. Database not connected.');
}

// ----------------------------------------------------------------------
// API Routes
// ----------------------------------------------------------------------

// 1. Submit Contact Form
app.post('/api/contact', (req, res) => {
  console.log("-----------------------------------------");
  console.log("📡 New Contact Submission Received:");
  console.log(req.body);
  console.log("-----------------------------------------");
  return res.status(200).json({ success: true, message: "Contact request received successfully!" });
});

// 2. Submit Electrician Registration
app.post('/api/electrician', (req, res) => {
  console.log("-----------------------------------------");
  console.log("⚡ New Electrician Partner Applied:");
  console.log(req.body);
  console.log("-----------------------------------------");
  return res.status(200).json({ success: true, message: "Electrician application received via CORS!" });
});

// 3. Submit Custom Plan Form
app.post('/api/custom-plan', (req, res) => {
  console.log("-----------------------------------------");
  console.log("🏠 New Custom Plan Request Received:");
  console.log(req.body);
  console.log("-----------------------------------------");
  return res.status(200).json({ success: true, message: "Custom plan mapped successfully!" });
});

// ----------------------------------------------------------------------
// Production Deployment Architecture (Render / Railway / Heroku)
// ----------------------------------------------------------------------
// Serve statically compiled React from Vite's `/dist` folder
app.use(express.static(path.join(__dirname, '../dist')));

// Intercept all unmatched non-API routes and pass them to React Router's strictly isolated DOM pipeline
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// App Listener
app.listen(PORT, () => {
  console.log(`🚀 Smartify Backend Server running on port ${PORT}`);
});
