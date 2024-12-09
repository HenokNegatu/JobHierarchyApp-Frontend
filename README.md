# Job Hierarchy Web App

Welcome to the **Job Hierarchy Web App**, a platform designed to manage organizational job positions and employees efficiently. This README provides step-by-step instructions for first-time setup and usage.

---

## Features
- Manage job positions and employees in a hierarchical structure.
- Admin can register employees and track their status.
- Employees can complete their registration securely.

---

## First-Time Setup (Admin)

1. **Set the Admin Email:**
   - Ensure the environment variable `ADMIN_SETUP_EMAIL` is set to a valid email address before starting the app.
   - Example:
     ```env
     ADMIN_SETUP_EMAIL=admin@example.com
     ```

2. **Start the Application:**
   - Run the application using the appropriate command for your setup (e.g., Docker, Node.js, etc.).

3. **Admin Signup:**
   - Navigate to the `/auth/signup` route in your browser or API client.
   - Use the email specified in `ADMIN_SETUP_EMAIL` to create an admin account.

4. **Edit Dummy Information:**
   - Log in to the application and replace any placeholder data with accurate organizational details.

---

## Employee Registration Process

1. **Admin Registers Employees:**
   - Admin must pre-register employees within the app by providing their email addresses.

2. **Employee Signup:**
   - Employees receive their registered email details from the admin.
   - Navigate to the `/auth/signup` route.
   - Use the registered email to create a password and complete the signup process.

3. **Employee Status Updates:**
   - Once the employee successfully completes their signup:
     - The employee's status changes from **red (pending)** to **green (active)** in the admin's dashboard.

---

## Notes
- Ensure the `ADMIN_SETUP_EMAIL` is valid, as it is critical for admin account creation.
- Only emails pre-registered by the admin can be used by employees for signup.
- Monitor employee statuses to track registration progress.

---

