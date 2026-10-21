"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Lock, X } from "lucide-react";
import { useConsent, type ConsentCategory } from "@/context/consent-context";
import { ScallopBadge } from "@/components/ui/Decor";
import { MotionButton } from "@/components/ui/MotionButton";
import { backdrop, modalPanel } from "@/lib/animations";
import { cn } from "@/lib/utils";

const categories: Array<{ id: ConsentCategory | "necessary"; title: string; description: string }> = [
  {
    id: "necessary",
    title: "Esențiale",
    description: "Țin minte coșul tău de cumpărături și alegerea ta despre cookies. Fără ele site-ul nu funcționează corect.",
  },
  {
    id: "analytics",
    title: "Analitice",
    description: "Ne ajută să înțelegem, anonim, ce pagini și produse vă plac cel mai mult, ca să îmbunătățim site-ul.",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Ne permit să vă arătăm reclame relevante pe Instagram și Facebook pentru ofertele Enza's Bakery.",
  },
];

export function CookieBanner() {
  const { consent, hydrated, acceptAll, rejectAll, isSettingsOpen, setIsSettingsOpen } = useConsent();
  const showBanner = hydrated && consent === null && !isSettingsOpen;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            role="region"
            aria-label="Consimțământ cookies"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 24, stiffness: 220, delay: 0.8 }}
            className="fixed inset-x-3 bottom-3 z-[90] sm:right-auto sm:bottom-5 sm:left-5 sm:max-w-md"
          >
            <div className="stitched relative rounded-[1.5rem] border-4 border-terracotta bg-cream linen px-5 pt-12 pb-5 shadow-warm-lg sm:px-6">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                <motion.div
                  animate={{ rotate: [0, -10, 8, 0] }}
                  transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }}
                >
                  <ScallopBadge fill="var(--color-mustard)" stitch="rgb(90 42 32 / 0.4)" className="size-[4.5rem]">
                    <Cookie size={28} strokeWidth={1.8} className="text-espresso" aria-hidden="true" />
                  </ScallopBadge>
                </motion.div>
              </div>

              <div className="relative z-10 flex flex-col gap-4 text-center">
                <p className="heading-caps text-base">Un biscuit înainte de toate?</p>
                <p className="text-sm leading-relaxed text-cocoa">
                  Folosim cookies esențiale ca să funcționeze coșul și, doar cu acordul tău, cookies analitice și de
                  marketing. Poți schimba alegerea oricând.{" "}
                  <Link href="/politica-cookies" className="font-semibold text-terracotta-dark underline underline-offset-2">
                    Politica de cookies
                  </Link>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <MotionButton onClick={rejectAll} className="btn-secondary px-3 text-xs">
                    Doar esențiale
                  </MotionButton>
                  <MotionButton onClick={acceptAll} className="btn-primary px-3 text-xs">
                    Accept toate
                  </MotionButton>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  className="mx-auto min-h-11 font-serif text-xs font-bold tracking-[0.14em] text-espresso uppercase underline decoration-dashed underline-offset-4 hover:text-terracotta-dark"
                >
                  Setări cookies
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{isSettingsOpen && <CookieSettings />}</AnimatePresence>
    </>
  );
}

function CookieSettings() {
  const { consent, savePreferences, acceptAll, setIsSettingsOpen } = useConsent();
  const [prefs, setPrefs] = useState<Record<ConsentCategory, boolean>>({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  });
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSettingsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [setIsSettingsOpen]);

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={backdrop}
        onClick={() => setIsSettingsOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 bg-espresso/45 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        variants={modalPanel}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border-4 border-terracotta bg-cream linen shadow-warm-lg sm:rounded-3xl"
      >
        <header className="flex items-center justify-between gap-4 border-b-2 border-dashed border-espresso/20 px-6 py-4">
          <h2 id={titleId} className="heading-caps flex items-center gap-2 text-lg">
            <Cookie size={20} aria-hidden="true" className="text-terracotta-dark" />
            Setări cookies
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            aria-label="Închide setările"
            className="inline-flex size-11 items-center justify-center rounded-full text-espresso transition-colors hover:bg-oat"
          >
            <X size={20} />
          </button>
        </header>

        <ul className="flex flex-col gap-3 overflow-y-auto px-6 py-5">
          {categories.map((cat) => {
            const locked = cat.id === "necessary";
            const checked = locked ? true : prefs[cat.id as ConsentCategory];
            const switchId = `cookie-${cat.id}`;
            return (
              <li key={cat.id} className="rounded-2xl border-2 border-dashed border-espresso/20 bg-white/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={switchId} className="heading-caps flex items-center gap-2 text-sm">
                    {cat.title}
                    {locked && <Lock size={13} aria-hidden="true" className="text-cocoa" />}
                  </label>
                  <button
                    id={switchId}
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-disabled={locked}
                    disabled={locked}
                    onClick={() =>
                      !locked && setPrefs((p) => ({ ...p, [cat.id]: !p[cat.id as ConsentCategory] }))
                    }
                    className={cn(
                      "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-200",
                      checked ? "bg-sage-deep" : "bg-espresso/25",
                      locked ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                    )}
                  >
                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                      className={cn("size-6 rounded-full bg-cream shadow", checked ? "ml-auto" : "ml-0")}
                    />
                    <span className="sr-only">{checked ? "Activat" : "Dezactivat"}</span>
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cocoa">{cat.description}</p>
                {locked && <p className="mt-1 text-xs font-semibold text-sage-deep">Mereu active</p>}
              </li>
            );
          })}
        </ul>

        <footer className="flex flex-col gap-2 border-t-2 border-dashed border-espresso/20 px-6 py-4 sm:flex-row">
          <MotionButton onClick={() => savePreferences(prefs)} className="btn-secondary flex-1">
            Salvează alegerea
          </MotionButton>
          <MotionButton onClick={acceptAll} className="btn-primary flex-1">
            Accept toate
          </MotionButton>
        </footer>
      </motion.div>
    </motion.div>
  );
}

/** Footer link that reopens the cookie settings. */
export function CookieSettingsLink({ className }: { className?: string }) {
  const { setIsSettingsOpen } = useConsent();
  return (
    <button type="button" onClick={() => setIsSettingsOpen(true)} className={className}>
      Setări cookies
    </button>
  );
}
