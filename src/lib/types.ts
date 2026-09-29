/**
 * Domain types for SmartCanteen.
 * These mirror the tables a real backend (e.g. Supabase) would expose:
 * users, categories, food_items, orders, order_items, inventory, payments, announcements.
 */

export type Role = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // demo only — a real backend never stores plain passwords
  roll: string;
  phone: string;
  role: Role;
  status: "active" | "suspended";
  avatar?: string;
  joinedAt: string;
}

export type CategoryId =
  | "breakfast"
  | "snacks"
  | "main-course"
  | "beverages"
  | "fast-food"
  | "healthy";

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  image: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  category: CategoryId;
  price: number;
  veg: boolean;
  available: boolean;
  rating: number;
  reviews: number;
  popular: boolean;
  prepTime: number; // minutes
  image: string;
  orderedCount: number;
}

export interface OrderItem {
  foodId: string;
  name: string;
  price: number;
  qty: number;
  veg: boolean;
  image: string;
}

export type OrderStatus =
  | "placed"
  | "accepted"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type PaymentMethod = "upi" | "cash" | "online";

export interface Order {
  id: string;
  userId: string;
  studentName: string;
  roll: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: "paid" | "pending";
  createdAt: string;
  prepTime: number;
  note?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  unit: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "special" | "offer" | "closure";
  createdAt: string;
}

export interface CartLine {
  foodId: string;
  qty: number;
}

export const ORDER_FLOW: OrderStatus[] = [
  "placed",
  "accepted",
  "preparing",
  "ready",
  "completed",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Order Placed",
  accepted: "Order Accepted",
  preparing: "Preparing",
  ready: "Ready for Pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const TAX_RATE = 0.05;

export function inventoryStatus(item: InventoryItem) {
  if (item.stock <= 0) return "out" as const;
  if (item.stock <= item.minStock) return "low" as const;
  return "in" as const;
}

export function formatINR(value: number) {
  return `₹${value.toFixed(2).replace(/\.00$/, "")}`;
}
