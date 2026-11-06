# WOOD X TealerLab — motion and merchandising pass

## Intent

Increase the perceived quality and retail rhythm of the WOOD demo so it feels like a complete editorial commerce experience: a sequence of drops, rails, product reveals, focused calls to action, and responsive feedback. The visual identity remains WOOD: dark botanical green, lime accents, glass cloches, original graffiti, Nice/family positioning, and honest demo labels.

## Goals

- Add visible but useful movement to the homepage, catalog, product details, rails, navigation, buttons and cart feedback.
- Improve product presentation: media status, image treatment, information hierarchy, quick action placement and detail-page transition.
- Make the TealerLab-inspired rhythm explicit through section rails, progress controls, product-card reveals, drops and editorial cues.
- Preserve accessibility, reduced motion, low-data behavior and truthful content boundaries.

## Non-goals / anti-goals

- Do not copy TealerLab code, artwork, copy, ratings, promotions, photos or claims.
- Do not invent prices, stock, reviews, laboratory results or real brand photography.
- Do not make animation necessary to understand a product or complete an action.

## Approaches considered

1. **CSS-only polish** — low risk, but cannot coordinate scroll state, rail controls, progressive enhancement or cart feedback.
2. **Heavy animation dependency** — expressive, but unnecessary for the buildless static site and adds performance/accessibility risk.
3. **Recommended: native CSS + one progressive enhancement layer** — CSS owns the visual grammar; `wood-motion.js` coordinates observers, rails, parallax, magnetic pointer hints and interaction state without a dependency.

## Decisions

- Use one shared `wood-motion.css` and `wood-motion.js` on homepage, catalog and product pages.
- Keep rails keyboard-scrollable and add explicit previous/next controls with a visible progress indicator.
- Use IntersectionObserver for staggered reveals and disable non-essential motion for reduced-motion and low-data users.
- Keep product media under a cloche, mark demo media, and preserve the existing full-page product transition and lightbox.
- Use CSS custom properties for pointer/parallax values so the JS layer can fail safely.

## Implementation handoff

The builder should add the shared motion layer, rail controls, upgraded catalog media chrome, action feedback, tests, package allow-list entries, and a GitHub Pages rebuild. Final acceptance is visual review on desktop and 390px mobile, with no console errors and the existing full check green.
