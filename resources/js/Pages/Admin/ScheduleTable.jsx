// resources/js/Components/Admin/ScheduleTable.jsx
import React, { useState, useMemo } from "react";

export default function ScheduleTable({ schedules, onEdit }) {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);

  // Gather unique roles and departments for filter dropdowns
  const uniqueRoles = Array.from(new Set(schedules.map(s => s.role))).filter(Boolean);
  const uniqueDepartments = Array.from(new Set(schedules.map(s => s.department))).filter(Boolean);

  // Filter state
  const [filterDate, setFilterDate] = useState(today);
  const [filterRole, setFilterRole] = useState("");
  const [filterDept, setFilterDept] = useState("");

  // Filtering logic
  const filteredSchedules = useMemo(() => {
    return schedules.filter(s =>
      (!filterDate || s.shift_date === filterDate) &&
      (!filterRole || s.role === filterRole) &&
      (!filterDept || s.department === filterDept)
    );
  }, [schedules, filterDate, filterRole, filterDept]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-8">
      <h3 className="text-lg font-semibold mb-4">Staff Schedules</h3>
      {/* Advanced Filtering Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 block mb-1">Role</label>
          <select
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-600 block mb-1">Department</label>
          <select
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            {uniqueDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        {/* Reset Filters Button */}
        <div className="flex items-end">
          <button
            className="ml-2 px-3 py-1 bg-gray-200 rounded text-xs"
            onClick={() => {
              setFilterDate(today);
              setFilterRole("");
              setFilterDept("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
      {/* Table */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Role</th>
            <th className="border-b p-2">Department</th>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Start</th>
            <th className="border-b p-2">End</th>
            <th className="border-b p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedules.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-6">
                No schedules found.
              </td>
            </tr>
          ) : (
            filteredSchedules.map(s => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{s.user_name}</td>
                <td className="p-2 capitalize">{s.role}</td>
                <td className="p-2">{s.department}</td>
                <td className="p-2">{s.shift_date}</td>
                <td className="p-2">{s.start_time}</td>
                <td className="p-2">{s.end_time}</td>
                <td className="p-2">
                  <button
                    className="text-blue-600 underline text-xs"
                    onClick={() => onEdit(s)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
// This component renders a table of staff schedules with advanced filtering options.
// It allows filtering by date, role, and department, and provides an edit button for each schedule.
// The table is responsive and adapts to different screen sizes, ensuring a good user experience.
// The component uses useMemo for performance optimization, recalculating the filtered schedules only when dependencies change.
// The reset button clears all filters, returning to the default state with today's date selected.
// The table displays relevant information such as name, role, department, date, start time,
// end time, and an action button to edit the schedule.
