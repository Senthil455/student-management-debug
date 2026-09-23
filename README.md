# Student Management System

A small college system with four pages: **Register**, **Search**, **Update** and **Manage**.

## How to run

1. Install Node.js 18 or newer (https://nodejs.org).
2. Open a terminal in this folder.
3. Run:

   ```
   npm install
   npm start
   ```

4. Open http://localhost:3000 in your browser.

## Pages

| Page | What it does |
| --- | --- |
| Register | Add a new student to the database |
| Search | Find a student by register number |
| Update | Change a student's details (name, email, phone, department, year) |
| Manage | See every record, delete a student, restore the sample data |

## Notes for participants

- This application contains a limited number of intentional defects.
- Find and fix **only the defects assigned to your team**. Do not rewrite the application.
- Use the **Manage** page to inspect the data after every action - it shows every record with its ID.
- The browser console (F12) and the Network tab are your friends.
- After editing code, restart the server (Ctrl+C, then `npm start`) and re-test.
- "Restore Sample Data" on the Manage page resets the records at any time.
