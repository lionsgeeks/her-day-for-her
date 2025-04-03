<?php

use App\Http\Controllers\SpeakerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('speakers', SpeakerController::class);
});

