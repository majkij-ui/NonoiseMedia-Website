"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { LeadForm } from "@/components/lead-form"
import { sendGTMEvent } from "@/lib/gtm"
import { PhoneNumber } from "@/components/phone-number"
import { cinematicEase } from "@/components/about/constants"
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/contact-info"
import { LEAD_HEADING_ID, LEAD_SECTION_ID } from "@/components/lp/scroll-to-lead"
import { LP_SERVICE_IDS, LP_SERVICE_OTHER } from "@/lib/lp-services"

const CONTACT_LINK_CLASS =
  "block w-fit font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-[0.02em] text-foreground transition-opacity hover:opacity-70 md:text-4xl"

/** Phone and email as large links. Rendered once per breakpoint so a phone gets the form first. */
function ContactLinks({ className }: { className: string }) {
  return (
    <div className={className}>
      <a href={`mailto:${CONTACT_EMAIL}`} data-gaw-contact="email-lp" className={CONTACT_LINK_CLASS}>
        {CONTACT_EMAIL}
      </a>
      <PhoneNumber phoneNumber={CONTACT_PHONE} data-gaw-contact="phone-lp" className={CONTACT_LINK_CLASS} />
    </div>
  )
}

/**
 * The landing page's closing section: the contact form itself, with the phone
 * number and email beside it. Ad visitors convert here, without leaving the page.
 * Below it sits a quieter invitation to the questionnaire.
 */
export function LpLeadSection({
  service,
  onServiceChange,
}: {
  /** The format chosen on a service tile, or "" when none. */
  service: string
  onServiceChange: (service: string) => void
}) {
  const t = useTranslations("lp.kampania")
  const tFooter = useTranslations("footer")

  const serviceOptions = [
    ...LP_SERVICE_IDS.map((id) => ({ value: id, label: t(`services.${id}.title`) })),
    { value: LP_SERVICE_OTHER, label: t("formServiceOther") },
  ]

  return (
    <section
      id={LEAD_SECTION_ID}
      className="scroll-mt-20 border-t border-white/20 bg-surface-raised px-6 py-12 md:px-12 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="grid grid-cols-1 gap-7 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-5">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("leadLabel")}
          </p>
          <h2
            id={LEAD_HEADING_ID}
            tabIndex={-1}
            className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground outline-none sm:text-5xl md:text-6xl"
          >
            {t("leadCta")}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/60 md:mt-6">{t("leadBody")}</p>
          <p className="mt-4 max-w-sm border-l border-foreground/40 pl-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-foreground/85">
            {t("leadPromise")}
          </p>

          {/* Desktop: beside the form. On a phone the form comes first; see below. */}
          <ContactLinks className="mt-8 hidden space-y-2 md:block" />
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="flex min-h-[22rem] flex-col border border-white/20 bg-background p-5 md:p-7">
            <LeadForm
              source="lp-kampania"
              withPhone
              withLabels
              messageRows={3}
              serviceField={{
                label: t("formServiceLabel"),
                placeholder: t("formServicePlaceholder"),
                options: serviceOptions,
                value: service,
                onChange: onServiceChange,
              }}
            />
          </div>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-foreground/50">
            {t("leadPrivacy")}{" "}
            {/* New tab: following it in place would discard a half-written enquiry. */}
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-foreground"
            >
              {tFooter("privacy")}
            </Link>
            .
          </p>
          <ContactLinks className="mt-10 space-y-2 md:hidden" />
        </div>
      </motion.div>

      {/* A second way in, for visitors who would rather be asked than write. Two of the
          largest clients won from ads started here. New tab with rel="opener", like the
          portfolio link: this page stays open and the ad click travels with the visitor. */}
      <div className="mt-12 flex flex-col gap-5 border-t border-white/20 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between md:pt-10">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-[0.02em] text-foreground md:text-3xl">
            {t("questionnaireTitle")}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/60">{t("questionnaireBody")}</p>
        </div>
        <Link
          href="/questionnaire"
          target="_blank"
          rel="opener"
          onClick={() => sendGTMEvent("lp_questionnaire_click")}
          className="w-fit shrink-0 border border-foreground px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {t("questionnaireCta")}
        </Link>
      </div>
    </section>
  )
}
