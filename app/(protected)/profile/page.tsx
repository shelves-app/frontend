"use client";

import { useCallback } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";

const ProfilePage = () => {
  const { user, profile, isLoading } = useAuthStore();

  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }, []);

  // AuthProvider is still loading
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  // Not authenticated — redirect
  if (!user) {
    window.location.href = "/sign-in";
    return null;
  }

  // Authenticated but no profile yet (API might still be loading)
  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading profile...</p>
            <Button variant="outline" className="mt-4" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container max-w-2xl flex-1 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold">
                  {profile.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <CardTitle className="text-xl">{profile.displayName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  @{profile.username}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.bio && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bio</p>
                <p>{profile.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-sm">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Visibility
                </p>
                <p className="text-sm capitalize">
                  {profile.profileVisibility}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Provider
              </p>
              <p className="text-sm capitalize">
                {user.app_metadata?.provider || "email"}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfilePage;
