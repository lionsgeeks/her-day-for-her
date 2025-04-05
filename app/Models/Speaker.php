<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speaker extends Model
{
    protected $fillable = [
        'name',
        'position',
        'linkedin',
        'image',
    ];


    public function editions()
    {
        return $this->belongsToMany(Edition::class, 'edition_speakers')->withTimestamps();
    }

}
