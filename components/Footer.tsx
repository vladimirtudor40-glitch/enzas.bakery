import Link from "next/link";
import { Clock, MapPin, Phone, Truck } from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-banner";
import { brand, navLinks, openingHours, pickupDelivery } from "@/data/bakery-data";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { cn, external, whatsappLink } from "@/lib/utils";
import { ScallopBadge, ScallopEdge } from "@/components/ui/Decor";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative">
      <ScallopEdge color="#5a2a20" />
      <div className="chocolate pt-20 pb-10 sm:pt-24">
      <div className="container-bakery flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-cream/10 pb-14 lg:flex-row lg:items-end">
          <div className="flex max-w-xl flex-col gap-4">
            <p className="heading-caps text-2xl leading-snug sm:text-3xl">
              Ne vedem la o cafea și un <span className="font-hand text-5xl tracking-normal text-mustard normal-case sm:text-6xl">croissant cald</span>?
            </p>
            <p className="text-cream/70">{brand.foundedNote}. Te așteptăm pe Aleea Violetelor.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappLink("Bună ziua! Aș avea o întrebare pentru Enza's Bakery.")}
              {...external}
              className="btn-primary"
            >
              <WhatsAppIcon size={18} />
              Scrie-ne pe WhatsApp
            </a>
            <a
              href={brand.instagramUrl}
              {...external}
              className="btn border-2 border-dashed border-cream/35 text-cream hover:border-cream/60 hover:bg-cream/5"
            >
              <InstagramIcon size={18} />
              {brand.instagramHandle}
            </a>
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/#acasa" className="w-fit" aria-label={`${brand.name}, înapoi sus`}>
              <ScallopBadge fill="var(--color-terracotta)" stitch="rgb(90 42 32 / 0.4)" className="size-32">
                <span className="font-script text-3xl leading-none text-espresso">Enza&apos;s</span>
                <span className="mt-1 font-serif text-[10px] font-bold tracking-[0.35em] text-espresso">BAKERY</span>
              </ScallopBadge>
            </Link>
            <p className="text-sm leading-relaxed text-cream/65">
              {brand.tagline}. Pâine cu maia, patiserie franțuzească și torturi coapte zilnic, în loturi mici.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.2em] text-mustard uppercase">
              <Clock size={14} aria-hidden="true" />
              Program
            </h2>
            <dl className="flex flex-col gap-2 text-sm">
              {openingHours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 border-b border-cream/8 pb-2">
                  <dt className="text-cream/70">{h.day}</dt>
                  <dd className={cn("font-medium", h.closed && "text-cream/50")}>{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.2em] text-mustard uppercase">
              <Truck size={14} aria-hidden="true" />
              Ridicare & Livrare
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-cream/70">
              {pickupDelivery.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.2em] text-mustard uppercase">
              <MapPin size={14} aria-hidden="true" />
              Contact
            </h2>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <a
                  href={brand.mapsUrl}
                  {...external}
                  className="flex min-h-11 items-start gap-2 py-2 text-cream/80 transition-colors hover:text-cream"
                >
                  <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-mustard" />
                  {brand.address}
                </a>
              </li>
              <li>
                <a href={brand.phoneHref} className="flex min-h-11 items-center gap-2 text-cream/80 transition-colors hover:text-cream">
                  <Phone size={16} aria-hidden="true" className="shrink-0 text-mustard" />
                  {brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={brand.instagramUrl}
                  {...external}
                  className="flex min-h-11 items-center gap-2 text-cream/80 transition-colors hover:text-cream"
                >
                  <InstagramIcon size={16} className="shrink-0 text-mustard" />
                  {brand.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-cream/10 pt-8 text-xs text-cream/55 sm:flex-row sm:items-center">
          <p>
            © {year} {brand.name}. Toate drepturile rezervate.
          </p>
          <nav aria-label="Navigare subsol">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`/${link.href}`} className="transition-colors hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/politica-cookies" className="transition-colors hover:text-cream">
                  Politica cookies
                </Link>
              </li>
              <li>
                <CookieSettingsLink className="underline decoration-dashed underline-offset-4 transition-colors hover:text-cream" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      </div>
    </footer>
  );
}
