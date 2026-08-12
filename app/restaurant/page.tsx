import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Boulder from "@/components/Boulder";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { MENU_HIGHLIGHTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Restaurant & Bar",
  description:
    "Nature's Choice A'LaKart Restaurant & Bar at Sibert Residence — authentic Creole dishes and tropical cocktails on La Digue, Seychelles.",
};

const blocks = [
  {
    eyebrow: "Our Creole Dishes",
    title: "A true taste of La Digue",
    body: "Grilled catch of the day, coconut curries and slow-cooked seafood stews, made with fresh local ingredients and served the way Creole families have cooked them for generations. Breakfast leans continental — fruit, juice, and island staples — while lunch and dinner bring out the full à la carte menu.",
    image: "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0037-scaled.jpg",
  },
  {
    eyebrow: "Our Cocktail Bar",
    title: "Tropical cocktails, easygoing evenings",
    body: "Sip cocktails made with local fruit at the bar, or unwind with a cold Seybrew as the sun drops behind the granite hills. It's the natural spot to end a day of diving, cycling or boat excursions — whether you're staying with us or just passing through.",
    image: "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0047-scaled.jpg",
  },
  {
    eyebrow: "The Terrace",
    title: "Dinner with an island soundtrack",
    body: "Our open-air terrace looks out toward the garden and the sea breeze — the kind of spot where dinner runs long and nobody minds. Packed lunches are available too, for guests heading out on excursions or exploring the island for the day.",
    image: "https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0060-scaled.jpg",
  },
];

export default function RestaurantPage() {
  return (
    <>
      <PageHero
        crumb="Home / Restaurant & Bar"
        eyebrow="Nature's Choice A'LaKart"
        title="Restaurant & Bar"
        lede="Creole flavours cooked with island ingredients, and a bar built for slow evenings — open to guests and visitors alike."
        image="https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0037-scaled.jpg"
      />

      <section className="py-24">
        <div className="max-w-[1180px] mx-auto px-8">
          {blocks.map((b, i) => (
            <div
              key={b.title}
              className={`grid md:grid-cols-2 gap-14 items-center py-16 ${
                i !== blocks.length - 1 ? "border-b border-granite-light" : ""
              }`}
            >
              <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
                <Boulder src={b.image} alt={b.title} variant={((i % 3) + 1) as 1 | 2 | 3} aspect="aspect-[6/5]" />
              </Reveal>
              <Reveal delay={0.1}>
                <span className="font-script text-3xl text-gold-deep block leading-none mb-1">{b.eyebrow}</span>
                <h2 className="font-display font-semibold text-3xl text-green-deep">{b.title}</h2>
                <p className="text-ink-soft mt-4">{b.body}</p>
              </Reveal>
            </div>
          ))}
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
              src="https://sibert.sc/wp-content/uploads/2025/10/IMG-20250911-WA0165-scaled.jpg"
              alt="Evening at Sibert Residence"
              variant={2}
              aspect="aspect-[4/4.6]"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
