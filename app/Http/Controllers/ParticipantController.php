<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationDeclinedMailer;
use App\Mail\TicketMailer;
use App\Models\Edition;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
$latestEdition = Edition::orderBy('id', 'desc')->first();

        return Inertia::render('registrations/index', [
            'registrations' => Registration::with('edition')->get(),
            'editions' => Edition::orderBy('id', 'desc')->get(),
            'latestEditionId' => $latestEdition?->id,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function approve(Registration $registration)
    {
        $edition = $registration->edition ?? Edition::find($registration->edition_id);

        // mark approved
        $registration->status = 'confirmed';
        $registration->save();

        // generate ticket PDF + attach
        $svg = QrCode::size(200)->format('svg')->generate($registration->ticket_number);
        $base64 = base64_encode($svg);
        $qrCode = 'data:image/svg+xml;base64,' . $base64;

        $ticket = $registration;
        $pdf = Pdf::loadView('ticket.ticket-pdf', compact('ticket', 'qrCode'));
        $pdfFileName = "tickets/ticket-{$registration->ticket_number}.pdf";
        Storage::disk('public')->put($pdfFileName, $pdf->output());

        Mail::to($registration->email)->send(new TicketMailer(
            $registration->first_name,
            $registration->last_name,
            $registration->email,
            $registration->company,
            $registration->job_title,
            $registration->qr_code,
            $registration->ticket_number,
            $edition,
            $pdfFileName,
        ));

        return back();
    }

    public function decline(Registration $registration)
    {
        $edition = $registration->edition ?? Edition::find($registration->edition_id);

        $registration->status = 'cancelled';
        $registration->save();

        Mail::to($registration->email)->send(new RegistrationDeclinedMailer($registration, $edition));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $registration = Registration::findOrFail($id);

        // cleanup stored files (best-effort)
        Storage::disk('public')->delete([
            $registration->qr_code,
            "tickets/ticket-{$registration->ticket_number}.pdf",
        ]);

        $registration->delete();

        return back();
    }
}
