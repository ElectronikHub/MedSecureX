<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',  // add this
    ];


    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Only for Laravel 10+; remove if using older Laravel
    ];

    /**
     * Get the schedules for the user.
     */
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    /**
     * If this user is a doctor, get patients assigned to them.
     * (Assumes patients table has a doctor_id column)
     */
    public function patients()
    {
        return $this->hasMany(Patient::class, 'doctor_id');
    }
}


// Note: Ensure that the User model is linked to the Doctor model via a one-to-one relationship if needed.
// This code assumes that the User model exists and has a one-to-many relationship with the Patient
// and Schedule models. Adjust the relationships based on your application's requirements.
