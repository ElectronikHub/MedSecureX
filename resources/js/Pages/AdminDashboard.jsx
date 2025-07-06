import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "./Admin/StatCard";
import StaffPanel from "./Admin/StaffPanel";
import ScheduleTable from "./Admin/ScheduleTable";
import EditScheduleModal from "./Admin/EditScheduleModal";
import UsersPanel from "./Admin/UsersPanel";

export default function AdminDashboard({ stats, doctors, nurses, schedules, allUsers }) {
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [scheduleList, setScheduleList] = useState(schedules);

    // Save schedule to backend (update)
    const handleSaveSchedule = async (id, form) => {
        try {
            const response = await fetch(`/admin/schedules/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update schedule");
            }

            const data = await response.json();

            // Update local schedule list with updated schedule
            setScheduleList((prev) =>
                prev.map((sch) => (sch.id === id ? data.schedule : sch))
            );

            alert(data.message);
            setEditingSchedule(null);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-[#f4f8fe] dark:bg-gray-900 flex flex-col transition-colors duration-500">
                <main className="p-6 flex-1 flex flex-col items-center justify-center">
                    <div className="w-full max-w-6xl mx-auto">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 mb-6">Overview of system statistics</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                            <StatCard title="Total Users" value={stats.totalUsers} color="text-blue-600" />
                            <StatCard title="Total Doctors" value={stats.totalDoctors} color="text-green-600" />
                            <StatCard title="Total Nurses" value={stats.totalNurses} color="text-yellow-600" />
                            <StatCard title="Total Patients" value={stats.totalPatients} color="text-purple-600" />
                        </div>
                        <StaffPanel doctors={doctors} nurses={nurses} />
                        <ScheduleTable schedules={scheduleList} onEdit={setEditingSchedule} />
                        {editingSchedule && (
                            <EditScheduleModal
                                schedule={editingSchedule}
                                onClose={() => setEditingSchedule(null)}
                                onSave={handleSaveSchedule}
                                users={[...doctors, ...nurses]} // Pass users for assigning schedule if needed
                            />
                        )}
                        <UsersPanel users={allUsers} />
                    </div>
                </main>
                <footer className="text-center text-xs text-gray-400 dark:text-gray-500 py-4 transition-colors duration-500">
                    © 2025 MedSecureX. All rights reserved.
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
