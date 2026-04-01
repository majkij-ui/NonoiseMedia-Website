"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import type {
  QuestionnaireContent,
  QuestionnaireOption,
} from "./types"

function extraInputKey(sectionId: string, optionId: string) {
  return `${sectionId}_${optionId}_extra`
}

/** Option ids must not contain this character. */
const CHOICE_MULTI_SEP = "|"

function decodeMultiChoice(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw.split(CHOICE_MULTI_SEP).filter(Boolean)
}

function encodeMultiChoice(ids: string[]): string {
  return ids.join(CHOICE_MULTI_SEP)
}

const NO_ANSWER_TEXT = "Nie wybrano odpowiedzi / No answer chosen"

function choiceLabelsForSummary(
  sectionId: string,
  options: QuestionnaireOption[],
  multiple: boolean | undefined,
  answers: Record<string, string>,
): string {
  const ids = multiple
    ? decodeMultiChoice(answers[sectionId])
    : answers[sectionId]
      ? [answers[sectionId]]
      : []
  if (ids.length === 0) return NO_ANSWER_TEXT

  const parts: string[] = []
  for (const id of ids) {
    const opt = options.find((o) => o.id === id)
    if (!opt) continue
    const extra = opt.hasInput
      ? answers[extraInputKey(sectionId, opt.id)]
      : ""
    if (opt.hasInput && extra && extra.trim() !== "") {
      parts.push(`${opt.label}: ${extra.trim()}`)
    } else {
      parts.push(opt.label)
    }
  }
  return parts.length > 0 ? parts.join(" • ") : NO_ANSWER_TEXT
}

function isChoiceSelected(
  answers: Record<string, string>,
  sectionId: string,
  multiple: boolean | undefined,
  optionId: string,
): boolean {
  if (multiple) return decodeMultiChoice(answers[sectionId]).includes(optionId)
  return answers[sectionId] === optionId
}

const extraRevealVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  expanded: { opacity: 1, height: "auto", marginTop: 16 },
}

const inputDraftClass =
  "w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"

type QuestionnaireFormProps = {
  questionnaire: QuestionnaireContent
}

type FormSummaryItem = {
  question: string
  answer: string
}

function SectionIntro({
  index,
  title,
  description,
}: {
  index: number
  title: string
  description: string | null
}) {
  const n = String(index + 1).padStart(2, "0")
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {n}
      </span>
      <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </motion.div>
  )
}

export function QuestionnaireForm({ questionnaire }: QuestionnaireFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [contactValue, setContactValue] = useState("")
  const [clientName, setClientName] = useState("")
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "missing" | "submitting" | "success" | "error"
  >("idle")

  const setAnswer = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }, [])

  const focusExtraInput = useCallback((extraKey: string) => {
    const id = `questionnaire-extra-${extraKey}`
    const run = () => {
      document.getElementById(id)?.focus()
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(run)
    })
    setTimeout(run, 120)
  }, [])

  const handleChoicePick = useCallback(
    (
      sectionId: string,
      multiple: boolean | undefined,
      opt: QuestionnaireOption,
    ) => {
      const extraKey = extraInputKey(sectionId, opt.id)
      if (multiple) {
        setAnswers((prev) => {
          const ids = decodeMultiChoice(prev[sectionId])
          const turningOn = !ids.includes(opt.id)
          const next = turningOn
            ? [...ids, opt.id]
            : ids.filter((id) => id !== opt.id)
          if (turningOn && opt.hasInput) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => focusExtraInput(extraKey))
            })
          }
          return { ...prev, [sectionId]: encodeMultiChoice(next) }
        })
      } else {
        setAnswer(sectionId, opt.id)
        if (opt.hasInput) focusExtraInput(extraKey)
      }
    },
    [focusExtraInput, setAnswer],
  )

  const handleSubmit = async () => {
    if (!contactValue || contactValue.trim() === "") {
      setSubmitStatus("missing")
      // Reset back to idle after 3 seconds so they can try again
      window.setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }

    setSubmitStatus("submitting")

    const asAnswer = (value?: string) => {
      if (!value || value.trim() === "") return NO_ANSWER_TEXT
      return value.trim()
    }

    const formSummary: FormSummaryItem[] = sections.flatMap((section) => {
      if (section.type === "radio") {
        const selectedAnswer = choiceLabelsForSummary(
          section.id,
          section.options,
          section.multiple,
          answers,
        )
        return [{ question: section.title, answer: asAnswer(selectedAnswer) }]
      }

      if (section.type === "text-group") {
        return section.questions.map((q) => ({
          question: q.label,
          answer: asAnswer(answers[q.id]),
        }))
      }

      if (section.type === "textarea") {
        const q = section.questions[0]
        if (!q) return []
        return [{ question: q.label, answer: asAnswer(answers[q.id]) }]
      }

      if (section.type === "mixed") {
        const textAnswers = section.questions.map((q) => ({
          question: q.label,
          answer: asAnswer(answers[q.id]),
        }))

        const modelAnswer = choiceLabelsForSummary(
          section.id,
          section.options,
          section.multiple,
          answers,
        )

        return [
          ...textAnswers,
          {
            question: section.title,
            answer: asAnswer(modelAnswer),
          },
        ]
      }

      return []
    })

    formSummary.unshift({
      question: "KLIENT / FIRMA",
      answer: clientName.trim() || "Nie podano / Not provided",
    })

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formSummary,
          contactMethod,
          contactValue,
          clientName,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
      } else {
        const rawText = await response.text().catch(() => "")
        let errorPayload: unknown = null
        try {
          errorPayload = rawText ? JSON.parse(rawText) : null
        } catch {
          errorPayload = null
        }
        console.error("[questionnaire] Submit failed:", {
          status: response.status,
          statusText: response.statusText,
          rawText,
          errorPayload,
        })
        setSubmitStatus("error")
        window.setTimeout(() => setSubmitStatus("idle"), 3000)
      }
    } catch (error) {
      console.error("[questionnaire] Submit request crashed:", error)
      setSubmitStatus("error")
      window.setTimeout(() => setSubmitStatus("idle"), 3000)
    }
  }

  const { header, sections, contact } = questionnaire
  const firstSectionId = sections[0]?.id

  const scrollToFirstQuestion = () => {
    if (!firstSectionId) return
    document
      .getElementById("section-" + firstSectionId)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  const getButtonText = () => {
    switch (submitStatus) {
      case "missing":
        return contact.missingContact
      case "submitting":
        return contact.submitting
      case "success":
        return contact.success
      case "error":
        return contact.error
      default:
        return contact.sendButton
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className="px-6 pb-32 pt-[calc(6.5rem+env(safe-area-inset-top))] text-foreground md:px-12 md:pt-24 lg:pt-28"
    >
      {/* Hero — v0 draft: full-height intro + START */}
      <section
        id="section-header"
        className="flex min-h-[calc(100svh-6.5rem)] flex-col justify-center py-16"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 max-w-5xl font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-tight text-foreground md:text-8xl lg:text-9xl"
        >
          {header.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          {header.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 w-fit"
        >
          <motion.button
            type="button"
            onClick={scrollToFirstQuestion}
            whileHover="hover"
            initial="rest"
            variants={{ rest: {}, hover: {} }}
            className="group relative w-fit overflow-hidden bg-foreground px-4 py-2 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-background md:text-4xl"
          >
            <motion.div
              className="absolute inset-0 bg-background"
              variants={{
                rest: { x: "-100%" },
                hover: { x: 0 },
              }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-foreground">
              {header.startCta}
            </span>
          </motion.button>
        </motion.div>
      </section>

      {sections.map((section, sectionIndex) => {
        if (section.type === "radio") {
          return (
            <section
              key={section.id}
              id={"section-" + section.id}
              className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16"
            >
              <SectionIntro
                index={sectionIndex}
                title={section.title}
                description={section.description || null}
              />
              <div
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
                {...(section.multiple
                  ? { role: "group" as const, "aria-label": section.title }
                  : {})}
              >
                {section.options.map((opt, index) => {
                  const selected = isChoiceSelected(
                    answers,
                    section.id,
                    section.multiple,
                    opt.id,
                  )
                  const extraKey = extraInputKey(section.id, opt.id)
                  return (
                    <div key={opt.id} className="flex flex-col">
                      <motion.label
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group relative block cursor-pointer overflow-hidden border px-6 py-5 text-left transition-all ${
                          selected
                            ? "border-foreground bg-foreground"
                            : "border-foreground/30 bg-transparent hover:border-foreground/60"
                        }`}
                      >
                        <input
                          type={section.multiple ? "checkbox" : "radio"}
                          name={
                            section.multiple
                              ? `${section.id}-${opt.id}`
                              : section.id
                          }
                          value={opt.id}
                          checked={selected}
                          onChange={() =>
                            handleChoicePick(section.id, section.multiple, opt)
                          }
                          className="sr-only"
                          aria-label={opt.label}
                        />
                        <span
                          className={`relative z-10 block font-[family-name:var(--font-display)] text-lg uppercase tracking-wide transition-colors md:text-xl ${
                            selected ? "text-background" : "text-foreground"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </motion.label>
                      <AnimatePresence initial={false}>
                        {opt.hasInput && selected ? (
                          <motion.div
                            key={extraKey}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={extraRevealVariants}
                            transition={{
                              duration: 0.4,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <input
                              id={`questionnaire-extra-${extraKey}`}
                              type="text"
                              value={answers[extraKey] ?? ""}
                              onChange={(e) => setAnswer(extraKey, e.target.value)}
                              className={inputDraftClass}
                              placeholder=""
                              aria-label={`${opt.label} — details`}
                            />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        }

        if (section.type === "text-group") {
          return (
            <section
              key={section.id}
              id={"section-" + section.id}
              className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16"
            >
              <SectionIntro
                index={sectionIndex}
                title={section.title}
                description={section.description || null}
              />
              <div className="flex flex-col gap-10">
                {section.questions.map((q, qIndex) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: qIndex * 0.1,
                    }}
                  >
                    <label className="mb-1 block text-sm text-foreground">
                      {q.label}
                    </label>
                    <input
                      type="text"
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={inputDraftClass}
                      placeholder={q.placeholder || ""}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )
        }

        if (section.type === "textarea") {
          const q = section.questions[0]
          if (!q) return null
          return (
            <section
              key={section.id}
              id={"section-" + section.id}
              className="flex min-h-[40vh] flex-col justify-center border-t border-foreground/10 py-16"
            >
              <SectionIntro
                index={sectionIndex}
                title={section.title}
                description={section.description || null}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <label className="mb-1 block text-sm text-foreground">
                  {q.label}
                </label>
                <textarea
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  rows={4}
                  className={`${inputDraftClass} min-h-[6rem] resize-none`}
                  placeholder={q.placeholder || ""}
                />
              </motion.div>
            </section>
          )
        }

        if (section.type === "mixed") {
          return (
            <section
              key={section.id}
              id={"section-" + section.id}
              className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16"
            >
              <SectionIntro
                index={sectionIndex}
                title={section.title}
                description={section.description || null}
              />
              <div className="flex flex-col gap-10">
                {section.questions.map((q, qIndex) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: qIndex * 0.1,
                    }}
                  >
                    <label className="mb-1 block text-sm text-foreground">
                      {q.label}
                    </label>
                    <input
                      type="text"
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={inputDraftClass}
                      placeholder={q.placeholder || ""}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div
                    className="grid grid-cols-1 gap-3 md:grid-cols-2"
                    {...(section.multiple
                      ? { role: "group" as const, "aria-label": section.title }
                      : {})}
                  >
                    {section.options.map((opt, index) => {
                      const selected = isChoiceSelected(
                        answers,
                        section.id,
                        section.multiple,
                        opt.id,
                      )
                      const extraKey = extraInputKey(section.id, opt.id)
                      return (
                        <div key={opt.id} className="flex flex-col">
                          <motion.label
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1,
                            }}
                            className={`group relative block cursor-pointer overflow-hidden border px-6 py-5 text-left transition-all ${
                              selected
                                ? "border-foreground bg-foreground"
                                : "border-foreground/30 bg-transparent hover:border-foreground/60"
                            }`}
                          >
                            <input
                              type={section.multiple ? "checkbox" : "radio"}
                              name={
                                section.multiple
                                  ? `${section.id}-${opt.id}`
                                  : section.id
                              }
                              value={opt.id}
                              checked={selected}
                              onChange={() =>
                                handleChoicePick(
                                  section.id,
                                  section.multiple,
                                  opt,
                                )
                              }
                              className="sr-only"
                              aria-label={opt.label}
                            />
                            <span
                              className={`relative z-10 block font-[family-name:var(--font-display)] text-lg uppercase tracking-wide transition-colors md:text-xl ${
                                selected ? "text-background" : "text-foreground"
                              }`}
                            >
                              {opt.label}
                            </span>
                          </motion.label>
                          <AnimatePresence initial={false}>
                            {opt.hasInput && selected ? (
                              <motion.div
                                key={extraKey}
                                initial="collapsed"
                                animate="expanded"
                                exit="collapsed"
                                variants={extraRevealVariants}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.4, 0, 0.2, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <input
                                  id={`questionnaire-extra-${extraKey}`}
                                  type="text"
                                  value={answers[extraKey] ?? ""}
                                  onChange={(e) =>
                                    setAnswer(extraKey, e.target.value)
                                  }
                                  className={inputDraftClass}
                                  aria-label={`${opt.label} — details`}
                                />
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </section>
          )
        }

        return null
      })}

      <footer
        id="section-contact"
        className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            {contact.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={`${inputDraftClass} py-4 text-xl md:text-2xl`}
            placeholder={contact.namePlaceholder}
            autoComplete="organization"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap gap-3"
        >
          <button
            type="button"
            onClick={() => setContactMethod("email")}
            className={`border px-5 py-3 text-sm uppercase tracking-wide transition-all ${
              contactMethod === "email"
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/30 bg-transparent text-foreground hover:border-foreground/60"
            }`}
          >
            [ {contact.email} ]
          </button>
          <button
            type="button"
            onClick={() => setContactMethod("phone")}
            className={`border px-5 py-3 text-sm uppercase tracking-wide transition-all ${
              contactMethod === "phone"
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/30 bg-transparent text-foreground hover:border-foreground/60"
            }`}
          >
            [ {contact.phone} ]
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <input
            type={contactMethod === "email" ? "email" : "tel"}
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            className={inputDraftClass}
            placeholder={
              contactMethod === "email"
                ? "email@example.com"
                : "+48 XXX XXX XXX"
            }
            autoComplete={contactMethod === "email" ? "email" : "tel"}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-fit"
        >
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={submitStatus === "submitting" || submitStatus === "success"}
            whileHover="hover"
            initial="rest"
            variants={{ rest: {}, hover: {} }}
            className="group relative w-fit overflow-hidden border border-foreground bg-foreground px-10 py-5"
          >
            <motion.div
              className="absolute inset-0 bg-background"
              variants={{
                rest: { x: "-100%" },
                hover: { x: 0 },
              }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
            <span className="relative z-10 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-background transition-colors group-hover:text-foreground md:text-2xl">
              {getButtonText()}
            </span>
          </motion.button>
        </motion.div>
      </footer>
    </form>
  )
}
