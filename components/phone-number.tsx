"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { sendGTMEvent } from "@/lib/gtm"

type PhoneNumberProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  phoneNumber: string
}

export function PhoneNumber({
  phoneNumber,
  className,
  onClick,
  ...props
}: PhoneNumberProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Fires for both mobile tel: taps and desktop copy-to-clipboard.
    sendGTMEvent("phone_click")
    if (window.innerWidth >= 768) {
      e.preventDefault()

      try {
        await navigator.clipboard.writeText(phoneNumber)
        setCopied(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setCopied(false)
        }, 2000)
      } catch {
        // Keep default desktop behavior silent if clipboard is unavailable.
      }
    }

    onClick?.(e)
  }

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {copied ? "Skopiowano!" : phoneNumber}
    </a>
  )
}
