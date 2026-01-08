# Backend Info

The backend is built with Node.js and Express.

Main parts:

- server.js: This is the entry point. It sets up the server and the custom logger.
- controllers/: This folder has the logic for students and courses (SQL queries).
- routes/: This folder defines the URL paths for the API.
- database/: This is where the MySQL connection is set up.

We used nodemon so the server restarts automatically when we change the code.
Every request you make from the frontend will show up in the terminal with its status and how long it took.
