// libary bcryptjs used to hash password and compare password with hashed password
const bcrypt = require('bcryptjs')

// Function to hash a password
exports.hashPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// Function to compare a password with a hashed password
exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}
