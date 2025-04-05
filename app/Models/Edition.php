<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PHPUnit\Framework\Attributes\Ticket;

class Edition extends Model
{
    protected $fillable = [
        'name',
        'year',
        'description',
        'date',
        'google_map_url',
        'city',
        'country',
        'venue',
        'is_active',
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
    ];

    public function registrations(){
        $this->hasMany(Registration::class);
    }
}
