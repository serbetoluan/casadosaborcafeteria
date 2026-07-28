import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "./menuData";

export type CartLine = {
  id: string;
  item: MenuItem;
  quantity: number;
  selections: Record<string, string[]>;
  note?: string;
  unitPrice: number;
};

type CartCtx = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "id">) => void;
  updateQty: (id: string, delta: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
  total: number;
  count: number;
  openCart: () => void;
  closeCart: () => void;
   isOpen: boolean;
   setIsOpen: (open: boolean) => void;
  openProduct: (item: MenuItem) => void;
  closeProduct: () => void;
  activeItem: MenuItem | null;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const value = useMemo<CartCtx>(() => {
    const total = lines.reduce((acc, l) => acc + l.unitPrice * l.quantity, 0);
    const count = lines.reduce((acc, l) => acc + l.quantity, 0);
    return {
      lines,
      total,
      count,
       isOpen,
       setIsOpen,
      activeItem,
      addLine: (line) => {
        setLines((prev) => [
          ...prev,
          { ...line, id: `${line.item.slug}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` },
        ]);
      },
      updateQty: (id, delta) =>
        setLines((prev) =>
          prev
            .map((l) => (l.id === id ? { ...l, quantity: Math.max(0, l.quantity + delta) } : l))
            .filter((l) => l.quantity > 0),
        ),
      removeLine: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      openProduct: (item) => setActiveItem(item),
      closeProduct: () => setActiveItem(null),
    };
  }, [lines, isOpen, activeItem]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
