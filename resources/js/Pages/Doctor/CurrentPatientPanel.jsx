import React, { useState } from 'react';
// import EditPatientModal from './EditPatientModal';
// import AddPatientModal from './AddPatientModal';

export default function PatientsPanel({
    patients,
    onUpdatePatient,
    onAddPatient,
    onDeletePatient,
    isOnDuty,
    doctors = [],
    nurses = []
}) {
    const [editingPatient, setEditingPatient] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);

    // Open add modal with default doctor/nurse selected
    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    // Delete patient handler with confirmation and live update
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this patient?')) return;
        try {
            await fetch(`/nurse/patients/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                },
            });


            if (response.ok) {
                alert('Patient deleted successfully!');
                onDeletePatient(id);
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete patient.');
            }
        } catch (error) {
            alert('Network error.');
        }
    };

    if (!isOnDuty) {
        return (
            <div className="bg-white rounded-lg shadow p-8 mt-12 text-center max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Off Duty</h2>
                <p className="text-gray-600">
                    You can't access patient data outside your scheduled shift.<br />
                    Please check your schedule for your next duty time.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                <h3 className="font-semibold text-lg md:text-xl text-blue-700">Today's Patients</h3>
                <button
                    onClick={openAddModal}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    + Add Patient
                </button>
            </div>

            <div className="space-y-3">
                {patients.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No patients scheduled for today.</div>
                )}
                {patients.map((p) => (
                    <div key={p.id} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b py-2 gap-2">
                        <div className="flex items-center space-x-3">
                            <span
                                className="rounded-full px-3 py-2 text-white font-bold text-sm"
                                style={{
                                    background:
                                        p.statusColor === 'green'
                                            ? '#22c55e'
                                            : p.statusColor === 'yellow'
                                                ? '#eab308'
                                                : '#2563eb',
                                }}
                            >
                                {p.initials || (p.name ? p.name.charAt(0) : 'N/A')}
                            </span>
                            <div>
                                <div className="font-semibold text-black">{p.name}</div>
                                <div className="text-xs text-gray-500">
                                    ID: {p.patient_code || p.id} • {p.age} years • {p.gender}
                                </div>
                                <div className="text-xs text-gray-400">{p.appointment_time} • {p.reason}</div>
                                <div className="text-xs text-gray-400">
                                    Room: <span className="font-semibold text-gray-700">{p.room || 'N/A'}</span> &nbsp;|&nbsp;
                                    {p.admitted ? (
                                        <span className="text-green-600 font-semibold">Admitted</span>
                                    ) : (
                                        <span className="text-gray-500">Not Admitted</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0">
                            <span
                                className={`text-xs font-semibold rounded px-2 py-1 ${p.statusColor === 'green'
                                    ? 'bg-green-100 text-green-700'
                                    : p.statusColor === 'yellow'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}
                            >
                                {p.status}
                            </span>
                            <button
                                onClick={() => setEditingPatient(p)}
                                className="ml-2 p-1 rounded hover:bg-blue-50"
                                title="Edit Patient"
                                aria-label={`Edit patient ${p.name}`}
                            >
                                Edit
                            </button>
                            {/* <button
                                onClick={() => handleDelete(p.id)}
                                className="ml-2 p-1 rounded hover:bg-red-50 text-red-600"
                                title="Delete Patient"
                                aria-label={`Delete patient ${p.name}`}
                            >
                                Delete
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Patient Modal */}
            {editingPatient && (
                <EditPatientModal
                    patient={editingPatient}
                    onClose={() => setEditingPatient(null)}
                    onSave={(updatedPatient) => {
                        onUpdatePatient(updatedPatient);
                        setEditingPatient(null);
                    }}
                />
            )}

            {/* Add Patient Modal */}
            <AddPatientModal
                open={addModalOpen}
                onClose={closeAddModal}
                doctors={doctors}
                nurses={nurses}
                onAddPatient={onAddPatient}
            />
        </div>
    );
}
