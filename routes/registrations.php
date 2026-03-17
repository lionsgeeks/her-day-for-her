<?php

use App\Http\Controllers\EditionController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix("admin")->group(function () {
    Route::resource('registrations', ParticipantController::class);
    Route::patch('registrations/{registration}/approve', [ParticipantController::class, 'approve'])->name('registrations.approve');
    Route::patch('registrations/{registration}/decline', [ParticipantController::class, 'decline'])->name('registrations.decline');
});

Route::post('/tickets', [RegistrationController::class, 'store'])->name('tickets.store');
Route::get('/tickets/{registration}', [RegistrationController::class, 'show'])->name('tickets.show');
Route::get('/ticket/pdf/{registration}', [RegistrationController::class, 'downloadTicket'])->name('ticket.pdf');
Route::get('/ticket/mail', [RegistrationController::class, 'index']);
