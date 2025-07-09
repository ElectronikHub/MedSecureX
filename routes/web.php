<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ManagementController as AdminManagement;
use App\Http\Controllers\Nurse\ManagementController as NurseManagement;
use App\Http\Controllers\Doctor\ManagementController as DoctorManagement;
use App\Models\Patient;
use Illuminate\Support\Facades\Mail;


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

// Email Verification Notice Page (shown to unverified users)
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail'); // Your React/Inertia verification page
})->middleware('auth')->name('verification.notice');

// Email Verification Handler (clicked from email link)
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/dashboard'); // Redirect after successful verification
})->middleware(['auth', 'signed'])->name('verification.verify');

// Resend Verification Email
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Default dashboard route for authenticated and verified users
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes for authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Role-based dashboards and management routes for authenticated and verified users
Route::middleware(['auth', 'verified'])->group(function () {

    // Admin routes
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminManagement::class, 'dashboard'])->name('dashboard');

        Route::put('/users/{user}/role', [AdminManagement::class, 'updateUserRole'])->name('users.updateRole');
        Route::post('/users', [AdminManagement::class, 'storeStaff'])->name('users.storeStaff');

        Route::put('/schedules/{schedule}', [AdminManagement::class, 'updateOrCreateSchedule'])->name('schedules.update');
        Route::post('/schedules', [AdminManagement::class, 'updateOrCreateSchedule'])->name('schedules.store');
    });

    // Nurse routes
    Route::prefix('nurse')->name('nurse.')->middleware('role:nurse')->group(function () {
        Route::get('/dashboard', [NurseManagement::class, 'dashboard'])->name('dashboard');

        Route::post('/patients', [NurseManagement::class, 'storePatient'])->name('patients.store');
        Route::put('/patients/{patient}', [NurseManagement::class, 'updatePatient'])->name('patients.update');
        Route::delete('/patients/{patient}', [NurseManagement::class, 'deletePatient'])->name('patients.delete');
    });

    // Doctor routes
    Route::prefix('doctor')->name('doctor.')->middleware('role:doctor')->group(function () {
        Route::get('/dashboard', [DoctorManagement::class, 'dashboard'])->name('dashboard');
        // Add doctor-specific routes here as needed
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

// Legacy API route for patient info by ID (public)
Route::get('/api/patients/{id}', function ($id) {
    $patient = Patient::find($id);
    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }
    return response()->json($patient);
});

// Test email route (optional, protect with auth in production)
Route::get('/test-mail', function () {
    Mail::raw('This is a test email from Laravel using Mailtrap sandbox SMTP!', function ($message) {
        $message->to('vincezamora27@gmail.com')
            ->subject('Test Email from Laravel');
    });

    return 'Test email sent! Check your Mailtrap inbox.';
})->middleware('auth');


// OTP verification form
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/otp-verify', function () {
        return Inertia::render('Auth/OtpVerify'); // Your OTP input page (React/Inertia)
    })->name('otp.verify');

    Route::post('/otp-verify', function (Request $request) {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);

        $user = $request->user();

        // Retrieve OTP record from DB or cache (implement your own logic)
        $otpRecord = \App\Models\OtpCode::where('user_id', $user->id)
            ->where('otp', $request->otp)
            ->where('expires_at', '>', now())
            ->first();

        if (!$otpRecord) {
            return back()->withErrors(['otp' => 'Invalid or expired OTP']);
        }

        // Mark OTP as verified in session
        Session::put('otp_verified', true);

        // Delete OTP record or mark as used
        $otpRecord->delete();

        return redirect()->intended('/dashboard');
    })->name('otp.verify.post');
});

// Auth routes (login, registration, password reset, email verification, etc.)
require __DIR__ . '/auth.php';
