import paoQueijoAsset from "@/assets/pao_de_queijo.png.asset.json";
import saladaFrutasAsset from "@/assets/salada_de_frutas.png.asset.json";
import omeleteAsset from "@/assets/omelete_simples.png.asset.json";
import waffleAsset from "@/assets/waffle.png.asset.json";
import enroladinhoAsset from "@/assets/enroladinho_de_queijo.png.asset.json";
import disquinhoFrangoAsset from "@/assets/disquinho_frango.png.asset.json";
import tortaFrangoAsset from "@/assets/torta_frango_catupiry.png.asset.json";
import esfihaCarneAsset from "@/assets/esfiha_carne.png.asset.json";
import disquinhoCarneAsset from "@/assets/disquinho_carne.png.asset.json";
import sanduicheNaturalAsset from "@/assets/sanduiche_natural.png.asset.json";
import cappuccinoGeladoAsset from "@/assets/cappuccino_gelado.png.asset.json";
import cappuccinoItalianoAsset from "@/assets/cappuccino_italiano.png.asset.json";

export type MenuOptionGroup = {
  label: string;
  required?: boolean;
  multi?: boolean;
  choices: string[];
};

export type MenuItem = {
  slug: string;
  name: string;
  description?: string;
  price: string;
  priceValue: number;
  fit?: boolean;
  options?: MenuOptionGroup[];
  image?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  tagline: string;
  items: MenuItem[];
};

export const categories: MenuCategory[] = [
  {
    id: "quitandinhas",
    title: "Quitandinhas",
    tagline: "Do forno, quentinhos",
    items: [
      { slug: "pao-queijo", name: "Pão de queijo", description: "1 uni", price: "R$ 1,50", priceValue: 1.5, image: paoQueijoAsset.url },
      { slug: "pao-queijo-multi", name: "Pão de queijo multigrãos", description: "1 uni", price: "R$ 2,50", priceValue: 2.5 },
      { slug: "biscoito-parmesao", name: "Biscoito Parmesão", description: "1 uni", price: "R$ 3,00", priceValue: 3 },
      { slug: "chipa-mussarela", name: "Chipa", description: "1 uni", price: "R$ 3,00", priceValue: 3 },
      { slug: "enroladao-queijo", name: "Enroladão de queijo", description: "100g · 1 uni", price: "R$ 9,00", priceValue: 9, image: enroladinhoAsset.url },
      {
        slug: "croissant-folhado",
        name: "Croissant (presunto e queijo | chocolate)",
        description: "Massa folhada leve, feita na hora · 1 uni",
        price: "R$ 9,00",
        priceValue: 9,
        options: [{ label: "Escolha o recheio", required: true, choices: ["Presunto e queijo", "Chocolate"] }],
      },
    ],
  },
  {
    id: "lanchinhos",
    title: "Lanchinhos",
    tagline: "Feitos na hora, feitos com amor",
    items: [
      { slug: "saladinha-frutas", name: "Saladinha de frutas", description: "Mix fresquinho de frutas da estação.", price: "R$ 14,00", priceValue: 14, fit: true, image: saladaFrutasAsset.url },
      { slug: "sanduiche-natural", name: "Sanduíche Natural de frango", description: "Sanduíche leve, prático e saboroso.", price: "R$ 18,00", priceValue: 18, fit: true, image: sanduicheNaturalAsset.url },
      {
        slug: "waffle-cremo",
        name: "Waffle de Cremo Queijo",
        description: "Waffle quentinho de cremo queijo. Também disponível na versão fit.",
        price: "R$ 18,00",
        priceValue: 18,
        fit: true,
        image: waffleAsset.url,
        options: [
          { label: "Versão", required: true, choices: ["Tradicional", "Fit"] },
          { label: "Escolha o acompanhamento", required: true, choices: ["Mel", "Nutella", "Requeijão", "Geleia de morango"] },
        ],
      },
      {
        slug: "misto-quente",
        name: "Misto Quente",
        description: "Pão de forma, presunto e muita mussarela.",
        price: "R$ 18,00",
        priceValue: 18,
        options: [{ label: "Um upzinho?", choices: ["Sem tomate", "Com rodela de tomate"] }],
      },
      { slug: "ovos-torrada-bacon", name: "Ovos mexidos com Torradas e Bacon", description: "Ovos mexidos, uma pitada de creme de leite, torradas e bacon.", price: "R$ 18,00", priceValue: 18 },
      { slug: "omelete-simples", name: "Omelete Simples", description: "Ovos preparados para omelete.", price: "R$ 18,00", priceValue: 18, image: omeleteAsset.url },
      { slug: "omelete-pq", name: "Omelete de Presunto e Queijo", description: "Ovos preparados para omelete, recheado com presunto e mussarela.", price: "R$ 20,00", priceValue: 20 },
      { slug: "crepioca", name: "Crepioca", description: "Ovos preparados com tapioca.", price: "R$ 20,00", priceValue: 20 },
      { slug: "crepioca-pq", name: "Crepioca de Presunto e Queijo", description: "Ovos e tapioca, recheado com presunto e mussarela.", price: "R$ 22,00", priceValue: 22 },
      { slug: "crepioca-frango", name: "Crepioca de Frango com Queijo", description: "Ovos e tapioca, recheado com filé de peito de frango desfiado e mussarela.", price: "R$ 25,00", priceValue: 25 },
      {
        slug: "panqueca-banana",
        name: "Panqueca de banana com aveia",
        description: "Banana, ovo e aveia — leve e nutritiva.",
        price: "R$ 18,00",
        priceValue: 18,
        fit: true,
        options: [{ label: "Escolha o acompanhamento", required: true, choices: ["Mel", "Requeijão", "Mussarela"] }],
      },
      { slug: "toast-caprese", name: "Toast Caprese", description: "Pão baguete artesanal, creme de ricota, pesto de manjericão e tomate confit.", price: "R$ 25,00", priceValue: 25 },
    ],
  },
  {
    id: "salgados",
    title: "Salgados",
    tagline: "Pra matar aquela fominha",
    items: [
      { slug: "americano-pq", name: "Americano de Presunto e Queijo", price: "R$ 10,00", priceValue: 10 },
      { slug: "esfirra-carne", name: "Esfirra de Carne", price: "R$ 10,00", priceValue: 10, image: esfihaCarneAsset.url },
      { slug: "disco-carne", name: "Disco de carne", price: "R$ 10,00", priceValue: 10, image: disquinhoCarneAsset.url },
      { slug: "disco-frango-queijo", name: "Disco de Frango com Queijo", price: "R$ 12,50", priceValue: 12.5, image: disquinhoFrangoAsset.url },
      { slug: "quiche-alho-poro", name: "Quiche de Alho Poró", price: "R$ 18,00", priceValue: 18 },
      { slug: "quiche-lorraine", name: "Quiche Lorraine", description: "Bacon e creme de queijo.", price: "R$ 18,00", priceValue: 18, image: tortaFrangoAsset.url },
      { slug: "torta-frango-catupiry", name: "Torta de Frango com Catupiry", price: "R$ 20,00", priceValue: 20 },
    ],
  },
  {
    id: "folhados",
    title: "Folhados",
    tagline: "Linha premium, massa amanteigada",
    items: [
      { slug: "croissant-amanteigado", name: "Croissant Amanteigado", description: "Croissant linha premium. Acompanha manteiga de leite.", price: "R$ 18,00", priceValue: 18 },
      { slug: "croissant-peru", name: "Croissant cremoso de Peito de Peru", description: "Linha premium, recheado com peito de peru, cream cheese e um toque de geleia de pimenta (120g).", price: "R$ 24,50", priceValue: 24.5 },
      { slug: "croissant-frango-queijo", name: "Croissant frango com queijo", description: "Linha premium, recheado com filé de peito de frango desfiado e mussarela.", price: "R$ 24,50", priceValue: 24.5 },
      { slug: "croissant-provencal", name: "Croissant Provençal", description: "Linha premium, recheado com queijo brie, damasco, mel e amêndoas laminadas.", price: "R$ 27,50", priceValue: 27.5 },
      { slug: "croissant-lagarto", name: "Croissant Lagarto a Gorgonzola", description: "Linha premium, recheado com lagarto desfiado e creme de gorgonzola.", price: "R$ 27,50", priceValue: 27.5 },
      { slug: "dueto-black", name: "Dueto doce Black", description: "Croissant linha premium recheado com Nutella e morangos.", price: "R$ 24,50", priceValue: 24.5 },
    ],
  },
  {
    id: "geladeira",
    title: "Da Geladeira",
    tagline: "Sempre bem geladinhos",
    items: [
      { slug: "agua-sem-gas", name: "Água Mineral sem Gás", description: "500ml", price: "R$ 3,50", priceValue: 3.5 },
      { slug: "agua-com-gas", name: "Água Mineral com Gás", description: "500ml", price: "R$ 5,50", priceValue: 5.5 },
      { slug: "toddynho", name: "Toddynho®", description: "200ml", price: "R$ 5,00", priceValue: 5 },
      {
        slug: "suco-caixinha",
        name: "Suco de caixinha",
        description: "200ml",
        price: "R$ 4,00",
        priceValue: 4,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Uva", "Caju"] }],
      },
      {
        slug: "refri-mini",
        name: "Refrigerantes Mini",
        description: "220ml",
        price: "R$ 5,00",
        priceValue: 5,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Coca-cola Tradicional", "Coca-cola Zero", "Coca-cola Espresso", "Guaraná Antártica", "Fanta Laranja"] }],
      },
      { slug: "energetico", name: "Energético", description: "270ml", price: "R$ 8,50", priceValue: 8.5 },
      { slug: "energetico-zero", name: "Energético zero", description: "473ml", price: "R$ 11,90", priceValue: 11.9 },
      {
        slug: "kombuchas",
        name: "Kombuchas",
        description: "Fermentado natural, gaseificação leve.",
        price: "R$ 18,00",
        priceValue: 18,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Pitaya e maracujá", "Morango e limão", "Tangerina e Hibisco", "Abacaxi com hortelã"] }],
      },
    ],
  },
  {
    id: "refrescar",
    title: "Para Refrescar",
    tagline: "Um respiro doce no meio do dia",
    items: [
      {
        slug: "sucos-casa",
        name: "Sucos da Casa",
        description: "400ml — natural, sem açúcar adicionado.",
        price: "R$ 12,00",
        priceValue: 12,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Laranja", "Abacaxi"] }],
      },
      {
        slug: "sucos-especiais",
        name: "Sucos Especiais",
        description: "400ml — receitas da Casa. Opção Detox é fit.",
        price: "R$ 16,00",
        priceValue: 16,
        fit: true,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Morango", "Abacaxi com hortelã", "Detox (fit)"] }],
      },
      {
        slug: "soda-italiana",
        name: "Soda Italiana",
        description: "400ml — refrescância borbulhante.",
        price: "R$ 18,00",
        priceValue: 18,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Morango", "Maçã verde"] }],
      },
      { slug: "vienense", name: "Vienense", description: "400ml — Café expresso, sorvete de creme, calda de chocolate e chantilly.", price: "R$ 24,00", priceValue: 24 },
      { slug: "cappuccino-gelado", name: "Cappuccino Gelado", description: "400ml — Café expresso, cappuccino, sorvete de creme, calda de chocolate e chantilly.", price: "R$ 24,00", priceValue: 24, image: cappuccinoGeladoAsset.url },
      { slug: "nutella-frozen", name: "Nutella® Frozen", description: "400ml — Taça de gelato de leite Ninho® batido com uma dose de espresso e muita Nutella®, acompanha chantilly.", price: "R$ 26,00", priceValue: 26 },
    ],
  },
  {
    id: "quentinhas",
    title: "Bebidas Quentinhas",
    tagline: "Do café curtinho ao chocolate cremoso",
    items: [
      {
        slug: "cafe-casa",
        name: "Café Casa do Sabor",
        description: "50ml — nosso blend da casa.",
        price: "R$ 4,00",
        priceValue: 4,
        options: [{ label: "Adicionais (opcional)", multi: true, choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)"] }],
      },
      {
        slug: "cafe-casa-duplo",
        name: "Café Casa do Sabor Duplo",
        description: "100ml — dose reforçada do blend da casa.",
        price: "R$ 6,00",
        priceValue: 6,
        options: [{ label: "Adicionais (opcional)", multi: true, choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)"] }],
      },
      { slug: "espresso-curto", name: "Café Espresso Curto", description: "50ml", price: "R$ 7,00", priceValue: 7 },
      { slug: "espresso-duplo", name: "Café Espresso Duplo", description: "100ml", price: "R$ 10,00", priceValue: 10 },
      {
        slug: "espresso-nespresso",
        name: "Café Espresso Nespresso Sabores",
        description: "50ml — cápsulas Nespresso.",
        price: "R$ 10,00",
        priceValue: 10,
        options: [{ label: "Observação", choices: ["Consultar sabores disponíveis no balcão"] }],
      },
      { slug: "cappuccino-br", name: "Cappuccino Brasileiro", description: "240ml — Leite semi desnatado, pó de cappuccino e nuvem de leite vaporizado.", price: "R$ 16,00", priceValue: 16 },
      { slug: "cappuccino-br-light", name: "Cappuccino Brasileiro light", description: "240ml — versão mais leve, sem abrir mão do sabor.", price: "R$ 18,00", priceValue: 18, fit: true },
      { slug: "cappuccino-italiano", name: "Cappuccino Italiano", description: "240ml — Café, leite semi desnatado, calda de chocolate, crema e canela.", price: "R$ 16,00", priceValue: 16, image: cappuccinoItalianoAsset.url },
      { slug: "maltine", name: "Maltine Quentinho", description: "240ml — Caneca com leite quentinho, ovomaltine crocante e nuvem de leite vaporizado.", price: "R$ 16,00", priceValue: 16 },
      { slug: "chocolate-quente", name: "Chocolate Quente", description: "240ml — cremoso e aconchegante.", price: "R$ 20,00", priceValue: 20 },
      {
        slug: "adicionais",
        name: "Adicionais",
        description: "Escolha um upgradezinho para sua bebida.",
        price: "R$ 4,00",
        priceValue: 4,
        options: [{ label: "Escolha o adicional", required: true, choices: ["Chantilly", "Borda de Nutella (aplicada na borda da xícara)"] }],
      },
    ],
  },
];

export const navSections = [
  ...categories.map((c) => ({ id: c.id, title: c.title })),
  { id: "sobre", title: "Sobre a Casa" },
];

export const WHATSAPP_NUMBER = "5564992236969";
