import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Confirmando acesso — Casa do Sabor" },
      { name: "description", content: "Validando o link de confirmação do painel Casa do Sabor." },
      { property: "og:title", content: "Confirmando acesso — Casa do Sabor" },
      { property: "og:description", content: "Validação do link de acesso ao painel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function finish() {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
      const errorDescription =
        url.searchParams.get("error_description") ?? hash.get("error_description");
      const code = url.searchParams.get("code");
      const tokenHash = url.searchParams.get("token_hash");
      const type = url.searchParams.get("type");

      if (errorDescription) {
        if (active) setError(errorDescription);
        return;
      }

      try {
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        } else if (tokenHash && type) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as "signup" | "email" | "magiclink" | "recovery" | "invite",
          });
          if (verifyError) throw verifyError;
        }

        const { data } = await supabase.auth.getSession();
        if (!active) return;

        if (type === "recovery") {
          navigate({ to: "/reset-password", replace: true });
          return;
        }

        if (data.session) {
          navigate({ to: "/admin", replace: true });
          return;
        }

        navigate({ to: "/auth", replace: true });
      } catch (caught) {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Link inválido ou expirado.");
        }
      }
    }

    finish();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        {error ? (
          <>
            <h1 className="font-serif text-2xl text-foreground">Não foi possível confirmar</h1>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/auth">Voltar e reenviar confirmação</Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Confirmando seu acesso…</p>
        )}
      </div>
    </main>
  );
}
