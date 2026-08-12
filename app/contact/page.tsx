import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sibert Residence, La Passe, La Digue, Seychelles.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Home / Contact"
        eyebrow="We'd love to hear from you"
        title="Contact Us"
        lede="Questions about a room, a table, or an excursion? Reach out and our team will get back to you."
        image="https://sibert.sc/wp-content/uploads/2025/10/sibert-residence-b-8899.jpg"
      />

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-8 grid md:grid-cols-2 gap-14">
          <Reveal>
            <span className="font-script text-3xl text-gold-deep block leading-none mb-1">Find us</span>
            <h2 className="font-display font-semibold text-3xl text-green-deep">La Passe, La Digue</h2>
            <ul className="mt-6 space-y-5">
              {[
                { icon: MapPin, label: "Address", value: `${SITE.address} — about a 5-minute ride from the jetty` },
                { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
                { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: Clock, label: "Reception", value: "Open daily, full-day security on site" },
              ].map((item) => (
                <li key={item.label} className="flex gap-4 items-start">
                  <span className="w-11 h-11 rounded-full bg-green-pale text-green-deep flex items-center justify-center shrink-0">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <strong className="block text-ink">{item.label}</strong>
                    {item.href ? (
                      <a href={item.href} className="text-ink-soft hover:text-green-deep">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-ink-soft m-0">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <iframe
              loading="lazy"
              className="w-full h-[340px] rounded-[26px] shadow-soft border-0 mt-8 grayscale-[15%] saturate-[1.1]"
              src="https://maps.google.com/maps?q=La%20Passe%2C%20La%20Digue%2C%20Seychelles&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Map to Sibert Residence, La Digue"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <span className="font-script text-3xl text-gold-deep block leading-none mb-1">Send a message</span>
            <h2 className="font-display font-semibold text-3xl text-green-deep mb-6">Get in Touch</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-green-pale text-center">
        <div className="max-w-[1180px] mx-auto px-8">
          <Reveal>
            <span className="font-script text-3xl text-gold-deep block leading-none mb-1">Prefer to just book?</span>
            <h2 className="font-display font-semibold text-3xl text-green-deep mb-6">
              Check availability and reserve online
            </h2>
            <Link href="/rooms#booking" className="btn-primary bg-green-deep text-sand">
              Book Your Stay
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
