# Pharma Sales - Phase 1

## Overview
Phase 1 covers the foundation of the Pharma Sales project, including:

- Project structure setup
- Constants (Roles)
- User Model
- Password hashing (hash.js)
- JWT authentication (jwt.js)
- Auth Controller (register & login)
- Auth Routes
- Routes index setup

This phase sets up the base for future modules and ensures the authentication system is working securely.

---

## Roles & Hierarchy
The system follows a hierarchical role structure:

| Role                   | Manages / Supervises                   |
|------------------------|----------------------------------------|
| Admin                  | Entire system                          |
| Sales / Marketing Manager | Regional Managers                   |
| Regional Manager       | District Managers                      |
| District Manager       | Medical Reps                           |
| Medical Rep            | Doctors and clients                    |

---

## Project Structure
The project structure after Phase 1 (and final structure) will be:



pharma-sales
│
├── server.js
├── package.json
├── .env
├── .gitignore
│
└── src
│
├── config
│ └── db.js
│
├── constants
│ └── roles.js
│
├── middleware
│ ├── auth.middleware.js
│ ├── role.middleware.js
│ └── error.middleware.js
│
├── modules
│ │
│ ├── auth
│ │ ├── auth.controller.js
│ │ └── auth.routes.js
│ │
│ ├── users
│ │ ├── user.model.js
│ │ ├── user.controller.js
│ │ └── user.routes.js
│ │
│ ├── doctors
│ │ ├── doctor.model.js
│ │ ├── doctor.controller.js
│ │ └── doctor.routes.js
│ │
│ ├── hospitals
│ │ ├── hospital.model.js
│ │ ├── hospital.controller.js
│ │ └── hospital.routes.js
│ │
│ ├── products
│ │ ├── product.model.js
│ │ ├── product.controller.js
│ │ └── product.routes.js
│ │
│ ├── visits
│ │ ├── visit.model.js
│ │ ├── visit.controller.js
│ │ └── visit.routes.js
│ │
│ ├── orders
│ │ ├── order.model.js
│ │ ├── order.controller.js
│ │ └── order.routes.js
│ │
│ └── reports
│ ├── report.controller.js
│ └── report.routes.js
│
├── routes
│ └── index.js
│
└── utils
├── hash.js
├── jwt.js
├── generateId.js
└── pagination.js



