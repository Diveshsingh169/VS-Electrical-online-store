import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const subject = String(body.subject || '').trim();
  const message = String(body.message || '').trim();
  const productId = Number(body.product_id);
  const product_id = Number.isFinite(productId) && productId > 0 ? productId : null;

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  try {
    const [result] = await getPool().execute(
      `INSERT INTO enquiries (name, email, phone, product_id, subject, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone, product_id, subject || null, message]
    );
    return NextResponse.json({
      message: 'Thank you! Our team will get back to you within one business day.',
      id: result.insertId,
    });
  } catch (err) {
    // A bad product_id FK shouldn't block the enquiry — retry without it.
    if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
      try {
        await getPool().execute(
          `INSERT INTO enquiries (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
          [name, email, phone, subject || null, message]
        );
        return NextResponse.json({
          message: 'Thank you! Our team will get back to you within one business day.',
        });
      } catch (e2) {
        console.error('[enquiries]', e2.code, e2.message);
      }
    }
    console.error('[enquiries]', err.code, err.message);
    return NextResponse.json(
      { error: 'We could not save your enquiry right now. Please try again or call us.' },
      { status: 500 }
    );
  }
}
