export const prerender = false;

import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }: { request: Request }) {
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