// user.model.js
const mongoose = require("mongoose");
// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

//     email: {
//  type: String,
//  required: true,
//  unique: true,
// }

//Edit Validation
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],  //match
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
      // validation 
      match: [/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number"]
    },

    area: {
      type: String,
    },
    // The managerId field is a reference to another User document, allowing us to establish a hierarchical relationship between users. This is particularly useful for roles like sales_manager, regional_manager, and district_manager, where each user can have a manager who oversees their work. By using mongoose.Schema.Types.ObjectId and ref: "User", we can easily populate this field with the corresponding User document when needed, enabling us to access the manager's details and maintain the organizational structure within our application.
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    // The isActive field is a boolean that indicates whether a user account is active or not. This allows us to implement soft deletion of user accounts, where instead of permanently deleting a user from the database, we can simply set isActive to false. This way, we can retain the user's data for historical purposes or potential reactivation in the future, while preventing them from accessing the system or being included in active user queries.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
