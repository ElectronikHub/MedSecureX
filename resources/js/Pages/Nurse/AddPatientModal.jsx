import React, { useState, useEffect } from 'react';

export default function AddPatientModal({ open, onClose, doctors, nurses, onAddPatient }) {
    const [form, setForm] = useState({
        name: '',
        patient_code: '',
        age: '',
        gender: '',
        room: '',
        reason: '',
        appointment_date: new Date().toISOString().slice(0, 10),
        admitted: false,
        doctor_id: '',
        nurse_id: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Generate patient code on mount
    useEffect(() => {
        if (open) {
            const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const randomPart = Math.floor(1000 + Math.random() * 9000);
            setForm((f) => ({
                ...f,
                patient_code: `P-${datePart}-${randomPart}`,
                doctor_id: doctors.length > 0 ? doctors[0].id : '',
                nurse_id: nurses.length > 0 ? nurses[0].id : '',
            }));
            setErrors({});
        }
    }, [open, doctors, nurses]);

    const getCsrfToken = () => document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('/nurse/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    Accept: 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Patient added successfully!');
                onAddPatient(data.patient || data);
                onClose();
            } else if (response.status === 422) {
                setErrors(data.errors || {});
            } else {
                alert(data.message || 'An error occurred.');
            }
        } catch (err) {
            alert('Network error.');
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
                <h2 className="text-xl font-semibold">Add New Patient</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

                <input
                    type="text"
                    name="patient_code"
                    value={form.patient_code}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
                {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}

                <input
                    type="text"
                    name="room"
                    placeholder="Room"
                    value={form.room}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="reason"
                    placeholder="Reason for Appointment"
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="date"
                    name="appointment_date"
                    value={form.appointment_date}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />

                <label className="inline-flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="admitted"
                        checked={form.admitted}
                        onChange={handleChange}
                    />
                    Admitted
                </label>

                {/* Doctor select */}
                <label className="block font-semibold">Assign Doctor</label>
                <select
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                >
                    <option value="">Select a doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                            {doc.name} ({doc.dept})
                        </option>
                    ))}
                </select>
                {errors.doctor_id && <p className="text-red-600 text-sm">{errors.doctor_id}</p>}

                {/* Nurse select */}
                <label className="block font-semibold">Assign Nurse</label>
                <select
                    name="nurse_id"
                    value={form.nurse_id}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                >
                    <option value="">Select a nurse</option>
                    {nurses.map((nurse) => (
                        <option key={nurse.id} value={nurse.id}>
                            {nurse.name} ({nurse.dept})
                        </option>
                    ))}
                </select>
                {errors.nurse_id && <p className="text-red-600 text-sm">{errors.nurse_id}</p>}

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Add Patient'}
                    </button>
                </div>
            </form>
        </div>
    );
}
