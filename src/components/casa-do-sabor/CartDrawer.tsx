import { useRef, useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, MapPin, CreditCard, User } from "lucide-react";
import { useCart, formatBRL } from "./CartContext";
import { WHATSAPP_NUMBER } from "./menuData";
import { CupIcon } from "./CupIcon";
import { cn } from "@/lib/utils";

const DELIVERY_FEE = 12;

type FormErrors = { name?: string; address?: string };

export function CartDrawer() {
  const { isOpen, closeCart, lines, updateQty, removeLine, total, clear, orderDetails, updateOrderDetails } = useCart();
  const [errors, setErrors] = useState<FormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  // Histórico (voltar do celular), Esc e trava de scroll são controlados
  // centralmente no CartProvider.

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

    const deliveryTxt = orderDetails.type === "delivery" 
      ? `🛵 *Entrega:*\n   Endereço: ${orderDetails.address || "Não informado"}\n   Taxa: ${formatBRL(DELIVERY_FEE)}` 
      : "🏢 *Retirada no local*";

    const msg = [
      "☕ *Casa do Sabor · Unidade Summer Fit*",
      "Olá! Vim pelo cardápio digital e gostaria de fazer o seguinte pedido:",
      "",
      `👤 *Cliente:* ${orderDetails.name || "Não informado"}`,
      deliveryTxt,
      `💳 *Forma de Pagamento:* ${orderDetails.paymentMethod}`,
      "",
      "🧺 *Meu pedido:*",
      lineTxt,
      "",
      `Subtotal: ${formatBRL(total)}`,
      orderDetails.type === "delivery" ? `Entrega: ${formatBRL(DELIVERY_FEE)}` : "",
      `*Total: ${formatBRL(orderDetails.type === "delivery" ? total + DELIVERY_FEE : total)}*`,
      "",
      "Combinamos os detalhes por aqui? 💕",
    ].filter(Boolean).join("\n");
    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    if (!lines.length) return;

    const nextErrors: FormErrors = {};
    if (!orderDetails.name.trim()) nextErrors.name = "Informe seu nome para continuar.";
    if (orderDetails.type === "delivery" && !orderDetails.address?.trim()) {
      nextErrors.address = "Informe o endereço completo da entrega.";
    }
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      nameRef.current?.focus();
      return;
    }
    if (nextErrors.address) {
      addressRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      addressRef.current?.focus();
      return;
    }

    // No mobile, window.open costuma ser bloqueado pelo navegador.
    // Navegação direta é o caminho confiável para abrir o WhatsApp.
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`;
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

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
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
            <>
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

              <div className="mt-8 space-y-6">
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                    <User className="h-4 w-4 text-terracotta" />
                    Seus dados
                  </h4>
                  <input
                    ref={nameRef}
                    type="text"
                    inputMode="text"
                    autoComplete="name"
                    maxLength={80}
                    placeholder="Seu nome"
                    value={orderDetails.name}
                    onChange={(e) => {
                      updateOrderDetails({ name: e.target.value });
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={cn(
                      "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 sm:text-sm",
                      errors.name
                        ? "border-terracotta-deep focus:border-terracotta-deep focus:ring-terracotta-deep/20"
                        : "border-blush-deep/60 focus:border-terracotta focus:ring-terracotta/20",
                    )}
                  />
                  {errors.name && <p className="text-xs text-terracotta-deep">{errors.name}</p>}
                </div>


                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                    <MapPin className="h-4 w-4 text-terracotta" />
                    Como deseja receber?
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateOrderDetails({ type: "local" })}
                      className={cn(
                        "flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all",
                        orderDetails.type === "local"
                          ? "border-terracotta bg-terracotta/5 text-terracotta shadow-sm"
                          : "border-blush-deep/60 bg-white text-ink/60",
                      )}
                    >
                      Retirada no local
                    </button>
                    <button
                      onClick={() => updateOrderDetails({ type: "delivery" })}
                      className={cn(
                        "flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all",
                        orderDetails.type === "delivery"
                          ? "border-terracotta bg-terracotta/5 text-terracotta shadow-sm"
                          : "border-blush-deep/60 bg-white text-ink/60",
                      )}
                    >
                      Entrega (Delivery)
                    </button>
                  </div>
                  {orderDetails.type === "delivery" && (
                    <>
                      <textarea
                        ref={addressRef}
                        placeholder="Endereço completo (Rua, número, bairro, apto...)"
                        value={orderDetails.address ?? ""}
                        onChange={(e) => {
                          updateOrderDetails({ address: e.target.value });
                          if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                        }}
                        rows={2}
                        maxLength={240}
                        autoComplete="street-address"
                        className={cn(
                          "w-full resize-none rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 animate-in slide-in-from-top-2 duration-200 sm:text-sm",
                          errors.address
                            ? "border-terracotta-deep focus:border-terracotta-deep focus:ring-terracotta-deep/20"
                            : "border-blush-deep/60 focus:border-terracotta focus:ring-terracotta/20",
                        )}
                      />
                      {errors.address && <p className="text-xs text-terracotta-deep">{errors.address}</p>}
                    </>
                  )}

                </div>

                <div className="space-y-3 pb-4">
                  <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                    <CreditCard className="h-4 w-4 text-terracotta" />
                    Forma de pagamento
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Pix", "Cartão", "Dinheiro"].map((method) => (
                      <button
                        key={method}
                        onClick={() => updateOrderDetails({ paymentMethod: method })}
                        className={cn(
                          "rounded-xl border py-2.5 text-xs font-medium transition-all",
                          orderDetails.paymentMethod === method
                            ? "border-terracotta bg-terracotta/5 text-terracotta shadow-sm"
                            : "border-blush-deep/60 bg-white text-ink/60",
                        )}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-blush-deep/40 bg-white px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
            <div className="flex items-center justify-between text-sm text-ink/70">
              <span>Subtotal</span>
              <span className="font-medium text-ink">{formatBRL(total)}</span>
            </div>
            {orderDetails.type === "delivery" && (
              <div className="flex items-center justify-between text-xs text-ink/50">
                <span>Taxa de entrega</span>
                <span>{formatBRL(DELIVERY_FEE)}</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-blush-deep/60 pt-2">
              <span className="font-display font-semibold text-ink">Total</span>
              <span className="font-display text-lg font-semibold text-terracotta-deep">
                {formatBRL(orderDetails.type === "delivery" ? total + DELIVERY_FEE : total)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-display font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:brightness-105 active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar pedido pelo WhatsApp
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Deseja mesmo limpar todos os itens do pedido?")) clear();
              }}
              className="mt-2 w-full py-2 text-xs text-ink/40 hover:text-terracotta"
            >
              Limpar carrinho
            </button>

          </div>
        )}
      </aside>
    </div>
  );
}
