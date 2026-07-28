import { MapPin, Clock, Phone, Instagram } from "lucide-react";
import { CupIcon } from "./CupIcon";

export function Contato() {
  return (
    <section id="contato" className="scroll-mt-32 bg-gradient-to-b from-cream to-blush/40 px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 text-terracotta/60">
            <span className="h-px w-10 bg-terracotta/40" />
            <CupIcon className="h-5 w-5" />
            <span className="h-px w-10 bg-terracotta/40" />
          </div>
          <p className="mt-3 font-script text-xl text-terracotta">
            Vem tomar um cafezinho
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink">
            Contato & Delivery
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-blush-deep/60">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
            <div>
              <p className="font-display text-sm font-semibold text-ink">Onde estamos</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Dentro da Academia Summer Fit
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-blush-deep/60">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
            <div>
              <p className="font-display text-sm font-semibold text-ink">Horários</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Seg a Sáb · 6h às 22h
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-blush-deep/60 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/10"
          >
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
            <div>
              <p className="font-display text-sm font-semibold text-ink">Pedidos & Delivery</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Chame no WhatsApp e faça seu pedido
              </p>
            </div>
          </a>

          <a
            href="https://instagram.com/casadosabor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-blush-deep/60 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/10"
          >
            <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
            <div>
              <p className="font-display text-sm font-semibold text-ink">Instagram</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                @casadosabor
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
