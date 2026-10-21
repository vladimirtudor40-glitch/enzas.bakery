import { brand } from "@/data/bakery-data";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatAmount(value: number) {
  return new Intl.NumberFormat("ro-RO").format(value);
}

export function formatPrice(value: number, from = false) {
  return `${from ? "de la " : ""}${formatAmount(value)} RON`;
}

/** wa.me deep link with a pre-filled, URL-encoded message. */
export function whatsappLink(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Instagram direct-message link for the bakery account. */
export const instagramDmLink = `https://ig.me/m/${brand.instagramHandle.replace("@", "")}`;

/** Props for every link that leaves the site. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
