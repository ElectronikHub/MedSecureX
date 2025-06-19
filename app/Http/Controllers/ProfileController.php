<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

//// Note: Ensure that the ProfileUpdateRequest is properly defined to validate the profile update data.
// // This controller handles the user's profile management, including viewing, updating, and deleting the profile.
// // It uses Inertia.js to render the profile edit page and handles form submissions for updating the profile and deleting the account.
// // The `edit` method displays the profile form, the `update` method processes the profile update, and the `destroy` method handles account deletion.
// // The controller also checks if the user needs to verify their email and handles session management during account deletion.
// // Make sure to include the necessary routes in your web.php file to access these methods.
// // Example routes:
// Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
// Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
// Route::post('/profile/destroy', [ProfileController::class, 'destroy'])->name('profile.destroy'); 
