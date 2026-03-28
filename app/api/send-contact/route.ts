import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function escapeHtml(input: unknown): string {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('[send-contact] Missing RESEND_API_KEY');
      return NextResponse.json(
        { error: 'Nie udało się wysłać wiadomości.' },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name) {
      return NextResponse.json(
        { error: 'Pole „Nazwa firmy" jest wymagane.' },
        { status: 400 },
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Podaj prawidłowy adres e-mail.' },
        { status: 400 },
      );
    }
    if (!message) {
      return NextResponse.json(
        { error: 'Pole wiadomości nie może być puste.' },
        { status: 400 },
      );
    }

    const data = await resend.emails.send({
      from: 'Nonoise Website <hello@nonoise.media>',
      to: 'contact@nonoise.media',
      replyTo: email,
      subject: `Wiadomość od ${name} — nonoise.media`,
      html: `
  <div style="font-family: sans-serif; max-width: 600px;">
    <h1 style="font-size: 24px; text-transform: uppercase; border-bottom: 4px solid #000; padding-bottom: 10px;">
      Nowa wiadomość z formularza kontaktowego
    </h1>
    <div style="margin-top: 30px;">
      <div style="margin-bottom: 20px; border-left: 2px solid #000; padding-left: 15px;">
        <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #666;">Firma / Imię</p>
        <p style="margin: 5px 0 0 0; font-size: 18px; color: #000;">${escapeHtml(name)}</p>
      </div>
      <div style="margin-bottom: 20px; border-left: 2px solid #000; padding-left: 15px;">
        <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #666;">Email</p>
        <p style="margin: 5px 0 0 0; font-size: 18px; color: #000;">
          <a href="mailto:${escapeHtml(email)}" style="color: #000;">${escapeHtml(email)}</a>
        </p>
      </div>
      <div style="margin-bottom: 20px; border-left: 2px solid #000; padding-left: 15px;">
        <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #666;">Wiadomość</p>
        <p style="margin: 5px 0 0 0; font-size: 16px; color: #000; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
  </div>
      `,
    });

    if (data && 'error' in data && data.error) {
      console.error('[send-contact] Resend returned error:', data.error);
      return NextResponse.json(
        { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as { message?: string; name?: string };
    console.error('[send-contact] Route error:', error);
    return NextResponse.json(
      { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
      { status: 500 },
    );
  }
}
