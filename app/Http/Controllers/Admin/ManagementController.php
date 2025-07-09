<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Schedule;
use App\Models\UserLoginLog;

class ManagementController extends Controller
{
    public function dashboard()
    {
        // Aggregate counts
        $totalUsers = User::count();
        $totalDoctors = User::where('role', 'doctor')->count();
        $totalNurses = User::where('role', 'nurse')->count();

        // Status colors mapping
        $statusColors = [
            'Active' => 'bg-green-100 text-green-700',
            'On Break' => 'bg-yellow-100 text-yellow-700',
            'Off Duty' => 'bg-gray-100 text-gray-700',
        ];

        // Fetch doctors with mapped data
        $doctors = User::where('role', 'doctor')
            ->get()
            ->map(fn($doctor) => $this->mapUserWithStatus($doctor, $statusColors))
            ->values();

        // Fetch nurses with mapped data
        $nurses = User::where('role', 'nurse')
            ->get()
            ->map(fn($nurse) => $this->mapUserWithStatus($nurse, $statusColors))
            ->values();

        // Fetch schedules with eager-loaded user info
        $schedules = Schedule::with('user')->get()->map(function ($schedule) {
            return [
                'id' => $schedule->id,
                'user_id' => $schedule->user_id,
                'user_name' => $schedule->user->name ?? '',
                'role' => $schedule->user->role ?? '',
                'department' => $schedule->user->department ?? '',
                'shift_date' => $schedule->shift_date,
                'start_time' => $schedule->start_time,
                'end_time' => $schedule->end_time,
            ];
        });

        // Fetch all users with status colors
        $allUsers = User::all()->map(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status ?? 'Active',
            'statusColor' => $statusColors[$user->status ?? 'Active'] ?? 'bg-gray-100 text-gray-700',
        ]);

        // Fetch recent login logs with user, filter and map as per requirements
        $loginLogs = UserLoginLog::with('user')
            ->latest('logged_in_at')
            ->limit(50)
            ->get()
            ->filter(function ($log) {
                // Exclude logs where user is admin AND duty_status is 'On Duty'
                return !($log->user && $log->user->role === 'admin' && $log->duty_status === 'On Duty');
            })
            ->map(function ($log) {
                $user = $log->user;

                // For admins, set duty_status to 'N/A' and remark to null
                $dutyStatus = ($user && $user->role === 'admin') ? 'N/A' : ($log->duty_status ?? 'N/A');
                $remark = ($user && $user->role === 'admin') ? null : $log->remark;

                return [
                    'id' => $log->id,
                    'user' => ['name' => $user->name ?? 'Unknown', 'role' => $user->role ?? ''],
                    'ip_address' => $log->ip_address,
                    // 'user_agent' => $log->user_agent, // excluded from frontend
                    'logged_in_at' => $log->logged_in_at->toDateTimeString(),
                    'duty_status' => $dutyStatus,
                    'remark' => $remark,
                ];
            });



        return Inertia::render('AdminDashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalDoctors' => $totalDoctors,
                'totalNurses' => $totalNurses,
            ],
            'doctors' => $doctors,
            'nurses' => $nurses,
            'schedules' => $schedules,
            'allUsers' => $allUsers,
            'loginLogs' => $loginLogs,
        ]);
    }

    /**
     * Helper method to map user data with initials and status colors.
     */
    private function mapUserWithStatus(User $user, array $statusColors): array
    {
        $initials = collect(explode(' ', $user->name))
            ->map(fn($n) => strtoupper(substr($n, 0, 1)))
            ->join('');

        $status = $user->status ?? 'Active';

        return [
            'id' => $user->id,
            'initials' => $initials,
            'name' => $user->name,
            'dept' => $user->department ?? 'Unknown',
            'status' => $status,
            'ward' => $user->ward ?? 'Not Assigned',
            'shift' => $user->shift ?? 'Not Assigned',
            'statusColor' => $statusColors[$status] ?? 'bg-gray-100 text-gray-700',
        ];
    }

    /**
     * Update user role and status.
     */
    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'nullable|string|in:admin,doctor,nurse,user',
            'status' => 'nullable|string|in:Active,Retired',
        ]);

        $user->update([
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'User updated successfully']);
    }

    /**
     * Store new staff user.
     */
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

        return response()->json([
            'message' => 'Staff created successfully.',
            'user' => $user,
        ], 201);
    }

    /**
     * Create or update schedule.
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
            $message = 'Schedule updated successfully.';
        } else {
            $schedule = Schedule::create($validated);
            $message = 'Schedule created successfully.';
        }

        return response()->json([
            'message' => $message,
            'schedule' => $schedule,
        ]);
    }
}
