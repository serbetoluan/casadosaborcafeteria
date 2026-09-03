import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

import {
  deleteItem,
  listCategories,
  listItems,
  saveItem,
  setItemActive,
  type AdminItem,
} from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/cardapio")({
  component: AdminMenuPage,
});

type ItemForm = {
  id?: string;
  categoryId: string;
  slug: string;
  name: string;
  description: string;
  priceValue: number;
  fit: boolean;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
};

const emptyForm = (categoryId: string): ItemForm => ({
  categoryId,
  slug: "",
  name: "",
  description: "",
  priceValue: 0,
  fit: false,
  imageUrl: "",
  isActive: true,
  sortOrder: 0,
});

function AdminMenuPage() {
  const fetchCategories = useServerFn(listCategories);
  const fetchItems = useServerFn(listItems);
  const toggleActive = useServerFn(setItemActive);
  const removeItem = useServerFn(deleteItem);
  const queryClient = useQueryClient();

  const [categoryId, setCategoryId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<ItemForm | null>(null);

  const categories = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => fetchCategories(),
  });

  const items = useQuery({
    queryKey: ["admin", "items", categoryId, search],
    queryFn: () =>
      fetchItems({
        data: {
          ...(categoryId ? { categoryId } : {}),
          ...(search.trim() ? { search: search.trim() } : {}),
        },
      }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin"] });

  const toggle = useMutation({
    mutationFn: (item: AdminItem) =>
      toggleActive({ data: { id: item.id, isActive: !item.isActive } }),
    onSuccess: invalidate,
    onError: () => toast.error("Não foi possível atualizar o item."),
  });

  const destroy = useMutation({
    mutationFn: (item: AdminItem) => removeItem({ data: { id: item.id } }),
    onSuccess: () => {
      toast.success("Item removido.");
      invalidate();
    },
    onError: () => toast.error("Não foi possível remover o item."),
  });

  const firstCategoryId = categories.data?.[0]?.id ?? "";

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl text-foreground">Cardápio</h1>
          <p className="text-sm text-muted-foreground">
            Cadastre, edite preços, fotos e disponibilidade dos itens.
          </p>
        </div>
        <Button
          disabled={!firstCategoryId}
          onClick={() => setForm(emptyForm(categoryId || firstCategoryId))}
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo item
        </Button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Todas as categorias</option>
          {(categories.data ?? []).map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <Input
          placeholder="Buscar por nome…"
          value={search}
          maxLength={80}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      {items.isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (items.data ?? []).length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            Nenhum item encontrado. Importe o cardápio publicado na visão geral ou cadastre um novo
            item.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {(items.data ?? []).map((item) => (
            <Card key={item.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{item.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {item.categoryTitle} · {item.priceLabel}
                    {item.imageUrl ? "" : " · sem foto"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={() => toggle.mutate(item)}
                    aria-label="Item disponível"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setForm({
                        id: item.id,
                        categoryId: item.categoryId,
                        slug: item.slug,
                        name: item.name,
                        description: item.description ?? "",
                        priceValue: item.priceValue,
                        fit: item.fit,
                        imageUrl: item.imageUrl ?? "",
                        isActive: item.isActive,
                        sortOrder: item.sortOrder,
                      })
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remover item"
                    onClick={() => destroy.mutate(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ItemDialog
        form={form}
        categories={(categories.data ?? []).map((c) => ({ id: c.id, title: c.title }))}
        onChange={setForm}
        onClose={() => setForm(null)}
        onSaved={invalidate}
      />
    </div>
  );
}

function ItemDialog({
  form,
  categories,
  onChange,
  onClose,
  onSaved,
}: {
  form: ItemForm | null;
  categories: { id: string; title: string }[];
  onChange: (form: ItemForm) => void;
  onClose: () => void;
  onSaved: () => void;
}) {
  const save = useServerFn(saveItem);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!form) return;
      await save({
        data: {
          ...(form.id ? { id: form.id } : {}),
          categoryId: form.categoryId,
          slug: form.slug,
          name: form.name,
          description: form.description,
          priceValue: form.priceValue,
          fit: form.fit,
          imageUrl: form.imageUrl,
          isActive: form.isActive,
          sortOrder: form.sortOrder,
        },
      });
    },
    onSuccess: () => {
      toast.success("Item salvo.");
      onSaved();
      onClose();
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar."),
  });

  return (
    <Dialog open={Boolean(form)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{form?.id ? "Editar item" : "Novo item"}</DialogTitle>
          <DialogDescription>
            O preço é formatado automaticamente para reais no cardápio.
          </DialogDescription>
        </DialogHeader>
        {form && (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              mutation.mutate();
            }}
          >
            <div className="space-y-2">
              <Label>Categoria</Label>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                value={form.categoryId}
                onChange={(event) => onChange({ ...form, categoryId: event.target.value })}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-name">Nome</Label>
              <Input
                id="item-name"
                required
                maxLength={120}
                value={form.name}
                onChange={(event) => onChange({ ...form, name: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-slug">Identificador (slug)</Label>
              <Input
                id="item-slug"
                required
                maxLength={80}
                value={form.slug}
                placeholder="cappuccino-italiano"
                onChange={(event) => onChange({ ...form, slug: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-description">Descrição</Label>
              <Textarea
                id="item-description"
                maxLength={600}
                value={form.description}
                onChange={(event) => onChange({ ...form, description: event.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="item-price">Preço (R$)</Label>
                <Input
                  id="item-price"
                  type="number"
                  step="0.01"
                  min={0}
                  max={9999}
                  value={form.priceValue}
                  onChange={(event) =>
                    onChange({ ...form, priceValue: Number(event.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-order">Ordem</Label>
                <Input
                  id="item-order"
                  type="number"
                  min={0}
                  max={9999}
                  value={form.sortOrder}
                  onChange={(event) =>
                    onChange({ ...form, sortOrder: Number(event.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-image">URL da foto</Label>
              <Input
                id="item-image"
                maxLength={600}
                value={form.imageUrl}
                placeholder="https://…"
                onChange={(event) => onChange({ ...form, imageUrl: event.target.value })}
              />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <Label htmlFor="item-fit">Selo fit</Label>
              <Switch
                id="item-fit"
                checked={form.fit}
                onCheckedChange={(checked) => onChange({ ...form, fit: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <Label htmlFor="item-active">Disponível</Label>
              <Switch
                id="item-active"
                checked={form.isActive}
                onCheckedChange={(checked) => onChange({ ...form, isActive: checked })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando…" : "Salvar item"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
