"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Ban, Flame, Leaf, Wheat, type LucideIcon } from "lucide-react";
import { pillars, story, type Pillar } from "@/data/bakery-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionLink } from "@/components/ui/MotionButton";
import { ScallopBadge, ScallopEdge } from "@/components/ui/Decor";
import { easeLuxury, fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";

const pillarIcons: Record<Pillar["icon"], LucideIcon> = {
  leaf: Leaf,
  wheat: Wheat,
  flame: Flame,
  ban: Ban,
};

const tagRotations = [-2, 1.5, -1, 2];

export function BrandStory() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="poveste">
      {/* Story — chocolate linen panel */}
      <ScallopEdge color="#5a2a20" />
      <div className="chocolate py-14 sm:py-28">
        <div className="container-bakery grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
            viewport={viewportOnce}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="stitched relative mx-auto w-full max-w-md rounded-[1.75rem] bg-cream p-3.5 shadow-warm-lg"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem]">
              <motion.div style={{ y: imageY }} className="absolute -inset-y-[10%] inset-x-0">
                <Image src={story.image} alt={story.imageAlt} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
              </motion.div>
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -40 }}
              whileInView={{ scale: 1, rotate: 10 }}
              viewport={viewportOnce}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.3 }}
              className="absolute -right-6 -bottom-8 z-10"
            >
              <ScallopBadge fill="var(--color-mustard)" stitch="rgb(90 42 32 / 0.4)" className="size-28 sm:size-32">
                <span className="font-hand text-3xl leading-none text-espresso sm:text-4xl">Făcut</span>
                <span className="font-serif text-[10px] font-bold tracking-[0.2em] text-espresso uppercase">de la zero</span>
              </ScallopBadge>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 lg:items-start">
              {["Făcut de la zero", "Ca la bunica acasă"].map((tag, i) => (
                <span
                  key={tag}
                  style={{ rotate: `${tagRotations[i]}deg` }}
                  className="stitched-light inline-block rounded-md bg-terracotta-dark linen px-6 py-3 font-serif text-sm font-bold tracking-[0.2em] text-cream uppercase shadow-warm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            <motion.h2 variants={fadeUp} className="heading-caps text-2xl leading-snug text-cream sm:text-3xl">
              {story.title}
            </motion.h2>
            {story.paragraphs.map((paragraph) => (
              <motion.p key={paragraph} variants={fadeUp} className="max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                {paragraph}
              </motion.p>
            ))}
            <motion.div variants={fadeUp}>
              <MotionLink href="#meniu" className="btn-primary">
                Aruncă o privire
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <ScallopEdge color="#5a2a20" flip />

      {/* Pillars — on gingham */}
      <div className="relative mt-16 sm:mt-24">
        <ScallopEdge color="#e4f1f7" />
        <div className="gingham py-20 sm:py-24">
          <div className="container-bakery flex flex-col gap-12">
            <div className="label-frame mx-auto w-full max-w-2xl bg-terracotta linen p-2.5 shadow-warm-lg">
              <div className="label-frame stitched bg-cream linen px-5 py-8 sm:px-6 sm:py-10">
                <SectionHeading
                  eyebrow="De ce Enza's Bakery"
                  title="Patru promisiuni pe care le coacem zilnic"
                  description="Nu există scurtături în meseria noastră. Doar ingrediente bune, timp și mâini răbdătoare."
                  className="relative z-10"
                />
              </div>
            </div>

            <motion.ul
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
            >
              {pillars.map((pillar, i) => {
                const Icon = pillarIcons[pillar.icon];
                return (
                  <motion.li
                    key={pillar.title}
                    variants={scaleIn}
                    whileHover={{ y: -6, rotate: 0 }}
                    style={{ rotate: tagRotations[i] }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="group stitched flex flex-col items-center gap-3 rounded-2xl bg-cream linen px-3 pt-6 pb-5 text-center shadow-warm-lg sm:gap-4 sm:rounded-[1.5rem] sm:px-6 sm:pt-10 sm:pb-8"
                  >
                    <ScallopBadge
                      fill={i % 2 ? "var(--color-terracotta)" : "var(--color-mustard)"}
                      stitch="rgb(90 42 32 / 0.35)"
                      className="size-14 transition-transform duration-500 group-hover:rotate-12 sm:size-20"
                    >
                      <Icon strokeWidth={1.8} className="size-5 text-espresso sm:size-7" aria-hidden="true" />
                    </ScallopBadge>
                    <h3 className="heading-caps relative z-10 text-xs leading-snug tracking-[0.04em] sm:text-base sm:tracking-[0.08em]">{pillar.title}</h3>
                    <p className="relative z-10 text-xs leading-relaxed text-cocoa sm:text-sm">{pillar.description}</p>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
        <ScallopEdge color="#e4f1f7" flip />
      </div>
    </section>
  );
}
