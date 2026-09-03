import { createFileRoute } from "@tanstack/react-router";
import { StickyNav } from "@/components/casa-do-sabor/StickyNav";
import { Hero } from "@/components/casa-do-sabor/Hero";
import { InstaFeed } from "@/components/casa-do-sabor/InstaFeed";
import { CategorySection } from "@/components/casa-do-sabor/CategorySection";
import { SobreNos } from "@/components/casa-do-sabor/SobreNos";
import { Contato } from "@/components/casa-do-sabor/Contato";
import { Footer } from "@/components/casa-do-sabor/Footer";
import { WhatsAppButton } from "@/components/casa-do-sabor/WhatsAppButton";
import { CartProvider } from "@/components/casa-do-sabor/CartContext";
import { ProductModal } from "@/components/casa-do-sabor/ProductModal";
import { CartDrawer } from "@/components/casa-do-sabor/CartDrawer";
import { CartFab } from "@/components/casa-do-sabor/CartFab";
import { WelcomeSuggestion } from "@/components/casa-do-sabor/WelcomeSuggestion";
import { DoceriaIntro } from "@/components/casa-do-sabor/DoceriaIntro";
import { DOCERIA_FIRST_CATEGORY_ID } from "@/components/casa-do-sabor/menuData";
import { getPublicMenu } from "@/lib/menu.functions";

export const Route = createFileRoute("/")({
  loader: () => getPublicMenu(),
  head: () => ({
    meta: [
      { title: "Casa do Sabor — Cardápio Digital | Casa 1 e Casa 2" },
      {
        name: "description",
        content:
          "Cardápio digital da Casa do Sabor: quitandinhas, lanchinhos, salgados, folhados, gelatos, doceria artesanal e bebidas — do café da manhã ao happy hour.",
      },
      { property: "og:title", content: "Casa do Sabor — Cardápio Digital" },
      {
        property: "og:description",
        content:
          "Cafés especiais, folhados premium, gelatos Crema e Gusto e a doceria artesanal Doçuras da Lê.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const categories = Route.useLoaderData();
  const navSections = categories.map(({ id, title }) => ({ id, title }));

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream">
        <WelcomeSuggestion navSections={navSections} />
        <StickyNav items={navSections} />

        <main className="mx-auto max-w-6xl">
          <Hero />
          <InstaFeed />
          {categories.map((category) => (
            <div key={category.id}>
              {category.id === DOCERIA_FIRST_CATEGORY_ID && <DoceriaIntro />}
              <CategorySection category={category} />
            </div>
          ))}
          <SobreNos />
          <Contato />
        </main>
        <Footer />
        <CartFab />
        <WhatsAppButton />
        <ProductModal />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
