# Leady offline do Google Ads — plan wdrożenia w kodzie

Plan techniczny dla repo `NonoiseMedia-Website`, wynikający z dokumentu
„Leady offline do Google Ads: plan wdrożenia" (31.10.2026).
Dokument źródłowy ma 7 etapów; **tylko Etap 2 jest pracą w kodzie**.
Ten plik opisuje, co dokładnie powstaje w repo, co zostaje po stronie GTM /
Google Ads, i co jest poza tym repo.

---

## 1. Co już jest w kodzie (stan zastany, zweryfikowany)

| Element | Plik | Stan |
|---|---|---|
| Helper dataLayer | `lib/gtm.ts` | `sendGTMEvent(name, params?)` — pushuje `{ event, ...params }`, inicjalizuje `dataLayer`, bezpieczny przed załadowaniem GTM. **Już przyjmuje drugi argument — nie trzeba go zmieniać.** |
| GTM | `components/deferred-third-parties.tsx` | `@next/third-parties` → `GoogleTagManager`, `next/dynamic` + `ssr: false`, montowany w `app/[locale]/layout.tsx`. ID z `NEXT_PUBLIC_GTM_ID`. |
| Zdarzenie kwestionariusza | `components/questionnaire/questionnaire-form.tsx:254` | `sendGTMEvent("questionnaire_success")` — **dopiero po `response.ok`**. Bez parametrów. |
| Zdarzenie kontaktu | `app/[locale]/contact/page.tsx:86` | `sendGTMEvent("contact_form_success")` — dopiero po `res.ok`. Bez parametrów. |
| Klik w telefon | `components/phone-number.tsx:33` | `sendGTMEvent("phone_click")`. |
| API kwestionariusza | `app/api/send-quote/route.ts` | Przyjmuje `formSummary`, `contactMethod` (`"email" \| "phone"`), `contactValue`, `clientName`. Temat: `Projekt: {klient} - Nonoise Media`. |
| API kontaktu | `app/api/send-contact/route.ts` | Przyjmuje `name`, `email`, `message`. Temat: `Wiadomość od {name} — nonoise.media`. |
| CSP | `next.config.mjs` | Jeden nagłówek dla `/(.*)`, pełna lista hostów Google. |
| Typ dataLayer | `types/gtm.d.ts` | `Window.dataLayer?: Record<string, unknown>[]`. |

**Diagnoza z dokumentu źródłowego jest zgodna z kodem: kod strony jest w porządku.**
Zdarzenia lecą wyłącznie po potwierdzeniu wysyłki przez API (HTTP 200), więc
414 „konwersji" nie mogło powstać z tych zdarzeń. Winowajcą jest konfiguracja
w GTM / Google Ads, nie repo.

Czego brakuje: parametrów w zdarzeniach (`transaction_id`, `user_data`),
jakiejkolwiek pamięci atrybucji (`gclid`), i jakiejkolwiek informacji o źródle
w mailu z Resend.

---

## 2. Zakres: co jest kodem, a co nie

| Etap z dokumentu źródłowego | Gdzie się robi | W tym planie |
|---|---|---|
| Etap 0 — porządki w GTM i Ads | GTM UI + Google Ads UI | Nie. Diagnostyka read-only zlecona osobnemu agentowi; wnioski → sekcja 7. |
| Etap 1 — baner cookies, Consent Mode v2 | CMP (CookieYes/Cookiebot) + GTM | Prawie nie. **Jedna zmiana w kodzie:** domeny CMP do CSP w `next.config.mjs` — do zrobienia dopiero po wybraniu CMP (sekcja 6). |
| **Etap 2 — gclid + dane kontaktowe** | **To repo** | **Tak — cała sekcja 3 i 4.** |
| Etap 3 — akcje konwersji offline | Google Ads UI | Nie. |
| Etap 4 — pola leada + eksport CSV/SHA-256 | **Osobna aplikacja do leadów** | Nie. To repo tylko *produkuje* dane w mailu; sekcja 5 to kontrakt pól. |
| Etap 5 — Data Manager, rytm tygodniowy | Google Ads UI | Nie. |
| Etap 6 — weryfikacja i stawki | Google Ads UI | Nie. |

---

## 3. Etap 2 — nowe moduły

Bez nowych zależności. Wszystko izomorficzne lub klienckie, wszystkie
operacje na storage w `try/catch`.

### 3.1 `lib/attribution.ts` (nowy)

Jedyne źródło prawdy dla atrybucji i normalizacji kontaktu. Importowany
i przez klienta, i przez route handlery.

```ts
export type Attribution = {
  gclid?: string
  gbraid?: string
  wbraid?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  landingPath?: string
  clickedAt: string          // ISO 8601
}
```

- `captureAttribution()` — czyta `window.location.search` i `pathname`.
  Jeśli jest choć jeden z `gclid` / `gbraid` / `wbraid` / `utm_*`, buduje
  rekord z `clickedAt: new Date().toISOString()` i zapisuje. **Nowy gclid
  nadpisuje stary**; brak parametrów nie czyści istniejącego rekordu.
- `readAttribution(): Attribution | null` — najpierw `localStorage`
  (z kontrolą `expiresAt`, przeterminowany rekord usuwa), potem
  `sessionStorage`.
- `newLeadId(): string` — 8 znaków base36 z `crypto.getRandomValues`,
  fallback `Math.random`. Wielkie litery (czytelne w temacie maila,
  jak `K7Q2M9XA` w dokumencie źródłowym).
- `normalizeEmail(v): string` — trim + lowercase.
- `normalizePhoneE164(v, defaultCc = "48"): string` — usuwa spacje,
  myślniki, nawiasy; obsługuje `+48…`, `0048…`, `48…`, `0…` i 9 cyfr
  bez prefiksu → `+48…`. Zwraca `""`, gdy nie da się znormalizować.
- Stałe: `STORAGE_KEY = "nnm_attr_v1"`, `TTL_DAYS = 90`.

**Decyzja techniczna:** czytamy `window.location.search`, **nie**
`useSearchParams()`. `useSearchParams` w komponencie klienckim pod statycznie
generowaną stroną wymusza Suspense/dynamiczny render — a strony tego serwisu
są prerenderowane. `window` w `useEffect` nie rusza statyczności.

### 3.2 `lib/consent.ts` (nowy)

```ts
export type ConsentValue = "granted" | "denied" | "unknown"
export function getAdStorageConsent(): ConsentValue
```

Kolejność odczytu: stan Consent Mode udostępniony przez Google
(`window.google_tag_data?.ics`), potem ciasteczka znanych CMP
(CookieYes `cookieyes-consent`, Cookiebot `CookieConsent`), w ostateczności
`"unknown"`.

**Dziś, bez banera, zwróci `"unknown"`** — i to jest poprawne: Google nie
dostaje żadnych sygnałów zgody, a tagi nie są niczym blokowane.
Konsekwencje:
- storage: `"denied"` → `sessionStorage`; `"granted"` i `"unknown"` →
  `localStorage` na 90 dni (odwzorowuje dzisiejsze zachowanie tagów);
- w mailu i w eksporcie: `"unknown"` zapisujemy jawnie jako `unknown`,
  nie udajemy `Granted`. Wiersze z gclid dopasowują się po kliknięciu, więc
  kolumny zgody nie są dla nich krytyczne — są krytyczne dla wierszy
  dopasowywanych po zahaszowanym mailu/telefonie.
- Po Etapie 1 ta sama funkcja zacznie zwracać `granted`/`denied` bez zmian
  w pozostałym kodzie.

### 3.3 `components/attribution-capture.tsx` (nowy)

`"use client"`, `useEffect(() => { captureAttribution() }, [])`, zwraca `null`.
Montowany w `app/[locale]/layout.tsx` obok `<DeferredThirdParties />`.
Layout trwa przez nawigacje klienckie, więc efekt odpala się raz, na wejściu
— dokładnie wtedy, gdy w adresie jest `gclid`.

### 3.4 `lib/lead-source.ts` (nowy, server-side)

- `sanitizeLeadSource(raw: unknown)` — biała lista kluczy, przycięcie
  każdego stringa (gclid 512, utm 200, leadId 16, ścieżka 200), walidacja
  `clickedAt` jako parsowalnej daty ISO, odrzucenie wszystkiego innego.
  Payload przychodzi od klienta, więc **nic nie trafia do maila bez
  sanitacji i escapowania**.
- `renderLeadSourceHtml(src)` — blok „Źródło" w stylu istniejących maili
  (`border-left: 2px solid #000`, uppercase label).
- `buildLeadSubject({ base, leadId, hasClickId })` — prefiks `[Ads]`, gdy
  jest którykolwiek click ID, oraz `· {leadId}` na końcu.

### 3.5 `lib/html.ts` (nowy, mały refaktor)

`escapeHtml` jest dziś zduplikowany w obu route handlerach
(`send-contact/route.ts:4`, `send-quote/route.ts:4`). Przenoszę do
`lib/html.ts` i importuję w trzech miejscach (dwa route'y + renderer bloku
„Źródło"), żeby nie powstała trzecia kopia.

---

## 4. Etap 2 — zmiany w istniejących plikach

### 4.1 `app/[locale]/layout.tsx`
Dodać `<AttributionCapture />` obok `<DeferredThirdParties />`.

### 4.2 `components/questionnaire/questionnaire-form.tsx`
W `handleSubmit`, przed `fetch`:
```ts
const leadId = newLeadId()
const attribution = readAttribution()
const consent = getAdStorageConsent()
```
Body POST rozszerzone o `leadId`, `attribution`, `consent`.
Po `response.ok` — zamiast `sendGTMEvent("questionnaire_success")`:
```ts
sendGTMEvent("questionnaire_success", {
  transaction_id: leadId,
  user_data: contactMethod === "email"
    ? { email: normalizeEmail(contactValue) }
    : { phone_number: normalizePhoneE164(contactValue) },
})
```
Klucze `email` / `phone_number` są wymagane przez GTM dla „danych
przekazywanych przez użytkownika" — hashowanie robi Google, my wysyłamy
plaintext do dataLayer.

### 4.3 `app/[locale]/contact/page.tsx`
Analogicznie. Formularz kontaktowy ma zawsze e-mail, więc
`user_data: { email: normalizeEmail(formData.email) }`.
Uwaga: body jest dziś wysyłane jako `JSON.stringify(formData)` — zmienia się
na obiekt z rozwinięciem `...formData` + nowe pola.

### 4.4 `app/api/send-quote/route.ts`
- Przyjąć `leadId`, `attribution`, `consent` → `sanitizeLeadSource`.
- Dołożyć na końcu maila sekcję „Źródło": `leadId`, click ID, `utm_*`,
  `clickedAt` (w `Europe/Warsaw`, z godziną — Etap 4 potrzebuje czasu
  konwersji), zgoda, ścieżka wejścia, oraz **znormalizowany e-mail/telefon**
  (gotowy do wklejenia w eksport).
- Temat: `[Ads] Projekt: {klient} - Nonoise Media · {leadId}`.

### 4.5 `app/api/send-contact/route.ts`
To samo. Temat: `[Ads] Wiadomość od {name} — nonoise.media · {leadId}`.

**Kompatybilność wstecz:** oba route'y muszą działać, gdy nowych pól nie ma
(zacache'owany stary bundle u klienta w trakcie deployu) — brak `leadId` nie
może wywrócić wysyłki ani zablokować leada.

### 4.6 `google-ads.md`
- Opis przepływu: wejście z reklamy → storage → submit → mail + dataLayer.
- Instrukcja konfiguracji po stronie GTM (sekcja 6.1).
- Tabela pól „Źródło" jako kontrakt dla aplikacji do leadów (sekcja 5).
- Przy okazji poprawić nieaktualne odnośniki do `app/layout.tsx` — ten plik
  nie istnieje, rootem jest `app/[locale]/layout.tsx` (zgodnie z `CLAUDE.md`).

### 4.7 Czego **nie** zmieniam
- `lib/gtm.ts` — już przyjmuje parametry.
- `components/phone-number.tsx` — klik w telefon nie ma leadId ani gclid
  w żadnym sensownym znaczeniu; dokument źródłowy słusznie przewiduje ręczne
  oznaczanie takich leadów.
- CSP — Etap 2 nie dodaje żadnego nowego hosta.

---

## 5. Kontrakt pól „Źródło" (wejście dla Etapu 4, poza tym repo)

| Pole w mailu | Źródło | Przeznaczenie |
|---|---|---|
| `leadId` | temat + sekcja Źródło | Order ID, blokada duplikatów |
| `gclid` / `gbraid` / `wbraid` | sekcja Źródło | dopasowanie do kliknięcia |
| `email` / `phone` (znormalizowane) | sekcja Źródło | dopasowanie bez gclid (EC for leads) |
| `clickedAt` | sekcja Źródło | data kliknięcia |
| `submittedAt` (Europe/Warsaw) | sekcja Źródło | Conversion Time |
| `utm_source/medium/campaign/term` | sekcja Źródło | raportowanie |
| `consent` (`granted`/`denied`/`unknown`) | sekcja Źródło | kolumny zgody w eksporcie |
| `landingPath` | sekcja Źródło | kontrola, która strona ściąga leady |

---

## 6. Konfiguracja poza kodem (do zrobienia ręcznie)

### 6.1 GTM, po deployu Etapu 2
1. Zmienna dataLayer `user_data` → w tagach konwersji kwestionariusza
   i kontaktu włączyć **dane przekazywane przez użytkownika** z tej zmiennej.
2. Zmienna dataLayer `transaction_id` → ustawić jako **ID transakcji**
   w tych samych tagach.
3. Opublikować kontener. (Sama publikacja jest też kandydatem na przyczynę
   zerowych konwersji — patrz Etap 0.)

### 6.2 Etap 1, gdy CMP będzie wybrany
Do `next.config.mjs` dopisać domeny CMP w `script-src`, `connect-src`
i `frame-src`. Konkretne hosty zależą od dostawcy
(CookieYes: `cdn-cookieyes.com`, `log.cookieyes.com`;
Cookiebot: `consent.cookiebot.com`, `consentcdn.cookiebot.com`) — dopisuję
je dopiero po decyzji, żeby nie wpisywać do CSP hostów na zapas.

---

## 7. Diagnostyka Etapu 0 — wynik (31.10.2026, read-only)

Audyt przez MCP AdvisorPPC, bez żadnych zmian w GTM i w Ads.
Konto Ads `5356992913`, kontener GTM `248076442` / `GTM-PQ7D5LSC`,
jeden workspace („Default Workspace", ID 12), 11 wersji
(najnowsza v11 „Lead conversions on successful form submission").

### 7.1 Co się potwierdziło

- **Zarzut główny potwierdzony liczbami.** Od pierwszego dnia klikanego po
  relaunchu (24.09) do 26.10: **421 kliknięć, 414 konwersji**. Akcja
  `Page view` (ID 7559430871) to **317 z 323 konwersji ostatnich 30 dni**
  — 98%.
- **`Lead: questionnaire` i `Click on Phone` mają po 0 konwersji** w 30 dni.
  Narzędzie zdrowia konwersji oznacza obie jako „orphaned".
- Strategia: `TARGET_SPEND` (**Maksymalizacja kliknięć**), limit CPC
  20,00 PLN, budżet 80,00 PLN/dzień, tylko Sieć wyszukiwania, partnerzy
  wyłączeni. Konwersje nie sterują tą strategią — zgodnie z dokumentem
  źródłowym.
- **Automatyczne stosowanie rekomendacji nie jest włączone** (0 subskrypcji).
  Są 4 aktywne, niezastosowane rekomendacje, w tym
  `MAXIMIZE_CONVERSIONS_OPT_IN` i `PERFORMANCE_MAX_OPT_IN` — do zignorowania.

### 7.2 Co jest już zrobione, inaczej niż zakłada dokument źródłowy

- **Tag 14 „Page View Trigger" jest już wstrzymany** w workspace.
- **Akcja `Page view` jest już dodatkowa** (`primary_for_goal = false`).
- Ale **cele na poziomie konta nadal mają `PAGE_VIEW` jako biddable**
  (obok `CONTACT` biddable i `SUBMIT_LEAD_FORM` nie-biddable), a kampania
  dziedziczy domyślne konta. To jest realna pozostałość do zrobienia
  z Etapu 0.

### 7.3 Nowy, mocny trop: 5 konwersji formularza kontaktowego

Dokument źródłowy mówi, że akcje formularza nie zarejestrowały nic.
Audyt pokazuje inaczej: **`Lead: contact form` ma 5 konwersji w 30 dni**,
a `Email Link Click` 1. To rozstrzyga dużo:

- Tagi konwersji w żywym kontenerze **działają** i trafiają w prawidłową
  akcję Ads — przynajmniej dla formularza kontaktowego i klików w mail.
  To osłabia hipotezę „nic nie jest opublikowane".
- Zostają dwa scenariusze i **jedno sprawdzenie je rozdziela**:
  który wersja jest na żywo.
  - Jeśli na żywo jest **v11** → te 5 konwersji przyszło z
    `contact_form_success`, czyli nazwa zdarzenia dla kontaktu jest dobra,
    a winna jest konfiguracja **samego** triggera kwestionariusza (17).
  - Jeśli na żywo jest **wersja starsza niż v11** → te 5 przyszło ze
    starego triggera klikowego („Clicking Wyślij on Contact page", usuniętego
    w v11), a nowe triggery custom event **nigdy nie weszły na produkcję**.
    Wtedy wyjaśnione jest i 0 kwestionariusza, i to, że tag Page View jest
    wstrzymany w workspace, a konwersje page view leciały do 26.10.
- **Pierwszy krok Etapu 0: w GTM › Wersje sprawdź, która wersja ma znacznik
  „Live".** To jedna minuta i zamyka dwie hipotezy naraz.

### 7.4 Nowa hipoteza spoza dokumentu źródłowego (H4): telefon

Kod wysyła zdarzenie dataLayer **`phone_click`**
(`components/phone-number.tsx:33`), ale trigger 10 „Click Tel" jest typu
**`click`**, nie `customEvent`. Dodatkowo na desktopie (`innerWidth >= 768`)
komponent robi `e.preventDefault()` i kopiuje numer do schowka — nie ma
nawigacji. Triggery linkowe GTM z „Wait for tags" / „Check validation"
w takiej sytuacji potrafią się nie odpalić, a na mobile `tel:` wychodzi
z dokumentu natychmiast.

**Zalecenie (bez zmian w kodzie): przełącz trigger 10 na custom event
`phone_click`.** Zdarzenie już leci, dla obu ścieżek — i mobilnego tapnięcia,
i desktopowego kopiowania.

### 7.5 Werdykt hipotez z dokumentu źródłowego

| Hipoteza | Werdykt | Dlaczego |
|---|---|---|
| H1: zmiany w workspace nieopublikowane | **NIEROZSTRZYGNIĘTE** | API GTM nie wystawia znacznika wersji live, daty publikacji ani licznika zmian. Workspace i v11 mają zgodnie 8 tagów / 4 triggery. Poszlaka: tag Page View wstrzymany w workspace, a konwersje page view leciały do 26.10 → żywy kontener bywał inny niż workspace. |
| H2: nazwa zdarzenia w triggerze ≠ nazwa w kodzie | **NIEROZSTRZYGNIĘTE** | API nie zwraca warunków triggerów, czyli samego stringa nazwy zdarzenia. Do sprawdzenia ręcznie w UI: trigger 17 vs `questionnaire_success`, trigger 16 vs `contact_form_success`. |
| H3: tag wskazuje inne ID/etykietę niż akcja Ads | **NIEROZSTRZYGNIĘTE** | API GTM nie wystawia parametrów tagów. Etykiety ze strony Ads do ręcznego porównania w 7.6. |

Powody, dla których nie dało się rozstrzygnąć, są po stronie limitów API,
nie konfiguracji: narzędzia GTM nie wystawiają parametrów tagów ani warunków
triggerów, a **darmowy limit API Google Ads wyczerpał się w trakcie audytu**
(odnawia się 1. dnia miesiąca UTC). Z tego powodu nie ma: rozbicia konwersji
po akcjach za 24–30.09, historii zmian (kiedy `Page view` zostało zdegradowane
do dodatkowej) ani bezpośredniego potwierdzenia konfiguracji celów kampanii.
Te trzy hipotezy zamykasz ręcznie w UI w kilka minut — dane do porównania
niżej.

### 7.6 Etykiety do ręcznego porównania (Ads → GTM)

Konto używa gtag `AW-18054795269`. Porównaj z parametrami tagów 7, 13, 9, 11:

| Akcja Ads | ID akcji | Etykieta (`AW-18054795269/…`) | Tag w GTM |
|---|---|---|---|
| Lead: contact form | 7559152524 | `cafOCIyHvpQcEIWgmaFD` | 7 „Send a Message" |
| Lead: questionnaire | 7559191668 | `1hiRCPS4wJQcEIWgmaFD` | 13 „Click send Questionnaire" |
| Email Link Click | 7559184942 | `JrsJCK6EwJQcEIWgmaFD` | 9 „Click on email" |
| Click on Phone | 7558837892 | `57H8CITtqpQcEIWgmaFD` | 11 „Click on Phone" |
| Page view | 7559430871 | `Jo9OCNeFz5QcEIWgmaFD` | 14 (wstrzymany) |

Trzy akcje są usunięte i nie wymagają uwagi: „Contact Us", „Submit lead form",
„Someone viewed contact". Wszystkie akcje mają okno 90 dni po kliknięciu
i 1 dzień po wyświetleniu — czyli Etap 3 krok 3 jest już spełniony dla
istniejących akcji; nowe akcje offline trzeba ustawić tak samo.

### 7.7 Dwa tagi Google

„Google Tag" (ID 3) i „Google Anal" (ID 15) — oba typu `googtag`, oba na
inicjalizacji. API nie zwraca ich ID, więc **nie wiadomo, czy jeden jest
zbędny**; do sprawdzenia w UI. Żaden z 8 tagów nie jest szablonem CMP —
Consent Mode nie jest w kontenerze w ogóle.

### 7.8 Do wyjaśnienia osobno

Kampania „NonoiseMedia-Leads-Search-1" (ID 23707835274) ma status ENABLED
i ELIGIBLE, ale **nie ma żadnych wyświetleń od 27.10** (ostatni wiersz danych
to 26.10). Jeśli to Twoja świadoma pauza — w porządku. Jeśli nie, to osobny
problem, niezależny od pomiaru konwersji.

### 7.9 Zrewidowana lista Etapu 0

- [x] Wstrzymać tag 14 „Page View Trigger" — **już zrobione** w workspace.
- [x] `Page view` jako akcja dodatkowa — **już zrobione**.
- [ ] **Sprawdzić w GTM › Wersje, która wersja jest live** (zamyka H1 i część H2).
- [ ] Odczytać warunek triggera 17 i 16 — dokładne stringi vs
      `questionnaire_success` / `contact_form_success`.
- [ ] Porównać ID + etykietę w tagach 7, 13, 9, 11 z tabelą 7.6.
- [ ] Wyłączyć cel `Page views` w domyślnych celach konta.
- [ ] Przełączyć trigger 10 „Click Tel" na custom event `phone_click` (H4).
- [ ] Sprawdzić ID obu tagów `googtag` i usunąć duplikat, jeśli nim jest.
- [ ] Opublikować kontener, potem test na żywo: incognito,
      `?gclid=TEST123`, Tag Assistant podłączony do **opublikowanego**
      kontenera.
- [x] Automatyczne rekomendacje — **wyłączone, potwierdzone**.

---

## 8. Weryfikacja Etapu 2

1. `pnpm lint` i `pnpm build` muszą przejść (zasada z `CLAUDE.md`).
2. Dev server + przeglądarka:
   - wejście na `/?gclid=TEST123&utm_source=google&utm_medium=cpc&utm_campaign=test`
     → sprawdzić rekord w `localStorage` (klucz `nnm_attr_v1`, `clickedAt`,
     `landingPath`);
   - nawigacja kliencka na `/contact` → rekord przetrwał;
   - **stub `window.fetch`** zwracający 200 i logujący body → submit
     formularza: w body są `leadId`, `attribution`, `consent`,
     a w `window.dataLayer` jest `contact_form_success`
     z `transaction_id` i `user_data`. To samo dla `/questionnaire`.
     Stub, bo lokalnie nie ma `RESEND_API_KEY` (brak `.env`), a zdarzenie
     leci tylko po HTTP 200 — i nie chcę wysyłać testowych maili na
     `contact@nonoise.media`.
   - sprawdzić, że redirect `/pl/:path*` → `/:path*` zachowuje query string
     (inaczej gclid ginie na starych linkach z reklam).
3. Pełny test end-to-end z prawdziwym mailem (sekcja „Źródło" w skrzynce,
   prefiks `[Ads]`, leadId w temacie) — **na preview deployu Vercela i tylko
   po Twojej zgodzie**, bo wysyła prawdziwą wiadomość.
4. Test na żywej stronie z Etapu 0 (incognito, `?gclid=TEST123`,
   Tag Assistant podłączony do **opublikowanego** kontenera) — po Twojej
   stronie, po publikacji GTM.

---

## 9. Kolejność i rozmiar

| Krok | Co | Gdzie |
|---|---|---|
| 1 | ~~Diagnostyka Etapu 0~~ — **zrobione**, wynik w sekcji 7 | agent, read-only |
| 2 | Etap 0 — poprawki w GTM/Ads według listy 7.9 | Ty, ~45 min |
| 3 | ~~**Etap 2 — kod**~~ — **zrobione**, `pnpm lint` i `pnpm build` czyste | to repo, gałąź `claude/google-ads-offline-implementation` |
| 4 | GTM: `user_data` + `transaction_id`, publikacja | Ty |
| 5 | Etap 3 — akcje konwersji offline, okno 90 dni | Ty |
| 6 | Etap 1 — CMP + jedna zmiana CSP | Ty + mała zmiana w repo |
| 7 | Etapy 4–6 — aplikacja do leadów, Data Manager, stawki | poza tym repo |

Etap 2 to ~4 nowe pliki (`lib/attribution.ts`, `lib/consent.ts`,
`lib/lead-source.ts`, `components/attribution-capture.tsx`), `lib/html.ts`
z refaktoru, i 6 plików zmienionych. Zero nowych zależności.
