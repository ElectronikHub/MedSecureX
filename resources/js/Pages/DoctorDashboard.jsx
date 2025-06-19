import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsPanel from './Doctor/StatsPanel';
import CurrentPatientPanel from './Doctor/CurrentPatientPanel';
import UpcomingPatientsPanel from './Doctor/UpcomingPatientsPanel';
import TimelinePanel from './Doctor/TimelinePanel';
// import AssignDoctorForm from './Doctor/AssignDoctorForm'; // Uncomment if needed

export default function DoctorDashboard({
  patientsToday,
  stats,
  timeline,
  isOnDuty,
  currentSchedule,
}) {
  // Split patients into current and upcoming
  const currentPatients = patientsToday.filter(p => p.status === 'Completed');
  const upcomingPatients = patientsToday.filter(p => p.status === 'Upcoming');

  return (
    <AuthenticatedLayout header={
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        Doctor Dashboard
      </h2>
    }>
      <Head title="Doctor Dashboard" />

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-2 text-blue-800">
            Welcome back, Dr. {currentSchedule?.user?.name || "Doctor"}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Today is {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            |{" "}
            <span className="text-blue-600 underline cursor-pointer">
              {patientsToday.length} patients scheduled
            </span>
          </p>

          <StatsPanel stats={stats} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <CurrentPatientPanel patients={currentPatients} />
              <UpcomingPatientsPanel patients={upcomingPatients} />
            </div>
            <TimelinePanel timeline={timeline} />
          </div>
        </div>


      </main>
    </AuthenticatedLayout>
  );
}

// This component serves as the main dashboard for doctors, providing an overview of their patients and schedule.
// It includes panels for current and upcoming patients, statistics, and a timeline of activities.
// The `patientsToday` prop contains all patients scheduled for today, which are split into current and upcoming based on their status.
// The `stats` prop provides various statistics related to the doctor's performance and patient care.
// The `timeline` prop displays a chronological list of activities or events related to the doctor's schedule.
// The `isOnDuty` prop indicates whether the doctor is currently on duty, which can be used to conditionally render certain features or messages.
// The `currentSchedule` prop contains the doctor's current schedule, including their name and other relevant details.
// The component uses a responsive grid layout to display the panels, ensuring a clean and organized presentation of information.
// The `AuthenticatedLayout` component wraps the dashboard, providing a consistent layout with a header and footer.
// The `Head` component sets the page title to "Doctor Dashboard" for better SEO and user experience.
// The dashboard is designed to be user-friendly, with clear headings, statistics, and actionable items for the doctor to manage their patients effectively.
// The component is styled using Tailwind CSS classes for a modern and responsive design, ensuring it looks good on both desktop and mobile devices.
// The dashboard can be extended with additional features, such as patient management, appointment scheduling, and more, depending on the needs of the application and the doctor's workflow.


