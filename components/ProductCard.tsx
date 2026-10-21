"use client";

import { useEffect, useState, type Ref } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Plus, Scale } from "lucide-react";
import type { Product } from "@/data/bakery-data";
import { useCart } from "@/context/cart-context";
import { cardPresence, springSnappy, springSoft } from "@/lib/animations";
import { cn, formatAmount } from "@/lib/utils";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  Artizanal: "bg-cream/90 text-sage-deep",
  "Proaspăt scos din cuptor": "bg-cream/90 text-sage-deep",
  "Best-seller": "bg-mustard text-espresso",
  "Pe comandă": "bg-cream/90 text-terracotta-dark",
};

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  ref?: Ref<HTMLElement>;
}

export function ProductCard({ product, onQuickView, ref }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [added]);

  const quickAdd = () => {
    addItem(product, 1);
    setAdded(true);
  };

  return (
    <motion.article
      ref={ref}
      layout
      variants={cardPresence}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -8 }}
      transition={springSoft}
      className="group stitched flex flex-col rounded-2xl bg-cream linen p-2 shadow-warm transition-shadow duration-300 hover:shadow-warm-lg sm:rounded-[1.5rem] sm:p-3"
    >
      <button
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={`Vezi detalii: ${product.name}`}
        className="relative block aspect-square overflow-hidden rounded-xl bg-oat text-left sm:aspect-[4/3] sm:rounded-[1.1rem]"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-110"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute top-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-sm backdrop-blur sm:top-3 sm:left-3 sm:px-3 sm:py-1 sm:text-xs",
              badgeStyles[product.badge],
            )}
          >
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-semibold text-espresso opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:hidden md:max-lg:opacity-100">
          <Eye size={14} aria-hidden="true" />
          Detalii
        </span>
      </button>

      <div className="relative z-10 flex flex-1 flex-col gap-2 px-1.5 pt-3 pb-1.5 sm:gap-3 sm:px-4 sm:pt-5 sm:pb-3">
        <h3 className="heading-caps text-[13px] leading-snug tracking-[0.04em] sm:text-lg sm:tracking-[0.08em]">
          <button type="button" onClick={() => onQuickView(product)} className="text-left transition-colors hover:text-terracotta-dark">
            {product.name}
          </button>
        </h3>
        <p className="hidden text-sm leading-relaxed text-cocoa sm:block">{product.description}</p>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-cocoa sm:text-xs">
          <Scale size={14} aria-hidden="true" className="shrink-0 text-sage-deep" />
          {product.portion}
        </p>

        <div className="mt-auto flex flex-col items-stretch gap-2 border-t-2 border-dashed border-espresso/20 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
          <p className="font-serif text-xl font-bold text-terracotta-dark sm:text-2xl">
            {product.priceFrom && <span className="mr-1 font-sans text-xs font-medium text-cocoa">de la</span>}
            {formatAmount(product.price)}
            <span className="ml-1 font-sans text-sm font-medium text-cocoa">RON</span>
          </p>
          <motion.button
            type="button"
            onClick={quickAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{ backgroundColor: added ? "#A3B05A" : "#FFC557" }}
            transition={springSnappy}
            aria-label={`Adaugă ${product.name} în coș`}
            className="btn min-h-11 w-full px-3 text-xs text-espresso shadow-[0_3px_0_#d8902a] sm:w-auto sm:min-w-[7.5rem] sm:px-4"
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                  Adăugat
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-1.5"
                >
                  <Plus size={16} aria-hidden="true" />
                  Adaugă
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
