import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "./menuData";

export type OrderDetails = {
  name: string;
  type: "local" | "delivery";
  address?: string;
  paymentMethod: string;
};

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
  openProduct: (item: MenuItem) => void;
  closeProduct: () => void;
  activeItem: MenuItem | null;
  orderDetails: OrderDetails;
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE_KEY = "cds-cart-v1";

const DEFAULT_DETAILS: OrderDetails = {
  name: "",
  type: "local",
  address: "",
  paymentMethod: "Pix",
};

type PersistedState = { lines: CartLine[]; orderDetails: OrderDetails };

function readStorage(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (!parsed || !Array.isArray(parsed.lines)) return null;
    return {
      lines: parsed.lines.filter(
        (l): l is CartLine => !!l && !!l.item && typeof l.unitPrice === "number" && typeof l.quantity === "number",
      ),
      orderDetails: { ...DEFAULT_DETAILS, ...(parsed.orderDetails ?? {}) },
    };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(DEFAULT_DETAILS);
  const [hydrated, setHydrated] = useState(false);

  // ---- Persistência (localStorage) ----------------------------------------
  // Hidrata somente no cliente para não quebrar o SSR.
  useEffect(() => {
    const stored = readStorage();
    if (stored) {
      setLines(stored.lines);
      setOrderDetails(stored.orderDetails);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, orderDetails }));
    } catch {
      /* quota cheia / modo privado: ignora silenciosamente */
    }
  }, [lines, orderDetails, hydrated]);

  // ---- Controle único de overlays (modal de produto + carrinho) -----------
  // Um único "nível" de histórico é empilhado enquanto QUALQUER overlay está
  // aberto. Isso evita a corrida entre modal fechando e carrinho abrindo.
  const overlay: "product" | "cart" | null = activeItem ? "product" : isOpen ? "cart" : null;
  const pushedRef = useRef(false);
  const skipPopRef = useRef(false);

  const closeAll = useCallback(() => {
    setActiveItem(null);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const onPop = () => {
      if (skipPopRef.current) {
        skipPopRef.current = false;
        return;
      }
      pushedRef.current = false;
      closeAll();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("keydown", onKey);
    };
  }, [closeAll]);

  useEffect(() => {
    if (overlay && !pushedRef.current) {
      pushedRef.current = true;
      window.history.pushState({ cdsOverlay: true }, "");
    } else if (!overlay && pushedRef.current) {
      pushedRef.current = false;
      skipPopRef.current = true;
      window.history.back();
    }
  }, [overlay]);

  // ---- Trava de scroll do body -------------------------------------------
  useEffect(() => {
    if (!overlay) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [overlay]);

  const value = useMemo<CartCtx>(() => {
    const total = lines.reduce((acc, l) => acc + l.unitPrice * l.quantity, 0);
    const count = lines.reduce((acc, l) => acc + l.quantity, 0);
    return {
      lines,
      total,
      count,
      isOpen,
      activeItem,
      orderDetails,
      updateOrderDetails: (details) => setOrderDetails((prev) => ({ ...prev, ...details })),
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
      openCart: () => {
        setActiveItem(null);
        setIsOpen(true);
      },
      closeCart: () => setIsOpen(false),
      openProduct: (item) => {
        setIsOpen(false);
        setActiveItem(item);
      },
      closeProduct: () => setActiveItem(null),
    };
  }, [lines, isOpen, activeItem, orderDetails]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/**
 * Preço de adicionais lido diretamente do rótulo da opção — ex.: "Chantilly (+R$ 4)"
 * ou "Borda de doce de leite (+R$ 4,50)". Assim novos adicionais no menuData
 * passam a ser cobrados sem precisar de uma tabela paralela (fonte única).
 */
function parseAddonPrice(label: string): number {
  const match = label.match(/\+\s*R\$\s*([\d.]+(?:,\d{1,2})?)/i);
  if (!match) return 0;
  const value = Number(match[1].replace(/\./g, "").replace(",", "."));
  return Number.isFinite(value) ? value : 0;
}

export const ADDON_PRICES: Record<string, number> = new Proxy({} as Record<string, number>, {
  get: (_target, key) => (typeof key === "string" ? parseAddonPrice(key) : 0),
  has: () => true,
});

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
