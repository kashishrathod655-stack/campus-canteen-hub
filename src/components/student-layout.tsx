import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Home,
  UtensilsCrossed,
  ShoppingCart,
  ReceiptText,
  User as UserIcon,
  Moon,
  Sun,
  Bell,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusDot } from "@/components/ui-bits";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/orders", label: "My Orders", icon: ReceiptText },
  { to: "/profile", label: "Profile", icon: UserIcon },
] as const;

/** Redirects to /auth when nobody is signed in (mock client-side auth). */
export function RequireStudent({ children }: { children: ReactNode }) {
  const { currentUser, hydrated } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !currentUser) navigate({ to: "/auth", replace: true });
  }, [hydrated, currentUser, navigate]);

  if (!hydrated || !currentUser) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Loading your canteen…
      </div>
    );
  }
  return <>{children}</>;
}

export function StudentLayout({ children }: { children: ReactNode }) {
  const { currentUser, cartCount, canteenOpen, announcements, theme, toggleTheme, logout } =
    useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-6">
            <Link to="/dashboard" className="flex shrink-0 items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <UtensilsCrossed className="size-5" />
              </span>
              <span className="font-display text-lg font-bold">SmartCanteen</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    pathname === n.to && "bg-primary/10 text-primary",
                  )}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <div className="hidden sm:block">
              <StatusDot open={canteenOpen} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Bell className="size-5" />
                  {announcements.length > 0 && (
                    <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {announcements.slice(0, 4).map((a) => (
                  <div key={a.id} className="px-2 py-2">
                    <p className="text-sm font-semibold">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.message}</p>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                    Nothing new right now.
                  </p>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <ShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/12 text-sm font-bold text-primary">
                      {currentUser?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-semibold">{currentUser?.name}</p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {currentUser?.roll}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
                  <UserIcon className="size-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/orders" })}>
                  <ReceiptText className="size-4" /> My orders
                </DropdownMenuItem>
                {currentUser?.role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
                    <LayoutDashboard className="size-4" /> Admin dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate({ to: "/", replace: true });
                  }}
                >
                  <LogOut className="size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-6 md:pb-12">
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" />
                {n.label}
                {n.to === "/cart" && cartCount > 0 && (
                  <span className="absolute right-4 top-1 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
