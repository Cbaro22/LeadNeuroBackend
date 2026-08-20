## LeadNeuroBackend

A RESTful backend API for managing staff and operational activities in a neurodiagnostic clinic.

LeadNeuroBackend is built with Node.js, Express.js, MongoDB, and Mongoose. The system provides authentication, role-based authorization, staff management, clinical staff profiles, drug management, validation, password recovery, API documentation, rate limiting, and automated testing.

## Features

JWT-based authentication
Role-based authorization
Staff registration and management
Doctor profile management
Nurse profile management
Cleaner profile management
Drug management
Password reset via email
Password hashing with bcrypt
Request validation
MongoDB database integration
Centralized error handling
API rate limiting
Swagger/OpenAPI documentation
Postman API testing and documentation
Automated testing with Jest


## Technology Stack

Technology                	    Purpose
Node.js	                   Runtime environment
Express.js	               Web framework
MongoDB	                     Database
Mongoose	                  MongoDB ODM
JSON Web Token (JWT)	      Authentication
bcrypt	                      Password hashing
Nodemailer	               Email/password-reset service
express-validator	         Request validation
express-rate-limit	            API rate limiting
dotenv	                      Environment variable management
Jest	                        Automated testing
Swagger/OpenAPI	                API documentation
Postman	                     API testing and documentation


##  Project Architecture

The application follows a modular backend architecture separating routes, controllers, models, validation, middleware, configuration, and services.

## Main modules
Authentication & Staff
Doctors
Nurses
Cleaners
Drugs

## Installation
1. Clone the repository
git clone <repository-url>
2. Navigate into the project
cd LeadNeuroBackend
3. Install dependencies
npm install
4. Configure environment variables

Create a .env file in the project root.

Example:

PORT=4000

MONGODB_URL=your_mongodb_connection_string

ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Important: Never commit your actual .env file or secret credentials to GitHub. Use .gitignore to keep sensitive environment variables out of version control.

## Running the Application
# Development
npm run dev

# Production
npm start

The API runs on port 4000 by default.

Local base URL:

http://localhost:4000

## API Documentation

LeadNeuroBackend provides API documentation through both Swagger/OpenAPI and Postman.

# Swagger UI

Swagger provides interactive documentation for the API endpoints, request parameters, schemas, authentication requirements, and responses.

Local Swagger URL:

http://localhost:4000/api-docs

The deployed Swagger documentation is also available through the Render deployment.

# Postman Documentation

The project also includes a Postman collection containing:

API endpoints
Request headers
Request body examples
Authentication requirements
Response examples
Error responses

## Authentication

The API uses JSON Web Tokens (JWT) to authenticate protected requests.

After successful login, the client receives an access token.

Protected endpoints require the token in the request header:

Authorization: Bearer <access_token>

# Authentication operations
Register staff
Login
Forgot password
Reset password

# Role-Based Authorization

Protected resources can be restricted according to staff roles.

Supported staff roles include:

admin
doctor
nurse
cleaner

Authorization middleware checks the authenticated user's role before allowing access to protected operations.

## Staff Management

The Staff module manages staff accounts and authentication-related information.

Operations include:

Register staff
Login
Get all staff
Get staff by ID
Update staff
Delete staff
Forgot password
Reset password

## Doctor Management

The Doctor module manages doctor profiles linked to staff accounts.

Operations include:

Create doctor profile
Get all doctors
Get doctor by ID
Update doctor
Delete doctor

## Nurse Management

The Nurse module manages nurse profiles linked to staff accounts.

Operations include:

Create nurse profile
Get all nurses
Get nurse by ID
Update nurse
Delete nurse

## Cleaner Management

The Cleaner module manages cleaner profiles linked to staff accounts.

Operations include:

Create cleaner profile
Get all cleaners
Get cleaner by ID
Update cleaner
Delete cleaner

## Drug Management

The Drug module manages medication/drug records.

Operations include:

Create drug
Get all drugs
Get drug by ID
Search drugs
Search by brand name
Search by generic name
Update drug
Delete drug

## Request Validation

Incoming requests are validated before being processed by the controllers.

Validation includes:

Required fields
Email format
Password requirements
Enumeration values
Data types
Field-specific validation rules

Validation errors are returned as structured JSON responses.

## Error Handling

The application uses centralized error-handling middleware.

Common errors handled include:

Invalid request data
Invalid MongoDB ObjectIds
Authentication errors
Authorization errors
Resource not found errors
Duplicate/conflict errors
Internal server errors

Example response:

{
  "success": false,
  "message": "Resource not found"
}


## Rate Limiting

The API uses express-rate-limit to help protect endpoints from excessive requests.

The current configuration uses a 15-minute request window with a production limit of 5 requests per window.

Rate-limit headers are returned using the standard header configuration.

## Security

The application implements several security measures, including:

Password hashing with bcrypt
JWT authentication
Role-based authorization
Password reset tokens
Environment variable protection
Request validation
Rate limiting
Mongoose-based database access
Centralized error handling

Sensitive credentials and secrets should be stored in environment variables and never committed to the repository.

## HTTP Status Codes
Code	                    Meaning
200	                           OK
201	                         Created
204	                        No Content
400	                         Bad Request
401	                        Unauthorized
403	                         Forbidden
404	                        Not Found
409	                         Conflict
500	                 Internal Server Error


## Testing

The project uses Jest for automated testing.

Tests cover important application functionality, including authentication, controllers, middleware, validation, and API behavior.

The project currently has approximately 86% test coverage.

Run the test suite with:

npm test

If coverage is configured in the project scripts, coverage can be generated using the corresponding Jest coverage command.

## API Endpoint Examples

The following are examples of available API operations:

Module	          Method	      Endpoint	                    Description
Authentication	  POST	      /staff/register	             Register a staff member
Authentication	  POST	      /staff/login	                        Login
Staff	           GET	     /staff/all_Staff	                 Get all staff
Staff	           GET	     /staff/get_Staff/:id	              Get staff by ID
Doctors	          POST	     /doctor/create_Doctor/:staff_id	 Create doctor profile
Doctors	          GET	     /doctor/all_Doctor	                   Get all doctors
Nurses	          POST	     /nurse/create_Nurse/:staff_id	      Create nurse profile
Nurses	           GET	      /nurse/all_Nurse	                   Get all nurses
Cleaners	       POST	     /cleaner/create_Cleaner/:staff_id	Create cleaner profile
Cleaners	       GET	     /cleaner/all_Cleaner	               Get all cleaners
Drugs	          POST	     /drug/create_Drug	                 Create drug
Drugs	           GET	       /drug/all_Drugs	                  Get all drugs

For the complete and authoritative list of endpoints, request schemas, parameters, authentication requirements, and responses, refer to the Swagger documentation and Postman collection.

## Project Structure

LeadNeuroBackend/
│
├── Config/
│   ├── corsOptions.js
│   ├── db.js
│   └── swagger.js
│
├── Controllers/
│   ├── staffCtrls.js
│   ├── DoctorCtrls.js
│   ├── NurseCtrls.js
│   ├── CleanerCtrls.js
│   └── DrugCtrls.js
│
├── Middlewares/
│   ├── authentication.js
│   ├── Authorization.js
│   ├── errorHandler.js
│   └── rateLimiter.js
│
├── Models/
│   ├── Staff.js
│   ├── Doctor.js
│   ├── Nurse.js
│   ├── Cleaner.js
│   └── Drug.js
│
├── Routes/
│   ├── indexRoute.js
│   ├── StaffRoutes.js
│   ├── DoctorRoutes.js
│   ├── NurseRoutes.js
│   ├── CleanerRoutes.js
│   └── DrugRoutes.js
│
├── Services/
│
├── Validators/
│
├── Utils/
│
├── tests/
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

The exact directory contents may evolve as the project develops.

## Deployment

The application is deployable as a Node.js backend service.

The current deployment uses Render.

The production API base URL is:

https://leadneurobackend.onrender.com

Swagger documentation is available through:

https://leadneurobackend.onrender.com/api-docs


## Future Improvements

Possible future improvements include:

Docker containerization
Refresh token rotation
API versioning
CI/CD pipeline
Structured application logging
Additional automated test coverage
Additional security hardening
Performance optimization
Improved monitoring and observability

## Author

Clerk Oghenekobaro

Backend Developer

Tech Stack: Node.js | Express.js | MongoDB

# License

This project is currently intended for development, learning, and demonstration purposes.
