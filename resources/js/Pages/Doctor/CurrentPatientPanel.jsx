import React from "react";

export default function CurrentPatientPanel({ patients }) {
    if (!patients.length) {
        return (
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="font-semibold text-lg mb-2 text-black">Current Patients</h2>
                <p className="text-gray-500">No current patients.</p>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="font-semibold text-lg mb-2">Current Patients</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">Name</th>
                        <th className="border-b p-2">Appointment Time</th>
                        <th className="border-b p-2">Reason</th>
                        <th className="border-b p-2">Admission Status</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{patient.name}</td>
                            <td className="p-2">{patient.appointment_time}</td>
                            <td className="p-2">{patient.reason}</td>
                            <td className="p-2">{patient.admission_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
