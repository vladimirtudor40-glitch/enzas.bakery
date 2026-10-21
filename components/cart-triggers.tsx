"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

/** Bounces whenever an item is added to the cart. */
function useAddedBounce() {
  const { addedPulse } = useCart();
  const controls = useAnimationControls();

  useEffect(() => {
    if (addedPulse === 0) return;
    controls.start({ scale: [1, 1.25, 1], transition: { duration: 0.45, ease: "easeOut" } });
  }, [addedPulse, controls]);

  return controls;
}

export function NavbarCartButton() {
  const { totalItems, setIsCartOpen, hydrated } = useCart();
  const controls = useAddedBounce();
  const count = hydrated ? totalItems : 0;

  return (
    <motion.button
      type="button"
      onClick={() => setIsCartOpen(true)}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={count > 0 ? `Deschide coșul, ${count} produse` : "Deschide coșul"}
      className="relative inline-flex size-11 items-center justify-center rounded-xl bg-terracotta linen text-espresso shadow-warm transition-colors hover:bg-blush"
    >
      <ShoppingBag size={20} aria-hidden="true" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-dark px-1 text-[11px] font-bold text-white tabular-nums ring-2 ring-cream"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function FloatingCartPill() {
  const { totalItems, totalPrice, isCartOpen, setIsCartOpen, hydrated } = useCart();
  const controls = useAddedBounce();
  const show = hydrated && totalItems > 0 && !isCartOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 260 }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 md:hidden"
        >
          <motion.button
            type="button"
            onClick={() => setIsCartOpen(true)}
            animate={controls}
            whileTap={{ scale: 0.96 }}
            className="flex min-h-14 items-center gap-3 rounded-full chocolate py-2 pr-3 pl-5 font-serif text-sm font-bold text-cream shadow-warm-lg ring-2 ring-mustard/70"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            <span>
              Coșul tău • {totalItems} {totalItems === 1 ? "produs" : "produse"} • {formatPrice(totalPrice)}
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-mustard text-espresso">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
