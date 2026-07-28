export type MenuItem = {
  slug: string;
  name: string;
  description?: string;
  price: string;
  fit?: boolean;
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
      { slug: "pao-queijo", name: "Pão de queijo", description: "1 uni", price: "R$ 1,50" },
      { slug: "pao-queijo-multi", name: "Pão de queijo multigrãos", description: "1 uni", price: "R$ 2,50" },
      { slug: "biscoito-parmesao", name: "Biscoito Parmesão", description: "1 uni", price: "R$ 2,50" },
      { slug: "chipa-mussarela", name: "Chipa Mussarela", description: "1 uni", price: "R$ 1,50" },
      { slug: "enroladao-queijo", name: "Enroladão de queijo", description: "100g · 1 uni", price: "R$ 3,00" },
      { slug: "croissant-folheado", name: "Croissant massa folheada", description: "Presunto e queijo ou Chocolate · 1 uni", price: "R$ 9,00" },
    ],
  },
  {
    id: "lanchinhos",
    title: "Lanchinhos",
    tagline: "Feitos na hora, feitos com amor",
    items: [
      { slug: "waffle-cremo", name: "Waffle de Cremo Queijo (ou fit)", description: "Acompanha: mel, Nutella, requeijão ou geleia de morango.", price: "R$ 18,00", fit: true },
      { slug: "misto-quente", name: "Misto Quente", description: "Pão de forma, presunto, muita mussarela — peça uma rodela de tomate pra dar aquele up!", price: "R$ 18,00" },
      { slug: "ovos-torrada-bacon", name: "Ovos mexidos com Torradas e Bacon", description: "Ovos mexidos, uma pitada de creme de leite, torradas e bacon.", price: "R$ 18,00" },
      { slug: "omelete-simples", name: "Omelete Simples", description: "Ovos preparados para omelete.", price: "R$ 18,00" },
      { slug: "omelete-pq", name: "Omelete de Presunto e Queijo", description: "Ovos preparados para omelete, recheado com presunto e mussarela.", price: "R$ 20,00" },
      { slug: "crepioca", name: "Crepioca", description: "Ovos preparados com tapioca.", price: "R$ 20,00" },
      { slug: "crepioca-pq", name: "Crepioca de Presunto e Queijo", description: "Ovos e tapioca, recheado com presunto e mussarela.", price: "R$ 22,00" },
      { slug: "crepioca-frango", name: "Crepioca de Frango com Queijo", description: "Ovos e tapioca, recheado com filé de peito de frango desfiado e mussarela.", price: "R$ 25,00" },
      { slug: "panqueca-banana", name: "Panqueca de banana com aveia", description: "Banana, ovo e aveia. Escolha o acompanhamento: mel, requeijão ou mussarela.", price: "R$ 18,00", fit: true },
      { slug: "toast-caprese", name: "Toast Caprese", description: "Pão baguete artesanal, creme de ricota, pesto de manjericão e tomate confit.", price: "R$ 25,00" },
      { slug: "sanduiche-natural", name: "Sanduíche Natural de frango", price: "R$ 18,00", fit: true },
      { slug: "saladinha-frutas", name: "Saladinha de frutas", price: "R$ 14,00", fit: true },
    ],
  },
  {
    id: "salgados",
    title: "Salgados",
    tagline: "Pra matar aquela fominha",
    items: [
      { slug: "disco-carne", name: "Disco de carne", price: "R$ 10,00" },
      { slug: "americano-pq", name: "Americano de Presunto e Queijo", price: "R$ 10,00" },
      { slug: "esfirra-carne", name: "Esfirra de Carne", price: "R$ 10,00" },
      { slug: "disco-frango-queijo", name: "Disco de Frango com Queijo", price: "R$ 12,50" },
      { slug: "quiche-lorraine", name: "Quiche Lorraine", description: "Bacon e creme de queijo.", price: "R$ 18,00" },
      { slug: "quiche-alho-poro", name: "Quiche de Alho Poró", price: "R$ 18,00" },
      { slug: "torta-frango-catupiry", name: "Torta de Frango com Catupiry", price: "R$ 20,00" },
    ],
  },
  {
    id: "folhados",
    title: "Folhados",
    tagline: "Linha premium, massa amanteigada",
    items: [
      { slug: "croissant-amanteigado", name: "Croissant Amanteigado", description: "Croissant linha premium. Acompanha manteiga de leite.", price: "R$ 18,00" },
      { slug: "croissant-peru", name: "Croissant cremoso de Peito de Peru", description: "Linha premium, recheado com peito de peru, cream cheese e um toque de geleia de pimenta (120g).", price: "R$ 24,50" },
      { slug: "croissant-frango-queijo", name: "Croissant frango com queijo", description: "Linha premium, recheado com filé de peito de frango desfiado e mussarela.", price: "R$ 24,50" },
      { slug: "croissant-provencal", name: "Croissant Provençal", description: "Linha premium, recheado com queijo brie, damasco, mel e amêndoas laminadas.", price: "R$ 27,50" },
      { slug: "croissant-lagarto", name: "Croissant Lagarto a Gorgonzola", description: "Linha premium, recheado com lagarto desfiado e creme de gorgonzola.", price: "R$ 27,50" },
      { slug: "dueto-black", name: "Dueto doce Black", description: "Croissant linha premium recheado com Nutella e morangos.", price: "R$ 24,50" },
    ],
  },
  {
    id: "geladeira",
    title: "Da Geladeira",
    tagline: "Sempre bem geladinhos",
    items: [
      { slug: "agua-sem-gas", name: "Água Mineral sem Gás", description: "500ml", price: "R$ 3,50" },
      { slug: "agua-com-gas", name: "Água Mineral com Gás", description: "500ml", price: "R$ 5,50" },
      { slug: "toddynho", name: "Toddynho®", description: "200ml", price: "R$ 5,00" },
      { slug: "suco-caixinha", name: "Suco de caixinha", description: "200ml — Uva e Caju", price: "R$ 4,00" },
      { slug: "refri-mini", name: "Refrigerantes Mini", description: "220ml — Coca-cola Tradicional, Zero e Espresso, Guaraná Antártica, Fanta Laranja", price: "R$ 5,00" },
      { slug: "energetico", name: "Energético", description: "270ml", price: "R$ 8,50" },
      { slug: "energetico-zero", name: "Energético zero", description: "473ml", price: "R$ 11,90" },
      { slug: "kombuchas", name: "Kombuchas", description: "Pitaya e maracujá, Morango e limão, Tangerina e Hibisco, Abacaxi com hortelã.", price: "R$ 18,00" },
    ],
  },
  {
    id: "refrescar",
    title: "Para Refrescar",
    tagline: "Um respiro doce no meio do dia",
    items: [
      { slug: "sucos-casa", name: "Sucos da Casa", description: "400ml — Laranja, Abacaxi", price: "R$ 12,00" },
      { slug: "sucos-especiais", name: "Sucos Especiais", description: "400ml — Morango, Abacaxi com hortelã, Detox (fit).", price: "R$ 16,00", fit: true },
      { slug: "soda-italiana", name: "Soda Italiana", description: "400ml — Morango, Maçã verde.", price: "R$ 18,00" },
      { slug: "vienense", name: "Vienense", description: "400ml — Café expresso, sorvete de creme, calda de chocolate e chantilly.", price: "R$ 24,00" },
      { slug: "cappuccino-gelado", name: "Cappuccino Gelado", description: "400ml — Café expresso, cappuccino, sorvete de creme, calda de chocolate e chantilly.", price: "R$ 24,00" },
      { slug: "nutella-frozen", name: "Nutella® Frozen", description: "400ml — Taça de gelato de leite Ninho® batido com uma dose de espresso e muita Nutella®, acompanha chantilly.", price: "R$ 26,00" },
    ],
  },
  {
    id: "quentinhas",
    title: "Bebidas Quentinhas",
    tagline: "Do café curtinho ao chocolate cremoso",
    items: [
      { slug: "cafe-casa", name: "Café Casa do Sabor", description: "50ml", price: "R$ 4,00" },
      { slug: "cafe-casa-duplo", name: "Café Casa do Sabor Duplo", description: "100ml", price: "R$ 6,00" },
      { slug: "espresso-curto", name: "Café Espresso Curto", description: "50ml", price: "R$ 7,00" },
      { slug: "espresso-duplo", name: "Café Espresso Duplo", description: "100ml", price: "R$ 10,00" },
      { slug: "espresso-nespresso", name: "Café Espresso Nespresso Sabores", description: "50ml — Consultar opções disponíveis.", price: "R$ 10,00" },
      { slug: "cappuccino-br", name: "Cappuccino Brasileiro", description: "240ml — Leite semi desnatado, pó de cappuccino e nuvem de leite vaporizado.", price: "R$ 16,00" },
      { slug: "cappuccino-br-light", name: "Cappuccino Brasileiro light", description: "240ml", price: "R$ 18,00", fit: true },
      { slug: "cappuccino-italiano", name: "Cappuccino Italiano", description: "240ml — Café, leite semi desnatado, calda de chocolate, crema e canela.", price: "R$ 16,00" },
      { slug: "maltine", name: "Maltine Quentinho", description: "240ml — Caneca com leite quentinho, ovomaltine crocante e nuvem de leite vaporizado.", price: "R$ 16,00" },
      { slug: "chocolate-quente", name: "Chocolate Quente", description: "240ml", price: "R$ 20,00" },
      { slug: "adicionais", name: "Adicionais", description: "Chantilly, borda de Nutella (aplicada na borda da xícara).", price: "R$ 4,00" },
    ],
  },
];

export const navSections = [
  ...categories.map((c) => ({ id: c.id, title: c.title })),
  { id: "sobre", title: "Sobre a Casa" },
];
