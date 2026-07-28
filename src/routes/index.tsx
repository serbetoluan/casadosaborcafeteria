import { createFileRoute } from "@tanstack/react-router";
import { StickyNav } from "@/components/casa-do-sabor/StickyNav";
import { Hero } from "@/components/casa-do-sabor/Hero";
import { CategorySection } from "@/components/casa-do-sabor/CategorySection";
import { Footer } from "@/components/casa-do-sabor/Footer";
import { WhatsAppButton } from "@/components/casa-do-sabor/WhatsAppButton";
import { categories } from "@/components/casa-do-sabor/menuData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa do Sabor · Summer Fit — Cardápio Digital" },
      {
        name: "description",
        content:
          "Cardápio digital da Casa do Sabor na Summer Fit: cafés, shakes proteicos, lanches fit e doces feitos com amor dentro da academia.",
      },
      { property: "og:title", content: "Casa do Sabor · Summer Fit" },
      {
        property: "og:description",
        content:
          "Cafés, shakes proteicos e lanches fit dentro da academia Summer Fit.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-cream">
      <StickyNav categories={categories} />
      <main>
        <Hero />
        {categories.map((c) => (
          <CategorySection key={c.id} category={c} />
        ))}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
