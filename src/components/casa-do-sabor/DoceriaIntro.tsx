import { CupIcon } from "./CupIcon";
import { DOCERIA } from "./menuData";

export function DoceriaIntro() {
  return (
    <section id={DOCERIA.id} className="scroll-mt-32 px-5 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white/80 p-7 ring-1 ring-blush-deep/60 shadow-[0_10px_36px_-22px_rgba(201,123,132,0.5)]">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 text-terracotta/60">
            <span className="h-px w-10 bg-terracotta/40" />
            <CupIcon className="h-5 w-5" />
            <span className="h-px w-10 bg-terracotta/40" />
          </div>
          <p className="mt-3 font-script text-xl text-terracotta">
            Uma história que adoça
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink">
            {DOCERIA.title}
          </h2>

          {/* Crédito da marca parceira (logo opcional, em tom neutro) */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 ring-1 ring-ink/10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">
              {DOCERIA.brand}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4 border-l-2 border-terracotta/30 pl-5">
          {DOCERIA.story.map((p) => (
            <p key={p} className="text-sm italic leading-relaxed text-ink/75">
              {p}
            </p>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-ink/45">
          {DOCERIA.note}
        </p>
      </div>
    </section>
  );
}
