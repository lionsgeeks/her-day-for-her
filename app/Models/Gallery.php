<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'edition_id',
    ];

    public function edition()
    {
        return $this->belongsTo(Edition::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
