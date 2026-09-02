import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { categories as staticCategories } from "@/components/casa-do-sabor/menuData";

export type AdminSession = {
  userId: string;
  email: string | null;
  isAdmin: boolean;
  adminCount: number;
};

export type AdminCategory = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  subtitle: string | null;
  notice: string | null;
  partnerName: string | null;
  sortOrder: number;
  isActive: boolean;
  itemCount: number;
};

export type AdminItem = {
  id: string;
  categoryId: string;
  categoryTitle: string;
  slug: string;
  name: string;
  description: string | null;
  priceLabel: string;
  priceValue: number;
  fit: boolean;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
};

const forbidden = () => new Response("Forbidden", { status: 403 });

/** Retorna a sessão + papel do usuário autenticado. */
export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminSession> => {
    const { supabase, userId, claims } = context;

    const [{ data: roles }, { count }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin"),
    ]);

    return {
      userId,
      email: (claims["email"] as string | undefined) ?? null,
      isAdmin: (roles ?? []).some((r) => r.role === "admin"),
      adminCount: count ?? 0,
    };
  });

/** Bootstrap: o primeiro usuário autenticado pode assumir o papel de administrador. */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { count } = await supabase
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if ((count ?? 0) > 0) throw forbidden();

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw forbidden();
}

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabase } = context;

    const [categories, items, inactive, missingPhoto] = await Promise.all([
      supabase.from("menu_categories").select("id", { count: "exact", head: true }),
      supabase.from("menu_items").select("id", { count: "exact", head: true }),
      supabase
        .from("menu_items")
        .select("id", { count: "exact", head: true })
        .eq("is_active", false),
      supabase.from("menu_items").select("id", { count: "exact", head: true }).is("image_url", null),
    ]);

    return {
      categories: categories.count ?? 0,
      items: items.count ?? 0,
      inactiveItems: inactive.count ?? 0,
      itemsWithoutPhoto: missingPhoto.count ?? 0,
    };
  });

export const listCategories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminCategory[]> => {
    await assertAdmin(context);

    const { data, error } = await context.supabase
      .from("menu_categories")
      .select("*, menu_items(count)")
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);

    return (data ?? []).map((c: any) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      tagline: c.tagline,
      subtitle: c.subtitle,
      notice: c.notice,
      partnerName: c.partner_name,
      sortOrder: c.sort_order,
      isActive: c.is_active,
      itemCount: c.menu_items?.[0]?.count ?? 0,
    }));
  });

export const listItems = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ categoryId: z.string().uuid().optional(), search: z.string().max(80).optional() }).parse(data ?? {}),
  )
  .handler(async ({ context, data }): Promise<AdminItem[]> => {
    await assertAdmin(context);

    let query = context.supabase
      .from("menu_items")
      .select("*, menu_categories!inner(title, sort_order)")
      .order("sort_order", { ascending: true })
      .limit(500);

    if (data.categoryId) query = query.eq("category_id", data.categoryId);
    if (data.search?.trim()) query = query.ilike("name", `%${data.search.trim()}%`);

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);

    return (rows ?? []).map((i: any) => ({
      id: i.id,
      categoryId: i.category_id,
      categoryTitle: i.menu_categories?.title ?? "",
      slug: i.slug,
      name: i.name,
      description: i.description,
      priceLabel: i.price_label,
      priceValue: Number(i.price_value),
      fit: i.fit,
      imageUrl: i.image_url,
      isActive: i.is_active,
      sortOrder: i.sort_order,
    }));
  });

const itemInput = z.object({
  id: z.string().uuid().optional(),
  categoryId: z.string().uuid(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífens"),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(600).optional().or(z.literal("")),
  priceValue: z.number().min(0).max(9999),
  fit: z.boolean().default(false),
  imageUrl: z.string().trim().url().max(600).optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(9999).default(0),
});

const brl = (value: number) =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;

export const saveItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => itemInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);

    const payload = {
      category_id: data.categoryId,
      slug: data.slug,
      name: data.name,
      description: data.description || null,
      price_label: brl(data.priceValue),
      price_value: data.priceValue,
      fit: data.fit,
      image_url: data.imageUrl || null,
      is_active: data.isActive,
      sort_order: data.sortOrder,
    };

    const query = data.id
      ? context.supabase.from("menu_items").update(payload).eq("id", data.id)
      : context.supabase.from("menu_items").insert(payload);

    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const setItemActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid(), isActive: z.boolean() }).parse(data),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("menu_items")
      .update({ is_active: data.isActive })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("menu_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const saveCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        title: z.string().trim().min(2).max(80),
        tagline: z.string().trim().max(120).optional().or(z.literal("")),
        subtitle: z.string().trim().max(120).optional().or(z.literal("")),
        notice: z.string().trim().max(240).optional().or(z.literal("")),
        partnerName: z.string().trim().max(80).optional().or(z.literal("")),
        sortOrder: z.number().int().min(0).max(999),
        isActive: z.boolean(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("menu_categories")
      .update({
        title: data.title,
        tagline: data.tagline || null,
        subtitle: data.subtitle || null,
        notice: data.notice || null,
        partner_name: data.partnerName || null,
        sort_order: data.sortOrder,
        is_active: data.isActive,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Importa o cardápio publicado no site para o banco (não sobrescreve preços já editados). */
export const importStaticMenu = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabase } = context;

    const { data: cats, error: catError } = await supabase
      .from("menu_categories")
      .select("id, slug");
    if (catError) throw new Error(catError.message);

    const bySlug = new Map((cats ?? []).map((c) => [c.slug, c.id]));
    const { data: existing } = await supabase.from("menu_items").select("slug");
    const existingSlugs = new Set((existing ?? []).map((i) => i.slug));

    const rows = staticCategories.flatMap((category) => {
      const categoryId = bySlug.get(category.id);
      if (!categoryId) return [];
      return category.items
        .filter((item) => !existingSlugs.has(item.slug))
        .map((item, index) => ({
          category_id: categoryId,
          slug: item.slug,
          name: item.name,
          description: item.description ?? null,
          price_label: item.price,
          price_value: item.priceValue,
          fit: item.fit ?? false,
          image_url: item.image ?? null,
          options: (item.options ?? []) as unknown as never,
          sort_order: index,
        }));
    });

    if (rows.length === 0) return { inserted: 0 };

    const { error } = await supabase.from("menu_items").insert(rows);
    if (error) throw new Error(error.message);
    return { inserted: rows.length };
  });
