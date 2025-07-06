<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ManagementController as AdminManagement;
use App\Http\Controllers\Nurse\ManagementController as NurseManagement;
use App\Http\Controllers\Doctor\ManagementController as DoctorManagement;
use App\Models\Patient;

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

// Profile routes (authenticated users)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Role-based dashboards & user management routes (authenticated users)
Route::middleware(['auth'])->group(function () {

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminManagement::class, 'dashboard'])->name('dashboard');

        // User role management
        Route::put('/users/{user}/role', [AdminManagement::class, 'updateUserRole'])->name('users.updateRole');
        Route::post('/users', [AdminManagement::class, 'storeStaff'])->name('users.storeStaff');

        // Schedule management
        Route::put('/schedules/{schedule}', [AdminManagement::class, 'updateOrCreateSchedule'])->name('schedules.update');
        Route::post('/schedules', [AdminManagement::class, 'updateOrCreateSchedule'])->name('schedules.store');
    });

    // Nurse routes
    Route::prefix('nurse')->name('nurse.')->group(function () {
        Route::get('/dashboard', [NurseManagement::class, 'dashboard'])->name('dashboard');

        Route::post('/patients', [NurseManagement::class, 'storePatient'])->name('patients.store');
        Route::put('/patients/{patient}', [NurseManagement::class, 'updatePatient'])->name('patients.update');
        Route::delete('/patients/{patient}', [NurseManagement::class, 'deletePatient'])->name('patients.delete');
    });

    // Doctor routes
    Route::prefix('doctor')->name('doctor.')->group(function () {
        Route::get('/dashboard', [DoctorManagement::class, 'dashboard'])->name('dashboard');

        // Route to show all patients assigned to the logged-in doctor
        Route::get('/all-patients', [DoctorManagement::class, 'allPatients'])->name('patients.all');
    });

    // API route for patient info by patient_code (query param)
    Route::get('/api/patients', function (Request $request) {
        $patientCode = $request->query('patient_code');

        if (!$patientCode) {
            return response()->json(['message' => 'Patient code is required'], 400);
        }

        $patient = Patient::where('patient_code', $patientCode)->first();

        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        return response()->json($patient);
    })->name('api.patients.byCode');
});

// Legacy API route for patient info by ID
Route::get('/api/patients/{id}', function ($id) {
    $patient = Patient::find($id);
    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }
    return response()->json($patient);
});



require __DIR__ . '/auth.php';
