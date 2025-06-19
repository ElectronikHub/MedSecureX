// resources/js/Pages/AdminDashboard.jsx
import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "./Admin/StatCard";
import StaffPanel from "./Admin/StaffPanel";
import ScheduleTable from "./Admin/ScheduleTable";
import EditScheduleModal from "./Admin/EditScheduleModal";

export default function AdminDashboard({ stats, doctors, nurses, schedules }) {
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleSaveSchedule = (id, form) => {
    // Implement save logic (e.g., Inertia.post/put)
    setEditingSchedule(null);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Admin Dashboard" />
      <div className="min-h-screen bg-[#f4f8fe] flex flex-col">
        <main className="p-6 flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600 mb-6">Overview of system statistics</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              <StatCard title="Total Users" value={stats.totalUsers} color="text-blue-600" />
              <StatCard title="Total Doctors" value={stats.totalDoctors} color="text-green-600" />
              <StatCard title="Total Nurses" value={stats.totalNurses} color="text-yellow-600" />
              <StatCard title="Total Patients" value={stats.totalPatients} color="text-purple-600" />
            </div>
            <StaffPanel doctors={doctors} nurses={nurses} />
            <ScheduleTable schedules={schedules} onEdit={setEditingSchedule} />
            {editingSchedule && (
              <EditScheduleModal
                schedule={editingSchedule}
                onClose={() => setEditingSchedule(null)}
                onSave={handleSaveSchedule}
              />
            )}
          </div>
        </main>
        <footer className="text-center text-xs text-gray-400 py-4">
          © 2025 MedSecureX. All rights reserved.
        </footer>
      </div>
    </AuthenticatedLayout>
  );
}

// This component serves as the main dashboard for administrators, providing an overview of system statistics,
