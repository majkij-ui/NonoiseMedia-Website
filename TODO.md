# Plan — Nonoise Media

Stan na 2026-11-20. To jest jedyna aktywna lista zadań. Aktualizujemy ją w miejscu.
Zasady pracy i decyzje, do których nie wracamy: `CLAUDE.md`. Stare listy: `docs/archive/`.

Oznaczenia: **[M]** Michał, **[C]** Claude (kod), **[M+C]** razem.

Kolejność: 1 → 2 → 3 → 4. Punkt 1 blokuje sens wydawania pieniędzy na reklamy, więc idzie pierwszy.

---

## 1. Kampania Google Ads: zero zapytań

### 1.1 Co wiemy (stan 2026-11-20)

Źródła: historia zmian i raporty Google Ads, GA4, opublikowany kontener GTM, Vercel Analytics, Resend, skrzynka (etykieta „Leads"), raport z wiosny, przegląd kodu, pomiary żywej strony w widoku telefonu.

| Okres | Kliknięcia | Koszt | CPC | Zapytania |
|---|---|---|---|---|
| Wiosna, 9.04–7.07 | 438 | ok. 6 798 zł | 15,52 zł | ok. 20 (4,5%) |
| 1–20.10 | 248 | ok. 1 580 zł | ok. 6,40 zł | 6 z formularza (2,4%) |
| 21–26.10 | 72 | ok. 430 zł | ok. 5,90 zł | 0 |
| 27–30.10 | 0 | 0 | — | — (nieopłacone saldo, problem z kartą) |
| 2–20.11 | 137 | 2 057,56 zł | 15,02 zł | 0 |

Co jeszcze jest pewne:

- **Ostatnie prawdziwe zapytanie z formularza przyszło 20.10** (23:01 UTC).
- **Wysyłka maili działa.** Resend za ostatnie 30 dni pokazuje wyłącznie testy, wszystkie ze statusem „Delivered". Czyli nikt prawdziwy nie wysłał formularza.
- **Ludzie dochodzą do formularza.** Vercel Analytics za 30 dni: 319 odwiedzających, `/lp/kampania` 210, `/contact` 63, `/questionnaire` 12. Część z 63 to testy, ale większość to prawdziwi odwiedzający, którzy nie wysłali nic.
- **Baner CookieYes zasłaniał formularz.** Na telefonie miał 460 px (ok. 55% ekranu). Pomiar na żywej stronie: po załadowaniu przechwytywał dotknięcia dokładnie w miejscu przycisku „Wyślij wiadomość". Twój test z telefonu pokazał to samo: przycisk nie reagował, dopóki baner nie został zaakceptowany.
- **Pomiar był ślepy z powodu konfiguracji GTM, nie tylko trybu zgody.** Tagi Google wymagały zgody w chwili ładowania strony i nic ich nie uruchamiało po kliknięciu „Akceptuj". Strona nawiguje bez przeładowania, więc nie ruszały wcale: GA4 widziało 3 sesje z kampanii na 137 kliknięć.
- **Stawka 16 zł** (zmiana w koncie 2.11 o 11:40) odpowiada CPC z udanej kampanii wiosennej. Wycofuję wcześniejszą sugestię, żeby ją obniżać: zostaje.
- **Kod strony:** nie ma w nim ścieżki, która blokuje wysłanie formularza albo maila.

**Wniosek.** To nie jest pech. Przy wiosennej skuteczności 137 kliknięć powinno dać ok. 6 zapytań (szansa na zero: ok. 0,2%), przy październikowej ok. 3 (szansa na zero: ok. 4%). Odwiedzający docierają do formularza i go nie wysyłają, a jedyna zmierzona przeszkoda w tym miejscu to baner.

**Zastrzeżenie.** Susza zaczęła się 21.10, dwanaście dni przed banerem. Te 72 kliknięcia bez zapytania mieszczą się jeszcze w zwykłym rozrzucie (szansa ok. 15–20%). Baner jest najmocniejszym podejrzanym, ale nie jest udowodnione, że jedynym. Rozstrzygnie to tydzień ruchu po wdrożeniu nowego banera (punkt 1.4).

### 1.2 Zrobione 2026-11-20 w kodzie (wdrożone tego samego dnia, PR #12)

- [x] Własny baner cookies zamiast CookieYes: `components/cookie-consent.tsx`, `lib/consent.ts`, `app/api/consent/route.ts`.
  - Wąski pasek na dole, w stylu strony. Zmierzone: 78 px na ekranie 390×664 (12%), 73 px na desktopie. CookieYes: 460 px.
  - Nie jest oknem modalnym ani nakładką. Nie ma stanu „niewidoczny, ale łapie dotknięcia".
  - Przyciski „Odrzuć" i „Akceptuj" obok siebie, „Ustawienia" z dwoma przełącznikami (analityczne, reklamowe).
  - Zgoda trafia do Google przez Consent Mode v2; domyślnie wszystko jest odrzucone, zanim załaduje się GTM.
  - Wybór pamiętany 6 miesięcy, także w Safari (cookie ustawiane dodatkowo odpowiedzią serwera).
  - Po wycofaniu zgody strona usuwa cookies Google ze swojej domeny.
- [x] `/contact`: na telefonie przycisk „Wyślij wiadomość" jest wolny od banera; na desktopie blokada przewijania działa tylko w wysokim oknie, w niskim strona się przewija (wcześniej przycisk bywał ucięty).
- [x] Przyciski reela („Wycisz", „Zamknij") i pływający przycisk kontaktu siedzą nad banerem.
- [x] CookieYes usunięty z CSP i z kodu; stare cookie `cookieyes-consent` jest kasowane.
- [x] Polityka prywatności: sekcja o cookies opisuje nowy baner (PL i EN). Wymaga przeglądu prawnika, jak cała polityka.
- [x] Niepotrzebne cookie `NEXT_LOCALE` wyłączone.
- [x] Poprawki po uwagach Michała (2026-11-20 wieczorem): opis w hero bez „z Warszawy" i bez drugiego „dla firm" (miasto i „dla firm" są już w etykiecie nad hasłem), pasek logo pokazuje wszystkich klientów zamiast sześciu, dolny pasek na telefonie ma „Napisz e-mail" zamiast „Zadzwoń", „Michael MacDonald" w opinii BAKL, w stopce zostaje adres studia w Podolszynie Nowym.
- [x] Lint i build przechodzą. Zmiany przeszły niezależny przegląd w czterech obszarach; potwierdzone uwagi są poprawione.

Znane ograniczenia:

- Na iPhonie (ekran 390×664) baner przy pierwszym wejściu na landing page zostawia widoczny przycisk „Wyceń projekt", ale zasłania „Play reel" pod nim. Znika po jednym dotknięciu albo przewinięciu. Docelowo rozwiązuje to nowy hero (punkt 2, etap B).
- Telefon w poziomie: otwarte menu może mieć ostatnie pozycje pod banerem, dopóki nie zostanie zamknięty.

### 1.3 Wdrożenie — w tej kolejności

- [x] **[C]** Commit, PR #12, wdrożenie na produkcję: 2026-11-20 ok. 18:25. Sprawdzone na żywej stronie: pasek 78 px w szerokości telefonu, przycisk „Wyślij wiadomość" wolny, baner CookieYes się nie pojawia, `/api/consent` ustawia cookie na 180 dni.
- [x] **[C]** GTM, kontener `GTM-PQ7D5LSC`, wersja 16 opublikowana 2026-11-20 o 18:37 (na prośbę Michała, przez jego przeglądarkę):
  1. Tag „CookieYes CMP" wstrzymany (nie usunięty, da się go przywrócić).
  2. „Google Tag", „Google Anal" (GA4), „Conversion Linker" oraz cztery tagi konwersji („Send a Message", „Click send Questionnaire", „Click on email", „Click on Phone"): dodatkowa zgoda zmieniona z „wymagana" na „nie jest wymagana" (tryb zaawansowany). Tag „Page View Trigger" zostaje wstrzymany, bez zmian.
- [x] **[C]** Sprawdzone na żywej stronie po publikacji, w szerokości telefonu:
  - przed wyborem w banerze tagi Google ładują się i wysyłają sygnały bez cookies (`gcs=G100`), żadne cookie Google nie jest zapisane, CookieYes nie wysyła niczego;
  - po „Akceptuj", na tej samej stronie i bez przeładowania: sygnały ze zgodą (`gcs=G111`), zapisane `_ga`, `_ga_JHHX635GZP`, `_gcl_au` i `_gcl_aw` (kliknięcie reklamy zapamiętane przez Conversion Linker).
- [ ] **[M]** Własny test na telefonie: zwykłe okno, `www.nonoise.media/lp/kampania`, wysłanie wiadomości testowej bez klikania banera. Tego nie dało się sprawdzić zdalnie.
- [ ] **[M]** Przed zamknięciem konta CookieYes wyeksportuj z panelu log zgód za 2–20.11 (dowód zgód z tego okresu).

### 1.4 Jak sprawdzimy, czy pomogło

- Miernik: wysłane formularze na odwiedzających `/contact` (Resend + Vercel Analytics). Punkt wyjścia: 0 na ok. 63.
- Przy 2–4,5% skuteczności pierwsze 50–80 kliknięć powinno dać 1–3 zapytania.
- Jeśli po ok. 150 kliknięciach z nowym banerem nadal jest zero, przyczyna leży gdzie indziej (landing page albo ruch) i etap A z punktu 2 staje się pilny.
- Decyzja o budżecie i ewentualnej pauzie: po weekendzie, na podstawie pierwszych dni.

### 1.5 Kampania — **[M]**, w Google Ads

- [ ] Zawęzić lokalizację: Warszawa i okolice, opcja „obecność", nie „obecność lub zainteresowanie". W październiku Warszawa dawała ok. 26% płatnych sesji.
- [ ] Przejrzeć udział czterech ogólnych fraz („produkcja wideo", „spoty reklamowe", „filmy reklamowe", „agencja wideo"): 73% kliknięć. Raport z wiosny wskazywał „agencja wideo" jako najlepszą, a „spoty reklamowe" jako najsłabszą.
- [ ] Dopisać pozostałe nazwy konkurencji do wykluczeń.
- [ ] Podać teksty reklamy (nagłówki i opisy): potrzebne, żeby nagłówek landing page odpowiadał obietnicy z reklamy.

### 1.6 Pomiar — stan po sprawdzeniu w GTM 2026-11-20

Lista „zaległych" zmian z audytu 31.10 była nieaktualna. Te ustawienia są w kontenerze od 1–2.11, sprawdzone w interfejsie GTM:

- [x] Wyzwalacz „Click Tel" to zdarzenie niestandardowe `phone_click`.
- [x] Tagi „Send a Message" i „Click send Questionnaire" mają ID transakcji `{{DLV - transaction_id}}` i parametr `user_data` ze zmiennej „UPD - lead contact" (dane przekazywane przez użytkownika, źródło: `user_data` z dataLayer).
- [x] Wyzwalacze tych tagów nasłuchują na `contact_form_success` i `questionnaire_success`, a etykiety konwersji zgadzają się z akcjami „Lead: contact form" i „Lead: questionnaire" w Google Ads.

Zostaje po stronie Google Ads (nie GTM), niesprawdzone, bo limit API jest wyczerpany do 1.12:

- [ ] **[M]** Czy konwersje rozszerzone są włączone i warunki dotyczące danych klientów zaakceptowane (Cele → Ustawienia). Bez tego Google ignoruje `user_data` z tagów.
- [ ] **[M]** Cel „Page views" na poziomie konta. Przy ręcznym CPC nie ma wpływu na nic; wyłączyć przed przejściem na strategię opartą na konwersjach.
- [ ] **[M]** Po pierwszym prawdziwym lub testowym formularzu: czy konwersja „Lead: contact form" pojawia się w Ads.

### 1.7 Kod — pozostałe — **[C]**

- [ ] Trwały zapis każdej wysyłki formularza (lead ID, czas, status). Vercel trzyma logi 1 godzinę, więc dziś nie da się sprawdzić po fakcie, czy ktoś próbował wysłać i dostał błąd.
- [x] Zdarzenie GTM na przycisku „Wyceń projekt" w hero: `lp_quote_click` (etap A).
- [x] Pola formularza: czcionka 16 px na telefonie i `autocomplete` w obu formularzach; widoczne etykiety w formularzu na LP (etap A). Na `/contact` zostały same podpowiedzi w polach, żeby nie zmieniać układu strony.

### 1.8 Do decyzji Michała i prawnika

- Źródło wizyty (gclid) jest zapisywane w pamięci sesji przed wyborem w banerze i zostaje tam także po „Odrzuć"; trafia do maila z dopiskiem „zgoda: denied". Tak było już wcześniej i polityka to opisuje, ale prawnik powinien ocenić, czy to do utrzymania. Zmiana kosztowałaby atrybucję zapytań od osób, które nie klikną banera.
- Baner nie prowadzi rejestru zgód po stronie serwera (CookieYes prowadził). Dowodem jest wersjonowany kod i stan zgody w mailu z zapytaniem.
- Pierwsza warstwa banera to jedno zdanie z linkiem do polityki i ustawień. Krótko, żeby baner był mały; prawnik może chcieć dopisać „Google".
- Linijka pod formularzem na LP mówi tylko o odpowiedzi na zapytanie i odsyła do polityki. To samo wysłanie zasila też pomiar reklam (opisany w polityce). Prawnik może chcieć to dopisać wprost.
- Polityka prywatności nadal ma status szkicu do przeglądu.

---

## 2. Landing page `/lp/kampania`: przebudowa na samowystarczalny one-page

### 2.1 Ocena obecnej strony: ok. 40/100

Dwa niezależne audyty według tej samej punktacji (100 = hipotetycznie idealny landing page dla tego biznesu) dały 38 i 41.

| Kryterium | Punkty | Główny powód |
|---|---|---|
| Zgodność z reklamą | 3/10 | Nagłówek „Wybij się ponad szum" nie mówi, co i gdzie sprzedajesz. Tytuł karty: „Kampania" |
| Pierwszy ekran | 4/12 | Na telefonie tekst zajmuje tylko prawą połowę, dwa równorzędne przyciski, zero dowodu |
| Droga do kontaktu | 3/12 | Brak formularza. Oba przyciski wyprowadzają na `/contact`, gdzie jest pięć opcji do wyboru |
| Tarcie formularza | 5/8 | Trzy pola, ale bez telefonu, bez etykiet, bez obietnicy czasu odpowiedzi |
| Stały przycisk i kontakt jednym kliknięciem | 1/8 | Brak. Pływający przycisk działa tylko na `/work`, `/offer`, `/about` |
| Dowód społeczny | 5/10 | Dobre opinie i loga, ale dopiero w piątej sekcji; pięć pełnoekranowych slajdów |
| Pokazanie realizacji | 6/8 | Sześć miniatur z odtwarzaniem. Link „Więcej w portfolio" wyprowadza ze strony |
| Ceny | 3/6 | Abonamentowe progi, których nie sprzedajesz |
| Nawigacja i wyjścia | 1–2/5 | Menu, logo do strony głównej, przełącznik języka |
| Wydajność mobilna | 2–3/8 | Reel ładuje się od razu, bez plakatu |
| Zaufanie i prawo | 3/6 | Brak danych firmy; baner zasłania hero |
| FAQ | 0/3 | Brak |
| Pomiar | 2–3/4 | Zdarzenia sukcesu są dobre; klik w hero niemierzony |

### 2.2 Twoje pomysły — werdykt

- **Formularz na stronie zamiast odsyłania do `/contact`:** tak, to największa pojedyncza poprawa. Robimy pierwsze.
- **Stały przycisk kontaktu:** tak. Na telefonie dolny pasek z dwiema akcjami: „Zadzwoń" i „Wyceń projekt" (przewija do formularza). Ukryty, gdy formularz jest na ekranie i dopóki widać baner cookies.
- **Usunięcie trzech progów cenowych:** tak. Ale nie usuwać cen w ogóle. Cena „od" odsiewa słabe zapytania, a to był problem ruchu. Zamiast progów: 2–3 typowe scenariusze z Twoimi prawdziwymi kwotami, tuż nad formularzem.
- **Kafelki oferty rozwijane w duży panel:** tak na desktopie (kafelek rośnie w panel wielkości całej siatki, tą samą animacją co miniatury realizacji). Na telefonie siatka ma jedną kolumnę i ok. 2 500 px, więc panel „wielkości siatki" nie ma sensu: tam kafelek rozwija się w miejscu. Uwaga: mamy 9 usług i 6 filmów, a LinkedIn, case study i wywiady nie mają przykładu. Albo dochodzą nowe realizacje (punkt 3), albo zostaje 5–6 kafelków.

### 2.3 Czego nie wymieniłeś, a ma znaczenie

- Nagłówek musi nazwać usługę i miasto. „Wybij się ponad szum" zostaje jako hasło nad nim.
- Telefon i mail widoczne na stronie (dziś nie ma ich wcale).
- Loga klientów od razu pod hero, nie w piątej sekcji.
- Trzy zwykłe karty opinii zamiast pięciu pełnoekranowych slajdów. Jedna opinia jest po angielsku i ma literówkę w imieniu („Micheal").
- Sekcja „Jak pracujemy" pokazuje fikcyjny interfejs („Publikuj harmonogram"). Zamienić na trzy proste kroki z typowym czasem realizacji.
- FAQ: proces, terminy, prawa do materiału, poprawki, budżet.
- Nagłówek strony bez menu, bez przełącznika języka, logo nieklikalne.
- Plakat (kadr z R2) jako pierwszy obraz hero, reel startuje po nim. To zmiana sposobu dostarczenia, bez kompresji reela.
- Dane firmy w stopce. Polityka prywatności podaje adres w Kielcach, `/contact` w Podolszynie Nowym; reklama obiecuje Warszawę.
- Tło z Unsplash w dwóch sekcjach łamie zasadę „media tylko z R2".

### 2.4 Kolejność prac — **[C]**, każdy etap osobnym PR

**Etap A: droga do kontaktu** — wdrożone na produkcję 2026-11-21 (PR #13)
- [x] Formularz wydzielony z `/contact` do wspólnego komponentu `components/lead-form.tsx`. Lead ID, atrybucja, zgoda i zdarzenie `contact_form_success` bez zmian; zdarzenie niesie teraz `form_location`.
- [x] Sekcja formularza na dole LP (`components/lp/lp-lead-section.tsx`): firma lub imię, e-mail (wymagany), telefon (opcjonalny), wiadomość. Obok numer telefonu i mail, pod spodem linijka o prywatności. Na telefonie formularz jest przed danymi kontaktowymi.
- [x] Wszystkie przyciski na LP przewijają do formularza: „Wyceń projekt" w hero (teraz mierzony zdarzeniem `lp_quote_click`), „Wyceń podobny projekt" pod realizacjami, dolny pasek.
- [x] Dolny pasek na telefonie („Zadzwoń" / „Wyceń projekt"; od etapu B „Napisz e-mail" / „Wyceń projekt"). Schowany na pierwszym ekranie, przy formularzu, podczas odtwarzania reela i dopóki baner cookies czeka na odpowiedź.
- [x] Usunięte z LP: progi cenowe, sekcja filozofii, link „Więcej w portfolio" (w etapie B wrócił jako „Zobacz pełne portfolio" w nowej karcie).
- [x] Nagłówek LP bez menu i przełącznika języka: logo (nieklikalne) i kontakt (od etapu B e-mail zamiast telefonu).
- [x] Tytuł karty: „Produkcja filmowa i wideo dla firm — wycena projektu" zamiast „Kampania".

Świadomie odłożone:
- Obietnica czasu odpowiedzi przy formularzu: czeka na Twoją odpowiedź w punkcie 2.5. Do tego czasu jest neutralne „Odezwiemy się najszybciej jak to możliwe".
- Angielska wersja formularza: teksty pól i komunikatów są po polsku, tak jak wcześniej na `/contact`. Do zrobienia razem z nowym hero (etap B) albo przy decyzji o EN.

**Uwagi Michała po etapie A (2026-11-20)** — rozstrzygnięte tego samego dnia
- [x] Wyjście na resztę strony: bez menu w nagłówku; pod realizacjami link „Zobacz pełne portfolio", który otwiera `/work` w nowej karcie (zdarzenie `lp_portfolio_link_click`). Landing page z formularzem zostaje w otwartej karcie.
- [x] Nagłówek: e-mail zamiast telefonu (decyzja Michała: ludzie piszą, prawie nikt nie dzwoni). Na desktopie adres tekstem, na telefonie ikona koperty.

**Etap B: pierwszy ekran i dowód** — wdrożone na produkcję 2026-11-21 (PR #13)
- [x] Nowy hero: etykieta „Produkcja filmowa i wideo dla firm · Warszawa", hasło „Wybij się ponad szum", jedno-dwa zdania o studiu, linijka dowodu („Zaufali nam m.in.: Tchibo · PHH · Danone · CIONET"), główny przycisk „Wyceń projekt" od razu pod tekstem, „Play reel" jako cichy link. Na telefonie pełna szerokość; wszystko mieści się na pierwszym ekranie (390×664).
- [x] Plakat pod reelem jako pierwszy obraz, reel przenika na niego po załadowaniu. Bez kompresji reela, wejście z przenikaniem zostaje. Plakat to istniejący kadr PHH (`videos/PHH.webp`).
- [x] Pasek logo pod hero (wszyscy klienci, Tchibo jako pierwsze). Trzy nowe loga — Tchibo, JHJ, Morris & Lloyd Broker — doszły też na `/work` i `/about`.
- [x] Trzy statyczne opinie na LP zamiast pełnoekranowych slajdów. Opinie mają teraz jedno źródło: `lib/testimonials.ts` (używa go też `/about`).
- [x] Miejsce na szkic opinii Morris & Lloyd z oznaczeniem „Szkic · czeka na zgodę autorki". Sam tekst szkicu nie jest w repozytorium (jest publiczne): siedzi w zmiennej `DRAFT_TESTIMONIALS` w pliku `.env.local`, opis w `lib/testimonials.ts`. Widać go tylko lokalnie i, po dodaniu zmiennej w Vercel dla środowiska Preview, na podglądach; w buildzie produkcyjnym nie ma go ani na stronie, ani w kodzie JS (sprawdzone). Na produkcji LP pokazuje CIONET, OmniOffice i PHH.
- [x] Trzy kroki procesu (teksty z kart na `/about`, bez animowanego interfejsu).
- [x] Dane firmy w stopce LP: nazwa z rejestru, adres studia, NIP.
- [x] Lint i build przechodzą. Zmiany przeszły niezależny przegląd w czterech obszarach; potwierdzone uwagi poprawione: szkic opinii poza repozytorium, hero na telefonie trzymanym poziomo (przycisk „Wyceń projekt" znów na pierwszym ekranie), kontrast drobnego tekstu w stopce i przy opiniach.

- [x] Trzy nowe loga wgrane na R2 (2026-11-20, przez panel Cloudflare): `logos/tchibo-logo.png`, `logos/jhj-logo.png`, `logos/morris-lloyd-logo.png`. Sprawdzone pod adresem CDN: odpowiedź 200, pliki identyczne z lokalnymi. Nazwy z końcówką `-logo`, bo adresy bez niej zostały zapytane, zanim pliki istniały, i CDN zapamiętał dla nich „404" na rok. W buckecie leżą też nieużywane kopie pod starymi nazwami (`tchibo.png`, `jhj.png`, `morris-lloyd.png`); można je usunąć.

- [x] Wdrożenie 2026-11-21 ok. 08:20, sprawdzone na żywej stronie w szerokości telefonu: nowy hero z przyciskiem „Wyceń projekt" na pierwszym ekranie, 16 logo (żadne nie jest puste), opinie CIONET / OmniOffice / PHH, kroki procesu, formularz, stopka z danymi firmy, strona nadal `noindex`. Szkicu opinii nie ma ani w HTML, ani w plikach JS. `/`, `/work`, `/about`, `/contact` odpowiadają poprawnie.
- [ ] **[M]** Nie sprawdzone po wdrożeniu: prawdziwa wysyłka z nowego formularza na LP (mail przez Resend i konwersja w Google Ads). Najlepiej z telefonu, w zwykłym oknie.

Otwarte po etapie B:
- [ ] **[M]** Zgoda autorki opinii Morris & Lloyd na cytat (treść, imię i nazwisko, stanowisko, firma) i jej stanowisko (w szkicu jest robocze „Marketing"). Po zgodzie: przenieść wpis z `.env.local` do zatwierdzonych w `lib/testimonials.ts`.
- [ ] **[M]** Repozytorium na GitHubie jest publiczne. Wcześniejsza wersja tego pliku (commit `3e48154`) wymienia autorkę opinii z nazwiska; zostaje to w historii, dopóki repozytorium nie będzie prywatne albo historia gałęzi nie zostanie przepisana.
- [ ] **[M]** Zgody klientów na loga: Michał świadomie pominął (Tchibo, JHJ, Morris & Lloyd); zdejmie logo, jeśli ktoś zgłosi zastrzeżenie.
- [ ] **[M]** Typowe czasy do kroków procesu. Potrzebne trzy liczby: (1) ile trwa od pierwszego kontaktu do wyceny i ustalonego planu, (2) ile zwykle trwają zdjęcia, (3) ile od zdjęć do pierwszej wersji montażu i ile rund poprawek jest w cenie. Wystarczą widełki dla typowego projektu.
- [ ] **[M]** Plakat hero: zostaje kadr PHH czy konkretna klatka reela? Klatkę trzeba wyeksportować i wgrać na R2 pod nową nazwą.
- [ ] Angielska wersja formularza i komunikatów (nadal po polsku).

**Etap C: oferta i obiekcje** — wdrożone na produkcję 2026-11-21 (PR #14)
- [x] Sześć rozwijanych kafelków z cenami (`components/lp/lp-services-grid.tsx`, dane w `lib/lp-services.ts`, teksty w `messages/*.json`). Na desktopie biała płyta kafelka rozrasta się na całą siatkę, ciemna kurtyna wjeżdża od dołu, treść pojawia się linia po linii; zamknięcie zwija płytę z powrotem. Na telefonie kafelek rozwija się w miejscu. W panelu: zakres, cena, realizacje do odtworzenia i przycisk „Wyceń ten format".
- [x] „Wyceń ten format" przewija do formularza i zaznacza usługę w nowym polu „Czego potrzebujesz? (opcjonalnie)". Usługa trafia do maila i do zdarzenia konwersji (`lead_service`).
- [x] Realizacje w kafelkach: JHJ i PHH (korporacyjny), Rondo i OmniOffice (reklamowy), trzy rolki Morris & Lloyd (rolki premium), dwa wywiady CIONET (podcasty), CIONET i Kunzek (eventowy). Nowe pliki leżą na R2 w `videos/lp/`; miniatury (`*-poster.webp`) wycięte z filmów i wgrane 2026-11-21. Wideo AI na razie bez przykładu.
- [x] Ceny są na kafelkach, więc osobnego bloku „scenariusze cenowe" nad formularzem nie ma.
- [x] FAQ: siedem pytań (`components/lp/lp-faq.tsx`).
- [x] Kroki procesu z czasami i obietnica „Odpowiadamy w ciągu 24 godzin w dni robocze" przy formularzu oraz w komunikacie po wysłaniu (także na `/contact`).
- [x] Usunięte tło z Unsplash w sekcji oferty (zasada „media tylko z R2").
- [x] Nowe zdarzenia: `lp_service_open`, `lp_service_video_play`, `lp_service_quote_click`, `lp_faq_open` (opis w `docs/google-ads.md`).
- [x] Teksty kafelków po uwagach Michała (2026-11-21): korporacyjny bez sztywnego „1–3 dni zdjęciowe" (skala dobierana do efektu, budżetu i czasu klienta) i z plikami pod miejsce emisji (LED, telewizor, projektor); reklamowy z castingiem i dronami FPV; rolki jako „nawet 10 rolek premium w jeden dzień", z dopiskiem, że inne pakiety wyceniamy indywidualnie.
- [x] Lint i build przechodzą; sprawdzone w Chrome na 390, 800, 1024, 1280 i 1440 px; niezależny przegląd w czterech obszarach, potwierdzone uwagi poprawione.
- [x] Wdrożenie 2026-11-21 ok. 14:20, sprawdzone na żywej stronie: sześć kafelków z cenami, panel otwiera się i mieści, miniatury i filmy ładują się z R2, FAQ, pole usługi w formularzu, obietnice czasowe; szkicu opinii nie ma w HTML ani w JS.
- [x] Link do kwestionariusza pod formularzem na LP (PR #15, wdrożony 2026-11-21 ok. 14:45, sprawdzony na żywej stronie): dwóch z największych klientów z reklam zaczęło od kwestionariusza, a po etapie A landing page do niego nie prowadził. Otwiera `/questionnaire` w nowej karcie, zdarzenie `lp_questionnaire_click`.
- [x] Pomiar szybkości 2026-11-21 (PageSpeed Insights, test laboratoryjny; danych od prawdziwych użytkowników Google nie ma, bo ruch jest za mały):

  | Strona | Wynik | FCP | LCP | TBT | CLS |
  |---|---|---|---|---|---|
  | `/lp/kampania`, telefon | 70 | 1,7 s | 11,4 s | 40 ms | 0 |
  | `/lp/kampania`, desktop | 88 | 0,5 s | 2,3 s | 20 ms | 0 |
  | strona główna, telefon | 73 | 1,7 s | 7,4 s | 140 ms | 0 |

  Największym elementem pierwszego ekranu (LCP) jest plakat hero (`videos/PHH.webp`, 110 KB, ładowany z wyprzedzeniem). W zwykłym Chrome na szybkim łączu pojawia się po 0,4 s. Wynik 11,4 s to symulacja wolnej sieci 4G, w której plakat, skrypty i obrazki pod hero dzielą łącze z reelem 53 MB pobieranym od pierwszej chwili. Stabilność układu i responsywność są bardzo dobre.
- [x] Reel po plakacie: zgoda Michała 2026-11-22, zrobione na LP i na stronie głównej (patrz punkt 5).
- [ ] Odchudzić loga pod hero: kilka plików PNG ma 2 000–3 500 px szerokości i 55–190 KB przy wyświetlaniu na ok. 150 px (nowe nazwy plików). Mały zysk, zero ryzyka.
- [ ] Prawdziwe czasy ładowania u odwiedzających: Vercel → projekt → Speed Insights (pakiet jest zainstalowany na stronie).
- [ ] Reklama AI do kafelka „Wideo AI", gdy będzie gotowa.
- [ ] **[M]** Dwie rolki (`morris-lloyd-rolka1B.mp4`, `morris-lloyd-rolka2B.mp4`) nie mają optymalizacji pod sieć: indeks pliku leży na końcu, więc film startuje z opóźnieniem. Wyeksportować ponownie z opcją „Network optimization" i wgrać pod nowymi nazwami; potem podmienić dwie linie w `lib/lp-services.ts`.

Ocena według tej samej punktacji: przed zmianami 31,5–35/100, po etapie A 49,5–57/100, **po etapach B i C (2026-11-21) 63,5–71,5/100** (surowy i życzliwy audytor, lekki model, na podstawie pomiarów z żywej strony).

Gdzie zostały punkty po etapie C:

| Kryterium | Wynik | Czego brakuje |
|---|---|---|
| Zgodność z reklamą | 4–5/10 | Teksty reklam nigdy nie zostały porównane ze stroną; nagłówek to hasło, usługa jest w małej etykiecie |
| Wydajność mobilna | 2,5–3/8 | Brak pomiaru LCP i INP po przebudowie; reel 53 MB zostaje (decyzja właściciela) |
| Dowód społeczny | 5–6,5/10 | Brak liczb i mierzalnych wyników, brak twarzy; opinia Morris & Lloyd czeka na zgodę |
| Stały przycisk i kontakt jednym kliknięciem | 4,5–5,5/8 | Brak „zadzwoń" w dolnym pasku (decyzja właściciela), brak stałego przycisku na desktopie |
| Pomiar | 2,5–3/4 | Brak potwierdzonej testowej konwersji w Google Ads po zmianach; import offline niezbudowany |

Pozostałe kryteria są blisko maksimum: droga do kontaktu 10,5–11/12, pierwszy ekran 8–8,5/12, formularz 6–6,5/8, realizacje 5,5–6/8, ceny 4,5–5/6, nawigacja 3,5–4/5, zaufanie 4,5–5/6, FAQ 2,5/3.

Docelowa kolejność sekcji: nagłówek → hero → loga → realizacje → oferta → opinie → proces → ceny → FAQ → formularz → stopka.

### 2.5 Etap C: co jest ustalone, a czego brakuje (stan 2026-11-21)

Źródła: analiza czasów i cen z huba biznesowego (plik `ANALIZA-2026-CZASY-I-CENNIK.md` w repozytorium QuoteGen, poza tym repo) oraz przegląd pierwszych wiadomości od klientów i zapytań z formularza z 2026 r. Kwot poszczególnych klientów tu nie wpisujemy: repozytorium jest publiczne.

**O co pytają klienci w pierwszym kontakcie** (kolejność według częstości):
1. Orientacyjny koszt i widełki.
2. Co obejmuje wycena; prośby o rozbicie na pozycje (koncepcja, zdjęcia, montaż, dojazd).
3. Czy scenariusz albo pomoc przy scenariuszu jest w cenie.
4. Terminy: dostępność w konkretnym dniu, harmonogram, kiedy pierwsza wersja.
5. Prawa do filmu, licencja na muzykę.
6. Ile rund poprawek jest w cenie.
7. Sprzęt i ekipa: dron, prompter, oświetlenie.
8. Zdjęcia poza Warszawą, dojazd i nocleg.
9. Umowa (wzór do edycji, NDA).
10. Wersje na social media, napisy, surowe materiały.

Część zapytań z reklam to prace spoza oferty (sam montaż cudzego materiału, pojedyncze drobne zlecenia). FAQ i kwoty „od" mają je odsiewać.

**Obietnice czasowe — zatwierdzone przez Michała 2026-11-21:**
- [x] Odpowiedź: „w ciągu 24 godzin w dni robocze".
- [x] Wycena: „orientacyjne widełki w pierwszej odpowiedzi, szczegółowa wycena w 1–3 dni robocze po rozmowie".
- [x] Pierwsza wersja montażu: „do 10 dni roboczych od zdjęć".
- [x] Tryb przyspieszony: „5 dni roboczych, po potwierdzeniu terminu", dopłata od 800 zł netto; punkt wyjścia to ok. 10% wartości projektu, przy większych projektach liczyć procentowo.
- [x] Start zdjęć: „zwykle 2–3 tygodnie od zapytania, pilne terminy od ok. tygodnia".
- [x] Dwie rundy poprawek w standardzie.

**Kafelki oferty — zatwierdzone przez Michała 2026-11-21:** sześć zamiast dziewięciu.

| # | Kafelek | Cena na kafelku (netto) | Realizacja w panelu | Plik na R2 |
|---|---|---|---|---|
| 1 | Film korporacyjny i wizerunkowy | od 20 000 zł | JHJ (film na 25-lecie), PHH | są |
| 2 | Film reklamowy | od 15 000 zł | Rondo IOON, OmniOffice; Stylbud opcjonalnie | Rondo i OmniOffice są |
| 3 | Wideo AI | wycena indywidualna (bez ceny do pierwszej realizacji) | reklama spekulatywna w przygotowaniu | brak |
| 4 | Rolki premium do social mediów | pakiet 10 rolek od 10 000 zł | Morris & Lloyd (piony) | są (dwie rolki do ponownego eksportu z optymalizacją pod sieć, patrz Etap C) |
| 5 | Podcasty i wywiady na 3 kamery | jedna sesja nagraniowa, do 3 odcinków po 30 min, postprodukcja — od 5 000 zł | dwa wywiady CIONET | są |
| 6 | Reportaż eventowy | od 4 000 zł (1 operator, do 4 godzin, aftermovie do 2 minut) | CIONET i Kunzek (obecne); później Tchibo albo nowszy CIONET | są |

Znikają osobne kafelki: film wizerunkowy (łączy się z korporacyjnym, ta sama cena), filmy produktowe (Rondo przechodzi do reklamowego), wideo na LinkedIn, video case studies, wywiady eksperckie (łączą się z podcastami). Bez osobnego progu „kampania dla małych firm od 10 000 zł".

Wyniki researchu cen (2026-11-21, opublikowane cenniki polskich studiów; liczby są orientacyjne):
- Film korporacyjny: research dotyczył progu 25 000 zł (wysoko jako próg, typowo jako cena warszawskiego projektu). Michał obniżył próg do 20 000 zł.
- Film reklamowy od 15 000 zł i reportaż od 4 000 zł: typowe. Przy reportażu podać zakres (1 operator, ok. 4 godziny, jeden film).
- 10 rolek od 10 000 zł: ok. dwa razy powyżej opublikowanych pakietów. Do obrony tylko jako produkt premium — kafelek musi wymienić, co jest w cenie (scenariusze, światło i dźwięk, napisy, licencja na muzykę, dwie rundy poprawek).
- Podcast: research dotyczył progu 8 000 zł za 5 odcinków (mieści się w rynku). Michał uznał 8 000 zł za zaporowe i obniżył próg do 5 000 zł (2026-11-21); zakres progu zmniejszony do 3 odcinków po 30 min w jednej sesji, bo tyle odpowiada dotychczasowej praktyce. **Do powrotu:** sprawdzić po pierwszych zapytaniach, czy 5 000 zł za 3 odcinki się spina i czy wracać do pakietu 5 odcinków. Nadal otwarte: napisy do całych odcinków i piony jako osobno wyceniane dodatki albo mała stała liczba w cenie (na kafelku: „rolki z odcinków jako opcja").
- Wideo AI od 20 000 zł: powyżej wszystkich opublikowanych polskich cen startowych (800–9 000 zł). Bez własnego przykładu trudne do obrony; rozważyć „od 15 000 zł" albo brak ceny do czasu pierwszej realizacji.

**FAQ — ustalenia:**
- [x] Co jest w cenie: kompleksowo — koncepcja, scenariusz, zdjęcia, montaż, muzyka z licencją, napisy, wersje pionowe, efekty AI; dokładny zakres zawsze w wycenie.
- [x] Poprawki: dwie rundy w standardzie.
- [x] Dojazd: realizacje w całej Polsce i za granicą; dojazd i nocleg ujęte w wycenie.
- [x] Sam montaż: niechętnie, nie reklamujemy. FAQ o tym nie wspomina.
- [x] Prawa do filmu: tekst jest na stronie; Michał potwierdził 2026-11-21, że temat ma załatwiony. Propozycja Michała: licencja niewyłączna w standardzie, pełne przeniesienie praw od 15% wartości projektu. Wynik researchu: zgodne z prawem (art. 65 i 67 ustawy o prawie autorskim), ale „15%" to własna cena studia, nie norma branżowa — żadne studio wideo nie publikuje takiej stawki. Dwa haczyki: (1) przeniesienie praw i licencja wyłączna są nieważne bez podpisanej umowy na piśmie (art. 53, art. 67 ust. 5); (2) licencja, której warunków nikt nie spisał, obejmuje tylko wymienione pola eksploatacji, 5 lat i Polskę, bez prawa do przeróbek (art. 41, 66, 46, 49). Warunki licencji trzeba więc wpisać do wyceny akceptowanej mailem. Jak to zapisać w hubie i w PDF z wyceną: `docs/licencja-w-wycenie.md`.
- [x] Umowa i rozliczenie. Tekst na stronie: praca na podstawie zaakceptowanej wyceny z zakresem i warunkami; umowa (nasz wzór albo klienta) i NDA na życzenie; faktura po oddaniu materiału. Bez publicznej obietnicy „bez zaliczki".

**Nadal potrzebne od Michała:**
- [x] Pliki wideo wgrane przez Michała 2026-11-21 (H.264, 1080p, ok. 8–10 Mb/s). Na przyszłość ten sam eksport: MP4, H.264 High, 1920×1080 (rolki 1080×1920), 25 kl./s, 8–10 Mb/s, AAC 192 kb/s, optymalizacja pod sieć; panel Cloudflare przyjmuje pliki do 300 MB.
- [ ] Jedna realizacja z mierzalnym wynikiem, jeśli jest.
- [x] Tekst reklamy (zrzut z wyszukiwarki, 2026-11-21): nagłówek „Produkcja Filmowa B2B - Filmy Korporacyjne - Wid…"; opis: filmy korporacyjne i spoty reklamowe B2B, „kinowa jakość, która napędza sprzedaż", „od A do Z", „transparentne koszty", „darmowa wycena B2B". Linki do podstron: Oferta, Kontakt, O Nas, Portfolio; przycisk „Call us".
- [ ] Do decyzji: dopasować etykietę nad hasłem i przycisk do reklamy („B2B", „filmy korporacyjne", „bezpłatna wycena").
- [ ] **[M]** W Google Ads (Kampanie → Zasoby): linki do podstron prowadzą na zwykłe strony serwisu, z pominięciem landing page'a (a `/offer` podaje inne ceny); w opisie reklamy jest podwójna kropka po „Social Media"; obrazek przy reklamie ma oznaczenie „AI", czyli wygenerował go Google — lepiej wgrać własny kadr.

---

## 3. Portfolio: realizacje z 2026

Strona nie była aktualizowana od marca. Nowa realizacja to jeden wpis w `lib/projects.ts`; siatka, modal, dane strukturalne i LP biorą ją automatycznie.

- [ ] **[M]** Film wizerunkowy dla JHJ jako pełna realizacja. Na każdą realizację potrzebuję: plik wideo, miniatura, 7–9 kadrów zza kulis, klient, tytuł, typ filmu, wyzwanie i rozwiązanie (2–3 zdania każde), miesiąc publikacji, zgoda klienta na publikację.
- [ ] **[M]** Lista pozostałych zleceń z 2026 wartych pokazania, w kolejności ważności.
- [ ] **[C]** Dodać wpisy. Nowe pliki na R2 zawsze pod nowymi nazwami (pamięć podręczna na rok).
- [ ] **[M+C]** Rolki. Propozycja: zacząć od sekcji pionowych wideo na istniejącej stronie `/offer/wideo-social-media` i od bloku „Rolki" na `/work`. Osobna podstrona dopiero, gdy będzie 8–12 sztuk. Rolki sportowe jako osobna grupa. Potrzebne pliki 9:16 i miniatury.
- [ ] **[M+C]** Opcjonalnie po zebraniu materiału: osobna kampania lub grupa reklam na rolki, kierująca na tę stronę.
- [ ] **[M]** Opcjonalnie: nowy reel z ujęciami z JHJ. Nowa nazwa pliku, bez kompresji.

---

## 4. About: nowa siatka zdjęć

Dziś 30 małych kadrów (6 kolumn × 5 rzędów) z mniejszych produkcji.

- [ ] **[M]** Wybrać zdjęcia zza kulis z większych produkcji.
- [ ] **[M+C]** Decyzja o układzie. Propozycja: mniej, większych kadrów (np. 12 w układzie 3×4 albo 15 w 3×5), żeby dało się zobaczyć, co na nich jest.
- [ ] **[C]** Podmienić siatkę w `components/about/about-hero.tsx` (używa jej tylko `/about`). Pliki WebP pod nowymi nazwami.

---

## 5. Następny duży krok: przebudowa reszty strony

Pomysł Michała z 2026-11-21. Pierwszy krok wdrożony na produkcję 2026-11-22 (PR #16, sprawdzony na żywych stronach): reszta strony korzysta z tych samych elementów co landing page, żeby nie było dwóch wersji prawdy.

Zrobione w pierwszym kroku:
- [x] `/offer`: zamiast dziewięciu starych kafelków ta sama siatka sześciu kafelków z cenami co na LP (ten sam komponent). „Wyceń ten format" prowadzi do `/contact` z wybranym formatem w formularzu. Pod siatką linki tekstowe do dziewięciu podstron usług, żeby nie zostały bez dojścia. Trzy progi „Wybierz formę współpracy" zostają na razie bez zmian (decyzja Michała).
- [x] `/about`: pasek logo, proces z czasami i opinie w wersji z LP (te same komponenty; na `/about` wszystkie opinie, nie trzy). Stare animowane karty „Jak pracujemy" i pełnoekranowe slajdy opinii usunięte.
- [x] Reel po plakacie na stronie głównej i na LP (`components/reel-backdrop.tsx`): najpierw plakat 70 KB, dopiero potem reel. Plakat to klatka reela z 1,46 s (po jego rozjaśnieniu z czerni), a pierwsze odtworzenie startuje od tej samej klatki, więc przejścia nie widać. Bez kompresji i bez zmiany `preload`.
- [x] Ceny i terminy na podstronach usług wyrównane do LP: korporacyjne i wizerunkowe od 20 000 zł, reklamowe i produktowe od 15 000 zł, reportaż od 4 000 zł, pakiet 10 rolek od 10 000 zł, wywiady od 5 000 zł za sesję; pierwsza wersja do 10 dni roboczych, tryb przyspieszony 5 dni roboczych za dopłatą od 800 zł, odpowiedź w 24 godziny w dni robocze.

Otwarte po pierwszym kroku:
- [x] Ceny z `/offer/video-linkedin` i `/offer/video-case-studies` zniknęły razem z tymi podstronami (punkt 5.1).
- [ ] **[M]** Trzy progi na dole `/offer` („Od 4 000 PLN", „Od 7 500 PLN/mies.", „Wycena indywidualna") nie pasują do kafelków nad nimi. Zostały na Twoją prośbę; do decyzji przy kolejnym kroku.
- [ ] **[M]** Zdanie w hero strony głównej („…tworzące nowoczesne treści wizualne") różni się od zdania na LP. Kolumna na stronie głównej jest wąska, więc nie podmieniałem bez pytania.
- [x] Ponowny pomiar szybkości po wdrożeniu (2026-11-22, telefon, test laboratoryjny): LP 67–100 w zależności od przebiegu, LCP 8,9–9,4 s (było 11,4 s); strona główna 69, LCP 7,8 s (było 7,4 s). **Reel po plakacie działa, ale nie poprawił LCP w teście.** Wcześniejsze wyjaśnienie (plakat dzieli łącze z reelem) było błędne.
- [x] (Michał, 2026-11-22: nie robimy, nie walczymy o szybkość kosztem ryzyka.) Prawdziwa przyczyna, potwierdzona w raporcie PageSpeed: na telefonie elementem LCP nie jest plakat (Chrome pomija obrazy na cały ekran), tylko akapit tekstu w hero, a ten czeka na JavaScript, bo wejście z przenikaniem startuje dopiero po uruchomieniu skryptów („opóźnienie renderowania elementu" 3,4 s). Rozwiązanie bez zmiany wyglądu: to samo przenikanie zrobić w CSS, żeby tekst nie czekał na skrypty. Na LP do zrobienia od ręki; na stronie głównej dotyka ustalenia „przenikanie zostaje" (wygląd zostaje ten sam, zmienia się tylko mechanizm) — do decyzji Michała.
- [ ] Miniatury sześciu realizacji ważą razem ok. 1,7 MB, a wyświetlają się w małych kafelkach (PageSpeed: ok. 1,6 MB do zaoszczędzenia). Mniejsze wersje pod nowymi nazwami; filmów to nie dotyczy.

- **Strona główna przejmuje układ landing page'a.** Te same sekcje co `/lp/kampania` (hero, loga, realizacje, oferta z cenami, opinie, proces, FAQ, formularz), ale z normalnym menu: O nas, Portfolio, Kontakt.
- **Sekcja `/offer`**: dziś sześć formatów na stronie przeglądowej i dziewięć podstron usług. Do rozstrzygnięcia: czy podstrony kurczą się do sześciu formatów.

### 5.1 Podstrony usług a sześć kafelków — analiza i plan (2026-11-22, plan zaakceptowany; kroki 1–3 wdrożone na produkcję tego samego dnia, PR 17)

Stan: dziewięć podstron `/offer/[slug]` z jednego szablonu (hero, trzy korzyści, trzy kroki, opcjonalny film, cztery pytania, przycisk do `/contact`), po ok. 440 słów. Ruch z wyszukiwarki z 90 dni: łącznie jedno kliknięcie; widoczność ma tylko `/offer/filmy-korporacyjne` (78 wyświetleń, średnia pozycja 25). Konsolidacja nie kosztuje więc ruchu.

| Kafelek | Podstrona pod „Więcej szczegółów" | Do wchłonięcia (przekierowanie) |
|---|---|---|
| Film korporacyjny i wizerunkowy | `/offer/filmy-korporacyjne` | `/offer/filmy-wizerunkowe` — prawie kopia: ten sam film, ta sama cena, akapit korzyści niemal słowo w słowo |
| Film reklamowy | `/offer/filmy-reklamowe` | `/offer/filmy-produktowe` — ten sam film (Rondo) i ta sama cena |
| Wideo AI | brak | — nowa podstrona, gdy będzie reklama spekulatywna; do tego czasu kafelek bez przycisku |
| Rolki premium | `/offer/wideo-social-media` | `/offer/video-linkedin` — LinkedIn to kanał, nie format; własna cena „od 2 500 PLN" |
| Podcasty i wywiady na 3 kamery | `/offer/wywiady-eksperckie` | `/offer/video-case-studies` — wywiad z klientem plus ujęcia; cena „od 4 500 PLN" spoza kafelków |
| Reportaż eventowy | `/offer/reportaz-eventowy` | — |

Po zmianie: pięć podstron (szósta, AI, później) zamiast dziewięciu. Znikają przy okazji dwie ceny, których nie ma na kafelkach.

Co jest nie tak z treścią pięciu podstron, które zostają:
- Obietnice bez pokrycia w ustaleniach: „mierzalne KPI filmu", „warsztat strategiczny", „15-minutowa rozmowa" (korporacyjne); „realnie wpływają na ROAS", „testy A/B", „3–5 wariantów", „iterujemy po starcie kampanii" (reklamowe); „highlights w 24–48 godzin", zespół wielokamerowy jako standard (reportaż); wywiady zdalne i prowadzący (wywiady). Każdą trzeba potwierdzić albo usunąć.
- Brakuje konkretów z kafelków: pliki pod miejsce emisji, casting, drony FPV, „nawet 10 rolek w jeden dzień", trzy kamery i trzy odcinki.
- Film ma tylko część podstron, a szablon umie pokazać wyłącznie realizację z portfolio (`lib/projects.ts`). Nowe filmy (JHJ, rolki Morris & Lloyd, wywiady CIONET) są na razie tylko w kafelkach.
- Przycisk kontaktu nie przekazuje formatu do formularza.
- Wersja `/en/offer/*` ma angielski tytuł karty i polską treść.

Plan:
- [x] **Krok 1:** w rozwiniętym kafelku na `/offer` drugi przycisk „Więcej szczegółów" obok „Wyceń ten format" (na landing page'u go nie ma: stamtąd nie wyprowadzamy). Lista linków pod siatką znika.
- [x] **Krok 2:** cztery przekierowania stałe (PL i EN) według tabeli; mapa strony ma pięć podstron. Michał: treści wchłanianych podstron nie muszą nigdzie wracać. Przeniesione tylko trzy pytania, które pasują naturalnie: „Czym film wizerunkowy różni się od reklamowego?" (korporacyjne), „Czy realizujecie też filmy produktowe?" (reklamowe), „Czy nagrywacie też wideo case study z klientem?" (wywiady). Cen LinkedIna i case studies nie ma już nigdzie.
- [x] **Krok 3 (w lżejszej wersji, po decyzji Michała):** teksty podstron zostają; każda dostała blok „Zakres i cena" czytany z kafelka (nie może się z nim rozjechać), filmy z kafelka do odtworzenia (także pionowe; kadr przy case study też już odtwarza film) i przyciski kontaktu z wybranym formatem. Z treści usunięte tylko: ROAS, testy A/B i iteracje po starcie kampanii, KPI filmu.
- [ ] **Krok 4:** podstrona Wideo AI, gdy będzie materiał.

Sprawdzone na produkcji po wdrożeniu: pięć kafelków ma przycisk z właściwym adresem (Wideo AI bez), landing page nie ma żadnego linku do `/offer`, pięć podstron (PL i EN) odpowiada 200 z blokiem „Zakres i cena" i linkiem kontaktu z formatem, stare adresy odpowiadają 308, mapa strony ma pięć podstron. Stary adres z prefiksem `/pl` trafia na miejsce w dwóch krokach (najpierw ogólna reguła `/pl`, potem przekierowanie podstrony): osobna reguła na jeden krok na Vercelu nie wygrywała z ogólną, więc została usunięta.

Decyzje Michała (2026-11-22):
- [x] Case studies wchłania podstrona wywiadów.
- [x] Hasła z podstron zostają („highlights w 24–48 godzin", zespół wielokamerowy na eventach — to u niego prawie standard, wywiady zdalne, warsztat, 15-minutowa rozmowa). Wyrzucone: ROAS, testy A/B i iteracje kampanii, KPI.
- [ ] Do rozważenia później: dopisek przy „highlights w 24–48 godzin", że to tryb dodatkowo płatny. Michał skłania się, żeby podstrona pokazywała możliwości bez tego dopisku.

Do ustalenia przed startem:
- [ ] Co zostaje z obecnej strony głównej (pełnoekranowy reel z przenikaniem zostaje — patrz „Settled Decisions" w `CLAUDE.md`).
- [ ] Czy `/lp/kampania` zostaje osobną stroną dla reklam (bez menu, `noindex`), a strona główna jest jej wersją z menu i indeksowaną. Rekomendacja Claude: tak — reklamy potrzebują strony bez wyjść, a wyszukiwarka nie powinna widzieć dwóch kopii tej samej treści.
- [x] Co z `/offer` i dziewięcioma podstronami usług: zostało pięć, po jednej na kafelek (patrz 5.1); szósta, Wideo AI, później.
- [ ] Wspólne źródło treści dla strony głównej i LP, żeby ceny i obietnice zmieniać w jednym miejscu.

---

## 5.2 Nagrania sesji: Microsoft Clarity (2026-11-23, wdrożone tego samego dnia, PR 18)

Cel: widzieć, co odwiedzający robią na stronie (przewinęli i nic nie kliknęli, weszli i wyszli). Projekt Clarity założył Michał, identyfikator `zi37o7p3zl`.

- [x] Kod: Clarity ładuje się dopiero po zgodzie na analitykę i tylko na `www.nonoise.media` (`lib/clarity.ts`). Zgody sprzed dnia, w którym baner zaczął wymieniać Clarity (`CLARITY_CONSENT_SINCE`), jej nie włączają. Wycofanie zgody zatrzymuje Clarity i usuwa `_clck`/`_clsk`. Każde nasze zdarzenie (`lp_service_open`, `contact_form_success` itd.) oznacza nagranie samą nazwą, bez parametrów, więc nagrania da się filtrować po tym, co ktoś zrobił.
- [x] Polityka prywatności i opis kategorii „Analityczne" w banerze (PL i EN) wymieniają Clarity.
- [x] **[C] Przy wdrożeniu, obowiązkowo:** (ustawione na 2026-11-23 10:25 UTC) ustawić `CLARITY_CONSENT_SINCE` w `lib/clarity.ts` na chwilę, w której nowy tekst banera jest już na produkcji (scalenie + ok. 10 minut). Wcześniejsza wartość włączyłaby Clarity osobom, które zgodziły się na tekst bez Clarity.
Sprawdzone na produkcji po wdrożeniu: banner i polityka wymieniają Clarity; zgoda sprzed granicy (10:25 UTC) nie włącza Clarity; świeża zgoda na `/lp/kampania` ładuje tag, dane idą do `[a-z].clarity.ms/collect`, Clarity zgłasza `analytics_Storage: granted`, `ad_Storage: denied`; pliki `_clck`/`_clsk` leżą w domenie `.nonoise.media`; po „Odrzuć" zero wysyłek i żadnych plików Clarity.

- [ ] **[M]** W Clarity: Settings → Masking. Domyślny tryb „Balanced" zasłania liczby, więc w nagraniach nie będzie widać cen. „Relaxed" pokazuje tekst strony, a pola formularzy zasłania zawsze. Rekomendacja Claude: „Relaxed" (strona nie wyświetla cudzych danych).
- [ ] Po tygodniu: obejrzeć nagrania z `/lp/kampania` (filtr: adres strony albo źródło ruchu) i zapisać tu wnioski.

## 6. Później (niski priorytet)

- [ ] Strona główna na telefonie trzymanym poziomo: reguły dopasowujące hero (stała `LANDSCAPE_MOBILE_HERO` w `components/animated-home-button.tsx` i `app/[locale]/HomeClient.tsx`) nie generują żadnego CSS. Na LP naprawione wariantem `landscape-phone:`; na stronie głównej do zrobienia tak samo, z obejrzeniem efektu, bo te reguły nigdy dotąd nie działały.

- Ochrona formularzy przed spamem (limit zapytań lub honeypot). Wraca do gry, gdy reklamy zaczną działać.
- Angielska wersja `/work` i LP (dziś treści tylko po polsku) albo rezygnacja z EN.
- Nagłówek H1 na stronie głównej (dziś nie ma żadnego) i na `/about`.
- Podstrony realizacji `/work/[slug]`, FAQ, blog: `docs/seo-backlog.md`.
- Obrazy social per podstrona.
- Drobne: preconnect do `assets.nonoise.media`, pętla animacji reela, `alt` logo w nawigacji, opinie w osobnym module danych, resztki w tekstach usług („4 000", „Instagramie", „kinow…").
