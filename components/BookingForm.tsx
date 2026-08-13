"use client";

import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import type { Room, Availability } from "@/lib/content";
import DateField from "@/components/DateField";
import { fromISODate } from "@/lib/date";

const compactSchema = z.object({
  arrival: z.string().min(1, "Required"),
  departure: z.string().min(1, "Required"),
  adults: z.string(),
  children: z.string(),
});

const panelSchema = z.object({
  arrival: z.string().min(1, "Required"),
  departure: z.string().min(1, "Required"),
  room: z.string().min(1, "Required"),
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

/** Every room's blocked dates merged — used where no single room is selected yet. */
function allBlockedDates(availability: Availability): string[] {
  return Array.from(new Set(Object.values(availability.blockedDates).flat()));
}

export function BookingWidgetCompact({ availability }: { availability: Availability }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompactValues>({
    resolver: zodResolver(compactSchema),
    defaultValues: { arrival: "", departure: "", adults: "2", children: "0" },
  });
  const { status, run } = useSubmitState();
  const arrival = watch("arrival");
  const blocked = useMemo(() => allBlockedDates(availability), [availability]);

  const onSubmit = handleSubmit(async () => {
    await run();
  });

  return (
    <form
      id="booking"
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-[0_30px_60px_-24px_rgba(15,61,46,0.4)] p-5 sm:p-6 md:p-7 -mt-16 sm:-mt-24 md:-mt-32 relative z-[5] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end"
    >
      <Controller
        control={control}
        name="arrival"
        render={({ field }) => (
          <DateField label="Arrival" value={field.value} onChange={field.onChange} blockedDates={blocked} />
        )}
      />
      <Controller
        control={control}
        name="departure"
        render={({ field }) => (
          <DateField
            label="Departure"
            value={field.value}
            onChange={field.onChange}
            blockedDates={blocked}
            minDate={arrival ? fromISODate(arrival) : undefined}
          />
        )}
      />
      <Field label="Adults">
        <Controller
          control={control}
          name="adults"
          render={({ field }) => (
            <select {...field} className="field-input">
              {[1, 2, 3, 4].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          )}
        />
      </Field>
      <Field label="Children">
        <Controller
          control={control}
          name="children"
          render={({ field }) => (
            <select {...field} className="field-input">
              {[0, 1, 2].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          )}
        />
      </Field>
      <button type="submit" disabled={status === "loading"} className="btn-primary justify-center whitespace-nowrap">
        {status === "loading" ? "Checking…" : status === "done" ? "Checked ✓" : "Check Availability"}
      </button>
      {(errors.arrival || errors.departure) && (
        <p className="sm:col-span-2 md:col-span-5 text-xs text-red-600 -mt-2">Pick your arrival and departure dates.</p>
      )}
    </form>
  );
}

export function BookingPanel({ rooms, availability }: { rooms: Room[]; availability: Availability }) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PanelValues>({
    resolver: zodResolver(panelSchema),
    defaultValues: {
      arrival: "",
      departure: "",
      room: rooms[0]?.slug ?? "",
      guests: "2 Adults",
      name: "",
      email: "",
    },
  });
  const { status, run } = useSubmitState();
  const arrival = watch("arrival");
  const roomSlug = watch("room");
  const blocked = useMemo(
    () => availability.blockedDates[roomSlug] ?? [],
    [availability, roomSlug]
  );

  const onSubmit = handleSubmit(async () => {
    await run();
  });

  return (
    <form id="booking" onSubmit={onSubmit} className="bg-white rounded-3xl shadow-soft p-6 sm:p-8 md:p-11">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Controller
          control={control}
          name="arrival"
          render={({ field }) => (
            <DateField label="Arrival Date" value={field.value} onChange={field.onChange} blockedDates={blocked} />
          )}
        />
        <Controller
          control={control}
          name="departure"
          render={({ field }) => (
            <DateField
              label="Departure Date"
              value={field.value}
              onChange={field.onChange}
              blockedDates={blocked}
              minDate={arrival ? fromISODate(arrival) : undefined}
            />
          )}
        />
        <Field label="Room Type">
          <select {...register("room")} className="field-input">
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name} — {r.bedding}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Guests">
          <select {...register("guests")} className="field-input">
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
      <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full sm:w-auto justify-center bg-green-deep text-sand">
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
