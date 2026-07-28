export type MenuItem = {
  slug: string;
  name: string;
  description: string;
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
    id: "cafes",
    title: "Cafés",
    tagline: "O aroma que abraça",
    items: [
      { slug: "espresso", name: "Espresso", description: "Extração curta, corpo intenso e crema aveludada.", price: "R$ 6,00" },
      { slug: "capuccino", name: "Cappuccino", description: "Espresso, leite vaporizado e espuma sedosa com canela.", price: "R$ 12,00" },
      { slug: "latte-baunilha", name: "Latte de Baunilha", description: "Leite cremoso, espresso e um toque doce de baunilha.", price: "R$ 14,00" },
      { slug: "cafe-gelado", name: "Café Gelado Proteico", description: "Espresso duplo com leite desnatado e whey de baunilha.", price: "R$ 16,00", fit: true },
    ],
  },
  {
    id: "shakes",
    title: "Shakes & Vitaminas",
    tagline: "Energia pra treinar",
    items: [
      { slug: "shake-banana", name: "Shake Banana com Pasta de Amendoim", description: "Banana, whey, leite e pasta de amendoim integral.", price: "R$ 22,00", fit: true },
      { slug: "shake-morango", name: "Shake Morango Proteico", description: "Morango fresco, whey e iogurte natural desnatado.", price: "R$ 22,00", fit: true },
      { slug: "vitamina-verde", name: "Vitamina Verde", description: "Couve, abacaxi, gengibre, hortelã e água de coco.", price: "R$ 18,00", fit: true },
    ],
  },
  {
    id: "lanches",
    title: "Lanches",
    tagline: "Feitos com amor",
    items: [
      { slug: "pao-queijo", name: "Pão de Queijo", description: "Assado na hora, casquinha dourada e recheio derretido.", price: "R$ 5,00" },
      { slug: "sanduiche-frango", name: "Sanduíche de Frango Grelhado", description: "Pão integral, frango desfiado, cottage e folhas verdes.", price: "R$ 24,00", fit: true },
      { slug: "tapioca-queijo", name: "Tapioca de Queijo Branco", description: "Tapioca fininha com queijo minas e orégano.", price: "R$ 16,00", fit: true },
      { slug: "misto-quente", name: "Misto Quente Artesanal", description: "Pão de fermentação natural, presunto e queijo derretido.", price: "R$ 18,00" },
    ],
  },
  {
    id: "doces",
    title: "Doces & Sobremesas",
    tagline: "Um agrado pra você",
    items: [
      { slug: "brownie", name: "Brownie de Chocolate", description: "Denso, úmido e com pedaços de chocolate 70%.", price: "R$ 12,00" },
      { slug: "cheesecake-frutas", name: "Cheesecake de Frutas Vermelhas", description: "Base crocante, creme delicado e calda artesanal.", price: "R$ 16,00" },
      { slug: "bolo-cenoura-fit", name: "Bolo de Cenoura Fit", description: "Sem açúcar refinado, com cobertura de cacau 70%.", price: "R$ 10,00", fit: true },
    ],
  },
  {
    id: "sucos",
    title: "Sucos Naturais",
    tagline: "Da fruta pro copo",
    items: [
      { slug: "suco-laranja", name: "Suco de Laranja", description: "Espremido na hora, sem açúcar, sem água.", price: "R$ 12,00", fit: true },
      { slug: "suco-detox", name: "Suco Detox", description: "Couve, maçã, limão, gengibre e hortelã.", price: "R$ 14,00", fit: true },
      { slug: "agua-coco", name: "Água de Coco Gelada", description: "Servida bem gelada, direto do coco.", price: "R$ 10,00", fit: true },
    ],
  },
];
