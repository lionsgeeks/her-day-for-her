<?php

use App\Models\Content;
use App\Models\Speaker;
use App\Models\Timeline;
use App\Http\Controllers\RegistrationController;
use App\Models\Edition;
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
    $edition = Edition::where("is_active" , 1)->first();
    // dd($edition);
    return Inertia::render('welcome', [
        'speakers' => $speakers,
        'timelineEvents' => $timelineEvents,
        'hero' => $hero,
        'about' => $about,
        'edition' => $edition,
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
require __DIR__.'/settings.php';
require __DIR__.'/content.php';
require __DIR__.'/auth.php';
require __DIR__.'/speakers.php';
require __DIR__.'/timeline.php';
require __DIR__.'/sponsors.php';
require __DIR__.'/editions.php';
require __DIR__.'/contact.php';

