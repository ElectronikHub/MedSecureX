import React, { useState } from 'react';

export default function EditPatientModal({ patient, onClose, onSave }) {
  const [form, setForm] = useState({ ...patient });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
                required
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Room</label>
            <input
              name="room"
              value={form.room}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Admitted</label>
            <input
              name="admitted"
              type="checkbox"
              checked={form.admitted}
              onChange={handleChange}
              className="ml-2"
            />
            <span className="ml-2">{form.admitted ? 'Admitted' : 'Not Admitted'}</span>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//This component displays a modal (popup window) that lets you edit a patient’s information (like name, age, gender, room, and admitted status).
