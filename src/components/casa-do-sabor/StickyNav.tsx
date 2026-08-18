import { useEffect, useRef, useState } from "react";
import { CupIcon } from "./CupIcon";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png.asset.json";

type NavItem = { id: string; title: string };

export function StickyNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  // Duas barras (desktop e mobile) precisam de refs próprias — compartilhar um
  // único ref fazia a última montada sobrescrever a outra e o auto-scroll do
  // chip ativo parava de funcionar no desktop.
  const desktopScrollerRef = useRef<HTMLElement>(null);
  const mobileScrollerRef = useRef<HTMLElement>(null);

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
    items.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!active) return;
    for (const scroller of [desktopScrollerRef.current, mobileScrollerRef.current]) {
      const chip = scroller?.querySelector<HTMLAnchorElement>(`[data-chip="${active}"]`);
      if (!chip || !scroller) continue;
      // scrollLeft manual evita que o scrollIntoView arraste a página inteira.
      const target = chip.offsetLeft - scroller.clientWidth / 2 + chip.clientWidth / 2;
      scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }
  }, [active]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-40 hidden border-b border-blush-deep/60 bg-cream/90 backdrop-blur-md md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <img
            src={logo.url}
            alt="Casa do Sabor"
            className="h-11 w-11 shrink-0 rounded-full bg-blush object-contain p-0.5 ring-1 ring-blush-deep/70"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-base font-semibold text-ink">
              Casa do Sabor
            </p>
            <p className="truncate font-script text-xs text-terracotta">
              Casa 1 & Casa 2
            </p>
          </div>
          <CupIcon className="ml-auto h-6 w-6 text-terracotta" />
        </div>
        <nav
          ref={desktopScrollerRef}
          className="scrollbar-none mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3"
        >
          {items.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              data-chip={c.id}
              onClick={(e) => handleClick(e, c.id)}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
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

      {/* Mobile-only Menu Header with navigation bar */}
      <header className="sticky top-0 z-40 border-b border-blush-deep/60 bg-cream/90 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <img
            src={logo.url}
            alt="Casa do Sabor"
            className="h-10 w-10 shrink-0 rounded-full bg-blush object-contain p-0.5 ring-1 ring-blush-deep/70"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-base font-semibold text-ink">
              Casa do Sabor
            </p>
            <p className="truncate font-script text-xs text-terracotta">
              Casa 1 & Casa 2
            </p>
          </div>
          <CupIcon className="ml-auto h-5 w-5 text-terracotta" />
        </div>
        <nav
          ref={mobileScrollerRef}
          className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-3"
        >
          {items.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              data-chip={c.id}
              onClick={(e) => handleClick(e, c.id)}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition-all duration-300",
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
    </>
  );
}
