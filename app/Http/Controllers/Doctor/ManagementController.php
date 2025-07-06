<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ManagementController extends Controller
{
    public function dashboard()
    {
        $doctorId = Auth::id();
        $today = Carbon::now('Asia/Manila')->toDateString();

        // Fetch patients scheduled for today assigned to this doctor
        $patientsToday = Patient::where('doctor_id', $doctorId)
            ->get()
            ->map(function ($patient) {
                $startTime = $patient->appointment_start_time
                    ? Carbon::parse($patient->appointment_start_time)->format('h:i A')
                    : null;
                $endTime = $patient->appointment_end_time
                    ? Carbon::parse($patient->appointment_end_time)->format('h:i A')
                    : null;

                return [
                    'id' => $patient->id,
                    'name' => $patient->name,
                    'appointment_time' => $startTime && $endTime ? $startTime . ' - ' . $endTime : 'N/A',
                    'reason' => $patient->reason,
                    'admission_status' => $patient->admitted ? 'Admitted' : 'Not Admitted',
                    'status' => $patient->status,
                ];
            });

        // Example stats and timeline (replace with your actual logic)
        $stats = [
            [
                'label' => 'Patients Today',
                'value' => $patientsToday->count(),
                'action' => 'View all',
                'color' => 'bg-blue-50',
                'text' => 'text-blue-600',
            ],
            // Add more stats if needed
        ];

        $timeline = [
            ['time' => '8:00 AM', 'event' => 'Morning briefing'],
            ['time' => '9:00 AM', 'event' => 'Patient: John Doe - Routine Checkup'],
            ['time' => '10:30 AM', 'event' => 'Patient: Jane Smith - Follow-up'],
        ];

        // Example: Assume doctor is on duty (adjust as needed)
        $isOnDuty = true;
        $currentSchedule = ['user' => ['name' => Auth::user()->name]];

        return Inertia::render('DoctorDashboard', [
            'patientsToday' => $patientsToday,
            'stats' => $stats,
            'timeline' => $timeline,
            'isOnDuty' => $isOnDuty,
            'currentSchedule' => $currentSchedule,
        ]);
    }
}
