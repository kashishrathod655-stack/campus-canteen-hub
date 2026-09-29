import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UtensilsCrossed, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — SmartCanteen" },
      {
        name: "description",
        content: "Log in or create your SmartCanteen student account with your college roll number.",
      },
      { property: "og:title", content: "Sign in — SmartCanteen" },
      { property: "og:description", content: "Access your college canteen ordering account." },
    ],
  }),
  component: AuthPage,
});

type Errors = Record<string, string>;

function AuthPage() {
  const { login, signup, currentUser, hydrated } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (hydrated && currentUser) {
      navigate({ to: currentUser.role === "admin" ? "/admin" : "/dashboard", replace: true });
    }
  }, [hydrated, currentUser, navigate]);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const next: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next["email"] = "Enter a valid email address.";
    if (password.length < 6) next["password"] = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success(`Welcome back, ${res.user!.name.split(" ")[0]}!`);
      navigate({ to: res.user!.role === "admin" ? "/admin" : "/dashboard", replace: true });
    }, 500);
  }

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
      roll: String(form.get("roll") ?? "").trim().toUpperCase(),
      phone: String(form.get("phone") ?? "").trim(),
    };
    const next: Errors = {};
    if (data.name.length < 3) next["name"] = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next["email"] = "Enter a valid email address.";
    if (data.password.length < 6) next["password"] = "Use at least 6 characters.";
    if (data.roll.length < 4) next["roll"] = "Enter your college ID / roll number.";
    if (!/^\d{10}$/.test(data.phone)) next["phone"] = "Enter a 10-digit phone number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      const res = signup(data);
      setLoading(false);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Account created. Happy ordering!");
      navigate({ to: "/dashboard", replace: true });
    }, 600);
  }

  const field = (name: string) =>
    errors[name] ? (
      <p className="mt-1 text-xs font-medium text-destructive">{errors[name]}</p>
    ) : null;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="surface-gradient hidden flex-col justify-between p-12 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-5" />
          </span>
          <span className="font-display text-lg font-bold">SmartCanteen</span>
        </Link>
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-tight">
            Skip the queue.
            <br />
            <span className="brand-gradient-text">Order smart.</span>
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Sign in with your college email to order food, track it live and reorder your
            favourites in one tap.
          </p>
        </div>
        <div className="rounded-2xl border bg-card/80 p-4 text-sm backdrop-blur">
          <p className="font-semibold">Demo accounts</p>
          <p className="mt-1 text-muted-foreground">Student · student@college.edu / student123</p>
          <p className="text-muted-foreground">Staff · admin@college.edu / admin123</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </span>
            <span className="font-display text-lg font-bold">SmartCanteen</span>
          </Link>

          <Tabs defaultValue="login" onValueChange={() => setErrors({})}>
            <TabsList className="grid w-full grid-cols-2 rounded-full">
              <TabsTrigger value="login" className="rounded-full">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <h1 className="font-display text-2xl font-bold">Welcome back</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Log in to continue ordering.
              </p>
              <form onSubmit={handleLogin} className="mt-6 space-y-4" noValidate>
                <div>
                  <Label htmlFor="login-email">College email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@college.edu"
                    defaultValue="student@college.edu"
                    className="mt-1.5 rounded-xl"
                  />
                  {field("email")}
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    defaultValue="student123"
                    className="mt-1.5 rounded-xl"
                  />
                  {field("password")}
                </div>
                <Button type="submit" className="w-full rounded-full" disabled={loading}>
                  {loading && <Loader2 className="size-4 animate-spin" />} Log in
                </Button>
              </form>
              <div className="mt-4 rounded-2xl border bg-muted/50 p-3 text-xs text-muted-foreground lg:hidden">
                Student: student@college.edu / student123 · Staff: admin@college.edu /
                admin123
              </div>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <h1 className="font-display text-2xl font-bold">Create your account</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Students only — staff accounts are created by the canteen admin.
              </p>
              <form onSubmit={handleSignup} className="mt-6 space-y-4" noValidate>
                <div>
                  <Label htmlFor="su-name">Full name</Label>
                  <Input id="su-name" name="name" className="mt-1.5 rounded-xl" placeholder="Aarav Sharma" />
                  {field("name")}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="su-roll">College ID / Roll no.</Label>
                    <Input id="su-roll" name="roll" className="mt-1.5 rounded-xl" placeholder="CS21B045" />
                    {field("roll")}
                  </div>
                  <div>
                    <Label htmlFor="su-phone">Phone</Label>
                    <Input id="su-phone" name="phone" className="mt-1.5 rounded-xl" placeholder="9876543210" />
                    {field("phone")}
                  </div>
                </div>
                <div>
                  <Label htmlFor="su-email">College email</Label>
                  <Input id="su-email" name="email" type="email" className="mt-1.5 rounded-xl" placeholder="you@college.edu" />
                  {field("email")}
                </div>
                <div>
                  <Label htmlFor="su-password">Password</Label>
                  <Input id="su-password" name="password" type="password" className="mt-1.5 rounded-xl" placeholder="At least 6 characters" />
                  {field("password")}
                </div>
                <Button type="submit" className="w-full rounded-full" disabled={loading}>
                  {loading && <Loader2 className="size-4 animate-spin" />} Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo authentication only — no real credentials are stored.
          </p>
        </div>
      </div>
    </div>
  );
}
