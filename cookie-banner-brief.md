# Zadanie: baner cookies (CookieYes) + strony prawne

Repozytorium: **NonoiseMedia-Website** (Next.js App Router, TypeScript, Tailwind,
next-intl, pnpm, hosting Vercel). Dokument jest samowystarczalny — nie zakłada
dostępu do innych plików planu.

---

## 0. ZASADA NADRZĘDNA: nic nie wypychasz

**Nie rób `git push`. Nie otwieraj pull requesta. Nie merguj.**

Pracuj na gałęzi `feat/cookie-consent`, commituj lokalnie małymi krokami, a gdy
skończysz — **zatrzymaj się i pokaż podsumowanie zmian oraz pełny diff**.
Push i PR nastąpią dopiero po wyraźnej zgodzie właściciela, wyrażonej w tej
sesji. Jeśli uznasz, że push jest potrzebny, żeby cokolwiek działało — nie rób
go, tylko napisz dlaczego i czekaj.

Nie dotykaj gałęzi `main`.

---

## 1. Kontekst w trzech zdaniach

Strona nie ma banera cookies ani żadnej strony z polityką prywatności.
Wybranym dostawcą zgód jest **CookieYes** (darmowy plan, certyfikowany przez
Google). CookieYes zostanie zainstalowany **po stronie GTM**, jako szablon
z galerii, na triggerze *Consent Initialization* — **nie dodajesz żadnego
skryptu CookieYes do kodu aplikacji**.

Twoje zadanie to cztery rzeczy, które muszą powstać w repo, żeby baner miał
gdzie zadziałać i dokąd odsyłać.

---

## 2. Co trzeba zrobić

### 2.1 CSP — dopuścić domeny CookieYes

Plik: `next.config.mjs`. Jest tam jeden nagłówek `Content-Security-Policy`
budowany ze stałych; zobacz `GOOGLE_HTTPS` jako wzór stylu.

Dopisz domeny CookieYes do `script-src`, `connect-src` oraz, jeśli dokumentacja
tego wymaga, `frame-src`. **Zweryfikuj dokładną listę domen w oficjalnej
dokumentacji CookieYes** — nie zgaduj i nie kopiuj z blogów. Spodziewane są
`cdn-cookieyes.com` i `log.cookieyes.com`, ale potwierdź to u źródła i dopisz
w komentarzu, skąd wzięte.

Zrób to tak jak reszta pliku: osobna, nazwana stała (np. `COOKIEYES_HTTPS`)
z krótkim komentarzem, dołączana do odpowiednich dyrektyw. Nie poszerzaj
polityki o nic ponad to, co jest potrzebne — bez `'unsafe-*'`, bez wildcardów
na cudze domeny.

**Dlaczego to krytyczne:** przy obecnej, restrykcyjnej polityce baner zostanie
zablokowany po cichu. Jedynym śladem będzie `Refused to load the script`
w konsoli.

### 2.2 Odnośnik „Ustawienia cookies" w stopkach

Wymóg prawny: zgodę trzeba móc wycofać w każdej chwili, więc potrzebny jest
trwały odnośnik.

Zrób **jeden współdzielony komponent** (np.
`components/cookie-settings-link.tsx`, `"use client"`), który otwiera panel
preferencji CookieYes, i wstaw go do istniejących stopek. Stopki są dziś
inline w wielu plikach — znajdź je po napisie `NONOISE MEDIA` / `copyright`:

- `app/[locale]/HomeClient.tsx`
- `app/[locale]/about/page.tsx`
- `app/[locale]/contact/page.tsx`
- `app/[locale]/offer/page.tsx`
- `app/[locale]/work/page.tsx`
- `components/home/home-page-footer.tsx`
- `app/[locale]/lp/kampania/page.tsx`
- `app/[locale]/about-old/page.tsx` — **pomiń**, to archiwum poza nawigacją

Wymagania:

- **Zweryfikuj w dokumentacji CookieYes, jak poprawnie otwiera się panel.**
  W obiegu są `window.revisitCkyConsent()` i klasa `.cky-banner-element` na
  elemencie — użyj tego, co dokumentacja podaje jako aktualne.
- **Degraduj się cicho:** jeśli CookieYes nie został załadowany (np. nie ma
  jeszcze konta, GTM nie opublikowany, użytkownik z blokerem), odnośnik ma
  **nie renderować się wcale** albo nic nie robić bez błędu w konsoli. Nie może
  być martwego linku, który wygląda na zepsutą stronę.
- Napis z `next-intl`, nie na sztywno. Dodaj klucz do `messages/pl.json`
  i `messages/en.json` w istniejącej sekcji `footer`
  (`"cookieSettings": "Ustawienia cookies"` / `"Cookie settings"`).
- Styl dopasowany do stopki: ten sam rozmiar, `tracking`, kolor
  `text-muted-foreground`, hover jak w sąsiednich elementach.

### 2.3 Strona polityki prywatności

Nowa trasa: `app/[locale]/privacy/page.tsx` (+ `layout.tsx` z metadanymi, jak
w innych trasach — zobacz `app/[locale]/contact/layout.tsx` jako wzór).

Treść w PL i EN przez `next-intl`. Polityka musi opisywać przynajmniej:

- administratora danych i kontakt (`contact@nonoise.media`, adres z JSON-LD
  w `app/[locale]/layout.tsx`),
- **procesorów:** Resend (wysyłka formularzy), Vercel (hosting, Web Analytics,
  Speed Insights), Google (Tag Manager, Google Ads, Google Analytics),
- podstawy prawne, okresy przechowywania, prawa osób, informację o prawie do
  skargi do PUODO,
- **to, co doszło niedawno i czego nie ma w żadnym starszym tekście:** strona
  zapisuje w `localStorage` identyfikatory kliknięcia reklamy (`gclid`,
  `gbraid`, `wbraid`) i parametry `utm_*` **na 90 dni**, a przy wysłaniu
  formularza przekazuje do Google Ads zahaszowany adres e-mail albo numer
  telefonu w ramach *enhanced conversions*. Bez tego polityka będzie opisywać
  nieaktualny stan. Szczegóły działania: `lib/attribution.ts`,
  `lib/consent.ts`, `lib/lead-source.ts`, `google-ads.md`.

**Oznacz tekst jako projekt do weryfikacji prawnej** — komentarzem w kodzie
i zdaniem w podsumowaniu dla właściciela. Nie udawaj, że to gotowy dokument
prawny; to rzetelny szkic oparty na tym, co realnie robi kod.

Polityka **cookies** jest generowana przez CookieYes i zostanie podlinkowana
później — zostaw na nią miejsce (sekcja z odnośnikiem albo `TODO` w jednym
widocznym miejscu), ale nie wymyślaj jej treści.

### 2.4 Sitemap i podlinkowanie

- Dodaj `/privacy` do `app/sitemap.ts` (tablica `routes`), z niskim priorytetem,
  np. `0.3`, `changeFrequency: 'yearly'`. Zwróć uwagę, że plik sam generuje
  warianty PL i EN — dopisujesz **jeden** wpis.
- Odnośnik do polityki prywatności dodaj w tych samych stopkach co 2.2.

---

## 3. Konwencje repo, których trzeba się trzymać

- **pnpm, nigdy npm.** `pnpm lint`, `pnpm build`.
- **Zero lokalnych mediów.** Żadnych `.mp4` / `.png` / `.jpg` w repo; wszystko
  z `https://assets.nonoise.media`. Ta strona nie potrzebuje żadnych mediów.
- **Tylko tryb ciemny.** Czarne tła, złamana biel, linie `border-white/20`.
- **Layout magazynowy.** `grid-cols-12`, tekst ograniczony `max-w-xs` /
  `max-w-sm` / `max-w-prose`. Nie rób szerokich bloków tekstu na całą szerokość
  ekranu — to zasada projektowa tej strony, nie preferencja.
- **Animacje: Framer Motion**, zawsze `whileInView` z
  `viewport={{ once: true, amount: "some" }}` dla ujawnień przy scrollu. Nie
  używaj natychmiastowego `animate` na elementach startujących poza ekranem.
- Nagłówki: font display (`var(--font-display)`, Bebas Neue), wersaliki.
- Linki wewnętrzne: `Link` z `@/i18n/navigation`, nigdy `next/link`
  bezpośrednio — inaczej rozsypie się prefiks lokalizacji.
- **`localePrefix: 'as-needed'`:** polski jest bez prefiksu (`/privacy`),
  angielski pod `/en/privacy`.
- Rootem jest `app/[locale]/layout.tsx`. **Nie ma `app/layout.tsx`** — nie twórz go.
- Styl kodu: w `lib/` i `components/` bez średników, cudzysłowy podwójne;
  w route'ach API ze średnikami i pojedynczymi. Dopasuj się do sąsiadów.
- Nie dodawaj zależności. To zadanie żadnej nie wymaga.

---

## 4. Czego NIE robić

- Nie dodawaj skryptu CookieYes do kodu — instalacja idzie przez GTM.
- Nie buduj własnego banera cookies. CookieYes dostarcza baner; Ty robisz tylko
  CSP, odnośnik do ustawień i strony prawne.
- Nie zmieniaj `lib/consent.ts`. Czyta już ciasteczko `cookieyes-consent`
  (`advertisement:yes|no`) oraz stan Consent Mode. Weryfikacja wobec realnego
  ciasteczka nastąpi po założeniu konta — **odnotuj to w podsumowaniu jako
  zadanie otwarte**, ale nie zgaduj poprawek.
- Nie zmieniaj sposobu ładowania GTM w `components/deferred-third-parties.tsx`.
  Odroczone ładowanie jest celowe, ze względu na LCP.
- Nie ruszaj niczego związanego z atrybucją reklam ani z route'ami API —
  to świeżo wdrożone i działa na produkcji.

---

## 5. Jak zweryfikować

Obowiązkowo, bo w repo nie ma testów:

1. `pnpm lint` — zero błędów. Jedno ostrzeżenie `no-img-element`
   w `components/lp/lp-services-grid.tsx` jest istniejące i nie jest Twoje.
2. `pnpm build` — musi przejść. **Sprawdź w wyniku, że `/[locale]/privacy`
   jest prerenderowane jako `●` (SSG).** Jeśli wyszło `ƒ` (dynamiczne),
   coś wciągnęło dynamiczne API do strony statycznej — napraw.
3. Uruchom serwer deweloperski i sprawdź w przeglądarce:
   - `/privacy` i `/en/privacy` renderują się, tekst jest w odpowiednim języku,
   - w konsoli nie ma błędów CSP,
   - odnośnik „Ustawienia cookies" jest w stopkach i **nie wywala błędu**,
     mimo że CookieYes nie jest jeszcze zainstalowany (to jest główny przypadek
     brzegowy tego zadania — na dziś CookieYes nigdy nie będzie załadowany),
   - strony wyglądają poprawnie na szerokości telefonu.
4. Zweryfikuj nagłówek CSP lokalnie (`curl -sI localhost:3000/ | grep -i
   content-security`), że domeny CookieYes faktycznie w nim są.

---

## 6. Na koniec

Zatrzymaj się i napisz podsumowanie zawierające:

- listę zmienionych i dodanych plików,
- **dokładne domeny dopisane do CSP i link do dokumentacji, z której pochodzą**,
- **jakiego API CookieYes użyłeś do otwarcia panelu i skąd to wiesz**,
- czego nie dało się zweryfikować bez konta CookieYes,
- wyraźne zdanie, że treść polityki prywatności jest projektem wymagającym
  weryfikacji prawnej,
- gotową propozycję wiadomości commita (Conventional Commits, temat do 72
  znaków) — ale **nie pushuj**.

Następnie czekaj na decyzję właściciela.
