import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { CookieSettingsLink } from "@/components/cookie-settings-link"

const FOOTER_LINK_CLASS = "uppercase transition-colors hover:text-foreground"

/** Privacy policy + cookie settings, placed before the copyright in every footer. */
export function FooterLegalLinks() {
  const t = useTranslations("footer")

  return (
    <>
      <Link href="/privacy" className={FOOTER_LINK_CLASS}>
        {t("privacy")}
      </Link>
      <CookieSettingsLink className={FOOTER_LINK_CLASS} />
    </>
  )
}
