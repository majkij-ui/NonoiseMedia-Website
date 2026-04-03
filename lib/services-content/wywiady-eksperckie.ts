import type { ServicePageData } from "../service-pages"

export const wywiadyEksperckie: ServicePageData = {
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
} as ServicePageData
