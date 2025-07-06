import React, { useState, useEffect } from 'react';

export default function EditPatientModal({ patient, onClose, onSave }) {
    const [form, setForm] = useState({
        id: '',
        initials: '',
        name: '',
        age: '',
        gender: '',
        disease_categories: '',
        appointment_start_time: '',
        appointment_end_time: '',
        appointment_date: '',
        reason: '',
        status: '',
        room: '',
        admitted: false,
        admission_timestamp: '',
        discharge_timestamp: '',
        doctor_id: '',
        nurse_id: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (patient) {
            setForm({
                id: patient.id || '',
                initials: patient.initials || '',
                name: patient.name || '',
                age: patient.age || '',
                gender: patient.gender || '',
                disease_categories: patient.disease_categories ? JSON.stringify(patient.disease_categories) : '',
                appointment_start_time: patient.appointment_start_time || '',
                appointment_end_time: patient.appointment_end_time || '',
                appointment_date: patient.appointment_date || '',
                reason: patient.reason || '',
                status: patient.status || 'Upcoming',
                room: patient.room || '',
                admitted: patient.admitted || false,
                admission_timestamp: patient.admission_timestamp || '',
                discharge_timestamp: patient.discharge_timestamp || '',
                doctor_id: patient.doctor_id || '',
                nurse_id: patient.nurse_id || '',
            });
            setErrors({});
        }
    }, [patient]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((e) => ({ ...e, [name]: null }));
        }
    };

    const getCsrfToken = () => {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        let diseaseCategoriesJson = null;
        try {
            diseaseCategoriesJson = form.disease_categories ? JSON.parse(form.disease_categories) : null;
        } catch {
            setErrors((e) => ({ ...e, disease_categories: ['Invalid JSON format'] }));
            setLoading(false);
            return;
        }

        const payload = {
            ...form,
            disease_categories: diseaseCategoriesJson,
        };

        try {
            const response = await fetch(`/nurse/patients/${form.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorData = {};
                try {
                    errorData = await response.json();
                } catch {
                    alert('Server returned an error and no JSON.');
                    setLoading(false);
                    return;
                }

                if (response.status === 422) {
                    setErrors(errorData.errors || {});
                } else {
                    alert(errorData.message || 'An error occurred while updating the patient.');
                }
                setLoading(false);
                return;
            }

            const data = await response.json();

            onSave(data.patient); // Update parent state live
            onClose();
        } catch (error) {
            alert('Network error: Could not connect to the server.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-auto max-h-[90vh]">
                <h2 className="text-lg font-semibold mb-4">Edit Patient</h2>
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                    {/* Form inputs (initials, name, age, gender, reason, status, room, admitted) */}
                    {/* For brevity, include the same inputs as you have, with error display */}
                    {/* ... */}
                    {/* Example for Name input */}
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`w-full border rounded px-2 py-1 ${errors.name ? 'border-red-500' : ''}`}
                            required
                            disabled={loading}
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name[0]}</p>}
                    </div>
                    {/* Repeat for other fields */}
                    {/* ... */}
                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
