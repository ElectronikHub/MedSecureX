<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'name',
        'patient_code',
        'age',
        'gender',
        'appointment_start_time',
        'appointment_end_time',
        'reason',
        'status',
        'room',
        'admitted',
        'initials'
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
