"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Star } from "lucide-react";
import { brand, hero, openingHours } from "@/data/bakery-data";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { MotionLink } from "@/components/ui/MotionButton";
import { Ribbon, ScallopBadge, ScallopEdge, Sunburst } from "@/components/ui/Decor";
import { easeLuxury, fadeUp, staggerContainer } from "@/lib/animations";
import { external } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useTransform(scrollYProgress, (v) => (reduceMotion ? 0 : v));
  const photoY = useTransform(progress, [0, 1], [0, 120]);
  const raysRotate = useTransform(progress, [0, 1], [0, 40]);
  const sideLeftY = useTransform(progress, [0, 1], [0, -140]);
  const sideRightY = useTransform(progress, [0, 1], [0, 200]);

  const [main, left, right, extra] = hero.images;
  const hoursLine = openingHours
    .filter((h) => !h.closed)
    .map((h) => `${h.day} ${h.hours}`)
    .join(" · ");

  return (
    <section ref={ref} id="acasa" className="relative overflow-hidden pt-36 sm:pt-44">
      {/* Floating side photos (desktop) */}
      <motion.div
        style={{ y: sideLeftY }}
        initial={{ opacity: 0, x: -40, rotate: -14 }}
        animate={{ opacity: 1, x: 0, rotate: -8 }}
        transition={{ duration: 1, delay: 0.6, ease: easeLuxury }}
        className="stitched absolute top-[34%] left-[3%] hidden aspect-[4/5] w-[15%] max-w-[230px] rounded-2xl bg-cream p-2.5 shadow-warm-lg lg:block"
      >
        <div className="relative size-full overflow-hidden rounded-xl">
          <Image src={left.src} alt={left.alt} fill sizes="230px" className="object-cover" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: sideRightY }}
        initial={{ opacity: 0, x: 40, rotate: 14 }}
        animate={{ opacity: 1, x: 0, rotate: 7 }}
        transition={{ duration: 1, delay: 0.75, ease: easeLuxury }}
        className="stitched absolute top-[22%] right-[3%] hidden aspect-square w-[14%] max-w-[210px] rounded-full bg-cream p-2.5 shadow-warm-lg lg:block"
      >
        <div className="relative size-full overflow-hidden rounded-full">
          <Image src={right.src} alt={right.alt} fill sizes="210px" className="object-cover" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: sideLeftY }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1 }}
        className="absolute top-[62%] right-[6%] hidden w-[11%] max-w-[160px] xl:block"
      >
        <div className="stitched relative aspect-square overflow-hidden rounded-[2rem] bg-cream p-2 shadow-warm-lg">
          <div className="relative size-full overflow-hidden rounded-[1.6rem]">
            <Image src={extra.src} alt={extra.alt} fill sizes="160px" className="object-cover" />
          </div>
        </div>
      </motion.div>

      <div className="container-bakery relative flex flex-col items-center">
        {/* Central photo with sunburst */}
        <div className="relative w-full max-w-[560px]">
          <motion.div style={{ rotate: raysRotate }} className="pointer-events-none absolute -inset-[18%]">
            <Sunburst className="size-full" />
          </motion.div>

          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            className="relative mx-auto aspect-square w-[82%]"
          >
            <div className="absolute inset-0">
              <ScallopBadge fill="var(--color-cream)" stitch="rgb(90 42 32 / 0.35)" className="size-full" />
            </div>
            <div className="absolute inset-[11%] overflow-hidden rounded-full shadow-[inset_0_0_0_4px_rgb(90_42_32/0.08)]">
              <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 640px) 420px, 80vw" className="object-cover" />
            </div>
          </motion.div>

          {/* Rating stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 1.1 }}
            className="absolute top-[4%] right-[-2%] sm:right-[2%]"
          >
            <ScallopBadge fill="var(--color-mustard)" stitch="rgb(90 42 32 / 0.4)" className="size-24 sm:size-28">
              <Star size={16} fill="currentColor" className="text-espresso" aria-hidden="true" />
              <span className="font-serif text-2xl leading-none font-bold text-espresso sm:text-3xl">
                {brand.googleRating.toLocaleString("ro-RO")}
              </span>
              <span className="font-serif text-[9px] font-bold tracking-[0.16em] text-espresso uppercase">pe Google</span>
            </ScallopBadge>
          </motion.div>
        </div>

        {/* Ribbon headline */}
        <h1 className="relative z-10 -mt-16 flex w-full max-w-[760px] flex-col gap-1 sm:-mt-24">
          <span className="sr-only">
            {hero.titleLead} {hero.titleAccent} {hero.titleTail}
          </span>
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 30, scaleX: 0.6 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: easeLuxury }}
            className="block"
          >
            <Ribbon tilt={-3}>
              <span className="font-hand text-[2.15rem] leading-none tracking-wide text-espresso sm:text-6xl lg:text-7xl">
                {hero.titleLead} {hero.titleAccent}
              </span>
            </Ribbon>
          </motion.span>
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 30, scaleX: 0.6 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeLuxury }}
            className="block"
          >
            <Ribbon tilt={2} className="w-[92%]">
              <span className="font-hand text-[2.15rem] leading-none tracking-wide text-espresso sm:text-6xl lg:text-7xl">
                {hero.titleTail}
              </span>
            </Ribbon>
          </motion.span>
        </h1>

        {/* Pantry label with copy + CTAs */}
        <motion.div
          variants={staggerContainer(0.12, 0.8)}
          initial="hidden"
          animate="visible"
          className="relative z-10 mt-8 w-full max-w-[640px] sm:mt-10"
        >
          <div className="label-frame bg-terracotta linen p-2.5 shadow-warm-lg">
            <div className="label-frame stitched bg-cream linen px-6 py-10 text-center sm:px-12 sm:py-12">
              <motion.p variants={fadeUp} className="eyebrow justify-center">
                {hero.badge}
              </motion.p>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md text-base leading-relaxed text-cocoa sm:text-lg">
                {hero.subtitle}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <MotionLink href="#meniu" className="btn-primary">
                  Explorează Meniul
                  <ArrowRight size={18} aria-hidden="true" />
                </MotionLink>
                <MotionLink href={brand.instagramUrl} {...external} className="btn-secondary">
                  <InstagramIcon size={18} />
                  Comandă pe Instagram
                </MotionLink>
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="mt-6 flex items-start justify-center gap-2 text-sm leading-relaxed text-cocoa"
              >
                <Clock size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-terracotta-dark" />
                <span>{hoursLine} · Luni închis</span>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gingham band with stat stamps */}
      <div className="relative mt-16 sm:mt-20">
        <ScallopEdge color="#e4f1f7" />
        <div className="gingham pt-10 pb-14">
          <motion.ul
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="container-bakery flex flex-wrap items-center justify-center gap-6 sm:gap-12"
          >
            {hero.stats.map((stat, i) => (
              <motion.li key={stat.label} variants={fadeUp} style={{ rotate: i === 1 ? 4 : -4 }}>
                <ScallopBadge
                  fill={i === 1 ? "var(--color-terracotta)" : "var(--color-cream)"}
                  stitch="rgb(90 42 32 / 0.35)"
                  className="size-28 sm:size-36"
                >
                  <span className="font-serif text-3xl leading-none font-bold text-espresso sm:text-4xl">{stat.value}</span>
                  <span className="mt-1 max-w-[5.5rem] font-serif text-[10px] leading-tight font-bold tracking-[0.12em] text-espresso uppercase sm:text-[11px]">
                    {stat.label}
                  </span>
                </ScallopBadge>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
