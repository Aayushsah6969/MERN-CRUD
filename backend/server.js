import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Make sure mongoose is imported
import TextRoute from './routes/text.route.js';
import cors from 'cors';


const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI;

// Connect to the MongoDB database
(async () => {
    try {
        await mongoose.connect(DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connection error:", error.message);
    }
})();

// Middleware to parse JSON requests
const allowedOrigins = [
  'http://localhost:5173', // If you're testing locally
  'https://mern-crud-frontend-co09.onrender.com' // Deployed frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allows cookies and credentials
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());  
app.use('/text', TextRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
