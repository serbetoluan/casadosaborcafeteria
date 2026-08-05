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
import cappuccinoItalianoV2Asset from "@/assets/cappuccino_italiano_v2.png.asset.json";
import aguaComGasAsset from "@/assets/agua_com_gas.jpg.asset.json";
import aguaSemGasAsset from "@/assets/agua_sem_gas.jpg.asset.json";
import americanoAsset from "@/assets/americano.jpg.asset.json";
import cafeEspressoAsset from "@/assets/cafe_espresso.jpg.asset.json";
import croissantAmanteigadoAsset from "@/assets/croissant_amanteigado.jpg.asset.json";
import chipaAsset from "@/assets/chipa.jpg.asset.json";
import chocolateQuenteAsset from "@/assets/chocolate_quente.jpg.asset.json";
import crepiocaAsset from "@/assets/crepioca.jpg.asset.json";
import crepiocaFrangoAsset from "@/assets/crepioca_frango.jpg.asset.json";
import croissantPeruAsset from "@/assets/croissant_peru.jpg.asset.json";
import croissantFrangoQueijoAsset from "@/assets/croissant_frango_queijo.jpg.asset.json";
import croissantProvencalAsset from "@/assets/croissant_provencal.jpg.asset.json";
import croissantDuetoDoceAsset from "@/assets/croissant_dueto_doce.jpg.asset.json";
import energeticoZeroAsset from "@/assets/energetico_zero.jpg.asset.json";
import nutellaFrozenAsset from "@/assets/nutella_frozen.jpg.asset.json";
import energeticoExtraPowerAsset from "@/assets/energetico_extra_power.jpg.asset.json";
import enroladaoQueijoV2Asset from "@/assets/enroladao_queijo_v2.jpg.asset.json";
import esfirraCarneV2Asset from "@/assets/esfirra_carne_v2.jpg.asset.json";
import mistoQuenteAsset from "@/assets/misto_quente.jpg.asset.json";
import quicheAlhoPoroAsset from "@/assets/quiche_alho_poro.jpg.asset.json";
import omeleteV2Asset from "@/assets/omelete_v2.jpg.asset.json";
import ovosMexidosV2Asset from "@/assets/ovos_mexidos_v2.jpg.asset.json";
import paoQueijoMultigraosAsset from "@/assets/pao_queijo_multigraos.jpg.asset.json";
import biscoitoParmesaoAsset from "@/assets/biscoito_parmesao.jpg.asset.json";
import sucoCaixinhaAsset from "@/assets/suco_caixinha.jpg.asset.json";
import refrigeranteMiniAsset from "@/assets/refrigerante_mini.jpg.asset.json";
import sanduicheNaturalV2Asset from "@/assets/sanduiche_natural_v2.jpg.asset.json";
import sodaItalianaV2Asset from "@/assets/soda_italiana_v2.jpg.asset.json";
import sucoDaCasaV2Asset from "@/assets/suco_da_casa_v2.jpg.asset.json";
import vienenseAsset from "@/assets/vienense.jpg.asset.json";
import sucoDetoxAsset from "@/assets/suco_detox.jpg.asset.json";
import toastCapreseAsset from "@/assets/toast_caprese.jpg.asset.json";
import toddynhoAsset from "@/assets/toddynho.jpg.asset.json";
import tortaFrangoV2Asset from "@/assets/torta_frango_v2.jpg.asset.json";
import kombuchaDetalheAsset from "@/assets/kombucha_detalhe.jpg.asset.json";
import kombuchasBaldeAsset from "@/assets/kombuchas_balde.jpg.asset.json";


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
      { slug: "pao-queijo-multi", name: "Pão de queijo multigrãos", description: "1 uni", price: "R$ 2,50", priceValue: 2.5, image: paoQueijoMultigraosAsset.url },
      { slug: "biscoito-parmesao", name: "Biscoito Parmesão", description: "1 uni", price: "R$ 3,00", priceValue: 3, image: biscoitoParmesaoAsset.url },
      { slug: "chipa-mussarela", name: "Chipa", description: "1 uni", price: "R$ 3,00", priceValue: 3, image: chipaAsset.url },
      { slug: "enroladao-queijo", name: "Enroladão de queijo", description: "100g · 1 uni", price: "R$ 9,00", priceValue: 9, image: enroladaoQueijoV2Asset.url },
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
      { slug: "sanduiche-natural", name: "Sanduíche Natural de frango", description: "Sanduíche leve, prático e saboroso.", price: "R$ 18,00", priceValue: 18, fit: true, image: sanduicheNaturalV2Asset.url },
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
          { label: "Escolha o acompanhamento", required: true, choices: ["Mel", "Nutella (+R$ 4)", "Requeijão (+R$ 4)", "Geleia de morango (+R$ 4)"] },
        ],
      },
      {
        slug: "misto-quente",
        name: "Misto Quente",
        description: "Pão de forma, presunto e muita mussarela.",
        price: "R$ 18,00",
        priceValue: 18,
        image: mistoQuenteAsset.url,
        options: [{ label: "Um upzinho?", choices: ["Sem tomate", "Com rodela de tomate"] }],
      },
      { slug: "ovos-torrada-bacon", name: "Ovos mexidos com Torradas e Bacon", description: "Ovos mexidos, uma pitada de creme de leite, torradas e bacon.", price: "R$ 18,00", priceValue: 18, image: ovosMexidosV2Asset.url, options: [{ label: "Adicionais", multi: true, choices: ["Requeijão (+R$ 4)"] }] },
      { slug: "omelete-simples", name: "Omelete Simples", description: "Ovos preparados para omelete.", price: "R$ 18,00", priceValue: 18, image: omeleteV2Asset.url, options: [{ label: "Adicionais", multi: true, choices: ["Requeijão (+R$ 4)"] }] },
      { slug: "omelete-pq", name: "Omelete de Presunto e Queijo", description: "Ovos preparados para omelete, recheado com presunto e mussarela.", price: "R$ 20,00", priceValue: 20, image: omeleteV2Asset.url, options: [{ label: "Adicionais", multi: true, choices: ["Requeijão (+R$ 4)"] }] },
      { slug: "crepioca", name: "Crepioca", description: "Ovos preparados com tapioca.", price: "R$ 20,00", priceValue: 20, image: crepiocaAsset.url, options: [{ label: "Adicionais", multi: true, choices: ["Requeijão (+R$ 4)"] }] },
      { slug: "crepioca-pq", name: "Crepioca de Presunto e Queijo", description: "Ovos e tapioca, recheado com presunto e mussarela.", price: "R$ 22,00", priceValue: 22, image: crepiocaAsset.url, options: [{ label: "Adicionais", multi: true, choices: ["Requeijão (+R$ 4)"] }] },
      { slug: "crepioca-frango", name: "Crepioca de Frango com Queijo", description: "Ovos e tapioca, recheado com filé de peito de frango desfiado e mussarela.", price: "R$ 25,00", priceValue: 25, image: crepiocaFrangoAsset.url, options: [{ label: "Adicionais", multi: true, choices: ["Requeijão (+R$ 4)"] }] },
      {
        slug: "panqueca-banana",
        name: "Panqueca de banana com aveia",
        description: "Banana, ovo e aveia — leve e nutritiva.",
        price: "R$ 18,00",
        priceValue: 18,
        fit: true,
        options: [{ label: "Escolha o acompanhamento", required: true, choices: ["Mel", "Requeijão (+R$ 4)", "Mussarela"] }],
      },
      { slug: "toast-caprese", name: "Toast Caprese", description: "Pão baguete artesanal, creme de ricota, pesto de manjericão e tomate confit.", price: "R$ 25,00", priceValue: 25, image: toastCapreseAsset.url, options: [{ label: "Adicionais", multi: true, choices: ["Requeijão (+R$ 4)"] }] },
    ],
  },
  {
    id: "salgados",
    title: "Salgados",
    tagline: "Pra matar aquela fominha",
    items: [
      { slug: "americano-pq", name: "Americano de Presunto e Queijo", price: "R$ 10,00", priceValue: 10, image: americanoAsset.url },
      { slug: "esfirra-carne", name: "Esfirra de Carne", price: "R$ 10,00", priceValue: 10, image: esfirraCarneV2Asset.url },
      { slug: "disco-carne", name: "Disco de carne", price: "R$ 10,00", priceValue: 10, image: disquinhoCarneAsset.url },
      { slug: "disco-frango-queijo", name: "Disco de Frango com Queijo", price: "R$ 12,50", priceValue: 12.5, image: disquinhoFrangoAsset.url },
      { slug: "quiche-alho-poro", name: "Quiche de Alho Poró", price: "R$ 18,00", priceValue: 18, image: quicheAlhoPoroAsset.url },
      { slug: "quiche-lorraine", name: "Quiche Lorraine", description: "Bacon e creme de queijo.", price: "R$ 18,00", priceValue: 18, image: tortaFrangoAsset.url },
      { slug: "torta-frango-catupiry", name: "Torta de Frango com Catupiry", price: "R$ 20,00", priceValue: 20, image: tortaFrangoV2Asset.url },
    ],
  },
  {
    id: "folhados",
    title: "Folhados",
    tagline: "Linha premium, massa amanteigada",
    items: [
      { slug: "croissant-amanteigado", name: "Croissant Amanteigado", description: "Croissant linha premium. Acompanha manteiga de leite.", price: "R$ 18,00", priceValue: 18, image: croissantAmanteigadoAsset.url, options: [{ label: "Adicionais", multi: true, choices: ["Nutella (+R$ 4)", "Requeijão (+R$ 4)", "Geleia de morango (+R$ 4)"] }] },
      { slug: "croissant-peru", name: "Croissant cremoso de Peito de Peru", description: "Linha premium, recheado com peito de peru, cream cheese e um toque de geleia de pimenta (120g).", price: "R$ 24,50", priceValue: 24.5, image: croissantPeruAsset.url },
      { slug: "croissant-frango-queijo", name: "Croissant frango com queijo", description: "Linha premium, recheado com filé de peito de frango desfiado e mussarela.", price: "R$ 24,50", priceValue: 24.5, image: croissantFrangoQueijoAsset.url },
      { slug: "croissant-provencal", name: "Croissant Provençal", description: "Linha premium, recheado com queijo brie, damasco, mel e amêndoas laminadas.", price: "R$ 27,50", priceValue: 27.5, image: croissantProvencalAsset.url },
      { slug: "croissant-lagarto", name: "Croissant Lagarto a Gorgonzola", description: "Linha premium, recheado com lagarto desfiado e creme de gorgonzola.", price: "R$ 27,50", priceValue: 27.5 },
      { slug: "dueto-black", name: "Dueto doce Black", description: "Croissant linha premium recheado com Nutella e morangos.", price: "R$ 24,50", priceValue: 24.5, image: croissantDuetoDoceAsset.url },
    ],
  },
  {
    id: "geladeira",
    title: "Da Geladeira",
    tagline: "Sempre bem geladinhos",
    items: [
      { slug: "agua-sem-gas", name: "Água Mineral sem Gás", description: "500ml", price: "R$ 3,50", priceValue: 3.5, image: aguaSemGasAsset.url },
      { slug: "agua-com-gas", name: "Água Mineral com Gás", description: "500ml", price: "R$ 5,50", priceValue: 5.5, image: aguaComGasAsset.url },
      { slug: "toddynho", name: "Toddynho®", description: "200ml", price: "R$ 5,00", priceValue: 5, image: toddynhoAsset.url },
      {
        slug: "suco-caixinha",
        name: "Suco de caixinha",
        description: "200ml",
        price: "R$ 4,00",
        priceValue: 4,
        image: sucoCaixinhaAsset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Uva", "Caju"] }],
      },
      {
        slug: "refri-mini",
        name: "Refrigerantes Mini",
        description: "220ml",
        price: "R$ 5,00",
        priceValue: 5,
        image: refrigeranteMiniAsset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Coca-cola Tradicional", "Coca-cola Zero", "Coca-cola Espresso", "Guaraná Antártica", "Fanta Laranja"] }],
      },
      { slug: "energetico", name: "Energético", description: "270ml", price: "R$ 8,50", priceValue: 8.5, image: energeticoExtraPowerAsset.url },
      { slug: "energetico-zero", name: "Energético zero", description: "473ml", price: "R$ 11,90", priceValue: 11.9, image: energeticoZeroAsset.url },
      {
        slug: "kombuchas",
        name: "Kombuchas",
        description: "Fermentado natural, gaseificação leve.",
        price: "R$ 18,00",
        priceValue: 18,
        image: kombuchasBaldeAsset.url,
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
        image: sucoDaCasaV2Asset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Laranja", "Abacaxi"] }],
      },
      {
        slug: "sucos-especiais",
        name: "Sucos Especiais",
        description: "400ml — receitas da Casa. Opção Detox é fit.",
        price: "R$ 16,00",
        priceValue: 16,
        fit: true,
        image: sucoDetoxAsset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Morango", "Abacaxi com hortelã", "Detox (fit)"] }],
      },
      {
        slug: "soda-italiana",
        name: "Soda Italiana",
        description: "400ml — refrescância borbulhante.",
        price: "R$ 18,00",
        priceValue: 18,
        image: sodaItalianaV2Asset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Morango", "Maçã verde"] }],
      },
      { slug: "cappuccino-gelado", name: "Cappuccino Gelado", description: "400ml — Café expresso, cappuccino, sorvete de creme, calda de chocolate e chantilly.", price: "R$ 24,00", priceValue: 24, image: cappuccinoGeladoAsset.url },
      { slug: "cafe-nutella", name: "Café Nutella", description: "400ml — Taça de gelato de leite Ninho® batido com uma dose de espresso e muita Nutella®, acompanha chantilly.", price: "R$ 26,00", priceValue: 26, image: nutellaFrozenAsset.url },
      { slug: "vienense", name: "Vienense", description: "400ml — Café expresso, sorvete de creme, calda de chocolate e chantilly.", price: "R$ 24,00", priceValue: 24, image: vienenseAsset.url },
    ],
  },
  {
    id: "quentinhas",
    title: "Bebidas Quentinhas",
    tagline: "Do café curtinho ao chocolate cremoso",
    items: [
      { 
        slug: "espresso-curto", 
        name: "Espresso", 
        description: "50ml", 
        price: "R$ 7,00", 
        priceValue: 7, 
        image: cafeEspressoAsset.url,
        options: [
          { 
            label: "Adicionais", 
            multi: true, 
            choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Nutella (+R$ 4)"] 
          }
        ]
      },
      { 
        slug: "espresso-duplo", 
        name: "Espresso duplo", 
        description: "100ml", 
        price: "R$ 10,00", 
        priceValue: 10, 
        image: cafeEspressoAsset.url,
        options: [
          { 
            label: "Adicionais", 
            multi: true, 
            choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Nutella (+R$ 4)"] 
          }
        ]
      },
      { 
        slug: "cappuccino-italiano", 
        name: "Cappuccino italiano", 
        description: "240ml — Café, leite semi desnatado, calda de chocolate, crema e canela.", 
        price: "R$ 16,00", 
        priceValue: 16,
        image: cappuccinoItalianoV2Asset.url,
        options: [
          { 
            label: "Adicionais", 
            multi: true, 
            choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Nutella (+R$ 4)"] 
          }
        ]
      },
      { 
        slug: "cappuccino-br", 
        name: "Cappuccino brasileiro", 
        description: "240ml — Leite semi desnatado, pó de cappuccino e nuvem de leite vaporizado.", 
        price: "R$ 16,00", 
        priceValue: 16,
        image: cappuccinoItalianoAsset.url,
        options: [
          { 
            label: "Adicionais", 
            multi: true, 
            choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Nutella (+R$ 4)"] 
          }
        ]
      },
      { 
        slug: "cappuccino-br-light", 
        name: "Cappuccino brasileiro light", 
        description: "240ml — versão mais leve, sem abrir mão do sabor.", 
        price: "R$ 18,00", 
        priceValue: 18, 
        fit: true,
        options: [
          { 
            label: "Adicionais", 
            multi: true, 
            choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Nutella (+R$ 4)"] 
          }
        ]
      },
      { 
        slug: "maltine", 
        name: "Maltine quentinho", 
        description: "240ml — Caneca com leite quentinho, ovomaltine crocante e nuvem de leite vaporizado.", 
        price: "R$ 16,00", 
        priceValue: 16,
        options: [
          { 
            label: "Adicionais", 
            multi: true, 
            choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Nutella (+R$ 4)"] 
          }
        ]
      },
      { 
        slug: "chocolate-quente", 
        name: "Chocolate quente", 
        description: "240ml — cremoso e aconchegante.", 
        price: "R$ 20,00", 
        priceValue: 20, 
        image: chocolateQuenteAsset.url,
        options: [
          { 
            label: "Adicionais", 
            multi: true, 
            choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Nutella (+R$ 4)"] 
          }
        ]
      },
    ],
  },
];

export const navSections = [
  ...categories.map((c) => ({ id: c.id, title: c.title })),
  { id: "sobre", title: "Sobre a Casa" },
];

export const WHATSAPP_NUMBER = "5564992236969";
