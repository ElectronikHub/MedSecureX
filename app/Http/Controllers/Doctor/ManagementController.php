<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ManagementController extends Controller
{
    /**
     * Fetch all patients assigned to the authenticated doctor.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllPatients()
    {
        $doctorId = Auth::id();

        return Patient::where('doctor_id', $doctorId)
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
                    'admission_status' => $patient->admitted == 1 ? 'Admitted' : 'Not Admitted',
                    'status' => $patient->status,
                    'room' => $patient->room ?? 'N/A',
                    'admission_timestamp' => $patient->admission_timestamp ? $patient->admission_timestamp->toDateTimeString() : 'Unknown',
                ];
            });
    }

    /**
     * Fetch only admitted patients assigned to the authenticated doctor.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAdmittedPatients()
    {
        $doctorId = Auth::id();

        return Patient::where('doctor_id', $doctorId)
            ->where('admitted', 1) // admitted = 1 means admitted
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
                    'admission_status' => 'Admitted',
                    'status' => $patient->status,
                    'room' => $patient->room ?? 'N/A',
                    'admission_timestamp' => $patient->admission_timestamp ? $patient->admission_timestamp->toDateTimeString() : 'Unknown',
                ];
            });
    }

    /**
     * Example dashboard method demonstrating usage.
     */
    public function dashboard()
    {
        $patientsToday = $this->getAllPatients();
        $admittedPatients = $this->getAdmittedPatients();

        // Example stats (customize as needed)
        $stats = [
            [
                'label' => 'Patients Today',
                'value' => $patientsToday->count(),
                'action' => 'View all',
                'color' => 'bg-blue-50',
                'text' => 'text-blue-600',
            ],
            [
                'label' => 'Admitted Patients',
                'value' => $admittedPatients->count(),
                'action' => 'View admitted',
                'color' => 'bg-green-50',
                'text' => 'text-green-600',
            ],
        ];

        // Example timeline (customize as needed)
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
            'admittedPatients' => $admittedPatients,
            'stats' => $stats,
            'timeline' => $timeline,
            'isOnDuty' => $isOnDuty,
            'currentSchedule' => $currentSchedule,
        ]);
    }
}
