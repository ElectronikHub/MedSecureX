<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MedSecureX - README</title>
</head>
<body>
  <h1>MedSecureX</h1>
  <p>
    MedSecureX is a platform for nurses and doctors to assign, access, and manage patient data with automation, security, and ease.
  </p>

  <h2>Features</h2>
  <ul>
    <li>Automated Assigning: Patients and tasks are automatically assigned to available staff.</li>
    <li>Secure Data Access: Patient records and schedules are securely stored and accessible only to authorized personnel.</li>
    <li>Real-Time Collaboration: Doctors and nurses can collaborate, update records, and receive notifications in real time.</li>
  </ul>

  <h2>Tech Stack</h2>
  <ul>
    <li>Frontend: ReactJS, Inertia.js, Tailwind CSS</li>
    <li>Backend: Laravel (PHP)</li>
    <li>Database: MySQL</li>
  </ul>

  <h2>Project Structure (Relevant Files)</h2>
  <pre>
resources/
└── js/
    ├── Pages/
    │   ├── Landing.jsx
    │   └── AdminDashboard.jsx
    ├── Components/
    │   └── Admin/
    │       ├── StatCard.jsx
    │       ├── StaffPanel.jsx
    │       ├── ScheduleTable.jsx
    │       └── EditScheduleModal.jsx
    └── Layouts/
        └── AuthenticatedLayout.jsx

app/
├── Http/
│   └── Controllers/
│       └── Admin/
│           └── ManagementController.php
└── Models/
    ├── User.php
    ├── Patient.php
    └── Schedule.php

database/
└── migrations/
    ├── ...create_users_table.php
    ├── ...create_patients_table.php
    └── ...create_schedules_table.php

routes/
└── web.php

.env
  </pre>

  <h2>Getting Started</h2>
  <ol>
    <li>Clone the repository</li>
    <li>Install backend dependencies: <code>composer install</code></li>
    <li>Install frontend dependencies: <code>npm install</code></li>
    <li>Copy <code>.env.example</code> to <code>.env</code> and set up your database credentials</li>
    <li>Run migrations: <code>php artisan migrate</code></li>
    <li>Start backend: <code>php artisan serve</code></li>
    <li>Start frontend: <code>npm run dev</code></li>
    <li>Visit <code>http://localhost:8000</code> in your browser</li>
  </ol>

  <h2>User Roles</h2>
  <ul>
    <li>Doctor: Manage assigned patients and schedules.</li>
    <li>Nurse: View assignments, update patient status, collaborate with doctors.</li>
    <li>Admin: Manage users, assign roles, oversee schedules and statistics.</li>
  </ul>

  <h2>Contributing</h2>
  <p>
    Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
  </p>

  <h2>Support</h2>
  <p>
    For questions or support, email: support@medsecurex.com
  </p>

  <p>
    &copy; 2025 Electronikhub. All rights reserved.
  </p>
</body>
</html>
