<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\BlogController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/consultations', [ConsultationController::class, 'store'])->name('consultations.store');

Route::get('/dashboard', [ConsultationController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::patch('/consultations/{consultation}', [ConsultationController::class, 'update'])
    ->middleware(['auth'])
    ->name('consultations.update');

// Public static page routes
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/expertise', function () {
    return Inertia::render('Expertise');
})->name('expertise');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Public blog routes
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');

// Admin blog routes
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/blogs', [BlogController::class, 'adminIndex'])->name('admin.blogs.index');
    Route::post('/admin/blogs', [BlogController::class, 'store'])->name('admin.blogs.store');
    Route::put('/admin/blogs/{blog}', [BlogController::class, 'update'])->name('admin.blogs.update');
    Route::delete('/admin/blogs/{blog}', [BlogController::class, 'destroy'])->name('admin.blogs.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
