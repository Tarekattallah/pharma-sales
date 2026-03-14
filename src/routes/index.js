const express = require("express")
const router = express.Router()

const authRoutes = require("../modules/auth/auth.routes")
// another routes
const userRoutes = require("../modules/users/user.routes")
// const doctorRoutes = require("../modules/doctors/doctor.routes")


// Auth routes 
router.use("/auth", authRoutes)
router.use("/users", userRoutes);

module.exports = router;