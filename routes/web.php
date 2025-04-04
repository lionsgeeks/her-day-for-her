<?php

use App\Models\Content;
use App\Models\Speaker;
use App\Models\Timeline;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $hero = Content::where("section", "hero")->first();
    $about = Content::where("section", "about")->first();
    $speakers = Speaker::all();
    // Sort the events by their starting time..TODO take into consideration multiple days
    $timelineEvents = Timeline::all()->sortBy(function($timeline) {
        return \Carbon\Carbon::createFromFormat('H:i', $timeline->startTime);
    })->values()->toArray();

    return Inertia::render('welcome', [
        'speakers' => $speakers,
        'timelineEvents' => $timelineEvents,
        'hero' => $hero,
        'about' => $about,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->prefix("admin")->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/content.php';
require __DIR__.'/auth.php';
require __DIR__.'/speakers.php';
require __DIR__.'/timeline.php';
