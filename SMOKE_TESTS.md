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
- Payment checkout is now automatic after booking (v4.6) — see v4.6 section below
- No email confirmation sent to customer (backend email integration is separate)
- Blog post detail page (`/blog/:slug`) still reuses the list page (no detail view yet)

---

## v4.6 — Payment Flow (Booking → Checkout → Status Page)

### Build

- [ ] `npm run build` completes with zero TypeScript errors and zero Vite warnings
- [ ] `dist/` folder is generated successfully

---

### Booking page — automatic checkout after booking

- [ ] Navigate to `/booking`, fill in all required fields, click "Request Appointment"
- [ ] On success: "Booking request received!" green card is shown as before
- [ ] A spinner with "Setting up payment session…" text appears below the booking confirmation while checkout is loading
- [ ] Once checkout resolves, the spinner is replaced by a **payment info card** that shows:
  - Amount (e.g., `150.00 TRY`)
  - A status badge: `Pending` (amber/yellow background)
  - A "View payment status →" link
- [ ] "View payment status →" link navigates to `/payment-status/{paymentId}`
- [ ] "Book another appointment" and "Go to home" buttons are still visible below the payment card
- [ ] Clicking "Book another appointment" resets everything — the form reappears and checkout state is cleared

---

### Booking → checkout API calls (DevTools Network tab)

- [ ] `POST /api/appointments` is called first and returns 201
- [ ] Immediately after, `POST /api/payments/checkout` is called with body `{ "appointmentId": <id> }`
- [ ] Both requests go to `http://localhost:5299`
- [ ] **No `Authorization` header** is present on either request
- [ ] No card data is collected or sent at any point
- [ ] `POST /api/payments/checkout` returns `{ paymentId, appointmentId, amount, currency, status, provider, checkoutUrl, message }`

---

### Booking page — checkout failure handling

- [ ] Simulate checkout failure (stop backend between booking submit and checkout call, or return 404 for the appointment)
- [ ] The booking success card ("Booking request received!") remains fully visible
- [ ] The payment info card is replaced by an **amber warning box** with:
  - "Payment setup could not be started automatically."
  - A message explaining the booking is still confirmed and to contact them for payment
- [ ] "Book another appointment" and "Go to home" buttons are still functional
- [ ] No white screen or app crash occurs

---

### Route: /payment-status/:paymentId

- [ ] Navigating to `/payment-status/3` (replace `3` with a real payment ID) loads the **Payment Status page**
- [ ] Page hero shows "Payment Status" heading
- [ ] "Loading payment status…" is shown while the API call is in flight
- [ ] On success: a card appears with the payment badge and payment ID

**Invalid ID:**

- [ ] `/payment-status/abc` → "Invalid payment ID." error message shown with "Back to booking" and "Home" links
- [ ] `/payment-status/99999` (non-existent) → "Payment with id 99999 was not found." error message shown
- [ ] "Try again" button on the error state re-fetches the status

---

### Payment Status Page — Pending state

- [ ] Badge shows "Awaiting payment" with **amber/yellow** background
- [ ] Payment ID is shown (e.g., "Payment #3")
- [ ] A description paragraph explains payment is pending
- [ ] **"Refresh status"** button is visible (indigo/primary style)
- [ ] Clicking "Refresh status": button briefly shows "Refreshing…" and is disabled; on completion, the status updates if it changed
- [ ] "Book another" and "Home" links are visible

**Developer tools panel (dev/test only):**

- [ ] An amber dashed-border panel labelled "Developer tools" is visible when status is Pending
- [ ] The panel description mentions the backend `simulate-paid` endpoint
- [ ] "Simulate successful payment" button is visible (amber background, distinct from primary actions)
- [ ] No `Authorization` header is sent when clicking "Simulate successful payment"

---

### Payment Status Page — simulating payment success

- [ ] Click "Simulate successful payment" in the dev panel
- [ ] Button shows "Simulating…" and is disabled while in flight
- [ ] On success: the page **updates to Paid state** without a full page reload
  - Badge changes to "Payment completed" with **green** background
  - "Paid at" row appears with the timestamp
  - The dev panel **disappears** (only shown for Pending)
  - "Refresh status" button disappears
  - "Book another" and "Home" links remain

---

### Payment Status Page — Paid state

- [ ] Badge shows "Payment completed" with **green** background
- [ ] "Paid at" label and timestamp are shown
- [ ] "Your payment has been received. Thank you!" description is shown
- [ ] No "Refresh status" button
- [ ] No dev panel
- [ ] "Book another" and "Home" links are shown

---

### Payment Status Page — other statuses (manual backend test)

Using admin panel or backend Swagger to force a specific status:

- [ ] **Failed**: badge shows "Payment failed" with **red** background; description mentions contacting for help
- [ ] **Refunded**: badge shows "Payment refunded" with **purple** background; description mentions processing time

---

### DevTools checks

- [ ] `GET /api/payments/{id}/status` is called on PaymentStatusPage load (no token)
- [ ] `PATCH /api/payments/{id}/simulate-paid` is called when "Simulate successful payment" is clicked (no token)
- [ ] After simulate, `GET /api/payments/{id}/status` is called again to refresh the displayed status
- [ ] `GET /api/payments/{id}/status` is called again when "Refresh status" is clicked
- [ ] No `Authorization` header is present on any payment status page request
- [ ] Response from status endpoint contains exactly: `id`, `status`, `paidAt` — no other fields

---

### Regression checks

- [ ] All v4.3 and v4.4 routes still load: `/`, `/services`, `/gallery`, `/blog`, `/contact`
- [ ] Booking form still works end-to-end (v4.4 flow unchanged up to the checkout addition)
- [ ] Contact form still submits to `/api/contact-messages`
- [ ] Header and Footer appear on the Payment Status page
- [ ] Navigating to an unknown URL still shows the NotFoundPage
- [ ] `npm run build` completes with zero TypeScript errors and zero Vite warnings

---

### Known limitations (v4.6)

- Payment Status page is not linked from header nav (it is a contextual page, navigated via the booking flow)
- "Simulate successful payment" dev button is publicly accessible — not gated behind authentication or environment check (intentional for this sprint; future hardening will gate it)
- No automatic polling on the Payment Status page — customer must click "Refresh status" manually
- `checkoutUrl` from the backend points to `http://localhost:5174/payment-status/{paymentId}` (placeholder URL from manual provider); in a real provider integration this will be a hosted checkout URL
- If backend returns currency other than TRY (from BusinessSettings), the amount is displayed with that currency code — no locale formatting

---

## v4.8 — Payment dev-safety (hide simulate UI outside local dev)

### Condition used to show/hide dev tools

The Developer Tools panel renders only when **both** conditions are true:
- `payment.status === 'Pending'`
- `import.meta.env.DEV === true`

`import.meta.env.DEV` is a Vite compile-time constant: `true` during `vite dev`, replaced with `false` (and dead-code-eliminated) in `vite build` output.

---

### Development mode (`npm run dev`)

- [ ] Navigate to `/payment-status/{id}` where the payment is Pending
- [ ] **Developer tools panel is visible** — amber dashed border, "Developer tools" label
- [ ] "Simulate successful payment" button is visible and clickable
- [ ] Clicking it calls `PATCH /api/payments/{id}/simulate-paid` (no token)
- [ ] On success: page updates in-place to Paid state; dev panel disappears
- [ ] Developer tools panel is **not** shown when status is Paid, Failed, or Refunded

---

### Production build (`npm run build` + `vite preview` or static host)

- [ ] Navigate to `/payment-status/{id}` where payment is Pending
- [ ] **No "Developer tools" heading visible**
- [ ] **No "Simulate successful payment" button visible**
- [ ] **No mention of `simulate-paid` or backend endpoint paths**
- [ ] "Awaiting payment" badge still shows
- [ ] "Refresh status" button still works — re-fetches status from backend
- [ ] "Book another" and "Home" links still work

---

### Unchanged behaviour (regression checks)

- [ ] Booking form submits → `POST /api/appointments` → checkout auto-starts → payment info card appears
- [ ] "View payment status →" link navigates to `/payment-status/{id}`
- [ ] `GET /api/payments/{id}/status` is called on page load (DevTools — no `Authorization` header)
- [ ] Paid status displays "Payment completed" badge with `paidAt` timestamp
- [ ] Failed status displays "Payment failed" badge
- [ ] Refunded status displays "Payment refunded" badge
- [ ] `npm run build` completes with zero TypeScript errors and zero Vite warnings

---

## v6.3 — PublicSite payment UX cleanup

### Build

- [ ] `npm run build` completes with zero TypeScript errors and zero Vite warnings
- [ ] `dotnet build --configuration Release` (backend) completes with 0 errors

### Backend: extended public payment status response

`GET /api/payments/{id}/status` now returns additional fields alongside the
existing `id`, `status`, `paidAt`:

- [ ] Response includes `amount` (decimal), `currency` (string), `provider` (string)
- [ ] Response includes `checkoutUrl` (string or null)
- [ ] Response includes `failedAt` (datetime or null), `refundedAt` (datetime or null)
- [ ] Response does **not** include `providerPaymentId`, `customerId`, `notes`, or any
  internal provider token

### Payment Status page — Pending (Iyzico)

**Setup:** active provider = Iyzico, create booking → checkout → note `paymentId`

- [ ] Navigate to `/payment-status/{paymentId}`
- [ ] Badge shows "Awaiting payment" (amber)
- [ ] `h2` title shows **"Payment is pending"**
- [ ] Description mentions "processed securely by Iyzico"
- [ ] Amount and currency are displayed (e.g. `150.00 TRY`)
- [ ] **"Continue payment" button** is visible and links to the Iyzico `checkoutUrl`
  (opens `target="_blank"`)
- [ ] Note beneath the button: "You will be redirected to Iyzico's secure payment page."
- [ ] **"Refresh status"** button is visible
- [ ] After completing the Iyzico sandbox payment and refreshing → status changes to
  **Paid**, "Continue payment" button disappears, `h2` shows "Payment completed"

### Payment Status page — Pending (Manual)

**Setup:** active provider = Manual, create booking → checkout → note `paymentId`

- [ ] Navigate to `/payment-status/{paymentId}`
- [ ] Badge shows "Awaiting payment" (amber)
- [ ] `h2` title shows **"Payment is pending"**
- [ ] Description says "Our team will process it and reach out to you." (no Iyzico wording)
- [ ] Amount and currency are displayed
- [ ] No "Continue payment" button (Manual provider's `checkoutUrl` = status page URL, not
  an external checkout)
- [ ] "Refresh status" button is visible

### Payment Status page — Paid

- [ ] Badge shows "Payment completed" (green)
- [ ] `h2` title shows **"Payment completed"**
- [ ] Amount and currency shown
- [ ] `paidAt` timestamp shown in "Paid at" meta row
- [ ] No "Continue payment" button
- [ ] "Book another" and "Home" links present

### Payment Status page — Failed

- [ ] Badge shows "Payment failed" (red)
- [ ] `h2` title shows **"Payment failed"**
- [ ] Description: "The payment could not be completed. Please create a new booking…"
- [ ] No "Continue payment" button (failed checkout URL is not reused)
- [ ] `failedAt` timestamp shown if set
- [ ] "Book another" and "Home" links present

### Payment Status page — Refunded

- [ ] Badge shows "Payment refunded" (purple)
- [ ] `h2` title shows **"Payment refunded"**
- [ ] Description explains allow a few business days
- [ ] `refundedAt` timestamp shown if set
- [ ] No "Continue payment" button

### Payment Status page — load error / offline backend

- [ ] Navigate to `/payment-status/99999` (non-existent id) → error state shows
- [ ] Error message is displayed in red
- [ ] "Try again", "Back to booking", "Home" links are all present
- [ ] No crash, no blank screen

### Booking page — payment card (Iyzico)

**Setup:** active provider = Iyzico, submit a valid booking

- [ ] Checkout loading spinner shows while `POST /api/payments/checkout` is in flight
- [ ] On success: payment card shows amount + currency + "Pending" badge
- [ ] Card shows note: "Payment is processed securely by Iyzico."
- [ ] **"Continue payment →" button** is visible, opens `checkoutUrl` in new tab
- [ ] **"View payment status →"** link is visible below the button
- [ ] Clicking "Continue payment →" opens the Iyzico sandbox checkout page

### Booking page — payment card (Manual)

**Setup:** active provider = Manual, submit a valid booking

- [ ] Payment card shows amount + currency + "Pending" badge
- [ ] No "Payment is processed securely by Iyzico." text
- [ ] No "Continue payment →" button (Manual `checkoutUrl` is the status page, not shown
  as an external link)
- [ ] "View payment status →" link is present

### Booking page — payment setup failure

- [ ] If backend checkout fails (e.g. Iyzico credentials missing), amber warning box shows:
  "Payment setup could not be started automatically."
- [ ] Warning clarifies the booking itself is still confirmed
- [ ] No crash; "Book another appointment" and "Go to home" buttons still work

### Developer tools panel (dev mode only)

- [ ] Panel visible for Pending payment in `npm run dev`
- [ ] Description now clarifies: "Works for **Manual provider** only —
  Iyzico payments must be verified through the real callback flow."
- [ ] Simulate button works for a Manual Pending payment → page updates to Paid in-place
- [ ] Simulate button for an Iyzico Pending payment → shows error from backend
  (`"Iyzico payments can only be marked Paid after provider callback verification."`)
- [ ] Panel does not appear in `npm run build` production output

### Regression checks

- [ ] `GET /api/payments/{id}/status` still returns 200 with `id`, `status`, `paidAt`
  (existing fields unchanged — new fields are additive)
- [ ] Manual checkout flow end-to-end still works
- [ ] Admin panel payment list, mark-paid, mark-refunded (Manual) still work
- [ ] No Authorization header sent on public payment status request
