<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    /**
     * Show list of all admin users
     */
    public function index(Request $request)
    {
        $request->user()->authorizeResource(User::class, 'user');

        $admins = User::where('role', '!=', 'user')
            ->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'admins' => $admins,
        ]);
    }

    /**
     * Show form to create new admin
     */
    public function create(Request $request)
    {
        $request->user()->authorizeResource(User::class, 'user');

        $users = User::where('role', 'user')->get();

        return Inertia::render('Admin/Users/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store newly created admin
     */
    public function store(Request $request)
    {
        $request->user()->authorizeResource(User::class, 'user');

        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id', Rule::unique('users', 'id')->where('role', '!=', 'user')],
            'role' => ['required', Rule::in(['admin', 'super_admin'])],
        ]);

        $user = User::findOrFail($validated['user_id']);
        $user->update(['role' => $validated['role']]);

        return redirect()->route('admin.users.index')
            ->with('success', "User promoted to {$validated['role']}");
    }

    /**
     * Show form to edit admin role
     */
    public function edit(Request $request, User $user)
    {
        $request->user()->authorizeResource(User::class, 'user');

        if ($user->role === 'user') {
            abort(404);
        }

        return Inertia::render('Admin/Users/Edit', [
            'admin' => $user,
        ]);
    }

    /**
     * Update admin role
     */
    public function update(Request $request, User $user)
    {
        $request->user()->authorizeResource(User::class, 'user');

        if ($user->role === 'user') {
            abort(404);
        }

        $validated = $request->validate([
            'role' => ['required', Rule::in(['admin', 'super_admin'])],
        ]);

        $user->update($validated);

        return redirect()->route('admin.users.index')
            ->with('success', 'Admin role updated successfully');
    }

    /**
     * Remove admin privileges (demote to user)
     */
    public function destroy(Request $request, User $user)
    {
        $request->user()->authorizeResource(User::class, 'user');

        if ($user->role === 'user') {
            abort(404);
        }

        // Prevent super admin from removing their own super admin privileges
        if ($user->id === $request->user()->id && $user->isSuperAdmin()) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Cannot remove your own super admin role');
        }

        $user->update(['role' => 'user']);

        return redirect()->route('admin.users.index')
            ->with('success', 'Admin privileges removed');
    }
}
