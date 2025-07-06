<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class ManagementController extends Controller
{
    /**
     * Display a listing of all patients assigned to the logged-in doctor.
     */
    public function index()
    {
        $doctorId = Auth::id();

        $patients = Patient::where('doctor_id', $doctorId)
            ->get()
            ->map(function ($patient) {
                return [
                    'id' => $patient->id,
                    'name' => $patient->name,
                    'appointment_date' => $patient->appointment_date
                        ? Carbon::parse($patient->appointment_date)->format('M d, Y')
                        : null,
                    'reason' => $patient->reason,
                    'status' => $patient->status,
                ];
            });

        return Inertia::render('Doctor/PatientsIndex', [
            'patients' => $patients,
        ]);
    }

    /**
     * Show the form for creating a new patient.
     */
    public function create()
    {
        return Inertia::render('Doctor/PatientCreate');
    }

    /**
     * Store a newly created patient in storage.
     */
    public function store(Request $request)
    {
        $doctorId = Auth::id();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'appointment_date' => 'required|date',
            'reason' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $validated['doctor_id'] = $doctorId;

        Patient::create($validated);

        return redirect()->route('doctor.patients.index')->with('success', 'Patient created successfully.');
    }

    /**
     * Show the form for editing the specified patient.
     */
    public function edit(Patient $patient)
    {
        $this->authorizePatient($patient);

        return Inertia::render('Doctor/PatientEdit', [
            'patient' => $patient,
        ]);
    }

    /**
     * Update the specified patient in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $this->authorizePatient($patient);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'appointment_date' => 'required|date',
            'reason' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $patient->update($validated);

        return redirect()->route('doctor.patients.index')->with('success', 'Patient updated successfully.');
    }

    /**
     * Remove the specified patient from storage.
     */
    public function destroy(Patient $patient)
    {
        $this->authorizePatient($patient);

        $patient->delete();

        return redirect()->route('doctor.patients.index')->with('success', 'Patient deleted successfully.');
    }

    /**
     * Ensure the patient belongs to the logged-in doctor.
     */
    protected function authorizePatient(Patient $patient)
    {
        if ($patient->doctor_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
    }
}
