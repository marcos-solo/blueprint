<?php

namespace App\Http\Controllers;

use App\Models\HeroImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroImageController extends Controller
{
    public function index()
    {
        $images = HeroImage::orderBy('order')->get();

        return Inertia::render('Admin/HeroImageGallery', [
            'images' => $images,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'alt_text' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero', 'public');

            $maxOrder = HeroImage::max('order') ?? 0;

            HeroImage::create([
                'image_path' => $path,
                'alt_text' => $validated['alt_text'] ?? 'Hero Image',
                'order' => $maxOrder + 1,
                'is_active' => true,
            ]);
        }

        return redirect()->back()->with('success', 'Hero image added successfully.');
    }

    public function update(Request $request, HeroImage $image)
    {
        $validated = $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $image->update($validated);

        return redirect()->back()->with('success', 'Hero image updated successfully.');
    }

    public function destroy(Request $request, HeroImage $image)
    {
        $imagePath = $image->image_path;
        $image->delete();

        if (Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        return redirect()->back()->with('success', 'Hero image removed successfully.');
    }

    public function getPublic()
    {
        $images = HeroImage::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json($images);
    }
}
