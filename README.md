
<body>
  <h1>MedSecureX</h1>
  <p>
    <strong>MedSecureX</strong> is an all-in-one platform for nurses, doctors, and administrators to seamlessly assign, access, and manage patient data with automation, security, and ease. It is designed to help healthcare teams work more efficiently and collaboratively, while ensuring that sensitive data is always secure.
  </p>

  <h2>Features</h2>
  <ul>
    <li><b>Automated Assigning:</b> Smart algorithms automatically assign patients and tasks to available medical staff, saving time and reducing errors.</li>
    <li><b>Secure Data Access:</b> All patient records and schedules are securely stored and accessible only to authorized personnel.</li>
    <li><b>Real-Time Collaboration:</b> Doctors and nurses can collaborate, update records, and receive notifications in real time.</li>
  </ul>

  <h2>User Roles</h2>
  <ul>
    <li><b>Doctor:</b> Access and manage assigned patients, view and edit schedules.</li>
    <li><b>Nurse:</b> View assignments, update patient status, and collaborate with doctors.</li>
    <li><b>Admin:</b> Manage users, assign roles, and oversee schedules and system statistics.</li>
  </ul>

  <h2>System Overview</h2>
  <p>
    MedSecureX provides a secure, user-friendly interface for healthcare teams to work efficiently and collaboratively. The system is built using modern web technologies for both the frontend and backend, ensuring a smooth and responsive user experience.
  </p>

  <h2>Tools, Languages, and Frameworks</h2>
  <ul>
    <li>
      <b>JavaScript (ReactJS):</b>
      <ul>
        <li><b>Purpose:</b> ReactJS is a modern JavaScript library for building fast, interactive user interfaces.</li>
        <li><b>How it’s used:</b> All the dynamic parts of your MedSecureX web app—such as the landing page, dashboards, and interactive panels—are built using React components.</li>
        <li><b>Why:</b> React makes the UI modular, reusable, and easy to update in real time.</li>
      </ul>
    </li>
    <li>
      <b>PHP (Laravel):</b>
      <ul>
        <li><b>Purpose:</b> Laravel is a powerful PHP framework for building robust, secure, and maintainable backends and APIs.</li>
        <li><b>How it’s used:</b> Laravel handles user authentication, database management, business logic, and serves the data to the React frontend (often via Inertia.js).</li>
        <li><b>Why:</b> Laravel’s expressive syntax and built-in features (like migrations, Eloquent ORM, and routing) speed up development and keep backend code organized.</li>
      </ul>
    </li>
    <li>
      <b>CSS (Tailwind CSS):</b>
      <ul>
        <li><b>Purpose:</b> Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.</li>
        <li><b>How it’s used:</b> All the styling in MedSecureX (the clean header, cards, buttons, layout, etc.) uses Tailwind classes directly in the JSX/HTML.</li>
        <li><b>Why:</b> Tailwind enables you to design beautiful, responsive layouts without writing custom CSS files, keeping styles consistent and maintainable.</li>
      </ul>
    </li>
    <li>
      <b>XAMPP:</b>
      <ul>
        <li><b>Purpose:</b> XAMPP is a free and easy-to-install Apache distribution containing PHP, MySQL, and other tools.</li>
        <li><b>How it’s used:</b> XAMPP provides the local development environment for running your Laravel backend and MySQL database on your computer.</li>
        <li><b>Why:</b> It simplifies local setup, allowing you to develop and test your application before deploying to a live server.</li>
      </ul>
    </li>
  </ul>

  <h2>File Management</h2>
  <p>
    You only need to edit these files/folders to build, update, or maintain your MedSecureX system. Everything else is handled by the frameworks!
  </p>
  <pre>
project-root/
│
├── app/                # Laravel backend logic (Controllers, Models, Middleware, etc.)
│   ├── Http/
│   │   └── Controllers/
│   └── Models/
│
├── database/           # Database migrations and seeders
│   └── migrations/
│
├── resources/
│   ├── css/
│   └── js/
│       ├── Components/
│       │   ├── Layouts/
│       │   │   ├── AuthenticatedLayout.jsx
│       │   │   └── GuestLayout.jsx
│       │   └── Pages/
│       │       ├── Admin/
│       │       │   ├── EditScheduleModal.jsx
│       │       │   ├── ScheduleTable.jsx
│       │       │   ├── StaffPanel.jsx
│       │       │   └── StatCard.jsx
│       │       ├── Auth/
│       │       │   ├── ConfirmPassword.jsx
│       │       │   ├── ForgotPassword.jsx
│       │       │   ├── Login.jsx
│       │       │   ├── Register.jsx
│       │       │   ├── ResetPassword.jsx
│       │       │   └── VerifyEmail.jsx
│       │       ├── Doctor/
│       │       │   ├── AdmittedPatientsPanel.jsx
│       │       │   ├── AssignDoctorForm.jsx
│       │       │   ├── CurrentPatientPanel.jsx
│       │       │   ├── StatsPanel.jsx
│       │       │   ├── TimelinePanel.jsx
│       │       │   └── UpcomingPatientsPanel.jsx
│       │       ├── Nurse/
│       │       │   ├── EditPatientModal.jsx
│       │       │   ├── NotificationsPanel.jsx
│       │       │   ├── PatientsPanel.jsx
│       │       │   ├── SchedulePanel.jsx
│       │       │   ├── StatsPanel.jsx
│       │       │   └── WelcomePanel.jsx
│       │       ├── Profile/
│       │       │   └── Partials/
│       │       │       └── Edit.jsx
│       │       ├── AdminDashboard.jsx
│       │       ├── Dashboard.jsx
│       │       ├── DoctorDashboard.jsx
│       │       ├── NurseDashboard.jsx
│       │       └── Welcome.jsx
│       ├── app.jsx
│       └── bootstrap.js
│
├── routes/             # Laravel route definitions (web.php, api.php)
│
├── .env                # Environment configuration (database, mail, etc.)
  </pre>

  <h3>Explanation of Key Folders</h3>
  <ul>
    <li>
      <b>app/</b> - Contains all the PHP code that powers your application, including:
      <ul>
        <li>Controllers (how your app responds to user actions and requests)</li>
        <li>Models (how your app interacts with the database, like users, patients, schedules)</li>
        <li>Other core classes (middleware, policies, jobs, etc.)</li>
      </ul>
    </li>
    <li>
      <b>database/migrations/</b> - Contains files that describe your database tables. Edit or add files here if you want to change what data your app stores (like adding new fields to users or patients).
    </li>
    <li>
      <b>resources/js/</b> - Where you and your team build and update the user interface of MedSecureX.
    </li>
    <li>
      <b>routes/</b> - Connects your URLs to backend logic and frontend pages, controls access (public vs. admin vs. logged-in users), and keeps your app organized and secure.
    </li>
    <li>
      <b>.env</b> - Where you set up your app’s name, database connection, mail settings, and other sensitive info.
    </li>
  </ul>

  <h2>How to Get Started</h2>
  <ol>
    <li>Clone the repository: <code>git clone https://github.com/ElectronikHub/MedSecureX.git</code></li>
    <li>Install backend dependencies: <code>composer install</code></li>
    <li>Install frontend dependencies: <code>npm install</code></li>
    <li>Copy <code>.env.example</code> to <code>.env</code> and update your database and environment settings</li>
    <li>Run database migrations: <code>php artisan migrate</code></li>
    <li>Start the backend server: <code>php artisan serve</code></li>
    <li>Start the frontend development server: <code>npm run dev</code></li>
    <li>Open <code>http://localhost:8000</code> in your browser</li>
  </ol>


  <h2>License</h2>
  <p>
    &copy; 2025 ElectronikHub. All rights reserved.
  </p>
  <hr>
  <p>
    <b>Note:</b> This README is based on the current folder structure and system design. For more details, see the code and documentation inside each folder.
  </p>

  <h2>Frontend File Structure Screenshot</h2>
=

</body>

