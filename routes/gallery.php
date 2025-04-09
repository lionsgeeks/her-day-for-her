<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix("admin")->group(function () {

    Route::resource('gallery', GalleryController::class);
    Route::delete('/gallery/image/{image}', [GalleryController::class, 'destroyImage'])->name('gallery.image');
});
Route::get('/gallery', [GalleryController::class, 'frontPage'])->name('gallery.front');
