<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtpCode extends Model
{
    protected $fillable = ['user_id', 'otp', 'expires_at'];

    public $timestamps = true;

    protected $dates = ['expires_at'];
}

