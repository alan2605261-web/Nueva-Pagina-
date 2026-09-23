import { memberStories } from "@/lib/content";
import { Placeholder } from "@/components/Placeholder";
import { PlayIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

/*
  Horizontal, scroll-snapping carousel of vertical video testimonial cards.
  Each card is a tall media placeholder with a play affordance and an overlaid
  name/role caption. Scrollbar hidden; native horizontal scroll with snap.
*/

export function MemberStories() {
  return (
    <section className="section-y bg-warm text-foreground">
      <div className="container-edge">
        <Reveal>
          <h2 className="display-md mb-10">{memberStories.title}</h2>
        </Reveal>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] pb-2">
        {memberStories.cards.map((card) => (
          <div
            key={card.name}
            className="relative aspect-[9/16] w-[clamp(240px,72vw,300px)] shrink-0 snap-start"
          >
            <Placeholder
              tone={card.tone}
              label={`${card.name}, historia`}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                  <PlayIcon className="ml-0.5 h-5 w-5" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <p className="text-base font-medium">{card.name}</p>
                <p className="text-xs opacity-80">{card.role}</p>
              </div>
            </Placeholder>
          </div>
        ))}
      </div>
    </section>
  );
}
