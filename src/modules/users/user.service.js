
const bcrypt = require('bcrypt')  //Password Hashing

////////1
//old Validation Data
// exports.createUser = async data => {
//     const hashedPassword = await bcrypt.hash(data.password, 10)
//     const user = new User({ ...data, password: hashedPassword })
//     return user.save()
// }
////////2
// //New Validation Data
// if (!data.name || !data.email || !data.password) {
//     throw new Error("Name, email, and password are required");
// }

// exports.getAllUsers = async () => {
//     return User.find().select('-password')   //('-password') send data withut password 
// }
// Old get User 
// exports.getUserById = async id => {
//     return User.findById(id).select('-password')
// }
// New get Data
// Pagination
// exports.getAllUsers = async (page = 1, limit = 20) => {  // page 1 users in this page limit 20
//     return User.find()
//         .select("-password")   // delet password
//         .skip((page - 1) * limit)
//         .limit(limit);
// };

///////3

// Update New Validation

const User = require("./user.model")
const APIFeatures = require("../../utils/apiFeatures")

exports.getUsers = async (queryString) => {

    const features = new APIFeatures(
        User.find().select("-password"),
        queryString
    )
        .filter()
        .search()
        .sort()
        .paginate()

    const users = await features.query

    return users

}

/*Create features object from APIFeatures.
Apply filters in order: filter → search → sort → limitFields → paginate.
Run query → get users.
select("-password") → never send passwords to client.*/