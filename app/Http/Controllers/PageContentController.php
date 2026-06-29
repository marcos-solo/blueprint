<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PageContent;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class PageContentController extends Controller
{
    /**
     * Display the CMS page editor inside the Admin section.
     */
    public function adminIndex()
    {
        $contents = PageContent::orderBy('page')->orderBy('section')->get();

        return Inertia::render('Admin/PageEditor', [
            'contents' => $contents
        ]);
    }

    /**
     * Update an individual page content item.
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:page_contents,id',
            'value' => 'nullable'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        $content = PageContent::findOrFail($request->input('id'));

        if ($content->type === 'image' && $request->hasFile('value')) {
            $request->validate([
                'value' => 'image|max:5120' // Max 5MB
            ]);

            $file = $request->file('value');
            $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $file->getClientOriginalName());
            
            // Move file to public/images folder
            $file->move(public_path('images'), $filename);
            
            // Save the URL path
            $content->value = '/images/' . $filename;
        } else {
            $content->value = $request->input('value');
        }

        $content->save();

        return redirect()->back()->with('success', 'Page content updated successfully.');
    }
}
