# 🔐 Spring-Based Authentication System

A production-ready authentication and authorization system built using Spring Boot and Spring Security.

This project implements JWT-based authentication, refresh tokens, role-based access control (RBAC), secure password encryption, and protected REST APIs.

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Access Tokens
- Refresh Tokens
- Secure Logout
- Stateless Authentication

### Security

- Spring Security
- BCrypt Password Encryption
- JWT Validation
- Protected Endpoints
- Custom Authentication Filters
- Exception Handling

### User Management

- Create User
- Login User
- Fetch Current User
- Update User Profile
- Role-Based Authorization

### Database

- MySQL Integration
- Spring Data JPA
- Hibernate ORM

### DevOps

- Docker Support
- Environment Variables
- Production Configuration

---

# 🏗 Architecture

```text
Client
   │
   ▼
Spring Security
   │
   ▼
JWT Filter
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
MySQL Database
```

---

# 🛠 Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

## Database

- MySQL

## DevOps

- Docker

---

# 📂 Project Structure

```text
src
│
├── config
├── controllers
├── dto
├── entities
├── repositories
├── services
├── security
├── exceptions
└── utils
```

---

# 🔑 Environment Variables

Create an `.env` file:

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=
JWT_EXPIRATION=

REFRESH_TOKEN_EXPIRATION=
```

---

# ⚙ Configuration

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}
```

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "fullName": "Ketan Goyal",
  "email": "ketan@test.com",
  "password": "Password@123"
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "ketan@test.com",
  "password": "Password@123"
}
```

Response:

```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
```

---

### Refresh Token

```http
POST /api/auth/refresh
```

---

### Logout

```http
POST /api/auth/logout
```

---

## Users

### Current User

```http
GET /api/users/me
```

---

# 🔒 Security Features

- JWT Authentication
- Refresh Tokens
- BCrypt Password Hashing
- Stateless Sessions
- Protected APIs
- Role-Based Access Control
- Authentication Filters
- Request Validation

---

# 🐳 Docker

Build Image

```bash
docker build -t spring-auth .
```

Run Container

```bash
docker run -p 8080:8080 \
-e DB_URL=your_db_url \
-e DB_USERNAME=root \
-e DB_PASSWORD=password \
-e JWT_SECRET=secret \
spring-auth
```

---

# 🚀 Run Locally

## Build

```bash
mvn clean install
```

## Run

```bash
mvn spring-boot:run
```

Application:

```text
http://localhost:8080
```

---

# 📈 Future Improvements

- Google OAuth2 Login
- GitHub OAuth2 Login
- Email Verification
- Forgot Password
- Two-Factor Authentication (2FA)
- Account Lockout
- Audit Logging
- Redis Token Store

---

# 👨‍💻 Author

**Ketan Goyal**

Built to demonstrate secure authentication and authorization using Spring Boot and Spring Security.
