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
            ['time' => '7:30 AM', 'event' => 'Arrive at clinic, review patient charts'],
            ['time' => '8:00 AM', 'event' => 'Morning briefing with medical team'],
            ['time' => '8:30 AM', 'event' => 'Patient: Michael Johnson - Annual Physical Exam'],
            ['time' => '9:15 AM', 'event' => 'Patient: Sarah Lee - Follow-up on lab results'],
            ['time' => '10:00 AM', 'event' => 'Patient: David Kim - Consultation for chronic pain'],
            ['time' => '10:45 AM', 'event' => 'Coffee break / Emails'],
            ['time' => '11:00 AM', 'event' => 'Patient: Emily Davis - New patient intake'],
            ['time' => '11:45 AM', 'event' => 'Administrative tasks / Documentation'],
            ['time' => '12:30 PM', 'event' => 'Lunch break'],
            ['time' => '1:30 PM', 'event' => 'Patient: Robert Brown - Post-surgery checkup'],
            ['time' => '2:15 PM', 'event' => 'Patient: Lisa Wong - Routine blood pressure check'],
            ['time' => '3:00 PM', 'event' => 'Team meeting / Case discussions'],
            ['time' => '3:30 PM', 'event' => 'Patient: Mark Wilson - Medication review'],
            ['time' => '4:15 PM', 'event' => 'Patient: Anna Garcia - Vaccination appointment'],
            ['time' => '5:00 PM', 'event' => 'Wrap up, finalize notes, prepare for next day'],
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
