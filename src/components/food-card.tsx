import { Link } from "@tanstack/react-router";
import { Clock, Flame, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { QtyStepper, RatingPill, VegBadge } from "@/components/ui-bits";
import { useStore } from "@/lib/store";
import { formatINR, type FoodItem } from "@/lib/types";

export function FoodCard({ food }: { food: FoodItem }) {
  const { cart, addToCart, setQty } = useStore();
  const line = cart.find((l) => l.foodId === food.id);

  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
      <Link
        to="/menu/$foodId"
        params={{ foodId: food.id }}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <VegBadge veg={food.veg} className="bg-background/90 backdrop-blur" />
          {food.popular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
              <Flame className="size-3" /> Popular
            </span>
          )}
        </div>
        {!food.available && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">
              Unavailable today
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
          <div className="min-w-0">
            <Link to="/menu/$foodId" params={{ foodId: food.id }}>
              <h3 className="truncate font-display text-base font-semibold hover:text-primary">
                {food.name}
              </h3>
            </Link>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {food.description}
            </p>
          </div>
          <RatingPill rating={food.rating} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold">{formatINR(food.price)}</p>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="size-3" /> {food.prepTime} min
            </p>
          </div>

          {!food.available ? (
            <Button size="sm" disabled variant="secondary" className="rounded-full">
              Sold out
            </Button>
          ) : line ? (
            <QtyStepper
              size="sm"
              qty={line.qty}
              onChange={(q) => setQty(food.id, q)}
            />
          ) : (
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => {
                addToCart(food.id);
                toast.success(`${food.name} added to cart`);
              }}
            >
              <ShoppingBag className="size-4" /> Add
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
