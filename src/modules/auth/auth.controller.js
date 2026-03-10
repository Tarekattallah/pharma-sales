const User = require("../users/user.model")
const { hashPassword, comparePassword } = require("../../utils/hash")
const { generateToken } = require("../../utils/jwt")
const roles = require("../../constants/roles")

// register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, area, managerId } = req.body

    // Validate role
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" })
    }

    // Hash the password 
    const hashedPassword = await hashPassword(password)

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      area,
      managerId
    })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// login user and generate JWT token
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Generate JWT token
    const token = generateToken({ id: user._id, role: user.role })

    res.status(200).json({
      message: "Login successful",
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  register,
  login
}