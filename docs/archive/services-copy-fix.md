# Context
You are updating the Polish copy in `service-pages.ts` to sound like a premium, professional B2B video production agency from Warsaw. The current copy suffers from "AI-isms" (overused buzzwords, fake statistics, hyperbole) and a few logical business mismatches. 

Your goal is to make the tone realistic, authoritative, and focused on business value (ROI, conversion, trust).

Please go through `service-pages.ts` and implement the following fixes:

## 1. Fix Business Logic & Pricing Mismatches
- **Filmy Korporacyjne (Corporate Videos):** - Find the FAQ or pricing section that mentions starting prices of `4 000 PLN` alongside a process taking weeks. 
  - **Action:** Update the minimum price to a more realistic `8 000 - 12 000 PLN`, OR adjust the time commitment to sound less labor-intensive for the lowest tier.
- **Filmy Produktowe (Product Videos):**
  - Find the mention of `dynamiczne ujęcia ruchowe i FPV`. FPV drones are not used for standard product videos.
  - **Action:** Replace with: `"Precyzyjna praca kamery (motion control, macro), która wydobywa detale niewidoczne na zwykłych zdjęciach."`

## 2. Eliminate "AI-isms" & Fake Statistics
- **Remove "DNA Firmy":**
  - Find instances of phrases like `"Immersja w markę. Zanurzamy się w DNA Twojej firmy..."`
  - **Action:** Replace with realistic B2B language: `"Zrozumienie biznesu. Zaczynamy od poznania Twojego modelu biznesowego, kultury organizacji i tego, co realnie wyróżnia Cię na rynku. Budujemy narrację, która jest autentyczna i zrozumiała dla Twoich inwestorów i klientów."`
- **Remove Fake Percentages (Halucynacje AI):**
  - Scan for exact stats like `80%`, `5×`, `3×`, `92%`. 
  - **Action:** Replace them with behavioral B2B facts. 
    - For LinkedIn: `"Algorytmy wideo przyciągają uwagę na dłużej, budując głębszą relację niż szybkie skanowanie tekstu."`
    - For Case Studies: `"Zdecydowana większość decydentów B2B szuka dowodu społecznego przed podpisaniem umowy."`
    - For Product videos: Focus on reducing return rates and increasing user understanding instead of "80% conversion jump".
- **Fix Hyperbole & "Kinowa Jakość":**
  - Find the Event Video headline: `"TWÓJ EVENT ZASŁUGUJE NA WIECZNOŚĆ"`.
  - **Action:** Change to: `"EVENT MIJA. CONTENT PRACUJE DALEJ."`
  - Find mentions of `"kinowa jakość"` (cinematic quality) on lower-tier/social media services (like TikToks/Reels).
  - **Action:** Replace with `"dynamiczny montaż"`, `"jakość premium"`, or `"bezkompromisowa ostrość"`. Reserve "kinowa jakość" ONLY for Corporate and Commercial videos.

## 3. Copywriting Tweaks & Typos
- **Social Media Headline:**
  - Find: `"ALGORYTM NA TWOJĄ STRONĘ"`
  - **Action:** Change to: `"ALGORYTM PO TWOJEJ STRONIE"`
- **Grammar Typos:**
  - Find: `"fragmenty do newsletter"` 
  - **Action:** Change to: `"fragmenty do newslettera"`
- **Filmy Reklamowe (Process details):**
  - Find: `"Zwinne ekipy, szybki setup, maksimum ujęć w minimum czasu."` (Sounds cheap/rushed).
  - **Action:** Replace with: `"Zoptymalizowany plan zdjęciowy. Pracujemy zwinnie i konkretnie. Szanujemy czas Twojego zespołu, realizując precyzyjnie zaplanowane ujęcia pod wiele formatów w ciągu jednego dnia."`
- **Video Case Studies (FAQ):**
  - Find: `"Większość klientów chętnie uczestniczy, gdy czują się bezpiecznie."`
  - **Action:** Replace with: `"Większość klientów chętnie uczestniczy, gdy wiedzą, że proces będzie krótki, profesjonalny, a finalny materiał wzmocni również ich własny wizerunek ekspercki."`

## 4. Structural Repetition (AI Fingerprints from Audit)

### 4a. Process Headlines: 8× "OD X DO Y"
Currently every process section headline follows the exact same formula:
- "OD BRIEFU DO PREMIERY" · "OD KONCEPTU DO KONWERSJI" · "OD KONCEPTU DO PUBLIKACJI" · "OD PRODUKTU DO KONWERSJI" · "OD PLANU DO PREMIERY" · "OD STRATEGII DO ZASIĘGÓW" · "OD HISTORII DO KONWERSJI" · "OD TEMATU DO PUBLIKACJI"
- **Action:** Keep "OD X DO Y" on max 2 pages. Rewrite the rest with varied styles — questions, imperatives, single nouns. Examples: "JAK TO ROBIMY", "TRZY KROKI DO PREMIERY", "PROCES, KTÓRY DZIAŁA", "SPRAWDZONA ŚCIEŻKA".

### 4b. Subheadline Openers: 6× "Tworzymy X, które Y"
- "Tworzymy filmy korporacyjne, które..." · "Tworzymy spoty reklamowe..." · "Tworzymy kinowe produkcje..." · "Tworzymy filmy produktowe..." · "Tworzymy dynamiczne materiały..." · "Tworzymy profesjonalne materiały wideo..."
- **Action:** Vary openers — lead with the client's pain, a question, a bold claim, or the outcome instead of "We create X that Y."

### 4c. CTA Headlines: 3× "Zacznij budować"
- "Zacznij budować presencję na Instagramie" · "Zacznij budować presencję na LinkedIn" · "Zacznij budować pozycję eksperta"
- **Action:** Write distinct CTAs per page. Also the social media one still says "Instagramie" — fix post-rebrand.

### 4d. CTA Body: 7× "Opowiedz nam o..."
- 7 of 9 CTAs start with "Opowiedz nam o swoim..." → "Zaproponujemy / Przygotujemy..."
- **Action:** Vary the ask — "Umów się na 15-minutową rozmowę", "Wyślij brief", "Sprawdź, ile to kosztuje", direct questions etc.

### 4e. Repeated Selling Phrases (Verbatim Copies)
- "Z jednego dnia zdjęciowego dostarczamy..." — appears on ~4 pages (ll.208, 517, 625, 641)
- "Maksimum contentu z jednej/jednego..." — appears 3× (ll.517, 819, 916)
- "integralna część naszej usługi" — appears 2× (ll.570, 667)
- **Action:** Same argument is fine; different wording each time.

### 4f. Clichés & Tone Issues
- "Efekt? Przekaz, który angażuje..." (l.111) — GPT rhetorical question pattern. Rewrite as a direct statement.
- "Klient nie kupuje przedmiotu; kupuje doświadczenie" (l.419) — most overused marketing aphorism. Delete or make product-specific.
- "Twój produkt ożywa w oczach klienta" (l.414) — generic. Be specific about what video shows that photos can't.
- "z wagą, na jaką zasługuje" (l.907) — pompous self-praise. Cut.
- "maszynka do generowania inbound leadów" (l.722) — awkward register: colloquial "maszynka" + formal English loanwords.
- "natychmiast zmienia sposób" (l.306) — AI overconfidence. Nothing is instant.

## 5. Post-Rebrand Cleanup (Social Media Page)
The page was renamed from "Rolki na Instagram" to "Wideo do Social Media" but internal copy still references Instagram as the primary platform:
- Benefit 01 body: "Reelsy to format faworyzowany przez algorytm Instagrama" (l.615) — should be platform-agnostic
- CTA headline: "presencję na Instagramie" (l.677) — single-platform
- CTA button: "Wyceń pakiet rolek" (l.679) — "rolki" = Instagram jargon
- FAQ questions still say "rolek na Instagram" (l.660)
- **Action:** Rewrite to position as multi-platform short-form (TikTok, Reels, Shorts), mentioning Instagram as one of the channels, not the only one.

## Verification
Before completing the task, double-check that:
- No exact percentages remain in the benefits sections
- No more than 2 process headlines use "OD X DO Y"
- No more than 2 subheadlines open with "Tworzymy"
- All 9 CTAs are distinct (headline + body + button)
- Social media page doesn't over-index on Instagram
- "Kinowa jakość" appears only on Corporate and Brand Film pages
- Overall tone sounds like a seasoned B2B partner speaking to a CEO/CMO