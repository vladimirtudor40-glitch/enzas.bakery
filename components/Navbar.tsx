"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/data/bakery-data";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { ScallopBadge } from "@/components/ui/Decor";
import { NavbarCartButton } from "@/components/cart-triggers";
import { drawer, drawerItem, easeLuxury } from "@/lib/animations";
import { external } from "@/lib/utils";

const leftLinks = navLinks.slice(0, 2);
const rightLinks = navLinks.slice(2);

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative px-3 py-2 font-serif text-[13px] font-bold tracking-[0.16em] text-espresso uppercase"
    >
      {label}
      <span className="absolute inset-x-3 bottom-1 h-0 origin-left scale-x-0 border-t-2 border-dashed border-terracotta-dark transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const compact = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{ height: compact ? 0 : "auto", opacity: compact ? 0 : 1 }}
        transition={{ duration: 0.35, ease: easeLuxury }}
        className="overflow-hidden bg-terracotta linen text-center"
      >
        <p className="px-4 py-2 font-serif text-[11px] font-semibold tracking-[0.12em] text-espresso uppercase sm:py-2.5 sm:text-sm">
          <span className="sm:hidden">✶ Coacem zilnic, în loturi mici ✶</span>
          <span className="hidden sm:inline">
            ✶ Coacem zilnic în loturi mici · Comandă până la ora 12 pentru ridicare a doua zi ✶
          </span>
        </p>
      </motion.div>

      <motion.nav
        aria-label="Navigare principală"
        initial={false}
        animate={{
          backgroundColor: compact ? "rgba(243, 216, 207, 0.92)" : "rgba(243, 216, 207, 0)",
          boxShadow: compact ? "0 8px 24px -14px rgba(90,42,32,0.45)" : "0 0 0 rgba(0,0,0,0)",
          backdropFilter: compact ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: easeLuxury }}
        className="relative border-b-[3px] border-dashed border-transparent"
        style={{ borderColor: compact ? "rgb(90 42 32 / 0.18)" : "transparent" }}
      >
        <div className="container-bakery relative flex h-16 items-center justify-between sm:h-[4.5rem]">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              className="inline-flex size-11 items-center justify-center rounded-xl bg-terracotta linen text-espresso shadow-warm xl:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <ul className="hidden items-center xl:flex">
              {leftLinks.map((link) => (
                <li key={link.href}>
                  <NavLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Hanging scalloped logo */}
          <motion.a
            href="#acasa"
            aria-label={`${brand.name}, acasă`}
            initial={false}
            animate={{ scale: compact ? 0.62 : 1, y: compact ? -18 : 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
            whileHover={{ rotate: -4 }}
            className="absolute top-1 left-1/2 z-10 -ml-[3.75rem] origin-top sm:-ml-[4.5rem]"
          >
            <ScallopBadge className="size-[7.5rem] sm:size-36">
              <span className="font-script text-[1.9rem] leading-none text-cream sm:text-4xl">Enza&apos;s</span>
              <span className="mt-1 font-serif text-[10px] font-bold tracking-[0.35em] text-mustard sm:text-xs">BAKERY</span>
              <span className="mt-0.5 font-serif text-[8px] tracking-[0.2em] text-cream/70 sm:text-[9px]">CONSTANȚA</span>
            </ScallopBadge>
          </motion.a>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center xl:flex">
              {rightLinks.map((link) => (
                <li key={link.href}>
                  <NavLink {...link} />
                </li>
              ))}
            </ul>
            <NavbarCartButton />
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            variants={drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="stitched mx-3 mt-2 origin-top rounded-2xl bg-cream linen p-4 shadow-warm-lg xl:hidden"
          >
            <ul className="relative z-10 flex flex-col items-center pt-2">
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={drawerItem} className="w-full">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center justify-center rounded-xl font-serif text-lg font-bold tracking-[0.14em] text-espresso uppercase transition-colors hover:bg-oat"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div variants={drawerItem} className="relative z-10 px-2 pb-2">
              <a href={brand.instagramUrl} {...external} className="btn-primary mt-3 w-full">
                <InstagramIcon size={18} />
                Comandă Acum
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
