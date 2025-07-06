import React from 'react';
import { Link } from '@inertiajs/react';

export default function PatientsIndex({ patients }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">My Patients</h1>
                <Link
                    href="/doctor/patients/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Patient
                </Link>
            </div>

            {patients.length === 0 ? (
                <p className="text-gray-500">No patients found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-3 py-2">Name</th>
                            <th className="border border-gray-300 px-3 py-2">Appointment Date</th>
                            <th className="border border-gray-300 px-3 py-2">Reason</th>
                            <th className="border border-gray-300 px-3 py-2">Status</th>
                            <th className="border border-gray-300 px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td className="border border-gray-300 px-3 py-2">{patient.name}</td>
                                <td className="border border-gray-300 px-3 py-2">{patient.appointment_date}</td>
                                <td className="border border-gray-300 px-3 py-2">{patient.reason}</td>
                                <td className="border border-gray-300 px-3 py-2">{patient.status}</td>
                                <td className="border border-gray-300 px-3 py-2 space-x-2">
                                    <Link
                                        href={`/doctor/patients/${patient.id}/edit`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <form
                                        method="POST"
                                        action={`/doctor/patients/${patient.id}`}
                                        onSubmit={(e) => {
                                            if (!confirm('Are you sure you want to delete this patient?')) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="inline"
                                    >
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                                        <button type="submit" className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
