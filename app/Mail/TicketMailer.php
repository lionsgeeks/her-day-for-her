<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketMailer extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $first_name;
    public $last_name;
    public $email;
    public $company;
    public $job_title;
    public $qrCodePath;
    public $ticket_number;
    public $edition;
    public $pdfFileName;



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

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Ticket for Her Day for Her Conference',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.ticketMaile'
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {

        return [
            Attachment::fromStorageDisk('public', $this->pdfFileName)
                ->as('ticket-pdf.pdf')
                ->withMime('application/pdf')
        ];
    }
}
