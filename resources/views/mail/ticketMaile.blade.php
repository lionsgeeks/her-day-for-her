<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Ticket #{{ $ticket_number }}</title>
    <style>
        @page {
            margin: 0;
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            margin: 0;
            padding: 10vh;
            color: #333;
            background-color: #edf2fa;

        }

        .ticket {
            width: 210mm;
            margin: 0 auto;
            border-radius: 10px;
            background-color: white
        }

        .header {
            background: linear-gradient(to right, #03329b, #fd5f90);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
        }

        .content {
            padding: 20px;
        }

        .text-muted {
            color: #6b7280;
        }

        .text-primary {
            color: #03329b;
        }

        .font-bold {
            font-weight: bold;
        }

        .grid {
            display: grid;
        }

        .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
        }

        .gap-4 {
            gap: 1rem;
        }

        .flex {
            display: flex;
        }

        .items-center {
            align-items: center;
        }

        .justify-between {
            justify-content: space-between;
        }

        .rounded-lg {
            border-radius: 0.5rem;
        }

        .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .border {
            border: 1px solid #e5e7eb;
        }

        .border-b {
            border-bottom: 1px solid #e5e7eb;
        }

        .p-6 {
            padding: 1.5rem;
        }

        .mb-4 {
            margin-bottom: 1rem;
        }

        .mb-6 {
            margin-bottom: 1.5rem;
        }

        .mb-8 {
            margin-bottom: 2rem;
        }

        .space-y-2>*+* {
            margin-top: 0.5rem;
        }

        .space-y-4>*+* {
            margin-top: 1rem;
        }

        .w-full {
            width: 100%;
        }

        .h-auto {
            height: auto;
        }

        .text-center {
            text-align: center;
        }

        .text-xs {
            font-size: 0.75rem;
        }

        .text-sm {
            font-size: 0.875rem;
        }

        .text-xl {
            font-size: 1.25rem;
        }

        .text-2xl {
            font-size: 1.5rem;
        }

        .text-3xl {
            font-size: 1.875rem;
        }

        .qr-container {
            background: white;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }

        .qrCode {
            /* background-color: red; */
            padding-top: 2vh
        }

        .qrCode p {
            padding-left: 10px
        }
        .flex-col {
            flex-direction: column;
        }
       
    </style>
</head>

<body>
    <div class="ticket">
        <div class="header  ">
            <div class="flex flex-col gap-y-4">
                <div class="flex items-center mb-8  gap-8">
                    <div class="rounded-full bg-white p-1">
                        <div class="h-8 w-8 rounded-full bg-[#03329b]"></div>
                    </div>
                    <span class="text-xl font-bold ">Her Day for Her</span>
                </div>
                <div class="text-right">
                    <div class="text-sm opacity-80">Ticket #</div>
                    <div class="font-bold">{{ $ticket_number }}</div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-2 space-y-4">
                    <div>
                        <h2 class="text-2xl font-bold">Professional Pass</h2>
                        <p class="text-muted">Her Day for Her Conference {{ $edition->year }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div class="text-sm text-muted">Attendee</div>
                            <div class="font-medium">
                                {{ $first_name }} {{ $last_name }}
                            </div>
                        </div>
                        <div>
                            <div class="text-sm text-muted">Email</div>
                            <div class="font-medium">{{ $email }}</div>
                        </div>
                        <div>
                            <div class="text-sm text-muted">Company</div>
                            <div class="font-medium">{{ $company ?? 'N/A' }}</div>
                        </div>
                        <div>
                            <div class="text-sm text-muted">Job Title</div>
                            <div class="font-medium">{{ $job_title ?? 'N/A' }}</div>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 pt-2">
                        <div class="flex items-center gap-2">
                            <span style="color: #fd5f90;">📅</span>
                            <span>{{ \Carbon\Carbon::parse($edition->created_at)->format('F j') }}-{{ \Carbon\Carbon::parse($edition->created_at)->addDays(2)->format('j, Y') }}
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span style="color: #fd5f90;">📍</span>
                            <span>Grand Conference Center, {{ $edition->city }}</span>
                        </div>
                    </div>
                </div>

                {{-- <div class="flex flex-col items-center justify-center qrCode">
                    <div class="qr-container ">
                        <img src="{{ asset('storage/' . $qrCodePath) }}"  alt="QR Code" width="200" height="200">
                    </div>
                    <p class="text-xs text-center text-muted mt-2 ">
                        Present this QR code at the registration desk
                    </p>
                </div> --}}
            </div>

            <div class="mt-6">
                <h3 class="font-semibold mb-4">Ticket Includes:</h3>
                <ul class="space-y-2">
                    @foreach (['Access to all talks and workshops', 'Conference materials', 'Lunch and refreshments', 'Networking events', 'Digital certificate'] as $item)
                        <li class="flex items-start gap-2">
                            <span style="color: #03329b;">✓</span>
                            <span>{{ $item }}</span>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</body>

</html>
