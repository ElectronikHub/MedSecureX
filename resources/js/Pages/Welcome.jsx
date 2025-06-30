import React from 'react';
import { Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-500">
            {/* Header with Nav */}
            <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 shadow-md">
                <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
                    MedSecureX
                </h1>
                <nav className="-mx-3 flex flex-1 justify-end space-x-2">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16 sm:px-6 md:px-12 lg:px-24 xl:px-48">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-300 mb-4">
                    Welcome to MedSecureX
                </h2>
                <p className="text-lg md:text-xl text-blue-900 dark:text-blue-200 max-w-2xl mb-12 leading-relaxed">
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
                        className="mt-12 inline-block px-8 py-3 rounded bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 shadow-lg transition focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
                    >
                        Get Started
                    </Link>
                )}
            </main>

            {/* Footer */}
            <footer className="text-center p-4 text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-900 border-t border-blue-200 dark:border-gray-700 mt-8 transition-colors duration-500">
                &copy; {new Date().getFullYear()} MedSecureX. All rights reserved.
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex-1 min-w-[250px] max-w-sm flex flex-col items-center transition-colors duration-500">
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">{title}</h3>
            <p className="text-blue-700 dark:text-blue-200">{description}</p>
        </div>
    );
}
