import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Boxes,
  TrendingUp,
  Users,
  Megaphone,
  Settings,
  LogOut,
  Menu as MenuIcon,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { StatusDot } from "@/components/ui-bits";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
  { to: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/sales", label: "Sales", icon: TrendingUp },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

/** Blocks students from admin pages (mock client-side role check). */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { currentUser, hydrated } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hydrated) return;
    if (!currentUser) navigate({ to: "/auth", replace: true });
    else if (currentUser.role !== "admin") navigate({ to: "/dashboard", replace: true });
  }, [hydrated, currentUser, navigate]);

  if (!hydrated || currentUser?.role !== "admin") {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Checking staff access…
      </div>
    );
  }
  return <>{children}</>;
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 p-3">
      {adminNav.map((n) => {
        const Icon = n.icon;
        const active = pathname === n.to;
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              active &&
                "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminLayout({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const { currentUser, canteenOpen, theme, toggleTheme, logout } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const brand = (
    <div className="flex items-center gap-2 border-b border-sidebar-border px-5 py-4">
      <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
        <UtensilsCrossed className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate font-display font-bold text-sidebar-foreground">
          SmartCanteen
        </p>
        <p className="text-[11px] text-sidebar-foreground/60">Staff console</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar lg:flex">
        {brand}
        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => {
              logout();
              navigate({ to: "/", replace: true });
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b bg-background/85 px-4 py-3 backdrop-blur">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <MenuIcon className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-sidebar p-0">
                  <SheetTitle className="sr-only">Admin navigation</SheetTitle>
                  {brand}
                  <SidebarNav onNavigate={() => setOpen(false)} />
                </SheetContent>
              </Sheet>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
                {subtitle && (
                  <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden sm:block">
                <StatusDot open={canteenOpen} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>
              {action}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {children}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            Signed in as {currentUser?.name} · {currentUser?.email}
          </p>
        </main>
      </div>
    </div>
  );
}
