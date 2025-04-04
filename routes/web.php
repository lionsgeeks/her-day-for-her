<?php

use App\Models\Speaker;
use App\Models\Timeline;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $speakers = Speaker::all();
    $timelineEvents = Timeline::all();
    return Inertia::render('welcome', [
        'speakers' => $speakers,
        'timelineEvents' => $timelineEvents,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/content.php';
require __DIR__.'/auth.php';
require __DIR__.'/speakers.php';
require __DIR__.'/timeline.php';
