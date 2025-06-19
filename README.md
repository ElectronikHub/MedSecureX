<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MedSecureX - README</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Arial, sans-serif;
      background: linear-gradient(135deg, #eaf1fb 0%, #e3ecfa 100%);
      min-height: 100vh;
      color: #222;
    }
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .header {
      width: 100%;
      background: #fff;
      box-shadow: 0 1px 6px rgba(0,0,0,0.03);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 48px;
      position: relative;
      z-index: 10;
    }
    .brand {
      color: #2563eb;
      font-weight: bold;
      font-size: 1.5rem;
      letter-spacing: -1px;
    }
    .nav {
      display: flex;
      gap: 24px;
      font-size: 1rem;
    }
    .nav a {
      color: #444;
      text-decoration: none;
      transition: color 0.2s;
    }
    .nav a:hover {
      color: #2563eb;
    }
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
    }
    .welcome {
      font-size: 2.2rem;
      font-weight: bold;
      color: #1d4ed8;
      margin-bottom: 0.5rem;
      text-align: center;
    }
    .subtitle {
      color: #444;
      text-align: center;
      max-width: 550px;
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
    }
    .features {
      display: flex;
      gap: 32px;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .feature-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      padding: 28px 20px;
      width: 270px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 12px;
    }
    .feature-icon {
      font-size: 2.1rem;
      margin-bottom: 12px;
    }
    .feature-title {
      color: #1d4ed8;
      font-weight: bold;
      margin-bottom: 0.5em;
      text-align: center;
    }
    .feature-desc {
      color: #444;
      font-size: 1em;
      text-align: center;
    }
    .cta-btn {
      margin-top: 18px;
      background: #2563eb;
      color: #fff;
      font-weight: 500;
      border: none;
      border-radius: 6px;
      padding: 12px 32px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    .cta-btn:hover {
      background: #1d4ed8;
    }
    .footer {
      text-align: center;
      color: #888;
      font-size: 0.98em;
      margin-top: 40px;
      padding: 18px 0 8px 0;
      background: transparent;
    }
    @media (max-width: 900px) {
      .header { padding: 18px 18px; }
      .features { gap: 18px; }
    }
    @media (max-width: 750px) {
      .features { flex-direction: column; align-items: center; }
      .feature-card { width: 95vw; max-width: 340px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">MedSecureX</div>
    <div class="nav">
      <a href="#">Log in</a>
      <a href="#">Register</a>
    </div>
  </div>
  <div class="main">
    <div>
      <div class="welcome">Welcome to MedSecureX</div>
      <div class="subtitle">
        The all-in-one platform for nurses and doctors to seamlessly assign,<br>
        access, and manage patient data with automation, security, and ease.
      </div>
      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <div class="feature-title">Automated Assigning</div>
          <div class="feature-desc">
            Smart algorithms automatically assign patients and tasks to available medical staff, saving time and reducing errors.
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <div class="feature-title">Secure Data Access</div>
          <div class="feature-desc">
            All patient records and schedules are securely stored and accessible only to authorized personnel.
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💛</div>
          <div class="feature-title">Real-Time Collaboration</div>
          <div class="feature-desc">
            Doctors and nurses can collaborate, update records, and receive notifications in real time.
          </div>
        </div>
      </div>
      <a class="cta-btn" href="#">Get Started</a>
    </div>
  </div>
  <div class="footer">
    © 2025 MedSecureX. All rights reserved.
  </div>
</body>
</html>
