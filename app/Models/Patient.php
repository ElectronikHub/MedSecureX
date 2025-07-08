<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    // Mass assignable attributes
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
        'doctor_id',
        'nurse_id',
    ];

    // Cast attributes to native types
    protected $casts = [
        'appointment_start_time' => 'datetime:H:i:s',
        'appointment_end_time' => 'datetime:H:i:s',
        'appointment_date' => 'date',
        'admission_timestamp' => 'datetime',
        'discharge_timestamp' => 'datetime',
        'admitted' => 'boolean',
    ];

    // Optional: Define relationships if needed
    /*
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function nurse()
    {
        return $this->belongsTo(User::class, 'nurse_id');
    }
    */
}
