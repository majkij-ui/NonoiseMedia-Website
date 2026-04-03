import type { ServicePageData } from "../service-pages"

export const videoCaseStudies: ServicePageData = {
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
} as ServicePageData
