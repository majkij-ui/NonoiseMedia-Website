// ---------------------------------------------------------------------------
// Service Landing Page — data types & content
// ---------------------------------------------------------------------------
// Each entry drives one /offer/[slug] page.  Edit content here;
// the component renders it automatically.
// ---------------------------------------------------------------------------

export type ServiceBenefit = {
  label: string
  title: string
  body: string
}

export type ProcessStep = {
  number: string
  title: string
  body: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServicePageData = {
  slug: string
  meta: {
    pl: { title: string; description: string }
    en: { title: string; description: string }
  }
  hero: {
    label: string
    headline: string
    subheadline: string
    ctaText: string
  }
  benefits: {
    sectionLabel: string
    sectionHeadline: string
    items: ServiceBenefit[]
  }
  process: {
    sectionLabel: string
    sectionHeadline: string
    steps: ProcessStep[]
  }
  /** id matching a project from lib/projects.ts — omit to hide the case study section */
  featuredProjectId?: number
  caseStudy: {
    sectionLabel: string
    sectionHeadline: string
    linkText: string
  }
  faqs: {
    sectionLabel: string
    sectionHeadline: string
    items: ServiceFaq[]
  }
  cta: {
    headline: string
    body: string
    buttonText: string
  }
}

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------

export const servicePages: ServicePageData[] = [
  // ── Filmy korporacyjne ──────────────────────────────────────────────
  {
    slug: "filmy-korporacyjne",
    meta: {
      pl: {
        title: "Filmy Korporacyjne Warszawa — Produkcja Wideo dla Firm",
        description:
          "Profesjonalna produkcja filmów korporacyjnych w Warszawie. Tworzymy filmy wizerunkowe, onboardingowe i employer branding z kinową jakością. Bezpłatna wycena.",
      },
      en: {
        title: "Corporate Video Production Warsaw",
        description:
          "Professional corporate video production in Warsaw. Brand films, onboarding videos and employer branding with cinematic quality. Free quote.",
      },
    },
    hero: {
      label: "Filmy korporacyjne Warszawa",
      headline: "FILM KORPORACYJNY\nKTÓRY PRACUJE\nNA TWOJĄ MARKĘ",
      subheadline:
        "Większość filmów korporacyjnych kończy jako zapomniany link w intranecie. Nasze nie. Każdy kadr ma konkretne zadanie — budować zaufanie, wzmacniać wizerunek i wspierać cele firmy. Od employer brandingu po komunikację z inwestorami.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film korporacyjny",
      sectionHeadline: "INWESTYCJA, KTÓRA SIĘ ZWRACA",
      items: [
        {
          label: "01 / Wiarygodność",
          title: "Twoja wizytówka w każdym spotkaniu",
          body: "Profesjonalny film korporacyjny zmienia sposób, w jaki partnerzy, inwestorzy i klienci postrzegają Twoją firmę. Kinowa jakość obrazu sygnalizuje solidność i ambicję — zanim padnie pierwsze słowo.",
        },
        {
          label: "02 / Wielokanałowość",
          title: "Jeden film, dziesiątki zastosowań",
          body: "Strona internetowa, LinkedIn, prezentacje handlowe, targi, onboarding — film korporacyjny pracuje w każdym punkcie styku z odbiorcą. Dostarczamy materiały zoptymalizowane pod każdy kanał.",
        },
        {
          label: "03 / Emocje i dane",
          title: "Storytelling oparty na faktach",
          body: "Łączymy emocjonalną narrację z konkretnymi wynikami Twojej firmy. Przekaz, który angażuje i jednocześnie daje odbiorcy twarde argumenty do podjęcia decyzji.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "OD BRIEFU\nDO PREMIERY",
      steps: [
        {
          number: "01",
          title: "Odkrycie & strategia",
          body: "Poznajemy Twój model biznesowy, cele i grupę docelową. Definiujemy przekaz, ton narracji i mierzalne KPI filmu. Efekt: moodboard i szczegółowy scenariusz.",
        },
        {
          number: "02",
          title: "Produkcja",
          body: "Profesjonalna ekipa, sprzęt klasy kinowej i precyzyjnie zaplanowany plan zdjęciowy. Skalujemy wielkość ekipy do projektu — od kameralnych wywiadów po wielolokacyjne realizacje.",
        },
        {
          number: "03",
          title: "Postprodukcja & dostawa",
          body: "Montaż, korekcja barwna, udźwiękowienie i motion design. Gotowe pliki w formatach dopasowanych do strony, social media, prezentacji i eventów.",
        },
      ],
    },
    featuredProjectId: 1, // PHH — film wizerunkowy
    caseStudy: {
      sectionLabel: "03 / Case study",
      sectionHeadline: "ZOBACZ, JAK TO ROBIMY",
      linkText: "Zobacz pełne portfolio",
    },
    faqs: {
      sectionLabel: "04 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Ile kosztuje film korporacyjny?",
          answer:
            "Cena zależy od skali projektu — liczby lokacji, dni zdjęciowych i zakresu postprodukcji. Realizacje zaczynają się od 8 000 PLN netto. Przygotujemy bezpłatną wycenę dopasowaną do Twojego budżetu i celów.",
        },
        {
          question: "Jak długo trwa produkcja filmu korporacyjnego?",
          answer:
            "Typowy projekt realizujemy w 2–4 tygodnie: tydzień na preprodukcję, 1–2 dni zdjęciowe i 1–2 tygodnie na postprodukcję. W trybie ekspresowym dostarczamy materiał w 7 dni.",
        },
        {
          question: "Czy mogę wykorzystać film na wielu platformach?",
          answer:
            "Tak — dostarczamy materiały w formatach zoptymalizowanych pod stronę WWW, media społecznościowe, prezentacje i targi. Jeden dzień zdjęciowy może zasilić wiele kanałów.",
        },
        {
          question: "Czy pomagacie z koncepcją i scenariuszem?",
          answer:
            "Tak. Każdy projekt zaczynamy od warsztatu strategicznego, na którym wspólnie definiujemy cel, przekaz i grupę docelową. Scenariusz i moodboard wchodzą w cenę produkcji.",
        },
      ],
    },
    cta: {
      headline: "Gotowy na film korporacyjny\nna najwyższym poziomie?",
      body: "Wyślij krótki brief lub umów się na 15-minutową rozmowę. Przygotujemy propozycję dopasowaną do Twoich celów i budżetu.",
      buttonText: "Porozmawiajmy",
    },
  },

  // ── Filmy reklamowe ─────────────────────────────────────────────────
  {
    slug: "filmy-reklamowe",
    meta: {
      pl: {
        title: "Filmy Reklamowe Warszawa — Spoty i Kampanie Wideo",
        description:
          "Produkcja filmów reklamowych i spotów wideo w Warszawie. Spoty na social media, kampanie YouTube i reklamy performance nastawione na konwersję. Bezpłatna wycena.",
      },
      en: {
        title: "Commercial Video Production Warsaw — Ads & Campaigns",
        description:
          "Commercial video production in Warsaw. Social media ads, YouTube campaigns and performance-driven video spots. Free quote.",
      },
    },
    hero: {
      label: "Filmy reklamowe Warszawa",
      headline: "REKLAMA WIDEO\nKTÓRA ZATRZYMUJE\nSCROLL",
      subheadline:
        "Spoty reklamowe i kampanie wideo, które nie giną w szumie. Od 15-sekundowych reelsów po pełne kampanie multiplatformowe — każdy format projektujemy pod konkretny cel: kliknięcie, zapis, zakup.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film reklamowy",
      sectionHeadline: "REKLAMA, KTÓRA KONWERTUJE",
      items: [
        {
          label: "01 / Performance",
          title: "Projektowane pod konwersję",
          body: "Każdy spot budujemy wokół jasnego CTA i mierzalnego celu. Znamy mechanikę platform reklamowych — od hook'ów po retargeting — i dostarczamy kreacje, które realnie wpływają na ROAS.",
        },
        {
          label: "02 / Wieloformat",
          title: "Jeden shoot, pełna kampania",
          body: "Jeden dzień zdjęciowy, kreacje w formatach 9:16, 1:1 i 16:9 — gotowe na Instagram, TikTok, YouTube, LinkedIn i display. Maksymalny zwrot z budżetu produkcyjnego.",
        },
        {
          label: "03 / Szybkość",
          title: "Kampanie mają deadline'y. My też.",
          body: "Zoptymalizowane procesy pozwalają nam dostarczać gotowe kreacje w trybie ekspresowym — 7 dni od briefu do publikacji, bez kompromisów w jakości obrazu.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "TRZY KROKI\nDO KAMPANII",
      steps: [
        {
          number: "01",
          title: "Brief & koncept kreatywny",
          body: "Analizujemy Twój produkt, grupę docelową i platformę. Proponujemy koncepty kreatywne z hook'ami i wariantami pod testy A/B.",
        },
        {
          number: "02",
          title: "Zoptymalizowany plan zdjęciowy",
          body: "Pracujemy zwinnie i konkretnie. Szanujemy czas Twojego zespołu, realizując precyzyjnie zaplanowane ujęcia pod wiele formatów w ciągu jednego dnia.",
        },
        {
          number: "03",
          title: "Postprodukcja & iteracja",
          body: "Dynamiczny montaż, motion graphics i udźwiękowienie. Warianty kreacji gotowe do testowania. Po starcie kampanii — iterujemy na podstawie wyników.",
        },
      ],
    },
    featuredProjectId: 2, // Rondo — film produktowy (dynamiczny, odpowiedni dla kampanii reklamowej)
    caseStudy: {
      sectionLabel: "03 / Case study",
      sectionHeadline: "KAMPANIA W PRAKTYCE",
      linkText: "Zobacz pełne portfolio",
    },
    faqs: {
      sectionLabel: "04 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Ile kosztuje spot reklamowy?",
          answer:
            "Krótkie spoty na social media zaczynają się od 4 000 PLN. Pełne kampanie multiplatformowe z wieloma wariantami wyceniamy indywidualnie. Zawsze dopasowujemy zakres do budżetu reklamowego klienta.",
        },
        {
          question: "Ile wariantów kreacji dostarczacie?",
          answer:
            "Standardowo dostarczamy 3–5 wariantów (różne hook'i, CTA, długości) w formatach pionowym, kwadratowym i poziomym. Idealne do testów A/B w kampaniach performance.",
        },
        {
          question: "Czy pomagacie z konceptem kreatywnym?",
          answer:
            "Tak — od analizy konkurencji i grupy docelowej po propozycję hook'ów, scenariuszy i storyboardów. Możemy też pracować na briefie Twojej agencji.",
        },
        {
          question: "Jak szybko mogę otrzymać gotowy materiał?",
          answer:
            "W trybie standardowym: 2–3 tygodnie. W trybie ekspresowym: 5–7 dni roboczych od dnia zdjęciowego. Ustalamy termin przy pierwszej rozmowie.",
        },
      ],
    },
    cta: {
      headline: "Masz brief?\nZróbmy z niego kampanię",
      body: "Prześlij brief lub opisz cel kampanii w dwóch zdaniach. Wrócimy z konceptem kreatywnym i wyceną w ciągu 48 godzin.",
      buttonText: "Wyceń kampanię",
    },
  },

  // ── Filmy wizerunkowe ───────────────────────────────────────────────
  {
    slug: "filmy-wizerunkowe",
    meta: {
      pl: {
        title: "Filmy Wizerunkowe Warszawa — Produkcja Brand Video",
        description:
          "Produkcja filmów wizerunkowych i brand video w Warszawie. Kinowa jakość, emocjonalny storytelling i bezkompromisowa estetyka dla marek premium. Bezpłatna wycena.",
      },
      en: {
        title: "Brand Film Production Warsaw — Cinematic Brand Video",
        description:
          "Brand film production in Warsaw. Cinematic quality, emotional storytelling and uncompromising aesthetics for premium brands. Free quote.",
      },
    },
    hero: {
      label: "Filmy wizerunkowe Warszawa",
      headline: "FILM WIZERUNKOWY\nKTÓRY DEFINIUJE\nTWOJĄ MARKĘ",
      subheadline:
        "Film wizerunkowy to nie ozdobnik — to fundament komunikacji marki. Kinowa produkcja, która oddaje to, czym Twoja firma naprawdę jest: jej kulturę, ambicję i wartości. Materiał, który pracuje na Twój wizerunek przez lata, nie miesiące.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film wizerunkowy",
      sectionHeadline: "OPOWIEDZ SWOJĄ HISTORIĘ",
      items: [
        {
          label: "01 / Percepcja marki",
          title: "Podnieś wartość swojego brandu",
          body: "Profesjonalny film wizerunkowy zmienia sposób, w jaki klienci, partnerzy i inwestorzy postrzegają Twoją firmę. Kinowa jakość obrazu sygnalizuje ambicję i profesjonalizm — zanim ktokolwiek przeczyta ofertę.",
        },
        {
          label: "02 / Emocjonalna więź",
          title: "Pokaż to, czego oferta PDF nie przekaże",
          body: "Dane przekonują, ale emocje budują lojalność. Film wizerunkowy łączy Twoją markę z ludźmi na poziomie, którego nie osiągnie żaden tekst, zdjęcie stockowe ani prezentacja.",
        },
        {
          label: "03 / Trwałość",
          title: "Inwestycja na lata, nie na sezon",
          body: "Dobrze zrealizowany film wizerunkowy pracuje przez lata — na stronie, w prezentacjach, na eventach i w social media. To najdłużej żyjący element strategii contentowej.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "WIZJA STAJE SIĘ\nRZECZYWISTOŚCIĄ",
      steps: [
        {
          number: "01",
          title: "Zrozumienie biznesu",
          body: "Zaczynamy od poznania Twojego modelu biznesowego, kultury organizacji i tego, co realnie wyróżnia Cię na rynku. Budujemy narrację autentyczną i zrozumiałą dla Twoich klientów i inwestorów.",
        },
        {
          number: "02",
          title: "Kinowa realizacja",
          body: "Sprzęt klasy kinowej, starannie dobrane lokacje i reżyseria nakierowana na emocje. Każdy kadr jest świadomie zaplanowany pod kątem estetyki i przekazu.",
        },
        {
          number: "03",
          title: "Finalna perfekcja",
          body: "Precyzyjna korekcja barwna, profesjonalne udźwiękowienie i motion design. Materiał, który budzi emocje i spełnia najwyższe standardy techniczne.",
        },
      ],
    },
    featuredProjectId: 1, // PHH — film wizerunkowy premium
    caseStudy: {
      sectionLabel: "03 / Case study",
      sectionHeadline: "KINOWA JAKOŚĆ\nDLA MARKI PREMIUM",
      linkText: "Zobacz pełne portfolio",
    },
    faqs: {
      sectionLabel: "04 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Czym film wizerunkowy różni się od reklamowego?",
          answer:
            "Film wizerunkowy buduje długoterminową percepcję marki — opowiada historię, pokazuje wartości i kulturę firmy. Film reklamowy to krótka kreacja nastawiona na konkretne działanie (kliknięcie, zakup). Oba typy się uzupełniają.",
        },
        {
          question: "Ile kosztuje film wizerunkowy?",
          answer:
            "Produkcje wizerunkowe zaczynają się od 8 000 PLN. Ostateczna cena zależy od liczby lokacji, dni zdjęciowych, zakresu postprodukcji i udziału aktorów lub epizodystów.",
        },
        {
          question: "Ile trwa realizacja filmu wizerunkowego?",
          answer:
            "Standardowo 3–6 tygodni: tydzień na immersję i scenariusz, 1–3 dni zdjęciowe, 2–3 tygodnie postprodukcji. Projekty wielolokacyjne mogą wymagać dłuższego harmonogramu.",
        },
        {
          question: "Czy film wizerunkowy sprawdzi się w social media?",
          answer:
            "Tak — oprócz pełnej wersji dostarczamy skrócone warianty w formatach 9:16 i 1:1 gotowe do publikacji na LinkedIn, Instagramie i innych platformach.",
        },
      ],
    },
    cta: {
      headline: "Twoja marka zasługuje\nna kinową opowieść",
      body: "Opisz swoją firmę w kilku zdaniach. Wrócimy z propozycją narracji i wstępną wyceną — bez zobowiązań.",
      buttonText: "Porozmawiajmy o wizji",
    },
  },

  // ── Filmy produktowe ────────────────────────────────────────────────
  {
    slug: "filmy-produktowe",
    meta: {
      pl: {
        title: "Filmy Produktowe Warszawa — Wideo Prezentacja Produktu",
        description:
          "Produkcja filmów produktowych w Warszawie. Dynamiczne prezentacje produktów, unboxingi i filmy e-commerce z jakością premium. Bezpłatna wycena.",
      },
      en: {
        title: "Product Video Production Warsaw",
        description:
          "Product video production in Warsaw. Dynamic product showcases, unboxings and e-commerce videos with cinematic quality. Free quote.",
      },
    },
    hero: {
      label: "Filmy produktowe Warszawa",
      headline: "POKAŻ PRODUKT\nW SPOSÓB, KTÓRY\nSPRZEDAJE",
      subheadline:
        "Film produktowy zamienia scrollowanie w zakup. Dynamiczne ujęcia, precyzyjne oświetlenie i montaż pod konwersję — Twój produkt widziany tak, jak zdjęcie nigdy go nie pokaże.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film produktowy",
      sectionHeadline: "OBRAZ SPRZEDAJE\nLEPIEJ NIŻ OPIS",
      items: [
        {
          label: "01 / Konwersja",
          title: "Mniej zwrotów, szybsza decyzja",
          body: "Klienci, którzy oglądają film produktowy przed zakupem, kupują pewniej i rzadziej zwracają towar. Wideo redukuje wątpliwości, bo pokazuje produkt dokładnie takim, jaki jest — w ruchu, w kontekście, w skali.",
        },
        {
          label: "02 / Detale",
          title: "Pokaż to, czego zdjęcie nie pokaże",
          body: "Faktura materiału, mechanizm działania, skala i proporcje — film produktowy oddaje detale, które tracą się w fotografii. Ruch i światło pokazują jakość wykonania lepiej niż jakikolwiek opis.",
        },
        {
          label: "03 / Kontekst",
          title: "Produkt w naturalnym środowisku",
          body: "Pokazujemy Twój produkt w użyciu — w realnym kontekście, z prawdziwymi ludźmi. Odbiorca widzi nie sam przedmiot, a to, jak wpasowuje się w jego codzienność.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "JAK TO ROBIMY",
      steps: [
        {
          number: "01",
          title: "Analiza produktu & brief",
          body: "Poznajemy Twój produkt, jego wyróżniki i grupę docelową. Planujemy ujęcia, lokacje i styl wizualny — od minimalistycznego studio po dynamiczne lifestyle.",
        },
        {
          number: "02",
          title: "Sesja zdjęciowa",
          body: "Precyzyjna praca kamery (motion control, macro), która wydobywa detale niewidoczne na zwykłych zdjęciach. Nagrywamy warianty pod e-commerce, social media i stronę produktu.",
        },
        {
          number: "03",
          title: "Montaż & optymalizacja",
          body: "Rytmiczny montaż, animacje i korekcja barwna. Warianty pod każdy format i platformę — od hero video na stronę po karuzele produktowe.",
        },
      ],
    },
    featuredProjectId: 2, // Rondo — film produktowy
    caseStudy: {
      sectionLabel: "03 / Case study",
      sectionHeadline: "PRODUKT W RUCHU",
      linkText: "Zobacz pełne portfolio",
    },
    faqs: {
      sectionLabel: "04 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Ile kosztuje film produktowy?",
          answer:
            "Proste prezentacje studyjne zaczynają się od 4 000 PLN. Produkcje lifestyle z lokacjami i modelkami wyceniamy od 6 000 PLN. Dokładna cena zależy od złożoności produktu i liczby wariantów.",
        },
        {
          question: "Czy realizujecie filmy w studio czy w plenerze?",
          answer:
            "Jedno i drugie. Dobieramy lokalizację do charakteru produktu — minimalistyczne tło studyjne dla technologii, naturalne otoczenie dla lifestyle. Często łączymy oba podejścia w jednej produkcji.",
        },
        {
          question: "Ile filmów mogę dostać z jednego dnia zdjęciowego?",
          answer:
            "Z jednego dnia zdjęciowego dostarczamy standardowo 3–6 wariantów wideo (hero video + formaty social media). Przy dobrze zaplanowanej sesji — nawet więcej.",
        },
        {
          question: "Czy film produktowy sprawdzi się w e-commerce?",
          answer:
            "Zdecydowanie — platformy takie jak Allegro, Amazon i Shopify faworyzują listingi z wideo. Film produktowy to jeden z najskuteczniejszych sposobów na zwiększenie konwersji w sklepie online.",
        },
      ],
    },
    cta: {
      headline: "Pokaż swój produkt\ntak, jak zasługuje",
      body: "Prześlij zdjęcie produktu i krótki opis. Zaproponujemy styl realizacji i wycenę — zwykle w ciągu 24 godzin.",
      buttonText: "Wyceń film produktowy",
    },
  },

  // ── Reportaż eventowy ───────────────────────────────────────────────
  {
    slug: "reportaz-eventowy",
    meta: {
      pl: {
        title: "Reportaż Eventowy Warszawa — Filmowanie Wydarzeń i Konferencji",
        description:
          "Profesjonalna realizacja reportaży eventowych w Warszawie. Filmujemy konferencje, eventy korporacyjne i spotkania branżowe z dyskrecją i jakością premium. Bezpłatna wycena.",
      },
      en: {
        title: "Event Coverage Warsaw — Corporate Event Video Production",
        description:
          "Professional event video production in Warsaw. Conferences, corporate events and industry gatherings filmed with discretion and cinematic quality. Free quote.",
      },
    },
    hero: {
      label: "Reportaż eventowy Warszawa",
      headline: "EVENT MIJA.\nCONTENT PRACUJE\nDALEJ",
      subheadline:
        "Profesjonalny reportaż eventowy przedłuża życie Twojego wydarzenia daleko poza salę konferencyjną. Filmujemy konferencje, eventy korporacyjne i spotkania branżowe z dyskrecją i wielokamerowym setupem — bez zakłócania atmosfery.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego reportaż eventowy",
      sectionHeadline: "EVENT RAZ,\nTREŚĆ NA LATA",
      items: [
        {
          label: "01 / Dyskrecja",
          title: "Niewidoczna ekipa, widoczny efekt",
          body: "Pracujemy metodą fly-on-the-wall — lekki, mobilny sprzęt i lata doświadczenia pozwalają nam dokumentować każdy moment bez ingerencji w atmosferę. Twoi goście nawet nie poczują się obserwowani.",
        },
        {
          label: "02 / Wieloformatowość",
          title: "Jeden event, dziesiątki materiałów",
          body: "Z jednego eventu dostarczamy: pełny reportaż, highlight reel na social media, wycinki z wywiadów eksperckich i relacje w formatach 9:16 i 1:1. Cały kwartał contentu z jednego dnia.",
        },
        {
          label: "03 / Prestiż",
          title: "Dokumentuj to, co buduje wizerunek",
          body: "Zamknięte spotkania networkingowe, konferencje branżowe, gale i jubileusze — profesjonalny film z wydarzenia to dowód prestiżu Twojej marki i skuteczne narzędzie employer brandingu.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "SPRAWDZONA\nŚCIEŻKA",
      steps: [
        {
          number: "01",
          title: "Przygotowanie & scouting",
          body: "Analizujemy program eventu, mapujemy kluczowe momenty i planujemy pozycje kamer. Koordynujemy z organizatorem, by być niewidoczni — a jednocześnie wszędzie tam, gdzie trzeba.",
        },
        {
          number: "02",
          title: "Realizacja wielokamerowa",
          body: "Zwinny team z mobilnym sprzętem. Obsługujemy równolegle scenę, kuluary i strefę wywiadów. W razie potrzeby płynnie rozszerzamy ekipę o drugi unit.",
        },
        {
          number: "03",
          title: "Montaż & dostawa",
          body: "Dynamiczny montaż, korekcja barwna i udźwiękowienie. Dostarczamy pełny reportaż oraz gotowe formaty do social media — w uzgodnionym terminie po evencie.",
        },
      ],
    },
    featuredProjectId: 6, // Kunzek — Warsaw Industry Week
    caseStudy: {
      sectionLabel: "03 / Case study",
      sectionHeadline: "EVENT NA ŻYWO,\nPREMIUM EFEKT",
      linkText: "Zobacz pełne portfolio",
    },
    faqs: {
      sectionLabel: "04 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Ile kosztuje reportaż eventowy?",
          answer:
            "Cena zależy od długości eventu, liczby kamer i zakresu postprodukcji. Podstawowe reportaże zaczynają się od 3 500 PLN. Duże konferencje z wielokamerowym setupem i pełną postprodukcją wyceniamy indywidualnie.",
        },
        {
          question: "Jak szybko dostarczycie gotowy film po evencie?",
          answer:
            "Standardowo 5–10 dni roboczych po evencie. W trybie ekspresowym (np. na potrzeby relacji live lub konferencji prasowej) możemy dostarczyć highlights w 24–48 godzin.",
        },
        {
          question: "Czy filmujecie eventy zamknięte i poufne?",
          answer:
            "Tak — mamy duże doświadczenie w dokumentowaniu zamkniętych spotkań C-level. Podpisujemy NDA przed każdą produkcją i ograniczamy dostęp do materiału do wyznaczonych osób.",
        },
        {
          question: "Jakie formaty wideo dostarczacie po evencie?",
          answer:
            "Pełny reportaż (3–10 min), highlight reel (60–90 sek.), wywiady eksperckie jako osobne klipy oraz formaty vertical i square na Instagram, LinkedIn i TikTok — wszystko z jednej produkcji.",
        },
      ],
    },
    cta: {
      headline: "Zbliża się Twój event?",
      body: "Podrzuć datę, lokalizację i skalę wydarzenia. Wrócimy z propozycją ekipy i wyceny dopasowaną do formatu.",
      buttonText: "Wyceń reportaż",
    },
  },

  // ── Wideo do Social Media ───────────────────────────────────────────
  {
    slug: "wideo-social-media",
    meta: {
      pl: {
        title: "Wideo do Social Media dla Firm Warszawa — Short-Form Video",
        description:
          "Profesjonalna produkcja wideo do social media dla firm w Warszawie. Reelsy, TikToki i YouTube Shorts, które budują markę i generują zasięg organiczny. Bezpłatna wycena.",
      },
      en: {
        title: "Social Media Video for Business Warsaw — Short-Form Production",
        description:
          "Professional short-form video production for businesses in Warsaw. Reels, TikToks and YouTube Shorts that build your brand and drive organic reach. Free quote.",
      },
    },
    hero: {
      label: "Wideo do Social Media — Warszawa",
      headline: "SHORT-FORM VIDEO\nKTÓRY ZATRZYMUJE\nKCIUK",
      subheadline:
        "TikTok, Instagram Reels, YouTube Shorts — niezależnie od platformy, krótkie wideo to dziś najskuteczniejszy organiczny kanał dotarcia do nowych odbiorców. Dynamiczne materiały w pionie, które nie giną w feedzie — budują markę eksperta i przekuwają widzów w leady.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego wideo do social media",
      sectionHeadline: "ALGORYTM\nPO TWOJEJ STRONIE",
      items: [
        {
          label: "01 / Zasięg organiczny",
          title: "Dotrzyj do nowych odbiorców bez płatnej reklamy",
          body: "Short-form video to jedyny format, który platformy aktywnie promują poza Twoją sieć obserwujących. Profesjonalnie zrealizowane materiały docierają do ludzi, którzy jeszcze nie wiedzą, że Cię potrzebują.",
        },
        {
          label: "02 / Pozycja eksperta",
          title: "60 sekund, które budują autorytet",
          body: "Krótkie, konkretne wideo z Twoją wiedzą branżową to najszybsza droga do pozycji eksperta w social media. Format, który ludzie faktycznie oglądają do końca — i zapamiętują.",
        },
        {
          label: "03 / Spójność i skala",
          title: "Regularny content bez chaosu",
          body: "Jeden dzień zdjęciowy, miesiąc gotowego contentu. Spójna estetyka, przemyślana narracja i gotowe materiały w formacie 9:16 na każdą platformę — Ty publikujesz, my zajmujemy się produkcją.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "PROCES, KTÓRY\nSIĘ SKALUJE",
      steps: [
        {
          number: "01",
          title: "Strategia contentu",
          body: "Analizujemy Twoje kanały, grupę docelową i cele. Proponujemy tematy, formaty i hook'i dopasowane do algorytmów poszczególnych platform.",
        },
        {
          number: "02",
          title: "Dzień zdjęciowy",
          body: "Zoptymalizowany setup, szybki obrót scen. Nagrywamy pakiet materiałów — różne tematy, hook'i i CTA — gotowych do montażu. Jeden dzień, kilka tygodni contentu.",
        },
        {
          number: "03",
          title: "Montaż & dostawa",
          body: "Dynamiczny montaż, napisy, motion graphics i korekta barwna. Gotowe pliki w formacie 9:16 zoptymalizowanym pod TikTok, Reels i Shorts.",
        },
      ],
    },
    faqs: {
      sectionLabel: "03 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Ile materiałów mogę dostać z jednego dnia zdjęciowego?",
          answer:
            "Standardowo 6–12 filmów z jednego dnia zdjęciowego, w zależności od złożoności scenariuszy. Przy prostszych formatach \"mówionych do kamery\" możemy nagrać nawet więcej materiału.",
        },
        {
          question: "Ile kosztuje produkcja wideo do social media?",
          answer:
            "Pakiety zaczynają się od 2 500 PLN za dzień zdjęciowy z postprodukcją. Abonament miesięczny z regularną dostawą contentu wyceniamy indywidualnie.",
        },
        {
          question: "Czy pomagacie z koncepcją i scenariuszami?",
          answer:
            "Tak — strategia contentu, propozycje tematów i scenariusze wchodzą w zakres usługi. Nie przychodzisz z gotowym scenariuszem — przychodzisz z branżą i celami.",
        },
        {
          question: "Czy muszę występować w kadrze?",
          answer:
            "Nie — realizujemy zarówno materiały \"face-forward\" (Ty lub Twój zespół w kadrze), jak i formaty lifestyle, b-roll, animacje i hybrydy bez konieczności bycia przed kamerą.",
        },
      ],
    },
    cta: {
      headline: "Chcesz regularny content\nbez własnego studia?",
      body: "Podrzuć link do swojego profilu i opisz cele w dwóch zdaniach. Zaproponujemy strategię i wycenę pakietu dopasowanego do Twojej branży.",
      buttonText: "Wyceń pakiet wideo",
    },
  },

  // ── Video na LinkedIn ───────────────────────────────────────────────
  {
    slug: "video-linkedin",
    meta: {
      pl: {
        title: "Video na LinkedIn dla Firm Warszawa — B2B Video Marketing",
        description:
          "Produkcja profesjonalnych materiałów wideo na LinkedIn dla firm B2B w Warszawie. Buduj pozycję eksperta i generuj leady organiczne. Bezpłatna wycena.",
      },
      en: {
        title: "LinkedIn Video Production Warsaw — B2B Video Marketing",
        description:
          "Professional LinkedIn video production for B2B companies in Warsaw. Build thought leadership and generate organic leads. Free quote.",
      },
    },
    hero: {
      label: "Video na LinkedIn — Warszawa",
      headline: "VIDEO B2B\nKTÓRE BUDUJE\nAUTORYTET",
      subheadline:
        "LinkedIn nagradza twórców wideo lepszymi zasięgami organicznymi niż jakikolwiek inny format. Profesjonalne materiały wideo pozycjonują Ciebie i Twoją firmę jako ekspertów w branży — i zamieniają widzów w kontakty biznesowe.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego video na LinkedIn",
      sectionHeadline: "LIDER BRANŻY\nW KAŻDYM POŚCIE",
      items: [
        {
          label: "01 / Zasięg B2B",
          title: "Dotrzyj do decydentów bez cold mailingu",
          body: "Algorytmy wideo przyciągają uwagę na dłużej i budują głębszą relację niż szybkie skanowanie tekstu. Twoi potencjalni klienci i partnerzy są na LinkedIn — profesjonalne wideo sprawia, że zatrzymują się przy Twoim profilu.",
        },
        {
          label: "02 / Thought leadership",
          title: "Bądź twarzą swojej branży",
          body: "Regularne, merytoryczne wideo buduje pozycję eksperta szybciej niż posty tekstowe. Pokazujemy Twoją wiedzę w sposób, który angażuje, a nie nuży — bez korporacyjnej sztywności.",
        },
        {
          label: "03 / Pipeline sprzedażowy",
          title: "Content który generuje leady",
          body: "Dobrze zaplanowany cykl wideo na LinkedIn to stały kanał inbound leadów. Narracja, która prowadzi widza od \"znam tę firmę\" do \"chcę z nimi porozmawiać\".",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "JAK DZIAŁAMY",
      steps: [
        {
          number: "01",
          title: "Strategia & content plan",
          body: "Analizujemy Twój profil, branżę i grupę docelową. Budujemy plan contentu wideo — tematy, formaty, rytm publikacji — spójny z celami biznesowymi.",
        },
        {
          number: "02",
          title: "Realizacja",
          body: "Profesjonalne nagrania w Twoim biurze, plenerze lub naszym studio. Jakość obrazu i dźwięku, która wyróżnia Cię na tle amatorskich nagrań telefonem.",
        },
        {
          number: "03",
          title: "Montaż pod platformę",
          body: "Cięcia pod czas uwagi na LinkedIn, napisy, grafiki i CTA. Gotowe materiały zoptymalizowane pod algorytm platformy — w formatach kwadratowym i poziomym.",
        },
      ],
    },
    faqs: {
      sectionLabel: "03 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Ile materiałów wideo mogę publikować miesięcznie na LinkedIn?",
          answer:
            "Optymalnie 2–4 materiały wideo miesięcznie — wystarczająco, żeby budować algorytmiczną widoczność, bez przytłaczania sieci. Z jednego dnia zdjęciowego dostarczamy materiał na 4–8 tygodni publikacji.",
        },
        {
          question: "Ile kosztuje produkcja wideo na LinkedIn?",
          answer:
            "Pojedynczy materiał lub seria krótkich odcinków zaczyna się od 2 500 PLN za sesję. Abonament miesięczny z regularną dostawą contentu wyceniamy indywidualnie na podstawie częstotliwości i formatu.",
        },
        {
          question: "Czy muszę sam mówić do kamery?",
          answer:
            "To najpopularniejszy format na LinkedIn, ale nie jedyny. Tworzymy też wywiady z ekspertami, relacje z wydarzeń, materiały lifestyle i animowane explainer videos — wszystko zależy od Twojej strategii.",
        },
        {
          question: "Czy pomagacie z treścią postów towarzyszących wideo?",
          answer:
            "Skupiamy się na produkcji wideo, ale chętnie doradzimy w kwestii struktury posta, hook'u i CTA, które maksymalizują zasięg organiczny Twojego materiału na LinkedIn.",
        },
      ],
    },
    cta: {
      headline: "Twoja konkurencja\njuż publikuje wideo",
      body: "Umów się na 15-minutową rozmowę. Pokażemy przykłady z Twojej branży i zaproponujemy strategię dopasowaną do celów.",
      buttonText: "Wyceń video na LinkedIn",
    },
  },

  // ── Video case studies ──────────────────────────────────────────────
  {
    slug: "video-case-studies",
    meta: {
      pl: {
        title: "Video Case Studies Warszawa — Filmy z Referencjami Klientów",
        description:
          "Produkcja video case studies i filmów referencyjnych w Warszawie. Przekształć sukcesy klientów w przekonujące materiały sprzedażowe. Bezpłatna wycena.",
      },
      en: {
        title: "Video Case Studies Warsaw — Customer Testimonial Video Production",
        description:
          "Video case study and customer testimonial production in Warsaw. Turn your client success stories into powerful sales tools. Free quote.",
      },
    },
    hero: {
      label: "Video case studies — Warszawa",
      headline: "NIECH TWOI\nKLIENCI\nSPRZEDAJĄ ZA CIEBIE",
      subheadline:
        "Video case study to najsilniejszy dowód społeczny w procesie sprzedaży B2B. Przekształcamy historię sukcesu Twojego klienta w przekonujący materiał filmowy — autentyczny, konkretny i skuteczny na każdym etapie lejka.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego video case study",
      sectionHeadline: "DOWÓD, KTÓRY\nPRZEKONUJE",
      items: [
        {
          label: "01 / Wiarygodność",
          title: "Zbuduj zaufanie zanim klient zadzwoni",
          body: "Zdecydowana większość decydentów B2B szuka dowodu społecznego przed podpisaniem umowy. Video case study to najpotężniejsza forma referencji — autentyczny głos Twojego klienta działa lepiej niż najlepsza oferta PDF.",
        },
        {
          label: "02 / Środek lejka",
          title: "Skróć czas decyzji zakupowej",
          body: "Potencjalny klient, który widzi, jak rozwiązałeś realny problem podobnej firmy, przechodzi przez etap rozważania znacznie szybciej. Video case study domyka leady, które utknęły w pipeline.",
        },
        {
          label: "03 / Wielokanałowość",
          title: "Jeden materiał, wiele zastosowań",
          body: "Pełny case study na stronie, short-form na LinkedIn, cytat klienta w mailu sprzedażowym — jedna produkcja zasila cały lejek od awareness po zamknięcie.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "WYZWANIE.\nROZWIĄZANIE.\nWYNIKI.",
      steps: [
        {
          number: "01",
          title: "Wybór historii & przygotowanie",
          body: "Pomagamy wybrać klienta i projekt, który najlepiej ilustruje wartość Twojej firmy. Przygotowujemy pytania i briefujemy rozmówcę — żeby nagranie było naturalne, nie wyreżyserowane.",
        },
        {
          number: "02",
          title: "Realizacja",
          body: "Profesjonalne nagranie wywiadu z klientem, uzupełnione materiałem ilustracyjnym z realizacji projektu. Jakość obrazu i dźwięku na poziomie, który buduje prestiż Twojej marki.",
        },
        {
          number: "03",
          title: "Montaż & dystrybucja",
          body: "Montaż z klarowną strukturą narracyjną: wyzwanie → rozwiązanie → wyniki. Pełna wersja na stronę plus skróty gotowe do każdego kanału sprzedaży.",
        },
      ],
    },
    faqs: {
      sectionLabel: "03 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Jak przekonać klienta do udziału w video case study?",
          answer:
            "Pomagamy w tym procesie — przygotowujemy briefing dla klienta, tłumaczymy jak wygląda sesja i jakie korzyści odnosi z udziału (ekspozycja jego marki, materiał do własnych kanałów). Większość klientów chętnie uczestniczy, gdy wiedzą, że proces będzie krótki, profesjonalny, a finalny materiał wzmocni również ich własny wizerunek.",
        },
        {
          question: "Ile kosztuje video case study?",
          answer:
            "Produkcja jednego video case study zaczyna się od 4 500 PLN i obejmuje nagranie wywiadu, materiał ilustracyjny i pełną postprodukcję. Pakiety kilku case studies wyceniamy korzystniej.",
        },
        {
          question: "Jak długo powinno trwać video case study?",
          answer:
            "Pełna wersja: 2–4 minuty (na stronę www, prezentacje). Skrócona wersja: 60–90 sekund (LinkedIn, e-mail sprzedażowy). Dostarczamy obie — z jednej produkcji.",
        },
        {
          question: "Czy klient musi być obecny na planie?",
          answer:
            "Wywiad z klientem to serce case study, więc tak — ale organizujemy sesję w miejscu wygodnym dla rozmówcy: jego biuro, Twoje biuro lub neutralna lokacja. Dbamy o to, żeby czuł się komfortowo.",
        },
      ],
    },
    cta: {
      headline: "Zamień swoje\nnajlepsze realizacje\nw narzędzie sprzedaży",
      body: "Masz klienta, który byłby dobrym bohaterem case study? Napisz — przygotujemy propozycję narracji i wycenę.",
      buttonText: "Wyceń video case study",
    },
  },

  // ── Wywiady eksperckie ──────────────────────────────────────────────
  {
    slug: "wywiady-eksperckie",
    meta: {
      pl: {
        title: "Wywiady Eksperckie Warszawa — Profesjonalne Nagrania Wywiadów",
        description:
          "Profesjonalna produkcja wywiadów eksperckich i wypowiedzi branżowych w Warszawie. Buduj autorytet i pozycję eksperta przez wartościowe rozmowy. Bezpłatna wycena.",
      },
      en: {
        title: "Expert Interview Video Production Warsaw",
        description:
          "Professional expert interview and thought leadership video production in Warsaw. Build authority through valuable industry conversations. Free quote.",
      },
    },
    hero: {
      label: "Wywiady eksperckie — Warszawa",
      headline: "ROZMOWY\nKTÓRE BUDUJĄ\nAUTORYTET",
      subheadline:
        "Wywiad ekspercki to jedno z najskuteczniejszych narzędzi budowania pozycji w branży. Profesjonalnie zrealizowane rozmowy — z Tobą, Twoim zespołem lub gośćmi zewnętrznymi — dają content, który angażuje, edukuje i buduje zaufanie do Twojej marki.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego wywiady eksperckie",
      sectionHeadline: "WIEDZA\nW PREMIUM\nOPRAWIE",
      items: [
        {
          label: "01 / Autorytet",
          title: "Bądź głosem swojej branży",
          body: "Regularne wywiady eksperckie budują wizerunek thought leadera szybciej niż posty tekstowe czy artykuły. Twoja wiedza, oprawiona profesjonalnym obrazem i dźwiękiem, dociera do odbiorców z zupełnie inną siłą.",
        },
        {
          label: "02 / Cross-marketing",
          title: "Rozszerz zasięg przez sieć gości",
          body: "Każdy zaproszony ekspert to dostęp do jego sieci kontaktów. Wywiad, który publikujesz, trafia też do jego obserwujących — organicznie zwiększając zasięg Twojej marki bez kosztów reklamowych.",
        },
        {
          label: "03 / Recykling contentu",
          title: "Jeden wywiad, tygodnie materiału",
          body: "Z jednego wywiadu wyciągamy: pełny odcinek, kilka short-formów na social media, cytaty do postów tekstowych i fragmenty do newslettera. Jedna sesja nagraniowa zasila kanały na tygodnie.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "TEMAT. KAMERA.\nPUBLIKACJA.",
      steps: [
        {
          number: "01",
          title: "Przygotowanie & briefing",
          body: "Ustalamy temat, format i pytania. Briefujemy rozmówcę tak, żeby czuł się komfortowo przed kamerą. Planujemy setup wizualny dopasowany do charakteru rozmowy.",
        },
        {
          number: "02",
          title: "Realizacja",
          body: "Profesjonalne nagranie: studyjna jakość dźwięku, premium obraz i oświetlenie, które buduje klimat — nie sterylne studio korporacyjne. Prowadzący lub swobodna rozmowa — w zależności od formatu.",
        },
        {
          number: "03",
          title: "Postprodukcja & formaty",
          body: "Montaż pełnej rozmowy, wycinki short-form, napisy i grafiki. Gotowe materiały pod YouTube, LinkedIn, Instagram i podcast wideo.",
        },
      ],
    },
    faqs: {
      sectionLabel: "03 / FAQ",
      sectionHeadline: "NAJCZĘSTSZE\nPYTANIA",
      items: [
        {
          question: "Ile kosztuje realizacja wywiadu eksperckiego?",
          answer:
            "Nagranie jednego wywiadu z postprodukcją zaczyna się od 2 500 PLN. Pakiety serii wywiadów (np. 4–6 odcinków) wyceniamy korzystniej — idealne dla regularnych formatów podcastowych lub serii contentowych.",
        },
        {
          question: "Gdzie realizujecie wywiady?",
          answer:
            "W Twoim biurze, na evencie, w plenerze lub w profesjonalnej przestrzeni studia — dobieramy lokację do charakteru rozmowy i estetyki Twojej marki. Lubimy unikać sterylnych białych tłów.",
        },
        {
          question: "Czy możecie pomóc w przygotowaniu pytań i scenariusza?",
          answer:
            "Tak — przygotowanie pytań, struktura rozmowy i briefing rozmówcy wchodzą w zakres produkcji. Dbamy o to, żeby wywiad był naturalny i merytoryczny, a nie wyrecytowany.",
        },
        {
          question: "Czy wywiad można realizować zdalnie?",
          answer:
            "Tak — realizujemy wywiady zdalne z profesjonalnym setupem po stronie prowadzącego i zestawem instrukcji dla gościa, który nagrywa u siebie. Jakość finalnego materiału jest znacznie wyższa niż standardowe nagrania Teams/Zoom.",
        },
      ],
    },
    cta: {
      headline: "Masz temat?\nMy mamy studio",
      body: "Opisz format, który Ci się marzy — seria, jednorazowy odcinek, podcast wideo. Wrócimy z propozycją setupu i wyceny.",
      buttonText: "Wyceń wywiad ekspercki",
    },
  },
]

/** Look up a service page by its URL slug. */
export function getServicePage(slug: string): ServicePageData | undefined {
  return servicePages.find((p) => p.slug === slug)
}
