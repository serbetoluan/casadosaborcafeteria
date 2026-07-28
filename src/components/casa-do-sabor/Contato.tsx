import { MapPin, Phone, Instagram, Bike, MessageSquare } from "lucide-react";
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

        <div className="grid gap-6">
          {/* Delivery Info */}
          <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-blush-deep/60">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-terracotta">
              <Bike className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-ink">Delivery: R$ 12,00</p>
              <p className="text-sm text-ink/70">Entregamos com segurança, rapidez e qualidade.</p>
            </div>
          </div>

          {/* WhatsApp / Fale Conosco */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-terracotta" />
              <h3 className="font-display text-base font-semibold text-ink">Fale conosco</h3>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://wa.me/5564992236969"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-blush-deep/60 transition-all hover:shadow-lg hover:shadow-terracotta/10"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/50">Casa 1</p>
                  <p className="font-display text-sm font-semibold text-ink">(64) 99223-6969</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
              </a>

              <a
                href="https://wa.me/5564999766781"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-blush-deep/60 transition-all hover:shadow-lg hover:shadow-terracotta/10"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/50">Casa 2</p>
                  <p className="font-display text-sm font-semibold text-ink">(64) 99976-6781</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
              </a>

              <a
                href="https://wa.me/5564992236969"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-2xl border-2 border-terracotta bg-white p-5 shadow-lg shadow-terracotta/5 sm:col-span-2"
              >
                <div className="absolute -top-3 left-4 rounded-full bg-terracotta px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Unidade Academia
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/50">Summer Fit</p>
                  <p className="font-display text-sm font-semibold text-ink">(64) 99223-6969</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-sm group-hover:bg-green-600 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
              </a>
            </div>
          </div>

          {/* Endereços */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-terracotta" />
              <h3 className="font-display text-base font-semibold text-ink">Onde estamos</h3>
            </div>

            <div className="grid gap-3">
              <div className="flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-blush-deep/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush/40 text-terracotta/60">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/50">Casa 1</p>
                  <p className="text-sm text-ink/80 leading-snug">Rua José de Carvalho nº 486, Setor Antena</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-blush-deep/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush/40 text-terracotta/60">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink/50">Casa 2</p>
                  <p className="text-sm text-ink/80 leading-snug">Rua 08 nº 66, Residencial Morada do Sol</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-terracotta/5 p-4 ring-2 ring-terracotta">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Unidade Summer Fit</p>
                  <p className="text-sm font-medium text-ink leading-snug">Rua Tiradentes, S/N</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center font-script text-xl italic text-terracotta leading-relaxed">
            "Que a pitada de amor colocada em nossa Casa tempere seu dia com muita alegria!"
          </p>

          <a
            href="https://www.instagram.com/casadosaborjti/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 text-ink/60 hover:text-terracotta transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-medium">@casadosaborjti</span>
          </a>
        </div>
      </div>
    </section>
  );
}
