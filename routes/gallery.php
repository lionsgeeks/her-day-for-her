<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix("admin")->group(function () {

    Route::resource('gallery', GalleryController::class);


});
