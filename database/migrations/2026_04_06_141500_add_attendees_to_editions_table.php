<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('editions', 'attendees')) {
            Schema::table('editions', function (Blueprint $table) {
                $table->unsignedInteger('attendees')->default(0)->after('city');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('editions', 'attendees')) {
            Schema::table('editions', function (Blueprint $table) {
                $table->dropColumn('attendees');
            });
        }
    }
};
