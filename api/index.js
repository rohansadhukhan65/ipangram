import express from "express";
import connectDB from "./helpers/mongoose.js";
 // Start DB ......
connectDB()


const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async(req, res) => {
  res.send("Welcome to the ipangram API server!");
});




// Example API routes
app.get("/api/users", async(req, res) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];
  res.json(users);
});

app.post('/api/users', async(req, res) => {
    // Example of handling POST request to add a new user
    const { name } = req.body;
    const newUser = { id: 3, name }; // Simplified, in a real app, you'd typically use a database to store users
    res.status(201).json(newUser);
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });