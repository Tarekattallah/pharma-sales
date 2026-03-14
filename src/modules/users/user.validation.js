// old Validation
// const Joi = require("joi")

// exports.createUserSchema = Joi.object({

//     name: Joi.string()
//         .min(3)
//         .max(50)
//         .trim()
//         .required(),

//     email: Joi.string()
//         .email()
//         .lowercase()
//         .required(),

//     password: Joi.string()
//         .min(6)
//         .max(100)
//         .required(),

//     role: Joi.string()
//         .valid("admin", "medical_rep", "doctor")
//         .default("medical_rep"),

//     phone: Joi.string()
//         .pattern(/^[0-9]{10,15}$/)
//         .optional(),

//     area: Joi.string()
//         .max(100)
//         .optional()

// })


// update Validation


// createUserValidation.js
const Joi = require("joi");
const roles = require("../../constants/roles");

exports.createUserSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters long"
        }),

    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        }),

    password: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long"
        }),

    role: Joi.string()
        .valid(...roles)  // Spread Operator
        .required()
        .messages({
            "any.only": `Role must be one of: ${roles.join(", ")}`
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .messages({
            "string.pattern.base": "Phone number must be 10 digits"
        }),

    area: Joi.string().optional()
});