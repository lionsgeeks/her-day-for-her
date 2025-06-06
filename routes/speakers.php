<?php

use App\Http\Controllers\SpeakerController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix("admin")->group(function () {
    Route::resource('speakers', SpeakerController::class);
});

