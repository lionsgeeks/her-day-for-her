<?php
use App\Models\Content;
use App\Models\Sponsor;
use App\Models\Timeline;
use App\Models\Edition;
use App\Models\Image;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    $hero = Content::where("section", "hero")->first();
    $about = Content::where("section", "about")->first();
    $edition = Edition::where("is_active" , 1)->with('sponsors.images')->first();
    // dd($edition);
    $speakers = $edition->speakers()->get();
    // Sort the events by their starting time..TODO take into consideration multiple days
    $timelineEvents = Timeline::where('edition_id', $edition->id)->get()->sortBy(function($timeline) {
        return \Carbon\Carbon::createFromFormat('H:i', $timeline->startTime);
    })->values()->toArray();
    $galleries = Image::where('imageable_type', 'App\Models\Gallery')->take(9)->get()->shuffle();
    return Inertia::render('welcome', [
        'speakers' => $speakers,
        'timelineEvents' => $timelineEvents,
        'hero' => $hero,
        'about' => $about,
        'edition' => $edition,
        'galleries' => $galleries,
    ]);
})->name('home');



Route::middleware(['auth', 'verified'])->prefix("admin")->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

