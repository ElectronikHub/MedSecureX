<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @param  mixed ...$roles Allowed roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = Auth::user();

        // If no user is authenticated, redirect to login
        if (!$user) {
            return redirect()->route('login');
        }

        // Check if user's role is in the allowed roles
        if (!in_array($user->role, $roles)) {
            // Option 1: Abort with 403 Forbidden
            // abort(403, 'Unauthorized access.');

            // Option 2: Redirect to a custom unauthorized page or home with error message
            return redirect('/')->with('error', 'You do not have permission to access this page.');
        }

        return $next($request);
    }
}
