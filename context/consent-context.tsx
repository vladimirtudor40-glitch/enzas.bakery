"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "enzas-bakery:consent";
/** Bump when the cookie categories change, so visitors are asked again. */
const CONSENT_VERSION = 1;

export type ConsentCategory = "analytics" | "marketing";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  updatedAt: string;
}

interface ConsentContextValue {
  /** null until the visitor has made a choice. */
  consent: ConsentState | null;
  hydrated: boolean;
  hasConsented: (category: ConsentCategory) => boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Record<ConsentCategory, boolean>) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStored(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      version: CONSENT_VERSION,
      updatedAt: String(parsed.updatedAt ?? ""),
    };
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readStored());
    setHydrated(true);
  }, []);

  const persist = useCallback((prefs: Record<ConsentCategory, boolean>) => {
    const next: ConsentState = {
      necessary: true,
      ...prefs,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
    };
    setConsent(next);
    setIsSettingsOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage blocked — the choice still applies for this visit.
    }
    window.dispatchEvent(new CustomEvent("enzas:consent", { detail: next }));
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      hydrated,
      hasConsented: (category) => Boolean(consent?.[category]),
      acceptAll: () => persist({ analytics: true, marketing: true }),
      rejectAll: () => persist({ analytics: false, marketing: false }),
      savePreferences: persist,
      isSettingsOpen,
      setIsSettingsOpen,
    }),
    [consent, hydrated, persist, isSettingsOpen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent trebuie folosit în interiorul <ConsentProvider>.");
  return ctx;
}
