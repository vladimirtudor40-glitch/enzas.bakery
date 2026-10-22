/**
 * Central content configuration for Enza's Bakery.
 * Edit texts, prices (RON), contact details and images here — every
 * section of the site reads from this file.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CategoryId = "toate" | "patiserie" | "focaccia" | "deserturi" | "bauturi";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryId, "toate">;
  description?: string;
  portion?: string;
  price: number;
  /** Shown as "de la" (starting price) when true. */
  priceFrom?: boolean;
  /** Full ingredient list shown in the quick-view modal. */
  ingredients?: string[];
  allergens?: string[];
  image: string;
  imageAlt: string;
  badge?: "Artizanal" | "Proaspăt scos din cuptor" | "Best-seller" | "Pe comandă";
}

export interface Pillar {
  icon: "leaf" | "wheat" | "flame" | "ban";
  title: string;
  description: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  caption: string;
  likes: number;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  rating: number;
  quote: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
  closed?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Product photo hosted on the bakery's Wolt menu, by asset id. */
export const wolt = (id: string, width = 800) => `https://imageproxy.wolt.com/assets/${id}?w=${width}`;

/** Builds an optimized Unsplash URL from a photo id. */
export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

// ---------------------------------------------------------------------------
// Brand & contact
// ---------------------------------------------------------------------------

/** Public address of the site, without a trailing slash. Change it here if a custom domain is added. */
export const SITE_URL = "https://vladimirtudor40-glitch.github.io/enzas.bakery";

/** WhatsApp number in international format, digits only. Change it here once. */
export const WHATSAPP_NUMBER = "40765993766";

export const brand = {
  name: "Enza's Bakery",
  tagline: "Brutărie & Patiserie Artizanală",
  instagramHandle: "@enzas.bakery",
  instagramUrl: "https://www.instagram.com/enzas.bakery/",
  whatsappNumber: WHATSAPP_NUMBER,
  phoneDisplay: "0765 993 766",
  phoneHref: "tel:+40765993766",
  address: "Aleea Violetelor 3, 900169 Constanța",
  mapsUrl:
    "https://www.google.com/maps/place/Enza's+Bakery/@44.1786234,28.6353224,17z/data=!4m6!3m5!1s0x40bae594ecd2ffc5:0x8432110a2761f2ef!8m2!3d44.1786234!4d28.6353224!16s%2Fg%2F11wjlb7qx6",
  googleRating: 4.8,
  googleReviewCount: 82,
  foundedNote: "Coacem cu drag în Constanța",
} as const;

export const navLinks = [
  { label: "Meniu", href: "#meniu" },
  { label: "Povestea Noastră", href: "#poveste" },
  { label: "Comenzi Speciale", href: "#comenzi" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
] as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  badge: "Brutărie & Patiserie Artizanală",
  titleLead: "Pâine coaptă",
  titleAccent: "cu suflet,",
  titleTail: "în fiecare dimineață.",
  subtitle:
    "Făină măcinată la piatră, unt adevărat și maia hrănită zilnic. Lăsăm aluatul să crească în ritmul lui, ca să ajungă la tine pâinea și patiseria așa cum le știai de acasă.",
  stats: [
    { value: "48h", label: "fermentare lentă" },
    { value: "100%", label: "ingrediente naturale" },
    { value: "0", label: "premixuri sau aditivi" },
  ],
  images: [
    { src: unsplash("1589367920969-ab8e050bbb04", 900), alt: "Pâine rustică cu maia, cu crustă crăpată și făinată" },
    { src: unsplash("1623334044303-241021148842", 900), alt: "Croissante aurii cu unt, proaspăt coapte" },
    { src: unsplash("1519915028121-7d3463d20b13", 900), alt: "Tartă cu lămâie și bezea flambată" },
    { src: unsplash("1509365465985-25d11c17e812", 900), alt: "Rulouri cu scorțișoară și zahăr perlat" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

export const categories: Category[] = [
  { id: "toate", label: "Toate" },
  { id: "patiserie", label: "Patiserie Artizanală" },
  { id: "focaccia", label: "Focaccia & Panini" },
  { id: "deserturi", label: "Deserturi de Casă" },
  { id: "bauturi", label: "Băuturi" },
];

export const products: Product[] = [
  // Patiserie artizanală
  { id: "saleuri-telemea", name: "Săleuri foietate artizanale cu telemea", category: "patiserie", price: 20, image: wolt("6824602233bd1585310187a2"), imageAlt: "Săleuri foietate artizanale cu telemea", badge: "Best-seller" },
  { id: "saratele-chimen", name: "Sărățele de casă cu chimen", category: "patiserie", price: 20, image: wolt("6824602233bd1585310187a6"), imageAlt: "Sărățele de casă cu chimen" },
  { id: "saratele-susan", name: "Sărățele cu susan", category: "patiserie", price: 20, image: wolt("6824602233bd1585310187a1"), imageAlt: "Sărățele cu susan" },
  { id: "cocoace-branza", name: "Cocoace cu brânză", category: "patiserie", price: 18, image: wolt("6824602533bd1585310187ad"), imageAlt: "Cocoace cu brânză" },
  { id: "placinta-dovleac", name: "Plăcintă cu dovleac", category: "patiserie", price: 15, image: wolt("6824602233bd1585310187a3"), imageAlt: "Plăcintă cu dovleac" },
  // Focaccia & panini
  { id: "focaccia-artizanala", name: "Focaccia artizanală", category: "focaccia", price: 15, image: wolt("6824602033bd15853101879e"), imageAlt: "Focaccia artizanală", badge: "Best-seller" },
  { id: "panini-prosciutto-crudo", name: "Focaccia panini prosciutto crudo", category: "focaccia", price: 39, image: wolt("6824602033bd15853101879c"), imageAlt: "Focaccia panini prosciutto crudo" },
  { id: "panini-pollo", name: "Focaccia panini pollo", category: "focaccia", price: 39, image: wolt("6824602033bd158531018799"), imageAlt: "Focaccia panini pollo", badge: "Best-seller" },
  { id: "panini-prosciutto-cotto", name: "Focaccia panini prosciutto cotto", category: "focaccia", price: 39, image: wolt("6824602033bd1585310187a0"), imageAlt: "Focaccia panini prosciutto cotto" },
  { id: "panini-curcan-mango", name: "Panini curcan & chutney de mango", category: "focaccia", price: 39, image: wolt("6ad1a6b5fe22dd5378463df0"), imageAlt: "Panini curcan & chutney de mango", badge: "Best-seller" },
  { id: "panini-mortadella", name: "Panini mortadella, fistic & honey mustard", category: "focaccia", price: 39, image: wolt("6ad1a6afb68d0cff9a4a91d5"), imageAlt: "Panini mortadella, fistic & honey mustard" },
  // Deserturi de casă
  { id: "carrot-cake", name: "Carrot cake", category: "deserturi", price: 28, image: wolt("6824601cf0f02a621e45c6af"), imageAlt: "Carrot cake" },
  { id: "tort-mango", name: "Tort mango", category: "deserturi", price: 30, image: wolt("6ad1a880d747dc77f71fa464"), imageAlt: "Tort mango" },
  { id: "pistachio-cookie", name: "Pistachio cookie", category: "deserturi", price: 15, image: wolt("6824602733bd1585310187b5"), imageAlt: "Pistachio cookie" },
  { id: "cookies-ciocolata", name: "Cookies cu ciocolată belgiană", category: "deserturi", price: 20, image: wolt("68246021f0f02a621e45c6c2"), imageAlt: "Cookies cu ciocolată belgiană" },
  { id: "islere", name: "Islere", category: "deserturi", description: "Fursecuri cu alune de pădure și ciocolată belgiană.", price: 25, image: wolt("6ad1a6d0fe22dd5378463df7"), imageAlt: "Islere" },
  { id: "nuci-ciocolata", name: "Nuci cu ciocolată", category: "deserturi", price: 16, image: wolt("68246019f0f02a621e45c6a5"), imageAlt: "Nuci cu ciocolată" },
  // Băuturi
  { id: "cappuccino", name: "Cappuccino Baque", category: "bauturi", price: 18, image: wolt("68246021f0f02a621e45c6bd"), imageAlt: "Cappuccino Baque" },
  { id: "espresso-scurt", name: "Espresso scurt Baque", category: "bauturi", price: 14, image: wolt("68246021f0f02a621e45c6bf"), imageAlt: "Espresso scurt Baque" },
  { id: "espresso-lung", name: "Espresso lung Baque", category: "bauturi", price: 14, image: wolt("68246024f0f02a621e45c6cb"), imageAlt: "Espresso lung Baque" },
  { id: "pink-latte", name: "Pink latte", category: "bauturi", portion: "500 ml", price: 20, image: wolt("68246024f0f02a621e45c6c6"), imageAlt: "Pink latte" },
  { id: "matcha-latte", name: "Matcha latte", category: "bauturi", price: 20, image: wolt("68246024f0f02a621e45c6c7"), imageAlt: "Matcha latte" },
  { id: "babycino", name: "Babycino", category: "bauturi", price: 20, image: wolt("68246024f0f02a621e45c6c5"), imageAlt: "Babycino" },
  { id: "english-tea", name: "English tea Baque", category: "bauturi", price: 12, image: wolt("68246024f0f02a621e45c6c8"), imageAlt: "English tea Baque" },
  { id: "dorna-minerala", name: "Apă Dorna minerală", category: "bauturi", portion: "500 ml", price: 12, image: wolt("68246021f0f02a621e45c6c1"), imageAlt: "Apă Dorna minerală" },
  { id: "dorna-plata", name: "Apă Dorna plată", category: "bauturi", portion: "500 ml", price: 12, image: wolt("68246021f0f02a621e45c6c0"), imageAlt: "Apă Dorna plată" },
  { id: "coca-cola", name: "Coca-Cola", category: "bauturi", portion: "330 ml", price: 14, image: wolt("68246024f0f02a621e45c6c4"), imageAlt: "Coca-Cola", badge: "Best-seller" },
  { id: "fanta", name: "Fanta", category: "bauturi", portion: "330 ml", price: 14, image: wolt("68246024f0f02a621e45c6c9"), imageAlt: "Fanta" },
  { id: "sprite", name: "Sprite", category: "bauturi", portion: "330 ml", price: 14, image: wolt("68246024f0f02a621e45c6ca"), imageAlt: "Sprite" },
];

// ---------------------------------------------------------------------------
// Story & pillars
// ---------------------------------------------------------------------------

export const story = {
  eyebrow: "Povestea Noastră",
  title: "O brutărie mică, cu porțelan fin și fețe de masă din dantelă",
  paragraphs: [
    "Enza's Bakery a pornit dintr-o bucătărie de familie și dintr-o maia păstrată cu grijă. Astăzi coacem în Constanța, pe Aleea Violetelor, într-un loc intim, cu aer ușor vintage, unde mirosul de unt și pâine caldă te întâmpină de la ușă.",
    "Nu ne grăbim. Aluatul are nevoie de timp ca să capete gust, iar noi îi dăm tot timpul de care are nevoie.",
  ],
  image: unsplash("1486887396153-fa416526c108", 1000),
  imageAlt: "Mâini care țin o pâine rustică proaspăt coaptă, învelită într-un ștergar",
};

export const pillars: Pillar[] = [
  {
    icon: "leaf",
    title: "Ingrediente 100% Naturale",
    description: "Unt adevărat, ouă de la ferme mici, fructe de sezon și făină măcinată la piatră.",
  },
  {
    icon: "wheat",
    title: "Maia Sălbatică & Fermentare Lentă",
    description: "Maia hrănită zilnic și 48 de ore de fermentare la rece pentru gust profund, crustă crocantă și digestie ușoară.",
  },
  {
    icon: "flame",
    title: "Coacere Zilnică în Loturi Mici",
    description: "Coacem în fiecare dimineață doar cât știm că se vinde proaspăt. Ce iese azi din cuptor e pentru azi.",
  },
  {
    icon: "ban",
    title: "Fără Aditivi sau Premixuri",
    description: "Fără amelioratori, conservanți sau arome artificiale. Totul pornește de la zero, în laboratorul nostru.",
  },
];

// ---------------------------------------------------------------------------
// Custom orders
// ---------------------------------------------------------------------------

export const customOrders = {
  eyebrow: "Comenzi Speciale",
  title: "Momentele tale mari merită un desert pe măsură",
  description:
    "Torturi personalizate, candy bar-uri complete și platouri pentru evenimente private sau corporate. Spune-ne ce sărbătorești, iar noi ne ocupăm de partea dulce.",
  services: [
    {
      id: "torturi",
      title: "Torturi personalizate",
      description: "Nunți, botezuri, aniversări",
      details: "Gândim împreună aromele, designul și decorul — de la torturi semi-naked cu fructe de pădure la torturi etajate cu flori naturale.",
      startingPrice: "de la 150 RON / kg",
      image: unsplash("1535141192574-5d4897c12636", 1000),
      imageAlt: "Tort alb pe două etaje decorat cu căpșuni și afine",
    },
    {
      id: "candy-bar",
      title: "Candy bar",
      description: "Tartelete, macarons, eclere",
      details: "Mese dulci complete, asortate cu tema evenimentului: tartelete cu fructe, macarons, mini-eclere, cupcakes și prăjituri în pahar.",
      startingPrice: "de la 12 RON / porție",
      image: unsplash("1495147466023-ac5c588e2e94", 1000),
      imageAlt: "Tartelete cu fructe și flori comestibile aranjate pe un platou",
    },
    {
      id: "corporate",
      title: "Evenimente corporate",
      description: "Coffee break & cutii cadou",
      details: "Platouri de patiserie pentru ședințe și conferințe, plus cutii cadou personalizate cu logo pentru clienți și echipă.",
      startingPrice: "de la 25 RON / persoană",
      image: unsplash("1569864358642-9d1684040f43", 1000),
      imageAlt: "Macarons colorate în nuanțe pastelate",
    },
  ],
  eventTypes: ["Tort personalizat", "Candy bar", "Eveniment corporate", "Botez / Aniversare", "Nuntă", "Altceva"],
  leadTimeNote: "Te rugăm să ne scrii cu cel puțin 5 zile înainte pentru torturi și 10 zile pentru candy bar-uri.",
};

// ---------------------------------------------------------------------------
// Instagram showcase
// ---------------------------------------------------------------------------

export const instagramPosts: InstagramPost[] = [
  { id: "ig-1", image: unsplash("1530610476181-d83430b64dcd", 700), alt: "Croissante pe un platou argintiu în cafenea", caption: "Prima tavă a dimineții 🥐", likes: 312 },
  { id: "ig-2", image: unsplash("1578985545062-69928b1d9587", 700), alt: "Tort de ciocolată cu ganache", caption: "Ganache, de la zero.", likes: 428 },
  { id: "ig-3", image: unsplash("1597528662465-55ece5734101", 700), alt: "Patiserie pe masa de lucru cu făcăleț și tel", caption: "Din culisele laboratorului", likes: 276 },
  { id: "ig-4", image: unsplash("1563729784474-d77dbb933a9e", 700), alt: "Cupcakes cu cremă de căpșuni", caption: "Weekend roz 🍓", likes: 351 },
  { id: "ig-5", image: unsplash("1517433670267-08bbd4be890f", 700), alt: "Vitrină cu pâine și patiserie", caption: "Vitrina e plină — vă așteptăm!", likes: 289 },
  { id: "ig-6", image: unsplash("1558636508-e0db3814bd1d", 700), alt: "Desert aniversar pe farfurie neagră", caption: "La mulți ani, cu dulce.", likes: 237 },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

/** Real 5-star Google reviews; only diacritics and typos corrected, surnames shortened to an initial. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ștefan L.",
    context: "Recenzie Google",
    rating: 5,
    quote: "Un loc pt. suflet unde întâlnești oameni minunați ce servesc produse cu un gust desăvârșit. Cinamon rolls este numărul 1 pe toată Constanța, sper să le facă și în sezonul cald iar eu de câte ori sunt în Constanța revin cu mare bucurie. Recomand cu tot dragul 😋",
  },
  {
    id: "t2",
    name: "Angela D.",
    context: "Recenzie Google",
    rating: 5,
    quote: "Enza's Bakery este una dintre locațiile mele preferate și o recomand cu tot dragul. Atmosfera este primitoare, locația are un design modern, personalul este foarte prietenos. Produsele sunt absolut delicioase și proaspete! 💗",
  },
  {
    id: "t3",
    name: "Radu Florian C.",
    context: "Recenzie Google",
    rating: 5,
    quote: "Am venit aici la recomandarea unui prieten și mi-a depășit așteptările. Am luat niște sărățele și au fost cele mai bune pe care le-am mâncat, prăjitura cu Snickers a fost delicioasă iar salamul de biscuiți este un „Must Have”. Personalul foarte serviabil și plăcut. Recomand cu încredere!",
  },
  {
    id: "t4",
    name: "Tiberiu P.",
    context: "Recenzie Google",
    rating: 5,
    quote: "Cheesecake-ul Dubai este absolut delicios, iar panini-ul cu produse locale de calitate este un deliciu. E genul de loc unde simți pasiunea și dedicarea în fiecare preparat. Decorul este minunat, cu un aer franțuzesc care completează perfect atmosfera primitoare. O afacere de familie cum rar mai găsești – o recomand cu toată încrederea!",
  },
  {
    id: "t5",
    name: "Andrada P.",
    context: "Recenzie Google",
    rating: 5,
    quote: "Sandvișuri extraordinar de bune! Prăjituri pe măsură! Servire / pregătire / amabilitate nota 10/10. Recomand cu mare încredere! Nu am fost niciodată dezamăgită de calitate!",
  },
];

// ---------------------------------------------------------------------------
// Footer / contact
// ---------------------------------------------------------------------------

export const openingHours: OpeningHour[] = [
  { day: "Luni", hours: "Închis", closed: true },
  { day: "Marți – Sâmbătă", hours: "09:00 – 18:00" },
  { day: "Duminică", hours: "10:00 – 16:00" },
];

export const pickupDelivery = [
  "Ridicare personală din cofetărie, Aleea Violetelor 3",
  "Comenzile se confirmă pe WhatsApp sau Instagram",
  "Livrare în Constanța pentru torturi și comenzi de evenimente",
];

// ---------------------------------------------------------------------------
// Checkout
// ---------------------------------------------------------------------------

export const timeSlots = ["09:00 – 11:00", "11:00 – 13:00", "13:00 – 15:00", "15:00 – 18:00"];

export const checkout = {
  deliveryNote: "Livrăm în Constanța pentru comenzi de minim 150 RON. Taxa se confirmă pe mesaj.",
  confirmationNote: "Confirmăm fiecare comandă personal, în timpul programului. Plata se face la ridicare sau la livrare.",
};
