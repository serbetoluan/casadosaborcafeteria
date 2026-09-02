import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { getAdminSession, type AdminSession } from "@/lib/admin.functions";

/** Sessão do Supabase no cliente (hidratada após o mount). */
export function useSupabaseSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setReady(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setReady(true);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { session, ready };
}

/** Sessão + papel administrativo, validados no servidor. */
export function useAdminSession() {
  const { session, ready } = useSupabaseSession();
  const fetchSession = useServerFn(getAdminSession);

  const query = useQuery<AdminSession>({
    queryKey: ["admin-session", session?.user.id ?? null],
    queryFn: () => fetchSession(),
    enabled: ready && Boolean(session),
    retry: false,
  });

  return {
    authReady: ready,
    isAuthenticated: Boolean(session),
    admin: query.data ?? null,
    isLoading: (ready && Boolean(session) && query.isLoading) || !ready,
    refetch: query.refetch,
  };
}
