# LeadNeuroBackend
## Project Description

LeadNeuroBackend is a RESTful API built with Node.js, Express.js, and MongoDB for managing staff and hospital operations in a neurodiagnostic clinic.

The system supports authentication, role-based authorization, staff management, doctor management, nurse management, cleaner management, and drug management.


## Features
Staff Authentication
JWT Authentication
Role-Based Authorization
Staff Management
Doctor Profile Management
Nurse Profile Management
Cleaner Profile Management
Drug Management
Password Reset via Email
Input Validation
Password Hashing with bcrypt
MongoDB Database Integration

## Technologies Used
Technology	                     Purpose
Node.js	                     Runtime Environment
Express.js	                   Web Framework
MongoDB                      	Database
Mongoose	                       ODM
JWT	                           Authentication
bcrypt	                      Password Hashing
Nodemailer	                   Email Service
Express Validator / Joi	      Request Validation
dotenv	                    Environment Variables
Postman	                         API Testing

## Installation
Clone the repository

git clone <repository-url>

Navigate into the project

cd LeadNeuroBackend

Install dependencies

npm install

Create a .env file and configure the required environment variables.

Start the development server

npm run dev

## Environment Variables
Create a .env file in the project root.

Example:

PORT=4000

MONGODB_URL=your_mongodb_connection_string

ACCESS_TOKEN=your_access_token_secret

REFRESH_TOKEN=your_refresh_token_secret

EMAIL_USER=your_email@example.com

EMAIL_PASS=your_email_password



 ## Authentication

Responsible for user authentication and account security.

Endpoints include:

Register Staff
Login
Forgot Password
Reset Password

## Staff Management

Responsible for managing staff records.

Operations include:

Get All Staff
Get Staff by ID
Update Staff
Delete Staff


## Doctor Management

Responsible for managing doctor profiles linked to staff accounts.

Operations include:

Create Doctor Profile
Get All Doctors
Get Doctor by ID
Update Doctor
Delete Doctor

## Nurse Management

Responsible for managing nurse profiles linked to staff accounts.

Operations include:

Create Nurse Profile
Get All Nurses
Get Nurse by ID
Update Nurse
Delete Nurse

## Cleaner Management

Responsible for managing cleaner profiles linked to staff accounts.

Operations include:

Create Cleaner Profile
Get All Cleaners
Get Cleaner by ID
Update Cleaner
Delete Cleaner

## Drug Management

Responsible for managing drug records.

Operations include:

Create Drug
Get All Drugs
Search Drug
Get Drug by ID
Update Drug
Delete Drug

## API Documentation
Detailed endpoint documentation is available in the project's Postman Collection.

The collection includes:

Request headers
Request body examples
Response examples
Error responses
Authentication requirements

## Project Structure
LeadNeuroBackend/ 
│ 
├── Config/ 
├── Controllers/ 
├── Middlewares/ 
├── Models/ 
├── Routes/ 
├── Utils/ 
├── Validators/ 
├── .env 
├── .gitignore 
├── package.json 
├── server.js 
└── README.md

## Authentication
The API uses JSON Web Tokens (JWT).

Include the access token in protected requests.

Authorization: Bearer <access_token>


##  Request Validation

Incoming requests are validated before processing.

Validation includes:

Required fields
Email format
Password strength
Enum validation
Data type validation

## Status Codes
Code	Meaning
200	      OK
201	    Created
204	   No Content
400	   Bad Request
401	   Unauthorized
403	    Forbidden
404	    Not Found
409	    Conflict
500	   Internal Server Error

## Security

The application implements:

Password hashing with bcrypt
JWT authentication
Role-based authorization
Password reset tokens
Environment variable protection
Mongoose query protection

## Available Endpoints

| Module         | Endpoint                               | Description             |
| -------------- | -------------------------------------- | ----------------------- |
| Authentication | POST `/staff/register`                 | Register a staff member |
| Authentication | POST `/staff/login`                    | Login                   |
| Staff          | GET `/staff/all_Staff`                 | Get all staff           |
| Doctors        | POST `/doctor/create_Doctor/:staff_id` | Create doctor profile   |
| Drugs          | POST `/drug/create_Drug`               | Create drug             |

## Error Handling

## Future Improvements
Docker Support
Swagger/OpenAPI Documentation
Unit Testing
Integration Testing
Refresh Token Rotation
API Versioning
CI/CD Pipeline
Request Logging
Rate Limiting
File Upload Support

## 📚 API Documentation

- **Postman Documentation:** https://documenter.getpostman.com/view/44317742/2sBY4PPLh6

- **Swagger UI:** Available locally at `https://leadneurobackend.onrender.com/api-docs` after starting the server.

## Author

Clerk Oghenekobaro

Backend Developer

Node.js | Express.js | MongoDB