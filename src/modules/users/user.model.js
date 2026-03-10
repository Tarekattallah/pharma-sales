// user.model.js
const mongoose = require("mongoose");
// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "admin",
        "sales_manager",
        "regional_manager",
        "district_manager",
        "medical_rep",
      ],
      default: "medical_rep",
    },

    phone: {
      type: String,
    },

    area: {
      type: String,
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
