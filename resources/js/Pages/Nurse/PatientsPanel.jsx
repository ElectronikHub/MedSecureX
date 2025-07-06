import React, { useState } from 'react';
import AddPatientModal from './AddPatientModal';
import EditPatientModal from './EditPatientModal'; // Your existing edit modal

export default function PatientsPanel({ patients, onUpdatePatient, onAddPatient, onDeletePatient, isOnDuty, doctors, nurses }) {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    // Your existing patient list rendering and edit/delete handlers...

    return (
        <div>
            {/* Your existing UI */}

            <button onClick={openAddModal} className="btn btn-primary">+ Add Patient</button>

            {addModalOpen && (
                <AddPatientModal
                    open={addModalOpen}
                    onClose={closeAddModal}
                    doctors={doctors}
                    nurses={nurses}
                    onAddPatient={onAddPatient}
                />
            )}

            {editingPatient && (
                <EditPatientModal
                    patient={editingPatient}
                    onClose={() => setEditingPatient(null)}
                    onSave={(updatedPatient) => {
                        onUpdatePatient(updatedPatient);
                        setEditingPatient(null);
                    }}
                />
            )}

            {/* Render patient list */}
        </div>
    );
}
