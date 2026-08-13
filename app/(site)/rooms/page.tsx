import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Boulder from "@/components/Boulder";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { BookingPanel } from "@/components/BookingForm";
import { getExteriorImages, getPricing, getRooms, getAvailability } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Explore the Superior and Deluxe rooms at Sibert Residence, a guest house on La Digue, Seychelles.",
};

export default async function RoomsPage() {
  const [exteriorImages, pricing, rooms, availability] = await Promise.all([
    getExteriorImages(),
    getPricing(),
    getRooms(),
    getAvailability(),
  ]);

  return (
    <>
      <PageHero
        crumb="Home / Rooms"
        eyebrow="Where you'll sleep"
        title="Our Rooms"
        lede="Two room types, each turned toward the garden or the sea — pick the one that fits how you like to travel."
        image={exteriorImages.hero}
      />

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          {rooms.map((room, i) => (
            <article
              key={room.slug}
              id={room.slug}
              className={`grid md:grid-cols-2 gap-14 items-center py-16 ${
                i !== rooms.length - 1 ? "border-b border-granite-light" : ""
              }`}
            >
              <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
                <Boulder src={room.image} alt={room.name} variant={i === 0 ? 1 : 2} aspect="aspect-[6/5]" />
              </Reveal>
              <Reveal delay={0.1}>
                <span className="font-script text-3xl text-gold-deep block leading-none mb-1">{room.name}</span>
                <h2 className="font-display font-semibold text-3xl text-green-deep">{room.tagline}</h2>
                <p className="text-ink-soft mt-4">{room.description}</p>
                <p className="font-display text-2xl text-gold-deep mt-4">
                  from €{room.priceFrom} <span className="text-sm font-body text-ink-soft">/ night, B&amp;B, low season</span>
                </p>
                <p className="text-sm text-ink-soft mt-2">
                  <strong className="text-ink">Bedding:</strong> {room.bedding} &nbsp;·&nbsp;{" "}
                  <strong className="text-ink">Occupancy:</strong> {room.occupancy}
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
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
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

      <section className="py-24 bg-green-deep text-sand">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <Reveal>
            <span className="font-script text-3xl text-gold block leading-none mb-1">2026 / 2027 Rates</span>
            <h2 className="font-display font-semibold text-3xl text-sand">Room Rates by Season</h2>
            <p className="text-granite-light mt-3 max-w-2xl">
              Valid {pricing.validity}. {pricing.note}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-x-auto mt-8 rounded-2xl border border-white/15">
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="bg-white/5">
                    <th className="py-4 px-5 font-display text-sand text-base font-medium">Room Type</th>
                    <th className="py-4 px-5 font-display text-sand text-base font-medium">Low Season</th>
                    <th className="py-4 px-5 font-display text-sand text-base font-medium">High Season</th>
                    <th className="py-4 px-5 font-display text-sand text-base font-medium">Peak Season</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.rates.map((r) => (
                    <tr key={r.room} className="border-t border-white/10">
                      <td className="py-4 px-5 text-sand font-medium">{r.room}</td>
                      <td className="py-4 px-5 text-gold font-display text-lg">€{r.low}</td>
                      <td className="py-4 px-5 text-gold font-display text-lg">€{r.high}</td>
                      <td className="py-4 px-5 text-gold font-display text-lg">€{r.peak}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-3 gap-8 mt-10">
              <div>
                <h3 className="font-display text-lg text-sand mb-3">Season Dates</h3>
                <ul className="space-y-3 text-sm text-granite-light">
                  {pricing.seasons.map((s) => (
                    <li key={s.name}>
                      <strong className="text-gold">{s.name}:</strong> {s.dates}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg text-sand mb-3">Prepayment</h3>
                <ul className="space-y-2.5 text-sm text-granite-light list-disc pl-4">
                  {pricing.prepayment.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg text-sand mb-3">Good to Know</h3>
                <ul className="space-y-2.5 text-sm text-granite-light list-disc pl-4">
                  {pricing.extras.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm text-granite-light mt-8">{pricing.occupancy}</p>
            <p className="text-sm text-granite-light mt-2">
              Cancellation: {pricing.cancellation.join(" · ")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <Reveal>
            <SectionHead
              center
              eyebrow="Reserve your room"
              title="Book Your Stay"
              description="Choose your dates and room type below. Payments are processed securely."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <BookingPanel rooms={rooms} availability={availability} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
