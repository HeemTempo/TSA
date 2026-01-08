# Frontend Code Details

The frontend is a React app. Here is a breakdown of the main files:

### App.tsx

This is where the app starts. It holds the state for which tab you are looking at (Students or Courses) and sets up the layout for the header and footer.

### lib/api.ts

This configures Axios so we can talk to the backend. It has the backend URL and the headers for JSON data.

### hooks/

We have custom hooks here to handle the data:

- useStudents.ts: Handles everything with the students (fetching, adding, deleting).
- useCourses.ts: Handles everything with the courses.
- We used React Query here so the UI updates automatically after every change.

### components/

This is where the actual UI parts are:

- StudentList.tsx: Shows the table of students.
- CourseManagement.tsx: Shows the table of courses and the add course form.
- AddStudentForm.tsx: The form to add new students.
- ui/: This folder has the basic parts like buttons and inputs from shadcn.
