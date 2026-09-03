import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useCart } from "./CartContext";
import type { MenuCategory, MenuItem } from "./menuData";

type SearchResult = MenuItem & { categoryId: string; categoryTitle: string };

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function MenuSearch({ categories }: { categories: MenuCategory[] }) {
  const [query, setQuery] = useState("");
  const { openProduct } = useCart();
  const normalizedQuery = normalize(query.trim());

  const results = useMemo<SearchResult[]>(() => {
    if (normalizedQuery.length < 2) return [];

    return categories
      .flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryTitle: category.title,
        })),
      )
      .filter((item) =>
        normalize(`${item.name} ${item.description ?? ""} ${item.categoryTitle}`).includes(normalizedQuery),
      )
      .slice(0, 24);
  }, [categories, normalizedQuery]);

  return (
    <section aria-label="Pesquisar no cardápio" className="px-5 pb-6 pt-3">
      <div className="rounded-3xl border border-blush-deep/60 bg-white/80 p-4 shadow-[0_16px_40px_-28px_rgba(117,61,53,0.55)] backdrop-blur-sm sm:p-5">
        <div className="flex items-center gap-2 text-terracotta">
          <Search className="h-4 w-4" />
          <p className="font-display text-sm font-semibold text-ink">Encontre seu favorito</p>
        </div>
        <div className="relative mt-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar café, bolo, salgado..."
            aria-label="Pesquisar item do cardápio"
            className="h-12 w-full rounded-2xl border border-blush-deep/70 bg-cream/70 px-11 pr-11 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/15"
          />
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-terracotta/70" />
          {query && (
            <button
              type="button"
              aria-label="Limpar pesquisa"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-blush hover:text-terracotta"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {query.trim().length > 0 && query.trim().length < 2 && (
          <p className="mt-3 text-xs text-ink/50">Digite pelo menos duas letras para pesquisar.</p>
        )}

        {normalizedQuery.length >= 2 && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-blush-deep/50 bg-cream/45">
            {results.length > 0 ? (
              <div className="max-h-[52vh] divide-y divide-blush-deep/40 overflow-y-auto">
                {results.map((item) => (
                  <button
                    key={`${item.categoryId}-${item.slug}`}
                    type="button"
                    onClick={() => openProduct(item)}
                    className="group flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-white active:bg-white sm:px-4"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blush text-terracotta/60">
                      {item.image ? (
                        <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <Search className="h-5 w-5" />
                      )}
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-sm font-semibold text-ink">{item.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-ink/55">
                        {item.categoryTitle} · {item.price}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-terracotta/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="px-4 py-5 text-center text-sm text-ink/55">
                Não encontramos esse item. Tente outro nome ou categoria.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
