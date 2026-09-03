"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import type { SiteInfo, Room } from "@/lib/content";
import { whatsAppLink } from "@/lib/content";
import { sendAvailabilityRequest } from "@/app/(site)/actions";

export default function BookingRequestModal({
  open,
  onClose,
  site,
  rooms,
  arrival,
  departure,
  adults,
  children,
  nights,
  seasonLabel,
}: {
  open: boolean;
  onClose: () => void;
  site: SiteInfo;
  rooms: Room[];
  arrival: string;
  departure: string;
  adults: string;
  children: string;
  nights: number;
  seasonLabel: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roomSlug, setRoomSlug] = useState(rooms[0]?.slug ?? "");
  const [guests, setGuests] = useState(rooms[0]?.guestOptions?.[0] ?? "");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const room = rooms.find((r) => r.slug === roomSlug);
  const guestOptions = room?.guestOptions ?? [];

  useEffect(() => {
    if (guestOptions.length > 0 && !guestOptions.includes(guests)) {
      setGuests(guestOptions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomSlug]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setStatus("loading");
    setError(null);
    const result = await sendAvailabilityRequest({
      toEmail: site.email,
      name,
      email,
      phone,
      arrival,
      departure,
      adults,
      children,
      roomName: room?.name,
      guests,
      nights,
      seasonLabel,
      honeypot,
    });
    if (result.success) {
      setStatus("done");
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setStatus("idle");
      setError(null);
    }, 200);
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#091a13]/60"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-soft hover:text-ink"
        >
          <X size={18} />
        </button>

        {status === "done" ? (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto text-green-deep" size={40} />
            <h3 className="font-display text-xl text-green-deep mt-3">Thanks — request sent!</h3>
            <p className="text-ink-soft text-sm mt-2">
              We&apos;ll get back to you shortly by email to confirm availability for your dates. A confirmation of
              your request is on its way to your inbox too.
            </p>
            <button type="button" onClick={handleClose} className="btn-primary bg-green-deep text-sand mt-5">
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl text-green-deep mb-1">Check Availability</h3>
            <p className="text-sm text-ink-soft mb-5">
              {arrival} → {departure} · {nights} night{nights === 1 ? "" : "s"} ({seasonLabel})
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[0.68rem] uppercase tracking-wide text-ink-soft font-semibold mb-1 block">
                    Room Type
                  </label>
                  <select
                    value={roomSlug}
                    onChange={(e) => setRoomSlug(e.target.value)}
                    className="field-input w-full"
                  >
                    {rooms.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[0.68rem] uppercase tracking-wide text-ink-soft font-semibold mb-1 block">
                    Guests
                  </label>
                  <select value={guests} onChange={(e) => setGuests(e.target.value)} className="field-input w-full">
                    {guestOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className="field-input w-full"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="field-input w-full"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (with country code)"
                required
                className="field-input w-full"
              />
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px overflow-hidden"
              />

              {status === "error" && (
                <p className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                  <span>
                    Couldn&apos;t send your request{error ? `: ${error}` : ""} — try{" "}
                    <a
                      href={whatsAppLink(
                        site,
                        `Hi, I'd like to check availability for ${arrival} to ${departure} (${room?.name ?? "a room"}, ${guests}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      WhatsApp
                    </a>{" "}
                    instead.
                  </span>
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary bg-green-deep text-sand w-full justify-center disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  "Send Request"
                )}
              </button>
            </form>

            <p className="text-xs text-ink-soft text-center mt-4">
              Prefer to see live rates for this room first?{" "}
              <Link
                href={`/rooms?arrival=${arrival}&departure=${departure}#booking`}
                className="underline text-green-deep font-medium"
              >
                View Rooms
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
