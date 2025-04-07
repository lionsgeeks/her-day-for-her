<?php

namespace App\Providers;

use App\Models\Edition;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //

        // $edition = Edition::where("is_active", 1)->first();
        // Inertia::share([
        //     "edition" => $edition
        // ]);
    }
}
