import { AnimatedMenuIcon } from "./AnimatedMenuIcon";
import { CupIcon } from "./CupIcon";
import logo from "@/assets/logo.png.asset.json";
import banner from "@/assets/banner-v2.png.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-deep/70 via-blush/60 to-cream px-5 pb-12 pt-8">
      <CupIcon className="pointer-events-none absolute -right-6 top-4 h-40 w-40 text-terracotta/10" />
      <CupIcon className="pointer-events-none absolute -left-8 bottom-2 h-28 w-28 rotate-12 text-terracotta/10" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center animate-rise">
        {/* Banner as the base layer */}
        <div className="relative w-full overflow-hidden rounded-3xl ring-2 ring-terracotta/20 shadow-xl shadow-terracotta/10">
          <img
            src={banner.url}
            alt="Ambiente acolhedor da Casa do Sabor"
            className="aspect-[4/2] w-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Logo overlapping the bottom of the banner */}
        <div className="relative -mt-14 flex flex-col items-center text-center">
          <div
            className="relative mb-3 h-32 w-32"
            style={{ animation: "cds-rise 0.7s ease-out both" }}
          >
            {/* Soft themed glow behind the ring */}
            <div className="story-ring-glow pointer-events-none absolute inset-0 rounded-full bg-terracotta/40 blur-lg" />
            {/* Rotating gradient ring */}
            <div className="story-ring-spin absolute inset-0 rounded-full" />
            {/* Inner gap so the ring reads like Instagram's story border */}
            <div className="absolute inset-[3px] rounded-full bg-cream" />
            <img
              src={logo.url}
              alt="Casa do Sabor"
              className="absolute inset-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full bg-blush object-contain p-2 shadow-lg shadow-terracotta/20"
              loading="eager"
            />
          </div>

          <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta ring-1 ring-terracotta/30">
            Casa 1 · Casa 2
          </span>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Bem-vindo(a) à <span className="font-script text-terracotta">Casa do Sabor</span>
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
            Do café da manhã ao happy hour! 🧺
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="max-w-xs text-xs italic leading-relaxed text-ink/50 sm:text-sm">
              "O Propósito da Casa está em transformar o seu cafezinho..."
            </p>
            <a
              href="#quitandinhas"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("quitandinhas");
                if (!el) return;
                const y = el.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({ top: y, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-terracotta/30 transition-all hover:shadow-xl hover:shadow-terracotta/40 active:scale-95"
            >
              Ver Cardápio
              <AnimatedMenuIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
