# Next.js 15 Authentication with Go Backend

This project demonstrates a robust authentication and role-based access control (RBAC) system using Next.js 15 with a Go backend. The system uses cookie-based authentication that works consistently across both server actions and client-side requests.

## Features

- Cookie-based authentication with Next.js 15
- Role-based access control (RBAC)
- Go backend for authentication services
- JWT token handling with refresh and access tokens
- Protected routes based on user roles
- Client-side authentication state management
- Server-side cookie validation

## Solution for Cookie Handling

This project addresses the challenge of consistent cookie handling between server actions and client requests in Next.js 15 by:

1. Centralizing cookie management on the server-side using Next.js API routes
2. Setting cookies with consistent options across all authentication operations:
   - Root path (`/`)
   - Secure and HTTP-only flags
   - Same-site policy
3. Using middleware for route protection and RBAC
4. Global authentication state through React Context API
5. Automatic logout when cookies are deleted

## Directory Structure

```
├── app
│   ├── api
│   │   └── auth
│   │       ├── login
│   │       ├── logout
│   │       └── me
│   ├── components
│   ├── lib
│   │   └── auth
│   └── middleware.ts
├── backend
│   └── main.go
└── public
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- Go 1.21 or later (for backend)

### Installation

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   go mod download
   ```

### Running the Application

1. Start the backend:
   ```bash
   cd backend
   go run main.go
   ```

2. Start the Next.js development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## How It Works

### Authentication Flow

1. User submits login credentials
2. Next.js API route forwards request to Go backend
3. Backend validates credentials and returns JWT tokens
4. Next.js sets HTTP-only cookies with tokens at the root domain
5. Middleware checks user role for protected routes
6. User information is globally accessible through React Context

### RBAC Implementation

- Routes are protected based on user roles defined in middleware
- UI components conditionally render based on the user's role
- Both client and server-side role checks for security

### Cookie Management

- Cookies are set by the server to ensure consistency
- Cookies are stored at the root path (/) for access across all routes
- HTTP-only and secure flags prevent client-side tampering #   A u t h e n t i c a t i o n  
 #   A u t h e n t i c a t i o n _ N e x t . j s  
 #   A u t h e n t i c a t i o n _ N e x t . j s  
 #   A u t h e n t i c a t i o n _ N e x t . j s  
 