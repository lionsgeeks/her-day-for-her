<?php

namespace App\Mail;

use App\Models\Edition;
use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegistrationDeclinedMailer extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Registration $registration,
        public Edition $edition,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Update on your registration — {$this->edition->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.registration-declined',
        );
    }
}

