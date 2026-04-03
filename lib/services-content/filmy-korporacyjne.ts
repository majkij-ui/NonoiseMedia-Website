import type { ServicePageData } from "../service-pages"

export const filmyKorporacyjne: ServicePageData = {
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
}
