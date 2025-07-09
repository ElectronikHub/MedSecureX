<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    protected int $maxAttempts = 5;

    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => route('password.request') !== null,
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $email = Str::lower($request->input('email'));
        $ip = $request->ip();
        $throttleKey = $email . '|' . $ip;

        // Check if user is locked out
        $lockoutCount = Cache::get($throttleKey . ':lockout_count', 0);
        $lockoutExpiresAt = Cache::get($throttleKey . ':lockout_expires_at');

        if ($lockoutExpiresAt && now()->lessThan($lockoutExpiresAt)) {
            $secondsLeft = now()->diffInSeconds($lockoutExpiresAt);
            throw ValidationException::withMessages([
                'email' => ["Too many login attempts. Please try again in {$secondsLeft} seconds."],
            ]);
        } elseif ($lockoutExpiresAt && now()->greaterThanOrEqualTo($lockoutExpiresAt)) {
            // Lockout expired, reset counters
            Cache::forget($throttleKey . ':lockout_expires_at');
            Cache::forget($throttleKey . ':lockout_count');
            RateLimiter::clear($throttleKey);
            $lockoutCount = 0;
        }

        if (RateLimiter::tooManyAttempts($throttleKey, $this->maxAttempts)) {
            // Increment lockout count
            $lockoutCount++;
            Cache::put($throttleKey . ':lockout_count', $lockoutCount, now()->addDay());

            // Determine lockout duration based on lockout count
            switch ($lockoutCount) {
                case 1:
                    $lockoutDuration = now()->addMinutes(5);
                    break;
                case 2:
                    $lockoutDuration = now()->addMinutes(20);
                    break;
                default:
                    $lockoutDuration = now()->addDay();
                    break;
            }

            Cache::put($throttleKey . ':lockout_expires_at', $lockoutDuration, $lockoutDuration);
            RateLimiter::clear($throttleKey);

            $secondsLeft = now()->diffInSeconds($lockoutDuration);

            throw ValidationException::withMessages([
                'email' => ["Too many login attempts. You are locked out for {$secondsLeft} seconds."],
            ]);
        }

        // Attempt login
        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            RateLimiter::hit($throttleKey, 60); // Count attempt, expire in 60 seconds
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Successful login: clear attempts and lockout info
        RateLimiter::clear($throttleKey);
        Cache::forget($throttleKey . ':lockout_count');
        Cache::forget($throttleKey . ':lockout_expires_at');

        $request->session()->regenerate();

        // Redirect based on role
        $user = Auth::user();

        return match ($user->role) {
            'admin' => redirect()->intended('/admin/dashboard'),
            'doctor' => redirect()->intended('/doctor/dashboard'),
            'nurse' => redirect()->intended('/nurse/dashboard'),
            default => redirect()->intended('/dashboard'),
        };
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
