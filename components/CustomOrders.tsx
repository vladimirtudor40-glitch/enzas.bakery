"use client";

import { useId, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, Users } from "lucide-react";
import { customOrders } from "@/data/bakery-data";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { MotionButton, MotionLink } from "@/components/ui/MotionButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScallopEdge } from "@/components/ui/Decor";
import { easeLuxury, fadeUp, springSnappy, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn, external, instagramDmLink, whatsappLink } from "@/lib/utils";

const inputClass =
  "relative z-10 w-full rounded-xl border-2 border-dashed border-espresso/20 bg-white/70 px-4 py-3 text-base text-espresso placeholder:text-cocoa/60 transition-colors focus:border-terracotta-dark focus:bg-white focus:outline-none";

export function CustomOrders() {
  const [serviceId, setServiceId] = useState<string>(customOrders.services[0].id);
  const service = customOrders.services.find((s) => s.id === serviceId) ?? customOrders.services[0];
  const [form, setForm] = useState({ name: "", date: "", guests: "", details: "" });
  const [error, setError] = useState<string | null>(null);
  const ids = { name: useId(), date: useId(), guests: useId(), details: useId(), error: useId() };

  const update = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Te rugăm să ne spui cum te numești.");
      return;
    }
    setError(null);
    const message = [
      "Bună ziua! Aș dori o ofertă pentru o comandă specială:",
      `• Tip: ${service.title}`,
      `• Nume: ${form.name.trim()}`,
      form.date && `• Data evenimentului: ${new Date(form.date).toLocaleDateString("ro-RO")}`,
      form.guests && `• Număr de persoane: ${form.guests}`,
      form.details.trim() && `• Detalii: ${form.details.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="comenzi" className="relative">
      <ScallopEdge color="#5a2a20" />
      <div className="chocolate relative overflow-hidden py-14 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-terracotta/15 blur-[120px]"
      />
      <div className="container-bakery relative flex flex-col gap-12 lg:gap-16">
        <SectionHeading
          tone="light"
          eyebrow={customOrders.eyebrow}
          title={customOrders.title}
          description={customOrders.description}
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Interactive showcase */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-5"
          >
            <motion.div
              variants={fadeUp}
              className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-[10px] border-cream bg-cocoa/40 shadow-warm-lg"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: easeLuxury }}
                  className="absolute inset-0"
                >
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: easeLuxury }}
                  className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-8"
                >
                  <span className="w-fit rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-terracotta-dark">
                    {service.startingPrice}
                  </span>
                  <p className="max-w-lg text-sm leading-relaxed text-cream/90 sm:text-base">{service.details}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fadeUp} role="radiogroup" aria-label="Tip comandă" className="grid gap-3 sm:grid-cols-3">
              {customOrders.services.map((s) => {
                const active = s.id === serviceId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setServiceId(s.id)}
                    className={cn(
                      "relative flex min-h-11 flex-col gap-1 rounded-2xl border p-4 text-left transition-colors duration-200",
                      active ? "border-dashed border-mustard" : "border-dashed border-cream/25 hover:border-cream/50",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeService"
                        transition={springSnappy}
                        className="absolute inset-0 rounded-2xl bg-mustard/15"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative flex items-center justify-between gap-2 font-serif text-sm font-bold tracking-[0.12em] uppercase">
                      {s.title}
                      {active && <Check size={16} className="text-mustard" aria-hidden="true" />}
                    </span>
                    <span className="relative text-xs text-cream/65">{s.description}</span>
                  </button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Inquiry form */}
          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeLuxury, delay: 0.15 }}
            className="stitched flex flex-col gap-5 rounded-[1.5rem] bg-cream linen p-7 text-espresso shadow-warm-lg sm:p-9"
          >
            <div className="flex flex-col gap-1">
              <h3 className="heading-caps relative z-10 text-xl">Cere o ofertă rapidă</h3>
              <p className="text-sm text-cocoa">
                Completează câteva detalii și îți trimitem pe WhatsApp mesajul gata scris pentru{" "}
                <span className="font-semibold text-terracotta-dark">{service.title.toLowerCase()}</span>.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={ids.name} className="text-sm font-semibold">
                Numele tău
              </label>
              <input
                id={ids.name}
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name")(e.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? ids.error : undefined}
                placeholder="Ex.: Maria Popescu"
                className={cn(inputClass, error && "border-terracotta")}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    id={ids.error}
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm font-medium text-terracotta-dark"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={ids.date} className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays size={16} aria-hidden="true" className="text-terracotta-dark" />
                  Data evenimentului
                </label>
                <input
                  id={ids.date}
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date")(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={ids.guests} className="flex items-center gap-2 text-sm font-semibold">
                  <Users size={16} aria-hidden="true" className="text-terracotta-dark" />
                  Număr de persoane
                </label>
                <input
                  id={ids.guests}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={form.guests}
                  onChange={(e) => update("guests")(e.target.value)}
                  placeholder="Ex.: 40"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={ids.details} className="text-sm font-semibold">
                Detalii <span className="font-normal text-cocoa">(arome, temă, culori)</span>
              </label>
              <textarea
                id={ids.details}
                rows={3}
                value={form.details}
                onChange={(e) => update("details")(e.target.value)}
                placeholder="Ex.: tort cu fistic și zmeură, decor floral alb, mesaj „La mulți ani, Ana!”"
                className={cn(inputClass, "resize-none")}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <MotionButton type="submit" className="btn-primary flex-1">
                <WhatsAppIcon size={18} />
                Trimite pe WhatsApp
              </MotionButton>
              <MotionLink
                href={instagramDmLink}
                {...external}
                className="btn-secondary flex-1"
              >
                <InstagramIcon size={18} />
                Scrie-ne pe Instagram
              </MotionLink>
            </div>
            <p className="text-xs leading-relaxed text-cocoa">{customOrders.leadTimeNote}</p>
          </motion.form>
        </div>
      </div>
      </div>
      <ScallopEdge color="#5a2a20" flip />
    </section>
  );
}
