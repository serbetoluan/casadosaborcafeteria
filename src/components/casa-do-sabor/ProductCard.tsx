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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
      className={cn(
        "flex gap-4 rounded-3xl bg-white p-3 shadow-[0_8px_24px_-14px_rgba(201,123,132,0.35)] ring-1 ring-blush-deep/40 transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        data-image-slot={item.slug}
        className="relative flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl bg-blush text-terracotta/70"
      >
        <ImageIcon className="h-6 w-6" strokeWidth={1.4} />
        <span className="px-1 text-center text-[10px] leading-tight text-ink/50">
          imagem em breve
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug text-ink">
            {item.name}
          </h3>
          {item.fit && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-blush px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-terracotta ring-1 ring-terracotta/40">
              <Leaf className="h-3 w-3" strokeWidth={2} />
              Fit
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-ink/60">
          {item.description}
        </p>
        <p className="mt-auto pt-2 font-sans text-sm font-semibold text-terracotta-deep">
          {item.price}
        </p>
      </div>
    </article>
  );
}
