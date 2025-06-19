<?php

namespace App\Http\Controllers\Nurse;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Schedule;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ManagementController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $now = Carbon::now();
        $today = $now->toDateString();
        $currentTime = $now->format('H:i:s');

        // Check if the nurse is scheduled for right now
        $currentSchedule = Schedule::where('user_id', $user->id)
            ->where('shift_date', $today)
            ->where('start_time', '<=', $currentTime)
            ->where('end_time', '>=', $currentTime)
            ->first();



        $isOnDuty = $currentSchedule !== null;

        $patients = [];
        $schedule = [];
        $stats = [];
        $notifications = [];

        if ($isOnDuty) {
            // Only fetch/display patients if on duty
            $patients = Patient::all()->map(function ($patient) {
                $initials = $patient->initials;
                if (!$initials) {
                    $names = explode(' ', $patient->name);
                    $initials = '';
                    foreach ($names as $n) {
                        $initials .= strtoupper(substr($n, 0, 1));
                    }
                }
                $qrData = json_encode([
                    'id' => $patient->patient_code ?? $patient->id,
                    'name' => $patient->name,
                    'age' => $patient->age,
                    'gender' => $patient->gender,
                    'appointment_time' => $patient->appointment_start_time . ' - ' . $patient->appointment_end_time,
                    'reason' => $patient->reason,
                    'status' => $patient->status,
                    'room' => $patient->room ?? '—',
                    'admitted' => (bool) $patient->admitted,
                ]);
                return [
                    'initials' => $initials,
                    'name' => $patient->name,
                    'id' => $patient->patient_code ?? $patient->id,
                    'age' => $patient->age,
                    'gender' => $patient->gender,
                    'time' => $patient->appointment_start_time . ' - ' . $patient->appointment_end_time,
                    'reason' => $patient->reason,
                    'status' => $patient->status,
                    'statusColor' => $patient->status === 'Completed' ? 'green' : 'yellow',
                    'room' => $patient->room ?? '—',
                    'admitted' => (bool) $patient->admitted,
                    'qrData' => $qrData,
                ];
            })->toArray();



            // Stats calculation
            $patientsCollection = collect($patients);
            $stats = [
                ['label' => 'Patients Today', 'value' => count($patients), 'action' => 'View all', 'color' => 'bg-blue-50', 'text' => 'text-blue-600'],
                ['label' => 'Completed Appointments', 'value' => $patientsCollection->where('status', 'Completed')->count(), 'action' => 'View details', 'color' => 'bg-green-50', 'text' => 'text-green-600'],
                ['label' => 'Pending Appointments', 'value' => $patientsCollection->where('status', 'Upcoming')->count(), 'action' => 'View schedule', 'color' => 'bg-yellow-50', 'text' => 'text-yellow-600'],
                ['label' => 'Critical Alerts', 'value' => 1, 'action' => 'View alerts', 'color' => 'bg-red-50', 'text' => 'text-red-600'],
            ];

            // Notifications - static example, replace with real data if needed
            $notifications = [
                ['type' => 'alert', 'title' => 'Critical Alert', 'message' => "Patient Robert Johnson's blood pressure readings require immediate attention.", 'time' => '30 minutes ago'],
                ['type' => 'lab', 'title' => 'Lab Results Available', 'message' => 'New lab results are available for Jane Smith.', 'time' => '2 hours ago'],
                ['type' => 'med', 'title' => 'Medication Reminder', 'message' => 'Prescription renewal needed for Thomas Brown.', 'time' => '5 hours ago'],
                ['type' => 'update', 'title' => 'Schedule Updated', 'message' => 'Your schedule for tomorrow has been updated.', 'time' => 'Yesterday'],
            ];
        }

        return Inertia::render('NurseDashboard', [
            'patients' => $patients,
            'schedule' => $schedule,
            'stats' => $stats,
            'notifications' => $notifications,
            'isOnDuty' => $isOnDuty,
            'currentSchedule' => $currentSchedule,
        ]);
    }
}

// This code is part of a Laravel application and is used to manage the nurse dashboard.
// It retrieves the current schedule, patients, statistics, and notifications for the nurse.
// The dashboard displays patient information, statistics about appointments, and notifications relevant to the nurse's duties.
// The code also checks if the nurse is currently on duty based on their schedule for today and the current time.
// If the nurse is on duty, it fetches the patients assigned to them and formats the data for display in an Inertia.js view.
// The patients' data includes their initials, name, ID, age,
