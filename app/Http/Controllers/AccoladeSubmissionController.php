<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccoladeSubmission;
use Inertia\Inertia;

class AccoladeSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'message' => 'required|string|max:2000',
        ]);

        AccoladeSubmission::create($validated);

        return redirect()->back()->with('success', 'Thank you. Your testimonial has been received and will be reviewed for publication.');
    }

    public function index()
    {
        $submissions = AccoladeSubmission::orderByRaw("FIELD(status, 'pending', 'approved', 'rejected')")
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/AccoladeSubmissions', [
            'submissions' => $submissions,
        ]);
    }

    public function update(Request $request, AccoladeSubmission $submission)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        if ($validated['status'] === 'approved') {
            $submission->approved_at = now();
        } else {
            $submission->approved_at = null;
        }

        $submission->status = $validated['status'];
        $submission->save();

        return redirect()->back()->with('success', 'Accolade submission status updated successfully.');
    }
}
