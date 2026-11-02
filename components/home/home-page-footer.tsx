"use client"

import { useTranslations } from "next-intl"
import { FooterLegalLinks } from "@/components/footer-legal-links"

/** Homepage footer strip — split for lazy hydration separate from hero. */
export function HomePageFooter({ className }: { className?: string }) {
  const tFooter = useTranslations("footer")
  return (
    <footer
      className={
        className ??
        "flex flex-wrap items-center justify-end gap-x-6 gap-y-2 px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12"
      }
    >
      <FooterLegalLinks />
      <span>{tFooter("copyright")}</span>
    </footer>
  )
}
