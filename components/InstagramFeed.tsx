"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { brand, instagramPosts } from "@/data/bakery-data";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { MotionLink } from "@/components/ui/MotionButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { external } from "@/lib/utils";

export function InstagramFeed() {
  return (
    <section id="galerie" className="py-14 sm:py-28 lg:py-32">
      <div className="container-bakery flex flex-col gap-12">
        <SectionHeading
          eyebrow={brand.instagramHandle}
          title="Loturi proaspete, în fiecare zi pe Instagram"
          description="Urmărește-ne ca să afli primul ce iese din cuptor, ce ediții limitate pregătim și când deschidem comenzile de sărbători."
        />

        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        >
          {instagramPosts.map((post, i) => (
            <motion.li key={post.id} variants={scaleIn} style={{ rotate: [-2, 1.5, -1, 2, -1.5, 1][i % 6] }} className={i % 3 === 1 ? "lg:translate-y-10" : undefined}>
              <motion.a
                href={brand.instagramUrl}
                {...external}
                aria-label={`${post.caption} — vezi pe Instagram`}
                initial="rest"
                whileHover="hover"
                whileFocus="hover"
                animate="rest"
                className="group relative block aspect-square overflow-hidden rounded-[1.25rem] border-[8px] border-cream bg-oat shadow-warm-lg"
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={post.image} alt={post.alt} fill sizes="(min-width: 1024px) 30vw, 46vw" className="object-cover" />
                </motion.div>

                <motion.div
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-espresso/55 text-cream backdrop-blur-[2px]"
                >
                  <motion.div
                    variants={{ rest: { y: 12, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="flex items-center gap-5 text-sm font-semibold"
                  >
                    <span className="flex items-center gap-1.5">
                      <Heart size={18} fill="currentColor" aria-hidden="true" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={18} fill="currentColor" aria-hidden="true" />
                      {Math.round(post.likes / 14)}
                    </span>
                  </motion.div>
                  <motion.span
                    variants={{ rest: { y: 12, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
                    transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 }}
                    className="flex items-center gap-1.5 rounded-full bg-cream/15 px-4 py-2 text-xs font-semibold tracking-wide ring-1 ring-cream/30"
                  >
                    Vezi pe Instagram
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </motion.span>
                </motion.div>

                <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-cream/85 text-espresso shadow-sm">
                  <InstagramIcon size={16} />
                </span>
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex justify-center pt-4 lg:pt-12">
          <MotionLink href={brand.instagramUrl} {...external} className="btn-primary">
            <InstagramIcon size={18} />
            Urmărește {brand.instagramHandle}
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
