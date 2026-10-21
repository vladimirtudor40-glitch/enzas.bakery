import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { brand } from "@/data/bakery-data";
import { CookieSettingsLink } from "@/components/cookie-banner";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: `Politica de cookies — ${brand.name}`,
  description: `Ce cookies și ce date stochează site-ul ${brand.name} și cum îți poți schimba alegerea.`,
};

const storageItems = [
  {
    name: "enzas-bakery:cart:v1",
    type: "Stocare locală (localStorage)",
    purpose: "Păstrează produsele din coș între vizite.",
    category: "Esențial",
    duration: "Până golești coșul sau ștergi datele browserului",
  },
  {
    name: "enzas-bakery:consent",
    type: "Stocare locală (localStorage)",
    purpose: "Ține minte alegerea ta despre cookies.",
    category: "Esențial",
    duration: "Până o schimbi sau ștergi datele browserului",
  },
];

const updatedAt = "21 octombrie 2026";

export default function CookiePolicyPage() {
  return (
    <>
      <main className="pt-10 pb-24">
        <div className="container-bakery max-w-3xl">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 font-serif text-xs font-bold tracking-[0.16em] text-espresso uppercase hover:text-terracotta-dark"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Înapoi la {brand.name}
          </Link>

          <div className="label-frame mt-6 bg-terracotta linen p-2.5 shadow-warm-lg">
            <article className="label-frame stitched bg-cream linen px-6 py-12 sm:px-12">
              <div className="relative z-10 flex flex-col gap-8 text-cocoa">
                <header className="flex flex-col gap-3 text-center">
                  <h1 className="heading-caps text-2xl text-espresso sm:text-3xl">Politica de cookies</h1>
                  <p className="text-sm">Ultima actualizare: {updatedAt}</p>
                </header>

                <section className="flex flex-col gap-3">
                  <h2 className="heading-caps text-base text-espresso">Pe scurt</h2>
                  <p className="leading-relaxed">
                    Site-ul {brand.name} folosește în prezent doar stocare esențială, necesară ca să funcționeze coșul de
                    cumpărături și ca să ținem minte alegerea ta despre cookies. Nu folosim cookies de analiză sau de
                    marketing fără acordul tău explicit.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="heading-caps text-base text-espresso">Ce stocăm</h2>
                  <div className="overflow-x-auto rounded-2xl border-2 border-dashed border-espresso/20">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead className="bg-oat/60 font-serif text-xs tracking-[0.12em] text-espresso uppercase">
                        <tr>
                          <th scope="col" className="px-4 py-3">Nume</th>
                          <th scope="col" className="px-4 py-3">Scop</th>
                          <th scope="col" className="px-4 py-3">Categorie</th>
                          <th scope="col" className="px-4 py-3">Durată</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storageItems.map((item) => (
                          <tr key={item.name} className="border-t border-dashed border-espresso/15 align-top">
                            <td className="px-4 py-3">
                              <code className="font-mono text-xs text-espresso">{item.name}</code>
                              <span className="mt-1 block text-xs">{item.type}</span>
                            </td>
                            <td className="px-4 py-3">{item.purpose}</td>
                            <td className="px-4 py-3 font-semibold text-sage-deep">{item.category}</td>
                            <td className="px-4 py-3">{item.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="heading-caps text-base text-espresso">Cookies analitice și de marketing</h2>
                  <p className="leading-relaxed">
                    Dacă vom adăuga instrumente de analiză (de exemplu Google Analytics) sau de marketing (de exemplu
                    Meta Pixel), acestea vor porni doar după ce le accepți în bannerul de cookies, iar lista de mai sus va
                    fi actualizată.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="heading-caps text-base text-espresso">Servicii externe</h2>
                  <p className="leading-relaxed">
                    Când apeși pe linkurile către WhatsApp, Instagram sau Google Maps, părăsești site-ul nostru. Acele
                    servicii pot folosi propriile cookies, conform politicilor lor. Fonturile sunt găzduite de noi, iar
                    fotografiile se încarcă de pe Unsplash (images.unsplash.com), care nu setează cookies.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="heading-caps text-base text-espresso">Cum îți schimbi alegerea</h2>
                  <p className="leading-relaxed">
                    Poți reveni oricând asupra alegerii din{" "}
                    <CookieSettingsLink className="font-semibold text-terracotta-dark underline underline-offset-2" />
                    {" "}sau poți șterge datele site-ului din setările browserului.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="heading-caps text-base text-espresso">Contact</h2>
                  <p className="leading-relaxed">
                    {brand.name}, {brand.address}. Telefon:{" "}
                    <a href={brand.phoneHref} className="font-semibold text-terracotta-dark underline underline-offset-2">
                      {brand.phoneDisplay}
                    </a>
                    .
                  </p>
                </section>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
