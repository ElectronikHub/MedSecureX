<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MedSecureX - README</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #181c20;
      color: #e0e6ed;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 40px auto;
      background: #23272b;
      padding: 32px 40px 32px 40px;
      border-radius: 10px;
      box-shadow: 0 6px 24px #0005;
    }
    h1, h2 {
      color: #00e676;
      margin-top: 0;
    }
    ul.tree {
      list-style-type: none;
      padding-left: 1.2em;
      font-size: 1.02em;
    }
    ul.tree ul {
      padding-left: 1.4em;
    }
    .folder {
      color: #ffd700;
      font-weight: bold;
    }
    .file {
      color: #87ceeb;
    }
    .note {
      color: #aaa;
      font-size: 0.96em;
      margin-top: 2em;
    }
    code {
      background: #1a1e22;
      color: #b2f7ef;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.97em;
    }
    a {
      color: #82eefd;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    hr {
      border: 0;
      border-top: 1px solid #2e3338;
      margin: 2em 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>MedSecureX</h1>
    <p>
      <strong>MedSecureX</strong> is a secure, automated portal for clinic and hospital staff, designed to streamline patient management and enhance collaboration between doctors, nurses, and administrators. It is built using React (frontend) and Laravel (backend).
    </p>

    <h2>📁 File Structure</h2>
    <ul class="tree">
      <li class="folder">resources/
        <ul>
          <li class="folder">css/</li>
          <li class="folder">js/
            <ul>
              <li class="folder">Components/
                <ul>
                  <li class="folder">Layouts/
                    <ul>
                      <li class="file">AuthenticatedLayout.jsx</li>
                      <li class="file">GuestLayout.jsx</li>
                    </ul>
                  </li>
                  <li class="folder">Pages/
                    <ul>
                      <li class="folder">Admin/
                        <ul>
                          <li class="file">EditScheduleModal.jsx</li>
                          <li class="file">ScheduleTable.jsx</li>
                          <li class="file">StaffPanel.jsx</li>
                          <li class="file">StatCard.jsx</li>
                        </ul>
                      </li>
                      <li class="folder">Auth/
                        <ul>
                          <li class="file">ConfirmPassword.jsx</li>
                          <li class="file">ForgotPassword.jsx</li>
                          <li class="file">Login.jsx</li>
                          <li class="file">Register.jsx</li>
                          <li class="file">ResetPassword.jsx</li>
                          <li class="file">VerifyEmail.jsx</li>
                        </ul>
                      </li>
                      <li class="folder">Doctor/
                        <ul>
                          <li class="file">AdmittedPatientsPanel.jsx</li>
                          <li class="file">AssignDoctorForm.jsx</li>
                          <li class="file">CurrentPatientPanel.jsx</li>
                          <li class="file">StatsPanel.jsx</li>
                          <li class="file">TimelinePanel.jsx</li>
                          <li class="file">UpcomingPatientsPanel.jsx</li>
                        </ul>
                      </li>
                      <li class="folder">Nurse/
                        <ul>
                          <li class="file">EditPatientModal.jsx</li>
                          <li class="file">NotificationsPanel.jsx</li>
                          <li class="file">PatientsPanel.jsx</li>
                          <li class="file">SchedulePanel.jsx</li>
                          <li class="file">StatsPanel.jsx</li>
                          <li class="file">WelcomePanel.jsx</li>
                        </ul>
                      </li>
                      <li class="folder">Profile/
                        <ul>
                          <li class="folder">Partials/
                            <ul>
                              <li class="file">Edit.jsx</li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li class="file">AdminDashboard.jsx</li>
                      <li class="file">Dashboard.jsx</li>
                      <li class="file">DoctorDashboard.jsx</li>
                      <li class="file">NurseDashboard.jsx</li>
                      <li class="file">Welcome.jsx</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="file">app.jsx</li>
              <li class="file">bootstrap.js</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>

    <h2>🚀 Features</h2>
    <ul>
      <li>Automated patient and task assignment for staff</li>
      <li>Role-based dashboards for Admin, Doctor, and Nurse</li>
      <li>Secure authentication and user management</li>
      <li>Real-time updates and notifications</li>
      <li>Easy navigation and modular React components</li>
    </ul>

    <h2>🔧 Getting Started</h2>
    <ol>
      <li>Clone the repository: <code>git clone https://github.com/ElectronikHub/MedSecureX.git</code></li>
      <li>Install backend dependencies: <code>composer install</code></li>
      <li>Install frontend dependencies: <code>npm install</code></li>
      <li>Set up your <code>.env</code> file and database</li>
      <li>Run migrations: <code>php artisan migrate</code></li>
      <li>Start Laravel server: <code>php artisan serve</code></li>
      <li>Start frontend dev server: <code>npm run dev</code></li>
      <li>Visit <code>http://localhost:8000</code> in your browser</li>
    </ol>

    <h2>🤝 Contributing</h2>
    <p>
      Contributions are welcome! Please fork the repo and submit a pull request.<br>
      For major changes, open an issue first to discuss what you would like to change.
    </p>

    <h2>📄 License</h2>
    <p>
      &copy; 2025 ElectronikHub. All rights reserved.
    </p>
    <hr>
    <div class="note">
      <strong>Note:</strong> This README is based on the current frontend structure as shown in the project screenshots.
    </div>
  </div>
</body>
</html>
