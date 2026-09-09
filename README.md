# 🎓 LMS Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-Learning%20Project-blue?style=for-the-badge)

**A modular REST API for a Learning Management System, built with Node.js, Express, MongoDB, Mongoose, JWT, and Joi.**

</div>

---

## ✨ Overview

This is an initial LMS backend codebase developed for learning and practice. It implements authentication, student CRUD operations, centralized error handling, request validation, and a powerful student-list endpoint with pagination, filtering, searching, and sorting.

The project uses a clean module-based structure:

```text
Route → Validator → Controller → Repository → Mongoose Model → MongoDB
```

---

## 🚀 Features

### 🔐 Authentication & security

- User registration and login with JWT authentication
- Password hashing with `bcryptjs`
- Protected endpoints through Bearer tokens
- Joi validation for login and registration requests
- Centralized `AppError`-based error handling
- Environment-variable validation
- `.env` protection through `.gitignore`

### 👨‍🎓 Student management

- Create a student
- Get all students
- Get one student by ID
- Update a student
- Delete a student
- Mongoose schema validation
- Unique roll-number enforcement

### 🔎 Student list capabilities

- Offset pagination using `page` and `limit`
- Filtering by department, semester, and CGPA range
- Case-insensitive search by name or roll number
- Whitelisted sorting by approved fields
- Pagination metadata: total records, total pages, next/previous page
- Query validation and maximum page-size protection

---

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | REST API framework |
| [MongoDB](https://www.mongodb.com/) | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | MongoDB object data modeling |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | JWT generation and verification |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Password hashing and comparison |
| [Joi](https://joi.dev/) | Request and environment validation |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [Nodemon](https://www.npmjs.com/package/nodemon) | Development auto-restart |

---

## 📁 Project Structure

```text
lms/
├── src/
│   ├── app/
│   │   └── app.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── globalError.js
│   ├── modules/
│   │   ├── student/
│   │   │   ├── student.model.js
│   │   │   ├── student.repository.js
│   │   │   ├── student.controller.js
│   │   │   ├── student.routes.js
│   │   │   └── student.validator.js
│   │   └── user/
│   │       ├── user.model.js
│   │       ├── user.repository.js
│   │       ├── user.controller.js
│   │       ├── user.routes.js
│   │       └── user.validator.js
│   ├── server/
│   │   └── index.js
│   ├── utils/
│   │   └── appError.js
│   └── validator/
│       └── env.validator.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/lms-backend.git
cd lms-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Copy the environment example file:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 4. Configure environment variables

Update the values inside `.env`:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/lms
JWT_EXPIRE=7d
JWT_SECRET=replace_with_a_long_random_secret
NODE_ENV=development
```

> ⚠️ Never commit the real `.env` file. It may contain JWT secrets, database credentials, and other sensitive configuration.

### 5. Start MongoDB

Make sure your local MongoDB service is running before launching the application.

### 6. Run the development server

```bash
npm run server
```

The API will be available at:

```text
http://localhost:8080
```

---

## 🔑 Environment Variables

| Variable | Required | Description | Example |
|---|:---:|---|---|
| `PORT` | Yes | Express server port | `8080` |
| `MONGO_URL` | Yes | MongoDB connection string | `mongodb://localhost:27017/lms` |
| `JWT_EXPIRE` | Yes | JWT expiry period | `7d` |
| `JWT_SECRET` | Yes | Long random secret for signing tokens | `your-long-random-secret` |
| `NODE_ENV` | Recommended | Application environment | `development` |

Valid examples for `JWT_EXPIRE` include `30m`, `2h`, `7d`, and `1w`.

---

## 📡 API Base URL

The examples below assume this base URL:

```text
http://localhost:8080/api/v1
```

> Update the endpoint prefix if your routes are mounted differently in `src/app/app.js`.

---

## 🔐 Authentication API

### Register user

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "StrongPassword123"
}
```

Example response:

```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "token": "YOUR_JWT_TOKEN",
    "user": {
      "id": "USER_OBJECT_ID",
      "name": "Ali Khan",
      "email": "ali@example.com",
      "role": "user"
    }
  }
}
```

### Login user

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "ali@example.com",
  "password": "StrongPassword123"
}
```

A successful login returns a JWT token. Use it for all protected endpoints.

### Send Bearer token

Add this HTTP header in Postman, Thunder Client, Flutter, or another API client:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 👨‍🎓 Student API

All student endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/students` | Get students with pagination, filters, search, and sorting |
| `POST` | `/api/v1/students` | Create a student |
| `GET` | `/api/v1/students/:id` | Get a student by MongoDB ObjectId |
| `PATCH` | `/api/v1/students/:id` | Partially update a student |
| `DELETE` | `/api/v1/students/:id` | Delete a student |

### Create student

```http
POST /api/v1/students
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "name": "Ali Khan",
  "rollNumber": "CS-2026-001",
  "department": "CS",
  "semester": 3,
  "cgpa": 3.85
}
```

### Get student by ID

```http
GET /api/v1/students/USER_STUDENT_OBJECT_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

### Update student

`PATCH` supports partial updates, so send only the fields you want to change.

```http
PATCH /api/v1/students/USER_STUDENT_OBJECT_ID
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "semester": 4,
  "cgpa": 3.92
}
```

### Delete student

```http
DELETE /api/v1/students/USER_STUDENT_OBJECT_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔎 Pagination, Filters, Search & Sorting

The student list endpoint supports query parameters:

```http
GET /api/v1/students
Authorization: Bearer YOUR_JWT_TOKEN
```

### Available query parameters

| Parameter | Type | Default | Allowed values / rules | Purpose |
|---|---|---:|---|---|
| `page` | Number | `1` | Integer, minimum `1` | Page number |
| `limit` | Number | `10` | Integer from `1` to `100` | Records per page |
| `department` | String | — | `CS`, `SE`, `IT`, `EE`, `ME`, `CE` | Filter department |
| `semester` | Number | — | Integer from `1` to `8` | Filter semester |
| `minCgpa` | Number | — | Number from `0` to `4` | Minimum CGPA |
| `maxCgpa` | Number | — | Number from `0` to `4` | Maximum CGPA |
| `search` | String | — | Maximum 50 characters | Search name or roll number |
| `sortBy` | String | `createdAt` | `createdAt`, `name`, `rollNumber`, `department`, `semester`, `cgpa` | Field used for sorting |
| `sortOrder` | String | `desc` | `asc` or `desc` | Sort direction |

> ⚠️ `minCgpa` cannot be greater than `maxCgpa`.

### Pagination examples

#### Default list

```http
GET /api/v1/students
```

Default behavior:

```text
page=1
limit=10
sortBy=createdAt
sortOrder=desc
```

#### Get page 2 with 5 records

```http
GET /api/v1/students?page=2&limit=5
```

### Filter examples

#### Filter by department

```http
GET /api/v1/students?department=CS
```

#### Filter by semester

```http
GET /api/v1/students?semester=3
```

#### Filter by CGPA range

```http
GET /api/v1/students?minCgpa=3&maxCgpa=4
```

#### Combine filters

```http
GET /api/v1/students?department=CS&semester=3&minCgpa=3
```

### Search examples

The `search` parameter performs a case-insensitive search against `name` and `rollNumber`.

```http
GET /api/v1/students?search=ali
```

Possible matches:

```text
Ali Khan
Muhammad Ali
CS-ALI-2026
```

### Sorting examples

#### Highest CGPA first

```http
GET /api/v1/students?sortBy=cgpa&sortOrder=desc
```

#### Name from A to Z

```http
GET /api/v1/students?sortBy=name&sortOrder=asc
```

#### Department ascending, page 1, 20 records

```http
GET /api/v1/students?page=1&limit=20&sortBy=department&sortOrder=asc
```

### Complete query example

```http
GET /api/v1/students?page=1&limit=10&department=CS&semester=3&minCgpa=3&search=ali&sortBy=cgpa&sortOrder=desc
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example paginated response

```json
{
  "success": true,
  "message": "Students retrieved successfully.",
  "results": 2,
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "nextPage": 2,
    "previousPage": null
  },
  "filters": {
    "department": "CS",
    "semester": 3,
    "minCgpa": 3,
    "maxCgpa": null,
    "search": "ali",
    "sortBy": "cgpa",
    "sortOrder": "desc"
  },
  "data": [
    {
      "_id": "66f111111111111111111111",
      "name": "Ali Khan",
      "rollNumber": "CS-2026-001",
      "department": "CS",
      "semester": 3,
      "cgpa": 3.85,
      "createdAt": "2026-09-08T10:00:00.000Z",
      "updatedAt": "2026-09-08T10:00:00.000Z"
    }
  ]
}
```

---

## ✅ Validation Rules

### User registration

| Field | Rules |
|---|---|
| `name` | Required; 2–50 characters |
| `email` | Required; valid email format |
| `password` | Required; at least 6 characters |

### User login

| Field | Rules |
|---|---|
| `email` | Required; valid email format |
| `password` | Required |

### Student creation

| Field | Rules |
|---|---|
| `name` | Required; 2–50 characters |
| `rollNumber` | Required; uppercase letters, digits, and hyphens only; unique |
| `department` | Required; `CS`, `SE`, `IT`, `EE`, `ME`, or `CE` |
| `semester` | Required; integer from `1` to `8` |
| `cgpa` | Optional; number from `0` to `4`; default `0` |

### Student update

- At least one updatable field must be provided.
- Only valid student fields should be accepted.
- Use `PATCH` for partial updates.

---

## ⚠️ Error Response Format

The API uses centralized error handling through the `AppError` class.

Example operational error:

```json
{
  "success": false,
  "status": "fail",
  "message": "Student not found."
}
```

Example validation error:

```json
{
  "success": false,
  "status": "fail",
  "message": "Validation error: Department must be one of: CS, SE, IT, EE, ME, CE."
}
```

In development, the API may return a `stack` field to make debugging easier. In production, stack traces should never be exposed to API clients.

---

## 🛡️ Security Notes

- 🔒 Never upload `.env` to GitHub.
- 🔑 Use a long random `JWT_SECRET`; rotate it if it is exposed.
- 🚫 Never return passwords in API responses.
- 👤 Do not allow public registration requests to set `role: "admin"`.
- ✅ Validate request body, query parameters, and MongoDB IDs.
- 🧱 Add authorization checks so a user cannot modify another user's data.
- ⏱️ Add rate limiting to login and registration endpoints before production deployment.
- 🪖 Add `helmet`, controlled CORS, request-size limits, and HTTPS before deployment.

---

## 🗃️ Recommended MongoDB Indexes

`rollNumber` is unique and therefore indexed. For student-list filters and sorting, consider adding these indexes after confirming your real query patterns:

```js
studentSchema.index({ department: 1, semester: 1 });
studentSchema.index({ cgpa: -1 });
```

> 💡 Avoid creating indexes for every field. Indexes improve some read queries but add storage and write overhead.

---

## 🧪 Test With Postman or Thunder Client

Suggested request sequence:

1. Register a user with `POST /api/v1/auth/register`.
2. Copy the JWT token from the response.
3. Set header: `Authorization: Bearer YOUR_JWT_TOKEN`.
4. Create students using `POST /api/v1/students`.
5. Test list features with pagination, filters, search, and sorting.
6. Test validation using invalid department, semester, CGPA, page, and sort fields.

Useful negative tests:

```text
GET /api/v1/students?page=0
GET /api/v1/students?limit=1000
GET /api/v1/students?department=MEDICAL
GET /api/v1/students?minCgpa=4&maxCgpa=2
GET /api/v1/students?sortBy=password
GET /api/v1/students?sortOrder=random
```

Each invalid request should return a `400` validation response.

---

## 📜 Useful Commands

```bash
# Install dependencies
npm install

# Run development server with Nodemon
npm run server

# View current Git status
git status

# Stage project changes
git add .

# Commit changes
git commit -m "Add student pagination filtering search and sorting"

# Push changes
git push
```

---

## 🧭 Future Improvements

### Backend quality

- [ ] Add `catchAsync` to remove repetitive controller `try/catch` blocks
- [ ] Add a MongoDB ObjectId validation middleware
- [ ] Add 404 route handling
- [ ] Standardize all success and error response formats
- [ ] Add request logging with Morgan, Pino, or Winston
- [ ] Add graceful server shutdown handling
- [ ] Add ESLint, Prettier, and Git hooks

### Security

- [ ] Add role-based authorization for `user` and `admin`
- [ ] Add ownership-based access checks
- [ ] Add `helmet` and controlled CORS
- [ ] Add API rate limiting
- [ ] Add access-token + refresh-token authentication
- [ ] Add email verification and password reset

### Testing and documentation

- [ ] Add unit and integration tests using Jest and Supertest
- [ ] Add Swagger/OpenAPI documentation
- [ ] Add a Postman or Bruno API collection
- [ ] Add CI checks with GitHub Actions

### LMS modules

- [ ] Teacher module
- [ ] Course module
- [ ] Enrollment module
- [ ] Attendance module
- [ ] Assignments and submissions
- [ ] Results, grades, and GPA calculation
- [ ] Student and admin dashboards

### Deployment

- [ ] Add Docker and Docker Compose
- [ ] Deploy API to Render, Railway, Fly.io, or a VPS
- [ ] Use MongoDB Atlas for production database hosting
- [ ] Add monitoring, health checks, and backups

---

## 🤝 Contributing

This is currently a learning project. If you extend it, keep the architecture consistent:

```text
Route → Validator → Controller → Repository → Model
```

Use meaningful commit messages, validate all external input, and never commit secrets.

---

## 📄 License

This project is intended for learning and practice. Add an appropriate license, such as MIT, if you plan to distribute or reuse it publicly.

<div align="center">

Made with ☕, Node.js, and continuous learning 🚀

</div>
