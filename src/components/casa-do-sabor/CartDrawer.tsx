import { useEffect } from "react";
import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, MapPin, User, CreditCard, Home } from "lucide-react";
import { useCart, formatBRL } from "./CartContext";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "./menuData";
import { CupIcon } from "./CupIcon";

const DELIVERY_FEE = 12;

export function CartDrawer() {
  const { isOpen, closeCart, lines, updateQty, removeLine, total, clear } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState<"delivery" | "local">("local");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const buildMessage = () => {
    const lineTxt = lines
      .map((l, i) => {
        const opts = Object.entries(l.selections)
          .flatMap(([label, values]) => values.map((v) => `      ↳ ${label}: ${v}`))
          .join("\n");
        const noteTxt = l.note ? `\n      ✎ Obs: ${l.note}` : "";
        return `  ${i + 1}. ${l.quantity}x ${l.item.name} — ${formatBRL(l.unitPrice * l.quantity)}${opts ? `\n${opts}` : ""}${noteTxt}`;
      })
      .join("\n\n");

    const msg = [
      "☕ *Casa do Sabor · Unidade Summer Fit*",
      "Olá! Vim pelo cardápio digital e gostaria de fazer o seguinte pedido:",
      "",
      "🧺 *Meu pedido:*",
      lineTxt,
      "",
      `Subtotal: ${formatBRL(total)}`,
      `Entrega: ${formatBRL(DELIVERY_FEE)} (opcional)`,
      `*Total com entrega: ${formatBRL(total + (orderType === "delivery" ? DELIVERY_FEE : 0))}*`,
      "",
      "👤 *Dados do Cliente:*",
      `Nome: ${customerName}`,
      `Tipo: ${orderType === "delivery" ? "🚀 Entrega" : "🏠 Consumo no Local"}`,
      orderType === "delivery" ? `Endereço: ${address}` : "",
      `Forma de Pagamento: ${paymentMethod}`,
      "",
      "Combinamos os detalhes por aqui? 💕",
    ].filter(Boolean).join("\n");
    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    const newErrors = [];
    if (!customerName.trim()) newErrors.push("nome");
    if (orderType === "delivery" && !address.trim()) newErrors.push("endereco");
    if (!paymentMethod) newErrors.push("pagamento");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeCart}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col bg-cream shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-blush-deep/40 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-terracotta">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="font-script text-lg leading-none text-terracotta">Seu pedido</p>
              <p className="font-display text-sm font-semibold text-ink">Casa do Sabor</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blush/60 text-ink hover:bg-blush"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <CupIcon className="h-20 w-20 text-terracotta/30" />
              <p className="mt-4 font-script text-xl text-terracotta">Seu cestinho está vazio</p>
              <p className="mt-2 max-w-xs text-sm text-ink/60">
                Escolha seus quitutes favoritos e prepare um cafezinho pra acompanhar ☕
              </p>
              <button
                onClick={closeCart}
                className="mt-6 rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-terracotta-dark"
              >
                Ver cardápio
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="rounded-2xl bg-white p-4 ring-1 ring-blush-deep/40 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold leading-snug text-ink">
                        {line.item.name}
                      </p>
                      {Object.entries(line.selections).map(([label, values]) =>
                        values.length ? (
                          <p key={label} className="mt-1 text-[11px] text-ink/60">
                            <span className="text-ink/40">{label}:</span> {values.join(", ")}
                          </p>
                        ) : null,
                      )}
                      {line.note && (
                        <p className="mt-1 text-[11px] italic text-ink/50">✎ {line.note}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeLine(line.id)}
                      aria-label="Remover item"
                      className="text-ink/30 hover:text-terracotta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full bg-blush/60 p-0.5">
                      <button
                        onClick={() => updateQty(line.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm hover:bg-cream"
                        aria-label="Diminuir"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-ink">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(line.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm hover:bg-cream"
                        aria-label="Aumentar"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-sans text-sm font-semibold text-terracotta-deep">
                      {formatBRL(line.unitPrice * line.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-blush-deep/40 bg-white px-5 py-4 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4 mb-6">
              <h4 className="font-display font-semibold text-ink flex items-center gap-2">
                <User className="h-4 w-4 text-terracotta" />
                Seus Dados
              </h4>
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all",
                      errors.includes("nome") ? "border-terracotta bg-terracotta/5" : "border-blush-deep/60 focus:border-terracotta"
                    )}
                  />
                </div>

                <div className="flex gap-2 p-1 bg-blush/30 rounded-xl">
                  <button
                    onClick={() => setOrderType("local")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all",
                      orderType === "local" ? "bg-white text-terracotta shadow-sm" : "text-ink/60"
                    )}
                  >
                    <Home className="h-3.5 w-3.5" />
                    No Local
                  </button>
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all",
                      orderType === "delivery" ? "bg-white text-terracotta shadow-sm" : "text-ink/60"
                    )}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Entrega
                  </button>
                </div>

                {orderType === "delivery" && (
                  <textarea
                    placeholder="Endereço de entrega"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className={cn(
                      "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all resize-none",
                      errors.includes("endereco") ? "border-terracotta bg-terracotta/5" : "border-blush-deep/60 focus:border-terracotta"
                    )}
                  />
                )}

                <div>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all appearance-none bg-white",
                      errors.includes("pagamento") ? "border-terracotta bg-terracotta/5" : "border-blush-deep/60 focus:border-terracotta"
                    )}
                  >
                    <option value="">Forma de pagamento</option>
                    <option value="Pix">Pix</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-ink/70">
              <span>Subtotal</span>
              <span className="font-medium text-ink">{formatBRL(total)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-ink/50">
              <span>Entrega (opcional)</span>
              <span>{formatBRL(DELIVERY_FEE)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-blush-deep/60 pt-2">
              <span className="font-display font-semibold text-ink">Total</span>
              <span className="font-display text-lg font-semibold text-terracotta-deep">
                {formatBRL(total + (orderType === "delivery" ? DELIVERY_FEE : 0))}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-display font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:brightness-105 active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar pedido pelo WhatsApp
            </button>
            <button
              onClick={clear}
              className="mt-2 w-full text-xs text-ink/40 hover:text-terracotta"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
