import React from 'react';

export default function DoctorDashboard({ patients, isOnDuty }) {
    if (!isOnDuty) {
        return <div>You are currently off duty.</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Patients Assigned to You</h2>
            {patients.length === 0 ? (
                <p>No patients assigned to you.</p>
            ) : (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient.id} className="border rounded p-3 mb-2">
                            <div className="font-semibold">{patient.name}</div>
                            <div>Room: {patient.room || 'N/A'}</div>
                            <div>Admission: {patient.admission_timestamp || 'N/A'}</div>
                            <div>Reason: {patient.reason || 'N/A'}</div>
                            <div>Status: {patient.status || 'N/A'}</div>
                            <div>Appointment Date: {patient.appointment_date || 'N/A'}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
