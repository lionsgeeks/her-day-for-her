<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Registration update</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #111827;">
    <div style="max-width: 640px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 12px;">Registration update</h2>

      <p style="margin: 0 0 12px;">
        Hello {{ $registration->first_name }} {{ $registration->last_name }},
      </p>

      <p style="margin: 0 0 12px;">
        Thank you for your interest in <strong>{{ $edition->name }}</strong>.
      </p>

      <p style="margin: 0 0 12px;">
        Unfortunately, the places are full and we can’t confirm your registration at this time.
      </p>

      <p style="margin: 16px 0 0; font-size: 12px; color: #6b7280;">
        If you did not submit this registration, you can ignore this email.
      </p>
    </div>
  </body>
</html>

