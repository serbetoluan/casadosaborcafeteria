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
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item, i) => (
          <ProductCard key={item.slug} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
