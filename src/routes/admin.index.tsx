import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { getDashboardStats, importStaticMenu } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const fetchStats = useServerFn(getDashboardStats);
  const runImport = useServerFn(importStaticMenu);
  const queryClient = useQueryClient();

  const stats = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => fetchStats(),
  });

  const importMutation = useMutation({
    mutationFn: () => runImport(),
    onSuccess: (result) => {
      toast.success(`${result.inserted} itens importados do cardápio publicado.`);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: () => toast.error("Não foi possível importar o cardápio."),
  });

  const cards = [
    { label: "Categorias", value: stats.data?.categories },
    { label: "Itens", value: stats.data?.items },
    { label: "Itens inativos", value: stats.data?.inactiveItems },
    { label: "Itens sem foto", value: stats.data?.itemsWithoutPhoto },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="font-serif text-3xl text-foreground">Visão geral</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe e atualize o cardápio digital das unidades Casa 1 e Casa 2.
        </p>
      </header>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardDescription>{card.label}</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-semibold text-foreground">{card.value ?? 0}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Importar cardápio publicado</CardTitle>
          <CardDescription>
            Copia os itens do site para o banco sem sobrescrever o que já foi editado aqui.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button disabled={importMutation.isPending} onClick={() => importMutation.mutate()}>
            {importMutation.isPending ? "Importando…" : "Importar itens"}
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/cardapio">Ir para o cardápio</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
