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
        'email',
        'phone',
        'city',
        'country',
        'venue',
        'is_active',
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
    ];

    public function timelines()
    {
        return $this->hasMany(Timeline::class);
    }

    public function speakers()
    {
        return $this->belongsToMany(Speaker::class, 'edition_speakers')->withTimestamps();
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }
    public function sponsors()
    {
        return $this->belongsToMany(Sponsor::class, 'edition_sponsors');
    }
    public function registrations(){
        $this->hasMany(Registration::class);
    }
}
