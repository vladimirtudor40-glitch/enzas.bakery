import { brand } from "@/data/bakery-data";
import type { CartItem } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export type DeliveryMethod = "pickup" | "delivery";

export interface OrderDetails {
  name: string;
  method: DeliveryMethod;
  address?: string;
  /** ISO date (yyyy-mm-dd) from <input type="date">. */
  date?: string;
  timeSlot?: string;
  note?: string;
}

export const deliveryLabels: Record<DeliveryMethod, string> = {
  pickup: "Ridicare personală",
  delivery: "Livrare",
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long" });
}

/** Builds the Romanian order summary sent via WhatsApp or pasted into Instagram DM. */
export function formatOrderMessage(items: CartItem[], details: OrderDetails) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasEstimate = items.some((item) => item.priceFrom);

  const lines: string[] = [`Bună ziua! Aș dori să plasez o comandă la ${brand.name}:`, "", "🧺 PRODUSE"];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name} (${item.portion})`);
    lines.push(`   ${item.quantity} × ${formatPrice(item.price, item.priceFrom)} = ${formatPrice(item.price * item.quantity)}`);
    if (item.notes) lines.push(`   Mențiune: ${item.notes}`);
  });

  lines.push("", `💰 TOTAL${hasEstimate ? " ESTIMAT" : ""}: ${formatPrice(total)}`, "", "📋 DETALII");
  if (details.name.trim()) lines.push(`• Nume: ${details.name.trim()}`);
  lines.push(`• Metodă: ${deliveryLabels[details.method]}`);
  if (details.method === "delivery" && details.address?.trim()) lines.push(`• Adresă: ${details.address.trim()}`);
  if (details.date) lines.push(`• Data: ${formatDate(details.date)}`);
  if (details.timeSlot) lines.push(`• Interval: ${details.timeSlot}`);
  if (details.note?.trim()) lines.push(`• Detalii speciale: ${details.note.trim()}`);

  lines.push("", "Vă mulțumesc!");
  return lines.join("\n");
}
