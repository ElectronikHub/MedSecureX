// resources/js/Components/Admin/EditScheduleModal.jsx
import React, { useState } from "react";

export default function EditScheduleModal({ schedule, onClose, onSave }) {
  const [form, setForm] = useState({
    shift_date: schedule.shift_date,
    start_time: schedule.start_time,
    end_time: schedule.end_time,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(schedule.id, form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Schedule</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium">Shift Date</label>
            <input
              type="date"
              name="shift_date"
              value={form.shift_date}
              onChange={handleChange}
              className="w-full border rounded p-2"
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
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// It displays a popup modal allowing an admin to edit a staff member’s schedule (date, start time, end time).

// The modal shows a form pre-filled with the current schedule.

// When the user clicks "Save," it calls the onSave function with the updated info.

// When the user clicks "Cancel," it closes the modal without saving.
