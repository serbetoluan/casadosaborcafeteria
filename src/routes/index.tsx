import { createFileRoute } from "@tanstack/react-router";
import { StickyNav } from "@/components/casa-do-sabor/StickyNav";
import { Hero } from "@/components/casa-do-sabor/Hero";
import { CategorySection } from "@/components/casa-do-sabor/CategorySection";
import { SobreNos } from "@/components/casa-do-sabor/SobreNos";
import { Contato } from "@/components/casa-do-sabor/Contato";
import { Footer } from "@/components/casa-do-sabor/Footer";
import { WhatsAppButton } from "@/components/casa-do-sabor/WhatsAppButton";
import { CartProvider } from "@/components/casa-do-sabor/CartContext";
import { ProductModal } from "@/components/casa-do-sabor/ProductModal";
import { CartDrawer } from "@/components/casa-do-sabor/CartDrawer";
import { CartFab } from "@/components/casa-do-sabor/CartFab";
import { categories, navSections } from "@/components/casa-do-sabor/menuData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa do Sabor · Summer Fit — Cardápio Digital" },
      {
        name: "description",
        content:
          "Cardápio digital da Casa do Sabor na Summer Fit: quitandinhas, lanchinhos, folhados, bebidas quentes e geladas — do café da manhã ao happy hour.",
      },
      { property: "og:title", content: "Casa do Sabor · Summer Fit" },
      {
        property: "og:description",
        content:
          "Cafés especiais, folhados premium e opções fit dentro da academia Summer Fit.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-cream">
        <StickyNav items={navSections} />
        <main className="mx-auto max-w-6xl">
          <Hero />
          {categories.map((c) => (
            <CategorySection key={c.id} category={c} />
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
