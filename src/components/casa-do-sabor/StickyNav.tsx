import { useEffect, useRef, useState } from "react";
import { CupIcon } from "./CupIcon";
import type { MenuCategory } from "./menuData";
import { cn } from "@/lib/utils";

export function StickyNav({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const chip = scrollerRef.current?.querySelector<HTMLAnchorElement>(
      `[data-chip="${active}"]`,
    );
    chip?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-blush-deep/60 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush ring-1 ring-blush-deep/70">
          <CupIcon className="h-6 w-6 text-terracotta" />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate font-display text-base font-semibold text-ink">
            Casa do Sabor
          </p>
          <p className="truncate font-script text-xs text-terracotta">
            unidade Summer Fit
          </p>
        </div>
      </div>
      <nav
        ref={scrollerRef}
        className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-3"
      >
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            data-chip={c.id}
            onClick={(e) => handleClick(e, c.id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
              active === c.id
                ? "border-terracotta bg-terracotta text-white shadow-sm"
                : "border-blush-deep/70 bg-white/70 text-ink/70 hover:text-ink",
            )}
          >
            {c.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
