<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\UserLoginLog;
use App\Models\Schedule;
use Carbon\Carbon;

class LogSuccessfulLogin
{
    public function handle(Login $event)
    {
        $user = $event->user;
        $now = Carbon::now();

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

                // Use the user's name instead of ID
                $userNameSanitized = str_replace(' ', ' ', $user->name); // Replace spaces with underscores for readability

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
    }
}
