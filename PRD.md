# The Brew House Website — Product Requirements

## 1. Product overview

**Product:** The Brew House public café website  
**Format:** Single-page, responsive website  
**Brand positioning:** A cosy London artisan café serving ethically sourced, small-batch-roasted coffee, tea, and pastries.  
**Primary purpose:** Introduce the café, communicate its values and offering, build trust, and help visitors plan a visit or contact the business.  
**Primary calls to action:** Explore the menu, find the café, reserve a table/contact the café.

The current implementation is a static vanilla HTML, CSS, and JavaScript site. It has no application framework or persistent data layer. Its content and interactions are implemented in `index.html`, `style.css`, and `app.js`.

## 2. Product goals

1. Make the café’s identity, location, opening hours, and contact options easy to find.
2. Present the menu in a scannable format, including prices and category filters.
3. Build credibility through the café story, sourcing and sustainability commitments, team introduction, and customer reviews.
4. Give prospective visitors a sense of the café atmosphere through a gallery.
5. Provide clear navigation and usable interactions on desktop, tablet, and mobile.
6. Support keyboard and assistive-technology use, reduced-motion preferences, and search/social sharing metadata.

## 3. Target users and user needs

- **Potential first-time visitors:** Want to understand what the café serves, where it is, when it is open, and whether it suits them.
- **Local regulars and coffee enthusiasts:** Want to browse drinks, food, seasonal menu notes, and the café’s sourcing and roasting approach.
- **People arranging a visit or enquiry:** Want a direct phone/email route or a contact form for reservations, wholesale, events, or general questions.
- **Remote workers and groups:** May use the reviews and café details to assess the atmosphere and suitability of the space.
- **Mobile visitors:** Need compact navigation and quick access to contact information and the menu.

## 4. Information architecture

The page is arranged as a single scrollable landing page:

1. Global header/navigation
2. Hero
3. About / story, values, and team
4. Menu
5. Testimonials
6. Gallery
7. Contact / visit information and message form
8. Footer
9. Floating back-to-top control

Navigation links use in-page anchors. The logo returns to the hero; primary links lead to the corresponding sections. The “Reserve” CTA points to Contact (it does not currently launch a booking workflow).

## 5. Section requirements and current experience

### 5.1 Global header and navigation

**Purpose:** Keep the brand and core destinations available while visitors browse.

**Content and controls**
- Coffee-cup mark and “The Brew House” wordmark linking to the hero.
- Desktop links: Home, About, Menu, Testimonials, Gallery, Contact.
- “Reserve” CTA linking to Contact.
- Mobile hamburger button and a separate slide-in drawer containing the same destinations plus “Reserve a Table.”

**Behavior**
- Header is sticky. After the page scrolls more than 40 px, it changes from copper to a dark translucent background.
- An intersection observer marks the current desktop navigation link with `aria-current`.
- Mobile drawer opens from the right with a dimming overlay. It closes from the toggle, overlay, Escape key, or a drawer link. Opening moves focus into the drawer; closing returns focus to the toggle.
- Anchor navigation uses smooth scrolling with an offset for the sticky header.

**Responsive behavior:** Desktop navigation and CTA are hidden at widths up to 768 px; the hamburger and drawer are used instead.

### 5.2 Hero

**Purpose:** State the offer and brand promise immediately, then route visitors to the menu or story.

**Content**
- Eyebrow: “Artisan · Ethical · London.”
- Headline: “Every Cup Tells a Story.”
- Supporting message about direct farm sourcing, in-house roasting, and made-to-order coffee.
- “Explore the Menu” and “Our Story” CTAs.
- Three proof-point statistics: 12+ years brewing, 8 origin countries, 4.9-star average rating.
- Decorative background shapes and a scroll hint linking to About.

**Visual direction:** Full-height dark coffee-toned gradient, warm copper headline and accents, white supporting copy, subtle blurred circles, and a glass-like stats strip.

**Responsive behavior:** The hero fills the viewport below the header. On small screens, CTAs stack and stats become vertical.

### 5.3 About, story, values, and team

**Purpose:** Explain the café’s point of view and create a personal, values-led connection.

**Content**
- Intro heading: “Brewed from Passion, Served with Heart.”
- Narrative that frames coffee as a ritual and conversation.
- Story copy covering ethical/direct sourcing, tasting new harvests, roasting three days a week, freshness, and the welcoming café experience.
- “Find Us” CTA linking to Contact.
- Four values/process cards:
  - **Ethically Sourced:** Direct relationships with farms in Ethiopia, Colombia, Guatemala, and elsewhere.
  - **Small-Batch Roasted:** On-site roasting three times a week.
  - **Handcrafted to Order:** Fresh espresso and steamed milk made for each order.
  - **Sustainably Minded:** Compostable cups, recycled packaging, and a 10p reusable-cup discount.
- Team teaser with Maya Chen (Head Barista & Trainer), Daniel Osei (Green-Bean Buyer), and Rosa Fernández (Founder & Roaster).

**Visual direction:** Warm cream background, story/media split, white value cards, and centered team profiles.

**Current limitations:** The café image is a placeholder, team avatars are emoji, and the page explicitly notes that real team photos and biographies are still needed.

### 5.4 Menu

**Purpose:** Make the product range and indicative prices easy to scan.

**Content**
- Heading “Our Menu,” with a notice that seasonal specials change monthly and visitors can ask a barista what is fresh.
- Category tabs: All, Espresso, Brewed & Cold, Teas & Other, Food.
- Ten menu cards, each with a name, description, price, category, and optional “Popular” or “New” badge:

| Category | Item | Price | Badge |
|---|---|---:|---|
| Espresso | Espresso | £2.50 | Popular |
| Espresso | Flat White | £3.50 | — |
| Espresso | Hazelnut Mocha | £4.20 | — |
| Espresso | Cortado | £3.20 | New |
| Brewed & Cold | Cold Brew | £4.50 | Popular |
| Brewed & Cold | Filter Coffee | £3.00 | — |
| Teas & Other | Matcha Latte | £4.00 | — |
| Teas & Other | Chai Latte | £3.80 | — |
| Food | Butter Croissant | £2.80 | — |
| Food | Brown Butter Cake | £3.50 | New |

- Note: allergen information is available on request; full menu and seasonal specials are available at the bar.

**Behavior:** Selecting a tab updates selected-state semantics and shows only cards in that category; “All” restores the full list.

**Current limitations:** There is no downloadable full menu yet. The prices and seasonal offerings are static page content.

### 5.5 Testimonials

**Purpose:** Establish social proof and describe the café experience from different visitor perspectives.

**Content:** Four attributed reviews from Sarah M. (regular), James T. (freelancer), Priya K. (coffee enthusiast), and Marco R. (former barista). Reviews mention coffee quality, pastries, atmosphere, Wi-Fi, service, cold brew, and cake. Ratings are three 5/5 reviews and one 4/5 review.

**Behavior**
- One testimonial is displayed at a time.
- Previous/next buttons and generated dot buttons change the active review; navigation wraps from end to beginning.
- Left/right arrow keys navigate while the testimonials section is active.
- The carousel advances automatically every five seconds and pauses while the section is hovered or focused.
- The active slide is exposed through `aria-hidden` state; the track wrapper uses a polite live region.

**Visual direction:** Blush background with white, centered review cards and copper star ratings and controls.

**Current limitations:** Names and reviews are static and should be treated as sample/testimonial content pending verification and approval.

### 5.6 Gallery and lightbox

**Purpose:** Show the café’s products, people, and physical space.

**Content:** Six gallery tiles for Latte Art, Interior, Our Baristas, Pastries, Roasting, and Terrace. Each has a caption and an associated descriptive lightbox caption.

**Behavior**
- Tiles are keyboard-focusable and open on click, Enter, or Space.
- The lightbox displays the selected item’s emoji placeholder and caption, locks background scrolling, and closes with its close button, Escape, or a click on the backdrop.

**Visual direction:** Dark gallery section with a three-column masonry-style grid on desktop; hover/focus reveals labels; lightbox uses a nearly black overlay.

**Current limitations:** All six image areas use emoji and visible TODO notes instead of photography. The lightbox currently enlarges the emoji, not a real image. Photo credits are also pending.

### 5.7 Contact and visit information

**Purpose:** Convert interest into a visit, call, email, reservation enquiry, wholesale enquiry, or event enquiry.

**Contact information**
- Address: 5 Folorunsho street, off Ajayi road, Ogba, Lagos state.
- Hours: Monday–Friday, 7 am–7 pm; Saturday–Sunday, 8 am–6 pm.
- Phone: 09066542639, linked with an international `tel:` number.
- Email: elijahgegeli@gmail.com, linked with `mailto:`.
- Instagram, Facebook, and TikTok icon links.
- Map area intended for an embedded map.

**Message form**
- Required name, email, and message fields; optional subject selection.
- Subject options: Table reservation, Wholesale enquiry, Events & hire, General question.
- Field-level errors are announced accessibly. Name must contain at least two non-whitespace characters, email must match a basic email pattern, and message must contain at least ten non-whitespace characters.
- Validation occurs on blur and submission. Invalid submission focuses the first invalid field.
- Submit button displays a loading spinner and is disabled during processing; success feedback is announced and auto-hides after six seconds.

**Current limitations / critical product note:** Submission currently waits 1.5 seconds and shows a success message without sending or storing anything. A real submission endpoint and genuine error handling are needed before this can be used for customer enquiries. The map is a placeholder; social links use `#` and need real profile URLs.

### 5.8 Footer

**Purpose:** Repeat the brand, useful navigation, and essential contact information at the end of the page.

**Content**
- Brand link to the hero and “Handcrafted coffee, served with heart since 2012.”
- Footer navigation to About, Menu, Testimonials, Gallery, and Contact.
- Address, telephone, and email.
- Copyright line: © 2026 The Brew House. All rights reserved.
- Instagram, Facebook, and TikTok text links.

**Current limitations:** Footer social links also use `#`.

### 5.9 Back-to-top control

**Purpose:** Give visitors a fast return to the start after scrolling.

**Behavior:** Hidden initially; appears after 400 px of scroll and scrolls smoothly to the top when activated. It is fixed near the lower-right corner and remains reachable on mobile.

## 6. Shared design system

- **Brand palette:** Copper `#bc9667`, darker copper `#a07d52`, near-black `#1e1a17`, warm cream `#f5f0e8`, off-white `#edeae3`, blush `#fddde4`, dark body text, muted gray, white, and semantic error/success colors, with a user-selectable dark theme.
- **Typography:** Poppins for body and interface text; Miniver for the hero headline. Responsive type sizes use CSS `clamp()`.
- **Layout:** Centered content container capped at 1280 px; prose capped at 680 px; spacing, radii, shadows, and transitions are tokenized with CSS variables.
- **Components:** Pill-shaped CTAs, rounded cards, subtle hover elevation, visible focus rings, and copper highlights.
- **Motion:** Smooth anchor scrolling, scroll-reveal, hover transitions, carousel transitions, and a pulsing scroll hint. Reduced-motion preferences disable or minimize animation.

## 7. Responsive requirements

- **Desktop:** Horizontal navigation; two-column About story and Contact; three-column menu and gallery; four-column values; three-column footer.
- **Tablet (≤1024 px):** Values and menu become two columns; footer changes to two columns.
- **Mobile (≤768 px):** Drawer navigation; story and Contact stack; menu becomes one column; gallery becomes two columns; footer stacks.
- **Small phones (≤480 px):** Header height reduces; hero stats and CTAs stack; values and gallery become one column; form padding and menu tabs compact.
- Layout should remain readable and operable without horizontal scrolling at supported viewport sizes.

## 8. Accessibility and usability requirements

- Use semantic header, navigation, main, sections, headings, lists, figures, form labels, and footer.
- Provide a skip-to-main-content link.
- Maintain visible `:focus-visible` styling and keyboard support for navigation, tabs, carousel, gallery/lightbox, form, and back-to-top.
- Give controls accessible names and expose navigation/tab/slide state with ARIA attributes.
- Announce field errors and form feedback to assistive technology.
- Honor `prefers-reduced-motion`.
- Provide a keyboard-accessible light/dark theme toggle and remember the selected theme between visits when browser storage is available.
- Preserve usable target sizes for prominent controls (generally at least 44 px for icon buttons).

## 9. SEO and sharing

- Document title: “The Brew House — Artisan Coffee, London.”
- Meta description describes a cosy London café, ethical coffee, tea, pastries, and welcoming experience.
- Robots directive allows indexing and following.
- Open Graph type, title, description, URL, and image are configured.
- Favicon is currently an inline coffee emoji SVG.

**Outstanding:** Confirm the canonical/public URL and replace the example Open Graph image with a real, optimized asset.

## 10. Scope and integrations

### In scope today
- Static one-page café marketing site.
- Anchor-based navigation and local UI interactions.
- Menu filtering, testimonial carousel, gallery lightbox, client-side form validation, and simulated success feedback.
- Static café, menu, review, and contact content.

### Not currently implemented
- Reservation or table-booking system.
- Backend contact-message delivery, storage, or spam protection.
- Live menu/CMS, inventory, ordering, payment, or delivery.
- Real location map integration.
- Functional social-profile destinations.
- Analytics, consent management, or other tracking integrations.
- Multi-page routing or multilingual content.

## 11. Content and operational dependencies

Before production, the café/business owner should verify:

- Business name, address, phone, email, opening hours, and “since 2012” claim.
- Menu items, prices, dietary/allergen information, availability, and seasonal updates.
- Sourcing, roasting, sustainability, discount, and origin-country claims.
- Review authenticity, permissions, names, and ratings.
- Team names, roles, biographies, and photo permissions.
- Image assets and credits for the café, products, staff, and terrace.
- Social profile URLs, production domain, and social-sharing image.
- Contact-form recipient, endpoint, privacy notice, retention policy, and failure handling.

## 12. Acceptance criteria

1. All six main section anchors are reachable from the navigation and page CTAs.
2. Header scrolling state, active navigation state, mobile drawer, and back-to-top behavior work as described.
3. Each menu tab displays exactly its matching category; “All” displays all ten menu items.
4. The testimonial carousel supports buttons, dots, arrow keys, automatic advancement, and hover/focus pause.
5. Gallery tiles open their matching caption in the lightbox using pointer and keyboard input; close button, Escape, and backdrop dismissal work.
6. The contact form validates all required fields with clear, announced feedback and focuses the first invalid field.
7. Production form success is only shown after a real endpoint confirms delivery; failures are communicated without claiming success.
8. The layout adapts at the documented breakpoints, remains usable on small screens, and respects reduced-motion settings.
9. Keyboard focus remains visible and all controls have meaningful accessible names and state.
10. Production metadata, imagery, map, contact details, and social URLs contain verified business information rather than placeholders.

## 13. Recommended launch blockers

The following should be resolved before treating the website as production-ready:

1. Connect the contact form to a real, secure delivery workflow and implement pending, success, and failure states.
2. Replace all placeholder imagery and emoji gallery/lightbox content with optimized, accessible photographs and appropriate credits.
3. Verify business contact details, hours, prices, and all factual/marketing claims.
4. Replace placeholder map and social links with real destinations.
5. Confirm the production domain and Open Graph image.
6. Confirm testimonial authenticity and approval; add real team biographies/photos if those profiles are intended to represent actual staff.
