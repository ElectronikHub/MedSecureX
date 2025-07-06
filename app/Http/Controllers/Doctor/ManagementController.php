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
        $doctorId = Auth::id(); // Logged-in doctor user ID
        $now = Carbon::now('Asia/Manila'); // Philippine timezone
        $today = $now->toDateString();
        $currentTime = $now->format('H:i:s');

        // Check if the doctor is currently on duty by schedule linked to user_id
        $currentSchedule = Schedule::where('user_id', $doctorId)
            ->where('shift_date', $today)
            ->where('start_time', '<=', $currentTime)
            ->where('end_time', '>=', $currentTime)
            ->first();

        $isOnDuty = $currentSchedule !== null;

        $patientsToday = collect();
        $admittedPatients = collect();
        $allPatients = collect();
        $stats = [];
        $timeline = [];

        if ($isOnDuty) {
            // Fetch admitted patients assigned to this doctor (regardless of appointment_date)
            $admittedPatients = Patient::where('doctor_id', $doctorId)
                ->where('admitted', true)
                ->get()
                ->map(function ($patient) {
                    return [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'room' => $patient->room,
                        'admission_timestamp' => $patient->admission_timestamp
                            ? Carbon::parse($patient->admission_timestamp)->format('M d, Y h:i A')
                            : null,
                        'reason' => $patient->reason,
                    ];
                });

            // Existing patientsToday and stats logic here if needed
            $patientsToday = Patient::where('doctor_id', $doctorId)
                ->where('admitted', true)
                ->whereDate('appointment_date', $today)
                ->get()
                ->map(function ($patient) {
                    $startTime = $patient->appointment_start_time ? Carbon::parse($patient->appointment_start_time)->format('h:i A') : null;
                    $endTime = $patient->appointment_end_time ? Carbon::parse($patient->appointment_end_time)->format('h:i A') : null;

                    return [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'status' => $patient->status,
                        'appointment_time' => $startTime && $endTime ? $startTime . ' - ' . $endTime : null,
                        'reason' => $patient->reason,
                        'admitted' => true,
                        'admission_status' => 'Admitted',
                    ];
                });

            // Fetch all patients assigned to this doctor (no admission or date filter)
            $allPatients = Patient::where('doctor_id', $doctorId)
                ->get()
                ->map(function ($patient) {
                    return [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'patient_code' => $patient->patient_code,
                        'age' => $patient->age,
                        'gender' => $patient->gender,
                        'disease_categories' => $patient->disease_categories,
                        'appointment_start_time' => $patient->appointment_start_time
                            ? Carbon::parse($patient->appointment_start_time)->format('h:i A')
                            : null,
                        'appointment_end_time' => $patient->appointment_end_time
                            ? Carbon::parse($patient->appointment_end_time)->format('h:i A')
                            : null,
                        'appointment_date' => $patient->appointment_date
                            ? Carbon::parse($patient->appointment_date)->format('M d, Y')
                            : null,
                        'reason' => $patient->reason,
                        'status' => $patient->status,
                        'room' => $patient->room,
                        'admitted' => $patient->admitted,
                        'admission_timestamp' => $patient->admission_timestamp
                            ? Carbon::parse($patient->admission_timestamp)->format('M d, Y h:i A')
                            : null,
                        'discharge_timestamp' => $patient->discharge_timestamp
                            ? Carbon::parse($patient->discharge_timestamp)->format('M d, Y h:i A')
                            : null,
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

            // Example timeline events (you can customize or fetch real data)
            $timeline = [
                ['time' => '8:00 AM', 'event' => 'Morning briefing'],
                ['time' => '9:00 AM', 'event' => 'Patient: John Doe - Routine Checkup'],
                ['time' => '10:30 AM', 'event' => 'Patient: Jane Smith - Follow-up'],
            ];
        }

        return Inertia::render('DoctorDashboard', [
            'patientsToday' => $patientsToday,
            'admittedPatients' => $admittedPatients,
            'allPatients' => $allPatients,
            'stats' => $stats,
            'timeline' => $timeline,
            'isOnDuty' => $isOnDuty,
            'currentSchedule' => $currentSchedule,
        ]);
    }
}
