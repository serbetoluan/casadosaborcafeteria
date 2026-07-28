import { CupIcon } from "./CupIcon";

const items = [
  "Bolos caseirinhos médios (sob encomenda — consulte os sabores) — R$ 35,00",
  "Biscoitinho tipo Peta (pacote) — R$ 14,00",
  "Doces exclusivos (@docurass.da_le) a pronta entrega (solicite nosso cardápio)",
  "Lanches e bebidas prontos para consumir (linha cafeteria — solicite nosso cardápio)",
  "Aceitamos encomendas para eventos corporativos e sociais (solicite um orçamento)",
  "Aceitamos encomendas de cestas presenteáveis para café da manhã e datas comemorativas",
  "Aceitamos encomendas de doces, bolos e tortas para eventos — trabalhamos com doces finos",
  "Atendemos panificadoras, supermercados, lanchonetes, cafeterias e hotéis como modalidade atacadista",
];

export function SobreNos() {
  return (
    <section id="sobre" className="scroll-mt-32 px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 text-terracotta/60">
            <span className="h-px w-10 bg-terracotta/40" />
            <CupIcon className="h-5 w-5" />
            <span className="h-px w-10 bg-terracotta/40" />
          </div>
          <p className="mt-3 font-script text-xl text-terracotta">
            Um pouquinho da gente
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink">
            Saiba mais sobre nós
          </h2>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((text) => (
            <li
              key={text}
              className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 ring-1 ring-blush-deep/60 shadow-[0_6px_20px_-14px_rgba(201,123,132,0.4)]"
            >
              <CupIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
              <span className="text-sm leading-relaxed text-ink/80">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
