<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail; // Add this import
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail // Implement interface here
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
        'password' => 'hashed', // Laravel 10+ feature; remove if using older version
    ];

    /**
     * Get the schedules for the user.
     */
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    /**
     * Get the patients assigned to this user if they are a doctor.
     * Assumes patients table has a doctor_id foreign key.
     */
    public function patients()
    {
        return $this->hasMany(Patient::class, 'doctor_id');
    }
}
