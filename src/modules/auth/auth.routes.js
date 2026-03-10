const express = require("express")
const router = express.Router()
const authController = require("./auth.controller")

// register a new user
router.post("/register", authController.register)

// login user and generate JWT token
router.post("/login", authController.login)

module.exports = router