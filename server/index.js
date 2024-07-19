const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Employee Model
const EmployeeModel = require("./models/Employee");
const TodoseModel = require("./models/tasks");

// Login endpoint
app.post("/addtasks", async (req, res) => {
  const { name } = req.body;
  console.log("Click here",req.body);
  try {
    const tasks = await TodoseModel.create(req.body);
    res.status(201).json(tasks); // Return the created employee with status 201
    
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json("Internal Server Error");
  }
});


// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    console.log("User and password",user.email+"  "+user.email+"  "+user.password);
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.status(400).json("Incorrect password");
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json("Internal Server Error");
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.status(201).json(employee); // Return the created employee with status 201
  } catch (err) {
    console.error("Error registering employee:", err.message);
    res.status(400).json({ error: err.message }); // Return error with status 400 if there's an issue
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
