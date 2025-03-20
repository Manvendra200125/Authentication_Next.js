package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
)

var secretKey = []byte("your-secret-key")

// User represents a user in our system
type User struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Role  string `json:"role"`
	Name  string `json:"name,omitempty"`
}

// Credentials for login
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// AuthResponse contains user and token info
type AuthResponse struct {
	User   User        `json:"user"`
	Tokens AuthTokens  `json:"tokens"`
}

// AuthTokens contains access and refresh tokens
type AuthTokens struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

// ErrorResponse for sending error messages
type ErrorResponse struct {
	Message string `json:"message"`
	Code    string `json:"code,omitempty"`
}

// Mock database of users
var users = map[string]User{
	"user@example.com": {
		ID:    "1",
		Email: "user@example.com",
		Role:  "user",
		Name:  "Regular User",
	},
	"admin@example.com": {
		ID:    "2",
		Email: "admin@example.com",
		Role:  "admin",
		Name:  "Admin User",
	},
}

// Mock password database (in a real app, passwords would be hashed)
var passwords = map[string]string{
	"user@example.com":  "password123",
	"admin@example.com": "admin123",
}

func generateTokens(user User) (AuthTokens, error) {
	// Create access token
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.ID,
		"email": user.Email,
		"role": user.Role,
		"exp":  time.Now().Add(time.Minute * 15).Unix(), // 15 minutes
	})

	// Sign and get the complete encoded token as a string
	accessTokenString, err := accessToken.SignedString(secretKey)
	if err != nil {
		return AuthTokens{}, err
	}

	// Create refresh token with longer expiration
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(), // 7 days
	})

	// Sign refresh token
	refreshTokenString, err := refreshToken.SignedString(secretKey)
	if err != nil {
		return AuthTokens{}, err
	}

	return AuthTokens{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Check if user exists
	user, exists := users[creds.Email]
	if !exists {
		respondWithError(w, "Invalid email or password", "AUTH_ERROR", http.StatusUnauthorized)
		return
	}

	// Check password
	storedPassword, exists := passwords[creds.Email]
	if !exists || storedPassword != creds.Password {
		respondWithError(w, "Invalid email or password", "AUTH_ERROR", http.StatusUnauthorized)
		return
	}

	// Generate tokens
	tokens, err := generateTokens(user)
	if err != nil {
		respondWithError(w, "Failed to generate tokens", "SERVER_ERROR", http.StatusInternalServerError)
		return
	}

	// Return tokens and user info
	response := AuthResponse{
		User:   user,
		Tokens: tokens,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func refreshTokenHandler(w http.ResponseWriter, r *http.Request) {
	var tokenRequest struct {
		RefreshToken string `json:"refreshToken"`
	}

	err := json.NewDecoder(r.Body).Decode(&tokenRequest)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Parse the token
	token, err := jwt.Parse(tokenRequest.RefreshToken, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil || !token.Valid {
		respondWithError(w, "Invalid or expired refresh token", "TOKEN_ERROR", http.StatusUnauthorized)
		return
	}

	// Get user ID from token
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		respondWithError(w, "Invalid token claims", "TOKEN_ERROR", http.StatusInternalServerError)
		return
	}

	// Find the user - in a real app, you'd look up the user by ID
	// Here we're just using email as the key for our mock database
	var matchedUser User
	var found bool

	for _, user := range users {
		if user.ID == claims["sub"] {
			matchedUser = user
			found = true
			break
		}
	}

	if !found {
		respondWithError(w, "User not found", "USER_ERROR", http.StatusNotFound)
		return
	}

	// Generate new tokens
	newTokens, err := generateTokens(matchedUser)
	if err != nil {
		respondWithError(w, "Failed to generate tokens", "SERVER_ERROR", http.StatusInternalServerError)
		return
	}

	// Return new tokens and user info
	response := AuthResponse{
		User:   matchedUser,
		Tokens: newTokens,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func meHandler(w http.ResponseWriter, r *http.Request) {
	// Get authorization header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" || len(authHeader) < 8 {
		respondWithError(w, "Authorization header is required", "AUTH_ERROR", http.StatusUnauthorized)
		return
	}

	// Extract token from "Bearer" prefix
	tokenString := authHeader[7:]

	// Parse and validate token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil || !token.Valid {
		respondWithError(w, "Invalid or expired token", "TOKEN_ERROR", http.StatusUnauthorized)
		return
	}

	// Get user info from token
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		respondWithError(w, "Invalid token claims", "TOKEN_ERROR", http.StatusInternalServerError)
		return
	}

	// Find the user based on the email in the token
	email, ok := claims["email"].(string)
	if !ok {
		respondWithError(w, "Invalid token claims", "TOKEN_ERROR", http.StatusInternalServerError)
		return
	}

	user, exists := users[email]
	if !exists {
		respondWithError(w, "User not found", "USER_ERROR", http.StatusNotFound)
		return
	}

	// Return user info
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user": user,
	})
}

func respondWithError(w http.ResponseWriter, message, code string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(ErrorResponse{
		Message: message,
		Code:    code,
	})
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler
		next.ServeHTTP(w, r)
	})
}

func main() {
	r := mux.NewRouter()
	
	// Apply CORS middleware
	r.Use(corsMiddleware)

	// Auth routes
	r.HandleFunc("/api/auth/login", loginHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/auth/refresh", refreshTokenHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/auth/me", meHandler).Methods("GET", "OPTIONS")

	// Start server
	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
} 