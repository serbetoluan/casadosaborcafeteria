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
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 6) * 50}ms` }}
      className={cn(
        "group relative flex items-center gap-4 py-4 border-b border-blush/30 transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        data-image-slot={item.slug}
        className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blush to-blush-deep text-terracotta/70"
      >
        <div className="absolute inset-0 animate-pulse bg-blush/40" aria-hidden />
        <ImageIcon className="relative h-5 w-5" strokeWidth={1.4} />
        <span className="absolute bottom-1 px-1 text-center text-[8px] leading-tight text-ink/40">
          em breve
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-display text-[15px] font-semibold leading-tight text-ink">
              {item.name}
            </h3>
            {item.fit && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-blush/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-terracotta ring-1 ring-terracotta/20">
                <Leaf className="h-2.5 w-2.5" strokeWidth={2.5} />
                Fit 🌿
              </span>
            )}
          </div>
          <span className="font-sans text-sm font-bold text-terracotta-deep whitespace-nowrap">
            {item.price}
          </span>
        </div>

        {item.description && (
          <p className="mt-1 text-xs leading-relaxed text-ink/60 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
