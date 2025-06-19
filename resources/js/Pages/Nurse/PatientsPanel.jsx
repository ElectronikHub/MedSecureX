import React, { useState } from 'react';
import EditPatientModal from './EditPatientModal'; // Your modal component

export default function PatientsPanel({ patients, onUpdatePatient, isOnDuty }) {
  const [editingPatient, setEditingPatient] = useState(null);

  if (!isOnDuty) {
    return (
      <div className="bg-white rounded-lg shadow p-8 mt-12 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Off Duty</h2>
        <p className="text-gray-600">
          You can't access patient data outside your scheduled shift.<br />
          Please check your schedule for your next duty time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h3 className="font-semibold text-lg md:text-xl text-blue-700">Today's Patients</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-100 rounded text-black hover:bg-gray-200 transition">Filter</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">+ Add Patient</button>
        </div>
      </div>
      <div className="space-y-3">
        {patients.length === 0 && (
          <div className="text-center text-gray-400 py-8">No patients scheduled for today.</div>
        )}
        {patients.map((p, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b py-2 gap-2">
            <div className="flex items-center space-x-3">
              <span
                className="rounded-full px-3 py-2 text-white font-bold text-sm"
                style={{
                  background:
                    p.statusColor === 'green'
                      ? '#22c55e'
                      : p.statusColor === 'yellow'
                      ? '#eab308'
                      : '#2563eb', // fallback to blue
                }}
              >
                {p.initials}
              </span>
              <div>
                <div className="font-semibold text-black">{p.name}</div>
                <div className="text-xs text-gray-500">
                  ID: {p.id} • {p.age} years • {p.gender}
                </div>
                <div className="text-xs text-gray-400">{p.time} • {p.reason}</div>
                <div className="text-xs text-gray-400">
                  Room: <span className="font-semibold text-gray-700">{p.room}</span> &nbsp;|&nbsp;
                  {p.admitted ? (
                    <span className="text-green-600 font-semibold">Admitted</span>
                  ) : (
                    <span className="text-gray-500">Not Admitted</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span
                className={`text-xs font-semibold rounded px-2 py-1 ${
                  p.statusColor === 'green'
                    ? 'bg-green-100 text-green-700'
                    : p.statusColor === 'yellow'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {p.status}
              </span>
              {/* Edit button */}
              <button
                onClick={() => setEditingPatient(p)}
                className="ml-2 p-1 rounded hover:bg-blue-50"
                title="Edit Patient"
                aria-label={`Edit patient ${p.name}`}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingPatient && (
        <EditPatientModal
          patient={editingPatient}
          onClose={() => setEditingPatient(null)}
          onSave={updatedPatient => {
            onUpdatePatient(updatedPatient);
            setEditingPatient(null);
          }}
        />
      )}
    </div>
  );
}

// This component provides a clear, organized view of patients assigned to the nurse, allowing for quick updates and management during their shift.
// It includes features like patient status indicators, quick edit options, and a responsive design for easy access on different devices.
// The design focuses on usability and clarity, ensuring nurses can efficiently manage their patient list while on duty.
// The component also handles the case when the nurse is off duty, providing a clear message and preventing access to patient data outside scheduled shifts.
// The use of colors and icons helps in quickly identifying patient statuses, making it easier for nurses to prioritize care and respond to needs promptly.
// The component is designed to be flexible and can be easily integrated into a larger application, with the ability to handle updates and changes to patient data dynamically.
// The modal for editing patient details is included, allowing nurses to quickly update patient information without leaving the main view, enhancing workflow efficiency.
// Overall, this component aims to improve the nurse's experience in managing patient care, providing a user-friendly interface that supports their daily tasks effectively.
// It is designed to be intuitive and straightforward, minimizing the learning curve for new users while providing all necessary functionalities for efficient patient management.
// The component is also responsive, ensuring it works well on both desktop and mobile devices, which is crucial for nurses who may need to access patient information on the go or in different care settings.
//
