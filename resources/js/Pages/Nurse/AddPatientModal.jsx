import React from 'react';

export default function AddPatientModal({ open, onClose, form, errors, onChange, onSubmit, loading }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Add New Patient</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            required
                            disabled={loading}
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Patient Code and Age */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="patient_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Patient Code</label>
                            <input
                                type="text"
                                id="patient_code"
                                name="patient_code"
                                value={form.patient_code}
                                readOnly
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                disabled={loading}
                            />
                            {errors.patient_code && <p className="text-red-600 text-xs mt-1">{errors.patient_code}</p>}
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={form.age}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                required
                                disabled={loading}
                            />
                            {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        </div>
                    </div>

                    {/* Gender and Room */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={form.gender}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                required
                                disabled={loading}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
                        </div>
                        <div>
                            <label htmlFor="room" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room</label>
                            <input
                                type="text"
                                id="room"
                                name="room"
                                value={form.room}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                disabled={loading}
                            />
                            {errors.room && <p className="text-red-600 text-xs mt-1">{errors.room}</p>}
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={form.reason}
                            onChange={onChange}
                            rows="2"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            disabled={loading}
                        ></textarea>
                        {errors.reason && <p className="text-red-600 text-xs mt-1">{errors.reason}</p>}
                    </div>

                    {/* Appointment Date and Admitted */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Appointment Date</label>
                            <input
                                type="date"
                                id="appointment_date"
                                name="appointment_date"
                                value={form.appointment_date}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                required
                                disabled={loading}
                            />
                            {errors.appointment_date && <p className="text-red-600 text-xs mt-1">{errors.appointment_date}</p>}
                        </div>
                        <div>
                            <label htmlFor="admitted" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admitted</label>
                            <input
                                type="checkbox"
                                id="admitted"
                                name="admitted"
                                checked={form.admitted}
                                onChange={e => onChange({ target: { name: e.target.name, value: e.target.checked } })}
                                className="mt-3 ml-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                disabled={loading}
                            />
                            {errors.admitted && <p className="text-red-600 text-xs mt-1">{errors.admitted}</p>}
                        </div>
                    </div>

                    {/* Doctor and Nurse as text inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="doctor_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Doctor</label>
                            <input
                                type="text"
                                id="doctor_name"
                                name="doctor_name"
                                value={form.doctor_name || ''}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                disabled={loading}
                                placeholder="Enter doctor name"
                            />
                            {errors.doctor_name && <p className="text-red-600 text-xs mt-1">{errors.doctor_name}</p>}
                        </div>
                        <div>
                            <label htmlFor="nurse_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Nurse</label>
                            <input
                                type="text"
                                id="nurse_name"
                                name="nurse_name"
                                value={form.nurse_name || ''}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                disabled={loading}
                                placeholder="Enter nurse name"
                            />
                            {errors.nurse_name && <p className="text-red-600 text-xs mt-1">{errors.nurse_name}</p>}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
