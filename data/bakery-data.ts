/**
 * Central content configuration for Enza's Bakery.
 * Edit texts, prices (RON), contact details and images here — every
 * section of the site reads from this file.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CategoryId = "toate" | "patiserie" | "torturi" | "paine" | "cadou";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryId, "toate">;
  description: string;
  portion: string;
  price: number;
  /** Shown as "de la" (starting price) when true. */
  priceFrom?: boolean;
  /** Full ingredient list shown in the quick-view modal. */
  ingredients: string[];
  allergens: string[];
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

/** Builds an optimized Unsplash URL from a photo id. */
export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

// ---------------------------------------------------------------------------
// Brand & contact
// ---------------------------------------------------------------------------

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
  { id: "patiserie", label: "Patiserie & Croissante" },
  { id: "torturi", label: "Torturi & Deserturi" },
  { id: "paine", label: "Pâine cu Maia" },
  { id: "cadou", label: "Cutii Cadou" },
];

export const products: Product[] = [
  // Patiserie & Croissante
  {
    id: "croissant-unt",
    name: "Croissant clasic cu unt",
    category: "patiserie",
    description: "27 de straturi de aluat laminat manual cu unt 82% grăsime. Crocant afară, pufos și aerat înăuntru.",
    portion: "90 g / buc.",
    price: 9,
    ingredients: ["făină de grâu tip 000", "unt 82%", "lapte integral", "zahăr", "drojdie", "sare de mare", "ou (glazură)"],
    allergens: ["gluten", "lactoză", "ouă"],
    image: unsplash("1623334044303-241021148842", 800),
    imageAlt: "Croissante clasice cu unt pe hârtie de copt",
    badge: "Proaspăt scos din cuptor",
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au chocolat",
    category: "patiserie",
    description: "Aluat de croissant cu două batoane de ciocolată neagră belgiană 54%, glazurat cu ou.",
    portion: "95 g / buc.",
    price: 11,
    ingredients: ["făină de grâu tip 000", "unt 82%", "ciocolată neagră 54%", "lapte", "zahăr", "drojdie", "sare", "ou"],
    allergens: ["gluten", "lactoză", "ouă", "soia"],
    image: unsplash("1483695028939-5bb13f8648b0", 800),
    imageAlt: "Tavă cu pain au chocolat aurii",
  },
  {
    id: "roll-gourmet",
    name: "Roll gourmet cu scorțișoară",
    category: "patiserie",
    description: "Aluat brioșat cu unt, umplut cu scorțișoară de Ceylon și zahăr brun, finisat cu zahăr perlat.",
    portion: "130 g / buc.",
    price: 14,
    ingredients: ["făină de grâu", "unt", "ouă", "lapte", "zahăr brun", "scorțișoară de Ceylon", "zahăr perlat", "drojdie", "sare"],
    allergens: ["gluten", "lactoză", "ouă"],
    image: unsplash("1509365465985-25d11c17e812", 800),
    imageAlt: "Rulouri cu scorțișoară presărate cu zahăr perlat",
    badge: "Best-seller",
  },
  {
    id: "croissant-migdale",
    name: "Croissant cu cremă de migdale",
    category: "patiserie",
    description: "Croissant copt de două ori, umplut cu frangipane de migdale și pudrat cu zahăr.",
    portion: "120 g / buc.",
    price: 13,
    ingredients: ["croissant cu unt", "migdale măcinate", "unt", "zahăr", "ouă", "rom", "zahăr pudră"],
    allergens: ["gluten", "lactoză", "ouă", "nuci (migdale)"],
    image: unsplash("1555507036-ab1f4038808a", 800),
    imageAlt: "Croissant pudrat cu zahăr pe o placă de ardezie",
  },

  // Torturi & Deserturi
  {
    id: "tort-zmeura-fistic",
    name: "Tort cu fistic și zmeură",
    category: "torturi",
    description: "Blat cu fistic sicilian, mousse de mascarpone și jeleu de zmeură proaspătă.",
    portion: "felie 150 g",
    price: 28,
    ingredients: ["fistic sicilian", "făină", "ouă", "zahăr", "mascarpone", "smântână dulce", "zmeură", "gelatină"],
    allergens: ["gluten", "lactoză", "ouă", "nuci (fistic)"],
    image: unsplash("1565958011703-44f9829ba187", 800),
    imageAlt: "Felie de tort cu fistic și zmeură proaspătă",
    badge: "Artizanal",
  },
  {
    id: "tiramisu",
    name: "Tiramisu della casa",
    category: "torturi",
    description: "Pișcoturi făcute de noi, însiropate în espresso, cremă de mascarpone și cacao olandeză.",
    portion: "porție 180 g",
    price: 24,
    ingredients: ["mascarpone", "ouă", "zahăr", "pișcoturi de casă", "espresso", "cacao olandeză", "marsala"],
    allergens: ["gluten", "lactoză", "ouă"],
    image: unsplash("1571115177098-24ec42ed204d", 800),
    imageAlt: "Porție de tiramisu cu bețișoare de ciocolată",
  },
  {
    id: "tarta-lamaie",
    name: "Tartă cu lămâie și bezea",
    category: "torturi",
    description: "Aluat sablé cu unt, cremă intensă de lămâie și bezea italiană flambată la comandă.",
    portion: "felie 140 g · întreagă Ø22 cm – 160 RON",
    price: 26,
    ingredients: ["făină", "unt", "zahăr", "ouă", "lămâi", "albușuri", "vanilie"],
    allergens: ["gluten", "lactoză", "ouă"],
    image: unsplash("1519915028121-7d3463d20b13", 800),
    imageAlt: "Tartă cu lămâie și bezea, cu o felie tăiată",
  },
  {
    id: "padurea-neagra",
    name: "Tort Pădurea Neagră",
    category: "torturi",
    description: "Blat de cacao, frișcă adevărată, vișine macerate și ganache de ciocolată neagră.",
    portion: "1,5 kg · 10–12 porții",
    price: 220,
    ingredients: ["făină", "cacao", "ouă", "zahăr", "frișcă 35%", "vișine", "kirsch", "ciocolată neagră"],
    allergens: ["gluten", "lactoză", "ouă", "soia"],
    image: unsplash("1606890737304-57a1ca8a5b62", 800),
    imageAlt: "Tort Pădurea Neagră cu cireșe și ciocolată",
    badge: "Pe comandă",
  },
  {
    id: "brownie",
    name: "Brownie cu ciocolată belgiană",
    category: "torturi",
    description: "Dens, umed și intens — 70% cacao, unt și un strop de sare de mare.",
    portion: "90 g / buc.",
    price: 15,
    ingredients: ["ciocolată belgiană 70%", "unt", "ouă", "zahăr brun", "făină", "sare de mare"],
    allergens: ["gluten", "lactoză", "ouă", "soia"],
    image: unsplash("1606313564200-e75d5e30476c", 800),
    imageAlt: "Brownie stivuite stropite cu ciocolată topită",
  },
  {
    id: "panna-cotta",
    name: "Panna cotta cu căpșuni",
    category: "torturi",
    description: "Smântână dulce cu vanilie Bourbon, sub un strat de căpșuni marinate în lămâie.",
    portion: "borcănel 160 g",
    price: 18,
    ingredients: ["smântână dulce", "lapte", "zahăr", "vanilie Bourbon", "gelatină", "căpșuni", "lămâie"],
    allergens: ["lactoză"],
    image: unsplash("1488477181946-6428a0291777", 800),
    imageAlt: "Borcănele de panna cotta cu căpșuni proaspete",
  },

  // Pâine cu Maia
  {
    id: "paine-rustica",
    name: "Pâine rustică cu maia",
    category: "paine",
    description: "Făină albă și integrală de grâu, apă, sare și maia. Fermentată 48 de ore la rece.",
    portion: "800 g",
    price: 22,
    ingredients: ["făină albă de grâu", "făină integrală", "apă", "maia", "sare de mare"],
    allergens: ["gluten"],
    image: unsplash("1589367920969-ab8e050bbb04", 800),
    imageAlt: "Pâine rotundă cu maia, cu crustă crăpată",
    badge: "Artizanal",
  },
  {
    id: "paine-seminte",
    name: "Pâine cu secară și semințe",
    category: "paine",
    description: "Secară, semințe de floarea-soarelui, in și dovleac prăjite. Miez umed, gust de nucă.",
    portion: "750 g",
    price: 24,
    ingredients: ["făină de secară", "făină de grâu", "maia", "semințe de floarea-soarelui", "in", "semințe de dovleac", "sare"],
    allergens: ["gluten", "semințe"],
    image: unsplash("1509440159596-0249088772ff", 800),
    imageAlt: "Pâini cu secară și semințe lângă spice de grâu",
  },
  {
    id: "paine-integrala",
    name: "Pâine integrală feliată",
    category: "paine",
    description: "100% făină integrală măcinată la piatră, feliată pentru micul dejun al întregii săptămâni.",
    portion: "700 g",
    price: 20,
    ingredients: ["făină integrală măcinată la piatră", "apă", "maia", "sare de mare"],
    allergens: ["gluten"],
    image: unsplash("1549931319-a545dcf3bc73", 800),
    imageAlt: "Pâine integrală feliată pe un fund de lemn",
  },
  {
    id: "bagheta",
    name: "Baghetă franțuzească",
    category: "paine",
    description: "Poolish de 16 ore, crustă subțire care cântă când iese din cuptor, miez cu alveole mari.",
    portion: "280 g",
    price: 9,
    ingredients: ["făină de grâu T65", "apă", "poolish", "drojdie", "sare de mare"],
    allergens: ["gluten"],
    image: unsplash("1568471173242-461f0a730452", 800),
    imageAlt: "Baghete franțuzești aurii",
    badge: "Proaspăt scos din cuptor",
  },

  // Cutii Cadou / Evenimente
  {
    id: "cutie-macarons",
    name: "Cutie macarons",
    category: "cadou",
    description: "12 macarons asortate: fistic, zmeură, caramel sărat, vanilie, ciocolată și lavandă.",
    portion: "12 buc. · cutie cadou",
    price: 85,
    ingredients: ["făină de migdale", "albușuri", "zahăr", "unt", "ciocolată albă", "piure de fructe", "fistic"],
    allergens: ["ouă", "lactoză", "nuci (migdale, fistic)"],
    image: unsplash("1569864358642-9d1684040f43", 800),
    imageAlt: "Macarons colorate în nuanțe pastelate",
  },
  {
    id: "platou-tartelete",
    name: "Platou tartelete cu fructe",
    category: "cadou",
    description: "Tartelete cu cremă de vanilie, fructe de sezon și flori comestibile — perfecte pentru candy bar.",
    portion: "20 buc.",
    price: 180,
    ingredients: ["aluat sablé cu unt", "cremă de vanilie", "fructe de sezon", "flori comestibile", "gem de caise"],
    allergens: ["gluten", "lactoză", "ouă"],
    image: unsplash("1495147466023-ac5c588e2e94", 800),
    imageAlt: "Tartelete cu fructe și flori comestibile aranjate pe un platou",
    badge: "Pe comandă",
  },
  {
    id: "cutie-cookies",
    name: "Cutie cookies artizanale",
    category: "cadou",
    description: "Cookies cu unt rumenit, bucăți de ciocolată neagră și fulgi de sare. Ambalate cadou.",
    portion: "8 buc.",
    price: 60,
    ingredients: ["unt rumenit", "zahăr brun", "făină", "ouă", "ciocolată neagră", "fulgi de sare"],
    allergens: ["gluten", "lactoză", "ouă", "soia"],
    image: unsplash("1558961363-fa8fdf82db35", 800),
    imageAlt: "Cookies cu ciocolată într-un coș învelit în hârtie",
  },
  {
    id: "tort-eveniment",
    name: "Tort de eveniment personalizat",
    category: "cadou",
    description: "Nunți, botezuri, aniversări. Gândim împreună aromele, designul și decorul floral.",
    portion: "minim 2 kg",
    price: 180,
    priceFrom: true,
    ingredients: ["ingrediente stabilite la degustare", "unt", "ouă", "smântână", "fructe de sezon"],
    allergens: ["gluten", "lactoză", "ouă", "poate conține nuci"],
    image: unsplash("1535254973040-607b474cb50d", 800),
    imageAlt: "Tort de nuntă pe trei etaje decorat cu trandafiri",
    badge: "Pe comandă",
  },
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
