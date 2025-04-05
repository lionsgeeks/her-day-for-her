<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['path'];
    public function imagable()
    {
        return $this->morphTo();
    }


    public function galleries()
    {
        return $this->where('imageable_type', Gallery::class)->get();
    }

}
