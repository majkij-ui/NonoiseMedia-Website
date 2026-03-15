"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  const contactEmail = "contact@nonoise.media"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const socials = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `New message from ${formData.name || "Website visitor"}`
    const body = [
      `Name: ${formData.name || "-"}`,
      `Email: ${formData.email || "-"}`,
      "",
      "Message:",
      formData.message || "-",
    ].join("\n")

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="relative min-h-screen w-full bg-background">
      <Navigation fixed />

      {/* Main Content */}
      <div className="px-6 pb-24 pt-[calc(6.5rem+env(safe-area-inset-top))] md:px-12 md:pt-24 lg:pt-32">
        {/* Hero Email Section - Anchored at 50% */}
        <div className="mb-32 pl-0 md:mb-48 md:pl-[50%]">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 block text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            co możemy dla Ciebie stworzyć?
          </motion.span>

          {/* Massive Email */}
          <motion.a
            href={`mailto:${contactEmail}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ opacity: 0.7 }}
            className="block font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground transition-opacity sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {contactEmail.toUpperCase()}
          </motion.a>
          <motion.a
            href="tel:+48882111288"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            whileHover={{ opacity: 0.7 }}
            className="block font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-[0.02em] text-foreground transition-opacity sm:text-5xl md:text-6xl lg:text-7xl"
          >
            TEL. 882 111 288
          </motion.a>
        </div>

        {/* Form + Socials Grid */}
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2 md:gap-12 lg:gap-24">
          {/* Socials Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 md:order-1"
          >
            <span className="mb-6 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Socials
            </span>
            <div className="flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-fit font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-foreground transition-opacity hover:opacity-60 md:text-2xl"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 flex flex-col gap-8 md:order-2"
          >
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-b border-foreground/20 bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/50"
                placeholder="Your name"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-b border-foreground/20 bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/50"
                placeholder="your@email.com"
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="resize-none border-b border-foreground/20 bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/50"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="group relative overflow-hidden bg-foreground px-2 py-0.5 font-[family-name:var(--font-display)] text-xl uppercase leading-none tracking-[0.02em] text-background"
              >
                <span className="relative z-10">Send Message</span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-6 text-xs tracking-widest text-muted-foreground md:px-12">
        <span>© 2024</span>
        <span>WARSAW, POLAND</span>
      </footer>

    </main>
  )
}
