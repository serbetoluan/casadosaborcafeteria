import { ShoppingBag } from "lucide-react";
import { useCart, formatBRL } from "./CartContext";

export function CartFab() {
  const { count, total, openCart } = useCart();
  if (count === 0) return null;

  return (
    <button
      onClick={openCart}
      className="fixed bottom-5 left-5 z-40 flex items-center gap-3 rounded-full bg-terracotta px-4 py-3 pr-5 text-white shadow-2xl shadow-terracotta/40 transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark active:scale-95"
      aria-label={`Abrir carrinho com ${count} itens`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
        <ShoppingBag className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1 text-[11px] font-bold text-terracotta ring-2 ring-terracotta">
          {count}
        </span>
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-wider text-white/70">Meu pedido</span>
        <span className="font-display text-sm font-semibold">{formatBRL(total)}</span>
      </span>
    </button>
  );
}
