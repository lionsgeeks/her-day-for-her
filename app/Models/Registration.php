<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PHPUnit\Framework\Attributes\Ticket;

class Registration extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'edition_id',
        'company',
        'job_title',
        'dietary_restrictions',
        'ticket_number',
        'qr_code',
        'status',
        'attended_at',
    ];

    public function edition() {
        return $this->belongsTo(Edition::class);
    }
}
