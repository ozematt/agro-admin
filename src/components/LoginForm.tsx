"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
// import { login } from "@/app/auth/login/actions";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/panel");
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? "Nieprawidłowe hasło lub email"
          : "Wystąpił błąd"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-center ">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-3xl font-bold text-gray-800">AdminPanel</h1>
            <p className="mt-1 text-gray-600">System zarządzania</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Witaj ponownie!</CardTitle>
              <CardDescription>Zaloguj się do swojego konta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jan@email.com"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Hasło</Label>
                      <Link
                        href="/auth/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Zapomniałeś hasła?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  <p>Nie masz konta?</p>
                  <Link href="/" className="underline underline-offset-4">
                    Wróć do strony głównej.
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
