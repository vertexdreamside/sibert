"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(5, "Tell us a little more"),
});

type Values = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = handleSubmit(async () => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
    reset();
    setTimeout(() => setStatus("idle"), 2500);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.72rem] uppercase tracking-wide text-ink-soft font-semibold">Full Name</label>
          <input type="text" placeholder="Your name" {...register("name")} className="field-input" />
          {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.72rem] uppercase tracking-wide text-ink-soft font-semibold">Email</label>
          <input type="email" placeholder="you@example.com" {...register("email")} className="field-input" />
          {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.72rem] uppercase tracking-wide text-ink-soft font-semibold">Subject</label>
        <input
          type="text"
          placeholder="Booking enquiry, excursion, general question…"
          {...register("subject")}
          className="field-input"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.72rem] uppercase tracking-wide text-ink-soft font-semibold">Message</label>
        <textarea
          placeholder="Tell us how we can help"
          rows={5}
          {...register("message")}
          className="field-input resize-y"
        />
        {errors.message && <span className="text-xs text-red-600">{errors.message.message}</span>}
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary bg-green-deep text-sand">
        {status === "loading" ? "Sending…" : status === "done" ? "Message Sent ✓" : "Send Message"}
      </button>
    </form>
  );
}
