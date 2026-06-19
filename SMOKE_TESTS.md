# BusinessKit Public Site — Smoke Tests

Manual smoke test checklist. Run after each release with the backend at `http://localhost:5299` and the public site at `http://localhost:5174`.

---

## v4.3 — Foundation

### Build

- [ ] `npm run build` completes with zero TypeScript errors and zero Vite warnings
- [ ] `dist/` folder is created with `index.html` and bundled assets

### Dev server

- [ ] `npm run dev` starts the development server on **port 5174**
- [ ] Opening `http://localhost:5174` loads the site without console errors

### Layout — Header

- [ ] Header is visible on every page with dark background
- [ ] "BusinessKit" logo text in the header navigates to `/`
- [ ] Navigation links present: Home, Services, Gallery, Blog, Contact, Book Now
- [ ] "Book Now" link is styled as a purple/indigo button
- [ ] Clicking each nav link navigates to the correct route
- [ ] Active page link does not have a visible different style in dark header (subtle: tested by checking active class)
- [ ] On **desktop** (≥769 px): all links are visible inline — no hamburger shown
- [ ] On **mobile** (≤768 px): links are hidden; a hamburger icon (three horizontal bars) is shown
- [ ] Clicking the hamburger toggles the mobile menu open/closed
- [ ] Clicking a nav link in the mobile menu closes the menu
- [ ] Header sticks to the top when scrolling down any page

### Layout — Footer

- [ ] Footer is visible on every page with dark background
- [ ] Footer shows "BusinessKit" logo text
- [ ] Footer tagline "Professional services, delivered with care." is shown
- [ ] Footer contains navigation links: Home, Services, Gallery, Blog, Contact, Book Now
- [ ] Footer shows copyright year
- [ ] Footer nav links navigate correctly

### Routing

- [ ] `/` loads HomePage
- [ ] `/services` loads ServicesPage
- [ ] `/booking` loads BookingPage
- [ ] `/gallery` loads GalleryPage
- [ ] `/blog` loads BlogPage
- [ ] `/contact` loads ContactPage
- [ ] Unknown URL (e.g. `/nonexistent`) loads NotFoundPage with "Page not found" message
- [ ] NotFoundPage has a "Go home" button that returns to `/`
- [ ] Browser back/forward buttons navigate correctly between pages
- [ ] Refreshing any page (e.g. `/services`) loads correctly without a 404 (in dev server)

---

### Home Page (`/`)

- [ ] Hero section is visible with a large heading, subtitle, and two CTA buttons
- [ ] "Book an Appointment" button navigates to `/booking`
- [ ] "View Services" button navigates to `/services`
- [ ] **Services preview section** is visible with heading "Our Services"
  - [ ] If backend is running with active services: up to 3 service cards are shown
  - [ ] If no active services: placeholder text is shown instead of cards
  - [ ] "See All Services" link navigates to `/services`
- [ ] **Booking CTA banner** (indigo/purple band) is visible with "Ready to book?" text and "Book Now" button
- [ ] "Book Now" button in the CTA banner navigates to `/booking`
- [ ] **Gallery preview section** appears if active gallery items exist
  - [ ] Up to 6 gallery thumbnails are shown
  - [ ] "View Full Gallery" link navigates to `/gallery`
  - [ ] Gallery section is absent if no active gallery items are returned
- [ ] **Contact CTA section** is visible with "Get in Touch" heading and "Contact Us" button
- [ ] "Contact Us" button navigates to `/contact`

---

### Services Page (`/services`)

- [ ] Page hero shows "Our Services" heading
- [ ] "Loading services…" is shown briefly while data fetches
- [ ] If backend has active services: service list renders
  - [ ] Each item shows: title, duration (in minutes), price (formatted as $X.XX)
  - [ ] If a service has an image URL: thumbnail is shown on the left
  - [ ] "Book" button is visible on each service item and navigates to `/booking`
- [ ] If no active services: "No services are currently listed." placeholder is shown
- [ ] If backend is down: "Unable to load services right now. Please try again later." is shown
- [ ] "Book an Appointment" button at the bottom navigates to `/booking`

---

### Booking Page (`/booking`)

- [ ] Page hero shows "Book an Appointment" heading
- [ ] Placeholder card is visible with calendar icon, "Booking Coming Soon" title, and description text
- [ ] "Contact Us to Book" button navigates to `/contact`
- [ ] "Browse Services" button navigates to `/services`
- [ ] Three info cards visible: "Walk-ins Welcome", "Phone Booking", "Fast Confirmation"
- [ ] No actual booking form exists in v4.3 (by design)

---

### Gallery Page (`/gallery`)

- [ ] Page hero shows "Our Gallery" heading
- [ ] "Loading gallery…" is shown briefly while data fetches
- [ ] If backend has active gallery items:
  - [ ] Items are shown in a responsive grid
  - [ ] Each item shows its image
  - [ ] Hovering a thumbnail shows a dark overlay with the item's title
- [ ] If gallery items have categories: category filter buttons appear above the grid
  - [ ] "All" button is selected by default and shows all items
  - [ ] Clicking a category button filters the grid to show only items in that category
  - [ ] Clicking "All" again shows all items
- [ ] If no active gallery items: "No photos in this category yet." is shown
- [ ] If backend is down: "Unable to load gallery right now. Please try again later." is shown

---

### Blog Page (`/blog`)

- [ ] Page hero shows "Blog" heading
- [ ] "Loading posts…" is shown briefly while data fetches
- [ ] If backend has published posts:
  - [ ] Posts are shown in a card list
  - [ ] Each card shows: title, summary (if available), category (if available), published date, "Read more →" link
  - [ ] "Read more →" navigates to `/blog/{slug}` (individual post page is a placeholder in v4.3 — same BlogPage is rendered)
  - [ ] Post with a cover image shows the image on the left side of the card
- [ ] If no posts: "No posts yet — check back soon." is shown
- [ ] If backend is down: "Unable to load blog posts right now. Please try again later." is shown

---

### Contact Page (`/contact`)

- [ ] Page hero shows "Contact Us" heading
- [ ] Contact form is visible with fields: Full Name, Email, Phone (optional), Subject (optional), Message
- [ ] **Form validation (client-side)**:
  - [ ] Submitting with empty Full Name: error "Please fill in your name, email, and message." shown; no API call
  - [ ] Submitting with empty Email: same error shown; no API call
  - [ ] Submitting with empty Message: same error shown; no API call
  - [ ] Submitting with only required fields filled: API call is made
- [ ] With backend running:
  - [ ] Fill Full Name, Email, and Message; click "Send Message"
  - [ ] Button shows "Sending…" while in flight
  - [ ] On success: form is replaced by a success message with "Message sent!" heading
  - [ ] "Send another message" button resets the view back to the empty form
- [ ] With backend down:
  - [ ] Submit button shows "Sending…" briefly then returns
  - [ ] Error message shown: "Failed to send your message. Please try again or contact us directly."
  - [ ] Error banner appears above the form; form fields retain their values

---

### API integration (DevTools Network tab)

- [ ] `GET /api/services` is called on HomePage and ServicesPage load
- [ ] `GET /api/gallery` is called on HomePage and GalleryPage load
- [ ] `GET /api/blog` is called on BlogPage load
- [ ] `POST /api/contact` is called on contact form submit
- [ ] All requests go to `http://localhost:5299` (the backend base URL)
- [ ] No `Authorization` header is sent on any public-site request

---

### Responsive layout

- [ ] On desktop (≥1024 px): service cards are shown in a multi-column grid
- [ ] On tablet (≈768 px): layout adjusts gracefully; no content is clipped
- [ ] On mobile (≤480 px):
  - [ ] Hamburger menu works
  - [ ] Hero text is readable (no overflow)
  - [ ] Service list items stack vertically
  - [ ] Blog cards stack (image on top, text below)
  - [ ] Contact form fields stack into single-column layout
  - [ ] Footer nav links wrap onto multiple lines

---

### Known limitations (v4.3)

- Booking form is a placeholder — no appointment creation yet
- Blog post detail page (`/blog/:slug`) re-renders the same BlogPage (full detail page is future work)
- No pagination on any list
- No search on any page
- No SEO meta tags
- `settingsApi.ts` is defined but not yet used in the site (business settings are not fetched)
- Gallery category filter is client-side only (no backend filter param)
