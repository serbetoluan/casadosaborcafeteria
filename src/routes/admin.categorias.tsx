import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { listCategories, saveCategory, type AdminCategory } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/admin/categorias")({
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const fetchCategories = useServerFn(listCategories);
  const [editing, setEditing] = useState<AdminCategory | null>(null);

  const query = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => fetchCategories(),
  });

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-serif text-3xl text-foreground">Categorias</h1>
        <p className="text-sm text-muted-foreground">
          Ajuste títulos, subtítulos, avisos, ordem e visibilidade das seções.
        </p>
      </header>

      {query.isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {(query.data ?? []).map((category) => (
            <Card key={category.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {category.sortOrder}. {category.title}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {category.itemCount} itens · {category.isActive ? "visível" : "oculta"}
                    {category.partnerName ? ` · ${category.partnerName}` : ""}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditing(category)}>
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CategoryDialog category={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

function CategoryDialog({
  category,
  onClose,
}: {
  category: AdminCategory | null;
  onClose: () => void;
}) {
  const save = useServerFn(saveCategory);
  const queryClient = useQueryClient();
  const [form, setForm] = useState<AdminCategory | null>(category);

  if (category && form?.id !== category.id) setForm(category);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!form) return;
      await save({
        data: {
          id: form.id,
          title: form.title,
          tagline: form.tagline ?? "",
          subtitle: form.subtitle ?? "",
          notice: form.notice ?? "",
          partnerName: form.partnerName ?? "",
          sortOrder: form.sortOrder,
          isActive: form.isActive,
        },
      });
    },
    onSuccess: () => {
      toast.success("Categoria atualizada.");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      onClose();
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar."),
  });

  return (
    <Dialog open={Boolean(category)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>As alterações aparecem no cardápio público.</DialogDescription>
        </DialogHeader>
        {form && (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              mutation.mutate();
            }}
          >
            <Field label="Título">
              <Input
                value={form.title}
                maxLength={80}
                required
                onChange={(event) => setForm({ ...form, title: event.target.value })}
              />
            </Field>
            <Field label="Chamada (tagline)">
              <Input
                value={form.tagline ?? ""}
                maxLength={120}
                onChange={(event) => setForm({ ...form, tagline: event.target.value })}
              />
            </Field>
            <Field label="Subtítulo">
              <Input
                value={form.subtitle ?? ""}
                maxLength={120}
                onChange={(event) => setForm({ ...form, subtitle: event.target.value })}
              />
            </Field>
            <Field label="Aviso">
              <Input
                value={form.notice ?? ""}
                maxLength={240}
                onChange={(event) => setForm({ ...form, notice: event.target.value })}
              />
            </Field>
            <Field label="Parceria">
              <Input
                value={form.partnerName ?? ""}
                maxLength={80}
                onChange={(event) => setForm({ ...form, partnerName: event.target.value })}
              />
            </Field>
            <Field label="Ordem">
              <Input
                type="number"
                min={0}
                max={999}
                value={form.sortOrder}
                onChange={(event) =>
                  setForm({ ...form, sortOrder: Number(event.target.value) || 0 })
                }
              />
            </Field>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <Label htmlFor="category-active">Visível no cardápio</Label>
              <Switch
                id="category-active"
                checked={form.isActive}
                onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando…" : "Salvar"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
