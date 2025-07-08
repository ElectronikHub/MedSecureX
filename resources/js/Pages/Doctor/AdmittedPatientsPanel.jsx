import React from 'react';

export default function AdmittedPatientsPanel({ admittedPatients }) {
    // Filter patients to only those admitted (admitted === true)
    const filteredPatients = admittedPatients.filter(patient => patient.admitted);

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="font-semibold text-lg mb-4">Patients to Round</h2>
            {filteredPatients.length === 0 ? (
                <p className="text-gray-500">
                    You currently have no admitted patients to round on.
                    <br />
                    <small className="text-gray-400">
                        This may be because no patients are admitted under your care yet, or admissions are still being processed.
                    </small>
                </p>
            ) : (
                <ul className="space-y-3">
                    {filteredPatients.map((patient) => (
                        <li key={patient.id} className="border rounded p-3">
                            <div className="font-semibold">{patient.name}</div>
                            <div className="text-sm text-gray-600">Room: {patient.room}</div>
                            <div className="text-xs text-gray-500">
                                Admitted on: {patient.admission_timestamp || 'Unknown'}
                            </div>
                            <div className="text-sm mt-1">{patient.reason}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
