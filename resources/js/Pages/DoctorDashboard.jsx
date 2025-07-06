import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsPanel from './Doctor/StatsPanel';
import CurrentPatientPanel from './Doctor/CurrentPatientPanel';
import UpcomingPatientsPanel from './Doctor/UpcomingPatientsPanel';
import TimelinePanel from './Doctor/TimelinePanel';

export default function DoctorDashboard({
    patientsToday,
    stats,
    timeline,
    isOnDuty,
    currentSchedule,
}) {
    // Split patients into current and upcoming based on status
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
                            {/* Pass all today's patients here */}
                            <CurrentPatientPanel patients={patientsToday} />
                            <UpcomingPatientsPanel patients={upcomingPatients} />
                        </div>
                        <TimelinePanel timeline={timeline} />
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
