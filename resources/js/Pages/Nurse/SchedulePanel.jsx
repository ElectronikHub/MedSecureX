import React from 'react';

export default function SchedulePanel({ schedule, onMarkCompleted }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-4 text-black">Today's Schedule</h3>
      <div className="space-y-2">
        {schedule.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <span className="font-medium text-black">{item.time}</span>
              <span className="ml-2 text-gray-600">{item.patient}{item.status === 'Completed' && <span className="text-xs text-gray-400"> (Completed)</span>}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-semibold rounded px-2 py-1 ${item.statusColor === 'green' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {item.status}
              </span>
              {item.status === 'Upcoming' && (
                <button
                  className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => onMarkCompleted(item.id)}
                  title="Mark as Completed"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//// This component displays a nurse's schedule for the day.
// It takes a `schedule` prop, which is an array of schedule items, and an `onMarkCompleted` function prop to handle marking items as completed.
// Each schedule item should have the following properties:
// - `id`: Unique identifier for the schedule item
// - `time`: Time of the appointment
// - `patient`: Name of the patient
// - `status`: Current status of the appointment (e.g., "Upcoming", "Completed")
// - `statusColor`: Color for the status badge (e.g., "green", "yellow")
//// The component renders a list of schedule items with their time, patient name, and status.
// If   the status is "Upcoming", it shows a button to mark the item as completed.  
