import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function OtpVerify() {
    const { errors } = usePage().props;
    const [otp, setOtp] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        Inertia.post('/otp-verify', { otp }, {
            onFinish: () => setSubmitting(false),
            onError: () => setSubmitting(false),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-semibold mb-6 text-center">OTP Verification</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter the 6-digit OTP sent to your email
                    </label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))} // allow digits only
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.otp ? 'border-red-500' : ''
                            }`}
                        autoFocus
                        required
                    />
                    {errors.otp && (
                        <p className="text-red-600 text-sm mt-1">{errors.otp}</p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {submitting ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
}
