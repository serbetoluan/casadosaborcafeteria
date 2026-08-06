import { useEffect, useMemo, useRef, useState } from "react";
import { X, Minus, Plus, Leaf, ShoppingBag } from "lucide-react";
import { useCart, formatBRL, ADDON_PRICES } from "./CartContext";
import { cn } from "@/lib/utils";

export function ProductModal() {
  const { activeItem, closeProduct, addLine, openCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeItem) {
      setQuantity(1);
      setSelections({});
      setNote("");
      setErrors([]);
      // garante que cada produto abra sempre no topo (bug no mobile ao trocar de item)
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [activeItem]);

  // Histórico (botão voltar do celular), tecla Esc e trava de scroll do body
  // são controlados de forma centralizada no CartProvider para evitar
  // conflitos entre o modal de produto e o carrinho.




  const addonsTotal = useMemo(() => {
    return Object.values(selections)
      .flat()
      .reduce((acc, choice) => acc + (ADDON_PRICES[choice] ?? 0), 0);
  }, [selections]);

  if (!activeItem) return null;

  const unitPrice = activeItem.priceValue + addonsTotal;
  const lineTotal = unitPrice * quantity;

  const toggleChoice = (label: string, choice: string, multi?: boolean) => {
    setErrors((prev) => prev.filter((l) => l !== label));
    setSelections((prev) => {

      const current = prev[label] ?? [];
      if (multi) {
        return {
          ...prev,
          [label]: current.includes(choice) ? current.filter((c) => c !== choice) : [...current, choice],
        };
      }
      return { ...prev, [label]: [choice] };
    });
  };

  /** Valida os grupos obrigatórios; retorna true quando o item pôde ser adicionado. */
  const commit = (): boolean => {
    const missing = (activeItem.options ?? [])
      .filter((g) => g.required && !selections[g.label]?.length)
      .map((g) => g.label);
    if (missing.length) {
      setErrors(missing);
      // leva o usuário até a primeira pendência (essencial no mobile)
      requestAnimationFrame(() => {
        scrollRef.current
          ?.querySelector("[data-option-error='true']")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return false;
    }
    addLine({ item: activeItem, quantity, selections, note: note.trim() || undefined, unitPrice });
    return true;
  };

  const handleAdd = () => {
    if (commit()) closeProduct();
  };

  const handleAddAndGoToCart = () => {
    if (commit()) openCart();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center animate-in fade-in duration-200"
      onClick={closeProduct}
    >
      <div
        ref={scrollRef}
        className="relative flex max-h-[95vh] w-full max-w-lg flex-col overflow-y-auto overflow-x-hidden overscroll-contain rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={closeProduct}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        {activeItem.image ? (
          <div className="relative aspect-[3/4] shrink-0 overflow-hidden bg-cream">
            <img
              src={activeItem.image}
              alt={activeItem.name}
              className="h-full w-full object-cover"
            />
            {activeItem.fit && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-terracotta ring-1 ring-terracotta/40 backdrop-blur-sm">
                <Leaf className="h-3 w-3" strokeWidth={2} />
                Fit
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ) : activeItem.fit ? (
          <div className="flex h-12 shrink-0 items-center px-5 pt-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-terracotta ring-1 ring-terracotta/40">
              <Leaf className="h-3 w-3" strokeWidth={2} />
              Fit
            </span>
          </div>
        ) : null}

        <div className="flex-1 px-5 py-5">
          <div className={cn(
            "relative z-10",
            activeItem.image && "-mt-24 rounded-t-3xl bg-cream/98 backdrop-blur-xl px-5 pt-8 pb-3 -mx-5 shadow-[0_-12px_40px_rgba(0,0,0,0.15)] border-t border-white/20"
          )}>
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
              {activeItem.name}
            </h3>
            {activeItem.description && (
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{activeItem.description}</p>
            )}
            <p className="mt-3 font-sans text-lg font-semibold text-terracotta-deep">
              {formatBRL(activeItem.priceValue)}
            </p>
          </div>

          {(activeItem.options ?? []).map((group) => (
            <div key={group.label} className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-display text-sm font-semibold text-ink">
                  {group.label}
                  {group.required && <span className="ml-1 text-terracotta">*</span>}
                </p>
                {group.multi && (
                  <span className="text-[10px] uppercase tracking-wider text-ink/40">Múltipla escolha</span>
                )}
              </div>
              {errors.includes(group.label) && (
                <p data-option-error="true" className="mb-2 text-xs text-terracotta-deep">
                  Escolha uma opção para continuar.
                </p>
              )}

              <div className="flex flex-col gap-2">
                {group.choices.map((choice) => {
                  const selected = (selections[group.label] ?? []).includes(choice);
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => toggleChoice(group.label, choice, group.multi)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all",
                        selected
                          ? "border-terracotta bg-terracotta/5 text-ink shadow-sm"
                          : "border-blush-deep/60 bg-white text-ink/80 hover:border-terracotta/50",
                      )}
                    >
                      <span>{choice}</span>
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                          selected ? "border-terracotta bg-terracotta" : "border-blush-deep",
                        )}
                      >
                        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="block font-display text-sm font-semibold text-ink">
                  Observação <span className="text-ink/40 font-normal">(opcional)</span>
                </label>
                
                {/* Quantity selector moved above observation field for mobile context as requested */}
                <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-blush/60 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm hover:bg-cream active:scale-95 sm:h-8 sm:w-8"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-display text-xs font-semibold text-ink">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm hover:bg-cream active:scale-95 sm:h-8 sm:w-8"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ex: sem açúcar, embalar pra viagem..."
                rows={2}
                className="w-full resize-none rounded-xl border border-blush-deep/60 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex shrink-0 flex-row items-center gap-2 border-t border-blush-deep/40 bg-white/95 backdrop-blur-md px-3 pb-8 pt-3 sm:gap-3 sm:px-4 sm:pb-4">
          <button
            onClick={handleAddAndGoToCart}
            className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-terracotta px-3 py-2.5 font-display text-[13px] font-semibold text-white shadow-lg shadow-terracotta/30 transition-all hover:bg-terracotta-dark active:scale-[0.98] sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" />
            <span className="truncate text-center">Finalizar</span>
            <span className="shrink-0">{formatBRL(lineTotal)}</span>
          </button>
          
          <button
            onClick={handleAdd}
            className="flex min-w-0 flex-1 items-center justify-center rounded-full border-2 border-terracotta/20 bg-white px-3 py-2.5 font-display text-[13px] font-semibold text-terracotta transition-all hover:bg-terracotta/5 active:scale-[0.98] sm:px-5 sm:py-3 sm:text-sm"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
