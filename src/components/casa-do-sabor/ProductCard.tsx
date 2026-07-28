import { useEffect, useRef, useState } from "react";
import { Leaf, Plus } from "lucide-react";
import type { MenuItem } from "./menuData";
import { useCart } from "./CartContext";
import { cn } from "@/lib/utils";
import { CupIcon } from "./CupIcon";

/**
 * Featured card for items with images
 */
export function FeaturedProductCard({ item, index }: { item: MenuItem; index: number }) {
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
        "group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl bg-white text-left shadow-[0_8px_24px_-16px_rgba(201,123,132,0.35)] ring-1 ring-blush-deep/50 transition-all duration-500 ease-out sm:w-80",
        "hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(201,123,132,0.5)] active:scale-[0.98]",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-blush/20">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {item.fit && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-terracotta backdrop-blur-sm ring-1 ring-terracotta/20">
            <Leaf className="h-3 w-3" />
            Fit 🌿
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[15px] font-semibold leading-tight text-ink">
            {item.name}
          </h3>
          <span className="font-sans text-sm font-bold text-terracotta-deep">
            {item.price}
          </span>
        </div>
        
        {item.description && (
          <p className="mt-2 line-clamp-2 text-xs italic leading-relaxed text-ink/60">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-widest text-terracotta/60">Destaque</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-white shadow-md shadow-terracotta/30 transition-transform group-hover:rotate-90">
              <Plus className="h-4 w-4" strokeWidth={3} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/**
 * Compact list item for products without images
 */
export function CompactProductItem({ item, index }: { item: MenuItem; index: number }) {
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => openProduct(item)}
      style={{ transitionDelay: `${(index % 10) * 30}ms` }}
      className={cn(
        "group flex w-full flex-col border-b border-blush-deep/30 py-4 transition-all duration-500 text-left",
        "hover:bg-blush/20",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <CupIcon className="h-3 w-3 shrink-0 text-terracotta/30 transition-colors group-hover:text-terracotta/60" />
          <h3 className="truncate font-display text-[15px] font-medium text-ink">
            {item.name}
          </h3>
          {item.fit && <span className="text-[10px] text-terracotta">🌿</span>}
          <div className="ml-1 h-px min-w-[10px] flex-1 border-t border-dotted border-ink/20" />
        </div>
        
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-sans text-sm font-semibold text-terracotta-deep">
            {item.price}
          </span>
          <Plus className="h-3 w-3 text-terracotta opacity-40 transition-opacity group-hover:opacity-100" />
        </div>
      </div>

      {item.description && (
        <p className="ml-5 mt-1 text-[11px] italic leading-relaxed text-ink/50 group-hover:text-ink/70">
          {item.description}
        </p>
      )}
    </button>
  );
}
