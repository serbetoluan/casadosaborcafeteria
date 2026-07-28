import { CupIcon } from "./CupIcon";
import { FeaturedProductCard, CompactProductItem } from "./ProductCard";
import type { MenuCategory } from "./menuData";

export function CategorySection({ category }: { category: MenuCategory }) {
  const itemsWithImage = category.items.filter((item) => item.image);
  const itemsWithoutImage = category.items.filter((item) => !item.image);

  return (
    <section id={category.id} className="scroll-mt-32 px-5 py-12">
      <div className="mb-10 flex flex-col items-center text-center">
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

      {/* Featured Section (Items with image) */}
      {itemsWithImage.length > 0 && (
        <div className="mb-8">
          {itemsWithImage.length >= 3 ? (
            <div className="relative -mx-5 overflow-hidden">
              <div 
                className="flex gap-4 overflow-x-auto px-5 pb-6 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {itemsWithImage.map((item, i) => (
                  <div key={item.slug} className="snap-center">
                    <FeaturedProductCard item={item} index={i} />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background/40 to-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {itemsWithImage.map((item, i) => (
                <div key={item.slug} className="w-full">
                  <FeaturedProductCard item={item} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Compact List Section (Items without image) */}
      {itemsWithoutImage.length > 0 && (
        <div className={itemsWithImage.length > 0 ? "mt-4" : ""}>
          <div className="flex flex-col">
            {itemsWithoutImage.map((item, i) => (
              <CompactProductItem 
                key={item.slug} 
                item={item} 
                index={i + (itemsWithImage.length)} 
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
