Role & Goal
Act as a Lead Frontend Engineer. You are tasked with building the /OFERTA (Offer) sub-page for a Polish video production agency website (nonoise.media).

You must strictly follow the established architectural guidelines, use exact copy provided below, and build a "1:1 Pixel Perfect" layout. Eradicate all generic AI patterns. Do not use placeholder components; write the fully functional, production-ready code in a single file or standard component structure.

Technical Architecture & Stack
Framework: Next.js App Router (/app/[locale]/oferta/page.tsx).

Styling: Tailwind CSS.

Animations: STRICTLY framer-motion. DO NOT use GSAP. Use whileInView={{ opacity: 1, y: 0 }} with viewport={{ once: true, margin: "-10%" }} for scroll reveals to match the codebase.

Icons: lucide-react.

Media: All media must be loaded from Cloudflare R2 ([https://assets.nonoise.media/](https://assets.nonoise.media/)). NO local .mp4 or .png files.

Visual Design System (Strict "Brutalist" Theme)
Palette: Strictly Dark Mode. Background is bg-background (black), text is text-foreground (off-white). Borders and dividers use border-foreground/10 or border-white/20.

Corners: SHARP EDGES ONLY. Absolutely no rounded-* utility classes anywhere. Every button, card, and image container must be a perfect rectangle (rounded-none).

Typography:

Massive headings: font-[family-name:var(--font-display)], uppercase, tight tracking (tracking-[0.02em]), leading none.

Labels/Tags: font-mono, uppercase, wide tracking (tracking-[0.2em]), very small text (text-[10px] or text-xs).

Body text: font-sans, text-foreground/70, relaxed leading.

Grid Layouts: Rely on 12-column CSS grids (grid-cols-1 md:grid-cols-12) to structure wide layouts, matching the architecture rules.

Page Assembly & Content Structure
The page will consist of 3 primary sections: Hero, Offer Grid (9 cards), and the standard CTA.

1. Hero Section
A massive, typography-driven brutalist header.

Sub-label (Mono): 01 / CZYM SIĘ ZAJMUJEMY

Headline (Display): NASZA OFERTA (Extremely large text: text-6xl sm:text-7xl md:text-8xl lg:text-9xl)

Sub-header (Sans): "Kompleksowa realizacja materiałów wideo, które skalują Twój biznes. Od strategii, przez produkcję, aż po finalny montaż – dostarczamy wizualny storytelling nastawiony na konwersję i realne wyniki sprzedażowe."

Animation: Staggered fade-up (y: 40 → 0, opacity: 0 → 1) using framer-motion cinematic ease [0.25, 0.1, 0.25, 1].

2. The Services Grid (9 Cards)
Create a 3x3 grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) of cards displaying the services.

Card Styling: Sharp borders (border border-foreground/10), bg-card (transparent or solid black).

Hover Interaction: When hovering over a card, trigger a subtle inversion or bg-foreground text-background swap, lifting slightly (-translate-y-1) with a smooth framer-motion layout transition.

Card Content Structure: Icon centered at the top, heading (Display or bold Sans), and paragraph (Sans, muted text).

Map exactly these lucide-react icons and Polish texts to the 9 cards:

Icon: Smartphone
Title: Rolki na Instagram
Body: Krótkie, dynamiczne materiały przyciągające uwagę w social mediach. Tworzymy angażujący content, który buduje Twoją markę eksperta i generuje interakcje. Od pomysłu, przez nagranie, po finalny montaż. Z topową jakością, której nie znajdziesz u naszej konkurencji.

Icon: Briefcase
Title: Video na LinkedIn
Body: Profesjonalne materiały video budujące Twoją pozycję w świecie B2B. Wyróżnij się merytorycznym contentem i pokaż ekspercką wiedzę w atrakcyjnej formie. Pomożemy Ci w tworzeniu regularnego contentu.

Icon: PackageOpen
Title: Filmy produktowe i usługowe
Body: Przedstawiamy Twoje rozwiązania w sposób zrozumiały i angażujący. Pokazujemy realne korzyści i wartość Twojego produktu lub usługi w formie, która przemawia do odbiorców. Skup się na swoim produkcie, a my przedstawimy to za pomocą obrazu.

Icon: TrendingUp
Title: Video case studies
Body: Przekształcamy historie Twoich sukcesów klientów w przekonujące materiały video. Buduj zaufanie, pokazując realne efekty współpracy z Twoją firmą. Niesamowite narzędzie budowania środka lejka sprzedażowego.

Icon: Webcam
Title: Webinary i szkolenia online
Body: Kompleksowa realizacja profesjonalnych webinarów i szkoleń. Zadbamy o najwyższą jakość obrazu i dźwięku, by Twój przekaz był nie tylko merytoryczny, ale też profesjonalnie podany.

Icon: Mic
Title: Wywiady Eksperckie
Body: Profesjonalne nagrania wywiadów i wypowiedzi branżowych. Buduj swoją pozycję eksperta poprzez wartościowe rozmowy z osobami z Twojej branży. Skorzystaj z możliwości, jakie daje cross marketing.

Icon: Video
Title: Vlogi
Body: Twórz materiały video budujące Twoją obecność online regularnie. Tworzymy spójną serię treści, które buduje zaufanie do Twojej marki, i jako lidera w swojej dziedzinie.

Icon: Box
Title: Animacje produktowe
Body: Przekładamy skomplikowane procesy i rozwiązania na przystępne animacje. Idealny sposób na wyjaśnienie złożonych zagadnień w przystępny sposób.

Icon: UserCheck
Title: Personalizowane video
Body: Spersonalizowane materiały video do wykorzystania w komunikacji z klientami np. uroczystościach firmowych czy kampaniach reklamowych. Świetnie sprawdzają się w lejku sprzedażowym i marketing automation.

3. CTA & Footer Hand-off
Reuse the global CTA/Header logic present in /about and /work.

Ensure you import the existing Navigation component and the CTA button component exactly as they are architected in the rest of the project. Do not reinvent the button; hook into the existing design system.

Include the standard minimal footer: <footer className="flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12"><span>&copy; 2026 NONOISE MEDIA</span></footer>

Execution Command
Build the page now. Wrap animations in cinematicEase = [0.25, 0.1, 0.25, 1]. Implement the grid, apply the 9 text blocks with exact typography, and keep it utterly brutalist. No border-radius. No placeholder text.