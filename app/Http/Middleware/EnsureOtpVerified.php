<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureOtpVerified
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->hasVerifiedEmail()) {
            if (!$request->session()->get('otp_verified', false)) {
                return redirect()->route('otp.verify');
            }
        }

        return $next($request);
    }
}
