/**
 * Client testimonials, shared by /about (full-screen slides) and the paid
 * landing page (three compact cards).
 *
 * A testimonial marked `pendingConsent` is a draft the author has not approved
 * yet. Drafts are kept out of the repository and out of production: see
 * PENDING_TESTIMONIALS below.
 */

export type TestimonialBrand = "CIONET" | "BAKL" | "Rondo" | "OmniOffice" | "PHH" | "Morris & Lloyd"

export type Testimonial = {
  /** Section label, e.g. "DE GROUP - CIONET". */
  company: string
  text: string
  author: string
  /** Empty when not known yet. */
  role: string
  /** Matches a name in `trustedBy` (lib/projects.ts) for the logo. */
  brand: TestimonialBrand
  lang: "pl" | "en"
  /** Shown on the landing page, in this order. */
  onLandingPage?: boolean
  pendingConsent?: boolean
}

/**
 * Drafts awaiting the author's consent are NOT in this repository (it is
 * public): they come from the `DRAFT_TESTIMONIALS` environment variable, a
 * JSON array of testimonials, set in `.env.local` and, if wanted, in Vercel's
 * Preview environment. Example:
 *
 *   DRAFT_TESTIMONIALS='[{"company":"CLIENT NAME","text":"…","author":"…","role":"","brand":"Morris & Lloyd","lang":"pl","onLandingPage":true}]'
 *
 * next.config.mjs passes the value on as `NEXT_PUBLIC_DRAFT_TESTIMONIALS` only
 * in local development and on Vercel previews; in a production build it is
 * always the empty string, so the check below folds away and nothing ships.
 */
function parseDrafts(raw: string): Testimonial[] {
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (t): t is Testimonial =>
          typeof t?.company === "string" && typeof t?.text === "string" && typeof t?.author === "string",
      )
      .map((t) => ({ ...t, role: typeof t.role === "string" ? t.role : "", pendingConsent: true }))
  } catch {
    return []
  }
}

const PENDING_TESTIMONIALS: Testimonial[] = process.env.NEXT_PUBLIC_DRAFT_TESTIMONIALS
  ? parseDrafts(process.env.NEXT_PUBLIC_DRAFT_TESTIMONIALS)
  : []

const APPROVED_TESTIMONIALS: Testimonial[] = [
  {
    company: "DE GROUP - CIONET",
    text: "Firma Nonoise Media idealnie odnajduje się w pracy z kadrą zarządzającą C-level, zapewniając obsługę naszych wydarzeń z pełną dyskrecją i wyjątkową estetyką. Pan Michał wykazuje się głębokim zrozumieniem naszych celów biznesowych oraz ogromną proaktywnością w działaniu. To elastyczny i rzetelny partner, z którym z powodzeniem współpracujemy długoterminowo.",
    author: "Martyna Mayer",
    role: "Senior Project Manager",
    brand: "CIONET",
    lang: "pl",
    onLandingPage: true,
  },
  {
    company: "BIG AIR KITE CENTER - BAKL",
    text: "Nonoise Media completely excels at capturing dynamic sports action in highly demanding outdoor conditions. Their technical excellence, creativity, and high professionalism significantly supported our marketing activities and social media campaigns. They are a truly reliable and highly creative business partner.",
    author: "Michael MacDonald",
    role: "Founder",
    brand: "BAKL",
    lang: "en",
  },
  {
    company: "7 ANNA GROUP - RONDO",
    text: "Jako bezpośredni koordynator naszych projektów wideo, mogę z pełnym przekonaniem polecić zespół Nonoise Media. Doskonale poradzili sobie z produkcją dynamicznych spotów reklamowych naszych rowerów, idealnie trafiając w nasze potrzeby. To profesjonaliści, którzy realizują zlecenia należycie, w terminie i w pełnej zgodności z wymaganiami marki.",
    author: "Marcin Jurasz",
    role: "Marketing Manager",
    brand: "Rondo",
    lang: "pl",
  },
  {
    company: "OMNI OFFICE",
    text: "Współpraca z firmą Nonoise Media przy naszej kampanii reklamowej przebiegła bezproblemowo. Mimo skomplikowanej logistyki i trudnych warunków zdjęciowych, niezwykle sprawnie zrealizowali materiał w naszych sześciu warszawskich biurach w zaledwie dwa dni. Z pełnym przekonaniem polecam ten zespół.",
    author: "Joanna Stychno",
    role: "Marketing Manager",
    brand: "OmniOffice",
    lang: "pl",
    onLandingPage: true,
  },
  {
    company: "POLSKI HOLDING HOTELOWY",
    text: "Nonoise Media to partner, który potrafi połączyć najwyższą, kinową jakość obrazu z perfekcyjną organizacją pracy. Mimo napiętego harmonogramu i wymagającej logistyki w wielu lokacjach, zespół Pana Michała wykazał się niesamowitą elastycznością oraz pełnym zrozumieniem wizji naszego nowego wizerunku. Otrzymaliśmy produkt klasy premium, a sama współpraca przebiegła niezwykle sprawnie i profesjonalnie.",
    author: "Weronika Koper-Wójcik",
    role: "Koordynator ds. Komunikacji i PR",
    brand: "PHH",
    lang: "pl",
    onLandingPage: true,
  },
]

/** Every testimonial that may be shown in this environment, drafts first. */
export const testimonials: Testimonial[] = [...PENDING_TESTIMONIALS, ...APPROVED_TESTIMONIALS]

/** The three compact quotes for the landing page. */
export const landingPageTestimonials: Testimonial[] = testimonials.filter((t) => t.onLandingPage).slice(0, 3)
