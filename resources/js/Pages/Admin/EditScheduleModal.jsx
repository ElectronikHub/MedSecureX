import React, { useState, useEffect } from "react";

export default function EditScheduleModal({ schedule, onClose, onSave, users }) {
    const [form, setForm] = useState({
        shift_date: "",
        start_time: "",
        end_time: "",
        user_id: "",
    });

    // Populate form when schedule changes (for edit), or reset for new
    useEffect(() => {
        if (schedule) {
            setForm({
                shift_date: schedule.shift_date || "",
                start_time: schedule.start_time || "",
                end_time: schedule.end_time || "",
                user_id: schedule.user_id || "",
            });
        } else {
            setForm({
                shift_date: "",
                start_time: "",
                end_time: "",
                user_id: "",
            });
        }
    }, [schedule]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(schedule ? schedule.id : null, form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">{schedule ? "Edit" : "Add"} Schedule</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Assign To</label>
                        <select
                            name="user_id"
                            value={form.user_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        >
                            <option value="">Select a user</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.role})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Shift Date</label>
                        <input
                            type="date"
                            name="shift_date"
                            value={form.shift_date}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Start Time</label>
                        <input
                            type="time"
                            name="start_time"
                            value={form.start_time}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">End Time</label>
                        <input
                            type="time"
                            name="end_time"
                            value={form.end_time}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
