# Contact Manager API

A simple **RESTful API** for managing contacts, built with **Node.js, Express, and MongoDB**.  
This project demonstrates professional backend development practices including **routing, controllers, validation, authentication, error handling, and testing**.

---

## Features

- Secure registration and login with hashed passwords (bcrypt)
- JWT-based authentication for protected routes
- only authorized users can update/delete contacts
- Each user manages their own contacts
- Create, Read, Update, Delete (CRUD) contacts
- Input validation using **express-validator**
- MongoDB + Mongoose for database management
- REST API with JSON response format
- Proper HTTP status codes
- Deployed on **Render** (or any cloud platform)

---

## Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB + Mongoose** – Database & ODM
- **bcryptjs** – Password hashing
- **jsonwebtoken (JWT)** – Authentication & Authorization
- **express-validator** – Input validation
- **dotenv** – Environment variable management
- **nodemon** – Development server auto-restart (dev dependency)

---

## Folder Structure

```
contact-manager-api/
│
│── config/                         # Database connection
│    └── db.js                 
│
│── controllers/                    # Business logic (contacts)
│    ├── authController.js
│    └── contactController.js
│
│── middleware/                     # Error & auth middlewares
│    ├── authMiddleware.js
│    └── validationMiddleware.js
│
│── models/                         # Mongoose schemas
│    ├── ContactModel.js
│    └── UserModel.js
│
│── routes/                         # API routes
│    ├── authRoutes.js
│    └── contactRoutes.js
│
│── server.js                      # Entry point
│── .gitignore                     # Git ignore file
│── package.json                   # Dependencies & scripts
│── .env                           # Environment variables
│── README.md                      # Project documentation
```

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/contact-manager-api.git
cd contact-manager-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000 (or PORT you set)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=(as you set)
```

### 4. Run the Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

---

## API Endpoints

### Base URL (localHost url): `http://localhost:5000/api/contacts`

| Method | Endpoint   | Description             |
|--------|-----------|-------------------------|
| GET    | `/`       | Get all contacts        |
| POST   | `/`       | Create a new contact    |
| GET    | `/:id`    | Get contact by ID       |
| PUT    | `/:id`    | Update contact by ID    |
| DELETE | `/:id`    | Delete contact by ID    |

### Example Request (POST)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

---

## Error Handling & Validation

- All routes are validated with **express-validator**
- ensures clean JSON error responses

Example Error Response:
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

---

## License

This project is licensed under the **MIT License**.

---

## Author

Developed by **[Satyam Garg](https://github.com/SatyamGarg297)**  
Feel free to ⭐ this repo if you found it helpful!
