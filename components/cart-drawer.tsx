"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Croissant, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { brand, checkout, timeSlots } from "@/data/bakery-data";
import { useCart } from "@/context/cart-context";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { MotionButton } from "@/components/ui/MotionButton";
import { Toast } from "@/components/ui/Toast";
import { backdrop, springSnappy } from "@/lib/animations";
import { deliveryLabels, formatOrderMessage, type DeliveryMethod, type OrderDetails } from "@/lib/order-formatter";
import { cn, formatPrice, whatsappLink } from "@/lib/utils";

const drawerSpring = { type: "spring", damping: 28, stiffness: 300 } as const;

const fieldClass =
  "w-full rounded-xl border border-espresso/12 bg-white px-4 py-3 text-base placeholder:text-cocoa/60 transition-colors focus:border-terracotta focus:outline-none";

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  }
}

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const [details, setDetails] = useState<OrderDetails>({ name: "", method: "pickup", address: "", date: "", timeSlot: "", note: "" });
  const [nameError, setNameError] = useState(false);
  const [toast, setToast] = useState<{ copied: boolean } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const igTimer = useRef<number | null>(null);
  const ids = { title: useId(), name: useId(), address: useId(), date: useId(), slot: useId(), note: useId(), nameErr: useId() };

  const close = () => setIsCartOpen(false);
  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!isCartOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => () => {
    if (igTimer.current) window.clearTimeout(igTimer.current);
  }, []);

  const set = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => setDetails((d) => ({ ...d, [key]: value }));

  const validate = () => {
    const ok = details.name.trim().length > 0;
    setNameError(!ok);
    if (!ok) document.getElementById(ids.name)?.focus();
    return ok;
  };

  const message = formatOrderMessage(items, details);

  const sendWhatsApp = () => {
    if (!validate()) return;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  const openInstagram = () => {
    if (igTimer.current) window.clearTimeout(igTimer.current);
    window.open(brand.instagramUrl, "_blank", "noopener,noreferrer");
  };

  const sendInstagram = async () => {
    if (!validate()) return;
    const copied = await copyToClipboard(message);
    setToast({ copied });
    if (copied) igTimer.current = window.setTimeout(openInstagram, 1200);
  };

  const scrollToMenu = () => {
    close();
    window.setTimeout(() => document.getElementById("meniu")?.scrollIntoView({ behavior: "smooth" }), 250);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div className="fixed inset-0 z-[80]" initial="hidden" animate="visible" exit="exit">
            <motion.div
              variants={backdrop}
              onClick={close}
              aria-hidden="true"
              className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby={ids.title}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={drawerSpring}
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l-4 border-terracotta bg-cream linen shadow-warm-lg sm:rounded-l-3xl"
            >
              <header className="flex items-center justify-between border-b border-espresso/8 px-5 py-4 sm:px-6">
                <div className="flex items-baseline gap-2">
                  <h2 id={ids.title} className="heading-caps text-xl">
                    Coșul tău
                  </h2>
                  {totalItems > 0 && (
                    <span className="text-sm text-cocoa">
                      {totalItems} {totalItems === 1 ? "produs" : "produse"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="min-h-11 rounded-full px-3 text-xs font-semibold text-cocoa transition-colors hover:bg-oat hover:text-espresso"
                    >
                      Golește
                    </button>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Închide coșul"
                    className="inline-flex size-11 items-center justify-center rounded-full text-espresso transition-colors hover:bg-oat"
                  >
                    <X size={22} />
                  </button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                {items.length === 0 ? (
                  <EmptyCart onBrowse={scrollToMenu} />
                ) : (
                  <div className="flex flex-col gap-6 px-5 py-5 sm:px-6">
                    <ul className="flex flex-col gap-3">
                      <AnimatePresence initial={false} mode="popLayout">
                        {items.map((item) => (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 40, scale: 0.96 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 60, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={springSnappy}
                            className="flex gap-3 rounded-2xl border-2 border-dashed border-espresso/20 bg-cream p-3"
                          >
                            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-oat">
                              <Image src={item.image} alt={item.imageAlt} fill sizes="80px" className="object-cover" />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-sans text-sm leading-snug font-semibold">{item.name}</h3>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  aria-label={`Elimină ${item.name}`}
                                  className="-mt-2 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-oat hover:text-terracotta-dark"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <p className="-mt-2 text-xs text-cocoa">{item.portion}</p>
                              {item.notes && <p className="text-xs text-cocoa italic">„{item.notes}”</p>}
                              <div className="mt-auto flex items-center justify-between gap-2">
                                <div className="flex items-center rounded-full bg-oat">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    aria-label={`Scade cantitatea pentru ${item.name}`}
                                    className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <motion.span
                                    key={item.quantity}
                                    initial={{ scale: 1.3, opacity: 0.4 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={springSnappy}
                                    className="w-7 text-center text-sm font-semibold tabular-nums"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, 1)}
                                    aria-label={`Crește cantitatea pentru ${item.name}`}
                                    className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <span className="font-serif text-lg font-semibold">{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>

                    <motion.form
                      layout
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendWhatsApp();
                      }}
                      noValidate
                      className="flex flex-col gap-4 rounded-2xl gingham-pink p-4 sm:p-5"
                    >
                      <h3 className="font-sans text-xs font-semibold tracking-[0.18em] text-cocoa uppercase">Detalii comandă</h3>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={ids.name} className="text-sm font-semibold">
                          Numele tău
                        </label>
                        <input
                          id={ids.name}
                          type="text"
                          autoComplete="name"
                          value={details.name}
                          onChange={(e) => {
                            set("name", e.target.value);
                            if (nameError && e.target.value.trim()) setNameError(false);
                          }}
                          aria-invalid={nameError}
                          aria-describedby={nameError ? ids.nameErr : undefined}
                          placeholder="Ex.: Maria Popescu"
                          className={cn(fieldClass, nameError && "border-terracotta-dark")}
                        />
                        {nameError && (
                          <p id={ids.nameErr} role="alert" className="text-xs font-medium text-terracotta-dark">
                            Avem nevoie de numele tău ca să confirmăm comanda.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold" id={`${ids.title}-method`}>
                          Metodă
                        </span>
                        <div
                          role="radiogroup"
                          aria-labelledby={`${ids.title}-method`}
                          className="grid grid-cols-2 rounded-full bg-white p-1 ring-1 ring-espresso/8"
                        >
                          {(Object.keys(deliveryLabels) as DeliveryMethod[]).map((method) => {
                            const active = details.method === method;
                            return (
                              <button
                                key={method}
                                type="button"
                                role="radio"
                                aria-checked={active}
                                onClick={() => set("method", method)}
                                className={cn(
                                  "relative min-h-11 rounded-full text-sm font-semibold transition-colors duration-200",
                                  active ? "text-espresso" : "text-cocoa hover:text-espresso",
                                )}
                              >
                                {active && (
                                  <motion.span
                                    layoutId="deliveryToggle"
                                    transition={springSnappy}
                                    className="absolute inset-0 rounded-full bg-mustard shadow-[0_2px_0_#d8902a]"
                                    aria-hidden="true"
                                  />
                                )}
                                <span className="relative z-10">{deliveryLabels[method]}</span>
                              </button>
                            );
                          })}
                        </div>
                        <AnimatePresence initial={false} mode="wait">
                          {details.method === "delivery" ? (
                            <motion.div
                              key="delivery"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex flex-col gap-1.5 overflow-hidden pt-2"
                            >
                              <label htmlFor={ids.address} className="text-sm font-semibold">
                                Adresa de livrare
                              </label>
                              <input
                                id={ids.address}
                                type="text"
                                autoComplete="street-address"
                                value={details.address}
                                onChange={(e) => set("address", e.target.value)}
                                placeholder="Stradă, număr, bloc, apartament"
                                className={fieldClass}
                              />
                              <p className="text-xs text-cocoa">{checkout.deliveryNote}</p>
                            </motion.div>
                          ) : (
                            <motion.p
                              key="pickup"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pt-1 text-xs text-cocoa"
                            >
                              Ridici din cofetărie: {brand.address}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <fieldset className="flex flex-col gap-1.5">
                        <legend className="mb-1.5 text-sm font-semibold">Data și intervalul dorit</legend>
                        <div className="grid grid-cols-2 gap-2">
                          <label htmlFor={ids.date} className="sr-only">
                            Data
                          </label>
                          <input
                            id={ids.date}
                            type="date"
                            value={details.date}
                            onChange={(e) => set("date", e.target.value)}
                            className={fieldClass}
                          />
                          <label htmlFor={ids.slot} className="sr-only">
                            Interval orar
                          </label>
                          <select
                            id={ids.slot}
                            value={details.timeSlot}
                            onChange={(e) => set("timeSlot", e.target.value)}
                            className={cn(fieldClass, "appearance-none")}
                          >
                            <option value="">Interval</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </fieldset>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={ids.note} className="text-sm font-semibold">
                          Detalii speciale / mesaj pe tort <span className="font-normal text-cocoa">(opțional)</span>
                        </label>
                        <textarea
                          id={ids.note}
                          rows={2}
                          value={details.note}
                          onChange={(e) => set("note", e.target.value)}
                          placeholder="Ex.: „La mulți ani, Ana!”"
                          className={cn(fieldClass, "resize-none")}
                        />
                      </div>
                    </motion.form>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <motion.footer
                  layout
                  className="flex flex-col gap-3 border-t border-espresso/8 bg-cream px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-cocoa">Total{items.some((i) => i.priceFrom) ? " estimat" : ""}</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-serif text-2xl font-semibold"
                    >
                      {formatPrice(totalPrice)}
                    </motion.span>
                  </div>
                  <MotionButton onClick={sendWhatsApp} className="btn-primary w-full">
                    <WhatsAppIcon size={18} />
                    Trimite Comanda pe WhatsApp
                  </MotionButton>
                  <MotionButton onClick={sendInstagram} className="btn-secondary w-full">
                    <InstagramIcon size={18} />
                    Comandă pe Instagram DM
                  </MotionButton>
                  <p className="text-center text-[11px] leading-relaxed text-cocoa">{checkout.confirmationNote}</p>
                </motion.footer>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast
        open={toast !== null}
        onClose={closeToast}
        title={toast?.copied ? "Comanda a fost copiată!" : "Nu am putut copia automat"}
        description={
          toast?.copied
            ? "Dă Paste (Lipește) în mesajul de pe Instagram."
            : "Deschide Instagram și scrie-ne direct — sau trimite comanda pe WhatsApp."
        }
        actionLabel="Deschide Instagram"
        onAction={() => {
          openInstagram();
          setToast(null);
        }}
      />
    </>
  );
}

function EmptyCart({ onBrowse }: { onBrowse: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col items-center justify-center gap-5 px-8 py-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex size-24 items-center justify-center rounded-full bg-oat text-terracotta-dark"
      >
        <Croissant size={44} strokeWidth={1.4} aria-hidden="true" />
      </motion.div>
      <div className="flex flex-col gap-2">
        <p className="font-serif text-2xl">Coșul tău e încă gol</p>
        <p className="text-sm leading-relaxed text-cocoa">
          Croissantele de azi nu așteaptă prea mult. Alege-ți preferatele din meniu.
        </p>
      </div>
      <MotionButton onClick={onBrowse} className="btn-primary">
        <ShoppingBag size={18} aria-hidden="true" />
        Vezi meniul
      </MotionButton>
    </motion.div>
  );
}
