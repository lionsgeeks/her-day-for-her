<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{


    protected $fillable = [
        'title',
        'date',
        'startTime',
        'endTime',
        'edition'
    ];

    
}
