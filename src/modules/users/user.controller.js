const userService = require("./user.service");
const { createUserSchema } = require("./user.validation");

// Create new user
exports.createUser = async (req, res) => {
    try {
        //  Validate user input
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        //  Create user in DB
        const user = await userService.createUser(req.body);

        //  Send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// Get users with search, filter, sort, pagination
exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers(req.query);

        res.json({
            success: true,
            results: users.length,
            data: users,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// Get one user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
