import React, { useState, useEffect } from 'react';

export default function EditPatientModal({ patient, onClose, onSave }) {
    const [form, setForm] = useState({
        id: '',
        name: '',
        age: '',
        gender: '',
        room: '',
        admitted: false,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Initialize form when patient prop changes
    useEffect(() => {
        if (patient) {
            setForm({
                id: patient.id || '',
                name: patient.name || '',
                age: patient.age || '',
                gender: patient.gender || '',
                room: patient.room || '',
                admitted: patient.admitted || false,
            });
            setErrors({});
        }
    }, [patient]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error for the field on change
        if (errors[name]) {
            setErrors(e => ({ ...e, [name]: null }));
        }
    };

    const getCsrfToken = () => {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch(`/nurse/patients/${form.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    Accept: 'application/json',
                },
                body: JSON.stringify(form),
            });

            let data = null;
            try {
                data = await response.json();
            } catch (jsonError) {
                alert('Server returned invalid JSON.');
                setLoading(false);
                return;
            }

            if (response.ok) {
                onSave(data.patient);
                onClose();
            } else if (response.status === 422) {
                // Validation errors returned by Laravel
                setErrors(data.errors || {});
            } else {
                alert(data.message || 'An error occurred while updating the patient.');
            }
        } catch (error) {
            alert('Network error: Could not connect to the server.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-lg font-semibold mb-4">Edit Patient</h2>
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
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
