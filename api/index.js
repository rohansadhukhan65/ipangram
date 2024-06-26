import express from "express";
import connectDB from "./helpers/mongoose.js";
import router from "./router.js";
import cors from 'cors'
// Start DB ......
connectDB();

const app = express();

const port = 5000;

// Middleware

app.use(cors()); // Use this middleware to enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes ......
app.use("/api", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
