import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import WelcomePanel from './Nurse/WelcomePanel';
import StatsPanel from './Nurse/StatsPanel';
import PatientsPanel from './Nurse/PatientsPanel';
import SchedulePanel from './Nurse/SchedulePanel';
import NotificationsPanel from './Nurse/NotificationsPanel';

export default function NurseDashboard({ patients: initialPatients, schedule, stats: initialStats, notifications, isOnDuty }) {
    // Manage patients state locally to support live updates
    const [patients, setPatients] = useState(initialPatients);
    // Manage stats state locally for live CRUD
    const [stats, setStats] = useState(initialStats);

    // Handler to update a patient in the local state after editing
    const handleUpdatePatient = (updatedPatient) => {
        setPatients((prevPatients) =>
            prevPatients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
        );
    };

    // Stats CRUD Handlers
    const handleAddStat = (newStat) => {
        setStats(prev => [...prev, newStat]);
    };

    const handleUpdateStat = (updatedStat) => {
        setStats(prev => prev.map(stat => stat.id === updatedStat.id ? updatedStat : stat));
    };

    const handleDeleteStat = (id) => {
        setStats(prev => prev.filter(stat => stat.id !== id));
    };

    // Placeholder function for marking schedule items completed
    const handleMarkCompleted = (id) => {
        console.log('Mark completed for schedule id:', id);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Nurse Dashboard
                    </h2>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isOnDuty ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {isOnDuty ? 'On Duty' : 'Off Duty'}
                    </span>
                </div>
            }
        >
            <Head title="Nurse Dashboard" />
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                <WelcomePanel />
                <StatsPanel
                    stats={stats}
                    onAdd={handleAddStat}
                    onUpdate={handleUpdateStat}
                    onDelete={handleDeleteStat}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <PatientsPanel
                            patients={patients}
                            isOnDuty={isOnDuty}
                            onUpdatePatient={handleUpdatePatient} // Pass update handler for live updates
                        />
                    </div>
                    <div className="space-y-6">
                        {/* <SchedulePanel schedule={schedule} onMarkCompleted={handleMarkCompleted} /> */}
                        <NotificationsPanel notifications={notifications} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
