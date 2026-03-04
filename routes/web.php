<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('courses', CourseController::class);
    Route::post('courses/search-youtube', [CourseController::class, 'searchYoutubeVideos'])->name('courses.search-youtube');
    Route::get('courses/module/{module_id}', [CourseController::class, 'showModule'])->name('courses.module.show');
});

require __DIR__ . '/settings.php';
