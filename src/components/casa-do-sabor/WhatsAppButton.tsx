import { WHATSAPP_NUMBER } from "./menuData";

const THEMED_MESSAGE = `☕ Olá, Casa do Sabor!

Vim pelo cardápio digital da *Unidade Summer Fit* e queria bater um papo pra montar meu pedido — do café da manhã ao happy hour! 🧺💕

Podem me ajudar?`;

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(THEMED_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="animate-breathe fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white ring-4 ring-white/70"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9 3 3.5 8.5 3.5 15.4c0 2.4.7 4.7 1.9 6.7L3 29l7.2-2.3c1.9 1 4 1.6 6.2 1.6h.01c6.9 0 12.5-5.5 12.5-12.4C28.9 8.5 23 3 16 3zm7.2 17.6c-.3.9-1.8 1.7-2.5 1.8-.7.1-1.5.1-2.4-.2-.6-.2-1.3-.4-2.3-.8-4-1.7-6.6-5.7-6.8-6-.2-.3-1.6-2.1-1.6-4s1-2.8 1.4-3.2c.4-.4.8-.5 1.1-.5h.8c.3 0 .6-.1.9.7.3.8 1 2.7 1.1 2.9.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.5-.5.7-.2.2-.4.4-.2.8.2.4.9 1.6 2 2.5 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1.2-.2.9-1.1 1.2-1.5.2-.4.5-.3.8-.2s2 .9 2.4 1.1c.4.2.6.3.7.4.1.3.1 1-.2 1.9z" />
      </svg>
    </a>
  );
}
