import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Boulder from "@/components/Boulder";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { MENU_HIGHLIGHTS, RESTAURANT_PHOTOS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Restaurant & Bar",
  description:
    "Nature's Choice A'LaKart Restaurant & Bar at Sibert Residence — authentic Creole dishes and tropical cocktails on La Digue, Seychelles.",
};

export default function RestaurantPage() {
  return (
    <>
      <PageHero
        crumb="Home / Restaurant & Bar"
        eyebrow="Nature's Choice A'LaKart"
        title="Restaurant & Bar"
        lede="Creole flavours cooked with island ingredients, and a bar built for slow evenings — open to guests and visitors alike."
        image={RESTAURANT_PHOTOS[0].image}
      />

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-8">
          <Reveal>
            <SectionHead
              center
              eyebrow="Take a look inside"
              title="Our Restaurant & Bar"
              description="A few corners of the space, exactly as they are today."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {RESTAURANT_PHOTOS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <article className="bg-white rounded-[26px] overflow-hidden shadow-soft h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg text-green-deep">{p.title}</h3>
                    <p className="text-ink-soft text-sm mt-2">{p.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-green-pale">
        <div className="max-w-[1180px] mx-auto px-8">
          <Reveal>
            <SectionHead
              center
              eyebrow="A taste of the menu"
              title="Creole Favourites"
              description="A sample of what's often on the table — the full à la carte menu changes with the day's catch and season."
            />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-16">
            {MENU_HIGHLIGHTS.map((d, i) => (
              <Reveal key={d.name} delay={(i % 3) * 0.08}>
                <div className="flex justify-between gap-5 py-4 border-b border-dashed border-granite-light">
                  <div>
                    <h4 className="font-display text-lg text-green-deep">{d.name}</h4>
                    <p className="text-ink-soft text-sm mt-1">{d.note}</p>
                  </div>
                  <span className="font-display text-gold-deep whitespace-nowrap">{d.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-ink-soft text-sm mt-7">
            Prices shown in Seychelles Rupees (SCR) for illustration — final menu and pricing supplied by Sibert
            Residence.
          </p>
        </div>
      </section>

      <section className="py-24 bg-green-deep text-sand">
        <div className="max-w-[1180px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="font-script text-3xl text-gold block leading-none mb-1">Opening Hours</span>
            <h2 className="font-display font-semibold text-3xl text-sand">
              Breakfast, lunch &amp; dinner, seven days a week
            </h2>
            <div className="mt-4">
              {[
                ["7–10", "Breakfast — continental spread with fruit and juice"],
                ["12–3", "Lunch — à la carte and packed lunches for excursions"],
                ["6–10", "Dinner & bar — full menu and cocktails"],
              ].map(([time, label]) => (
                <div key={time} className="grid grid-cols-[100px_1fr] gap-6 py-5 border-t border-white/15">
                  <span className="font-display text-xl text-gold">{time}</span>
                  <p className="text-granite-light m-0">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Boulder
              src="/images/restaurant/entrance-barrels-3.jpg"
              alt="Sibert Residence Restaurant & Bar entrance"
              variant={2}
              aspect="aspect-[4/4.6]"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
