import React, { useState, useEffect } from 'react';

export default function AddPatientModal({ open, onClose, doctors, nurses, onAddPatient, userRole = 'nurse' }) {
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

    useEffect(() => {
        if (open) {
            const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const randomPart = Math.floor(1000 + Math.random() * 9000);
            setForm({
                name: '',
                patient_code: `P-${datePart}-${randomPart}`,
                age: '',
                gender: '',
                room: '',
                reason: '',
                appointment_date: new Date().toISOString().slice(0, 10),
                admitted: false,
                doctor_id: doctors.length > 0 ? doctors[0].id : '',
                nurse_id: nurses.length > 0 ? nurses[0].id : '',
            });
            setErrors({});
        }
    }, [open, doctors, nurses]);

    const getCsrfToken = () => document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const url = `/${userRole}/patients`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    Accept: 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            console.log('Response data:', data); // Debug backend response

            if (response.ok) {
                alert('Patient added successfully!');
                onAddPatient(data.patient);
                onClose();
            } else if (response.status === 422) {
                setErrors(data.errors || {});
            } else {
                alert(data.message || 'An error occurred.');
            }
        } catch (error) {
            alert('Network error.');
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="add-patient-title">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md w-full space-y-4" noValidate>
                <h2 id="add-patient-title" className="text-xl font-semibold">Add New Patient</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-600' : ''}`}
                    required
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                />
                {errors.name && <p id="error-name" className="text-red-600 text-sm">{errors.name}</p>}

                <input
                    type="text"
                    name="patient_code"
                    value={form.patient_code}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    aria-readonly="true"
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${errors.age ? 'border-red-600' : ''}`}
                    required
                    min="0"
                    max="255"
                    aria-invalid={errors.age ? 'true' : 'false'}
                    aria-describedby={errors.age ? 'error-age' : undefined}
                />
                {errors.age && <p id="error-age" className="text-red-600 text-sm">{errors.age}</p>}

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${errors.gender ? 'border-red-600' : ''}`}
                    required
                    aria-invalid={errors.gender ? 'true' : 'false'}
                    aria-describedby={errors.gender ? 'error-gender' : undefined}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p id="error-gender" className="text-red-600 text-sm">{errors.gender}</p>}

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

                <label htmlFor="doctor-select" className="block font-semibold mt-4">Assign Doctor</label>
                <select
                    id="doctor-select"
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${errors.doctor_id ? 'border-red-600' : ''}`}
                    required
                    aria-invalid={errors.doctor_id ? 'true' : 'false'}
                    aria-describedby={errors.doctor_id ? 'error-doctor' : undefined}
                >
                    <option value="">Select a doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                            {doc.name}
                        </option>
                    ))}
                </select>
                {errors.doctor_id && <p id="error-doctor" className="text-red-600 text-sm">{errors.doctor_id}</p>}

                <label htmlFor="nurse-select" className="block font-semibold mt-4">Assign Nurse</label>
                <select
                    id="nurse-select"
                    name="nurse_id"
                    value={form.nurse_id}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${errors.nurse_id ? 'border-red-600' : ''}`}
                    required
                    aria-invalid={errors.nurse_id ? 'true' : 'false'}
                    aria-describedby={errors.nurse_id ? 'error-nurse' : undefined}
                >
                    <option value="">Select a nurse</option>
                    {nurses.map((nurse) => (
                        <option key={nurse.id} value={nurse.id}>
                            {nurse.name} {nurse.dept ? `(${nurse.dept})` : ''}
                        </option>
                    ))}
                </select>
                {errors.nurse_id && <p id="error-nurse" className="text-red-600 text-sm">{errors.nurse_id}</p>}

                <div className="flex justify-end gap-2 mt-6">
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
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Add Patient'}
                    </button>
                </div>
            </form>
        </div>
    );
}
