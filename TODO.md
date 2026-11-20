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
- [ ] Zdarzenie GTM na przycisku „Wyceń projekt" w hero (dziś klik jest niewidoczny w pomiarze).
- [ ] Pola formularza: czcionka 16 px (Safari na iPhonie przybliża stronę przy 14 px), widoczne etykiety, `autocomplete`.

### 1.8 Do decyzji Michała i prawnika

- Źródło wizyty (gclid) jest zapisywane w pamięci sesji przed wyborem w banerze i zostaje tam także po „Odrzuć"; trafia do maila z dopiskiem „zgoda: denied". Tak było już wcześniej i polityka to opisuje, ale prawnik powinien ocenić, czy to do utrzymania. Zmiana kosztowałaby atrybucję zapytań od osób, które nie klikną banera.
- Baner nie prowadzi rejestru zgód po stronie serwera (CookieYes prowadził). Dowodem jest wersjonowany kod i stan zgody w mailu z zapytaniem.
- Pierwsza warstwa banera to jedno zdanie z linkiem do polityki i ustawień. Krótko, żeby baner był mały; prawnik może chcieć dopisać „Google".
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

**Etap A: droga do kontaktu** (największy efekt, najmniej pracy)
- [ ] Wydzielić formularz z `/contact` do wspólnego komponentu. Zachować lead ID, atrybucję, zgodę i zdarzenie `contact_form_success`.
- [ ] Sekcja formularza na dole LP: nazwa firmy, e-mail lub telefon, krótki opis. Obok numer telefonu, mail, obietnica czasu odpowiedzi, linijka o prywatności.
- [ ] Wszystkie przyciski na LP przewijają do formularza.
- [ ] Dolny pasek na telefonie („Zadzwoń" / „Wyceń projekt").
- [ ] Usunąć progi cenowe, sekcję filozofii i link „Więcej w portfolio".
- [ ] Nagłówek LP bez menu i przełącznika języka.

**Etap B: pierwszy ekran i dowód**
- [ ] Nowy hero: nagłówek z usługą i miastem, jedno zdanie, jedna linijka dowodu, główny przycisk pod nagłówkiem, „Play reel" jako cichy link. Na telefonie pełna szerokość.
- [ ] Plakat hero z R2.
- [ ] Pasek logo pod hero.
- [ ] Trzy statyczne opinie.
- [ ] Trzy kroki procesu zamiast animowanych kart.

**Etap C: oferta i obiekcje**
- [ ] Rozwijane kafelki oferty z przykładami i przyciskiem „Wyceń ten format", który wstępnie zaznacza usługę w formularzu.
- [ ] Scenariusze cenowe nad formularzem.
- [ ] FAQ.

Docelowa kolejność sekcji: nagłówek → hero → loga → realizacje → oferta → opinie → proces → ceny → FAQ → formularz → stopka.

### 2.5 Potrzebne od Michała

- [ ] Teksty reklamy (nagłówki i opisy), patrz punkt 1.5.
- [ ] Prawdziwe kwoty „od" dla 2–3 typowych projektów.
- [ ] Realny czas odpowiedzi na zapytanie (np. „odpowiadamy w 24 godziny").
- [ ] Jedna realizacja z mierzalnym wynikiem, jeśli jest.
- [ ] Decyzja: które usługi zostają na kafelkach.
- [ ] Decyzja: która nazwa i adres firmy mają być widoczne.

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

## 5. Później (niski priorytet)

- Ochrona formularzy przed spamem (limit zapytań lub honeypot). Wraca do gry, gdy reklamy zaczną działać.
- Angielska wersja `/work` i LP (dziś treści tylko po polsku) albo rezygnacja z EN.
- Nagłówek H1 na stronie głównej (dziś nie ma żadnego) i na `/about`.
- Podstrony realizacji `/work/[slug]`, FAQ, blog: `docs/seo-backlog.md`.
- Obrazy social per podstrona.
- Drobne: preconnect do `assets.nonoise.media`, pętla animacji reela, `alt` logo w nawigacji, opinie w osobnym module danych, resztki w tekstach usług („4 000", „Instagramie", „kinow…").
