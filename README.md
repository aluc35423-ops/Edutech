# 📖 EDUTECH - Backend API 📖

## What is EDUTECH?

EDUTECH was created to solve a common problem: in many institutions, the management of resources (classrooms, projectors, laboratories, computer equipment) is chaotic. Teachers and students are constantly making overlapping requests, and administrators have no standardised way of prioritising who needs which resource most urgently.

The Solution: A centralised system where users can request resources in an orderly manner. This system will not only record the booking but also calculate a priority level based on the user’s role, the type of event and how far in advance the booking is made, automatically approving or queuing requests.

## Technologies Used

* **Node.js**: Runtime environment for the backend.
* **Express**: Framework for creating and managing API routes.
* **MongoDB & Mongoose**: NoSQL database and data modelling for storing roles, materials and solicitude.
* **JWT (JSON Web Tokens)**: For secure authentication and protection of private routes.
* **Bcrypt**: For secure encryption of user passwords.
* **Swagger**: For interactive documentation by the endpoints.

## Installation Guide

### 1. Install dependencies
Once you have cloned the repository, open your terminal in the project folder and run:

```bash
npm install express mongoose dotenv bcrypt jsonwebtoken swagger-jsdoc swagger-ui-express
```

This will install each of the libraries needed to run the code.

**What does each bookshop do?**

* **express**: Set up the server and manage the API routes.

* **mongoose**: It connects us to MongoDB and allows us to create data models.

* **dotenv**: Load environment variables from the **.env** file to protect sensitive data.

* **bcrypt**: It is responsible for hashing **(encrypting)** user passwords for maximum security.

* **jsonwebtoken**: Generate and verify tokens to protect private routes.

* **Swagger** : Generate a screen to use the endpoints of a better way.

### 2. Environment Variable Configuration
Create a file named **.env** in the root of your project. This is where you will store sensitive credentials. Add the following variables with your own configuration:

```bash
PORT=3000
MONGO_URI='your_mongodb_connection_string'
SUPABASE_URL='your_supabase_connection_string'
SUPABASE_KEY='your_supabase_connection_key'
JWT_SECRET=your_secret_word
```

### 3. Start the server

To set up the API in your local environment, run:

```bash
node index.js
```

You will see a message in the console indicating that the connection to MongoDB was successful and the port on which it is running.

## Main Endpoints
The base URL for the API is **http://localhost:3000/api**.

### 👤 Users (/api/users)
``` POST /api/reportes/register ```: Creates a new user in the database by encrypting their password.

``` POST /register ```: Registers a new user (requires email, password, first name, surname and role).

``` POST /login ```: Validates credentials and returns a JWT token.

``` GET / ```: Retrieves all users (requires a token).

``` GET /:id, PUT /:id, DELETE /:id ```: Searches for, updates or deletes a specific user.

### 🎒 Materials and Resources (/api/materials)
``` POST /NewMaterial ```: Adds a new resource, specifying title, description, location and status (available/unavailable).

``` GET / ```: Retrieves all registered materials.

``` GET /:id, PUT /:id, DELETE /:id ```: Updates, deletes or Get a material from the system.

### 📝 Requests (/api/solicitude)
``` POST /NewSolicitude ```: Creates a request (title, description, priority, status, scheduled date). The system automatically sets the priority (low, medium, high).

``` GET / ```: Retrieves all requests.

``` GET /:id, PUT /:id, DELETE /:id ```: Updates, deletes or Get a solicitude from the system.