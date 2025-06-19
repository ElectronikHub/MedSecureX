// resources/js/Components/Admin/StaffPanel.jsx
import React, { useState } from "react";

export default function StaffPanel({ doctors = [], nurses = [] }) {
  const [activeTab, setActiveTab] = useState("doctors");
  const safeDoctors = Array.isArray(doctors) ? doctors : [];
  const safeNurses = Array.isArray(nurses) ? nurses : [];

  const renderStaffCards = (staff) =>
    staff.length === 0 ? (
      <p className="text-gray-500 col-span-full text-center py-10">
        No staff available.
      </p>
    ) : (
      staff.map((person) => (
        <div key={person.id} className="border rounded-lg p-3 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold bg-gray-200">
              {person.initials || "N/A"}
            </div>
            <div>
              <div className="font-medium text-black">{person.name || "Unknown"}</div>
              <div className="text-xs text-gray-500">{person.dept || "Unknown Dept"}</div>
            </div>
            <span
              className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold ${
                person.statusColor || "bg-gray-100 text-gray-700"
              }`}
            >
              {person.status || "Unknown"}
            </span>
          </div>
          <div className="text-sm text-gray-500">Current Ward: {person.ward || "N/A"}</div>
          <div className="text-xs text-gray-400">Shift: {person.shift || "N/A"}</div>
          <div className="flex gap-2 mt-1">
            <button className="text-blue-600 text-xs underline">Edit Schedule</button>
            <button className="text-blue-600 text-xs underline">Reassign</button>
          </div>
        </div>
      ))
    );

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("doctors")}
            className={`px-4 py-2 rounded-t-lg font-semibold ${
              activeTab === "doctors"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Doctors ({safeDoctors.length})
          </button>
          <button
            onClick={() => setActiveTab("nurses")}
            className={`px-4 py-2 rounded-t-lg font-semibold ${
              activeTab === "nurses"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Nurses ({safeNurses.length})
          </button>
        </div>
        <button className="px-3 py-1 bg-blue-600 text-white rounded font-medium">
          Add Staff
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeTab === "doctors"
          ? renderStaffCards(safeDoctors)
          : renderStaffCards(safeNurses)}
      </div>
      <div className="flex justify-end mt-4 gap-2 text-black">
        <button className="px-2 py-1 bg-gray-200 rounded">Previous</button>
        <button className="px-2 py-1 bg-blue-600 text-white rounded">1</button>
        <button className="px-2 py-1 bg-gray-200 rounded">2</button>
        <button className="px-2 py-1 bg-gray-200 rounded">3</button>
        <button className="px-2 py-1 bg-gray-200 rounded">Next</button>
      </div>
    </div>
  );
}

// This component renders a staff panel with tabs for doctors and nurses.
// It displays staff cards with their details and provides options to edit schedules or reassign.
