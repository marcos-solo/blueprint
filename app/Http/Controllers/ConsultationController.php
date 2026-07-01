<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Consultation;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    /**
     * Store a newly created consultation request in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'practice_area' => 'required|string|max:100',
            'message' => 'required|string|max:2000',
            'scheduled_at' => 'required|date|after:now',
        ]);

        // Associate user_id if the user is currently authenticated
        if (auth()->check()) {
            $validated['user_id'] = auth()->id();
        }

        Consultation::create($validated);

        return redirect()->back()->with('success', 'Your consultation request has been successfully submitted! We will contact you shortly.');
    }

    /**
     * Display the authenticated user's dashboard with their consultations.
     */
    public function dashboard()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            // Admin loads consultations with pagination
            $consultations = Consultation::orderBy('scheduled_at', 'desc')->paginate(10);
        } else {
            // Proactively link any existing guest consultations with this user's email
            Consultation::where('email', $user->email)
                ->whereNull('user_id')
                ->update(['user_id' => $user->id]);

            // Fetch user's consultations (paginated)
            $consultations = Consultation::where('user_id', $user->id)
                ->orderBy('scheduled_at', 'desc')
                ->paginate(10);
        }

        return Inertia::render('Dashboard', [
            'consultations' => $consultations,
            'isAdmin' => (bool)$user->isAdmin(),
        ]);
    }

    /**
     * Update the consultation status and notes.
     */
    public function update(Request $request, Consultation $consultation)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,confirmed,cancelled,completed',
            'notes' => 'nullable|string|max:5000',
        ]);

        $consultation->update($validated);

        return redirect()->back()->with('success', 'Briefing status updated successfully.');
    }
}
