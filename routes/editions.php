<?php

use App\Http\Controllers\EditionController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix("admin")->group(function () {
    Route::resource('editions', EditionController::class);
});
Route::get("past-editions" , [EditionController::class , "pastEditions"]);
