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

- Booking form is now live (v4.4) — see v4.4 section below
- Blog post detail page (`/blog/:slug`) re-renders the same BlogPage (full detail page is future work)
- No pagination on any list
- No search on any page
- No SEO meta tags
- `settingsApi.ts` is defined but not yet used in the site (business settings are not fetched)
- Gallery category filter is client-side only (no backend filter param)

---

## v4.4 — Booking Form & Contact Fix

### Contact page endpoint fix

- [ ] Navigate to `/contact`, fill in Full Name, Email, and Message, click "Send Message"
- [ ] In DevTools Network tab: the request goes to `POST /api/contact-messages` (not `/api/contact`)
- [ ] On success: green "Message sent!" screen appears; form fields are cleared
- [ ] If backend returns a validation error (e.g., invalid email format): the exact backend error message is shown in the red error banner (not a generic fallback)
- [ ] "Send another message" button resets back to the empty form
- [ ] No `Authorization` header is present on the contact request

### Booking page — service loading

- [ ] Navigate to `/booking` — brief "Loading services…" text is shown while services fetch
- [ ] With backend running and active services: the booking form appears with a service select dropdown
- [ ] With backend down: "Unable to load services…" error message shown with a "Contact us to book" link — no form is shown
- [ ] With backend running but no active services: "No services are currently available for online booking." message shown with a "Contact us to book" link — no form is shown

### Booking form — fields and layout

- [ ] Form is displayed inside a white card with a subtle border and shadow
- [ ] Service select shows a placeholder option "— Select a service —" by default
- [ ] Each option in the service select shows: `{title} — {X} min — ${Y.YY}`
- [ ] After selecting a service, a hint line appears below the select showing duration and price
- [ ] Date input enforces a minimum of today — past dates cannot be selected
- [ ] Time input is an HTML time picker (HH:mm)
- [ ] Contact details section has a subtle divider labelled "Your contact details"
- [ ] Full Name and Email are in a two-column row on desktop; stack on mobile
- [ ] Phone is a full-width field
- [ ] Notes / Additional Notes is an optional textarea (no asterisk)
- [ ] Required fields are marked with `*`
- [ ] Submit button text is "Request Appointment"
- [ ] A disclaimer below the button explains that the team will confirm by phone or email

### Booking form — client-side validation

All validations fire on submit; no API call is made if any fails.

- [ ] Submit with no service selected → "Please select a service."
- [ ] Submit with service but no date → "Please choose a preferred date."
- [ ] Submit with service + date but no time → "Please choose a preferred time."
- [ ] Submit with all date/time/service filled but no Full Name → "Please enter your full name."
- [ ] Submit with Full Name but no Email → "Please enter your email address."
- [ ] Submit with invalid email (e.g. `notanemail`) → "Please enter a valid email address."
- [ ] Submit with valid email but no Phone → "Please enter your phone number."
- [ ] Validation error appears in a red banner above the form; form fields retain their values
- [ ] Fixing the invalid field and resubmitting clears the error and proceeds to API call

### Booking form — successful submission

- [ ] Fill all required fields with valid data; click "Request Appointment"
- [ ] Button shows "Sending request…" while in flight; all form fields become unresponsive
- [ ] On success: the form is replaced by a green success message
  - [ ] "Booking request received!" heading is shown
  - [ ] Customer's full name appears in the confirmation text
  - [ ] Service title appears in the confirmation text
  - [ ] Requested date and time appear in the confirmation text
  - [ ] Reference number (appointment ID) is shown
- [ ] "Book another appointment" button resets to the empty form
- [ ] "Go to home" link navigates to `/`

### Booking form — backend error

- [ ] With backend running, submit with a date in the past (bypass the HTML `min` with DevTools if needed) — backend returns 400; error message from the backend is shown in a red banner above the form; form fields are preserved

### DevTools checks (Network tab)

- [ ] `POST /api/appointments` is called on booking submit
- [ ] Request body contains exactly:
  - `customerFullName` (string)
  - `customerEmail` (string or `null` if left blank — email is required by validation so always a string here)
  - `customerPhone` (string)
  - `staffMemberId`: `null`
  - `businessServiceId` (number, not a string)
  - `requestedDate` (string, format `YYYY-MM-DD`)
  - `requestedTime` (string, format `HH:mm`)
  - `note` (string or `null`)
- [ ] No `Authorization` header is present on the booking request
- [ ] Response is 201 with the created appointment object (id, customerFullName, businessServiceTitle, requestedDate, requestedTime, status)

### Regression checks

- [ ] All v4.3 routes still load: `/`, `/services`, `/gallery`, `/blog`, `/contact`
- [ ] Header and Footer are unchanged on all pages
- [ ] Home page still loads services and gallery previews from the backend
- [ ] Services page still loads and shows the "Book" button on each service
- [ ] `npm run build` completes with zero TypeScript errors and zero Vite warnings

### Known limitations (v4.4)

- No real-time availability checking — any date and time can be submitted
- `staffMemberId` is always sent as `null` (staff selection is not exposed to customers yet)
- No payment step — booking creates a Pending appointment only
- No email confirmation sent to customer (backend email integration is separate)
- Blog post detail page (`/blog/:slug`) still reuses the list page (no detail view yet)
