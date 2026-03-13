require("dotenv").config()

const express = require("express")
const connectDB = require("./src/config/db")
const routes = require("./src/routes")

const app = express()

// Middleware
app.use(express.json())

// Connect Database
connectDB()

// Routes
app.use("/api", routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})