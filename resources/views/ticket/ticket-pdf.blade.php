<!DOCTYPE html>
<html lang="fr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Billet — {{ $ticket->ticket_number }}</title>
    <style>
        @page {
            margin: 12mm;
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            margin: 0;
            padding: 0;
            color: #1f2937;
            background: #f3f4f6;
            font-size: 11pt;
            line-height: 1.45;
        }

        .sheet {
            max-width: 190mm;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e5e7eb;
        }

        .head {
            background: linear-gradient(105deg, #050551 0%, #050551 55%, #ff0063 100%);
            color: #ffffff;
            padding: 22px 26px;
        }

        .head-row {
            width: 100%;
            border-collapse: collapse;
        }

        .head-row td {
            vertical-align: middle;
            padding: 0;
        }

        .brand {
            font-size: 20pt;
            font-weight: bold;
            letter-spacing: 0.02em;
        }

        .brand-sub {
            font-size: 9pt;
            opacity: 0.9;
            margin-top: 4px;
        }

        .ticket-num {
            text-align: right;
        }

        .ticket-num-label {
            font-size: 8.5pt;
            opacity: 0.85;
        }

        .ticket-num-value {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 2px;
            font-family: 'DejaVu Sans Mono', 'DejaVu Sans', monospace;
        }

        .body {
            padding: 22px 26px 28px;
        }

        .title {
            font-size: 15pt;
            font-weight: bold;
            color: #050551;
            margin: 0 0 4px 0;
        }

        .subtitle {
            font-size: 10pt;
            color: #6b7280;
            margin: 0 0 18px 0;
        }

        .grid {
            width: 100%;
            border-collapse: collapse;
        }

        .grid td {
            vertical-align: top;
            padding: 0;
        }

        .col-main {
            width: 62%;
            padding-right: 16px;
        }

        .col-qr {
            width: 38%;
            text-align: center;
        }

        .field {
            margin-bottom: 12px;
        }

        .field-label {
            font-size: 8pt;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #ff0063;
            font-weight: bold;
            margin-bottom: 2px;
        }

        .field-value {
            font-size: 10.5pt;
            color: #111827;
            word-wrap: break-word;
        }

        .meta-box {
            margin-top: 16px;
            padding: 12px 14px;
            background: #f9fafb;
            border-left: 4px solid #050551;
            border-radius: 0 8px 8px 0;
        }

        .meta-line {
            margin: 0 0 6px 0;
            font-size: 10pt;
        }

        .meta-line:last-child {
            margin-bottom: 0;
        }

        .qr-wrap {
            display: inline-block;
            padding: 10px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
        }

        .qr-wrap img {
            display: block;
            width: 180px;
            height: 180px;
        }

        .qr-hint {
            font-size: 8pt;
            color: #6b7280;
            margin-top: 10px;
            line-height: 1.35;
        }

        .footer-strip {
            height: 6px;
            background: linear-gradient(90deg, #050551, #ff0063);
        }
    </style>
</head>

<body>
    @php
        $edition = $ticket->edition ?? null;
        /** Lieu officiel de l'événement (affichage billet PDF) */
        $lieu = 'La médiathèque de la fondation de la mosquée Hassan II';
        $dateFr = '';
        if ($edition && $edition->date) {
            $raw = \Carbon\Carbon::parse($edition->date)->locale('fr')->isoFormat('dddd D MMMM YYYY');
            $dateFr = mb_strtoupper(mb_substr($raw, 0, 1, 'UTF-8'), 'UTF-8') . mb_substr($raw, 1, null, 'UTF-8');
        }
        $heure = ($edition && !empty($edition->event_time)) ? $edition->event_time : '14h00';
        $editionLabel = $edition ? ($edition->name . ($edition->year ? ' · ' . $edition->year : '')) : 'Her Day for Her';
    @endphp

    <div class="sheet">
        <div class="head">
            <table class="head-row" width="100%">
                <tr>
                    <td>
                        <div class="brand">Her Day for Her</div>
                        <div class="brand-sub">Billet d'accès — confirmation</div>
                    </td>
                    <td class="ticket-num">
                        <div class="ticket-num-label">N° de billet</div>
                        <div class="ticket-num-value">{{ $ticket->ticket_number }}</div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="body">
            <p class="title">Participant</p>
            <p class="subtitle">{{ $editionLabel }}</p>

            <table class="grid" width="100%">
                <tr>
                    <td class="col-main">
                        <div class="field">
                            <div class="field-label">Nom complet</div>
                            <div class="field-value">{{ $ticket->first_name }} {{ $ticket->last_name }}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">E-mail</div>
                            <div class="field-value">{{ $ticket->email }}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Entreprise</div>
                            <div class="field-value">{{ $ticket->company ?: '—' }}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Fonction</div>
                            <div class="field-value">{{ $ticket->job_title ?: '—' }}</div>
                        </div>

                        <div class="meta-box">
                            @if ($dateFr !== '')
                                <p class="meta-line"><strong style="color:#ff0063;">Date</strong> — {{ $dateFr }}</p>
                            @endif
                            <p class="meta-line"><strong style="color:#ff0063;">Heure</strong> — {{ $heure }}</p>
                            <p class="meta-line"><strong style="color:#ff0063;">Lieu</strong> — {{ $lieu }}</p>
                        </div>
                    </td>
                    <td class="col-qr">
                        <div class="qr-wrap">
                            <img src="{{ $qrCode }}" alt="QR" />
                        </div>
                        <p class="qr-hint">Présentez ce code QR à l'accueil le jour de l'événement.</p>
                    </td>
                </tr>
            </table>
        </div>

        <div class="footer-strip"></div>
    </div>
</body>

</html>
