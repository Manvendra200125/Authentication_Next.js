# Next.js Authentication Backend

This is a simple Go backend to support the Next.js authentication system with role-based access control.

## Features

- JWT-based authentication with access and refresh tokens
- Role-based access control (RBAC)
- User authentication endpoints 
- CORS support for working with Next.js frontend

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/refresh` - Refresh access token using refresh token
- `GET /api/auth/me` - Get current user information

## Getting Started

### Prerequisites

- Go 1.21 or later
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-auth-backend.git
   cd nextjs-auth-backend
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Run the server:
   ```bash
   go run main.go
   ```

The server will start on port 8080.

## Test Credentials

For testing purposes, the following credentials are available:

- Regular User:
  - Email: user@example.com
  - Password: password123
  - Role: user

- Admin User:
  - Email: admin@example.com
  - Password: admin123
  - Role: admin

## Integration with Next.js Frontend

This backend is designed to work with the Next.js frontend, which handles cookie-based authentication and role-based access control. The frontend should be configured to use this backend for authentication services. 