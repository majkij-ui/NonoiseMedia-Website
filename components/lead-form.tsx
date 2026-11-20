"use client"

import { type FormEvent, useCallback, useId, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { sendGTMEvent } from "@/lib/gtm"
import {
  newLeadId,
  normalizeEmail,
  normalizePhoneE164,
  readAttribution,
} from "@/lib/attribution"
import { getAdStorageConsent } from "@/lib/consent"

type FormStatus = "idle" | "sending" | "sent" | "error"

/** Where the form sits. Goes into the lead email and the conversion event. */
export type LeadFormSource = "contact" | "lp-kampania"

type LeadFormProps = {
  source: LeadFormSource
  /** Adds an optional phone field. */
  withPhone?: boolean
  /** Shows a small label above each field instead of relying on placeholders alone. */
  withLabels?: boolean
  messageRows?: number
}

// 16px on phones: iOS Safari zooms the page when a focused field is smaller.
// The tighter padding there keeps the fields the same height as before, so the
// submit button on /contact stays above the cookie bar on a short screen.
const FIELD_CLASS =
  "block w-full border-b border-white/20 bg-transparent py-1.5 text-base md:py-2 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-white md:text-sm"
const LABEL_CLASS = "mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"

const EMPTY = { name: "", email: "", phone: "", message: "" }

/**
 * The contact form, shared by /contact and the paid landing page.
 *
 * One submission = one lead id. It goes to the email subject, to the
 * dataLayer as `transaction_id`, and later to Google as Order ID, so the same
 * lead cannot be counted twice. The conversion event fires only after the API
 * confirms the send (HTTP 200): GTM counts delivered leads, not attempts.
 *
 * Renders a fragment so the form (or the success message) is a direct flex
 * child of whatever card the caller puts it in.
 */
export function LeadForm({ source, withPhone = false, withLabels = false, messageRows = 2 }: LeadFormProps) {
  const id = useId()
  const [formData, setFormData] = useState(EMPTY)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const setField = (field: keyof typeof EMPTY, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (status === "error") setStatus("idle")
  }

  const validate = useCallback(() => {
    if (!formData.name.trim()) return "Podaj nazwę firmy lub swoje imię."
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Podaj prawidłowy adres e-mail."
    if (withPhone && formData.phone.trim() && !normalizePhoneE164(formData.phone))
      return "Podaj prawidłowy numer telefonu albo zostaw to pole puste."
    if (!formData.message.trim()) return "Wpisz treść wiadomości."
    return null
  }, [formData, withPhone])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const validationError = validate()
      if (validationError) {
        setErrorMsg(validationError)
        setStatus("error")
        return
      }

      setStatus("sending")
      setErrorMsg("")

      const leadId = newLeadId()
      const email = normalizeEmail(formData.email)
      const phone = withPhone ? normalizePhoneE164(formData.phone) : ""

      try {
        const res = await fetch("/api/send-contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            ...(withPhone ? { phone: formData.phone } : {}),
            source,
            leadId,
            attribution: readAttribution(),
            consent: getAdStorageConsent(),
          }),
        })
        const data = await res.json().catch(() => ({}))

        // Success needs the route's own confirmation, not just any 200: a proxy
        // answering with its own page must not count as a delivered lead.
        if (!res.ok || data?.success !== true) {
          setErrorMsg(data?.error || "Nie udało się wysłać wiadomości.")
          setStatus("error")
          return
        }
      } catch {
        setErrorMsg("Błąd połączenia. Sprawdź internet i spróbuj ponownie.")
        setStatus("error")
        return
      }

      setStatus("sent")
      setFormData(EMPTY)

      // The message is already delivered at this point: a failure in the
      // tracking push must never turn a sent lead into an error on screen.
      // user_data feeds enhanced conversions — GTM hashes it, we only hand
      // over the plain value.
      try {
        const userData = {
          ...(email ? { email } : {}),
          ...(phone ? { phone_number: phone } : {}),
        }
        sendGTMEvent("contact_form_success", {
          transaction_id: leadId,
          form_location: source,
          ...(Object.keys(userData).length ? { user_data: userData } : {}),
        })
      } catch {
        // Nothing to do.
      }
    },
    [formData, source, validate, withPhone],
  )

  const field = (name: keyof typeof EMPTY) => `${id}-${name}`

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="flex flex-1 flex-col items-start justify-center gap-3"
        >
          <div className="flex items-center gap-2 text-foreground">
            <Check size={20} strokeWidth={2} />
            <span className="font-mono text-sm uppercase tracking-wider">Wiadomość wysłana</span>
          </div>
          <p className="text-sm text-foreground/60">Dziękujemy! Odezwiemy się najszybciej jak to możliwe.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-1 text-sm text-foreground/40 underline underline-offset-4 transition-colors hover:text-foreground/70"
          >
            Wyślij kolejną wiadomość
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3">
          <div>
            {withLabels ? (
              <label htmlFor={field("name")} className={LABEL_CLASS}>
                Firma lub imię
              </label>
            ) : null}
            <input
              id={field("name")}
              name="name"
              type="text"
              autoComplete="organization"
              aria-label={withLabels ? undefined : "Nazwa firmy"}
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
              className={FIELD_CLASS}
              placeholder="Nazwa Twojej Firmy"
            />
          </div>

          <div>
            {withLabels ? (
              <label htmlFor={field("email")} className={LABEL_CLASS}>
                E-mail
              </label>
            ) : null}
            <input
              id={field("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-label={withLabels ? undefined : "Email"}
              value={formData.email}
              onChange={(e) => setField("email", e.target.value)}
              className={FIELD_CLASS}
              placeholder="twoj@email.pl"
            />
          </div>

          {withPhone ? (
            <div>
              {withLabels ? (
                <label htmlFor={field("phone")} className={LABEL_CLASS}>
                  Telefon (opcjonalnie)
                </label>
              ) : null}
              <input
                id={field("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-label={withLabels ? undefined : "Telefon (opcjonalnie)"}
                value={formData.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className={FIELD_CLASS}
                placeholder="+48 600 100 200"
              />
            </div>
          ) : null}

          <div className="flex flex-1 flex-col">
            {withLabels ? (
              <label htmlFor={field("message")} className={LABEL_CLASS}>
                Wiadomość
              </label>
            ) : null}
            <textarea
              id={field("message")}
              name="message"
              aria-label={withLabels ? undefined : "Wiadomość"}
              value={formData.message}
              onChange={(e) => setField("message", e.target.value)}
              rows={messageRows}
              className={`${FIELD_CLASS} flex-1 resize-none`}
              placeholder="Treść Twojej wiadomości"
            />
          </div>

          {status === "error" && errorMsg ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-xs text-red-400"
            >
              {errorMsg}
            </motion.p>
          ) : null}

          <div className="mt-auto pt-2">
            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="group relative w-fit overflow-hidden bg-foreground px-2 py-0.5 font-[family-name:var(--font-display)] text-[1.75rem] uppercase leading-none tracking-[0.02em] text-background disabled:opacity-50 md:text-[2rem]"
              whileHover={status !== "sending" ? "hover" : undefined}
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 bg-background"
                variants={{
                  initial: { x: "-100%" },
                  hover: { x: 0 },
                }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-foreground">
                {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
              </span>
            </motion.button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
