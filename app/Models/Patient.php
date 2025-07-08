<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    // app/Models/Patient.php

    protected $fillable = [
        'initials',
        'name',
        'patient_code',
        'age',
        'gender',
        'disease_categories',
        'appointment_start_time',
        'appointment_end_time',
        'appointment_date',
        'reason',
        'status',
        'room',
        'admitted',
        'admission_timestamp',
        'discharge_timestamp',
        'doctor_id',      // <-- Add this
        'nurse_id',       // <-- And this
    ];

    protected $dates = [
        'appointment_start_time',
        'appointment_end_time',
        'appointment_date',
        'admission_timestamp',
        'discharge_timestamp',
        'created_at',
        'updated_at',
    ];

}

// Note: Ensure that the Patient model is linked to the User model via doctor_id if needed.
