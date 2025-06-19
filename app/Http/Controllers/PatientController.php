<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    /**
     * Assign a doctor to a patient.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $patientId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function assignDoctor(Request $request, $patientId)
    {
        // Validate the incoming request data
        $request->validate([
            'doctor_id' => 'required|exists:users,id', // Ensure doctor_id exists in users table
        ]);

        // Find the patient by ID or fail with 404
        $patient = Patient::findOrFail($patientId);

        // Assign the doctor_id to the patient
        $patient->doctor_id = $request->input('doctor_id');

        // Save the patient record
        $patient->save();

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Doctor assigned to patient successfully.');
    }
}

//
// Note: Ensure that the Patient model has a 'doctor_id' field in the database schema.
// This code assumes that the Patient model and the users table are set up correctly in your Laravel application.
// You may need to adjust the validation rules or the redirect logic based on your application's requirements.
