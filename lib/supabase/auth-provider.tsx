"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const supabase = createClient();

    const loadProfile = async () => {
      try {
        const profile =
          await api.get<Parameters<typeof setProfile>[0]>("/v1/auth/me");
        setProfile(profile);
      } catch {
        setProfile(null);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      // Set session in store FIRST — api helper reads token from store
      setAuth(session?.user ?? null, session);

      if (session) {
        await loadProfile();
      }

      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION") return;

      // Update store FIRST, then fetch profile
      setAuth(session?.user ?? null, session);

      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        await loadProfile();
      }

      if (event === "SIGNED_OUT") {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuth, setProfile, setLoading]);

  return children;
};
