# Backend Code Details

I've added comments to the main backend files so they're easy to follow.

### server.js

This file starts everything.

- It uses `dotenv` to load your database info from the .env file.
- It uses `cors` so the frontend can talk to it.
- I wrote a custom middleware to log every request. You'll see things like `[2026-01-08 12:54:12] GET /api/students - 200 (15ms)` in the terminal.

### database/db.js

This sets up the connection pool for MySQL. It uses the variables you put in your .env file.

### controllers/

This is where the actual logic for students and courses lives. Each file has functions that run SQL queries to add, edit, or delete data from the database.

- studentController.js handles the student records.
- courseController.js handles the course records.

### routes/

These files just connect the API URL paths to the functions in the controllers.

- studentRoutes.js maps the /api/students path.
- courseRoutes.js maps the /api/courses path.
