import React, { useState } from 'react';
import EditScheduleModal from '@/Components/Admin/EditScheduleModal';

export default function ScheduleManager() {
    const [showModal, setShowModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [schedules, setSchedules] = useState([]); // Your schedule list

    // Function to open modal with selected schedule
    const openEditModal = (schedule) => {
        setSelectedSchedule(schedule);
        setShowModal(true);
    };

    // Function to update schedule via API
    const handleSave = async (scheduleId, formData) => {
        try {
            const response = await fetch(`/admin/schedules/${scheduleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update schedule');
            }

            const data = await response.json();

            // Update schedules state with updated schedule
            setSchedules((prev) =>
                prev.map((sch) => (sch.id === scheduleId ? data.schedule : sch))
            );

            alert(data.message);
            setShowModal(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            {/* Your schedule list and edit buttons */}
            {schedules.map((schedule) => (
                <div key={schedule.id}>
                    <span>{schedule.user_name} - {schedule.shift_date}</span>
                    <button onClick={() => openEditModal(schedule)}>Edit</button>
                </div>
            ))}

            {showModal && selectedSchedule && (
                <EditScheduleModal
                    schedule={selectedSchedule}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
