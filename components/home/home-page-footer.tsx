"use client"

import { useTranslations } from "next-intl"

/** Homepage footer strip — split for lazy hydration separate from hero. */
export function HomePageFooter({ className }: { className?: string }) {
  const tFooter = useTranslations("footer")
  return (
    <footer
      className={
        className ??
        "flex items-center justify-end px-6 py-8 text-xs tracking-widest text-muted-foreground md:px-12"
      }
    >
      <span>{tFooter("copyright")}</span>
    </footer>
  )
}
