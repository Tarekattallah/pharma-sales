pharma-sales
│
├── server.js
├── package.json
├── .env
│
└── src
    │
    ├── config
    │   └── db.js
    │
    ├── middleware
    │   ├── auth.middleware.js
    │   └── role.middleware.js
    │
    ├── utils
    │   ├── jwt.js
    │   └── hash.js
    │
    └── modules
        │
        ├── auth
        │   ├── auth.controller.js
        │   └── auth.routes.js
        │
        ├── users
        │   └── user.model.js
        │
        ├── doctors
        ├── hospitals
        ├── products
        ├── visits
        ├── orders
        └── reports