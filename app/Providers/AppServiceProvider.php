<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Event;
use App\Models\UserLoginLog;

class AppServiceProvider extends ServiceProvider
{
    protected static $loginListenerRegistered = false;

    public function boot(): void
    {
        // if (!self::$loginListenerRegistered) {
        //     Event::listen(Login::class, function ($event) {
        //         $user = $event->user;

        //         UserLoginLog::create([
        //             'user_id' => $user->id,
        //             'ip_address' => request()->ip(),
        //             'user_agent' => request()->userAgent(),
        //             'logged_in_at' => now(),
        //         ]);
        //     });

        //     self::$loginListenerRegistered = true;
        // }
    }
}
