import { Instagram } from "lucide-react";
import { CupIcon } from "./CupIcon";
import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-24 pt-12 text-blush">
      <CupIcon className="pointer-events-none absolute -right-6 top-6 h-32 w-32 text-blush/5" />
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <img
          src={logo.url}
          alt="Casa do Sabor"
          className="h-20 w-20 rounded-full bg-blush object-contain p-1.5 ring-2 ring-blush/20"
        />

        <p className="mt-4 font-script text-2xl text-blush">Casa do Sabor</p>
        <p className="text-xs uppercase tracking-[0.2em] text-blush/60">
          unidade Summer Fit
        </p>

        <p className="mt-4 max-w-xs font-script text-lg text-blush/80">
          Energia · Foco · Sabor — do café da manhã ao happy hour
        </p>

        <a
          href="https://instagram.com/casadosabor"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-2 text-blush hover:text-white"
        >
          <Instagram className="h-4 w-4" /> @casadosabor
        </a>

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
