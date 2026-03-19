"use client"

import { type FormEvent, useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export type QuestionnaireOption = {
  id: string
  label: string
  hasInput?: boolean
}

export type QuestionnaireField = {
  id: string
  label: string
  type?: string
}

export type QuestionnaireSection =
  | {
      id: string
      title: string
      description: string
      type: "radio"
      options: QuestionnaireOption[]
    }
  | {
      id: string
      title: string
      description: string
      type: "text-group"
      questions: QuestionnaireField[]
    }
  | {
      id: string
      title: string
      description: string
      type: "textarea"
      questions: QuestionnaireField[]
    }
  | {
      id: string
      title: string
      description: string
      type: "mixed"
      questions: QuestionnaireField[]
      options: QuestionnaireOption[]
    }

export type QuestionnaireContent = {
  header: { title: string; subtitle: string }
  sections: QuestionnaireSection[]
  contact: {
    title: string
    email: string
    phone: string
    sendButton: string
  }
}

function extraInputKey(sectionId: string, optionId: string) {
  return `${sectionId}_${optionId}_extra`
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const expandVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 },
}

type QuestionnaireFormProps = {
  questionnaire: QuestionnaireContent
}

export function QuestionnaireForm({ questionnaire }: QuestionnaireFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [contactValue, setContactValue] = useState("")

  const setAnswer = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }, [])

  const scrollToNextSection = useCallback((nextSectionId: string) => {
    const el = document.getElementById("section-" + nextSectionId)
    el?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [])

  /** Focus extra text field after AnimatePresence mounts it (skip auto-scroll for hasInput options). */
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(answers, contactMethod, contactValue)
  }

  const { header, sections, contact } = questionnaire

  const inputBaseClass =
    "border-b border-foreground/30 bg-transparent py-4 text-xl md:text-2xl focus:border-foreground focus:outline-none transition-colors w-full"

  const radioBlockClass =
    "relative block cursor-pointer overflow-hidden border border-foreground/50 py-3 pl-3 pr-3 transition-colors md:py-3 md:pl-4 md:pr-3"

  const radioStackClass = "flex flex-col gap-2 md:gap-3"

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-foreground"
    >
      <motion.header
        id="section-header"
        initial={sectionVariants.hidden}
        whileInView={sectionVariants.visible}
        viewport={{ once: true, margin: "-100px" }}
        className="flex min-h-[40vh] flex-col justify-center border-b border-white/20 px-6 py-12 md:px-12"
      >
        <h1 className="block w-fit font-[family-name:var(--font-display)] text-[2.6rem] uppercase leading-none tracking-[0.02em] text-foreground sm:text-[3.45rem]">
          {header.title}
        </h1>
        <p className="mt-6 max-w-md border-b border-white/20 pb-2 text-sm leading-relaxed text-foreground/90 md:max-w-lg">
          {header.subtitle}
        </p>
      </motion.header>

      {sections.map((section, sectionIndex) => {
        const nextSectionId = sections[sectionIndex + 1]?.id ?? "contact"

        if (section.type === "radio") {
          return (
            <motion.section
              key={section.id}
              id={"section-" + section.id}
              initial={sectionVariants.hidden}
              whileInView={sectionVariants.visible}
              viewport={{ once: true, margin: "-100px" }}
              className="flex min-h-[60vh] flex-col justify-center gap-6 px-4 py-12 md:min-h-[80vh] md:gap-8 md:px-8"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase leading-tight tracking-tight md:text-5xl">
                {section.title}
              </h2>
              {section.description ? (
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                  {section.description}
                </p>
              ) : null}
              <div className={radioStackClass}>
                {section.options.map((opt) => {
                  const selected = answers[section.id] === opt.id
                  const extraKey = extraInputKey(section.id, opt.id)
                  return (
                    <div key={opt.id} className="flex flex-col gap-0">
                      <label className={radioBlockClass}>
                        <input
                          type="radio"
                          name={section.id}
                          value={opt.id}
                          checked={selected}
                          onChange={() => {
                            setAnswer(section.id, opt.id)
                            if (opt.hasInput) {
                              focusExtraInput(extraKey)
                            } else {
                              setTimeout(() => scrollToNextSection(nextSectionId), 0)
                            }
                          }}
                          className="sr-only"
                          aria-label={opt.label}
                        />
                        {selected && (
                          <motion.div
                            layoutId={"radio-fill-" + section.id}
                            className="absolute inset-0 z-0 bg-white"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                        <span
                          className={`relative z-10 font-[family-name:var(--font-display)] text-lg uppercase tracking-tight md:text-xl ${
                            selected ? "text-white mix-blend-difference" : ""
                          }`}
                        >
                          {opt.label}
                        </span>
                      </label>
                      <AnimatePresence initial={false}>
                        {opt.hasInput && selected ? (
                          <motion.div
                            key={extraKey}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={expandVariants}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden pl-2 md:pl-4"
                          >
                            <input
                              id={`questionnaire-extra-${extraKey}`}
                              type="text"
                              value={answers[extraKey] ?? ""}
                              onChange={(e) => setAnswer(extraKey, e.target.value)}
                              className={inputBaseClass + " mt-2"}
                              aria-label={`${opt.label} — details`}
                            />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          )
        }

        if (section.type === "text-group") {
          return (
            <motion.section
              key={section.id}
              id={"section-" + section.id}
              initial={sectionVariants.hidden}
              whileInView={sectionVariants.visible}
              viewport={{ once: true, margin: "-100px" }}
              className="flex min-h-[60vh] flex-col justify-center gap-6 px-4 py-12 md:min-h-[80vh] md:gap-8 md:px-8"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase leading-tight tracking-tight md:text-5xl">
                {section.title}
              </h2>
              {section.description ? (
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                  {section.description}
                </p>
              ) : null}
              <div className="flex flex-col gap-6 md:gap-8">
                {section.questions.map((q) => (
                  <label key={q.id} className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground md:text-base">
                      {q.label}
                    </span>
                    <input
                      type="text"
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={inputBaseClass}
                    />
                  </label>
                ))}
              </div>
            </motion.section>
          )
        }

        if (section.type === "textarea") {
          const q = section.questions[0]
          if (!q) return null
          return (
            <motion.section
              key={section.id}
              id={"section-" + section.id}
              initial={sectionVariants.hidden}
              whileInView={sectionVariants.visible}
              viewport={{ once: true, margin: "-100px" }}
              className="flex min-h-[60vh] flex-col justify-center gap-6 px-4 py-12 md:min-h-[80vh] md:gap-8 md:px-8"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase leading-tight tracking-tight md:text-5xl">
                {section.title}
              </h2>
              {section.description ? (
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                  {section.description}
                </p>
              ) : null}
              <label className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground md:text-base">
                  {q.label}
                </span>
                <textarea
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  rows={4}
                  className={inputBaseClass + " min-h-[8rem] resize-y"}
                />
              </label>
            </motion.section>
          )
        }

        if (section.type === "mixed") {
          return (
            <motion.section
              key={section.id}
              id={"section-" + section.id}
              initial={sectionVariants.hidden}
              whileInView={sectionVariants.visible}
              viewport={{ once: true, margin: "-100px" }}
              className="flex min-h-[60vh] flex-col justify-center gap-6 px-4 py-12 md:min-h-[80vh] md:gap-8 md:px-8"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase leading-tight tracking-tight md:text-5xl">
                {section.title}
              </h2>
              {section.description ? (
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                  {section.description}
                </p>
              ) : null}
              <div className="flex flex-col gap-6 md:gap-8">
                {section.questions.map((q) => (
                  <label key={q.id} className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground md:text-base">
                      {q.label}
                    </span>
                    <input
                      type="text"
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={inputBaseClass}
                    />
                  </label>
                ))}
              </div>
              <div className={radioStackClass}>
                {section.options.map((opt) => {
                  const selected = answers[section.id] === opt.id
                  const extraKey = extraInputKey(section.id, opt.id)
                  return (
                    <div key={opt.id} className="flex flex-col gap-0">
                      <label className={radioBlockClass}>
                        <input
                          type="radio"
                          name={section.id}
                          value={opt.id}
                          checked={selected}
                          onChange={() => {
                            setAnswer(section.id, opt.id)
                            if (opt.hasInput) {
                              focusExtraInput(extraKey)
                            } else {
                              setTimeout(() => scrollToNextSection(nextSectionId), 0)
                            }
                          }}
                          className="sr-only"
                          aria-label={opt.label}
                        />
                        {selected && (
                          <motion.div
                            layoutId={"radio-fill-mixed-" + section.id}
                            className="absolute inset-0 z-0 bg-white"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                        <span
                          className={`relative z-10 font-[family-name:var(--font-display)] text-lg uppercase tracking-tight md:text-xl ${
                            selected ? "text-white mix-blend-difference" : ""
                          }`}
                        >
                          {opt.label}
                        </span>
                      </label>
                      <AnimatePresence initial={false}>
                        {opt.hasInput && selected ? (
                          <motion.div
                            key={extraKey}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={expandVariants}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden pl-2 md:pl-4"
                          >
                            <input
                              id={`questionnaire-extra-${extraKey}`}
                              type="text"
                              value={answers[extraKey] ?? ""}
                              onChange={(e) => setAnswer(extraKey, e.target.value)}
                              className={inputBaseClass + " mt-2"}
                              aria-label={`${opt.label} — details`}
                            />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          )
        }

        return null
      })}

      <motion.footer
        id="section-contact"
        initial={sectionVariants.hidden}
        whileInView={sectionVariants.visible}
        viewport={{ once: true, margin: "-100px" }}
        className="flex min-h-[60vh] flex-col justify-center gap-8 border-t border-white/20 px-4 py-12 md:min-h-[80vh] md:gap-10 md:px-8"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase leading-tight tracking-tight md:text-5xl">
          {contact.title}
        </h2>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setContactMethod("email")}
            className={`border px-4 py-2 font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight transition-colors md:text-3xl ${
              contactMethod === "email"
                ? "border-foreground bg-foreground/10 font-bold text-foreground"
                : "border-foreground/30 text-muted-foreground hover:border-foreground/50 hover:text-foreground/80"
            }`}
          >
            [ {contact.email} ]
          </button>
          <button
            type="button"
            onClick={() => setContactMethod("phone")}
            className={`border px-4 py-2 font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight transition-colors md:text-3xl ${
              contactMethod === "phone"
                ? "border-foreground bg-foreground/10 font-bold text-foreground"
                : "border-foreground/30 text-muted-foreground hover:border-foreground/50 hover:text-foreground/80"
            }`}
          >
            [ {contact.phone} ]
          </button>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            {contactMethod === "email" ? contact.email : contact.phone}
          </span>
          <input
            type={contactMethod === "email" ? "email" : "tel"}
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            className={inputBaseClass + " max-w-xl"}
            autoComplete={contactMethod === "email" ? "email" : "tel"}
          />
        </label>

        <SubmitButton label={contact.sendButton} />
      </motion.footer>
    </form>
  )
}

function SubmitButton({ label }: { label: string }) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative w-fit overflow-hidden font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-[0.02em] md:text-3xl"
    >
      <button type="submit" className="relative block w-full px-4 py-3 text-left">
        {/* LAYER 1: White base (filled so default state is solid) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 bg-white"
          variants={{
            initial: { opacity: 1 },
            hover: { opacity: 1 },
          }}
        />
        {/* LAYER 2: Black hover sweep */}
        <motion.div
          className="absolute inset-0 z-[1] bg-black"
          variants={{
            initial: { x: "-100%" },
            hover: { x: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ originX: 0 }}
        />
        {/* LAYER 3: Text (white + mix-blend-difference) */}
        <span className="relative z-10 text-white mix-blend-difference">
          {label}
        </span>
      </button>
    </motion.div>
  )
}
