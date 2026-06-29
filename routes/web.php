<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PageContentController;
use App\Http\Controllers\AccoladeSubmissionController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\HeroImageController;
use App\Models\PageContent;
use App\Models\AccoladeSubmission;

Route::get('/', function () {
    $contents = PageContent::where('page', 'home')
        ->get()
        ->mapWithKeys(fn($item) => [$item->section . '_' . $item->key => $item->value]);

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'contents' => $contents,
    ]);
})->name('home');

Route::post('/consultations', [ConsultationController::class, 'store'])->name('consultations.store');
Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
Route::get('/api/hero-images', [HeroImageController::class, 'getPublic']);

Route::get('/dashboard', [ConsultationController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::patch('/consultations/{consultation}', [ConsultationController::class, 'update'])
    ->middleware(['auth'])
    ->name('consultations.update');

// Public static page routes
Route::get('/about', function () {
    $contents = PageContent::where('page', 'about')
        ->get()
        ->mapWithKeys(fn($item) => [$item->section . '_' . $item->key => $item->value]);

    return Inertia::render('About', [
        'contents' => $contents,
    ]);
})->name('about');

Route::get('/expertise', function () {
    return Inertia::render('Expertise');
})->name('expertise');

Route::get('/clients', function () {
    $contents = PageContent::where('page', 'clients')
        ->get()
        ->mapWithKeys(fn($item) => [$item->section . '_' . $item->key => $item->value]);

    return Inertia::render('Clients', [
        'contents' => $contents,
    ]);
})->name('clients');

Route::get('/accolades', function () {
    $contents = PageContent::where('page', 'accolades')
        ->get()
        ->mapWithKeys(fn($item) => [$item->section . '_' . $item->key => $item->value]);

    $approvedTestimonials = AccoladeSubmission::where('status', 'approved')
        ->orderBy('approved_at', 'desc')
        ->get();

    return Inertia::render('Accolades', [
        'contents' => $contents,
        'approvedTestimonials' => $approvedTestimonials,
    ]);
})->name('accolades');

Route::post('/accolades/submissions', [AccoladeSubmissionController::class, 'store'])->name('accolades.submissions.store');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Public blog routes
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');

// Admin blog & page editor routes
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/blogs', [BlogController::class, 'adminIndex'])->name('admin.blogs.index');
    Route::post('/admin/blogs', [BlogController::class, 'store'])->name('admin.blogs.store');
    Route::put('/admin/blogs/{blog}', [BlogController::class, 'update'])->name('admin.blogs.update');
    Route::delete('/admin/blogs/{blog}', [BlogController::class, 'destroy'])->name('admin.blogs.destroy');

    Route::get('/admin/pages', [PageContentController::class, 'adminIndex'])->name('admin.pages.index');
    Route::post('/admin/pages/update', [PageContentController::class, 'update'])->name('admin.pages.update');
    Route::patch('/admin/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('admin.testimonials.update');
    Route::get('/admin/hero-images', [HeroImageController::class, 'index'])->name('admin.hero-images.index');
    Route::post('/admin/hero-images', [HeroImageController::class, 'store'])->name('admin.hero-images.store');
    Route::patch('/admin/hero-images/{image}', [HeroImageController::class, 'update'])->name('admin.hero-images.update');
    Route::delete('/admin/hero-images/{image}', [HeroImageController::class, 'destroy'])->name('admin.hero-images.destroy');
    Route::get('/admin/accolades/submissions', [AccoladeSubmissionController::class, 'index'])->name('admin.accolades.submissions.index');
    Route::patch('/admin/accolades/submissions/{submission}', [AccoladeSubmissionController::class, 'update'])->name('admin.accolades.submissions.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
