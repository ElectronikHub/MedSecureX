import React, { useState } from 'react';
import QRCode from 'react-qr-code';

export default function TransferRequestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openModal = () => {
    setIsOpen(true);
    setPatientId('');
    setUserData(null);
    setError('');
  };

  const closeModal = () => {
    setIsOpen(false);
    setPatientId('');
    setUserData(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      // Replace `/api/patients/${patientId}` with your actual API endpoint
      const response = await fetch(`/api/patients/${patientId}`);

      if (!response.ok) {
        throw new Error('Patient not found');
      }

      const data = await response.json();

      // Prepare a string with user data to encode in QR
      const qrString = `
Patient ID: ${data.id}
Name: ${data.name}
Age: ${data.age}
Diagnosis: ${data.diagnosis}
      `;

      setUserData(qrString.trim());
    } catch (err) {
      setError(err.message || 'Failed to fetch patient data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-white text-blue-600 rounded px-4 py-2 font-semibold hover:bg-blue-100"
        onClick={openModal}
      >
        Request Transfer of the Clinic
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Transfer Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="patientId" className="block mb-1 font-medium">
                  Patient ID
                </label>
                <input
                  type="text"
                  id="patientId"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                  placeholder="Enter Patient ID"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Generate QR Code'}
                </button>
              </div>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p>}

            {userData && (
              <div className="mt-6 text-center">
                <h3 className="mb-2 font-semibold">Patient QR Code</h3>
                <div className="inline-block bg-white p-4 rounded shadow">
                  <QRCode value={userData} size={180} />
                </div>
                <pre className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{userData}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// This component allows nurses to request a transfer of a patient by entering the patient's ID.
// It fetches the patient's data from an API and generates a QR code with the patient's information.
// The modal can be opened and closed, and it displays a loading state while fetching data.
// The QR code is generated using the `react-qr-code` library, and the patient's information is displayed in a preformatted text block below the QR code.
// The component handles errors gracefully, displaying an error message if the patient ID is not found or if there is a problem fetching the data.
// The modal is styled with Tailwind CSS classes for a clean and modern look.
//// The component uses React hooks for state management and handles form submission to fetch patient data.
// It also includes a loading state and error handling to provide feedback to the user.
// The QR code is generated using the `react-qr-code` library, which encodes the patient's information in a scannable
