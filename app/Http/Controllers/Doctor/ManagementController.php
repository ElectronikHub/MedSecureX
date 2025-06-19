<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ManagementController extends Controller
{
    public function dashboard()
    {
        $doctorId = Auth::id(); // Get logged-in doctor's user ID
        $now = Carbon::now('Asia/Manila'); // Use PH timezone (adjust if needed)
        $today = $now->toDateString();
        $currentTime = $now->format('H:i:s');

        // Check if the doctor is on duty right now
        $currentSchedule = Schedule::where('user_id', $doctorId)
            ->where('role', 'doctor')
            ->where('shift_date', $today)
            ->where('start_time', '<=', $currentTime)
            ->where('end_time', '>=', $currentTime)
            ->first();

        $isOnDuty = $currentSchedule !== null;

        $patientsToday = collect();
        $stats = [];
        $timeline = [];

        if ($isOnDuty) {
            // Fetch only admitted patients assigned to this doctor scheduled for today
            $patientsToday = Patient::where('doctor_id', $doctorId)
                ->where('admitted', 1) // Only admitted patients
                ->whereDate('appointment_start_time', $today)
                ->get()
                ->map(function ($patient) {
                    return [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'status' => $patient->status,
                        'appointment_time' => optional($patient->appointment_start_time)->format('h:i A')
                            . ' - ' . optional($patient->appointment_end_time)->format('h:i A'),
                        'reason' => $patient->reason,
                        'admitted' => true,
                        'admission_status' => 'Admitted',
                    ];
                });

            // Calculate stats dynamically
            $stats = [
                [
                    'label' => 'Patients Today',
                    'value' => $patientsToday->count(),
                    'action' => 'View all',
                    'color' => 'bg-blue-50',
                    'text' => 'text-blue-600',
                ],
                [
                    'label' => 'Completed Appointments',
                    'value' => $patientsToday->where('status', 'Completed')->count(),
                    'action' => 'View details',
                    'color' => 'bg-green-50',
                    'text' => 'text-green-600',
                ],
                [
                    'label' => 'Upcoming Appointments',
                    'value' => $patientsToday->where('status', 'Upcoming')->count(),
                    'action' => 'View schedule',
                    'color' => 'bg-yellow-50',
                    'text' => 'text-yellow-600',
                ],
            ];

            // Example timeline events
            $timeline = [
                ['time' => '8:00 AM', 'event' => 'Morning briefing'],
                ['time' => '9:00 AM', 'event' => 'Patient: John Doe - Routine Checkup'],
                ['time' => '10:30 AM', 'event' => 'Patient: Jane Smith - Follow-up'],
            ];
        }

        return Inertia::render('DoctorDashboard', [
            'patientsToday' => $patientsToday,
            'stats' => $stats,
            'timeline' => $timeline,
            'isOnDuty' => $isOnDuty,
            'currentSchedule' => $currentSchedule,
        ]);
    }
}


// Note: This code assumes you have the necessary models and relationships set up.
// It also assumes you have Inertia.js set up in your Laravel application.
// The dashboard will display the doctor's current schedule, patients for today, and relevant statistics.
// // This code is part of a Laravel application and is used to manage the admin dashboard.
// // It retrieves statistics about users, doctors, nurses, and patients, and formats the data for display in an Inertia.js view.
// // The code also includes logic to format the status of doctors and nurses, and to retrieve their schedules.
