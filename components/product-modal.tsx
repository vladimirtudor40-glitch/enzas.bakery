"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Minus, Plus, Scale, ShoppingBag, X } from "lucide-react";
import type { Product } from "@/data/bakery-data";
import { useCart } from "@/context/cart-context";
import { backdrop, modalPanel, springSnappy } from "@/lib/animations";
import { formatAmount, formatPrice } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && <ModalContent key={product.id} product={product} onClose={onClose} />}
    </AnimatePresence>
  );
}

function ModalContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [direction, setDirection] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const notesId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(onClose, 900);
    return () => window.clearTimeout(timer);
  }, [added, onClose]);

  const changeQuantity = (delta: number) => {
    setDirection(delta);
    setQuantity((q) => Math.min(50, Math.max(1, q + delta)));
  };

  const handleAdd = () => {
    if (added) return;
    addItem(product, quantity, notes);
    setAdded(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={backdrop}
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-espresso/45 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        variants={modalPanel}
        className="relative z-10 grid max-h-[94dvh] w-full max-w-4xl overflow-hidden rounded-t-3xl border-4 border-terracotta bg-cream linen shadow-warm-lg sm:rounded-3xl md:grid-cols-[1.05fr_1fr]"
      >
        <div className="relative aspect-[4/3] bg-oat md:aspect-auto md:min-h-[560px]">
          <Image
            src={product.image.replace(/w=\d+/, "w=1400")}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 768px) 460px, 100vw"
            className="object-cover"
          />
          {product.badge && (
            <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-sage-deep backdrop-blur">
              {product.badge}
            </span>
          )}
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Închide"
          className="absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-cream/90 text-espresso shadow-warm backdrop-blur transition-colors hover:bg-white"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-5 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-col gap-2 pr-10">
            <h3 id={titleId} className="heading-caps text-2xl leading-tight sm:text-3xl">
              {product.name}
            </h3>
            {product.description && <p className="text-sm leading-relaxed text-cocoa">{product.description}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-serif text-3xl font-semibold">{formatPrice(product.price, product.priceFrom)}</span>
            {product.portion && (
              <span className="flex items-center gap-1.5 rounded-full bg-oat px-3 py-1 text-xs font-medium text-cocoa">
                <Scale size={14} aria-hidden="true" className="text-sage-deep" />
                {product.portion}
              </span>
            )}
          </div>

          {product.ingredients?.length ? (
            <div className="flex flex-col gap-2">
              <h4 className="font-sans text-xs font-semibold tracking-[0.18em] text-cocoa uppercase">Ingrediente</h4>
              <p className="text-sm leading-relaxed text-espresso">{product.ingredients.join(", ")}.</p>
            </div>
          ) : null}

          {product.allergens?.length ? (
            <div className="flex flex-col gap-2">
              <h4 className="flex items-center gap-1.5 font-sans text-xs font-semibold tracking-[0.18em] text-cocoa uppercase">
                <AlertTriangle size={14} aria-hidden="true" className="text-terracotta-dark" />
                Alergeni
              </h4>
              <ul className="flex flex-wrap gap-2">
                {product.allergens.map((a) => (
                  <li key={a} className="rounded-full border border-terracotta/30 bg-terracotta/8 px-3 py-1 text-xs font-semibold text-terracotta-dark">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-cocoa">Pentru ingrediente și alergeni, întreabă-ne pe WhatsApp sau în cofetărie.</p>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor={notesId} className="text-sm font-semibold">
              Mențiuni <span className="font-normal text-cocoa">(opțional)</span>
            </label>
            <input
              id={notesId}
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex.: fără zahăr pudră, mesaj pe tort…"
              className="w-full rounded-xl border border-espresso/12 bg-white px-4 py-3 text-base placeholder:text-cocoa/60 focus:border-terracotta focus:outline-none"
            />
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-espresso/10 pt-5 lg:flex-row lg:items-center">
            <div className="flex items-center justify-between gap-1 rounded-full bg-oat p-1 lg:justify-start">
              <button
                type="button"
                onClick={() => changeQuantity(-1)}
                disabled={quantity === 1}
                aria-label="Scade cantitatea"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white text-espresso shadow-sm transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={18} />
              </button>
              <span className="relative flex h-11 w-12 items-center justify-center overflow-hidden" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.span
                    key={quantity}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ y: d > 0 ? 18 : -18, opacity: 0 }),
                      center: { y: 0, opacity: 1 },
                      exit: (d: number) => ({ y: d > 0 ? -18 : 18, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={springSnappy}
                    className="font-serif text-xl font-semibold"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>
              </span>
              <button
                type="button"
                onClick={() => changeQuantity(1)}
                disabled={quantity === 50}
                aria-label="Crește cantitatea"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white text-espresso shadow-sm transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={18} />
              </button>
            </div>

            <motion.button
              type="button"
              onClick={handleAdd}
              whileHover={added ? undefined : { scale: 1.03 }}
              whileTap={added ? undefined : { scale: 0.97 }}
              animate={{ backgroundColor: added ? "#A3B05A" : "#FFC557" }}
              transition={springSnappy}
              className="btn flex-1 whitespace-nowrap text-espresso shadow-[0_3px_0_#d8902a]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ rotate: -45, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 14 }}
                      className="flex size-6 items-center justify-center rounded-full bg-espresso/15"
                    >
                      <Check size={16} strokeWidth={3} aria-hidden="true" />
                    </motion.span>
                    Adăugat în coș
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag size={18} aria-hidden="true" />
                    Adaugă în Coș · {formatAmount(product.price * quantity)} RON
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
