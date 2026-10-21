"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";

interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose: () => void;
  /** Auto-dismiss delay in ms. */
  duration?: number;
}

export function Toast({ open, title, description, actionLabel, onAction, onClose, duration = 6000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <AnimatePresence>
        {open && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="stitched-light pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl chocolate p-5 text-cream shadow-warm-lg"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.08 }}
              className="mt-0.5 text-[#a9c4aa]"
            >
              <CheckCircle2 size={22} aria-hidden="true" />
            </motion.span>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm font-semibold">{title}</p>
              {description && <p className="text-sm leading-relaxed text-cream/75">{description}</p>}
              {actionLabel && onAction && (
                <button
                  type="button"
                  onClick={onAction}
                  className="mt-2 inline-flex min-h-10 w-fit items-center gap-1.5 rounded-full bg-mustard px-4 text-xs font-bold text-espresso transition-colors hover:bg-mustard-dark"
                >
                  {actionLabel}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Închide notificarea"
              className="-mt-1 -mr-1 inline-flex size-10 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
