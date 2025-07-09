<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\UserLoginLog;
use App\Models\Schedule;
use App\Models\OtpCode; // Your OTP model
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class LogSuccessfulLogin
{
    public function handle(Login $event)
    {
        $user = $event->user;
        $now = Carbon::now();

        // Log user login as before
        $dutyStatus = 'Out of Duty';
        $remark = null;

        if (in_array($user->role, ['doctor', 'nurse'])) {
            $shift = Schedule::where('user_id', $user->id)
                ->where('shift_date', $now->toDateString())
                ->where('start_time', '<=', $now->toTimeString())
                ->where('end_time', '>=', $now->toTimeString())
                ->first();

            if ($shift) {
                $dutyStatus = 'On Duty';
            } else {
                $roleCapitalized = ucfirst($user->role);
                $timeFormatted = $now->format('g:ia');

                $userNameSanitized = str_replace(' ', '_', $user->name);

                $remark = "{$roleCapitalized} {$userNameSanitized} attempted access outside assigned duty hours at {$timeFormatted}.";
            }
        }

        UserLoginLog::create([
            'user_id' => $user->id,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'logged_in_at' => $now,
            'duty_status' => $dutyStatus,
            'remark' => $remark,
        ]);

        // === OTP generation and sending ===

        // Only for verified users
        if ($user->hasVerifiedEmail()) {
            // Generate 6-digit OTP
            $otp = rand(100000, 999999);

            // Store or update OTP in your otp_codes table
            OtpCode::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'otp' => $otp,
                    'expires_at' => $now->addMinutes(10),
                ]
            );

            // Send OTP email
            Mail::raw("Your OTP code is: $otp", function ($message) use ($user) {
                $message->to($user->email)
                    ->subject('Your Login OTP Code');
            });
        }
    }
}
