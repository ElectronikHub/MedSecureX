<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'user_id',
        // Add other doctor-specific fields here, e.g. 'specialization', 'bio', etc.
    ];

    /**
     * Get the user record associated with the doctor.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the patients assigned to this doctor.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function patients()
    {
        return $this->hasMany(Patient::class, 'doctor_id');
    }
}

// Note: Ensure that the Doctor model is linked to the User model via user_id.
// This code assumes that the User model exists and has a one-to-one relationship with the Doctor
