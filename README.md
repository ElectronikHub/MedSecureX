<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MedSecureX - README</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f7fafc;
      color: #222;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 900px;
      margin: 40px auto 0 auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      padding: 36px 28px 28px 28px;
    }
    h1, h2, h3 {
      color: #1d4ed8;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    h1 {
      font-size: 2.2rem;
      margin-top: 0.2em;
    }
    h2 {
      font-size: 1.4rem;
      margin-top: 2.2em;
    }
    h3 {
      font-size: 1.1rem;
      margin-top: 1.5em;
    }
    ul, ol {
      margin-left: 1.5em;
      margin-bottom: 1em;
    }
    code, pre {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 1em;
    }
    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin: 1.5em 0;
      justify-content: flex-start;
    }
    .feature {
      background: #f1f5fb;
      border-radius: 10px;
      padding: 18px 14px;
      width: 260px;
      min-width: 200px;
      flex: 1 1 200px;
      box-sizing: border-box;
    }
    .feature-title {
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 0.4em;
    }
    .footer {
      text-align: center;
      color: #aaa;
      font-size: 0.92em;
      margin-top: 2em;
      padding-top: 1em;
      border-top: 1px solid #e5e7eb;
    }
    pre {
      overflow-x: auto;
      margin: 1em 0;
      padding: 1em;
      background: #f8fafc;
      border-radius: 8px;
      font-size: 0.96em;
      line-height: 1.5;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1.5em 0;
    }
    th, td {
      border: 1px solid #e5e7eb;
      padding: 7px 10px;
      text-align: left;
    }
    th {
      background: #f1f5fb;
    }
    @media (max-width: 680px) {
      .container { padding: 14px 4vw; }
      .features { flex-direction: column; align-items: stretch; }
      .feature { width: 100%; }
      pre { font-size: 0.93em; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>MedSecureX</h1>
    <p>
      <b>MedSecureX</b> is an all-in-one platform for nurses and doctors to seamlessly assign, access, and manage patient data with automation, security, and ease.
    </p>

    <h2>🚀 Features</h2>
    <div class="features">
      <div class="feature">
        <div class="feature-title">Automated Assigning</div>
        <div>Smart algorithms automatically assign patients and tasks to available medical staff, saving time and reducing errors.</div>
      </div>
      <div class="feature">
        <div class="feature-title">Secure Data Access</div>
        <div>All patient records and schedules are securely stored and accessible only to authorized personnel.</div>
      </div>
      <div class="feature">
        <div class="feature-title">Real-Time Collaboration</div>
        <div>Doctors and nurses can collaborate, update records, and receive notifications in real time.</div>
      </div>
    </div>

    <h2>🛠️ Tech Stack</h2>
    <ul>
      <li><b>Frontend:</b> ReactJS, Tailwind CSS, Inertia.js</li>
      <li><b>Backend:</b> Laravel (PHP)</li>
      <li><b>Database:</b> MySQL (via XAMPP for local development)</li>
      <li><b>Other:</b> Inertia.js for seamless SPA-like navigation</li>
    </ul>

    <h2>📂 Project Structure (Relevant Files)</h2>
    <pre>
resources/
└── js/
    ├── Pages/
    │   ├── Landing.jsx                # Public landing page
    │   └── AdminDashboard.jsx         # Admin dashboard
    ├── Components/
    │   └── Admin/
    │       ├── StatCard.jsx           # Statistic cards
    │       ├── StaffPanel.jsx         # Tabbed doctors/nurses panel
    │       ├── ScheduleTable.jsx      # Staff schedules table
    │       └── EditScheduleModal.jsx  # Modal for editing schedules
    └── Layouts/
        └── AuthenticatedLayout.jsx    # Layout for authenticated pages

app/
├── Http/
│   └── Controllers/
│       └── Admin/
│           └── ManagementController.php   # Admin dashboard logic
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
└── web.php                               # App routes

.env                                      # Environment config (database, mail, etc.)
    </pre>

    <h2>🏁 Getting Started</h2>
    <ol>
      <li><b>Clone the repository</b></li>
      <li><b>Install dependencies</b>
        <ul>
          <li>Backend: <code>composer install</code></li>
          <li>Frontend: <code>npm install</code></li>
        </ul>
      </li>
      <li><b>Set up your <code>.env</code> file</b>
        <ul>
          <li>Copy <code>.env.example</code> to <code>.env</code> and update database credentials for XAMPP/MySQL.</li>
        </ul>
      </li>
      <li><b>Run migrations:</b> <code>php artisan migrate</code></li>
      <li><b>Start the development servers:</b>
        <ul>
          <li>Backend: <code>php artisan serve</code></li>
          <li>Frontend: <code>npm run dev</code></li>
        </ul>
      </li>
      <li><b>Visit</b> <code>http://localhost:8000</code> in your browser.</li>
    </ol>

    <h2>👩‍⚕️ User Roles</h2>
    <ul>
      <li><b>Doctor:</b> Access and manage assigned patients, view/edit schedules.</li>
      <li><b>Nurse:</b> View assignments, update patient status, collaborate with doctors.</li>
      <li><b>Admin:</b> Manage users, assign roles, oversee schedules and statistics.</li>
    </ul>

    <h2>📖 Documentation</h2>
    <ul>
      <li>See the <b>docs folder</b> or in-app help for more details on each feature and workflow.</li>
      <li>For API details, see <b>API Reference</b> (if available).</li>
    </ul>

    <h2>🤝 Contributing</h2>
    <p>
      Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change or enhance.
    </p>

    <h2>📫 Support</h2>
    <p>
      For questions or support, email <a href="mailto:support@medsecurex.com">support@medsecurex.com</a>.
    </p>

    <div class="footer">
      © 2025 MedSecureX. All rights reserved.
    </div>
  </div>
</body>
</html>
