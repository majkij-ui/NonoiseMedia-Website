import type { ServicePageData } from "../service-pages"

export const reportazEventowy: ServicePageData = {
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
}
