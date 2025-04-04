<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('DATA RECEIVED FROM TICKETS FORM:', $request->all());
        //* validate request
        $registration = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:registrations,email',
            'phone' => 'required|string|max:20',
            'company' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'dietary_restrictions' => 'nullable|string',
            'agree_terms' => 'required|accepted',
            'agree_privacy' => 'required|accepted',
        ]);

        Log::info('DATA VALIDATION:', $registration);

        //* generate ticket_number_id
        $ticket_number = 'HDH' . date('Y') . '-' . Str::random(6);

        //* create qr data
        // $qrData = json_encode([
        //     'ticket_number' => $ticket_number,
        // ]);

        //* generate qr code
        $qrCode = QrCode::size(200)->format('svg')->generate($ticket_number);

        //* qrCode Svg path
        $qrCodePath = 'qrcodes/' . $ticket_number . '.svg';
        Storage::disk('public')->put($qrCodePath, $qrCode);

        //* store data in registration table

        $ticket = Registration::create([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "email" => $request->email,
            "phone" => $request->phone,
            "edition_id" => Str::uuid(), // to be replaced with edition->id
            "company" => $request->company,
            "job_title" => $request->job_title,
            "dietary_restrictions" => $request->dietary_restrictions,
            "ticket_number" => $ticket_number,
            "qr_code" => $qrCodePath,
        ]);

        Log::info('DATA STORED IN DATABASE:', $ticket->toArray());

        // return inertia()->location(route('tickets.show', $ticket->id));

        // return response()->json([
        //     'registration' => $ticket,
        //     'redirect' => route('tickets.show', $ticket->id)
        // ]);
        return redirect()->route('tickets.show', $ticket->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Registration $registration)
    {
        // $ticket = Registration::where('id', $registration->id);
        return Inertia::render('tickets/ticketPage', [
            'registration' => $registration
        ]);
    }

    public function downloadTicket(Registration $registration)
    {

        $svg = QrCode::size(200)->format('svg')->generate($registration->ticket_number);
        $base64 = base64_encode($svg);
        $qrCode = 'data:image/svg+xml;base64,' . $base64;
        $pdf = Pdf::loadView('ticket.ticket-pdf', compact('registration', 'qrCode'));


        // Set PDF options
        $pdf->setPaper('A4', 'portrait');
        $pdf->setOption('isPhpEnabled', true);
        $pdf->setOption('defaultFont', 'DejaVu Sans');

        return $pdf->download("ticket-{$registration->ticket_number}.pdf");
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Registration $registration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Registration $registration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registration $registration)
    {
        //
    }
}
