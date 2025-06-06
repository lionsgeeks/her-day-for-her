<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    protected $fillable = ['name'];
    public function images()
    {
        return $this->morphMany( Image::class, 'imageable');
    }
    public function editions(){
        return $this->belongsToMany(Edition::class, 'edition_sponsors');
    }
}
