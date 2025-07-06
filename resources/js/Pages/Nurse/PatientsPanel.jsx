import React, { useState } from 'react';
import EditPatientModal from './EditPatientModal'; // Your existing edit modal
import AddPatientModal from './AddPatientModal';   // Your add modal component

export default function PatientsPanel({ patients, onUpdatePatient, isOnDuty, doctors = [], nurses = [] }) {
    const [editingPatient, setEditingPatient] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [newPatientForm, setNewPatientForm] = useState({
        name: '',
        patient_code: '',
        age: '',
        gender: '',
        room: '',
        reason: '',
        appointment_date: '',
        admitted: false,
        doctor_id: '',
        nurse_id: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Helper to get CSRF token from meta tag
    const getCsrfToken = () => {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    };

    // Inside your PatientsPanel component, when rendering EditPatientModal:
    {
        editingPatient && (
            <EditPatientModal
                patient={editingPatient}
                onClose={() => setEditingPatient(null)}
                onSave={(updatedPatient) => {
                    onUpdatePatient(updatedPatient);
                    setEditingPatient(null);
                }}
            />
        )
    }


    // Generate unique patient code, e.g. P-YYYYMMDD-XXXX
    const generatePatientCode = () => {
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
        return `P-${datePart}-${randomPart}`;
    };

    const openAddModal = () => {
        setNewPatientForm({
            name: '',
            patient_code: generatePatientCode(),
            age: '',
            gender: '',
            room: '',
            reason: '',
            appointment_date: new Date().toISOString().slice(0, 10), // Default to today
            admitted: false,
            doctor_id: doctors.length > 0 ? doctors[0].id : '',
            nurse_id: nurses.length > 0 ? nurses[0].id : '',
        });
        setFormErrors({});
        setAddModalOpen(true);
    };

    const closeAddModal = () => {
        setAddModalOpen(false);
        setFormErrors({});
    };

    const handleNewPatientChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPatientForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddPatientSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        try {
            const response = await fetch('/nurse/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Accept': 'application/json',
                },
                body: JSON.stringify(newPatientForm),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Patient added successfully!');
                closeAddModal();
                window.location.reload(); // Refresh to show new patient
            } else if (response.status === 422) {
                setFormErrors(data.errors || {});
            } else {
                alert(data.message || 'An error occurred while adding the patient.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: Could not connect to the server.');
        } finally {
            setLoading(false);
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
                <div className="flex gap-2">
                    {/* <button className="px-3 py-1 bg-gray-100 rounded text-black hover:bg-gray-200 transition">Filter</button> */}
                    <button
                        onClick={openAddModal}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        + Add Patient
                    </button>
                </div>
            </div>
            <div className="space-y-3">
                {patients.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No patients scheduled for today.</div>
                )}
                {patients.map((p, idx) => (
                    <div key={p.id || idx} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b py-2 gap-2">
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
                        </div>
                    </div>
                ))}
            </div>

            {editingPatient && (
                <EditPatientModal
                    patient={editingPatient}
                    onClose={() => setEditingPatient(null)}
                    onSave={updatedPatient => {
                        onUpdatePatient(updatedPatient);
                        setEditingPatient(null);
                    }}
                />
            )}

            <AddPatientModal
                open={addModalOpen}
                onClose={closeAddModal}
                form={newPatientForm}
                errors={formErrors}
                onChange={handleNewPatientChange}
                onSubmit={handleAddPatientSubmit}
                loading={loading}
                doctors={doctors}
                nurses={nurses}
            />
        </div>
    );
}
