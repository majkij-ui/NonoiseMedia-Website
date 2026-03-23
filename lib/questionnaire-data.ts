import type { QuestionnaireContent } from "@/components/questionnaire/types"

export const questionnairePl: QuestionnaireContent = {
  header: {
    title: "Zbudujmy Twój projekt",
    subtitle:
      "Z doświadczenia wiemy, że najlepsze produkcje powstają, gdy od początku gramy do tej samej bramki. Kilka szybkich odpowiedzi — i możemy przejść do konkretów: formatu, ekipy i realnej skali.",
    startCta: "Rozpocznij",
  },
  sections: [
    {
      id: "category",
      title: "Co robimy?",
      description:
        "Wybierz kategorię, która najlepiej opisuje projekt — od e-commerce po B2B i lifestyle.",
      type: "radio",
      options: [
        { id: "cat-product", label: "Produkt / e-commerce" },
        { id: "cat-brand", label: "Marka / usługa B2B" },
        { id: "cat-event", label: "Wydarzenie / dokument" },
        { id: "cat-interview", label: "Wywiady / podcasty" },
        { id: "cat-other", label: "Inne (napisz nam)", hasInput: true },
      ],
    },
    {
      id: "distribution",
      title: "Cel i dystrybucja",
      description:
        "Gdzie materiał ma działać najmocniej? To pomaga dobrać format (pion, poziom, długość).",
      type: "radio",
      options: [
        { id: "dist-social", label: "TikTok / Reels / Shorts" },
        { id: "dist-youtube-ads", label: "YouTube — reklamy / kampanie wideo" },
        { id: "dist-web-hero", label: "Strona www — sekcja hero / landing" },
        {
          id: "dist-ecom",
          label: "E-commerce — karta produktu, sklep, marketplace",
        },
        {
          id: "dist-internal",
          label: "Komunikacja wewnętrzna / B2B (prezentacje, szkolenia, event)",
        },
        { id: "dist-other", label: "Inne (doprecyzuj)", hasInput: true },
      ],
    },
    {
      id: "location",
      title: "Plan zdjęciowy — lokalizacja",
      description: "Lokalizacja wpływa na logistykę, ekipę i koszt dojazdu.",
      type: "radio",
      options: [
        { id: "loc-local", label: "Moje miasto / u nas na miejscu" },
        { id: "loc-pl-other", label: "Inne miasto w Polsce" },
        { id: "loc-abroad", label: "Za granicą" },
        { id: "loc-studio", label: "Potrzebuję studia / hali / pleneru kontrolowanego" },
      ],
    },
    {
      id: "timeline",
      title: "Kiedy nagrywamy?",
      description: "Chodzi o realny termin planu zdjęciowego, nie tylko premiery.",
      type: "radio",
      options: [
        { id: "time-asap", label: "Jak najszybciej (ASAP)" },
        { id: "time-month", label: "W ciągu najbliższego miesiąca" },
        { id: "time-quarter", label: "Za 2–3 miesiące" },
        { id: "time-quote", label: "Na razie tylko wycena / plan na później" },
      ],
    },
    {
      id: "deliverables",
      title: "Skala materiałów",
      description: "Czy to jeden flagowy film, pakiet pod social, czy dłuższa współpraca?",
      type: "radio",
      options: [
        { id: "del-one", label: "Jeden główny, dopracowany film" },
        {
          id: "del-pack",
          label: "Główny film + krótsze wersje / cutdowny pod social",
        },
        {
          id: "del-batch",
          label: "Duża paczka treści lub retainer (regularne dostawy)",
        },
      ],
    },
    {
      id: "budget",
      title: "Budżet i model współpracy",
      description:
        "Orientacyjny przedział pomaga dobrać skalę produkcji — bez zobowiązań.",
      type: "radio",
      options: [
        { id: "bud-under-10k", label: "Poniżej 10 000 PLN" },
        { id: "bud-10-25k", label: "10 000 – 25 000 PLN" },
        { id: "bud-over-25k", label: "Powyżej 25 000 PLN" },
        {
          id: "bud-retainer",
          label: "Retainer / długofalowa współpraca (wycena indywidualna)",
        },
        {
          id: "bud-consult",
          label: "Nie wiem jeszcze — potrzebuję konsultacji i propozycji",
        },
      ],
    },
    {
      id: "additional",
      title: "Dodatkowe informacje",
      description: "Zostaw puste, jeśli wolisz omówić to na rozmowie.",
      type: "textarea",
      questions: [
        {
          id: "additional-notes",
          label:
            "Linki do inspiracji, produktu, brandbooka albo krótki kontekst — cokolwiek pomoże nam zrozumieć projekt.",
          placeholder: "Opcjonalnie: linki, uwagi, ograniczenia…",
        },
      ],
    },
  ],
  contact: {
    title: "Ostatni krok — kontakt",
    email: "E-mail",
    phone: "Telefon",
    nameLabel: "Imię i nazwisko lub firma",
    namePlaceholder: "Np. Jan Kowalski / Nazwa spółki",
    sendButton: "Wyślij zapytanie",
    missingContact: "Uzupełnij dane kontaktowe",
    submitting: "Wysyłanie…",
    success: "Wysłano — odezwiemy się wkrótce.",
    error: "Coś poszło nie tak. Spróbuj ponownie.",
  },
}

export const questionnaireEn: QuestionnaireContent = {
  header: {
    title: "Let's scope your project",
    subtitle:
      "The best work starts aligned on goals and constraints. A few quick choices help us move straight to format, crew, and a realistic scope.",
    startCta: "Start",
  },
  sections: [
    {
      id: "category",
      title: "What are we making?",
      description:
        "Pick the category that fits best — from e‑commerce and B2B to events and podcasts.",
      type: "radio",
      options: [
        { id: "cat-product", label: "Product / e‑commerce" },
        { id: "cat-brand", label: "Brand / B2B service" },
        { id: "cat-event", label: "Event / documentary" },
        { id: "cat-interview", label: "Interviews / podcasts" },
        { id: "cat-other", label: "Other (tell us)", hasInput: true },
      ],
    },
    {
      id: "distribution",
      title: "Goal and distribution",
      description:
        "Where should this piece work hardest? That drives aspect ratio, length, and cutdowns.",
      type: "radio",
      options: [
        { id: "dist-social", label: "TikTok / Reels / Shorts" },
        { id: "dist-youtube-ads", label: "YouTube — ads / video campaigns" },
        { id: "dist-web-hero", label: "Website — hero / landing section" },
        {
          id: "dist-ecom",
          label: "E‑commerce — product page, store, marketplace",
        },
        {
          id: "dist-internal",
          label: "Internal / B2B (training, decks, events)",
        },
        { id: "dist-other", label: "Other (specify)", hasInput: true },
      ],
    },
    {
      id: "location",
      title: "Shoot location",
      description: "Location affects logistics, crew, and travel.",
      type: "radio",
      options: [
        { id: "loc-local", label: "My city / on our premises" },
        { id: "loc-pl-other", label: "Another city in Poland" },
        { id: "loc-abroad", label: "Abroad" },
        { id: "loc-studio", label: "I need a studio / stage / controlled set" },
      ],
    },
    {
      id: "timeline",
      title: "Expected shoot timing",
      description: "Rough timing for the shoot itself, not only the final delivery.",
      type: "radio",
      options: [
        { id: "time-asap", label: "As soon as possible" },
        { id: "time-month", label: "Within the next month" },
        { id: "time-quarter", label: "In 2–3 months" },
        { id: "time-quote", label: "Just exploring — quote for later" },
      ],
    },
    {
      id: "deliverables",
      title: "Deliverables volume",
      description: "One hero film, a pack for social, or ongoing content?",
      type: "radio",
      options: [
        { id: "del-one", label: "One main, polished film" },
        {
          id: "del-pack",
          label: "Main film + shorter cutdowns for social",
        },
        {
          id: "del-batch",
          label: "Large batch of content or retainer (ongoing)",
        },
      ],
    },
    {
      id: "budget",
      title: "Budget and collaboration model",
      description:
        "A rough range helps us match production scale — no commitment.",
      type: "radio",
      options: [
        { id: "bud-under-10k", label: "Under 10,000 PLN" },
        { id: "bud-10-25k", label: "10,000 – 25,000 PLN" },
        { id: "bud-over-25k", label: "Over 25,000 PLN" },
        {
          id: "bud-retainer",
          label: "Retainer / long-term (custom quote)",
        },
        {
          id: "bud-consult",
          label: "Not sure yet — need a consult and options",
        },
      ],
    },
    {
      id: "additional",
      title: "Anything else?",
      description: "Skip if you prefer to cover this on a call.",
      type: "textarea",
      questions: [
        {
          id: "additional-notes",
          label:
            "Reference links, product page, brand guidelines, or quick context — whatever helps us understand the job.",
          placeholder: "Optional: links, notes, constraints…",
        },
      ],
    },
  ],
  contact: {
    title: "Last step — your contact",
    email: "Email",
    phone: "Phone",
    nameLabel: "Name or company",
    namePlaceholder: "e.g. Jane Doe / Company Ltd.",
    sendButton: "Send inquiry",
    missingContact: "Please add contact details",
    submitting: "Sending…",
    success: "Sent — we'll get back to you soon.",
    error: "Something went wrong. Please try again.",
  },
}
