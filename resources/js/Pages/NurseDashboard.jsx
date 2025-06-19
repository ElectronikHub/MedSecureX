import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import WelcomePanel from './Nurse/WelcomePanel';
import StatsPanel from './Nurse/StatsPanel';
import PatientsPanel from './Nurse/PatientsPanel';
import SchedulePanel from './Nurse/SchedulePanel';
import NotificationsPanel from './Nurse/NotificationsPanel';

export default function NurseDashboard({ patients, schedule, stats, notifications, isOnDuty }) {
  const handleMarkCompleted = (id) => {
    console.log('Mark completed for schedule id:', id);
  };

  return (
    <AuthenticatedLayout header={
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Nurse Dashboard
        </h2>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
          ${isOnDuty ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isOnDuty ? 'On Duty' : 'Off Duty'}
        </span>
      </div>
    }>
      <Head title="Nurse Dashboard" />
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <WelcomePanel />
        <StatsPanel stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PatientsPanel patients={patients} isOnDuty={isOnDuty} />
          </div>
          <div className="space-y-6">
            <SchedulePanel schedule={schedule} onMarkCompleted={handleMarkCompleted} />
            <NotificationsPanel notifications={notifications} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

// This component serves as the main dashboard for nurses, displaying their schedule, patients, stats, and notifications.
// It includes a welcome message, stats panel, patients panel, schedule panel, and notifications panel.
// The `handleMarkCompleted` function is a placeholder for marking schedule items as completed.
// The dashboard is responsive and adapts to different screen sizes, ensuring a good user experience on both desktop and mobile devices.
