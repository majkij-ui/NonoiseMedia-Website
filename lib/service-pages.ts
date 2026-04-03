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
  /** id matching a project from lib/projects.ts */
  featuredProjectId: number
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
        "Tworzymy filmy korporacyjne, które nie kończą jako zapomniany link w intranecie. Każdy kadr ma za zadanie budować zaufanie, wzmacniać wizerunek i realnie wspierać cele Twojej firmy — od employer brandingu po komunikację z inwestorami.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film korporacyjny",
      sectionHeadline: "INWESTYCJA, KTÓRA SIĘ ZWRACA",
      items: [
        {
          label: "01 / Wiarygodność",
          title: "Buduj zaufanie od pierwszego kadru",
          body: "Profesjonalny film korporacyjny to Twoja wizytówka w spotkaniach z partnerami, inwestorami i klientami. Wysokiej klasy obraz natychmiast buduje percepcję jakości i solidności Twojej firmy.",
        },
        {
          label: "02 / Wielokanałowość",
          title: "Jeden film, dziesiątki zastosowań",
          body: "Strona internetowa, LinkedIn, prezentacje handlowe, targi, onboarding — film korporacyjny pracuje w każdym punkcie styku z odbiorcą. Dostarczamy materiały w formatach zoptymalizowanych pod każdy kanał.",
        },
        {
          label: "03 / Emocje i dane",
          title: "Połącz storytelling z twardymi faktami",
          body: "Łączymy emocjonalną narrację z konkretnymi danymi i wynikami Twojej firmy. Efekt? Przekaz, który angażuje i jednocześnie przekonuje do działania.",
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
          body: "Analizujemy Twoją markę, cele i grupę docelową. Definiujemy przekaz, ton narracji i KPI filmu. Tworzymy moodboard i szczegółowy scenariusz.",
        },
        {
          number: "02",
          title: "Produkcja",
          body: "Profesjonalna ekipa, sprzęt klasy kinowej i precyzyjnie zaplanowany plan zdjęciowy. Elastycznie dopasowujemy wielkość ekipy do skali projektu.",
        },
        {
          number: "03",
          title: "Postprodukcja & dostawa",
          body: "Montaż, korekcja barwna, udźwiękowienie i motion design. Dostarczamy gotowe materiały w formatach dopasowanych do każdego kanału dystrybucji.",
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
            "Cena zależy od skali projektu — liczby lokacji, dni zdjęciowych i zakresu postprodukcji. Pojedyncze zlecenia zaczynają się od 4 000 PLN. Przygotujemy bezpłatną wycenę dopasowaną do Twojego budżetu i celów.",
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
            "Tak. Każdy projekt zaczynamy od warsztatu strategicznego, na którym wspólnie definiujemy cel, przekaz i grupę docelową. Scenariusz i moodboard to integralna część naszej usługi.",
        },
      ],
    },
    cta: {
      headline: "Gotowy na film korporacyjny\nna najwyższym poziomie?",
      body: "Opowiedz nam o swoim projekcie. Przygotujemy bezpłatną propozycję dopasowaną do Twoich celów i budżetu.",
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
        "Tworzymy spoty reklamowe i kampanie wideo, które nie giną w szumie. Od 15-sekundowych reelsów po pełne kampanie multiplatformowe — każdy format projektujemy pod konkretny cel: kliknięcie, zapis, zakup.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film reklamowy",
      sectionHeadline: "REKLAMA, KTÓRA KONWERTUJE",
      items: [
        {
          label: "01 / Performance",
          title: "Projektowane pod konwersję",
          body: "Każdy spot budujemy wokół jasnego CTA i mierzalnego celu. Znamy mechanikę platform reklamowych — od hook'ów po retargeting — i tworzymy kreacje, które realnie wpływają na ROAS.",
        },
        {
          label: "02 / Wieloformat",
          title: "Jeden shoot, pełna kampania",
          body: "Z jednego dnia zdjęciowego dostarczamy kreacje w formatach 9:16, 1:1 i 16:9 — gotowe na Instagram, TikTok, YouTube, LinkedIn i display. Maksymalizujemy zwrot z każdej złotówki produkcyjnej.",
        },
        {
          label: "03 / Szybkość",
          title: "Od briefu do publikacji w 7 dni",
          body: "Wiemy, że kampanie mają deadline'y. Nasza optymalizacja procesów pozwala dostarczać gotowe kreacje w trybie ekspresowym — bez kompromisów w jakości obrazu.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "OD KONCEPTU\nDO KONWERSJI",
      steps: [
        {
          number: "01",
          title: "Brief & koncept kreatywny",
          body: "Analizujemy Twój produkt, grupę docelową i platformę. Proponujemy koncepty kreatywne z hook'ami i wariantami pod testy A/B.",
        },
        {
          number: "02",
          title: "Produkcja zoptymalizowana",
          body: "Zwinne ekipy, szybki setup, maksimum ujęć w minimum czasu. Nagrywamy warianty pod różne formaty i platformy w jednym dniu zdjęciowym.",
        },
        {
          number: "03",
          title: "Postprodukcja & iteracja",
          body: "Dynamiczny montaż, motion graphics i udźwiękowienie. Dostarczamy warianty kreacji gotowe do testowania. Iterujemy na podstawie wyników kampanii.",
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
      headline: "Twoja reklama zasługuje\nna kinową jakość",
      body: "Opowiedz nam o kampanii. Zaproponujemy koncept kreatywny i wycenę dopasowaną do Twoich celów performance.",
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
        "Film wizerunkowy to nie ozdobnik — to fundament komunikacji Twojej marki. Tworzymy kinowe produkcje, które oddają esencję firmy, budują emocjonalną więź z odbiorcą i podnoszą percepcję jakości na lata.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film wizerunkowy",
      sectionHeadline: "OPOWIEDZ SWOJĄ HISTORIĘ",
      items: [
        {
          label: "01 / Percepcja marki",
          title: "Podnieś wartość swojego brandu",
          body: "Profesjonalny film wizerunkowy natychmiast zmienia sposób, w jaki klienci, partnerzy i inwestorzy postrzegają Twoją firmę. Kinowa jakość = percepcja premium.",
        },
        {
          label: "02 / Emocjonalna więź",
          title: "Połącz się z odbiorcą na głębszym poziomie",
          body: "Dane przekonują, ale emocje sprzedają. Film wizerunkowy to medium, które buduje autentyczną więź między Twoją marką a ludźmi — więź, której nie da się zbudować tekstem ani zdjęciem.",
        },
        {
          label: "03 / Trwałość",
          title: "Inwestycja na lata, nie na sezon",
          body: "Dobrze zrealizowany film wizerunkowy pracuje przez lata — na stronie, w prezentacjach, na eventach i w social media. To najdłużej żyjący element Twojej strategii contentowej.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "WIZJA STAJE SIĘ\nRZECZYWISTOŚCIĄ",
      steps: [
        {
          number: "01",
          title: "Immersja w markę",
          body: "Zanurzamy się w DNA Twojej firmy — wartości, kultura, wyróżniki. Budujemy narrację, która jest autentyczna i jednocześnie strategicznie precyzyjna.",
        },
        {
          number: "02",
          title: "Kinowa produkcja",
          body: "Sprzęt klasy kinowej, starannie dobrane lokacje i reżyseria nakierowana na emocje. Każdy kadr jest świadomie zaplanowany pod kątem estetyki i przekazu.",
        },
        {
          number: "03",
          title: "Finalna perfekcja",
          body: "Precyzyjna korekcja barwna, profesjonalne udźwiękowienie i motion design. Dostarczamy materiał, który budzi emocje i spełnia najwyższe standardy techniczne.",
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
      body: "Opowiedz nam o swojej wizji. Stworzymy film, który będzie pracował na Twój wizerunek przez lata.",
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
          "Produkcja filmów produktowych w Warszawie. Dynamiczne prezentacje produktów, unboxingi i filmy e-commerce z kinową jakością. Bezpłatna wycena.",
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
        "Tworzymy filmy produktowe, które zamieniają przeglądarki w kupujących. Dynamiczne ujęcia, precyzyjne oświetlenie i montaż nastawiony na konwersję — pokażemy Twój produkt tak, jak zasługuje.",
      ctaText: "Bezpłatna wycena",
    },
    benefits: {
      sectionLabel: "01 / Dlaczego film produktowy",
      sectionHeadline: "OBRAZ SPRZEDAJE\nLEPIEJ NIŻ OPIS",
      items: [
        {
          label: "01 / Konwersja",
          title: "Zwiększ sprzedaż o dziesiątki procent",
          body: "Wideo produktowe na stronie zwiększa współczynnik konwersji nawet o 80%. Klienci, którzy oglądają film produktowy, kupują szybciej i pewniej — bo widzą dokładnie to, co dostają.",
        },
        {
          label: "02 / Detale",
          title: "Pokaż to, czego zdjęcie nie pokaże",
          body: "Faktura materiału, mechanizm działania, skala i proporcje — film produktowy oddaje detale, które tracą się w fotografii. Twój produkt ożywa w oczach klienta.",
        },
        {
          label: "03 / Kontekst",
          title: "Produkt w naturalnym środowisku",
          body: "Pokazujemy Twój produkt w użyciu — w realnym kontekście, z prawdziwymi ludźmi. Klient nie kupuje przedmiotu; kupuje doświadczenie, które za nim stoi.",
        },
      ],
    },
    process: {
      sectionLabel: "02 / Jak pracujemy",
      sectionHeadline: "OD PRODUKTU\nDO KONWERSJI",
      steps: [
        {
          number: "01",
          title: "Analiza produktu & brief",
          body: "Poznajemy Twój produkt, jego wyróżniki i grupę docelową. Planujemy ujęcia, lokacje i styl wizualny — od minimalistycznego studio po dynamiczne lifestyle.",
        },
        {
          number: "02",
          title: "Sesja zdjęciowa",
          body: "Precyzyjne oświetlenie, makro detale, dynamiczne ujęcia ruchowe i FPV. Nagrywamy warianty pod e-commerce, social media i stronę produktu.",
        },
        {
          number: "03",
          title: "Montaż & optymalizacja",
          body: "Rytmiczny montaż, animacje i korekcja barwna. Dostarczamy warianty pod każdy format i platformę — od hero video po karuzele produktowe.",
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
      body: "Opowiedz nam o swoim produkcie. Stworzymy wideo, które konwertuje przeglądarki w klientów.",
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
          "Profesjonalna realizacja reportaży eventowych w Warszawie. Filmujemy konferencje, eventy korporacyjne i spotkania branżowe z dyskrecją i kinową jakością. Bezpłatna wycena.",
      },
      en: {
        title: "Event Coverage Warsaw — Corporate Event Video Production",
        description:
          "Professional event video production in Warsaw. Conferences, corporate events and industry gatherings filmed with discretion and cinematic quality. Free quote.",
      },
    },
    hero: {
      label: "Reportaż eventowy Warszawa",
      headline: "TWÓJ EVENT\nZASŁUGUJE NA\nWIECZNOŚĆ",
      subheadline:
        "Profesjonalny reportaż eventowy przedłuża życie Twojego wydarzenia daleko poza salę konferencyjną. Filmujemy konferencje, eventy korporacyjne i spotkania branżowe z dyskrecją, wielokamerowym setupem i kinową jakością — bez zakłócania atmosfery.",
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
          body: "Z jednego eventu dostarczamy: pełny reportaż, highlight reel na social media, wycinki z wywiadów eksperckich i relacje w formatach 9:16 i 1:1. Maksimum contentu z jednego dnia produkcji.",
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
      sectionHeadline: "OD PLANU\nDO PREMIERY",
      steps: [
        {
          number: "01",
          title: "Przygotowanie & scouting",
          body: "Analizujemy program eventu, mapujemy kluczowe momenty i planujemy pozycje kamer. Koordynujemy z organizatorem, by być niewidoczni — a jednocześnie wszechobecni.",
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
      sectionHeadline: "EVENT NA ŻYWO,\nKINOWY EFEKT",
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
            "Tak — mamy duże doświadczenie w dokumentowaniu zamkniętych spotkań C-level, negocjacji i wydarzeń objętych NDA. Dyskrecja i poufność to integralna część naszej usługi.",
        },
        {
          question: "Jakie formaty wideo dostarczacie po evencie?",
          answer:
            "Pełny reportaż (3–10 min), highlight reel (60–90 sek.), wywiady eksperckie jako osobne klipy oraz formaty vertical i square na Instagram, LinkedIn i TikTok — wszystko z jednej produkcji.",
        },
      ],
    },
    cta: {
      headline: "Masz event?\nZadokumentujmy go razem",
      body: "Opowiedz nam o swoim wydarzeniu. Przygotujemy propozycję dopasowaną do skali, formatu i budżetu.",
      buttonText: "Wyceń reportaż",
    },
  },
]

/** Look up a service page by its URL slug. */
export function getServicePage(slug: string): ServicePageData | undefined {
  return servicePages.find((p) => p.slug === slug)
}
