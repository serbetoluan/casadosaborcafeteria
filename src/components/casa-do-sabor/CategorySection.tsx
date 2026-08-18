import { CupIcon } from "./CupIcon";
import { ProductCard } from "./ProductCard";
import type { MenuCategory } from "./menuData";

export function CategorySection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.id} className="scroll-mt-32 px-5 py-10">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 text-terracotta/60">
          <span className="h-px w-10 bg-terracotta/40" />
          <CupIcon className="h-5 w-5" />
          <span className="h-px w-10 bg-terracotta/40" />
        </div>
        <p className="mt-3 font-script text-xl text-terracotta">
          {category.tagline}
        </p>
        <h2 className="font-display text-3xl font-semibold text-ink">
          {category.title}
        </h2>
        {category.subtitle && (
          <p className="mt-1 text-sm leading-relaxed text-ink/60">
            {category.subtitle}
          </p>
        )}

        {category.partner && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 ring-1 ring-ink/10">
            {category.partner.logo && (
              <img
                src={category.partner.logo}
                alt={category.partner.name}
                className="h-4 w-4 object-contain opacity-70 grayscale"
                loading="lazy"
              />
            )}
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">
              {category.partner.name}
            </span>
          </div>
        )}

        {category.notice && (
          <p className="mt-3 max-w-xs text-[11px] leading-relaxed text-ink/45">
            {category.notice}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-x-12">
        {[...category.items]
          .sort((a, b) => {
            if (a.image && !b.image) return -1;
            if (!a.image && b.image) return 1;
            return 0;
          })
          .map((item, i) => (
            <ProductCard key={item.slug} item={item} index={i} />
          ))}
      </div>
    </section>
  );
}
