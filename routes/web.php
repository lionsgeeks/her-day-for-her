<?php

use App\Models\Content;
use App\Models\Speaker;
use App\Models\Timeline;
use App\Http\Controllers\RegistrationController;
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
    // dd($hero);
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
Route::post('/tickets', [RegistrationController::class, 'store'])->name('tickets.store');
Route::get('/tickets/{registration}', [RegistrationController::class, 'show'])->name('tickets.show');
Route::get('/ticket/pdf/{registration}', [RegistrationController::class, 'downloadTicket'])->name('ticket.pdf');
Route::get('/ticket/mail', [RegistrationController::class, 'index']);
require __DIR__.'/settings.php';
require __DIR__.'/content.php';
require __DIR__.'/auth.php';
require __DIR__.'/speakers.php';
require __DIR__.'/timeline.php';
require __DIR__.'/sponsors.php';
require __DIR__.'/editions.php';
require __DIR__.'/contact.php';
require __DIR__.'/registrations.php';

