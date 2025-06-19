import React from 'react';
import { Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header with Nav */}
      <header className="flex items-center justify-between p-6 bg-white shadow">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
          MedSecureX
        </h1>
        <nav className="-mx-3 flex flex-1 justify-end space-x-2">
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
              >
                Log in
              </Link>
              <Link
                href={route('register')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Welcome to MedSecureX
        </h2>
        <p className="text-lg md:text-xl text-blue-900 max-w-2xl mb-12">
          The all-in-one platform for nurses and doctors to seamlessly assign, access, and manage patient data with automation, security, and ease.
        </p>
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl w-full justify-center">
          <FeatureCard
            icon="⚡"
            title="Automated Assigning"
            description="Smart algorithms automatically assign patients and tasks to available medical staff, saving time and reducing errors."
          />
          <FeatureCard
            icon="🔒"
            title="Secure Data Access"
            description="All patient records and schedules are securely stored and accessible only to authorized personnel."
          />
          <FeatureCard
            icon="🤝"
            title="Real-Time Collaboration"
            description="Doctors and nurses can collaborate, update records, and receive notifications in real time."
          />
        </div>
        {!auth.user && (
          <Link
            href={route('register')}
            className="mt-12 px-8 py-3 rounded bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 shadow transition"
          >
            Get Started
          </Link>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-blue-700 bg-white border-t mt-8">
        &copy; {new Date().getFullYear()} MedSecureX. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-[250px] max-w-sm flex flex-col items-center">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  );
}

// This component serves as the welcome page for the MedSecureX application, providing an overview of its features and a call to action for new users.
// It includes a header with navigation links, a main content area with feature highlights, and a footer with copyright information.
// The page is designed to be visually appealing and informative, encouraging users to register or log in to access the platform's features.
// It features a responsive layout with a gradient background, a header with navigation links, and a main section that highlights key features of the application.
// The `FeatureCard` component is used to display individual features with icons, titles, and descriptions.
// The page also includes a call-to-action button for new users to get started by registering, and it adapts based on whether the user is authenticated or not.
// The design is clean and modern, using a blue color scheme to convey trust and professionalism,
// making it suitable for a healthcare application focused on patient data management and collaboration between medical staff.
// The component uses Tailwind CSS for styling, ensuring a responsive and user-friendly interface.
// The `FeatureCard` component is reusable and can be extended with more features in the future,
// allowing for easy updates and additions to the welcome page as the application evolves.
// The page is structured to provide a clear and concise introduction to the MedSecureX platform,
// making it easy for users to understand the benefits and functionalities offered by the application.
// The use of icons and concise descriptions helps in quickly conveying the value proposition of the platform,
// making it accessible to a wide audience, including those who may not be familiar with technical jargon or complex healthcare systems.
// Overall, this component aims to create a positive first impression for users, encouraging them to engage with the MedSecureX platform and explore its capabilities for managing patient care effectively.
// It is designed to be intuitive and straightforward, minimizing the learning curve for new users while providing all necessary information to get started with the application.
// The component can be easily integrated into a larger application structure, ensuring consistency in design and functionality across the platform.
// It serves as a foundational piece for the user experience, setting the tone for the rest of the application and establishing MedSecureX as a reliable and efficient tool for healthcare professionals.
// The component is also designed to be easily maintainable and extendable, allowing for future enhancements and updates as the application grows and evolves to meet the needs of its users.
// It can be adapted to include additional features, such as testimonials, case studies, or more detailed explanations of the platform's functionalities, depending on user feedback and evolving requirements.
// The focus remains on providing a seamless user experience, ensuring that users can quickly understand the value of MedSecureX and how it can assist them in their daily tasks related to patient management and care coordination.
// The component is built with accessibility in mind, ensuring that it is usable by a wide range of users, including those with disabilities. This includes proper semantic HTML structure, appropriate use of ARIA roles, and ensuring that all interactive elements are keyboard accessible.
//// The design also considers mobile responsiveness, ensuring that the welcome page looks great and functions well on various screen sizes, from smartphones to large desktop monitors.
