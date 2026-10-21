"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

/** Pink stitched fabric tag + uppercase slab title, in the vintage label style. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("flex max-w-2xl flex-col gap-5", align === "center" && "mx-auto items-center text-center", className)}
    >
      <motion.span
        variants={fadeUp}
        className="stitched-light inline-flex -rotate-1 items-center rounded-md bg-terracotta-dark linen px-5 py-2.5 font-serif text-xs font-bold tracking-[0.24em] text-cream uppercase shadow-warm"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className={cn(
          "heading-caps text-2xl leading-[1.2] sm:text-3xl lg:text-4xl",
          tone === "light" ? "text-cream" : "text-espresso",
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn("text-base leading-relaxed sm:text-lg", tone === "light" ? "text-cream/80" : "text-cocoa")}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
