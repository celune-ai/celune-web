import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Celune <hello@celune.ai>';
const TO_EMAIL = 'hello@celune.ai';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function generateTicketNumber() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CEL-${id}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!name?.trim() || !email?.trim() || !topic?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const ticketNumber = generateTicketNumber();

    if (!resend) {
      console.warn('RESEND_API_KEY not set — support email not sent');
      return NextResponse.json({ ticketNumber });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[${ticketNumber}] Support: ${topic}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px;">
          <p style="font-size: 12px; color: #737373; margin: 0 0 24px;">Ticket: <strong>${ticketNumber}</strong></p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #737373; width: 80px; vertical-align: top;">Name</td><td style="padding: 8px 0; color: #e5e5e5;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #737373; vertical-align: top;">Email</td><td style="padding: 8px 0; color: #e5e5e5;"><a href="mailto:${email}" style="color: #22c55e;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #737373; vertical-align: top;">Topic</td><td style="padding: 8px 0; color: #e5e5e5;">${topic}</td></tr>
          </table>
          <div style="border-top: 1px solid #333; padding-top: 16px;">
            <p style="font-size: 14px; color: #a3a3a3; white-space: pre-wrap; line-height: 1.6; margin: 0;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ticketNumber });
  } catch (err) {
    console.error('Support form error:', err);
    return NextResponse.json({ error: 'Failed to submit request.' }, { status: 500 });
  }
}
