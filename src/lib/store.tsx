/**
 * SmartCanteen app store.
 *
 * All state lives here behind a small API so that swapping the mock data for a
 * real backend (Supabase) later only means replacing the function bodies.
 * Data is persisted to localStorage so the demo survives page reloads.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  seedAnnouncements,
  seedFoodItems,
  seedInventory,
  seedOrders,
  seedUsers,
} from "@/data/seed";
import {
  TAX_RATE,
  type Announcement,
  type CartLine,
  type FoodItem,
  type InventoryItem,
  type Order,
  type OrderStatus,
  type PaymentMethod,
  type User,
} from "@/lib/types";

const STORAGE_KEY = "smartcanteen.v1";

interface Persisted {
  users: User[];
  foods: FoodItem[];
  orders: Order[];
  inventory: InventoryItem[];
  announcements: Announcement[];
  cart: CartLine[];
  currentUserId: string | null;
  canteenOpen: boolean;
  theme: "light" | "dark";
}

const initialState: Persisted = {
  users: seedUsers,
  foods: seedFoodItems,
  orders: seedOrders,
  inventory: seedInventory,
  announcements: seedAnnouncements,
  cart: [],
  currentUserId: null,
  canteenOpen: true,
  theme: "light",
};

interface StoreValue extends Persisted {
  hydrated: boolean;
  currentUser: User | null;
  cartDetailed: { food: FoodItem; qty: number }[];
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  login: (email: string, password: string) => { ok: boolean; error?: string; user?: User };
  signup: (data: Omit<User, "id" | "role" | "status" | "joinedAt">) => {
    ok: boolean;
    error?: string;
  };
  logout: () => void;
  addToCart: (foodId: string, qty?: number) => void;
  setQty: (foodId: string, qty: number) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  placeOrder: (paymentMethod: PaymentMethod, note?: string) => Order;
  reorder: (orderId: string) => number;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  saveFood: (food: FoodItem) => void;
  deleteFood: (foodId: string) => void;
  toggleAvailability: (foodId: string) => void;
  updateStock: (id: string, stock: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  deleteInventoryItem: (id: string) => void;
  addAnnouncement: (a: Omit<Announcement, "id" | "createdAt">) => void;
  deleteAnnouncement: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  setCanteenOpen: (open: boolean) => void;
  updateProfile: (patch: Partial<User>) => void;
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate after mount so server and client render identically first.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as Persisted) });
    } catch {
      /* corrupt storage — fall back to seed data */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state, hydrated]);

  const patch = useCallback((fn: (prev: Persisted) => Partial<Persisted>) => {
    setState((prev) => ({ ...prev, ...fn(prev) }));
  }, []);

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId],
  );

  const cartDetailed = useMemo(
    () =>
      state.cart
        .map((line) => {
          const food = state.foods.find((f) => f.id === line.foodId);
          return food ? { food, qty: line.qty } : null;
        })
        .filter((v): v is { food: FoodItem; qty: number } => v !== null),
    [state.cart, state.foods],
  );

  const cartSubtotal = cartDetailed.reduce((s, l) => s + l.food.price * l.qty, 0);
  const cartTax = Math.round(cartSubtotal * TAX_RATE * 100) / 100;
  const cartTotal = Math.round((cartSubtotal + cartTax) * 100) / 100;
  const cartCount = cartDetailed.reduce((s, l) => s + l.qty, 0);

  const value: StoreValue = {
    ...state,
    hydrated,
    currentUser,
    cartDetailed,
    cartCount,
    cartSubtotal,
    cartTax,
    cartTotal,

    login(email, password) {
      const user = state.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (!user) return { ok: false, error: "No account found with this email." };
      if (user.password !== password) return { ok: false, error: "Incorrect password." };
      if (user.status === "suspended")
        return { ok: false, error: "This account has been suspended." };
      patch(() => ({ currentUserId: user.id }));
      return { ok: true, user };
    },

    signup(data) {
      if (state.users.some((u) => u.email.toLowerCase() === data.email.toLowerCase()))
        return { ok: false, error: "An account with this email already exists." };
      const user: User = {
        ...data,
        id: `u${Date.now()}`,
        role: "student",
        status: "active",
        joinedAt: new Date().toISOString().slice(0, 10),
      };
      patch((prev) => ({ users: [...prev.users, user], currentUserId: user.id }));
      return { ok: true };
    },

    logout() {
      patch(() => ({ currentUserId: null, cart: [] }));
    },

    addToCart(foodId, qty = 1) {
      patch((prev) => {
        const existing = prev.cart.find((l) => l.foodId === foodId);
        return {
          cart: existing
            ? prev.cart.map((l) => (l.foodId === foodId ? { ...l, qty: l.qty + qty } : l))
            : [...prev.cart, { foodId, qty }],
        };
      });
    },

    setQty(foodId, qty) {
      patch((prev) => ({
        cart:
          qty <= 0
            ? prev.cart.filter((l) => l.foodId !== foodId)
            : prev.cart.map((l) => (l.foodId === foodId ? { ...l, qty } : l)),
      }));
    },

    removeFromCart(foodId) {
      patch((prev) => ({ cart: prev.cart.filter((l) => l.foodId !== foodId) }));
    },

    clearCart() {
      patch(() => ({ cart: [] }));
    },

    placeOrder(paymentMethod, note) {
      const items = cartDetailed.map(({ food, qty }) => ({
        foodId: food.id,
        name: food.name,
        price: food.price,
        qty,
        veg: food.veg,
        image: food.image,
      }));
      const order: Order = {
        id: `SC-${1050 + state.orders.length}`,
        userId: currentUser?.id ?? "guest",
        studentName: currentUser?.name ?? "Guest",
        roll: currentUser?.roll ?? "—",
        items,
        subtotal: cartSubtotal,
        tax: cartTax,
        total: cartTotal,
        status: "placed",
        paymentMethod,
        paymentStatus: paymentMethod === "cash" ? "pending" : "paid",
        createdAt: new Date().toISOString(),
        prepTime: Math.max(5, ...cartDetailed.map((l) => l.food.prepTime)),
        ...(note ? { note } : {}),
      };
      patch((prev) => ({ orders: [order, ...prev.orders], cart: [] }));
      return order;
    },

    reorder(orderId) {
      const order = state.orders.find((o) => o.id === orderId);
      if (!order) return 0;
      let added = 0;
      patch((prev) => {
        const cart = [...prev.cart];
        for (const item of order.items) {
          const food = prev.foods.find((f) => f.id === item.foodId);
          if (!food || !food.available) continue;
          const existing = cart.find((l) => l.foodId === item.foodId);
          if (existing) existing.qty += item.qty;
          else cart.push({ foodId: item.foodId, qty: item.qty });
          added += item.qty;
        }
        return { cart };
      });
      return added;
    },

    updateOrderStatus(orderId, status) {
      patch((prev) => ({
        orders: prev.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
      }));
    },

    saveFood(food) {
      patch((prev) => ({
        foods: prev.foods.some((f) => f.id === food.id)
          ? prev.foods.map((f) => (f.id === food.id ? food : f))
          : [food, ...prev.foods],
      }));
    },

    deleteFood(foodId) {
      patch((prev) => ({
        foods: prev.foods.filter((f) => f.id !== foodId),
        cart: prev.cart.filter((l) => l.foodId !== foodId),
      }));
    },

    toggleAvailability(foodId) {
      patch((prev) => ({
        foods: prev.foods.map((f) =>
          f.id === foodId ? { ...f, available: !f.available } : f,
        ),
      }));
    },

    updateStock(id, stock) {
      patch((prev) => ({
        inventory: prev.inventory.map((i) =>
          i.id === id ? { ...i, stock: Math.max(0, stock) } : i,
        ),
      }));
    },

    addInventoryItem(item) {
      patch((prev) => ({
        inventory: [...prev.inventory, { ...item, id: `i${Date.now()}` }],
      }));
    },

    deleteInventoryItem(id) {
      patch((prev) => ({ inventory: prev.inventory.filter((i) => i.id !== id) }));
    },

    addAnnouncement(a) {
      patch((prev) => ({
        announcements: [
          { ...a, id: `a${Date.now()}`, createdAt: new Date().toISOString() },
          ...prev.announcements,
        ],
      }));
    },

    deleteAnnouncement(id) {
      patch((prev) => ({
        announcements: prev.announcements.filter((a) => a.id !== id),
      }));
    },

    toggleUserStatus(id) {
      patch((prev) => ({
        users: prev.users.map((u) =>
          u.id === id
            ? { ...u, status: u.status === "active" ? "suspended" : "active" }
            : u,
        ),
      }));
    },

    setCanteenOpen(open) {
      patch(() => ({ canteenOpen: open }));
    },

    updateProfile(p) {
      patch((prev) => ({
        users: prev.users.map((u) =>
          u.id === prev.currentUserId ? { ...u, ...p } : u,
        ),
      }));
    },

    toggleTheme() {
      patch((prev) => ({ theme: prev.theme === "dark" ? "light" : "dark" }));
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
