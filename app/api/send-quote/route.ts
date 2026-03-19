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
      console.error('[send-quote] Missing RESEND_API_KEY');
      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: { name: 'MissingEnv', message: 'RESEND_API_KEY is not set' },
        },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { formSummary, contactMethod, contactValue, clientName } = await request.json();
    const normalizedClientName = String(clientName ?? '').trim();
    const subjectClient = normalizedClientName || 'Nowe zapytanie';

    const answersHtml = formSummary.map((item: any) => `
  <div style="margin-bottom: 20px; border-left: 2px solid #000; padding-left: 15px;">
    <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #666;">${escapeHtml(item.question)}</p>
    <p style="margin: 5px 0 0 0; font-size: 18px; color: #000;">${escapeHtml(item.answer)}</p>
  </div>
`).join('');

    const data = await resend.emails.send({
      from: 'Nonoise Website <hello@nonoise.media>',
      to: 'contact@nonoise.media',
      subject: `Projekt: ${subjectClient} - Nonoise Media`,
      html: `
  <div style="font-family: sans-serif; max-width: 600px;">
    <h1 style="font-size: 24px; text-transform: uppercase; border-bottom: 4px solid #000; padding-bottom: 10px;">
      New Project Request
    </h1>
    <div style="margin-top: 30px;">
      ${answersHtml}
    </div>
    <hr style="border: 1px solid #eee; margin: 40px 0;" />
    <p style="font-size: 16px;"><strong>Contact Detail:</strong> ${escapeHtml(contactValue)} (${escapeHtml(contactMethod)})</p>
  </div>
      `,
    });

    // Resend can return {error} without throwing.
    if (data && 'error' in data && data.error) {
      console.error('[send-quote] Resend returned error:', data.error);
      return NextResponse.json(
        { error: data.error.message || 'Failed to send email', details: data.error },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const err = error as { message?: string; name?: string };
    console.error('[send-quote] Route error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: {
          name: err?.name || 'UnknownError',
          message: err?.message || 'Unknown error',
        },
      },
      { status: 500 },
    );
  }
}
