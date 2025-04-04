<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix("admin")->group(function () {

    Route::get("content/hero-panel" ,[ ContentController::class , "hero"]);
    Route::get("content/about-panel" ,[ ContentController::class , "about"]);
    Route::post('/content/store', [ContentController::class, 'store'])->name('content.store');


});
