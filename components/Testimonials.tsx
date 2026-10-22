"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { brand, testimonials } from "@/data/bakery-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScallopBadge, StitchLine } from "@/components/ui/Decor";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn, external } from "@/lib/utils";

const tilts = [-1.5, 1, -0.5, 1.5, -1, 0.75];
const stampFills = ["var(--color-mustard)", "var(--color-terracotta)", "var(--color-sky)"];

export function Testimonials() {
  return (
    <section id="recenzii" className="py-14 sm:py-28 lg:py-32">
      <div className="container-bakery flex flex-col gap-8 sm:gap-14">
        <SectionHeading
          eyebrow="Recenzii Clienți"
          title="Vorbe dulci de la oamenii noștri"
          description={`${brand.googleRating.toLocaleString("ro-RO")} din 5 stele, din ${brand.googleReviewCount} de recenzii pe Google.`}
        />

        {/* Flex-wrap instead of grid so an incomplete last row stays centered. */}
        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-12 pb-6 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-14 sm:overflow-visible sm:px-0 sm:pt-8 sm:pb-0"
        >
          {testimonials.map((t, i) => (
            <motion.li
              key={t.id}
              variants={fadeUp}
              whileHover={{ y: -6, rotate: 0 }}
              style={{ rotate: tilts[i % tilts.length] }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="stitched relative flex w-[82%] shrink-0 snap-center flex-col items-center gap-5 rounded-[1.5rem] bg-cream linen px-6 pt-14 pb-7 text-center shadow-warm-lg sm:w-[calc(50%-0.75rem)] sm:px-7 lg:w-[calc((100%-3rem)/3)] sm:pt-16 sm:pb-8"
            >
              {/* Stamp hanging over the top edge, like a dated badge */}
              <div className="absolute -top-10 left-1/2 z-20 -translate-x-1/2">
              <ScallopBadge fill={stampFills[i % stampFills.length]} stitch="rgb(90 42 32 / 0.35)" className="size-20">
                <span className="font-serif text-2xl leading-none font-bold text-espresso">{t.rating}</span>
                <span className="flex gap-px text-espresso" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={8} fill="currentColor" />
                  ))}
                </span>
              </ScallopBadge>
              </div>

              <span className="sr-only">{t.rating} din 5 stele</span>
              <blockquote className="relative z-10 font-serif text-lg leading-relaxed text-espresso italic">
                „{t.quote}”
              </blockquote>
              <StitchLine className="w-16" />
              <div className="relative z-10 flex flex-col">
                <span className="heading-caps text-sm text-terracotta-dark">{t.name}</span>
                <span className={cn("text-xs text-cocoa")}>{t.context}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex justify-center">
          <a href={brand.mapsUrl} {...external} className="btn-primary">
            Toate recenziile pe Google
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
