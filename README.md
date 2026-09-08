# LMS Backend API

A starter Learning Management System (LMS) backend built with Node.js, Express, MongoDB, Mongoose, JWT authentication, Joi validation, and a modular repository-controller-route architecture.

> This is an initial practice codebase focused on authentication and student management.

## Features

- JWT-based user registration and login
- Password hashing with `bcryptjs`
- Protected routes using Bearer tokens
- Student CRUD endpoints
- MongoDB/Mongoose data models
- Joi request validation for authentication and student operations
- Centralized operational error handling using `AppError`
- Environment-variable validation
- Modular project structure

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (`jsonwebtoken`)
- bcryptjs
- Joi
- dotenv
- Nodemon

## Project Structure

```text
lms/
├── src/
│   ├── app/
│   │   └── app.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
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

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/lms-backend.git
cd lms-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Copy the example configuration file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 4. Configure environment variables

Update the values in `.env`:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/lms
JWT_EXPIRE=7d
JWT_SECRET=replace_this_with_a_long_random_secret
```

Do not commit `.env` to GitHub. It may contain secrets such as `JWT_SECRET` or production database credentials.

### 5. Start MongoDB

Make sure MongoDB is running locally before starting the server.

### 6. Start the development server

```bash
npm run server
```

The API should be available at:

```text
http://localhost:8080
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port used by the Express server | `8080` |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/lms` |
| `JWT_EXPIRE` | JWT expiry duration | `7d` |
| `JWT_SECRET` | Long secret used to sign JWTs | `use-a-strong-random-secret` |

## API Endpoints

> Endpoint prefixes may differ slightly if you mount routes differently in `src/app/app.js`. The examples below assume `/api` as the base prefix.

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Log in and receive a JWT |
| `GET` | `/api/me` | Protected | Get the logged-in user |

### Student Management

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/students` | Protected | Get all students |
| `POST` | `/api/students` | Protected | Create a student profile |
| `GET` | `/api/students/:id` | Protected | Get one student by ID |
| `PUT` | `/api/students/:id` | Protected | Update a student by ID |
| `DELETE` | `/api/students/:id` | Protected | Delete a student by ID |

## Request Examples

### Register a user

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "StrongPassword123",
  "role": "user"
}
```

### Log in

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "ali@example.com",
  "password": "StrongPassword123"
}
```

Example successful response:

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "your-jwt-token",
    "user": {
      "id": "USER_OBJECT_ID",
      "name": "Ali Khan",
      "email": "ali@example.com",
      "role": "user"
    }
  }
}
```

### Use the JWT token

For protected endpoints, add this header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Create a student

```http
POST /api/students
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "userId": "USER_OBJECT_ID",
  "name": "Ali Khan",
  "rollNumber": "CS-2026-001",
  "department": "CS",
  "semester": 1,
  "cgpa": 0
}
```

## Validation Rules

### User registration

- `name`: Required; 2 to 50 characters
- `email`: Required; valid email format
- `password`: Required; at least 6 characters
- `role`: Optional; either `user` or `admin`

### User login

- `email`: Required; valid email format
- `password`: Required

### Student creation/update

- `userId`: Valid MongoDB ObjectId; required on create
- `name`: 2 to 50 characters
- `rollNumber`: Uppercase letters, numbers, and hyphens only
- `department`: One of `CS`, `SE`, `IT`, `EE`, `ME`, or `CE`
- `semester`: Integer from 1 to 8
- `cgpa`: Number from 0 to 4

## Error Response Format

The application uses an `AppError` class and centralized error middleware. A typical error response is:

```json
{
  "success": false,
  "status": "fail",
  "message": "Invalid email or password."
}
```

- `fail`: Normally a client-side or operational error, such as validation failure, unauthorized access, or missing data.
- `error`: Normally a server-side error.

## Security Notes

- Never commit `.env`, real JWT secrets, database passwords, or API keys.
- Keep `node_modules/` out of Git; dependencies are restored with `npm install`.
- Use a long, random `JWT_SECRET` in every environment.
- Use HTTPS and a managed MongoDB connection string before deploying to production.
- Do not expose passwords in API responses.
- Consider adding rate limiting, Helmet, CORS configuration, refresh tokens, role authorization, and password-reset flows before production deployment.

## Useful Commands

```bash
# Install dependencies
npm install

# Start development server with nodemon
npm run server

# View Git changes
git status

# Add files to staging
git add .

# Create a commit
git commit -m "Initial LMS backend setup"

# Push to GitHub
git push -u origin main
```

## Future Improvements

- Add role-based authorization for `admin` and `user`
- Restrict student operations based on ownership and role
- Add pagination, searching, filtering, and sorting for students
- Add password reset and email verification
- Add unit/integration tests
- Add API documentation with Swagger/OpenAPI
- Add Docker support
- Add request logging and production monitoring
- Add course, teacher, enrollment, attendance, and result modules

## License

This project is for learning and practice. Add an appropriate license if you plan to publish or reuse it.