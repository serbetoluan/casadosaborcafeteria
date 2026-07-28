import { ImageIcon, MapPin, Clock, Instagram } from "lucide-react";
import { CupIcon } from "./CupIcon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-24 pt-12 text-blush">
      <CupIcon className="pointer-events-none absolute -right-6 top-6 h-32 w-32 text-blush/5" />
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div
          data-image-slot="logo-footer"
          className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full bg-blush/10 ring-2 ring-blush/20 text-blush/60"
          aria-label="Espaço reservado para a logo"
        >
          <ImageIcon className="h-5 w-5" strokeWidth={1.4} />
          <span className="text-[9px] text-blush/60">sua logo</span>
        </div>

        <p className="mt-4 font-script text-2xl text-blush">Casa do Sabor</p>
        <p className="text-xs uppercase tracking-[0.2em] text-blush/60">
          unidade Summer Fit
        </p>

        <div className="mt-6 flex flex-col gap-3 text-sm text-blush/80">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" /> Dentro da Academia Summer Fit
          </p>
          <p className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" /> Seg a Sáb · 6h às 22h
          </p>
          <a
            href="#"
            className="flex items-center justify-center gap-2 text-blush hover:text-white"
          >
            <Instagram className="h-4 w-4" /> @casadosabor
          </a>
        </div>

        <div className="mt-8 flex items-center gap-3 text-blush/40">
          <span className="h-px w-10 bg-blush/20" />
          <CupIcon className="h-5 w-5" />
          <span className="h-px w-10 bg-blush/20" />
        </div>

        <p className="mt-4 text-[11px] text-blush/40">
          © {new Date().getFullYear()} Casa do Sabor · Feito com carinho
        </p>
      </div>
    </footer>
  );
}
