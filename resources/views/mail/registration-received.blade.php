<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Registration received</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafc; font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color:#111827;">
    @php
      $recipientName = trim(($registration->first_name ?? '') . ' ' . ($registration->last_name ?? ''));
      if ($recipientName === '') $recipientName = 'there';

      // Brand colors (from app.css)
      $alpha = '#050551';
      $beta = '#ff0063';
    @endphp

    <div style="padding: 28px 16px;">
      <div style="max-width: 640px; margin: 0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden;">
        <div style="background:{{ $alpha }}; padding: 18px 22px;">
          <div style="font-size: 18px; font-weight: 700; color:#ffffff; letter-spacing:0.2px;">
            Her Day For Her
          </div>
          <div style="font-size: 13px; color: rgba(255,255,255,0.85); margin-top: 2px;">
            Registration received
          </div>
        </div>

        <div style="padding: 22px;">
          <p style="margin: 0 0 14px;">
            Dear <span style="font-weight:700; color:{{ $alpha }};">{{ $recipientName }}</span>,
          </p>

          <p style="margin: 0 0 14px;">
            Thank you for registering for
            <span style="font-weight:700; color:{{ $beta }};">{{ $edition->name ?? 'the 7th edition of Her Day For Her' }}</span>.
          </p>

          <p style="margin: 0 0 14px;">
            Your registration has been successfully received. You will soon receive the official invitation and full event details by email.
            Please keep this invitation, as it will be required for check-in on the day of the event.
          </p>

          <p style="margin: 0 0 18px;">
            We look forward to welcoming you on the day.
          </p>

          <p style="margin: 0;">
            Warm regards,<br />
            <span style="font-weight:700; color:{{ $alpha }};">Her Day For Her Team</span>
          </p>

          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">
              If you did not submit this registration, you can ignore this email.
            </p>
          </div>
        </div>
      </div>

      <div style="max-width: 640px; margin: 12px auto 0; text-align:center; font-size:12px; color:#6b7280;">
        <span style="display:inline-block; padding: 6px 10px; border-radius:999px; background: rgba(255,0,99,0.08); color: {{ $beta }};">
          Thank you
        </span>
      </div>
    </div>
  </body>
</html>

