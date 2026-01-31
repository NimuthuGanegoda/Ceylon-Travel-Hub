import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';
import { env } from '@/lib/env';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Strict Input Validation & Sanitization (via Zod)
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Secure API Key Handling
    // The key is accessed via the validated env object and used only on the server.
    if (!env.API_SECRET_KEY) {
        console.error("API_SECRET_KEY is missing!");
        return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
    }

    // Simulate sending email to an external provider using the secure key
    // In a real app: await emailProvider.send({ apiKey: env.API_SECRET_KEY, ... })
    console.log(`[SecureLog] Sending email using secure key: ${env.API_SECRET_KEY.substring(0, 4)}***`);
    console.log(`[SecureLog] From: ${name} <${email}>`);

    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
