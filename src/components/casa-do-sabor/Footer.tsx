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
          className="h-24 w-24 rounded-full bg-blush object-contain p-2 shadow-lg ring-4 ring-blush/10"
        />

        <div className="mt-8 flex items-center gap-3 text-blush/40">
          <span className="h-px w-10 bg-blush/20" />
          <CupIcon className="h-6 w-6" />
          <span className="h-px w-10 bg-blush/20" />
        </div>

        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-blush/40">
          Casa do Sabor © 2026
        </p>
      </div>
    </footer>
  );
}
