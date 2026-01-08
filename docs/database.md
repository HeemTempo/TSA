# Database setup

This system uses MySQL to store everything.

Tables:

- courses: Stores the course name and code.
- students: Stores student info and connects them to a course.

If you want to reset the database or create the tables for the first time, run this in the backend folder:
`npm run db:init`
