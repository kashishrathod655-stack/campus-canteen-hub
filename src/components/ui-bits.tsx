import { Leaf, Drumstick, Star, Minus, Plus, Inbox } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function VegBadge({ veg, className }: { veg: boolean; className?: string }) {
  return (
    <span
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        veg
          ? "border-veg/40 bg-veg/10 text-veg"
          : "border-nonveg/40 bg-nonveg/10 text-nonveg",
        className,
      )}
    >
      {veg ? <Leaf className="size-3" /> : <Drumstick className="size-3" />}
      {veg ? "Veg" : "Non-veg"}
    </span>
  );
}

export function RatingPill({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success">
      <Star className="size-3 fill-current" />
      {rating.toFixed(1)}
      {reviews !== undefined && <span className="text-muted-foreground">({reviews})</span>}
    </span>
  );
}

export function QtyStepper({
  qty,
  onChange,
  size = "default",
}: {
  qty: number;
  onChange: (qty: number) => void;
  size?: "sm" | "default";
}) {
  const btn =
    size === "sm"
      ? "size-7 rounded-full"
      : "size-9 rounded-full";
  return (
    <div className="inline-flex items-center gap-1 rounded-full border bg-background p-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Decrease quantity"
        className={btn}
        onClick={() => onChange(qty - 1)}
      >
        <Minus className="size-4" />
      </Button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Increase quantity"
        className={btn}
        onClick={() => onChange(qty + 1)}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed bg-card/60 px-6 py-16 text-center">
      <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
        {icon ?? <Inbox className="size-6" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusDot({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        open ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          open ? "animate-pulse bg-success" : "bg-destructive",
        )}
      />
      Canteen {open ? "Open" : "Closed"}
    </span>
  );
}
