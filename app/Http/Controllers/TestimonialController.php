<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TestimonialController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'quote' => 'required|string|max:2000',
        ]);

        $validated['status'] = 'pending';

        if (auth()->check()) {
            $validated['user_id'] = auth()->id();
        }

        Testimonial::create($validated);

        return redirect()->back()->with('success', 'Thank you for sharing your experience. Your testimonial is now awaiting review.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        if (!auth()->check() || !auth()->user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'status' => 'required|string|in:pending,published,rejected',
            'notes' => 'nullable|string|max:2000',
        ]);

        $testimonial->update($validated);

        return redirect()->back()->with('success', 'Testimonial status updated successfully.');
    }
}
