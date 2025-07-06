import React from "react";

export default function CurrentPatientPanel({ patients }) {
    if (!patients.length) {
        return (
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="font-semibold text-lg mb-2 text-black">All Patients</h2>
                <p className="text-gray-500">No patients found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6 overflow-auto max-h-[600px]">
            <h2 className="font-semibold text-lg mb-2">All Patients</h2>
            <table className="w-full text-left border-collapse table-auto">
                <thead>
                    <tr>
                        <th className="border-b p-2">Name</th>
                        <th className="border-b p-2">Appointment Time</th>
                        <th className="border-b p-2">Reason</th>
                        <th className="border-b p-2">Admission Status</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => {
                        // Compose appointment time string
                        const appointmentTime = patient.appointment_start_time && patient.appointment_end_time
                            ? `${patient.appointment_start_time} - ${patient.appointment_end_time}`
                            : "N/A";

                        // Admission status display
                        const admissionStatus = patient.admitted ? "Admitted" : "Not Admitted";

                        return (
                            <tr key={patient.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{patient.name}</td>
                                <td className="p-2">{appointmentTime}</td>
                                <td className="p-2">{patient.reason || "N/A"}</td>
                                <td className="p-2">{admissionStatus}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
