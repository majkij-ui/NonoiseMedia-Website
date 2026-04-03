import type { ServicePageData } from "../service-pages"

export const filmyReklamowe: ServicePageData = {
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
}
