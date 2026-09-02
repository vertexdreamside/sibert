"use server";

import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Resend's shared onboarding domain — works immediately with no setup,
// and can send to any recipient. Swap FROM_EMAIL for an address on your
// own verified domain (see .env.example) once you've added one in Resend.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Sibert Residence Website <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type BookingEnquiryInput = {
  toEmail: string;
  guestName: string;
  guestEmail: string;
  arrival: string;
  departure: string;
  roomName?: string;
  guests?: string;
  nights?: number;
  seasonLabel?: string;
  nightlyRate?: number | null;
  totalRate?: number | null;
  currency?: string;
};

export async function sendBookingEnquiry(input: BookingEnquiryInput) {
  const resend = getResend();
  if (!resend) {
    return {
      success: false as const,
      error: "Email sending isn't configured yet. Set RESEND_API_KEY (see .env.example).",
    };
  }

  const rateLine =
    input.nightlyRate != null && input.totalRate != null
      ? `<p><strong>Rate:</strong> ${input.currency ?? "€"}${input.nightlyRate}/night · ${input.currency ?? "€"}${input.totalRate} total</p>`
      : "";

  const html = `
    <h2>New Booking Enquiry — Sibert Residence</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.guestName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.guestEmail)}</p>
    <p><strong>Room:</strong> ${escapeHtml(input.roomName ?? "—")}</p>
    <p><strong>Guests:</strong> ${escapeHtml(input.guests ?? "—")}</p>
    <p><strong>Arrival:</strong> ${escapeHtml(input.arrival)}</p>
    <p><strong>Departure:</strong> ${escapeHtml(input.departure)}</p>
    <p><strong>Nights:</strong> ${input.nights ?? "—"} (${escapeHtml(input.seasonLabel ?? "—")})</p>
    ${rateLine}
    <hr />
    <p style="color:#8C8577;font-size:12px;">Sent automatically from the Sibert Residence website booking form.</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: input.toEmail,
      replyTo: input.guestEmail,
      subject: `Booking Enquiry — ${input.roomName ?? "Room"} (${input.arrival} → ${input.departure})`,
      html,
    });
    if (error) return { success: false as const, error: error.message };
    return { success: true as const };
  } catch (err) {
    return { success: false as const, error: err instanceof Error ? err.message : "Failed to send email." };
  }
}

export type AvailabilityRequestInput = {
  toEmail: string;
  name: string;
  email: string;
  phone: string;
  arrival: string;
  departure: string;
  adults: string;
  children: string;
  nights?: number;
  seasonLabel?: string;
  /** Honeypot field — real visitors never fill this in. If it's non-empty,
   *  the submission is silently dropped instead of generating spam email. */
  honeypot?: string;
};

export async function sendAvailabilityRequest(input: AvailabilityRequestInput) {
  // Bot caught the honeypot — pretend success so it doesn't learn to avoid it.
  if (input.honeypot) {
    return { success: true as const };
  }

  const resend = getResend();
  if (!resend) {
    return {
      success: false as const,
      error: "Email sending isn't configured yet. Set RESEND_API_KEY (see .env.example).",
    };
  }

  const summaryLine = `${escapeHtml(input.arrival)} → ${escapeHtml(input.departure)} · ${input.nights ?? "—"} night${input.nights === 1 ? "" : "s"} (${escapeHtml(input.seasonLabel ?? "—")}) · ${escapeHtml(input.adults)} adult${input.adults === "1" ? "" : "s"}${Number(input.children) > 0 ? `, ${escapeHtml(input.children)} child${input.children === "1" ? "" : "ren"}` : ""}`;

  const businessHtml = `
    <h2>New Availability Request — Sibert Residence</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
    <p><strong>Trip:</strong> ${summaryLine}</p>
    <hr />
    <p style="color:#8C8577;font-size:12px;">Sent automatically from the Sibert Residence website "Check Availability" form.</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: input.toEmail,
      replyTo: input.email,
      subject: `Availability Request — ${input.arrival} → ${input.departure}`,
      html: businessHtml,
    });
    if (error) return { success: false as const, error: error.message };
  } catch (err) {
    return { success: false as const, error: err instanceof Error ? err.message : "Failed to send email." };
  }

  // Confirmation back to the guest — best-effort; the business copy above is
  // what matters, so a failure here doesn't fail the whole submission.
  try {
    const customerHtml = `
      <h2>We've received your request</h2>
      <p>Hi ${escapeHtml(input.name)},</p>
      <p>Thanks for checking availability at Sibert Residence — here's what you sent us:</p>
      <p>${summaryLine}</p>
      <p>We'll get back to you shortly by email to confirm availability and the next steps.</p>
      <p>If it's urgent, you're welcome to reach us on WhatsApp any time.</p>
    `;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: input.email,
      subject: "We've received your request — Sibert Residence",
      html: customerHtml,
    });
  } catch {
    // Ignore — the business already has the enquiry.
  }

  return { success: true as const };
}

export type ContactMessageInput = {
  toEmail: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export async function sendContactMessage(input: ContactMessageInput) {
  const resend = getResend();
  if (!resend) {
    return {
      success: false as const,
      error: "Email sending isn't configured yet. Set RESEND_API_KEY (see .env.example).",
    };
  }

  const html = `
    <h2>New Contact Message — Sibert Residence</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    ${input.subject ? `<p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    <hr />
    <p style="color:#8C8577;font-size:12px;">Sent automatically from the Sibert Residence website contact form.</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: input.toEmail,
      replyTo: input.email,
      subject: input.subject ? `Contact form: ${input.subject}` : "New message from the website",
      html,
    });
    if (error) return { success: false as const, error: error.message };
    return { success: true as const };
  } catch (err) {
    return { success: false as const, error: err instanceof Error ? err.message : "Failed to send email." };
  }
}
