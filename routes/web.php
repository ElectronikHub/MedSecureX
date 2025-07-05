<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ManagementController as AdminManagement;
use App\Http\Controllers\Nurse\ManagementController as NurseManagement;
use App\Http\Controllers\Doctor\ManagementController as DoctorManagement;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Default dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Role-based dashboards & user management
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [AdminManagement::class, 'dashboard'])->name('admin.dashboard');

    Route::put('/admin/users/{user}/role', [AdminManagement::class, 'updateUserRole'])->name('admin.users.updateRole');
    Route::post('/admin/users', [AdminManagement::class, 'storeStaff'])->name('admin.users.storeStaff');

    Route::get('/nurse/dashboard', [NurseManagement::class, 'dashboard'])->name('nurse.dashboard');
    Route::get('/doctor/dashboard', [DoctorManagement::class, 'dashboard'])->name('doctor.dashboard');
});

// API route for patient info
Route::get('/api/patients/{id}', function ($id) {
    $patient = App\Models\Patient::find($id);
    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }
    return response()->json($patient);
});

require __DIR__ . '/auth.php';
