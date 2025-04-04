<?php

use App\Http\Controllers\TimelineController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix("admin")->group(function () {

    Route::resource("timeline" , TimelineController::class);
});
