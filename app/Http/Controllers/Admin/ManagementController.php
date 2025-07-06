<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Patient;
use App\Models\Schedule;

class ManagementController extends Controller
{
    public function dashboard()
    {
        $totalUsers = User::count();
        $totalDoctors = User::where('role', 'doctor')->count();
        $totalNurses = User::where('role', 'nurse')->count();
        $totalPatients = Patient::count();

        $statusColors = [
            'Active' => 'bg-green-100 text-green-700',
            'On Break' => 'bg-yellow-100 text-yellow-700',
            'Off Duty' => 'bg-gray-100 text-gray-700',
        ];

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
            'allUsers' => $allUsers,
        ]);
    }

    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'nullable|string|in:admin,doctor,nurse,user',
        ]);

        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'User role updated successfully']);
    }

    public function storeStaff(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', Rule::in(['admin', 'doctor', 'nurse', 'user'])],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('admin.dashboard')->with('success', 'Staff created successfully.');
    }

    /**
     * Update existing schedule or create a new one.
     * If $id is provided, update the schedule; else create new.
     */
    public function updateOrCreateSchedule(Request $request, $id = null)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'shift_date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
        ]);

        if ($id) {
            $schedule = Schedule::findOrFail($id);
            $schedule->update($validated);
        } else {
            $schedule = Schedule::create($validated);
        }

        return response()->json([
            'message' => $id ? 'Schedule updated successfully.' : 'Schedule created successfully.',
            'schedule' => $schedule,
        ]);
    }
}
