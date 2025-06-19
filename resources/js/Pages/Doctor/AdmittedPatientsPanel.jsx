import React from 'react';

export default function AdmittedPatientsPanel({ admittedPatients }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="font-semibold text-lg mb-4">Patients to Round</h2>
      {admittedPatients.length === 0 ? (
        <p className="text-gray-500">
          You currently have no admitted patients to round on.
          <br />
          <small className="text-gray-400">
            This may be because no patients are admitted under your care yet, or admissions are still being processed.
          </small>
        </p>
      ) : (
        <ul className="space-y-3">
          {admittedPatients.map((patient) => (
            <li key={patient.id} className="border rounded p-3">
              <div className="font-semibold">{patient.name}</div>
              <div className="text-sm text-gray-600">Room: {patient.room}</div>
              <div className="text-xs text-gray-500">
                Admitted on: {patient.admission_timestamp || 'Unknown'}
              </div>
              <div className="text-sm mt-1">{patient.reason}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



// Component Definition:
// AdmittedPatientsPanel is a function component that takes one prop:

// admittedPatients: an array of admitted patient objects.

// Panel Layout:

// The outer <div> gives the panel a white background, rounded corners, and a shadow (using Tailwind CSS classes).

// The panel title is "Patients to Round".

// Conditional Rendering:

// If there are no admitted patients (admittedPatients.length === 0), it shows a friendly message explaining why the list might be empty.

// If there are admitted patients, it displays them in a list.

// Patient List:

// For each patient, it shows:

// Name (bold)

// Room number

// Admission timestamp (or "Unknown" if missing)

// Reason for admission

// Example of what it shows
// If there are three admitted patients, you’ll see three cards in the panel, each with the patient’s name, room, admission date, and reason.

// If there are no patients, you’ll see:

// text
// You currently have no admitted patients to round on.
// This may be because no patients are admitted under your care yet, or admissions are still being processed.
