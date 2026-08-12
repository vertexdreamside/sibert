"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import { ROOMS } from "@/lib/content";

const compactSchema = z.object({
  arrival: z.string().min(1, "Required"),
  departure: z.string().min(1, "Required"),
  adults: z.string(),
  children: z.string(),
});

const panelSchema = z.object({
  arrival: z.string().min(1, "Required"),
  departure: z.string().min(1, "Required"),
  room: z.string(),
  guests: z.string(),
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
});

type CompactValues = z.infer<typeof compactSchema>;
type PanelValues = z.infer<typeof panelSchema>;

function useSubmitState() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const run = async () => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
    setTimeout(() => setStatus("idle"), 2200);
  };
  return { status, run };
}

export function BookingWidgetCompact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompactValues>({ resolver: zodResolver(compactSchema) });
  const { status, run } = useSubmitState();

  const onSubmit = handleSubmit(async () => {
    await run();
  });

  return (
    <form
      id="booking"
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-[0_30px_60px_-24px_rgba(15,61,46,0.4)] p-6 md:p-7 -mt-24 md:-mt-32 relative z-[5] grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
    >
      <Field label="Arrival">
        <input type="date" {...register("arrival")} className="field-input" />
        {errors.arrival && <FieldError text={errors.arrival.message} />}
      </Field>
      <Field label="Departure">
        <input type="date" {...register("departure")} className="field-input" />
        {errors.departure && <FieldError text={errors.departure.message} />}
      </Field>
      <Field label="Adults">
        <select {...register("adults")} defaultValue="2" className="field-input">
          {[1, 2, 3, 4].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </Field>
      <Field label="Children">
        <select {...register("children")} defaultValue="0" className="field-input">
          {[0, 1, 2].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </Field>
      <button type="submit" disabled={status === "loading"} className="btn-primary justify-center whitespace-nowrap">
        {status === "loading" ? "Checking…" : status === "done" ? "Checked ✓" : "Check Availability"}
      </button>
    </form>
  );
}

export function BookingPanel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PanelValues>({ resolver: zodResolver(panelSchema) });
  const { status, run } = useSubmitState();

  const onSubmit = handleSubmit(async () => {
    await run();
  });

  return (
    <form
      id="booking"
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-soft p-8 md:p-11"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Arrival Date">
          <input type="date" {...register("arrival")} className="field-input" />
          {errors.arrival && <FieldError text={errors.arrival.message} />}
        </Field>
        <Field label="Departure Date">
          <input type="date" {...register("departure")} className="field-input" />
          {errors.departure && <FieldError text={errors.departure.message} />}
        </Field>
        <Field label="Room Type">
          <select {...register("room")} className="field-input">
            {ROOMS.map((r) => (
              <option key={r.slug}>{r.name} — {r.bedding}</option>
            ))}
          </select>
        </Field>
        <Field label="Guests">
          <select {...register("guests")} defaultValue="2 Adults" className="field-input">
            <option>1 Adult</option>
            <option>2 Adults</option>
            <option>2 Adults, 1 Child</option>
            <option>2 Adults, 2 Children</option>
          </select>
        </Field>
        <Field label="Full Name">
          <input type="text" placeholder="Your name" {...register("name")} className="field-input" />
          {errors.name && <FieldError text={errors.name.message} />}
        </Field>
        <Field label="Email">
          <input type="email" placeholder="you@example.com" {...register("email")} className="field-input" />
          {errors.email && <FieldError text={errors.email.message} />}
        </Field>
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 bg-green-deep text-sand">
        {status === "loading"
          ? "Checking availability…"
          : status === "done"
          ? "Request received ✓"
          : "Continue to Secure Payment"}
      </button>
      <div className="flex items-center gap-3 mt-6 px-4 py-4 bg-green-pale rounded-2xl text-sm text-ink-soft">
        <Lock size={18} className="text-green-deep shrink-0" />
        <span>
          <strong className="text-green-deep">Secure payment</strong> — checkout is processed through CyberSource
          Secure Acceptance. Card details are never stored on this site.
        </span>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.72rem] uppercase tracking-wide text-ink-soft font-semibold">{label}</label>
      {children}
    </div>
  );
}

function FieldError({ text }: { text?: string }) {
  return <span className="text-xs text-red-600">{text}</span>;
}
