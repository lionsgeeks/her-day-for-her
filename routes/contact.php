<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::resource('contact', ContactController::class);




Route::middleware(['auth', 'verified'])->prefix("admin")->group(function () {
    Route::get('contact', [ContactController::class, 'adminindex'])->name('adminindex');
    Route::delete('contact/destroy/{contact}', [ContactController::class, 'destroy'])->name('contact.delete');
    Route::put("contact/update/{contact}", [ContactController::class, "update"])->name("contact.update");
});
