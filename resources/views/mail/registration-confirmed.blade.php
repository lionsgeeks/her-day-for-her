<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Confirmation d'inscription</title>
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family: Arial, Helvetica, sans-serif; line-height: 1.65; color:#111827;">
    @php
        $alpha = '#050551';
        $beta = '#ff0063';
    @endphp

    <div style="padding: 28px 16px;">
        <div style="max-width: 640px; margin: 0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden;">
            <div style="background:{{ $alpha }}; padding: 18px 22px;">
                <div style="font-size: 18px; font-weight: 700; color:#ffffff; letter-spacing:0.2px;">
                    Her Day For Her
                </div>
                <div style="font-size: 13px; color: rgba(255,255,255,0.88); margin-top: 4px;">
                    Inscription confirmée
                </div>
            </div>

            <div style="padding: 22px 24px;">
                <p style="margin: 0 0 16px;">
                    Bonjour {{ $first_name }} {{ $last_name }},
                </p>

                <p style="margin: 0 0 16px;">
                    Votre inscription à la <span style="font-weight:700; color:{{ $alpha }};">{{ $edition->name }}</span> est bien confirmée.
                </p>

                <p style="margin: 0 0 20px;">
                    Nous serons ravis de vous accueillir lors de cet événement dédié au leadership féminin et au partage d'expériences inspirantes.
                </p>

                <div style="margin: 0 0 18px; padding: 14px 16px; background: rgba(5, 5, 81, 0.06); border-radius: 12px; border-left: 4px solid {{ $beta }};">
                    <p style="margin: 0 0 8px;">
                        <span style="font-weight: 600; color:{{ $alpha }};">📍 Lieu :</span>
                        {{ $venue }}
                    </p>
                    <p style="margin: 0 0 8px;">
                        <span style="font-weight: 600; color:{{ $alpha }};">🗓️ Date :</span>
                        {{ $dateFr }}
                    </p>
                    <p style="margin: 0;">
                        <span style="font-weight: 600; color:{{ $alpha }};">🕒 Heure :</span>
                        {{ $eventTime }}
                    </p>
                </div>

                <p style="margin: 0 0 16px;">
                    Nous avons hâte de vous y accueillir.
                </p>

                <p style="margin: 0 0 8px; font-size: 13px; color: #4b5563;">
                    Votre billet au format PDF est joint à ce message ; conservez-le pour l'accès le jour de l'événement.
                </p>

                <p style="margin: 20px 0 0;">
                    Bien cordialement,<br />
                    <span style="font-weight:700; color:{{ $alpha }};">L'équipe Jadara Foundation</span>
                </p>
            </div>
        </div>

        <div style="max-width: 640px; margin: 12px auto 0; text-align:center; font-size:12px; color:#6b7280;">
            <span style="display:inline-block; padding: 6px 10px; border-radius:999px; background: rgba(255,0,99,0.08); color: {{ $beta }};">
                Merci de votre confiance
            </span>
        </div>
    </div>
</body>
</html>
