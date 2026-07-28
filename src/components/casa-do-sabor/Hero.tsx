import { CupIcon } from "./CupIcon";
import logo from "@/assets/logo.png.asset.json";
import banner from "@/assets/banner.png.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-deep/70 via-blush/60 to-cream px-5 pb-12 pt-8">
      <CupIcon className="pointer-events-none absolute -right-6 top-4 h-40 w-40 text-terracotta/10" />
      <CupIcon className="pointer-events-none absolute -left-8 bottom-2 h-28 w-28 rotate-12 text-terracotta/10" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center animate-rise">
        <img
          src={logo.url}
          alt="Casa do Sabor"
          className="mb-3 h-28 w-28 rounded-full bg-blush object-contain p-2 ring-4 ring-white shadow-lg shadow-terracotta/20"
          loading="eager"
          style={{ animation: "cds-rise 0.7s ease-out both" }}
        />

        <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta ring-1 ring-terracotta/30">
          Unidade Summer Fit
        </span>

        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          Bem-vindo(a) à{" "}
          <span className="font-script text-terracotta">Casa do Sabor</span>
        </h1>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
          Do café da manhã ao happy hour! 🧺
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
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-terracotta/30 transition-all hover:shadow-xl hover:shadow-terracotta/40 active:scale-95"
        >
          Ver Cardápio
          <CupIcon className="h-4 w-4" />
        </a>

        <div className="relative mt-8 w-full overflow-hidden rounded-3xl ring-1 ring-blush-deep/60 shadow-xl shadow-terracotta/10">
          <img
            src={banner.url}
            alt="Ambiente da Casa do Sabor dentro da Summer Fit"
            className="aspect-[16/9] w-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
