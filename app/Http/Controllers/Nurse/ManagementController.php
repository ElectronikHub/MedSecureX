<?php

namespace App\Http\Controllers\Nurse;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class ManagementController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $now = Carbon::now('Asia/Manila'); // Philippine timezone
        $today = $now->toDateString();
        $currentTime = $now->format('H:i:s');

        // Check if nurse is currently on duty
        $currentSchedule = Schedule::where('user_id', $user->id)
            ->where('shift_date', $today)
            ->where('start_time', '<', $currentTime)
            ->where('end_time', '>', $currentTime)
            ->first();

        $isOnDuty = $currentSchedule !== null;

        $patients = [];
        $schedule = []; // Your schedule data if any
        $stats = [];
        $notifications = [];

        // Fetch doctors and nurses for dropdowns
        $doctors = User::where('role', 'doctor')->select('id', 'name')->get();
        $nurses = User::where('role', 'nurse')->select('id', 'name')->get();

        if ($isOnDuty) {
            // Fetch patients (consider filtering by nurse_id if needed)
            $patients = Patient::all()->map(function ($patient) {
                $initials = $patient->initials;
                if (!$initials) {
                    $names = explode(' ', $patient->name);
                    $initials = '';
                    foreach ($names as $n) {
                        $initials .= strtoupper(substr($n, 0, 1));
                    }
                }

                $idForQr = $patient->patient_code ?? $patient->id;

                $qrData = json_encode([
                    'id' => $idForQr,
                    'name' => $patient->name,
                    'age' => $patient->age,
                    'gender' => $patient->gender,
                    'appointment_time' => optional($patient->appointment_start_time)->format('H:i') . ' - ' . optional($patient->appointment_end_time)->format('H:i'),
                    'reason' => $patient->reason,
                    'status' => $patient->status,
                    'room' => $patient->room ?? '—',
                    'admitted' => (bool) $patient->admitted,
                ]);

                return [
                    'id' => $patient->id,
                    'initials' => $initials,
                    'name' => $patient->name,
                    'patient_code' => $patient->patient_code,
                    'age' => $patient->age,
                    'gender' => $patient->gender,
                    'appointment_time' => optional($patient->appointment_start_time)->format('h:i A') . ' - ' . optional($patient->appointment_end_time)->format('h:i A'),
                    'reason' => $patient->reason,
                    'status' => $patient->status,
                    'statusColor' => $patient->status === 'Completed' ? 'green' : 'yellow',
                    'room' => $patient->room ?? '—',
                    'admitted' => (bool) $patient->admitted,
                    'doctor_id' => $patient->doctor_id,
                    'nurse_id' => $patient->nurse_id,
                    'qrData' => $qrData,
                ];
            })->toArray();

            $patientsCollection = collect($patients);
            $stats = [
                ['label' => 'Patients Today', 'value' => count($patients), 'action' => 'View all', 'color' => 'bg-blue-50', 'text' => 'text-blue-600'],
                ['label' => 'Completed Appointments', 'value' => $patientsCollection->where('status', 'Completed')->count(), 'action' => 'View details', 'color' => 'bg-green-50', 'text' => 'text-green-600'],
                ['label' => 'Pending Appointments', 'value' => $patientsCollection->where('status', 'Upcoming')->count(), 'action' => 'View schedule', 'color' => 'bg-yellow-50', 'text' => 'text-yellow-600'],
                ['label' => 'Critical Alerts', 'value' => 1, 'action' => 'View alerts', 'color' => 'bg-red-50', 'text' => 'text-red-600'],
            ];

            // Example notifications, replace with real data as needed
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
            'doctors' => $doctors,
            'nurses' => $nurses,
        ]);
    }

    public function storePatient(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'patient_code' => ['required', 'string', 'max:255', 'unique:patients,patient_code'],
            'age' => ['required', 'integer', 'min:0'],
            'gender' => ['required', 'string', Rule::in(['Male', 'Female', 'Other'])],
            'room' => ['nullable', 'string', 'max:255'],
            'reason' => ['nullable', 'string', 'max:500'],
            'appointment_date' => ['required', 'date'],
            'admitted' => ['boolean'],
            'doctor_id' => ['nullable', 'exists:users,id'],
            'nurse_id' => ['nullable', 'exists:users,id'],
        ]);

        // Default appointment times (can be extended to accept from request)
        $validated['appointment_start_time'] = '09:00:00';
        $validated['appointment_end_time'] = '09:30:00';

        if ($validated['admitted']) {
            $validated['admission_timestamp'] = Carbon::now();
        }

        // Generate initials if missing
        if (empty($validated['initials'])) {
            $names = explode(' ', $validated['name']);
            $initials = '';
            foreach ($names as $n) {
                $initials .= strtoupper(substr($n, 0, 1));
            }
            $validated['initials'] = $initials;
        }

        $patient = Patient::create($validated);

        return response()->json(['message' => 'Patient created successfully.', 'patient' => $patient], 201);
    }

    public function updatePatient(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'age' => ['required', 'integer', 'min:0'],
            'gender' => ['required', 'string', Rule::in(['Male', 'Female', 'Other'])],
            'room' => ['nullable', 'string', 'max:255'],
            'reason' => ['nullable', 'string', 'max:500'],
            'status' => ['nullable', 'string', 'in:Active,Pending,Completed,Cancelled'], // validate status
            'admitted' => ['boolean'],
        ]);

        $patient->update($validated);

        return response()->json(['message' => 'Patient updated successfully.', 'patient' => $patient]);
    }

}
