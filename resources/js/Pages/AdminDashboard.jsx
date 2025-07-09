import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "./Admin/StatCard";
import StaffPanel from "./Admin/StaffPanel";
import ScheduleTable from "./Admin/ScheduleTable";
import EditScheduleModal from "./Admin/EditScheduleModal";
import UsersPanel from "./Admin/UsersPanel";
import LoginLogsPanel from "./Admin/LoginLogsPanel"; // Import login logs panel

export default function AdminDashboard({ stats, doctors, nurses, schedules, allUsers, loginLogs }) {
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [scheduleList, setScheduleList] = useState(schedules);
    const [loading, setLoading] = useState(false);

    // Open modal for editing
    const handleEdit = (schedule) => {
        setEditingSchedule(schedule);
        setShowModal(true);
    };

    // Open modal for adding new schedule
    const handleAdd = () => {
        setEditingSchedule(null); // No schedule means adding new
        setShowModal(true);
    };

    // Close modal and reset loading
    const handleClose = () => {
        setShowModal(false);
        setEditingSchedule(null);
        setLoading(false);
    };

    // Save schedule (create or update)
    const handleSaveSchedule = async (id, form) => {
        setLoading(true);
        try {
            const url = id ? `/admin/schedules/${id}` : "/admin/schedules";
            const method = id ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save schedule");
            }

            const data = await response.json();

            if (id) {
                // Update existing schedule in list
                setScheduleList((prev) =>
                    prev.map((sch) => (sch.id === id ? data.schedule : sch))
                );
            } else {
                // Add new schedule to list
                setScheduleList((prev) => [...prev, data.schedule]);
            }

            alert(data.message);
            handleClose();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
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

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                            <StatCard title="Total Users" value={stats.totalUsers} color="text-blue-600" />
                            <StatCard title="Total Doctors" value={stats.totalDoctors} color="text-green-600" />
                            <StatCard title="Total Nurses" value={stats.totalNurses} color="text-yellow-600" />
                            <StatCard title="Total Patients" value={stats.totalPatients} color="text-purple-600" />
                        </div>

                        {/* Staff Panel */}
                        <StaffPanel doctors={doctors} nurses={nurses} />

                        {/* Schedule Table */}
                        <ScheduleTable schedules={scheduleList} onEdit={handleEdit} onAdd={handleAdd} />

                        {/* Edit Schedule Modal */}
                        {showModal && (
                            <EditScheduleModal
                                schedule={editingSchedule}
                                onClose={handleClose}
                                onSave={handleSaveSchedule}
                                users={[...doctors, ...nurses]}
                                loading={loading}
                            />
                        )}

                        {/* Users Panel */}
                        <UsersPanel users={allUsers} />
                        &nbsp;
                        {/* Login Logs Panel */}
                        <LoginLogsPanel logs={loginLogs} />
                    </div>
                </main>
                <footer className="text-center text-xs text-gray-400 dark:text-gray-500 py-4 transition-colors duration-500">
                    © 2025 MedSecureX. All rights reserved.
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
