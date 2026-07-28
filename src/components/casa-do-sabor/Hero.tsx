import { CupIcon } from "./CupIcon";
import { ImageIcon } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-deep/70 via-blush/60 to-cream px-5 pb-10 pt-8">
      <CupIcon className="pointer-events-none absolute -right-6 top-4 h-40 w-40 text-terracotta/10" />
      <CupIcon className="pointer-events-none absolute -left-8 bottom-2 h-28 w-28 rotate-12 text-terracotta/10" />

      <div className="relative mx-auto flex max-w-md flex-col items-center text-center animate-rise">
        <div
          data-image-slot="logo-header"
          className="mb-4 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full bg-blush ring-4 ring-white text-terracotta/70"
          aria-label="Espaço reservado para a logo"
        >
          <ImageIcon className="h-6 w-6" strokeWidth={1.4} />
          <span className="text-[9px] leading-tight text-ink/50">sua logo</span>
        </div>

        <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta ring-1 ring-terracotta/30">
          Unidade Summer Fit
        </span>

        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">
          Um cantinho{" "}
          <span className="font-script text-terracotta">feito com amor</span>{" "}
          dentro da sua rotina.
        </h1>

        <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
          Cafés especiais, lanches fresquinhos e opções{" "}
          <span className="font-semibold text-terracotta">fit</span> pra antes,
          durante e depois do treino.
        </p>

        <a
          href="#cafes"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("cafes");
            if (!el) return;
            const y = el.getBoundingClientRect().top + window.scrollY - 110;
            window.scrollTo({ top: y, behavior: "smooth" });
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-terracotta/30 transition-transform active:scale-95"
        >
          Ver cardápio
          <CupIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
