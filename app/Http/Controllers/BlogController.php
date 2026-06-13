<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Blog;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the blogs on the public page.
     */
    public function index()
    {
        $blogs = Blog::orderBy('created_at', 'desc')->get();
        return Inertia::render('Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Display the specified blog on the public page.
     */
    public function show(string $slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        return Inertia::render('Blogs/Show', [
            'blog' => $blog,
        ]);
    }

    /**
     * Display a listing of blogs for admin management.
     */
    public function adminIndex()
    {
        if (!auth()->user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }

        $blogs = Blog::orderBy('created_at', 'desc')->get();
        return Inertia::render('Blogs/AdminBlogs', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Store a newly created blog post in storage.
     */
    public function store(Request $request)
    {
        if (!auth()->user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|url|max:2048',
            'video_url' => 'nullable|url|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        // Check if slug is unique, if not, append a unique ID
        $originalSlug = $validated['slug'];
        $count = 1;
        while (Blog::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $count;
            $count++;
        }

        Blog::create($validated);

        return redirect()->back()->with('success', 'Blog post created successfully.');
    }

    /**
     * Update the specified blog post in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        if (!auth()->user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|url|max:2048',
            'video_url' => 'nullable|url|max:2048',
        ]);

        // If title changed, update slug
        if ($blog->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
            $originalSlug = $validated['slug'];
            $count = 1;
            while (Blog::where('slug', $validated['slug'])->where('id', '!=', $blog->id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $count;
                $count++;
            }
        }

        $blog->update($validated);

        return redirect()->back()->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified blog post from storage.
     */
    public function destroy(Blog $blog)
    {
        if (!auth()->user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }

        $blog->delete();

        return redirect()->back()->with('success', 'Blog post deleted successfully.');
    }
}
