<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix("admin")->group(function () {

    Route::resource("content" , ContentController::class);
});
