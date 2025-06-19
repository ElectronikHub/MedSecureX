<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MedSecureX - README</title>
</head>
<body>
  <h1>MedSecureX</h1>
  <p>
    <b>MedSecureX</b> is a secure, automated portal designed for clinic and hospital staff. It streamlines patient management and improves collaboration between doctors, nurses, and administrators. Built with a Laravel backend and a React frontend, MedSecureX offers role-based dashboards, real-time updates, and strong data security for healthcare teams.
  </p>

  <h2>Repository Purpose</h2>
  <p>
    This repository provides a full-stack application for healthcare environments, focusing on:
    <ul>
      <li>Automated assignment of patients and tasks to staff</li>
      <li>Role-based dashboards for Admin, Doctor, and Nurse users</li>
      <li>Secure authentication and user management</li>
      <li>Real-time updates and notifications</li>
      <li>Modular, maintainable code structure</li>
    </ul>
  </p>

  <h2>File Structure</h2>
  <pre>
resources/
└── css/
└── js/
    └── Components/
        └── Layouts/
            ├── AuthenticatedLayout.jsx
            └── GuestLayout.jsx
        └── Pages/
            └── Admin/
                ├── EditScheduleModal.jsx
                ├── ScheduleTable.jsx
                ├── StaffPanel.jsx
                └── StatCard.jsx
            └── Auth/
                ├── ConfirmPassword.jsx
                ├── ForgotPassword.jsx
                ├── Login.jsx
                ├── Register.jsx
                ├── ResetPassword.jsx
                └── VerifyEmail.jsx
            └── Doctor/
                ├── AdmittedPatientsPanel.jsx
                ├── AssignDoctorForm.jsx
                ├── CurrentPatientPanel.jsx
                ├── StatsPanel.jsx
                ├── TimelinePanel.jsx
                └── UpcomingPatientsPanel.jsx
            └── Nurse/
                ├── EditPatientModal.jsx
                ├── NotificationsPanel.jsx
                ├── PatientsPanel.jsx
                ├── SchedulePanel.jsx
                ├── StatsPanel.jsx
                └── WelcomePanel.jsx
            └── Profile/
                └── Partials/
                    └── Edit.jsx
            ├── AdminDashboard.jsx
            ├── Dashboard.jsx
            ├── DoctorDashboard.jsx
            ├── NurseDashboard.jsx
            └── Welcome.jsx
    ├── app.jsx
    └── bootstrap.js
  </pre>

  <h2>Getting Started</h2>
  <ol>
    <li>Clone the repository: <code>git clone https://github.com/ElectronikHub/MedSecureX.git</code></li>
    <li>Install backend dependencies: <code>composer install</code></li>
    <li>Install frontend dependencies: <code>npm install</code></li>
    <li>Copy <code>.env.example</code> to <code>.env</code> and set up your database credentials</li>
    <li>Run migrations: <code>php artisan migrate</code></li>
    <li>Start Laravel server: <code>php artisan serve</code></li>
    <li>Start frontend dev server: <code>npm run dev</code></li>
    <li>Open <code>http://localhost:8000</code> in your browser</li>
  </ol>

  <h2>Contributing</h2>
  <p>
    Contributions are welcome! Please fork the repository and submit a pull request.<br>
    For major changes, open an issue first to discuss what you would like to change.
  </p>

  <h2>License</h2>
  <p>
    &copy; 2025 ElectronikHub. All rights reserved.
  </p>
  <hr>
  <p>
    <b>Note:</b> This README is based on the current frontend structure as shown in the project screenshots.
  </p>
</body>
</html>
