<?php

use App\Http\Controllers\EditionController;
use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix("admin")->group(function () {
    Route::resource('registrations', ParticipantController::class);
});
