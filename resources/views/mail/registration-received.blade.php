<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Registration received</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #111827;">
    <div style="max-width: 640px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 12px;">Registration received</h2>

      <p style="margin: 0 0 12px;">
        Hello {{ $registration->first_name }} {{ $registration->last_name }},
      </p>

      <p style="margin: 0 0 12px;">
        We have received your registration for <strong>{{ $edition->name }}</strong>.
      </p>

      <p style="margin: 0 0 12px;">
        Our team is currently examining your registration. If it is approved, you will receive a separate invitation email with the next steps.
      </p>

      <p style="margin: 16px 0 0; font-size: 12px; color: #6b7280;">
        If you did not submit this registration, you can ignore this email.
      </p>
    </div>
  </body>
</html>

