import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function VerifyEmail({ status }) {
    const [message, setMessage] = useState('');

    const resendVerification = () => {
        Inertia.post(route('verification.send'), {}, {
            onSuccess: () => setMessage('Verification link sent! Please check your email.'),
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
            <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Verify Your Email Address</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Thanks for signing up! Before getting started, please verify your email address by clicking the link we just emailed to you.
            </p>
            {message && <p className="mb-4 text-green-600 dark:text-green-400">{message}</p>}
            <button
                onClick={resendVerification}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                Resend Verification Email
            </button>
        </div>
    );
}
