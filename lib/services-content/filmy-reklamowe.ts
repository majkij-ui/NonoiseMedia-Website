import type { ServicePageData } from "../service-pages"

export const filmyReklamowe: ServicePageData = {
  slug: "filmy-reklamowe",
  tile: "commercial",
  meta: {
    pl: {
      title: "Filmy Reklamowe Warszawa — Spoty i Kampanie Wideo",
      description:
        "Produkcja filmów reklamowych i spotów wideo w Warszawie. Spoty na social media, filmy produktowe, kampanie YouTube i reklamy nastawione na konwersję. Bezpłatna wycena.",
    },
    en: {
      title: "Commercial Video Production Warsaw — Ads & Campaigns",
      description:
        "Commercial video production in Warsaw. Social media ads, product films, YouTube campaigns and performance-driven video spots. Free quote.",
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
        body: "Każdy spot budujemy wokół jasnego CTA i mierzalnego celu. Znamy mechanikę platform reklamowych — od hook'ów po retargeting — i dostarczamy kreacje dopasowane do tego, gdzie będą emitowane.",
      },
      {
        label: "02 / Wieloformat",
        title: "Jeden shoot, pełna kampania",
        body: "Jeden dzień zdjęciowy, kreacje w formatach 9:16, 1:1 i 16:9 — gotowe na Instagram, TikTok, YouTube, LinkedIn i display. Maksymalny zwrot z budżetu produkcyjnego.",
      },
      {
        label: "03 / Szybkość",
        title: "Kampanie mają deadline'y. My też.",
        body: "Zoptymalizowane procesy pozwalają nam dostarczać pierwszą wersję do 10 dni roboczych od zdjęć, a w trybie przyspieszonym (5 dni roboczych, dopłata od 800 zł netto) jeszcze szybciej — bez kompromisów w jakości obrazu.",
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
        body: "Analizujemy Twój produkt, grupę docelową i platformę. Proponujemy koncepty kreatywne z hook'ami i wariantami kreacji.",
      },
      {
        number: "02",
        title: "Zoptymalizowany plan zdjęciowy",
        body: "Pracujemy zwinnie i konkretnie. Szanujemy czas Twojego zespołu, realizując precyzyjnie zaplanowane ujęcia pod wiele formatów w ciągu jednego dnia.",
      },
      {
        number: "03",
        title: "Postprodukcja & iteracja",
        body: "Dynamiczny montaż, motion graphics i udźwiękowienie. Warianty kreacji gotowe do emisji.",
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
          "Filmy reklamowe zaczynają się od 15 000 zł netto. Pełne kampanie multiplatformowe z wieloma wariantami wyceniamy indywidualnie. Zawsze dopasowujemy zakres do budżetu reklamowego klienta.",
      },
      {
        question: "Ile wariantów kreacji dostarczacie?",
        answer:
          "Standardowo dostarczamy 3–5 wariantów (różne hook'i, CTA, długości) w formatach pionowym, kwadratowym i poziomym.",
      },
      {
        question: "Czy pomagacie z konceptem kreatywnym?",
        answer:
          "Tak — od analizy konkurencji i grupy docelowej po propozycję hook'ów, scenariuszy i storyboardów. Możemy też pracować na briefie Twojej agencji.",
      },
      {
        question: "Jak szybko mogę otrzymać gotowy materiał?",
        answer:
          "Pierwszą wersję montażu dostajesz do 10 dni roboczych od zdjęć. W trybie przyspieszonym: 5 dni roboczych, za dopłatą od 800 zł netto. Termin ustalamy przy pierwszej rozmowie.",
      },
      {
        question: "Czy realizujecie też filmy produktowe?",
        answer:
          "Tak. Film produktowy realizujemy w studiu albo w plenerze: minimalistyczne tło studyjne dla technologii, naturalne otoczenie dla produktów lifestyle. Często łączymy oba podejścia w jednej produkcji.",
      },
    ],
  },
  cta: {
    headline: "Masz brief?\nZróbmy z niego kampanię",
    body: "Prześlij brief lub opisz cel kampanii w dwóch zdaniach. Odpowiadamy w ciągu 24 godzin w dni robocze, a szczegółową wycenę wysyłamy w 1–3 dni robocze po rozmowie.",
    buttonText: "Wyceń kampanię",
  },
}
