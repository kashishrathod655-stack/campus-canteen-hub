import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  CreditCard,
  QrCode,
  Search,
  Sparkles,
  Timer,
  UtensilsCrossed,
  Wallet,
  Bell,
  ShieldCheck,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/food-card";
import { SectionHeading, StatusDot } from "@/components/ui-bits";
import { useStore } from "@/lib/store";
import { categories } from "@/data/seed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartCanteen — Skip the Queue. Order Smart." },
      {
        name: "description",
        content:
          "Browse your college canteen menu, order ahead, pay by UPI or cash and track your food from kitchen to counter.",
      },
      { property: "og:title", content: "SmartCanteen — Skip the Queue. Order Smart." },
      {
        property: "og:description",
        content:
          "Your college canteen, right at your fingertips. Order ahead and track it live.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { foods, canteenOpen, theme, toggleTheme, currentUser } = useStore();
  const popular = foods.filter((f) => f.popular && f.available).slice(0, 4);

  const steps = [
    { icon: Search, title: "Browse the menu", text: "See what's cooking today with live availability." },
    { icon: UtensilsCrossed, title: "Add to cart", text: "Pick your items and quantities in seconds." },
    { icon: Wallet, title: "Pay your way", text: "UPI, mock online payment or cash at the counter." },
    { icon: Timer, title: "Pick up, skip the queue", text: "Track the order and collect it when it's ready." },
  ];

  const benefits = [
    { icon: Clock, title: "No more 20-minute queues", text: "Order between lectures and walk straight to the pickup counter." },
    { icon: Bell, title: "Live order updates", text: "Know the moment your food is accepted, cooking and ready." },
    { icon: QrCode, title: "Quick reorder", text: "Your usual chai and samosa are one tap away." },
    { icon: ShieldCheck, title: "Made for campus", text: "Roll-number based accounts and a dedicated staff console." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </span>
            <span className="truncate font-display text-lg font-bold">SmartCanteen</span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <StatusDot open={canteenOpen} />
            </div>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
            <Link to={currentUser ? "/dashboard" : "/auth"}>
              <Button size="sm" className="rounded-full">
                {currentUser ? "Open app" : "Sign in"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="surface-gradient border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold">
              <Sparkles className="size-3.5 text-accent" />
              Built for campus canteens
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              Skip the Queue.
              <br />
              <span className="brand-gradient-text">Order Smart.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Your college canteen, right at your fingertips. Browse today's menu, order
              ahead and pick it up hot — no waiting, no crowd.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={currentUser ? "/menu" : "/auth"}>
                <Button size="lg" className="rounded-full px-7">
                  Order Now <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button size="lg" variant="outline" className="rounded-full px-7">
                  View Menu
                </Button>
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                ["18+", "Dishes daily"],
                ["6 min", "Avg. prep time"],
                ["1.2k", "Orders a week"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Fresh canteen food trays"
              width={1600}
              height={1104}
              className="w-full rounded-[2rem] border object-cover shadow-lift"
            />
            <div className="absolute -bottom-5 left-5 hidden rounded-2xl border bg-card p-4 shadow-lift sm:block">
              <p className="text-xs text-muted-foreground">Order SC-1048</p>
              <p className="font-semibold">Ready for pickup in 6 min</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="How it works"
          title="Four taps between you and lunch"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card-lift rounded-3xl border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-bold text-accent">STEP {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading eyebrow="Menu" title="Every craving, covered" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/menu"
                search={{ category: c.id }}
                className="card-lift overflow-hidden rounded-2xl border bg-card"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <p className="px-3 py-3 text-center text-sm font-semibold">
                  {c.emoji} {c.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Trending today"
          title="Popular foods on campus"
          action={
            <Link to="/menu" className="hidden sm:block">
              <Button variant="outline" className="rounded-full">
                See full menu <ArrowRight className="size-4" />
              </Button>
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading eyebrow="Why SmartCanteen" title="Built around your timetable" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border bg-card p-6">
                <b.icon className="size-6 text-accent" />
                <h3 className="mt-4 font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking + quick order */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 lg:grid-cols-2">
        <div className="surface-gradient rounded-3xl border p-8">
          <h3 className="font-display text-2xl font-bold">Track every order live</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            From "Order Placed" to "Ready for Pickup", you always know where your food is.
          </p>
          <ul className="mt-6 space-y-3">
            {["Order Placed", "Order Accepted", "Preparing", "Ready for Pickup", "Completed"].map(
              (s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium">{s}</span>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-8">
          <h3 className="font-display text-2xl font-bold">Quick Order</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your favourites, saved. Reorder your regular breakfast in a single tap from the
            dashboard.
          </p>
          <div className="mt-6 space-y-3">
            {foods.slice(0, 3).map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-2xl border bg-background p-3"
              >
                <img
                  src={f.image}
                  alt={f.name}
                  loading="lazy"
                  className="size-12 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{f.name}</p>
                  <p className="text-xs text-muted-foreground">Ordered 12 times</p>
                </div>
                <CreditCard className="size-4 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
          <Link to={currentUser ? "/dashboard" : "/auth"} className="mt-6 block">
            <Button className="w-full rounded-full">Start ordering</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <UtensilsCrossed className="size-5" />
              </span>
              <span className="font-display text-lg font-bold">SmartCanteen</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              A modern canteen management platform for colleges — ordering, kitchen
              operations and sales in one place.
            </p>
          </div>
          <div>
            <p className="font-semibold">For students</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/menu" className="hover:text-foreground">Menu</Link></li>
              <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
              <li><Link to="/orders" className="hover:text-foreground">Order tracking</Link></li>
              <li><Link to="/profile" className="hover:text-foreground">Profile</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">For staff</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/admin" className="hover:text-foreground">Dashboard</Link></li>
              <li><Link to="/admin/orders" className="hover:text-foreground">Order queue</Link></li>
              <li><Link to="/admin/inventory" className="hover:text-foreground">Inventory</Link></li>
              <li><Link to="/admin/sales" className="hover:text-foreground">Sales</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Canteen timings</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Mon–Fri · 8:00 AM – 6:00 PM</li>
              <li>Saturday · 9:00 AM – 2:00 PM</li>
              <li>Sunday · Closed</li>
              <li>Block C, Ground Floor</li>
            </ul>
          </div>
        </div>
        <div className="border-t px-4 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SmartCanteen · Demo data only, no real payments are
          processed.
        </div>
      </footer>
    </div>
  );
}
