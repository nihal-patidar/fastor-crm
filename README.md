# Fastor CRM Backend

A **Node.js + Express + MongoDB** backend system for managing customer enquiries in a CRM (Customer Relationship Management) application.  

This system allows employees to register/login, view public enquiries, claim them, and manage their own claimed leads.

---

## Features

✅ Employee Authentication using JWT  
✅ Passwords secured with bcrypt  
✅ Public Enquiry Submission (no login required)  
✅ Claim Enquiry — visible only to the employee who claimed it  
✅ Fetch Unclaimed Enquiries (for all employees)  
✅ Fetch My Claimed Enquiries (for logged-in user)  
✅ Proper HTTP status codes and error handling  
✅ Input Validation with `express-validator`  
✅ MongoDB connection using Mongoose  

---

## Tech Stack

| Component | Technology |
|------------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (JSON Web Token) |
| Validation | express-validator |
| Password Hashing | bcryptjs |
| Environment Config | dotenv |

---

## Folder Structure

```
fastor-crm/
│
├── config/
│   └── db.js                # Database connection
├── controllers/
│   ├── authController.js    # Register/Login controllers
│   └── enquiryController.js # Enquiry handling controllers
├── middleware/
│   ├── authMiddleware.js    # JWT authentication middleware
│   └── errorHandler.js      # Global error handler 
├── models/
│   ├── Employee.js          # Employee model
│   └── Enquiry.js           # Enquiry model
├── routes/
│   ├── authRoutes.js        # Auth routes
│   └── enquiryRoutes.js     # Enquiry routes
├── .env                     # Environment variables
├── server.js                # Main entry point
└── package.json             # Dependencies and scripts
```

---

## Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/fastor-crm.git
cd fastor-crm
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create `.env` File
Create a `.env` file in the project root and add:
```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

> 🔒 Replace `<password>` with your actual MongoDB password.

---

### 4️⃣ Start Server

```bash
npm start
```

### Expected Output
```bash
MongoDB connected successfully...
Server running on port 5000
```

---

## API Endpoints

### **Auth Routes**
| Method | Endpoint | Description | Auth |
|--------|-----------|--------------|------|
| POST | `/api/auth/register` | Register new employee | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |

---

### **Enquiry Routes**
| Method | Endpoint | Description | Auth |
|--------|-----------|--------------|------|
| POST | `/api/enquiry/public` | Submit public enquiry form | ❌ |
| GET | `/api/enquiry/unclaimed` | Fetch all unclaimed enquiries | ✅ |
| PUT | `/api/enquiry/claim/:id` | Claim an enquiry by ID | ✅ |
| GET | `/api/enquiry/my-leads` | Fetch enquiries claimed by logged-in employee | ✅ |

---

## Authorization

For protected routes, add this header:
```
Authorization: Bearer <your_JWT_token>
```

---

## Example Request (POST /api/enquiry/public)

**URL:**
```
http://localhost:5000/api/enquiry/public
```

**Body (JSON):**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "course": "Full Stack Web Development"
}
```

**Response:**
```json
{
  "message": "Enquiry submitted successfully",
  "enquiry": {
    "_id": "6734a1e893e5a4bcb9e61e2f",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "course": "Full Stack Web Development",
    "claimedBy": null
  }
}
```

---

## 🧠 Example Protected Request (Claim Enquiry)

**URL:**
```
PUT http://localhost:5000/api/enquiry/claim/6734a1e893e5a4bcb9e61e2f
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body:**
```json
{}
```

**Response:**
```json
{
  "message": "Enquiry claimed successfully",
  "enquiry": {
    "_id": "6734a1e893e5a4bcb9e61e2f",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "claimedBy": {
      "_id": "6733889f1d29a2d18e0a65cd",
      "name": "Nihal Patidar",
      "email": "nihal@gmail.com"
    }
  }
}
```

---

## 🧩 Example `.env`
```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

---

## 💡 Tips
- Always test using Thunder Client or Postman.
- Use `npm start` during development for auto reloads.
- Check terminal logs for MongoDB connection issues.
- Keep `.env` file private (never push it to GitHub).
- Make sure to handle proper HTTP codes (400, 401, 404, 409, 500).

---

## 🧩 Example Package Scripts
In your `package.json`, ensure you have:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 🧩 Developer Commands Quick Reference
```bash
# Install dependencies
npm install

# Start production server
npm start
```

---

## Optional Improvements
- Add rate limiting for public routes.
- Add express-validator for request validation.
- Add central error handler for cleaner responses.
- Add logging (morgan) for request tracing.

---

## Author
**Nihal Patidar**  
*MERN Stack Developer | Node.js | React.js*  
Email: nihalpatidar14@gmail.com  
LinkedIn: https://www.linkedin.com/in/nihal-patidar/  
GitHub: https://github.com/nihal-patidar
