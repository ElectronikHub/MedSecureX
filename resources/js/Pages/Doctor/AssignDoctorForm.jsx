import React from 'react';
import { useForm } from '@inertiajs/react';

export default function AssignDoctorForm({ patientId, doctors }) {
  // Initialize form state with Inertia's useForm
  const { data, setData, post, processing, errors } = useForm({
    doctor_id: '',
  });

  function handleSubmit(e) {
    e.preventDefault();

    // Post to the assign doctor route
    post(route('patients.assignDoctor', patientId), {
      onSuccess: () => {
        alert('Doctor assigned successfully!');
        // Optionally reset form or redirect
      },
      onError: () => {
        // Handle errors (errors object will be populated)
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="doctor_id" className="block font-medium text-gray-700">
        Select Doctor
      </label>
      <select
        id="doctor_id"
        name="doctor_id"
        value={data.doctor_id}
        onChange={e => setData('doctor_id', e.target.value)}
        required
        className="border rounded p-2 w-full"
      >
        <option value="">Select Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      {errors.doctor_id && <div className="text-red-600">{errors.doctor_id}</div>}

      <button
        type="submit"
        disabled={processing}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Assign Doctor
      </button>
    </form>
  );
}

// Props:

// patientId: The ID of the patient you want to assign a doctor to.

// doctors: An array of available doctor objects (each with an id and name).

// Form State:

// Uses useForm to manage the selected doctor (doctor_id).

// Handles validation errors and loading state automatically.

// Form Submission:

// When the form is submitted, it prevents the default page reload.

// It sends a POST request to the backend route patients.assignDoctor with the selected doctor and patient ID.

// On success, it shows an alert (you could also redirect or reset the form).

// On error, it displays validation errors.

// UI Elements:

// A dropdown (<select>) to choose a doctor.

// An error message if there’s a problem.

// A submit button that’s disabled while the form is processing.
