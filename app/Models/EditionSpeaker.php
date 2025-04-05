<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EditionSpeaker extends Model
{

    protected $fillable = [
        'edition_id',
        'speaker_id',
    ];
}
