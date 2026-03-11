export const prerender = false;

import { Resend } from "resend";
import { ratelimit } from '../../lib/ratelimit';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }: { request: Request }) {

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("cf-connecting-ip") ||
    "anonymous";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({ error: "Too many requests" }),
      { status: 429 }
    );
  }

  const data = await request.json();

  await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "kweyzipotato@gmail.com",
    subject: `New message from ${data.name}`,
    replyTo: data.email,
    html: `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Message:</b></p>
      <p>${data.message}</p>
    `
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200
  });
}