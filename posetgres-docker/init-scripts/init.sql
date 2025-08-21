-- This SQL script initializes the PostgreSQL database with necessary tables and initial data.

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password)
VALUES ('admin', '$2a$10$tRkSxmV2dODW.E1VoYL6fupgjd9S9gQixPLQDJ6BaXUuYUOB2FSnq'); --P@ssword123!
