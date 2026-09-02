import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { LayoutDashboard, UtensilsCrossed, FolderTree, LogOut, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { claimFirstAdmin } from "@/lib/admin.functions";
import { useAdminSession } from "@/hooks/use-admin-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CupIcon } from "@/components/casa-do-sabor/CupIcon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — Casa do Sabor" },
      {
        name: "description",
        content: "Gerencie categorias, itens, preços e fotos do cardápio digital da Casa do Sabor.",
      },
      { property: "og:title", content: "Painel administrativo — Casa do Sabor" },
      {
        property: "og:description",
        content: "Área interna para atualizar o cardápio das unidades Casa 1 e Casa 2.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { to: "/admin/cardapio", label: "Cardápio", icon: UtensilsCrossed, exact: false },
  { to: "/admin/categorias", label: "Categorias", icon: FolderTree, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { authReady, isAuthenticated, admin, isLoading, refetch } = useAdminSession();
  const claim = useServerFn(claimFirstAdmin);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (authReady && !isAuthenticated) navigate({ to: "/auth" });
  }, [authReady, isAuthenticated, navigate]);

  if (isLoading || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Carregando painel…</p>
      </main>
    );
  }

  if (admin && !admin.isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso pendente</CardTitle>
            <CardDescription>
              {admin.adminCount === 0
                ? "Nenhum administrador definido ainda. Você pode assumir a administração deste painel."
                : "Sua conta ainda não tem permissão de administrador. Peça a liberação para a equipe."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {admin.adminCount === 0 && (
              <Button
                className="w-full"
                disabled={claiming}
                onClick={async () => {
                  setClaiming(true);
                  try {
                    await claim();
                    await refetch();
                    toast.success("Você agora é administrador do painel.");
                  } catch {
                    toast.error("Não foi possível concluir. Recarregue e tente novamente.");
                  } finally {
                    setClaiming(false);
                  }
                }}
              >
                {claiming ? "Aguarde…" : "Assumir administração"}
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
            >
              Sair
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-6 md:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <CupIcon className="h-6 w-6 text-primary" />
          <span className="font-serif text-lg text-foreground">Casa do Sabor</span>
        </div>
        <SidebarLinks pathname={pathname} />
        <div className="mt-auto space-y-2 pt-6">
          <p className="truncate px-3 text-xs text-muted-foreground">{admin?.email}</p>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-4 w-4" />
            Ver cardápio
          </Link>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 overflow-x-auto border-b border-border bg-card px-4 py-3 md:hidden">
          <SidebarLinks pathname={pathname} horizontal />
        </header>
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLinks({ pathname, horizontal }: { pathname: string; horizontal?: boolean }) {
  return (
    <nav className={cn("flex gap-1", horizontal ? "flex-row" : "flex-col")}>
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
