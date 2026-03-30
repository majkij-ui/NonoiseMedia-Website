export type Project = {
  id: number
  title: string
  subtitle: string
  client: string
  image: string
  video: string
  btsImages: string[]
  challenge: string
  solution: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Gościnni z natury",
    subtitle: "Film wizerunkowy",
    client: "Polski Holding Hotelowy",
    image: "https://assets.nonoise.media/videos/PHH.png",
    video: "https://assets.nonoise.media/videos/PHH.mp4",
    btsImages: [
      "https://assets.nonoise.media/bts/phh/phh-stills-1.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-2.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-3.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-4.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-5.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-6.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-7.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-8.png",
      "https://assets.nonoise.media/bts/phh/phh-stills-9.png",
    ],
    challenge:
      "Klient – lider polskiego rynku hotelarskiego przechodzący rebranding – potrzebował emocjonalnego filmu wizerunkowego premium. Głównym wyzwaniem była logistyka: stworzenie ujęć o najwyższej kinowej jakości w wielu odległych od siebie lokacjach przy bardzo napiętym harmonogramie.",
    solution:
      "Kluczem było szybkie zgranie wizji dzięki precyzyjnej komunikacji oraz dopracowanym moodboardom. Elastycznie dobieraliśmy wielkość ekipy – od zwinnego, mobilnego teamu po rozbudowany set w najważniejszych scenach. Charakterystyczną plastykę obrazu osiągnęliśmy, łącząc najwyszej klasy kamerę z organicznym obrazkiem obiektywów vintage.",
  },
  {
    id: 2,
    title: "E-GRAVEL REVOLUTION",
    subtitle: "Film produktowy",
    client: "Rondo",
    image: "https://assets.nonoise.media/videos/Rondo.png",
    video: "https://assets.nonoise.media/videos/Rondo.mp4",
    btsImages: [
      "https://assets.nonoise.media/bts/rondo/rondo-stills-1.png",
      "https://assets.nonoise.media/bts/rondo/rondo-stills-2.png",
      "https://assets.nonoise.media/bts/rondo/rondo-stills-3.png",
      "https://assets.nonoise.media/bts/rondo/rondo-stills-4.png",
      "https://assets.nonoise.media/bts/rondo/rondo-stills-5.png",
      "https://assets.nonoise.media/bts/rondo/rondo-stills-6.png",
      "https://assets.nonoise.media/bts/rondo/rondo-stills-7.png",
      "https://assets.nonoise.media/bts/rondo/rondo-stills-8.png",
    ],
    challenge:
      "Wprowadzenie na rynek pionierskiego elektrycznego gravela polskiej marki butikowej, słynącej z wyjątkowego designu swoich rowerów. Naszym zadaniem było uchwycenie esencji e-gravela: bezkompromisowej radości z jazdy niezależnie od formy. Zależało nam na pokazaniu, że napęd elektryczny ułatwia strome podjazdy, zaciera różnice kondycyjne i czyni z roweru niezwykle wszechstronne narzędzie – od leśnych szlaków po miejskie dojazdy",
    solution:
      "Postawiliśmy na rygorystyczny dobór lokacji pod kątem najlepszych warunków świetlnych oraz elementów otoczenia wspomagających naszą narrację. Aby oddać dynamiczny charakter produktu, zaangażowaliśmy elitarnego operatora drona FPV. Pozwoliło to na rejestrację niezwykle widowiskowych, bliskich ujęć w gęstym leśnym terenie, z perspektywy niemożliwej do osiągnięcia tradycyjnymi metodami. Całość spięliśmy nowoczesnym udźwiękowieniem i animacjami, które napędzały rytm montażu równie mocno, co sam e-gravel.",
  },
  {
    id: 3,
    title: "Przestrzeń biurowa w sercu Warszawy",
    subtitle: "Kampania reklamowa",
    client: "OmniOffice",
    image: "https://assets.nonoise.media/videos/Omni.png",
    video: "https://assets.nonoise.media/videos/Omni.mp4",
    btsImages: [
      "https://assets.nonoise.media/bts/omni/omni-stills-1.png",
      "https://assets.nonoise.media/bts/omni/omni-stills-2.png",
      "https://assets.nonoise.media/bts/omni/omni-stills-3.png",
      "https://assets.nonoise.media/bts/omni/omni-stills-4.png",
      "https://assets.nonoise.media/bts/omni/omni-stills-5.png",
      "https://assets.nonoise.media/bts/omni/omni-stills-6.png",
      "https://assets.nonoise.media/bts/omni/omni-stills-7.png",
      "https://assets.nonoise.media/bts/omni/omni-stills-8.png",
    ],
    challenge:
      "Stworzenie nowoczesnej, zoptymalizowanej budżetowo kampanii na potrzeby mediów społecznościowych dla przestrzeni biurowych w centrum Warszawy. Głównym wyzwaniem była logistyka: sfilmowanie aż 6 lokacji w zaledwie 2 dni zdjęciowe, bez jakichkolwiek kompromisów w kwestii jakości obrazu. Dodatkowo przestrzenie biurowe to często wielkie okna i duzo światła, co wymuszało bardzo staranne planowanie i wspomaganie się duza mocą lamp.",
    solution:
      "Precyzyjny scouting pozwolił nam dokladnie zaplanować i skompresować harmonogram pracy. Prestiżowe położenie biur podkreśliliśmy dynamicznymi ujęciami z drona. Zamiast pokazywać sterylne, chłodne wnętrza, wpletliśmy w kadry starannie dobranych epizodystów. Ich obecność ożywiła przestrzeń, nadając kampanii autentyczny, lifestylowy i wysoce angażujący charakter.",
  },
  {
    id: 4,
    title: "Networking kadry C-level",
    subtitle: "Reportaż eventowy",
    client: "CIONET",
    image: "https://assets.nonoise.media/videos/CIONET.png",
    video: "https://assets.nonoise.media/videos/CIONET.mp4",
    btsImages: [
      "https://assets.nonoise.media/bts/cionet/cionet-stills-1.png",
      "https://assets.nonoise.media/bts/cionet/cionet-stills-2.png",
      "https://assets.nonoise.media/bts/cionet/cionet-stills-3.png",
      "https://assets.nonoise.media/bts/cionet/cionet-stills-4.png",
      "https://assets.nonoise.media/bts/cionet/cionet-stills-5.png",
      "https://assets.nonoise.media/bts/cionet/cionet-stills-6.png",
      "https://assets.nonoise.media/bts/cionet/cionet-stills-7.png",
      "https://assets.nonoise.media/bts/cionet/cionet-stills-8.png",
    ],
    challenge:
      "Dokumentacja zamkniętych spotkań networkingowych dla najwyższej kadry zarządzającej. Cel: jakość obrazu oddająca prestiż wydarzenia, realizowana przy niemal zerowej ingerencji w przestrzeń gości.",
    solution:
      "Zastosowaliśmy strategię 'fly-on-the-wall'. Lekki i mobilny sprzęt i lata współpracy pozwalają nam działać w pełnej dyskrecji. Kompleksowo obsługujemy jednak każdy rodzaj eventu – płynnie rozszerzając zespół o drugi unit, który równolegle realizuje profesjonalnie doświetlone wywiady i testimoniale w osobno wydzielonej strefie.",
  },
  {
    id: 5,
    title: "W RYTMIE SŁÓW",
    subtitle: "Seria teledysków",
    client: "Fundacja FIRE",
    image: "https://assets.nonoise.media/videos/wrytmieslow.png",
    video: "https://assets.nonoise.media/videos/Wrytmieslow.mp4",
    btsImages: [
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-1.png",
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-2.png",
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-3.png",
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-4.png",
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-5.png",
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-6.png",
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-7.png",
      "https://assets.nonoise.media/bts/wrytmie/wrytmie-stills-8.png",
    ],
    challenge:
      "Realizacja 12 unikalnych teledysków w zaledwie 3 dni zdjęciowe, dysponując wyłącznie jedną przestrzenią studia nagraniowego. Głównym wyzwaniem było nadanie każdemu z młodych artystów indywidualnego, niepowtarzalnego charakteru wizualnego pod ogromną presją czasu.",
    solution:
      "Postawiliśmy na ekstremalnie elastyczne i kreatywne sety oświetleniowe, budując unikalny klimat dla każdego twórcy. Świadomie zredukowaliśmy inwazyjność sprzętu na planie. Zespół kamerowy pracował z absolutną dyskrecją, dając młodym twórcom przestrzeń do swobodnej ekspresji bez poczucia bycia obserwowanym.",
  },
  {
    id: 6,
    title: "Robot na targach Warsaw Industry Week",
    subtitle: "Reportaż eventowy",
    client: "ZUT Jerzy Kunzek",
    image: "https://assets.nonoise.media/videos/Kunzek.png",
    video: "https://assets.nonoise.media/videos/Kunzek.mp4",
    btsImages: [
      "https://assets.nonoise.media/bts/kunzek/kunzek-stills-1.png",
      "https://assets.nonoise.media/bts/kunzek/kunzek-stills-2.png",
      "https://assets.nonoise.media/bts/kunzek/kunzek-stills-3.png",
      "https://assets.nonoise.media/bts/kunzek/kunzek-stills-4.png",
      "https://assets.nonoise.media/bts/kunzek/kunzek-stills-5.png",
      "https://assets.nonoise.media/bts/kunzek/kunzek-stills-6.png",
      "https://assets.nonoise.media/bts/kunzek/kunzek-stills-7.png",
    ],
    challenge:
      "Stworzenie angażującego wideo z targów branżowych. Cel: płynne połączenie wywiadu pracowniczego z dynamicznym, wizualnie atrakcyjnym pokazem zautomatyzowanej linii, ze szczególnym naciskiem na ukazanie pracy robota.",
    solution:
      "Studyjna jakość dźwięku i obrazu w trudnych warunkach eventowych osiągnięta dzięki zwinnej, jednoosobowej ekipie. Dynamikę maszyny pokazaliśmy dzięki dronom oraz miniaturowym kamerom zamontowanym bezpośrednio na taśmie produkcyjnej, tworząc unikalne ujęcia z wnętrza procesu.",
  },
]

export type TrustedBrand = { id: number; name: string; src: string }

export const trustedBy: TrustedBrand[] = [
  { id: 1, name: "PHH", src: "https://assets.nonoise.media/logos/phhlogo.png" },
  { id: 2, name: "Danone", src: "https://assets.nonoise.media/logos/danone.png" },
  { id: 3, name: "CIONET", src: "https://assets.nonoise.media/logos/CIONET.png" },
  { id: 4, name: "Rondo", src: "https://assets.nonoise.media/logos/Rondo%20Logo.png" },
  { id: 5, name: "FIRE", src: "https://assets.nonoise.media/logos/fire.png" },
  { id: 6, name: "North", src: "https://assets.nonoise.media/logos/north.png" },
  { id: 7, name: "Kunzek", src: "https://assets.nonoise.media/logos/Kunzek.png" },
  { id: 8, name: "Core", src: "https://assets.nonoise.media/logos/core.png" },
  { id: 9, name: "GKA", src: "https://assets.nonoise.media/logos/gka.png" },
  { id: 10, name: "Naish", src: "https://assets.nonoise.media/logos/naish.png" },
  { id: 11, name: "OmniOffice", src: "https://assets.nonoise.media/logos/omnioffice-logo-1.png" },
]

export function logoSizeClass(name: string): string {
  if (name === "Danone") return "h-6 max-w-[105px] md:h-[30px] md:max-w-[135px]"
  if (name === "PHH") return "h-[38px] max-w-[168px] md:h-12 md:max-w-[216px]"
  if (name === "CIONET") return "h-[25px] max-w-[113px] md:h-[32px] md:max-w-[146px]"
  if (name === "Rondo") return "h-[50px] max-w-[218px] md:h-[62px] md:max-w-[281px]"
  if (name === "Core" || name === "Naish") return "h-4 max-w-[70px] md:h-5 md:max-w-[90px]"
  if (name === "OmniOffice") return "h-[39px] max-w-[224px] md:h-[50px] md:max-w-[280px]"
  return "h-8 max-w-[140px] md:h-10 md:max-w-[180px]"
}
