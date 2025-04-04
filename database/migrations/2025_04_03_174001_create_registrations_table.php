<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->foreignId('edition_id')->nullable(); //! nullable for now cause edition table is not created yet
            $table->string('company')->nullable();
            $table->string('job_title')->nullable();
            $table->string('dietary_restrictions')->nullable();
            $table->string('ticket_number')->unique();
            $table->string('qr_code');
            $table->string('status')->default('confirmed');
            $table->timestamp('attended_at')->nullable();
            $table->timestamps();
        });

        // $validated = $request->validate([
        //     'first_name' => 'required|string|max:255',
        //     'last_name' => 'required|string|max:255',
        //     'email' => 'required|email|max:255',
        //     'phone' => 'required|string|max:20',
        //     'ticket_type_id' => 'required|exists:ticket_types,id',
        //     'edition_id' => 'required|exists:editions,id',
        //     'company' => 'nullable|string|max:255',
        //     'job_title' => 'nullable|string|max:255',
        //     'dietary_restrictions' => 'nullable|string|max:255',
        //     'status' => 'required|in:confirmed,cancelled,attended',
        // ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
