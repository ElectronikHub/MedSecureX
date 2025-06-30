<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Patient;
use App\Models\Schedule;

class ManagementController extends Controller
{
    public function dashboard()
    {
        // Stats
        $totalUsers = User::count();
        $totalDoctors = User::where('role', 'doctor')->count();
        $totalNurses = User::where('role', 'nurse')->count();
        $totalPatients = Patient::count();

        $statusColors = [
            'Active' => 'bg-green-100 text-green-700',
            'On Break' => 'bg-yellow-100 text-yellow-700',
            'Off Duty' => 'bg-gray-100 text-gray-700',
        ];

        // Doctors
        $doctors = User::where('role', 'doctor')
            ->get()
            ->map(function ($doctor) use ($statusColors) {
                $initials = collect(explode(' ', $doctor->name))
                    ->map(fn($n) => strtoupper(substr($n, 0, 1)))
                    ->join('');
                $status = $doctor->status ?? 'Active';
                return [
                    'id' => $doctor->id,
                    'initials' => $initials,
                    'name' => $doctor->name,
                    'dept' => $doctor->department ?? 'Unknown',
                    'status' => $status,
                    'ward' => $doctor->ward ?? 'Not Assigned',
                    'shift' => $doctor->shift ?? 'Not Assigned',
                    'statusColor' => $statusColors[$status] ?? 'bg-gray-100 text-gray-700',
                ];
            })->values();

        // Nurses
        $nurses = User::where('role', 'nurse')
            ->get()
            ->map(function ($nurse) use ($statusColors) {
                $initials = collect(explode(' ', $nurse->name))
                    ->map(fn($n) => strtoupper(substr($n, 0, 1)))
                    ->join('');
                $status = $nurse->status ?? 'Active';
                return [
                    'id' => $nurse->id,
                    'initials' => $initials,
                    'name' => $nurse->name,
                    'dept' => $nurse->department ?? 'Unknown',
                    'status' => $status,
                    'ward' => $nurse->ward ?? 'Not Assigned',
                    'shift' => $nurse->shift ?? 'Not Assigned',
                    'statusColor' => $statusColors[$status] ?? 'bg-gray-100 text-gray-700',
                ];
            })->values();

        // Schedules
        $schedules = Schedule::with('user')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'user_id' => $s->user_id,
                'user_name' => $s->user->name ?? '',
                'role' => $s->user->role ?? '',
                'department' => $s->user->department ?? '',
                'shift_date' => $s->shift_date,
                'start_time' => $s->start_time,
                'end_time' => $s->end_time,
            ];
        });

        // Fetch all users for the new panel
        $allUsers = User::all()->map(function ($user) use ($statusColors) {
            $status = $user->status ?? 'Active';
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $status,
                'statusColor' => $statusColors[$status] ?? 'bg-gray-100 text-gray-700',
            ];
        });

        return Inertia::render('AdminDashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalDoctors' => $totalDoctors,
                'totalNurses' => $totalNurses,
                'totalPatients' => $totalPatients,
            ],
            'doctors' => $doctors,
            'nurses' => $nurses,
            'schedules' => $schedules,
            'allUsers' => $allUsers, // Pass all users here
        ]);
    }

    /**
     * Update the role of a user.
     */
    public function updateUserRole(Request $request, User $user)
    {


        $request->validate([
            'role' => 'nullable|string|in:admin,doctor,nurse,user',
        ]);

        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'User role updated successfully']);
    }
}
