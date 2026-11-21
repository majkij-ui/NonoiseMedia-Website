/**
 * The six service tiles on the paid landing page (/lp/kampania).
 *
 * Copy and prices live in messages/*.json under `lp.kampania.services`; this
 * file holds what is not text: the order, the sample films each tile plays,
 * and the names used in the lead email.
 */
import { projects } from "@/lib/projects"

/** Display order. AI video sits early on purpose: the owner wants weight on it. */
export const LP_SERVICE_IDS = ["corporate", "commercial", "ai", "social", "podcast", "event"] as const

export type LpServiceId = (typeof LP_SERVICE_IDS)[number]

/** The form's "something else" choice. */
export const LP_SERVICE_OTHER = "other"

/** How each choice is named in the lead email (always Polish: the owner reads it). */
export const LP_SERVICE_EMAIL_LABELS: Record<LpServiceId | typeof LP_SERVICE_OTHER, string> = {
  corporate: "Film korporacyjny i wizerunkowy",
  commercial: "Film reklamowy",
  ai: "Wideo AI",
  social: "Rolki premium do social mediów",
  podcast: "Podcasty i wywiady na 3 kamery",
  event: "Reportaż eventowy",
  other: "Coś innego / jeszcze nie wiem",
}

/** A film a tile can play. `vertical` marks 9:16 material (reels). */
export type LpExample = {
  id: number
  title: string
  client: string
  image: string
  video: string
  vertical?: boolean
}

function fromProject(projectId: number): LpExample {
  const project = projects.find((p) => p.id === projectId)
  if (!project) throw new Error(`lp-services: no project with id ${projectId}`)
  return { id: project.id, title: project.title, client: project.client, image: project.image, video: project.video }
}

/**
 * Sample work per tile. A tile with an empty list simply shows no films.
 *
 * Adding one: upload the video and its poster to R2 FIRST, under new names,
 * then reference them here. A URL requested before the file exists is cached
 * as "missing" for a year (see CLAUDE.md, Settled Decisions).
 */
const LP_MEDIA = "https://assets.nonoise.media/videos/lp"

/**
 * Films shown only on the landing page (not portfolio projects yet). Ids start
 * at 100 so they can never collide with a project id from lib/projects.ts.
 */
function lpFilm(
  id: number,
  client: string,
  title: string,
  file: string,
  poster: string,
  vertical = false,
): LpExample {
  return { id, client, title, video: `${LP_MEDIA}/${file}`, image: `${LP_MEDIA}/${poster}`, vertical }
}

export const LP_SERVICE_EXAMPLES: Record<LpServiceId, LpExample[]> = {
  corporate: [lpFilm(101, "JHJ", "Film na 25-lecie firmy", "JHJ-bezAI-fullHD.mp4", "jhj-film-poster.webp"), fromProject(1)],
  commercial: [fromProject(2), fromProject(3)],
  ai: [],
  social: [
    lpFilm(111, "Morris & Lloyd Broker", "Rolka 01", "morris-lloyd-rolka1.mp4", "morris-lloyd-rolka1-poster.webp", true),
    lpFilm(112, "Morris & Lloyd Broker", "Rolka 02", "morris-lloyd-rolka1B.mp4", "morris-lloyd-rolka1B-poster.webp", true),
    lpFilm(113, "Morris & Lloyd Broker", "Rolka 03", "morris-lloyd-rolka2B.mp4", "morris-lloyd-rolka2B-poster.webp", true),
  ],
  podcast: [
    lpFilm(121, "CIONET", "Wywiad na trzy kamery", "podcast-sample-cionet.mp4", "podcast-sample-cionet-poster.webp"),
    lpFilm(122, "CIONET", "Wypowiedzi ekspertów", "wywiady-sample2-cionet.mp4", "wywiady-sample2-cionet-poster.webp"),
  ],
  event: [fromProject(4), fromProject(6)],
}
