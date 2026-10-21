"use client";

import { MotionConfig } from "framer-motion";
import { CartProvider } from "@/context/cart-context";
import { ConsentProvider } from "@/context/consent-context";
import { CartDrawer } from "@/components/cart-drawer";
import { FloatingCartPill } from "@/components/cart-triggers";
import { CookieBanner } from "@/components/cookie-banner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ConsentProvider>
        <CartProvider>
          {children}
          <FloatingCartPill />
          <CartDrawer />
          <CookieBanner />
        </CartProvider>
      </ConsentProvider>
    </MotionConfig>
  );
}
