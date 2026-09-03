import { createServerFn } from "@tanstack/react-start";
import type { MenuCategory, MenuItem, MenuOptionGroup } from "@/components/casa-do-sabor/menuData";

function parseOptions(value: unknown): MenuOptionGroup[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const groups = value.flatMap((group) => {
    if (!group || typeof group !== "object") return [];
    const candidate = group as Record<string, unknown>;
    const label = typeof candidate.label === "string" ? candidate.label.trim() : "";
    const choices = Array.isArray(candidate.choices)
      ? candidate.choices.filter((choice): choice is string => typeof choice === "string")
      : [];
    if (!label || choices.length === 0) return [];

    return [
      {
        label,
        required: candidate.required === true,
        multi: candidate.multi === true,
        choices,
      },
    ];
  });

  return groups.length > 0 ? groups : undefined;
}

export const getPublicMenu = createServerFn({ method: "GET" }).handler(async (): Promise<MenuCategory[]> => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [{ data: categoryRows, error: categoryError }, { data: itemRows, error: itemError }] =
    await Promise.all([
      supabaseAdmin
        .from("menu_categories")
        .select(
          "id, slug, title, tagline, subtitle, notice, partner_name, partner_logo_url, sort_order",
        )
        .eq("is_active", true)
        .is("deleted_at", null)
        .order("sort_order", { ascending: true }),
      supabaseAdmin
        .from("menu_items")
        .select(
          "category_id, slug, name, description, price_label, price_value, fit, image_url, options, sort_order",
        )
        .eq("is_active", true)
        .is("deleted_at", null)
        .order("sort_order", { ascending: true }),
    ]);

  if (categoryError) throw new Error(categoryError.message);
  if (itemError) throw new Error(itemError.message);

  const itemsByCategory = new Map<string, MenuItem[]>();
  for (const item of itemRows ?? []) {
    const menuItem: MenuItem = {
      slug: item.slug,
      name: item.name,
      description: item.description ?? undefined,
      price: item.price_label,
      priceValue: Number(item.price_value),
      fit: item.fit,
      image: item.image_url ?? undefined,
      options: parseOptions(item.options),
    };
    const items = itemsByCategory.get(item.category_id) ?? [];
    items.push(menuItem);
    itemsByCategory.set(item.category_id, items);
  }

  return (categoryRows ?? []).map((category): MenuCategory => ({
    id: category.slug,
    title: category.title,
    tagline: category.tagline ?? "",
    subtitle: category.subtitle ?? undefined,
    notice: category.notice ?? undefined,
    partner: category.partner_name
      ? { name: category.partner_name, logo: category.partner_logo_url ?? undefined }
      : undefined,
    items: itemsByCategory.get(category.id) ?? [],
  }));
});
