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
                    <div>
                        <label className="block text-sm font-medium">Initials (max 4 chars)</label>
                        <input
                            name="initials"
                            value={form.initials}
                            onChange={handleChange}
                            className={`w-full border rounded px-2 py-1 ${errors.initials ? 'border-red-500' : ''}`}
                            maxLength={4}
                            disabled={loading}
                        />
                        {errors.initials && <p className="text-red-600 text-xs mt-1">{errors.initials[0]}</p>}
                    </div>
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
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium">Age</label>
                            <input
                                name="age"
                                type="number"
                                value={form.age}
                                onChange={handleChange}
                                className={`w-full border rounded px-2 py-1 ${errors.age ? 'border-red-500' : ''}`}
                                required
                                disabled={loading}
                                min="0"
                                max="255"
                            />
                            {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age[0]}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium">Gender</label>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className={`w-full border rounded px-2 py-1 ${errors.gender ? 'border-red-500' : ''}`}
                                required
                                disabled={loading}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender[0]}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Reason</label>
                        <textarea
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            className={`w-full border rounded px-2 py-1 ${errors.reason ? 'border-red-500' : ''}`}
                            rows={3}
                            disabled={loading}
                        />
                        {errors.reason && <p className="text-red-600 text-xs mt-1">{errors.reason[0]}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className={`w-full border rounded px-2 py-1 ${errors.status ? 'border-red-500' : ''}`}
                            disabled={loading}
                        >
                            <option value="">Select Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Upcoming">Upcoming</option>
                        </select>
                        {errors.status && <p className="text-red-600 text-xs mt-1">{errors.status[0]}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Room</label>
                        <input
                            name="room"
                            value={form.room}
                            onChange={handleChange}
                            className={`w-full border rounded px-2 py-1 ${errors.room ? 'border-red-500' : ''}`}
                            disabled={loading}
                        />
                        {errors.room && <p className="text-red-600 text-xs mt-1">{errors.room[0]}</p>}
                    </div>
                    <div className="flex items-center">
                        <input
                            name="admitted"
                            type="checkbox"
                            checked={form.admitted}
                            onChange={handleChange}
                            className="ml-0 mr-2"
                            disabled={loading}
                            id="admitted-checkbox"
                        />
                        <label htmlFor="admitted-checkbox" className="block text-sm font-medium">
                            Admitted
                        </label>
                        {errors.admitted && <p className="text-red-600 text-xs mt-1 ml-4">{errors.admitted[0]}</p>}
                    </div>
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
