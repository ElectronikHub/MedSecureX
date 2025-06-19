<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
            'Active'   => 'bg-green-100 text-green-700',
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
                    'id'          => $doctor->id,
                    'initials'    => $initials,
                    'name'        => $doctor->name,
                    'dept'        => $doctor->department ?? 'Unknown',
                    'status'      => $status,
                    'ward'        => $doctor->ward ?? 'Not Assigned',
                    'shift'       => $doctor->shift ?? 'Not Assigned',
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
                    'id'          => $nurse->id,
                    'initials'    => $initials,
                    'name'        => $nurse->name,
                    'dept'        => $nurse->department ?? 'Unknown',
                    'status'      => $status,
                    'ward'        => $nurse->ward ?? 'Not Assigned',
                    'shift'       => $nurse->shift ?? 'Not Assigned',
                    'statusColor' => $statusColors[$status] ?? 'bg-gray-100 text-gray-700',
                ];
            })->values();

        // Schedules
        $schedules = Schedule::with('user')->get()->map(function($s) {
            return [
                'id'         => $s->id,
                'user_id'    => $s->user_id,
                'user_name'  => $s->user->name ?? '',
                'role'       => $s->user->role ?? '',
                'department' => $s->user->department ?? '',
                'shift_date' => $s->shift_date,
                'start_time' => $s->start_time,
                'end_time'   => $s->end_time,
            ];
        });

        return Inertia::render('AdminDashboard', [
            'stats'     => [
                'totalUsers'    => $totalUsers,
                'totalDoctors'  => $totalDoctors,
                'totalNurses'   => $totalNurses,
                'totalPatients' => $totalPatients,
            ],
            'doctors'   => $doctors,
            'nurses'    => $nurses,
            'schedules' => $schedules,
        ]);
    }
}

// This code is part of a Laravel application and is used to manage the admin dashboard.
// It retrieves statistics about users, doctors, nurses, and patients, and formats the data for display in an Inertia.js view.
// The code also includes logic to format the status of doctors and nurses, and to retrieve their schedules.
// The `ManagementController` class extends the base `Controller`
// and provides a method `dashboard` that returns an Inertia view with the necessary data.
// The data includes counts of total users, doctors, nurses, and patients, as well as formatted lists of doctors and nurses with their statuses and schedules.
// The use of Inertia allows for a seamless single-page application experience in the Laravel application, integrating server-side data with client-side rendering.
