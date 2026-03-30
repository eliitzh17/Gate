---
name: GATE Jerusalem Landing Page — Project Context
description: Full context for the GATE Jerusalem premium office landing page: stack, design tokens, sections, target audience, and business goals
type: project
---

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion
- Font: Heebo (Google Fonts, latin + hebrew subsets)
- RTL Hebrew page (html lang="he" dir="rtl")
- Form backend: Web3Forms

## Design Tokens (globals.css)
- --navy: #1a2744
- --navy-light: #243356
- --gold: #c9a84c
- --gold-light: #d4b85e
- --gray-light: #f5f5f5
- --gray-medium: #e5e5e5
- max-width container: max-w-6xl (72rem)
- Base spacing: Tailwind default (4px unit)

## Sections (in order)
1. Navbar — fixed, transparent→navy scroll, mobile hamburger, 7 nav links + gold CTA
2. Hero — full-screen bg image, gradient overlay, badge+h1+p+2CTAs+YouTube embed+scroll indicator
3. StatsBar — navy-light bg, 4 animated counters (40 floors, 60K sqm, 13 elevators, 32min TLV)
4. Gallery — navy bg, 6 images in masonry grid (first image col-span-2), lightbox with nav arrows
5. WhyGate — white bg, 3 icon cards (location, transport, business district)
6. AvailableFloors — gray-light bg, tower diagram + 5 floor cards + payment terms panel
7. FloorPlans — white bg, tabbed (layout image / model subdivision), PDF download links
8. Features — gray-light bg, 3x3 icon grid (9 features)
9. Grants — navy bg, 4 grant cards + summary CTA
10. Location — white bg, Google Maps iframe + 4 distance badges + 9 nearby landmarks
11. Developers — gray-light bg, 3 developer cards + Bank Hapoalim trust badge
12. ContactForm — navy bg, name/phone/email/company/floor-select/message, Web3Forms backend
13. Footer — navy-light bg, developer names + links + phone/email + legal disclaimer
14. WhatsAppButton — fixed FAB bottom-left, #25D366 green

## Floor Inventory
- Floors 21, 22, 24: 1,550 sqm gross / 1,131 sqm net — ₪31,775,000 (₪20,500/sqm) — 8 parking
- Floors 35, 37: 1,700 sqm gross / 1,241 sqm net — ₪39,950,000 (₪23,500/sqm) — 8 parking
- Payment: 30% at purchase, 70% at delivery (2029-2030)
- Parking: ₪250K + VAT each
- Bank Hapoalim is the escrow/finance bank

## Target Audience
- Israeli tech companies, international firms, real estate investors, government contractors
- High-value B2B buyers (₪31M–₪40M per floor)
- Decision makers, CFOs, real estate directors

## Business Goal
- Generate qualified leads for 5 remaining floor units
- Primary CTA: contact form (#contact)
- Secondary CTA: WhatsApp FAB

## Why: Key project decisions observed
- Section order: Hero → social proof (stats) → visual (gallery) → reasoning (why) → product (floors) → details (plans/features) → incentives (grants) → trust (location/developers) → conversion (contact)
- The tower diagram in AvailableFloors is a key interactive differentiator
- Floor 24 has a special badge: "all 13 elevators reach this floor"
- Floors 35+37 have "panoramic view" badge (premium tier)
