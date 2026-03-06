<?php

use App\Http\Controllers\Affiliate\KelasController;
use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('kelas', [KelasController::class, 'index'])->name('kelas.index');
Route::get('kelas/{id}', [KelasController::class, 'detailCourse'])->name('kelas.show.course');
Route::get('kelas/{id}/module', [KelasController::class, 'detailModule'])->name('kelas.show.module');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('courses', CourseController::class);
    Route::post('courses/search-youtube', [CourseController::class, 'searchYoutubeVideos'])->name('courses.search-youtube');
    Route::get('courses/module/{module_id}', [CourseController::class, 'showModule'])->name('courses.module.show');
});

require __DIR__ . '/settings.php';