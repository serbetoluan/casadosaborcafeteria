import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CupIcon } from "@/components/casa-do-sabor/CupIcon";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Painel Casa do Sabor" },
      {
        name: "description",
        content: "Acesso restrito à equipe da Casa do Sabor para gerenciar o cardápio digital.",
      },
      { property: "og:title", content: "Entrar — Painel Casa do Sabor" },
      {
        property: "og:description",
        content: "Área administrativa do cardápio digital da Casa do Sabor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

const RESEND_COOLDOWN_SECONDS = 60;

/** Mensagens amigáveis, sem esconder o erro real do backend. */
function describeError(error: unknown): { message: string; code?: string } {
  if (typeof error === "object" && error !== null) {
    const anyError = error as { code?: string; message?: string; status?: number };
    const code = anyError.code;
    const raw = anyError.message ?? "Erro inesperado";

    if (code === "email_not_confirmed") {
      return { message: "E-mail ainda não confirmado. Reenvie a confirmação abaixo.", code };
    }
    if (code === "invalid_credentials" || raw.toLowerCase().includes("invalid login")) {
      return { message: "E-mail ou senha incorretos.", code };
    }
    if (code === "over_email_send_rate_limit") {
      return { message: "Muitas tentativas de envio. Aguarde alguns minutos.", code };
    }
    if (code === "user_already_exists" || raw.toLowerCase().includes("already registered")) {
      return { message: "Este e-mail já possui conta. Faça login ou recupere a senha.", code };
    }
    return { message: raw, ...(code ? { code } : {}) };
  }
  return { message: "Erro inesperado" };
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  // Se já existir sessão válida, segue direto para o painel.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const callbackUrl = () =>
    typeof window === "undefined" ? "" : `${window.location.origin}/auth/callback`;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate({ to: "/admin", replace: true });
        return;
      }

      if (mode === "forgot") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (resetError) throw resetError;
        setInfo("Enviamos um link de redefinição de senha para o seu e-mail.");
        setCooldown(RESEND_COOLDOWN_SECONDS);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: callbackUrl() },
      });
      if (signUpError) throw signUpError;

      if (data.session) {
        navigate({ to: "/admin", replace: true });
        return;
      }

      setInfo("Conta criada. Confirme pelo link enviado ao seu e-mail para acessar o painel.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (caught) {
      const described = describeError(caught);
      setError(described);
      toast.error(described.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email) {
      setError({ message: "Informe o e-mail para reenviar a confirmação." });
      return;
    }
    if (cooldown > 0 || loading) return;

    setLoading(true);
    setError(null);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: callbackUrl() },
      });
      if (resendError) throw resendError;
      setInfo("Novo e-mail de confirmação enviado. Verifique também a caixa de spam.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (caught) {
      const described = describeError(caught);
      setError(described);
      toast.error(described.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: callbackUrl(),
    });

    if (result.error) {
      setLoading(false);
      setError({ message: "Não foi possível entrar com o Google" });
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  const title = mode === "signin" ? "Entrar" : mode === "signup" ? "Criar conta" : "Recuperar senha";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <CupIcon className="h-10 w-10 text-primary" />
          <h1 className="font-serif text-3xl text-foreground">Painel Casa do Sabor</h1>
          <p className="text-sm text-muted-foreground">
            Acesso restrito à equipe das unidades Casa 1 e Casa 2.
          </p>
        </div>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>
              {mode === "signin"
                ? "Use seu e-mail e senha da equipe."
                : mode === "signup"
                  ? "Cadastre-se para solicitar acesso ao painel."
                  : "Enviaremos um link para você definir uma nova senha."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="space-y-2">
                  <span className="block">{error.message}</span>
                  {error.code && (
                    <span className="block text-xs opacity-80">código: {error.code}</span>
                  )}
                  {error.code === "email_not_confirmed" && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={loading || cooldown > 0}
                      onClick={handleResend}
                    >
                      {cooldown > 0 ? `Reenviar em ${cooldown}s` : "Reenviar confirmação"}
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {info && (
              <Alert>
                <AlertDescription>{info}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="equipe@casadosabor.com"
                />
              </div>
              {mode !== "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    required
                    minLength={6}
                    maxLength={72}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Aguarde…" : title}
              </Button>
            </form>

            {mode !== "forgot" && (
              <>
                <div className="relative py-1 text-center">
                  <span className="bg-card px-2 text-xs uppercase tracking-widest text-muted-foreground">
                    ou
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogle}
                  disabled={loading}
                >
                  Entrar com Google
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  disabled={loading || cooldown > 0}
                  onClick={handleResend}
                >
                  {cooldown > 0
                    ? `Reenviar confirmação em ${cooldown}s`
                    : "Reenviar e-mail de confirmação"}
                </Button>
              </>
            )}

            <div className="flex flex-col gap-1 pt-1 text-center text-sm">
              <button
                type="button"
                className="text-muted-foreground underline-offset-4 hover:underline"
                onClick={() => {
                  setError(null);
                  setInfo(null);
                  setMode(mode === "signin" ? "signup" : "signin");
                }}
              >
                {mode === "signin" ? "Não tenho conta ainda" : "Já tenho conta"}
              </button>
              <button
                type="button"
                className="text-muted-foreground underline-offset-4 hover:underline"
                onClick={() => {
                  setError(null);
                  setInfo(null);
                  setMode(mode === "forgot" ? "signin" : "forgot");
                }}
              >
                {mode === "forgot" ? "Voltar ao login" : "Esqueci minha senha"}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-muted-foreground underline-offset-4 hover:underline">
            Voltar ao cardápio
          </Link>
        </p>
      </div>
    </main>
  );
}
