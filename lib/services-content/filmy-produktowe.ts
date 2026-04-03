import type { ServicePageData } from "../service-pages"

export const filmyProduktowe: ServicePageData = {
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
}
