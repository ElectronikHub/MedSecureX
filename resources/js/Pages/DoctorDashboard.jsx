import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsPanel from './Doctor/StatsPanel';
import CurrentPatientPanel from './Doctor/CurrentPatientPanel';
import UpcomingPatientsPanel from './Doctor/UpcomingPatientsPanel';
import TimelinePanel from './Doctor/TimelinePanel';
import AdmittedPatientsPanel from './Doctor/AdmittedPatientsPanel';

export default function DoctorDashboard({
    patientsToday,
    admittedPatients,
    stats,
    timeline,
    isOnDuty,
    currentSchedule,
}) {
    const currentPatients = patientsToday.filter(p => p.status === 'Completed');
    const upcomingPatients = patientsToday.filter(p => p.status === 'Upcoming');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-900 dark:text-gray-100">
                    Doctor Dashboard
                </h2>
            }
        >
            <Head title="Doctor Dashboard" />

            <main className="flex-1 flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="w-full max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-3">
                        Welcome back, Dr. {currentSchedule?.user?.name || 'Doctor'}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
                        Today is{' '}
                        <time dateTime={new Date().toISOString()}>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>{' '}
                        |{' '}
                        <span className="text-blue-600 underline cursor-pointer font-semibold">
                            {patientsToday.length} patients scheduled
                        </span>
                    </p>

                    <StatsPanel stats={stats} />

                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Left column with patient panels */}
                        <div className="space-y-8 md:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <CurrentPatientPanel patients={patientsToday} />
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <UpcomingPatientsPanel patients={upcomingPatients} />
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <AdmittedPatientsPanel admittedPatients={admittedPatients} />
                            </div>
                        </div>

                        {/* Right column - Timeline */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-auto max-h-[600px] hover:shadow-lg transition-shadow duration-300">
                            <TimelinePanel timeline={timeline} />
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
