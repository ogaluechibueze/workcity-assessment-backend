# Workcity Assessment – Backend (Node.js + Express + MongoDB)

##  Overview
This is the backend API for the Workcity Full-Stack & WordPress Developer Assessment.  
It is built with **Node.js, Express, and MongoDB** and includes authentication, role-based access, and CRUD operations for Clients and Projects.

---

##  Features
- **JWT Authentication** (Signup/Login)
- **Role-based Access Control** (admin, user)
- **Clients CRUD**
- **Projects CRUD** + filter by client
- **Input Validation** using Joi
- **Unit Tests** (Jest + Supertest) for:
  - Create Client
  - Update Project
- **Error Handling** for clean API responses

---

##  Folder Structure
src/
config/ # Database connection
controllers/ # Route handlers
middleware/ # Auth & validation middleware
models/ # Mongoose models
routes/ # API route definitions
validations/ # Joi validation schemas
tests/ # Jest/Supertest unit tests

##  Installation & Setup
1. Clone the repo
git clone https://github.com/ogaluechibueze/workcity-assessment-backend.git
cd workcity-assessment-backend

2. Install dependencies
npm install

3. Create .env file

MONGO_URI=mongodb://localhost:27017/workcity
JWT_SECRET=your_jwt_secret
PORT=5000

4. Start server (dev mode)
npm run dev

Running Tests
npm test

## API Endpoints
Auth
    POST /api/auth/signup
    POST /api/auth/login

Clients
    GET /api/clients
    POST /api/clients (admin only)
    GET /api/clients/:id
    PUT /api/clients/:id (admin only)
    DELETE /api/clients/:id (admin only)

Projects
    GET /api/projects
    POST /api/projects (admin only)
    GET /api/projects/:id
    PUT /api/projects/:id (admin only)
    DELETE /api/projects/:id (admin only)
    GET /api/projects/client/:clientId

## Create admin via API directly
   POST http://localhost:5000/api/auth/signup
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}

note: admin can create,update or delete clients and projects while users are restricted to do this,users can only view 
