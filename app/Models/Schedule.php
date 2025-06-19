<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    // The attributes that are mass assignable
    protected $fillable = [
        'user_id',
        'shift_date',
        'start_time',
        'end_time',
        'role',
    ];

    /**
     * Get the user that owns the schedule.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


// Note: Ensure that the Schedule model is linked to the User model via user_id.
