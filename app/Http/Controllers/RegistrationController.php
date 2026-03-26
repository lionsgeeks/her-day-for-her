<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationReceivedMailer;
use App\Models\Edition;
use App\Models\Registration;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RegistrationController extends Controller
{
    /** @var list<string> */
    public const REGISTRATION_TYPES = [
        'Partenaire',
        'Bénévole',
        'Presse',
        'Amis de Jadara',
        'Invités',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ticket = Registration::where('id', 1)->get();
        $edition = Edition::where('id', 1)->get();
        $first_name = $ticket[0]->first_name;
        $last_name = $ticket[0]->last_name;
        $email = $ticket[0]->email;
        $company = $ticket[0]->company;
        $job_title = $ticket[0]->job_title;
        $qrCodePath = $ticket[0]->qr_code;
        $ticket_number = $ticket[0]->ticket_number;
        $edition = $edition[0];
        // dd($qrCodePath);
        //    $edition = $edition;
        return view('mail.ticketMaile', compact('first_name', 'last_name', 'email', 'company', 'job_title', 'qrCodePath', 'ticket_number', 'edition'));
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

        $edition = Edition::latest()->first();
        if (!$edition) {
            return back()->withErrors(['email' => 'No active edition available for registration.']);
        }

        //* validate request — email unique only for this edition
        $registration = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('registrations', 'email')->where('edition_id', $edition->id),
            ],
            'phone' => 'required|string|max:20',
            'type' => ['required', 'string', Rule::in(self::REGISTRATION_TYPES)],
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
        // $qrCode = QrCode::size(200)->format('png')->generate($ticket_number);

        //* qrCode Svg path
        $qrCodePath = 'qrcodes/' . $ticket_number . '.svg';
        // $qrCodePath = 'qrcodes/' . $ticket_number . '.png';
        Storage::disk('public')->put($qrCodePath, $qrCode);

        //* store data in registration table
        $ticket = Registration::create([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "email" => $request->email,
            "phone" => $request->phone,
            "edition_id" => $edition->id, // to be replaced with edition->id
            "type" => $request->type,
            "company" => $request->company,
            "job_title" => $request->job_title,
            "dietary_restrictions" => $request->dietary_restrictions,
            "ticket_number" => $ticket_number,
            "qr_code" => $qrCodePath,
            "status" => "pending",
        ]);

        Log::info('DATA STORED IN DATABASE:', $ticket->toArray());

        // Send "received / under review" email to registrant
        Mail::to($ticket->email)->send(new RegistrationReceivedMailer($ticket, $edition));

        // Stay on the same page (frontend shows success in modal)
        return back()->with('registration_received', true);
    }

    /**
     * Display the specified resource.
     */
    public function show(Registration $registration)
    {
        // $ticket = Registration::where('id', $registration->id);
        return Inertia::render('tickets/ticketPage', [
            'registration' => $registration,
            'editionYear' => $registration->edition->year,
            'editionName' => $registration->edition->name,
            'editionCity' => $registration->edition->city
        ]);
    }

    public function downloadTicket(Registration $registration)
    {

        $svg = QrCode::size(200)->format('svg')->generate($registration->ticket_number);
        $base64 = base64_encode($svg);
        $qrCode = 'data:image/svg+xml;base64,' . $base64;
        $ticket = $registration;
        $pdf = Pdf::loadView('ticket.ticket-pdf', compact('ticket', 'qrCode'));


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
