import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import WelcomePanel from './Nurse/WelcomePanel';
import StatsPanel from './Nurse/StatsPanel';
import PatientsPanel from './Nurse/PatientsPanel';
import NotificationsPanel from './Nurse/NotificationsPanel';

export default function NurseDashboard({ patients: initialPatients, schedule, stats, notifications, isOnDuty, doctors, nurses }) {
    const [patients, setPatients] = useState(initialPatients);

    const handleUpdatePatient = (updatedPatient) => {
        setPatients(prev => prev.map(p => (p.id === updatedPatient.id ? updatedPatient : p)));
    };

    const handleAddPatient = (newPatient) => {
        setPatients(prev => [...prev, newPatient]);
    };

    const handleDeletePatient = (id) => {
        setPatients(prev => prev.filter(p => p.id !== id));
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
                <StatsPanel stats={stats} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <PatientsPanel
                            patients={patients}
                            isOnDuty={isOnDuty}
                            onUpdatePatient={handleUpdatePatient}
                            onAddPatient={handleAddPatient}
                            onDeletePatient={handleDeletePatient}
                            doctors={doctors}
                            nurses={nurses}
                        />
                    </div>
                    <div className="space-y-6">
                        <NotificationsPanel notifications={notifications} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
