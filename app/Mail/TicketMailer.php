<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketMailer extends Mailable
{
    use Queueable, SerializesModels;

    public $first_name;

    public $last_name;

    public $email;

    public $company;

    public $job_title;

    public $qrCodePath;

    public $ticket_number;

    public $edition;

    public $pdfFileName;

    public string $dateFr;

    public string $eventTime;

    public string $venue;

    public function __construct(
        $first_name,
        $last_name,
        $email,
        $company,
        $job_title,
        $qrCodePath,
        $ticket_number,
        $edition,
        $pdfFileName,
    ) {
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->company = $company;
        $this->job_title = $job_title;
        $this->qrCodePath = $qrCodePath;
        $this->ticket_number = $ticket_number;
        $this->edition = $edition;
        $this->pdfFileName = $pdfFileName;

        $this->venue = $edition->venue ?? '';

        if ($edition->date) {
            $raw = Carbon::parse($edition->date)->locale('fr')->isoFormat('dddd D MMMM YYYY');
            $this->dateFr = mb_strtoupper(mb_substr($raw, 0, 1, 'UTF-8'), 'UTF-8').mb_substr($raw, 1, null, 'UTF-8');
        } else {
            $this->dateFr = '';
        }

        $this->eventTime = $edition->event_time ?? '14h00';
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation d\'inscription — Her Day for Her',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.registration-confirmed',
        );
    }

    /**
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromStorageDisk('public', $this->pdfFileName)
                ->as('billet-her-day-for-her.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
