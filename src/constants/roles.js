module.exports = {
  ADMIN: "admin",
  SALES_MANAGER: "sales_manager",
  REGIONAL_MANAGER: "regional_manager",
  DISTRICT_MANAGER: "district_manager",
  MEDICAL_REP: "medical_rep",
};


const roles = ["admin", "sales_manager", "regional_manager", "district_manager", "medical_rep"];
module.exports = roles;

// Alternative export style:second way to export the roles as an object

// const roles = {

//   ADMIN: "admin",

//   SALES_MANAGER: "sales_manager",

//   REGIONAL_MANAGER: "regional_manager",

//   DISTRICT_MANAGER: "district_manager",

//   MEDICAL_REP: "medical_rep"

// }

// module.exports = roles


//why i put the roles in a separate file?

// To keep the code organized and maintainable,
// especially as the application grows.
// By defining roles in a separate file,
// you can easily manage and update them without having to search through multiple files.
// It also promotes reusability, 
// as you can import the roles wherever needed in your application,
// ensuring consistency across different modules.