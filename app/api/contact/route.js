import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const getEnv = (key) => process.env[key];

export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body?.name || '').trim();
    const email = (body?.email || '').trim();
    const phone = (body?.phone || '').trim();
    const budget = (body?.budget || '').trim();
    const message = (body?.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const host = getEnv('SMTP_HOST');
    const port = Number(getEnv('SMTP_PORT') || 0);
    const user = getEnv('SMTP_USER');
    const pass = getEnv('SMTP_PASS');
    const secure = getEnv('SMTP_SECURE') === 'true';
    const toAddress = getEnv('CONTACT_TO') || 'eldecorastudio@gmail.com';

    if (!host || !port || !user || !pass) {
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    const subject = `New contact request from ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : 'Phone: -',
      '',
      message
    ].join('\n');

    await transporter.sendMail({
      from: `Eldecora.com <${user}>`,
      to: toAddress,
      replyTo: email,
      subject,
      text
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to send email right now.' },
      { status: 500 }
    );
  }
}
