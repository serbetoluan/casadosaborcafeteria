import { useEffect, useRef, useState } from "react";
import { ImageIcon, Leaf } from "lucide-react";
import type { MenuItem } from "./menuData";
import { cn } from "@/lib/utils";

export function ProductCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      className={cn(
        "group flex h-full flex-col rounded-3xl bg-white p-4 shadow-[0_8px_24px_-16px_rgba(201,123,132,0.35)] ring-1 ring-blush-deep/50 transition-all duration-500 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(201,123,132,0.5)] hover:scale-[1.02] active:scale-[0.99]",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        data-image-slot={item.slug}
        className="relative mb-3 flex aspect-[4/3] w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl bg-gradient-to-br from-blush to-blush-deep text-terracotta/70"
      >
        <div className="absolute inset-0 animate-pulse bg-blush/40" aria-hidden />
        <ImageIcon className="relative h-6 w-6" strokeWidth={1.4} />
        <span className="relative px-1 text-center text-[10px] leading-tight text-ink/50">
          imagem em breve
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">
            {item.name}
          </h3>
          {item.fit && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-blush px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-terracotta ring-1 ring-terracotta/40">
              <Leaf className="h-3 w-3" strokeWidth={2} />
              Fit
            </span>
          )}
        </div>

        {item.description && (
          <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-3">
          <span className="inline-flex items-center rounded-xl border border-terracotta/40 bg-blush/40 px-3 py-1 font-sans text-sm font-semibold text-terracotta-deep">
            {item.price}
          </span>
        </div>
      </div>
    </article>
  );
}
