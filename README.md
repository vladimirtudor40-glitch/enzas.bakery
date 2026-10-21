# Enza's Bakery

Site de prezentare și comenzi pentru **Enza's Bakery** — brutărie & patiserie artizanală din Constanța
([@enzas.bakery](https://www.instagram.com/enzas.bakery/)).

**Live:** https://vladimirtudor40-glitch.github.io/enzas.bakery/

## Ce conține

- Meniu filtrabil, fereastră de detalii pentru fiecare produs și coș de cumpărături salvat în browser
- Trimiterea comenzii pe WhatsApp (mesaj pre-completat) sau Instagram DM (comanda se copiază în clipboard)
- Formular pentru comenzi speciale (torturi, candy bar, evenimente)
- Banner de cookies cu setări pe categorii și pagină de politică (`/politica-cookies`)

## Tehnologii

Next.js (App Router, export static) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide

## Editare conținut

Toate textele, prețurile, programul, numărul de WhatsApp (`WHATSAPP_NUMBER`) și imaginile sunt în
[`data/bakery-data.ts`](data/bakery-data.ts).

## Comenzi

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export static în ./out
npm run deploy   # build + publicare pe GitHub Pages (branch gh-pages)
```
