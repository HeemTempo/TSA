# Student and Course Management System

This is a simple system for managing students and courses, built for Tanzanite Skills Academy. It has a React frontend and a Node.js backend with a MySQL database.

## Project Folders

- /backend: Express server and database logic.
- /frontend: React app for the user interface.
- /docs: More technical explanations of the code.

## How to set it up

### 1. Database

Make sure you have MySQL installed and running. Check the `.env` file in the backend folder to make sure your database credentials match.
To create the tables, go to the backend folder and run:
`npm run db:init`

### 2. Backend

To start the server with auto-reload and request logging, go to the backend folder and run:

1. `npm install`
2. `npm run dev`

You will see every request (GET, POST, etc.) showing up in your terminal with the time and status code.

### 3. Frontend

To start the frontend, go to the frontend folder and run:

1. `npm install`
2. `pnpm dev`

Once it's running, you can add courses, register students, and see the communication in your backend terminal.
