import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Boulder from "@/components/Boulder";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { BookingPanel } from "@/components/BookingForm";
import { ROOMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Explore the Superior and Deluxe rooms at Sibert Residence, a guest house on La Digue, Seychelles.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        crumb="Home / Rooms"
        eyebrow="Where you'll sleep"
        title="Our Rooms"
        lede="Six rooms across the guest house, each turned toward the garden or the sea — pick the one that fits how you like to travel."
        image="https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0165-scaled.jpg"
      />

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-8">
          {ROOMS.map((room, i) => (
            <article
              key={room.slug}
              id={room.slug}
              className={`grid md:grid-cols-2 gap-14 items-center py-16 ${
                i !== ROOMS.length - 1 ? "border-b border-granite-light" : ""
              }`}
            >
              <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
                <Boulder src={room.image} alt={room.name} variant={i === 0 ? 1 : 2} aspect="aspect-[6/5]" />
              </Reveal>
              <Reveal delay={0.1}>
                <span className="font-script text-3xl text-gold-deep block leading-none mb-1">{room.name}</span>
                <h2 className="font-display font-semibold text-3xl text-green-deep">{room.tagline}</h2>
                <p className="text-ink-soft mt-4">{room.description}</p>
                <p className="text-sm text-ink-soft mt-4">
                  <strong className="text-ink">Bedding:</strong> {room.bedding}
                </p>
                <ul className="flex flex-wrap gap-2.5 mt-4 mb-6">
                  {room.highlights.map((h) => (
                    <li key={h} className="bg-sand-deep text-green-deep text-sm px-3.5 py-2 rounded-full">
                      {h}
                    </li>
                  ))}
                </ul>
                <a href="#booking" className="btn-primary bg-green-deep text-sand">
                  Check Availability
                </a>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 bg-green-pale">
        <div className="max-w-[1180px] mx-auto px-8">
          <Reveal>
            <SectionHead center eyebrow="Every stay includes" title="Comfort, taken care of" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Daily Housekeeping", "Fresh linen, towels and daily room service throughout your stay."],
              ["Continental Breakfast", "Fruit, juice and local favourites to start the day right."],
              ["Free Wi-Fi & Security", "Free Wi-Fi throughout the property, with full-day security and luggage storage."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="bg-white rounded-[26px] shadow-soft p-7 h-full">
                  <h3 className="font-display text-xl text-green-deep">{title}</h3>
                  <p className="text-ink-soft text-sm mt-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-8">
          <Reveal>
            <SectionHead
              center
              eyebrow="Reserve your room"
              title="Book Your Stay"
              description="Choose your dates and room type below. Payments are processed securely."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <BookingPanel />
          </Reveal>
        </div>
      </section>
    </>
  );
}
