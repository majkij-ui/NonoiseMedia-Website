import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { answers, contactMethod, contactValue } = await request.json();

    // Format the answers into a clean HTML email
    let answersHtml = '';
    for (const [key, value] of Object.entries(answers)) {
      answersHtml += `<p><strong>${key}:</strong><br/>${value}</p>`;
    }

    const data = await resend.emails.send({
      from: 'Nonoise Website <onboarding@resend.dev>', // Keep this as onboarding@resend.dev until you verify your domain on Resend
      to: 'contact@nonoise.media',
      subject: 'Formularz od nowego klienta',
      html: `
        <h2>Nowe zapytanie z kwestionariusza!</h2>
        <hr />
        <h3>Dane kontaktowe:</h3>
        <p><strong>Metoda:</strong> ${contactMethod.toUpperCase()}</p>
        <p><strong>Kontakt:</strong> ${contactValue}</p>
        <hr />
        <h3>Odpowiedzi:</h3>
        ${answersHtml}
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
