# AdmitSpot Assignment

## Overview
This project is a contact management system that allows users to manage their contacts efficiently. Users can register, log in, and perform CRUD operations on their contacts.

## Installation

1. Clone the repository:
   ```bash
   https://github.com/umaGannamani/AdmitSpotAssignment.git
   cd admitspot-assignment
   Install dependencies:
     npm install
   Run migrations:
     npx sequelize-cli db:migrate
   Start the server:
    npm start

API Endpoints
POST /auth/register: Register a new user
POST /auth/login: Log in a user
GET /auth/verify/:token: Verify user email
POST /auth/reset-password: Send reset password email
POST /auth/reset-password/update/:token: Update password
POST /contacts: Add a new contact
GET /contacts: Get all contacts
PUT /contacts/:id: Update a contact
DELETE /contacts/:id: Delete a contact
POST /contacts/upload: Upload contacts from CSV
GET /contacts/export: Export contacts to CSV
