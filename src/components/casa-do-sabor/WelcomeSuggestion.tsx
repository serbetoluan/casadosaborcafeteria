import { useEffect, useState } from "react";
import { CupIcon } from "./CupIcon";
import { cn } from "@/lib/utils";
import { navSections } from "./menuData";

type Intent = {
  key: string;
  label: string;
  emoji: string;
  hint: string;
  categories: string[];
};

const INTENTS: Intent[] = [
  {
    key: "manha",
    label: "Café da manhã",
    emoji: "☕",
    hint: "Para começar o dia",
    categories: ["quitandinhas", "quentinhas", "folhados"],
  },
  {
    key: "tarde",
    label: "Lanche da tarde",
    emoji: "🥐",
    hint: "Aquela pausa gostosa",
    categories: ["lanchinhos", "salgados", "folhados"],
  },
  {
    key: "refrescar",
    label: "Para refrescar",
    emoji: "🧊",
    hint: "Gelado e leve",
    categories: ["refrescar", "geladeira"],
  },
];

const STORAGE_KEY = "cds-welcome-seen";
const SCROLL_OFFSET = 110;

function titleOf(id: string) {
  return navSections.find((s) => s.id === id)?.title ?? id;
}

export function WelcomeSuggestion() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<Intent | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const goTo = (id: string) => {
    close();
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 320);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sugestão de cardápio"
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-rise w-full max-w-md rounded-t-3xl bg-cream p-6 pb-8 shadow-2xl shadow-ink/20 ring-1 ring-blush-deep/60 sm:rounded-3xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 text-terracotta/60">
            <span className="h-px w-8 bg-terracotta/40" />
            <CupIcon className="h-5 w-5" />
            <span className="h-px w-8 bg-terracotta/40" />
          </div>
          <p className="mt-3 font-script text-xl text-terracotta">
            {intent ? "Que tal começar por aqui?" : "Deixa a gente te sugerir"}
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">
            {intent ? intent.label : "O que você deseja hoje?"}
          </h2>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          {!intent &&
            INTENTS.map((it) => (
              <button
                key={it.key}
                type="button"
                onClick={() => setIntent(it)}
                className="flex items-center gap-3 rounded-2xl border border-blush-deep/70 bg-white/80 px-4 py-3.5 text-left transition-all hover:border-terracotta hover:shadow-md hover:shadow-terracotta/10 active:scale-[0.98]"
              >
                <span className="text-2xl">{it.emoji}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">
                    {it.label}
                  </span>
                  <span className="block text-xs text-ink/55">{it.hint}</span>
                </span>
                <span className="ml-auto text-terracotta">→</span>
              </button>
            ))}

          {intent &&
            intent.categories.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => goTo(id)}
                className="flex items-center gap-3 rounded-2xl border border-terracotta/30 bg-white/80 px-4 py-3.5 text-left text-sm font-semibold text-ink transition-all hover:border-terracotta hover:bg-blush/60 active:scale-[0.98]"
              >
                {titleOf(id)}
                <span className="ml-auto text-terracotta">→</span>
              </button>
            ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          {intent && (
            <button
              type="button"
              onClick={() => setIntent(null)}
              className={cn(
                "text-xs font-medium text-ink/50 underline underline-offset-4 transition-colors hover:text-terracotta",
              )}
            >
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={close}
            className="text-xs font-medium text-ink/50 underline underline-offset-4 transition-colors hover:text-terracotta"
          >
            Prefiro escolher
          </button>
        </div>
      </div>
    </div>
  );
}
