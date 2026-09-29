import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ORDER_FLOW, STATUS_LABEL, type OrderStatus } from "@/lib/types";

export function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="rounded-2xl bg-destructive/10 p-4 text-sm font-medium text-destructive">
        This order was cancelled.
      </div>
    );
  }
  const currentIndex = ORDER_FLOW.indexOf(status);

  return (
    <ol className="space-y-0">
      {ORDER_FLOW.map((step, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition-colors",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                  active && "ring-4 ring-primary/20",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              {i < ORDER_FLOW.length - 1 && (
                <span
                  className={cn(
                    "w-0.5 flex-1 transition-colors",
                    i < currentIndex ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
            <div className={cn("pb-6", i === ORDER_FLOW.length - 1 && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-semibold",
                  done ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {STATUS_LABEL[step]}
              </p>
              {active && (
                <p className="text-xs text-primary">Current status · updating live</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const tone: Record<OrderStatus, string> = {
    placed: "bg-muted text-muted-foreground",
    accepted: "bg-chart-3/15 text-chart-3",
    preparing: "bg-warning/20 text-warning-foreground",
    ready: "bg-accent/15 text-accent",
    completed: "bg-success/15 text-success",
    cancelled: "bg-destructive/15 text-destructive",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold",
        tone[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
