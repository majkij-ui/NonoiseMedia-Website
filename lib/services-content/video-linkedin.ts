import type { ServicePageData } from "../service-pages"

export const videoLinkedin: ServicePageData = {
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
} as ServicePageData
