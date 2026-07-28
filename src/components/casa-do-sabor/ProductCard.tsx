import { useEffect, useRef, useState } from "react";
import { ImageIcon, Leaf, Plus } from "lucide-react";
import type { MenuItem } from "./menuData";
import { useCart } from "./CartContext";
import { cn } from "@/lib/utils";

export function ProductCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const { openProduct } = useCart();

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
    <button
      ref={ref}
      type="button"
      onClick={() => openProduct(item)}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      className={cn(
        "group relative flex w-full items-start gap-4 rounded-2xl bg-white p-4 text-left shadow-[0_8px_24px_-16px_rgba(201,123,132,0.35)] ring-1 ring-blush-deep/50 transition-all duration-500 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(201,123,132,0.5)] hover:scale-[1.01] active:scale-[0.99]",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        className="relative flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-gradient-to-br from-blush to-blush-deep text-terracotta/70"
      >
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <>
            <div className="absolute inset-0 animate-pulse bg-blush/40" aria-hidden />
            <ImageIcon className="relative h-5 w-5" strokeWidth={1.4} />
            <span className="relative px-1 text-center text-[9px] leading-tight text-ink/50">
              imagem em breve
            </span>
          </>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
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
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink/60">
            {item.description}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-sans text-sm font-semibold text-terracotta-deep">
            {item.price}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-white shadow-md shadow-terracotta/30 transition-transform group-hover:scale-110 group-active:scale-95">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </button>
  );
}
