"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { categories, products, type CategoryId, type Product } from "@/data/bakery-data";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/product-modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { springSnappy } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function ProductMenu() {
  const [active, setActive] = useState<CategoryId>("toate");
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(
    () => (active === "toate" ? products : products.filter((p) => p.category === active)),
    [active],
  );

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="meniu" className="py-14 sm:py-28 lg:py-32">
      <div className="container-bakery flex flex-col gap-8 sm:gap-14">
        <SectionHeading
          eyebrow="Meniul nostru"
          title="Din cuptor, direct pe masa ta"
          description="Adaugă în coș ce îți face poftă și trimite-ne comanda pe WhatsApp sau Instagram în câteva secunde. Coacem în loturi mici, așa că rezervă din timp preferatele."
        />

        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Categorii produse"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          >
            {categories.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="menu-grid"
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    "relative min-h-11 shrink-0 rounded-full px-5 font-serif text-xs font-bold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-200",
                    isActive ? "text-espresso" : "border-2 border-dashed border-espresso/25 text-espresso hover:border-espresso/50 hover:bg-cream/60",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      transition={springSnappy}
                      className="absolute inset-0 rounded-full bg-mustard linen shadow-[0_3px_0_#d8902a]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            id="menu-grid"
            role="tabpanel"
            layout
            className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <ProductModal product={selected} onClose={closeModal} />
    </section>
  );
}
