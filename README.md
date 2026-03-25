# URBAN-ALERT

## What is UrbanAlert?

Urban-Alert is a system currently under development that will serve to manage and centralise reports of urban incidents. At present, it allows users to register, authenticate themselves securely and create emergency reports. In addition, it has an intelligent system that automatically classifies the priority of the report (for example, assigning ‘High’ priority if words such as “fire” or ‘blaze’ are detected in the description).

## Technologies Used

* **Node.js**: Runtime environment for the backend.
* **Express**: Framework for creating and managing API routes.
* **MongoDB & Mongoose**: NoSQL database and data modelling for storing users and reports.
* **JWT (JSON Web Tokens)**: For secure authentication and protection of private routes.
* **Bcrypt**: For secure encryption of user passwords.

## Installation Guide

### 1. Install dependencies
Once you have cloned the repository, open your terminal in the project folder and run:

```bash
npm install express mongoose dotenv bcrypt jsonwebtoken
```

This will install each of the libraries needed to run the code.

**What does each bookshop do?**

* **express**: Set up the server and manage the API routes.

* **mongoose**: It connects us to MongoDB and allows us to create data models.

* **dotenv**: Load environment variables from the **.env** file to protect sensitive data.

* **bcrypt**: It is responsible for hashing **(encrypting)** user passwords for maximum security.

* **jsonwebtoken**: Generate and verify tokens to protect private routes.

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
All base routes are configured under **/api/reportes**.

### Authentication (Public Routes)
``` POST /api/reportes/register ```: Creates a new user in the database by encrypting their password.

``` POST /api/reportes/login ```: Validates the user's credentials and returns a JWT token valid for 1 hour.

### Reports (Protected Routes)

**Note:** The JWT must be sent in the request headers (Authorisation: Bearer <your_token>).

``` GET /api/reportes/getAllReports ```: Obtains the complete list of all reports generated.

``` POST /api/reportes/createReports ```: Creates a new report in the system (title, description, location).