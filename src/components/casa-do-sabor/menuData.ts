import paoQueijoAsset from "@/assets/pao_de_queijo.png.asset.json";
import saladaFrutasAsset from "@/assets/salada_de_frutas.png.asset.json";
import waffleAsset from "@/assets/waffle.png.asset.json";
import enroladinhoAsset from "@/assets/enroladinho_de_queijo.png.asset.json";
import disquinhoFrangoAsset from "@/assets/disquinho_frango.png.asset.json";
import tortaFrangoAsset from "@/assets/torta_frango_catupiry.png.asset.json";
import disquinhoCarneAsset from "@/assets/disquinho_carne.png.asset.json";
import cappuccinoGeladoAsset from "@/assets/cappuccino_gelado.png.asset.json";
import cappuccinoItalianoAsset from "@/assets/cappuccino_italiano.png.asset.json";
import cappuccinoItalianoV2Asset from "@/assets/cappuccino_italiano_v2.png.asset.json";
import aguaComGasAsset from "@/assets/agua_com_gas.jpg.asset.json";
import aguaSemGasAsset from "@/assets/agua_sem_gas.jpg.asset.json";
import americanoAsset from "@/assets/americano.jpg.asset.json";
import cafeEspressoAsset from "@/assets/cafe_espresso.jpg.asset.json";
import croissantAmanteigadoAsset from "@/assets/croissant_amanteigado.jpg.asset.json";
import croissantFolhadoAsset from "@/assets/croissant_folhado.jpg.asset.json";
import maltineQuentinhoAsset from "@/assets/maltine_quentinho.jpg.asset.json";
import chipaAsset from "@/assets/chipa.jpg.asset.json";
import chocolateQuenteAsset from "@/assets/chocolate_quente.jpg.asset.json";
import crepiocaAsset from "@/assets/crepioca.jpg.asset.json";
import crepiocaFrangoAsset from "@/assets/crepioca_frango.jpg.asset.json";
import croissantPeruAsset from "@/assets/croissant_peru.jpg.asset.json";
import croissantFrangoQueijoAsset from "@/assets/croissant_frango_queijo.jpg.asset.json";
import croissantProvencalAsset from "@/assets/croissant_provencal.jpg.asset.json";
import croissantDuetoDoceAsset from "@/assets/croissant_dueto_doce.jpg.asset.json";
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
import kombuchasBaldeAsset from "@/assets/kombuchas_balde.jpg.asset.json";
import cappuccinoLightAsset from "@/assets/cappuccino_light.jpg.asset.json";
import panquecaBananaAsset from "@/assets/panqueca_banana.png.asset.json";
import affogatoCookieBaileysAsset from "@/assets/affogato_cookie_baileys.jpg.asset.json";
import pipoquinhaGourmetAsset from "@/assets/pipoquinha_gourmet.jpg.asset.json";
import copinhoGelatoAsset from "@/assets/copinho_gelato.jpg.asset.json";
import waffleMorangoBananaNutellaAsset from "@/assets/waffle_de_morango_banana_e_nutella.jpg.asset.json";
import brownieTradicionalAsset from "@/assets/brownie_tradicional.jpg.asset.json";
import biscoitoSuicoAsset from "@/assets/biscoito_suico.jpg.asset.json";
import aperolSpritzAsset from "@/assets/aperol_spritz.jpg.asset.json";
import boloGeladoFrutasVermelhasAsset from "@/assets/bolo_gelado_de_frutas_vermelhas.jpg.asset.json";
import cremesAsset from "@/assets/cremes.jpg.asset.json";
import bananaSplitAsset from "@/assets/banana_split.jpg.asset.json";
import macaronsAsset from "@/assets/macarons.jpg.asset.json";
import fatiaCenouraAsset from "@/assets/fatia_de_cenoura.jpg.asset.json";
import fatiaNinhoBrigadeiroAsset from "@/assets/fatia_de_ninho_com_brigadeiro.jpg.asset.json";
import brigadeiroBelgaAsset from "@/assets/brigadeiro_belga.jpg.asset.json";
import miniPudimAsset from "@/assets/mini_pudim.jpg.asset.json";
import balaBaianaAsset from "@/assets/bala_baiana.jpeg.asset.json";
import pedacinhoInfanciaAsset from "@/assets/pedacinho_de_infancia.jpg.asset.json";
import cookiesAsset from "@/assets/cookies.jpg.asset.json";
import waffleBananaMelAsset from "@/assets/waffle_com_banana_e_mel.jpg.asset.json";
import grandGateauAsset from "@/assets/grand_gateau.jpg.asset.json";

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
  /** Subtítulo secundário exibido abaixo do título (ex.: "Drinks alcóolicos") */
  subtitle?: string;
  /** Aviso discreto exibido no topo da seção */
  notice?: string;
  /** Marca parceira creditada no início da seção */
  partner?: { name: string; logo?: string };
  items: MenuItem[];
};

const ADICIONAIS_CAFE: MenuOptionGroup = {
  label: "Adicionais",
  multi: true,
  choices: ["Chantilly (+R$ 4)", "Borda de Nutella (+R$ 4)", "Borda de doce de leite (+R$ 4)"],
};

export const categories: MenuCategory[] = [
  {
    id: "quitandinhas",
    title: "Quitandinhas",
    tagline: "Do forno, quentinhos",
    items: [
      { slug: "pao-queijo", name: "Pão de queijo", description: "1 unidade", price: "R$ 1,50", priceValue: 1.5, image: paoQueijoAsset.url },
      { slug: "pao-queijo-multi", name: "Pão de queijo multigrãos", description: "1 unidade", price: "R$ 2,50", priceValue: 2.5, image: paoQueijoMultigraosAsset.url },
      { slug: "broa-milho", name: "Broa de milho doce", description: "1 unidade", price: "R$ 2,50", priceValue: 2.5 },
      { slug: "biscoitinho-queijo", name: "Biscoitinho de Queijo", description: "1 unidade", price: "R$ 1,50", priceValue: 1.5 },
      { slug: "biscoito-suico", name: "Biscoito Suíço", description: "1 unidade", price: "R$ 3,00", priceValue: 3 , image: biscoitoSuicoAsset.url },
      { slug: "biscoito-parmesao", name: "Biscoito Parmesão", description: "1 unidade", price: "R$ 3,00", priceValue: 3, image: biscoitoParmesaoAsset.url },
      { slug: "chipa-mussarela", name: "Chipa Mussarela", description: "1 unidade", price: "R$ 3,00", priceValue: 3, image: chipaAsset.url },
      { slug: "mini-enroladinho", name: "Mini Enroladinho de queijo", description: "30g · 1 unidade", price: "R$ 3,00", priceValue: 3, image: enroladinhoAsset.url },
      { slug: "enroladao-queijo", name: "Enroladão de queijo", description: "100g · 1 unidade", price: "R$ 9,00", priceValue: 9, image: enroladaoQueijoV2Asset.url },
      {
        slug: "croissant-massa-folheada",
        name: "Croissant massa folheada",
        description: "1 unidade",
        price: "R$ 9,00",
        priceValue: 9,
        image: croissantFolhadoAsset.url,
        options: [{ label: "Escolha o recheio", required: true, choices: ["Presunto e queijo", "Queijo", "Goiabada e queijo", "Chocolate"] }],
      },
    ],
  },
  {
    id: "lanchinhos",
    title: "Lanchinhos",
    tagline: "Feitos na hora, feitos com amor",
    items: [
      {
        slug: "pedacinho-infancia",
        name: "Pedacinho de Infância",
        description: "Mini bolinho de Cenoura, Chocolate ou Limão com muita cobertura · 1 unidade",
        price: "R$ 14,00",
        priceValue: 14,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Cenoura", "Chocolate", "Limão"] }],
        image: pedacinhoInfanciaAsset.url,
      },
      {
        slug: "waffle-cremo",
        name: "Waffle de Cremo Queijo ou Cremo queijo fit",
        description: "Acompanha: Mel, Nutella, Requeijão ou Geleia de morango · 1 unidade",
        price: "R$ 18,00",
        priceValue: 18,
        image: waffleAsset.url,
        options: [
          { label: "Versão", required: true, choices: ["Tradicional", "Fit"] },
          { label: "Escolha o acompanhamento", required: true, choices: ["Mel", "Nutella", "Requeijão", "Geleia de morango"] },
        ],
      },
      {
        slug: "misto-quente",
        name: "Misto Quente",
        description: "Pão de forma, presunto, muita mussarela e, se preferir, peça uma rodela de tomate para dar aquele Up! · 1 unidade",
        price: "R$ 18,00",
        priceValue: 18,
        image: mistoQuenteAsset.url,
        options: [{ label: "Um upzinho?", choices: ["Sem tomate", "Com rodela de tomate"] }],
      },
      { slug: "ovos-torrada-bacon", name: "Ovos mexidos com Torradas e Bacon", description: "Ovos mexidos, uma pitada de creme de leite e torradas · 1 unidade", price: "R$ 18,00", priceValue: 18, image: ovosMexidosV2Asset.url },
      { slug: "omelete-simples", name: "Omelete Simples", description: "Ovos preparados para omelete · 1 unidade", price: "R$ 18,00", priceValue: 18, image: omeleteV2Asset.url },
      { slug: "omelete-pq", name: "Omelete de Presunto e Queijo", description: "Ovos preparados para omelete, recheado com presunto e queijo mussarela · 1 unidade", price: "R$ 20,00", priceValue: 20, image: omeleteV2Asset.url },
      { slug: "toast-ricota", name: "Toast de Ricota", description: "Pão baguete artesanal, creme de ricota, pesto de manjericão e tomate confit · 1 unidade", price: "R$ 25,00", priceValue: 25, image: toastCapreseAsset.url },
    ],
  },
  {
    id: "salgados",
    title: "Salgados",
    tagline: "Pra matar aquela fominha",
    items: [
      { slug: "disco-carne", name: "Disco de carne", description: "1 unidade", price: "R$ 10,00", priceValue: 10, image: disquinhoCarneAsset.url },
      { slug: "americano-pq", name: "Americano de Presunto e Queijo", description: "1 unidade", price: "R$ 10,00", priceValue: 10, image: americanoAsset.url },
      { slug: "esfirra-carne", name: "Esfirra de Carne", description: "1 unidade", price: "R$ 10,00", priceValue: 10, image: esfirraCarneV2Asset.url },
      { slug: "disco-frango-queijo", name: "Disco de Frango com Queijo", description: "1 unidade", price: "R$ 12,50", priceValue: 12.5, image: disquinhoFrangoAsset.url },
      { slug: "coxinha-frango", name: "Coxinha de Frango com Catupiry", description: "1 unidade", price: "R$ 14,00", priceValue: 14 },
      { slug: "quiche-lorraine", name: "Quiche Lorraine", description: "Bacon e creme de queijo · 1 unidade", price: "R$ 18,00", priceValue: 18, image: tortaFrangoAsset.url },
      { slug: "quiche-alho-poro", name: "Quiche de Alho Poró", description: "1 unidade", price: "R$ 18,00", priceValue: 18, image: quicheAlhoPoroAsset.url },
      { slug: "torta-frango-catupiry", name: "Torta de Frango com Catupiry", description: "1 unidade", price: "R$ 20,00", priceValue: 20, image: tortaFrangoV2Asset.url },
      { slug: "panqueca-frango", name: "Panqueca de Frango", description: "1 unidade", price: "R$ 25,00", priceValue: 25 },
      { slug: "panqueca-carne", name: "Panqueca de Carne", description: "1 unidade", price: "R$ 25,00", priceValue: 25 },
    ],
  },
  {
    id: "casa-fit",
    title: "Casa Fit",
    tagline: "Leve, gostoso e do seu jeito",
    items: [
      { slug: "fit-pao-queijo-multi", name: "Pão de queijo multigrãos", description: "Chia, Linhaça, Quinoa · 1 unidade", price: "R$ 2,50", priceValue: 2.5, fit: true, image: paoQueijoMultigraosAsset.url },
      {
        slug: "panqueca-banana",
        name: "Panqueca de banana com aveia",
        description: "Banana, ovo e aveia · 1 unidade",
        price: "R$ 18,00",
        priceValue: 18,
        fit: true,
        image: panquecaBananaAsset.url,
        options: [{ label: "Escolha o acompanhamento", required: true, choices: ["Mel", "Requeijão", "Mussarela"] }],
      },
      {
        slug: "waffle-fit",
        name: "Waffle de Cremo queijo fit",
        description: "1 unidade",
        price: "R$ 18,00",
        priceValue: 18,
        fit: true,
        image: waffleAsset.url,
        options: [{ label: "Escolha o acompanhamento", required: true, choices: ["Mel", "Nutella", "Requeijão cremoso", "Geleia de morango"] }],
      },
      { slug: "crepioca", name: "Crepioca", description: "Ovos preparados com tapioca · 1 unidade", price: "R$ 18,00", priceValue: 18, fit: true, image: crepiocaAsset.url },
      { slug: "crepioca-pq", name: "Crepioca de Presunto e Queijo", description: "Ovos preparados com tapioca, recheado com presunto e queijo mussarela · 1 unidade", price: "R$ 22,00", priceValue: 22, fit: true, image: crepiocaAsset.url },
      { slug: "crepioca-frango", name: "Crepioca de Frango com Queijo", description: "Ovos preparados com tapioca, recheado com filé de peito de frango desfiado e queijo mussarela · 1 unidade", price: "R$ 25,00", priceValue: 25, fit: true, image: crepiocaFrangoAsset.url },
      { slug: "saladinha-frutas", name: "Saladinha de frutas", description: "1 unidade", price: "R$ 12,00", priceValue: 12, fit: true, image: saladaFrutasAsset.url },
      { slug: "sanduiche-natural", name: "Sanduíche Natural de frango", description: "1 unidade", price: "R$ 18,00", priceValue: 18, fit: true, image: sanduicheNaturalV2Asset.url },
      { slug: "fit-cappuccino-light", name: "Cappuccino Brasileiro light", description: "240ml", price: "R$ 18,00", priceValue: 18, fit: true, image: cappuccinoLightAsset.url },
      { slug: "suco-verde", name: "Suco Verde (Detox)", description: "Laranja, couve, maçã e gengibre · 400ml", price: "R$ 18,00", priceValue: 18, fit: true, image: sucoDetoxAsset.url },
      { slug: "suco-vermelho", name: "Suco Vermelho (Termogênico)", description: "Hibisco, maçã, morango, canela e gengibre · 400ml", price: "R$ 18,00", priceValue: 18, fit: true },
      { slug: "suco-rosa", name: "Suco Rosa (Imunidade Antioxidante)", description: "Beterraba, cenoura, laranja e gengibre · 400ml", price: "R$ 18,00", priceValue: 18, fit: true },
      {
        slug: "fit-kombucha",
        name: "Kombucha",
        description: "280ml",
        price: "R$ 18,00",
        priceValue: 18,
        fit: true,
        image: kombuchasBaldeAsset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Pitaya e maracujá", "Morango e limão", "Tangerina e Hibisco", "Abacaxi com hortelã"] }],
      },
    ],
  },
  {
    id: "folhados",
    title: "Folhados",
    tagline: "Linha premium, massa amanteigada",
    items: [
      { slug: "pastel-nata", name: "Pastel de Nata", description: "Famoso pastel de Nata – Estilo Português · 1 unidade", price: "R$ 12,00", priceValue: 12 },
      { slug: "croissant-amanteigado", name: "Croissant Amanteigado", description: "Croissant linha premium. Acompanha manteiga de leite · 1 unidade", price: "R$ 18,00", priceValue: 18, image: croissantAmanteigadoAsset.url },
      { slug: "croissant-peru", name: "Croissant cremoso de Peito de Peru", description: "Croissant linha premium, recheado com peito de Peru, cream cheese, finalizado com um toque de geleia de pimenta (120g) · 1 unidade", price: "R$ 24,50", priceValue: 24.5, image: croissantPeruAsset.url },
      { slug: "croissant-frango-queijo", name: "Croissant frango com queijo", description: "Croissant linha premium recheado com filé de peito de frango desfiado e queijo mussarela · 1 unidade", price: "R$ 24,50", priceValue: 24.5, image: croissantFrangoQueijoAsset.url },
      { slug: "croissant-provencal", name: "Croissant Provençal", description: "Queijo brie, damasco, mel e amêndoas laminadas · 1 unidade", price: "R$ 27,50", priceValue: 27.5, image: croissantProvencalAsset.url },
      { slug: "dueto-black", name: "Dueto doce Black", description: "Croissant linha premium recheado com Nutella e morangos · 1 unidade", price: "R$ 24,50", priceValue: 24.5, image: croissantDuetoDoceAsset.url },
      { slug: "dueto-white", name: "Dueto doce White", description: "Croissant linha premium recheado com creme de Ninho e morangos · 1 unidade", price: "R$ 24,50", priceValue: 24.5 },
      {
        slug: "new-york-roll",
        name: "New York Roll",
        description: "O queridinho dos EUA! · 1 unidade",
        price: "R$ 25,00",
        priceValue: 25,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Pistache", "Brigadeiro", "Ninho", "Dois amores"] }],
      },
    ],
  },
  {
    id: "geladeira",
    title: "Da Nossa Geladeira",
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
        options: [{ label: "Escolha o sabor", required: true, choices: ["Coca-cola", "Coca-cola zero", "Fanta laranja"] }],
      },
      {
        slug: "refrigerantes",
        name: "Refrigerantes",
        description: "350ml",
        price: "R$ 6,00",
        priceValue: 6,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Coca-cola", "Coca-cola zero", "Guaraná Antártica", "Guaraná Antártica zero", "Pepsi zero"] }],
      },
      { slug: "energetico", name: "Energético", description: "270ml", price: "R$ 8,50", priceValue: 8.5, image: energeticoExtraPowerAsset.url },
      { slug: "copo-limao-gelo", name: "Copo com Limão e Gelo", price: "R$ 3,00", priceValue: 3 },
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
        description: "400ml",
        price: "R$ 12,00",
        priceValue: 12,
        image: sucoDaCasaV2Asset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Laranja", "Abacaxi", "Acerola", "Caju"] }],
      },
      {
        slug: "sucos-especiais",
        name: "Sucos Especiais",
        description: "400ml",
        price: "R$ 16,00",
        priceValue: 16,
        image: sucoDetoxAsset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Maracujá", "Morango", "Abacaxi com hortelã", "Laranja com morango", "Laranja com acerola"] }],
      },
      { slug: "vienense", name: "Vienense", description: "Café expresso, sorvete de creme, calda de chocolate e chantilly · 400ml", price: "R$ 24,00", priceValue: 24, image: vienenseAsset.url },
      { slug: "cappuccino-gelado", name: "Cappuccino Gelado", description: "Café expresso, cappuccino, sorvete de creme, calda de chocolate e chantilly · 400ml", price: "R$ 24,00", priceValue: 24, image: cappuccinoGeladoAsset.url },
      { slug: "afogatto", name: "Afogatto", description: "Taça de gelato de leite ninho com castanhas e chantilly, acompanha um espresso quentinho · 400ml", price: "R$ 24,00", priceValue: 24 },
      { slug: "nutella-frozen", name: "Nutella® Frozen", description: "Taça de gelato de leite Ninho® batido com uma dose de espresso e muita Nutella®, acompanha chantilly · 400ml", price: "R$ 25,00", priceValue: 25, image: nutellaFrozenAsset.url },
      { slug: "milkshake-ovomaltine", name: "Milkshake de Ovomaltine®", description: "Shake cremoso de gelato de leite ninho e Ovomaltine® · 400ml", price: "R$ 25,00", priceValue: 25 },
      { slug: "crocante-doce-leite", name: "Crocante de Doce de Leite", description: "Frappe cremoso de gelato de leite Ninho® e doce de leite, uma dose de espresso e castanhas. Acompanha chantilly · 400ml", price: "R$ 25,00", priceValue: 25 },
      {
        slug: "gelato-shake",
        name: "Gelato Shake",
        description: "Shake cremoso de gelato (escolha seu sabor preferido), acompanha calda de morango ou chocolate e chantilly · 400ml",
        price: "R$ 26,00",
        priceValue: 26,
        options: [{ label: "Escolha a calda", required: true, choices: ["Morango", "Chocolate"] }],
      },
      {
        slug: "gelato-sunday",
        name: "Gelato Sunday",
        description: "Sunday cremoso de gelato (escolha até três sabores), acompanha calda de morango ou chocolate, chantilly, castanhas, cereja e biju · 400ml",
        price: "R$ 26,00",
        priceValue: 26,
        options: [{ label: "Escolha a calda", required: true, choices: ["Morango", "Chocolate"] }],
      },
    ],
  },
  {
    id: "quentinhas",
    title: "Bebidas Quentinhas",
    tagline: "Do café curtinho ao chocolate cremoso",
    items: [
      { slug: "cafe-casa", name: "Café Casa do Sabor", description: "50ml", price: "R$ 4,00", priceValue: 4, image: cafeEspressoAsset.url, options: [ADICIONAIS_CAFE] },
      { slug: "cafe-casa-duplo", name: "Café Casa do Sabor Duplo", description: "100ml", price: "R$ 6,00", priceValue: 6, image: cafeEspressoAsset.url, options: [ADICIONAIS_CAFE] },
      { slug: "espresso-curto", name: "Café Espresso Curto", description: "50ml", price: "R$ 7,00", priceValue: 7, image: cafeEspressoAsset.url, options: [ADICIONAIS_CAFE] },
      { slug: "espresso-duplo", name: "Café Espresso Duplo", description: "100ml", price: "R$ 10,00", priceValue: 10, image: cafeEspressoAsset.url, options: [ADICIONAIS_CAFE] },
      { slug: "hario-v60", name: "Café coado Hario v60", description: "Técnica japonesa para maximizar a extração de sabores durante o preparo · 50ml", price: "R$ 16,00", priceValue: 16 },
      { slug: "prensa-francesa", name: "Prensa Francesa", description: "Técnica francesa de extração sem filtro, trazendo um produto mais encorpado e aromático · 100ml", price: "R$ 16,00", priceValue: 16 },
      { slug: "cha", name: "Chá Quentinho ou Gelado", description: "Consultar sabores disponíveis · 240ml", price: "R$ 12,00", priceValue: 12 },
      { slug: "cappuccino-br-light", name: "Cappuccino Brasileiro light", description: "240ml", price: "R$ 18,00", priceValue: 18, fit: true, image: cappuccinoLightAsset.url, options: [ADICIONAIS_CAFE] },
      { slug: "cappuccino-br", name: "Cappuccino Brasileiro", description: "Leite semi desnatado, pó de cappuccino e nuvem de leite vaporizado · 240ml", price: "R$ 16,00", priceValue: 16, image: cappuccinoItalianoAsset.url, options: [ADICIONAIS_CAFE] },
      { slug: "cappuccino-italiano", name: "Cappuccino Italiano", description: "Café, leite semidesnatado, calda de chocolate, crema e canela · 240ml", price: "R$ 16,00", priceValue: 16, image: cappuccinoItalianoV2Asset.url, options: [ADICIONAIS_CAFE] },
      { slug: "pistachioccino", name: "Pistachioccino", description: "Cappuccino cremoso, leite semidesnatado, nuvem de leite vaporizado, bordas da xícara com creme de pistache e pistache crocante · 240ml", price: "R$ 22,00", priceValue: 22 },
      { slug: "maltine", name: "Maltine Quentinho", description: "Caneca com leite quentinho, ovomaltine crocante e nuvem de leite vaporizado · 240ml", price: "R$ 16,00", priceValue: 16, image: maltineQuentinhoAsset.url },
      { slug: "chocolate-quente", name: "Chocolate Quente", description: "240ml", price: "R$ 20,00", priceValue: 20, image: chocolateQuenteAsset.url },
      {
        slug: "adicionais",
        name: "Adicionais",
        description: "Chantilly, borda de Nutella ou borda de doce de leite (aplicadas na borda da xícara)",
        price: "R$ 4,00",
        priceValue: 4,
        options: [{ label: "Escolha o adicional", required: true, choices: ["Chantilly", "Borda de Nutella", "Borda de doce de leite"] }],
      },
    ],
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    subtitle: "Drinks alcóolicos",
    tagline: "A hora dourada da Casa",
    notice: "Bebidas alcoólicas — venda proibida para menores de 18 anos.",
    items: [
      { slug: "espresso-martini", name: "Espresso Martini", description: "Café espresso gelado, licor Baileys e gelo · 400ml", price: "R$ 24,00", priceValue: 24 },
      { slug: "cappuccino-alcoolico", name: "Cappuccino Alcóolico", description: "Cappuccino, licor de Amarula, creme de leite e gelo · 400ml", price: "R$ 24,00", priceValue: 24 },
      { slug: "afogatto-cookie-baileys", name: "Afogatto Cookie Baileys", description: "Sorvete de creme, calda de chocolate, licor Baileys, café espresso e mini cookie da Lê · 400ml", price: "R$ 28,00", priceValue: 28 , image: affogatoCookieBaileysAsset.url },
      { slug: "aperol-spritz", name: "Aperol Spritz", description: "Vinho frizante, Aperol, laranja e gelo · 400ml", price: "R$ 28,00", priceValue: 28 , image: aperolSpritzAsset.url },
    ],
  },
  {
    id: "mocktail",
    title: "Mocktail",
    subtitle: "Drinks não alcóolicos",
    tagline: "Borbulhas sem álcool",
    items: [
      {
        slug: "soda-italiana",
        name: "Soda Italiana",
        description: "400ml",
        price: "R$ 18,50",
        priceValue: 18.5,
        image: sodaItalianaV2Asset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Limão siciliano", "Morango", "Maçã verde", "Maracujá vermelho", "Kiwi com limão"] }],
      },
      {
        slug: "cremes",
        name: "Cremes",
        description: "400ml",
        price: "R$ 20,00",
        priceValue: 20,
        image: cremesAsset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Morango", "Maracujá", "Abacaxi com coco"] }],
      },
      {
        slug: "kombucha",
        name: "Kombucha",
        description: "280ml",
        price: "R$ 18,00",
        priceValue: 18,
        image: kombuchasBaldeAsset.url,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Pitaya e maracujá", "Morango e limão", "Tangerina e Hibisco", "Abacaxi com hortelã"] }],
      },
    ],
  },
  {
    id: "gelatos",
    title: "Gelatos",
    tagline: "Crema e Gusto na Casa",
    partner: { name: "Gelateria Crema e Gusto" },
    items: [
      { slug: "gelato-p", name: "Gelato P", description: "Escolha até dois sabores", price: "R$ 16,00", priceValue: 16 , image: copinhoGelatoAsset.url },
      { slug: "gelato-m", name: "Gelato M", description: "Escolha até dois sabores", price: "R$ 19,00", priceValue: 19 , image: copinhoGelatoAsset.url },
      { slug: "gelato-g", name: "Gelato G", description: "Escolha até três sabores", price: "R$ 22,00", priceValue: 22 , image: copinhoGelatoAsset.url },
      { slug: "petit-gateau", name: "Petit Gateau", description: "Bolinho de chocolate, calda de chocolate e uma bola de gelato (escolha seu sabor preferido)", price: "R$ 27,00", priceValue: 27 },
      { slug: "grand-gateau", name: "Grand Gateau", description: "Clássico Grand Gateau acompanhado de: waffle com Nutella, morangos, amêndoas laminadas e uma bola de gelato (escolha seu sabor preferido)", price: "R$ 44,00", priceValue: 44 , image: grandGateauAsset.url },
      { slug: "banana-split", name: "Banana Split", description: "O clássico da nossa infância. Três bolas de gelato (escolha seu sabor preferido), acompanha banana, morango, calda de chocolate, castanhas, chantilly, cerejas e biju", price: "R$ 37,00", priceValue: 37 , image: bananaSplitAsset.url },
      { slug: "waffle-banana-canela", name: "Waffle Americano com banana, canela e mel ou açúcar", price: "R$ 23,00", priceValue: 23 , image: waffleBananaMelAsset.url },
      { slug: "waffle-doce-leite", name: "Waffle Americano com doce de leite", price: "R$ 23,00", priceValue: 23 },
      { slug: "waffle-nutella", name: "Waffle Americano com Nutella", price: "R$ 23,00", priceValue: 23 },
      { slug: "waffle-morango-nutella", name: "Waffle Americano com morango e Nutella", price: "R$ 27,00", priceValue: 27 },
      { slug: "waffle-banana-nutella", name: "Waffle Americano com banana e Nutella", price: "R$ 27,00", priceValue: 27 },
      { slug: "waffle-morango-banana-nutella", name: "Waffle Americano com morango, banana e Nutella", price: "R$ 27,00", priceValue: 27 , image: waffleMorangoBananaNutellaAsset.url },
      { slug: "adicional-bola-gelato", name: "Adicional: Bola de gelato", price: "R$ 11,00", priceValue: 11 },
    ],
  },
  {
    id: "para-adocar",
    title: "Para adoçar",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      { slug: "brigadeiro-belga", name: "Docinho de brigadeiro belga", description: "1 unidade", price: "R$ 5,00", priceValue: 5 , image: brigadeiroBelgaAsset.url },
      { slug: "docinho-ninho", name: "Docinho de leite Ninho®", description: "1 unidade", price: "R$ 5,00", priceValue: 5 },
      { slug: "bala-baiana", name: "Bala Baiana", description: "1 unidade", price: "R$ 6,00", priceValue: 6 , image: balaBaianaAsset.url },
      {
        slug: "macarons",
        name: "Macarons",
        description: "Consulte opções disponíveis · 1 unidade",
        price: "R$ 6,00",
        priceValue: 6,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Maracujá", "Mocaccino", "Morango", "Pistache"] }],
        image: macaronsAsset.url,
      },
      { slug: "mini-pudim", name: "Mini Pudim de Leite Condensado", description: "1 unidade", price: "R$ 10,00", priceValue: 10 , image: miniPudimAsset.url },
      { slug: "banowaffle", name: "Banowaffle", description: "Waffles de Cremoqueijo com doce de leite ou Nutella®, bananas fatiadas, chantilly e poeira de canela · 1 unidade", price: "R$ 25,00", priceValue: 25 },
      { slug: "bala-coco-tradicional", name: "Bala de coco gourmet Tradicional", description: "250g · 1 pote", price: "R$ 20,00", priceValue: 20 },
      { slug: "bala-coco-recheada", name: "Bala de coco gourmet Recheada", description: "Verificar sabores disponíveis (250g) · 1 pote", price: "R$ 22,00", priceValue: 22 },
      { slug: "bala-coco-saquinho", name: "Bala de coco gourmet saquinho", description: "Verificar sabores disponíveis (110g) · 1 unidade", price: "R$ 14,00", priceValue: 14 },
      { slug: "pipoca-ninho", name: "Pipoca gourmet de Ninho®", description: "1 unidade", price: "R$ 19,00", priceValue: 19 , image: pipoquinhaGourmetAsset.url },
    ],
  },
  {
    id: "brownies",
    title: "Brownies",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      { slug: "brownie-tradicional", name: "Brownie Tradicional", description: "1 unidade", price: "R$ 12,00", priceValue: 12 , image: brownieTradicionalAsset.url },
      { slug: "brownie-supreme", name: "Brownie Supreme", description: "Com muita cobertura de chocolate meio amargo · 1 unidade", price: "R$ 17,00", priceValue: 17 },
      { slug: "iced-brownie", name: "Iced Brownie", description: "Bola de gelato à escolha, farofinha de castanha, ganache de chocolate meio amargo ou doce de leite · 1 unidade", price: "R$ 25,00", priceValue: 25 },
    ],
  },
  {
    id: "cupcakes",
    title: "Cupcakes",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      {
        slug: "cupcake-buttercream",
        name: "Cupcakes c/ topo de Buttercream",
        description: "1 unidade",
        price: "R$ 12,00",
        priceValue: 12,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Chocolate", "Doce de leite", "Red velvet"] }],
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      {
        slug: "cookies",
        name: "Cookies",
        description: "1 unidade",
        price: "R$ 16,00",
        priceValue: 16,
        options: [{ label: "Escolha o sabor", required: true, choices: ["Tradicional", "Red velvet", "Natas and Caramel", "Dark (chocolate ao leite e meio amargo)"] }],
        image: cookiesAsset.url,
      },
      { slug: "torta-cookie", name: "Torta Cookie", description: "Massa de cookie tradicional recheada com Nutella® e flor de sal · 1 fatia", price: "R$ 22,00", priceValue: 22 },
    ],
  },
  {
    id: "camadas",
    title: "Camadas da felicidade",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      { slug: "banoffe", name: "Banoffe", description: "Farofa de bolacha, chantilly, doce de leite e banana · 1 unidade", price: "R$ 20,00", priceValue: 20 },
      { slug: "bombom-morango-brownie", name: "Bombom de morango com brownie", description: "Versão de bombom de morango no pote com camadas cremosas de brigadeiro, ninho, pedacinhos de brownie e muito morango · 1 unidade", price: "R$ 20,00", priceValue: 20 },
      { slug: "bombom-uva", name: "Bombom de uva", description: "Versão de bombom de uva no pote com camadas cremosas de brigadeiro e ninho · 1 unidade", price: "R$ 20,00", priceValue: 20 },
    ],
  },
  {
    id: "bolo-gelado",
    title: "Bolo gelado",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      { slug: "bolo-abacaxi-ninho", name: "Abacaxi c/ Ninho® e coco", description: "1 unidade", price: "R$ 15,00", priceValue: 15 },
      { slug: "bolo-chocolate", name: "Chocolate", description: "1 unidade", price: "R$ 15,00", priceValue: 15 },
      { slug: "bolo-chocolate-ninho", name: "Chocolate c/ Ninho®", description: "1 unidade", price: "R$ 15,00", priceValue: 15 },
      { slug: "bolo-casadinho", name: "Casadinho", description: "1 unidade", price: "R$ 15,00", priceValue: 15 },
      { slug: "bolo-frutas-vermelhas", name: "Frutas vermelhas", description: "1 unidade", price: "R$ 15,00", priceValue: 15 , image: boloGeladoFrutasVermelhasAsset.url },
      { slug: "bolo-prestigio", name: "Prestígio", description: "1 unidade", price: "R$ 15,00", priceValue: 15 },
      { slug: "bolo-coco", name: "Coco", description: "1 unidade", price: "R$ 15,00", priceValue: 15 },
    ],
  },
  {
    id: "cones",
    title: "Cones recheados",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      { slug: "cone-ninho", name: "Ninho®", description: "Casquinha de sorvete com cobertura de chocolate, recheado com Ninho® · 1 unidade", price: "R$ 16,00", priceValue: 16 },
      { slug: "cone-brigadeiro-ninho", name: "Brigadeiro com Ninho®", description: "Casquinha de sorvete com cobertura de chocolate, recheado com creme de brigadeiro e Ninho® · 1 unidade", price: "R$ 16,00", priceValue: 16 },
      { slug: "cone-brigadeiro-belga", name: "Brigadeiro Belga", description: "Casquinha de sorvete com cobertura de chocolate recheado com brigadeiro belga · 1 unidade", price: "R$ 16,00", priceValue: 16 },
      { slug: "cone-pistache", name: "Pistache", description: "Casquinha de sorvete com cobertura de chocolate branco, recheado com creme de pistache · 1 unidade", price: "R$ 16,00", priceValue: 16 },
    ],
  },
  {
    id: "torta-pote",
    title: "Torta no Pote",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      { slug: "pote-alpino", name: "Alpino", description: "Camadas cremosas de chocolate alpino artesanal e bolo de chocolate", price: "R$ 20,00", priceValue: 20 },
      { slug: "pote-bem-casado", name: "Bem-casado", description: "Camadas cremosas de creme de Ninho®, doce de leite e bolo de baunilha", price: "R$ 20,00", priceValue: 20 },
      { slug: "pote-brigadeiro-ninho", name: "Brigadeiro com Ninho®", description: "Camadas cremosas de brigadeiro e creme de Ninho® e bolo de chocolate", price: "R$ 20,00", priceValue: 20 },
      { slug: "pote-brigadeiro-ninho-morango", name: "Brigadeiro c/ Ninho® e morango", description: "Camadas cremosas de brigadeiro, morangos, creme de Ninho® e bolo de chocolate", price: "R$ 20,00", priceValue: 20 },
      { slug: "pote-ninho-morango", name: "Creme de Ninho® com morango", description: "Camadas cremosas de creme de Ninho®, morangos e bolo de baunilha", price: "R$ 20,00", priceValue: 20 },
      { slug: "pote-tres-amores", name: "Três amores", description: "Camadas cremosas de creme de Alpino, creme de Ninho®, brigadeiro e bolo de chocolate", price: "R$ 20,00", priceValue: 20 },
      { slug: "pote-kinder", name: "Kinder Bueno®", description: "Camadas cremosas de creme de Nutella®, creme de Ninho®, Kinder Bueno® e bolo de chocolate", price: "R$ 22,00", priceValue: 22 },
      { slug: "pote-pistache", name: "Pistache", description: "Camadas cremosas de creme de pistache com bolo de baunilha e farofinha crocante de pistache", price: "R$ 22,00", priceValue: 22 },
      { slug: "pote-trufado-brownie", name: "Trufado com Brownie", description: "Camadas cremosas de creme de Ninho®, brownie e brigadeiro", price: "R$ 20,00", priceValue: 20 },
      { slug: "pote-ninho-frutas", name: "Ninho® com frutas vermelhas", description: "Camadas cremosas de creme de Ninho® com bolo de baunilha e calda de frutas vermelhas", price: "R$ 20,00", priceValue: 20 },
    ],
  },
  {
    id: "fatias",
    title: "Fatias recheadas",
    tagline: "Doçuras da Lê",
    partner: { name: "Doçuras da Lê" },
    items: [
      { slug: "fatia-brigadeiro-ninho", name: "Brigadeiro Belga c/ Ninho®", description: "Bolo de chocolate com creme de Ninho® e cobertura de brigadeiro belga · 1 unidade", price: "R$ 22,00", priceValue: 22 , image: fatiaNinhoBrigadeiroAsset.url },
      { slug: "fatia-kinder", name: "Kinder Bueno®", description: "Bolo de chocolate com creme de Ninho®, Nutella®, brigadeiro belga e Kinder Bueno®, cobertura de Ninho® com Kinder Bueno® · 1 unidade", price: "R$ 25,00", priceValue: 25 },
      { slug: "fatia-abacaxi", name: "Abacaxi", description: "Bolo de baunilha com creme de Ninho® e abacaxi, finalizado com raspas de chocolate branco · 1 unidade", price: "R$ 22,00", priceValue: 22 },
      { slug: "fatia-chocolate", name: "Chocolate", description: "Bolo de chocolate recheado com brigadeiro, cobertura de brigadeiro e finalizado com raspas de chocolate meio amargo · 1 unidade", price: "R$ 22,00", priceValue: 22 },
      { slug: "fatia-pistache", name: "Pistache com brigadeiro", description: "Bolo de chocolate recheado com brigadeiro, cobertura de brigadeiro e finalizado com raspas de chocolate meio amargo · 1 unidade", price: "R$ 25,00", priceValue: 25 },
      { slug: "fatia-cenoura", name: "Cenoura com chocolate", description: "Bolo de cenoura recheado com chocolate, com cobertura de chocolate, finalizado com raspas de chocolate meio amargo · 1 unidade", price: "R$ 22,00", priceValue: 22 , image: fatiaCenouraAsset.url },
    ],
  },
];

/** Categorias que pertencem ao bloco da Doceria Artesanal (Doçuras da Lê) */
export const DOCERIA_FIRST_CATEGORY_ID = "para-adocar";

export const DOCERIA = {
  id: "doceria",
  title: "Doceria Artesanal",
  brand: "Doçuras da Lê",
  story: [
    "Letícia Rocha era uma criança que gostava de brincar de confeiteira e amava fazer balas baianas. A menina cresceu e hoje se dedica a proporcionar doces momentos.",
    "Zilmar Borges era um jovem em busca de nova colocação no mercado. Começou fazendo balas de coco para seu sustento e descobriu que seu maior talento era adoçar vidas e corações.",
    "Tantos caminhos foram trilhados, mas hoje as duas histórias se fundem em um novo caminhar — um caminho leve, doce e cheio de sentido.",
  ],
  note: "Seção exclusiva da Doceria Artesanal, com produtos originais, selecionados com alto padrão de qualidade — denominação Gourmet. Por serem artesanais e sem conservantes, alguns itens podem estar indisponíveis por período. Também trabalhamos com encomendas de sobremesas, bolos, tortas e doces finos.",
} as const;

export const navSections = [
  ...categories.map((c) => ({ id: c.id, title: c.title })),
  { id: "sobre", title: "Sobre a Casa" },
];

export const WHATSAPP_NUMBER = "5564992236969";
