import React, { useState } from 'react';
import QRCode from 'react-qr-code';

export default function TransferRequestModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [patientCode, setPatientCode] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const openModal = () => {
        setIsOpen(true);
        setPatientCode('');
        setUserData(null);
        setError('');
    };

    const closeModal = () => {
        setIsOpen(false);
        setPatientCode('');
        setUserData(null);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedCode = patientCode.trim();
        if (!trimmedCode) {
            setError('Please enter a valid Patient Code.');
            return;
        }

        setLoading(true);
        setError('');
        setUserData(null);

        try {
            // Fetch patient by patient_code via query param
            const response = await fetch(`/api/patients?patient_code=${encodeURIComponent(trimmedCode)}`);

            if (!response.ok) {
                throw new Error('Patient not found');
            }

            const data = await response.json();

            // Prepare QR code string
            const qrString = `
Patient Code: ${data.patient_code}
Name: ${data.name}
Age: ${data.age}
Diagnosis: ${data.reason || 'N/A'}
      `;

            setUserData(qrString.trim());
        } catch (err) {
            setError(err.message || 'Failed to fetch patient data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="bg-white text-blue-600 rounded px-4 py-2 font-semibold hover:bg-blue-100"
                onClick={openModal}
            >
                Request Transfer of the Clinic
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Transfer Request</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="patientCode" className="block mb-1 font-medium">
                                    Patient Code
                                </label>
                                <input
                                    type="text"
                                    id="patientCode"
                                    value={patientCode}
                                    onChange={(e) => setPatientCode(e.target.value)}
                                    required
                                    placeholder="Enter Patient Code"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? 'Loading...' : 'Generate QR Code'}
                                </button>
                            </div>
                        </form>

                        {error && <p className="mt-4 text-red-600">{error}</p>}

                        {userData && (
                            <div className="mt-6 text-center">
                                <h3 className="mb-2 font-semibold">Patient QR Code</h3>
                                <div className="inline-block bg-white p-4 rounded shadow">
                                    <QRCode value={userData} size={180} />
                                </div>
                                <pre className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{userData}</pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
