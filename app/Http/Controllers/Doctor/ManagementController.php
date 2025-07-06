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

        $patients = collect();
        $stats = [];
        $timeline = [];

        if ($isOnDuty) {
            // Fetch all patients assigned to this doctor (no admission filter)
            $patients = Patient::where('doctor_id', $doctorId)
                ->get()
                ->map(function ($patient) {
                    return [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'room' => $patient->room,
                        'admission_timestamp' => $patient->admission_timestamp ? $patient->admission_timestamp->format('M d, Y h:i A') : null,
                        'reason' => $patient->reason,
                        'admitted' => $patient->admitted,
                        'status' => $patient->status,
                        'appointment_date' => $patient->appointment_date ? $patient->appointment_date->format('M d, Y') : null,
                    ];
                });

            // You can keep your stats and timeline logic here if needed
        }

        return Inertia::render('DoctorDashboard', [
            'patients' => $patients,
            'stats' => $stats,
            'timeline' => $timeline,
            'isOnDuty' => $isOnDuty,
            'currentSchedule' => $currentSchedule,
        ]);
    }


}
