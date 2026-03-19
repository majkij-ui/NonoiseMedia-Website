"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedMenuButton } from "@/components/animated-menu-button"

export default function QuestionnairePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [otherCategory, setOtherCategory] = useState("")
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [budgetRange, setBudgetRange] = useState("")
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [formData, setFormData] = useState({
    goal: "",
    audience: "",
    platforms: "",
    showInFrame: "",
    references: "",
    onCamera: "",
    deadline: "",
    additionalInfo: "",
    contactDetail: "",
  })

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const categoryOptions = [
    {
      label: "Wideo produktowe / usługowe / wizerunkowe",
      hint: "np. mała kampania reklamowa, demo fizycznego produktu, spot promocyjny usługi",
    },
    {
      label: "Wywiady / referencje / podcasty",
      hint: "np. case studies z Twoimi klientami, rozmowy z ekspertami, wideo-podcasty",
    },
    {
      label: "Dokument / wydarzenia / sport",
      hint: "np. relacja z eventu branżowego, wideo zza kulis, dynamiczna relacja akcji",
    },
    {
      label: "Inne",
      hint: "opisz poniżej",
    },
  ]

  const collaborationModels = [
    {
      label: "Projekt jednorazowy",
      hint: "Mamy konkretną potrzebę (np. premiera produktu) i przeznaczony na to budżet",
    },
    {
      label: "Stała współpraca (Retainer)",
      hint: "Zależy nam na regularnym dostarczaniu spójnych treści (np. seria podcastów, comiesięczne rolki)",
    },
    {
      label: "Potrzebujemy doradztwa",
      hint: "Nie wiemy jeszcze, co sprawdzi się lepiej i potrzebujemy Waszej wyceny oraz rekomendacji",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      category: selectedCategory === "Inne" ? otherCategory : selectedCategory,
      collaborationModel: selectedModel,
      budgetRange,
      contactMethod,
      ...formData,
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-background/80 px-6 py-6 backdrop-blur-sm md:px-12">
        <div className="flex items-center gap-4">
          <AnimatedMenuButton
            isOpen={false}
            onClick={() => setIsMenuOpen(true)}
          />
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/images/logo-orb.png"
              alt="Nonoise Media"
              className="h-5 w-5"
            />
            <span className="text-sm font-light tracking-[0.3em] text-foreground">
              NONOISE MEDIA
            </span>
          </a>
        </div>
        <div className="w-10" />
      </header>

      {/* Content */}
      <form onSubmit={handleSubmit} className="px-6 pb-32 md:px-12">
        {/* Hero Header - Full viewport height */}
        <section className="flex min-h-[calc(100vh-88px)] flex-col justify-center py-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 max-w-5xl font-[family-name:var(--font-display)] text-6xl uppercase leading-none tracking-tight text-foreground md:text-8xl lg:text-9xl"
          >
            ZAPLANUJMY TWÓJ PROJEKT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            Najlepsze produkcje powstają, gdy od samego początku gramy do tej samej bramki. Jako butikowa agencja nie chcemy sprzedawać Ci niepotrzebnego rozmachu rodem z Hollywood — naszym celem jest dopasowanie skali produkcji do Twoich realnych potrzeb biznesowych.
          </motion.p>

          {/* START Button */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => {
              const firstSection = document.getElementById("section-01")
              firstSection?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group relative mt-12 w-fit overflow-hidden bg-foreground px-4 py-2 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-background md:text-4xl"
          >
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-foreground">
              START
            </span>
          </motion.button>
        </section>

        {/* Question 1: Category - Smaller Title */}
        <section id="section-01" className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              01
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
              TEMAT I KATEGORIA
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Wybierz kategorię, która najlepiej opisuje Twój projekt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {categoryOptions.map((option, index) => (
              <motion.button
                key={option.label}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(option.label)}
                className={`group relative overflow-hidden border px-6 py-5 text-left transition-all ${
                  selectedCategory === option.label
                    ? "border-foreground bg-foreground"
                    : "border-foreground/30 bg-transparent hover:border-foreground/60"
                }`}
              >
                <span
                  className={`relative z-10 block font-[family-name:var(--font-display)] text-lg uppercase tracking-wide transition-colors md:text-xl ${
                    selectedCategory === option.label
                      ? "text-background"
                      : "text-foreground"
                  }`}
                >
                  {option.label}
                </span>
                <span
                  className={`relative z-10 mt-1 block text-xs transition-colors ${
                    selectedCategory === option.label
                      ? "text-background/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {option.hint}
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedCategory === "Inne" && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  placeholder="Opisz swój projekt..."
                  className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Question 2: Goal & Distribution */}
        <section className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              02
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
              CEL I DYSTRYBUCJA
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Zrozumienie, gdzie wideo będzie "żyć", pozwala nam zaplanować odpowiednie formaty.
            </p>
          </motion.div>

          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <label className="mb-1 block text-sm text-foreground">
                Jaki jest główny cel tego materiału?
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                np. zwiększenie sprzedaży konkretnego produktu B2B, pozyskanie leadów, budowa zaufania do marki
              </p>
              <input
                type="text"
                value={formData.goal}
                onChange={(e) =>
                  setFormData({ ...formData, goal: e.target.value })
                }
                className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                placeholder="Twoja odpowiedź..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="mb-1 block text-sm text-foreground">
                Kto jest odbiorcą końcowym?
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                np. dyrektorzy zakupów, właściciele małych firm, specjaliści IT
              </p>
              <input
                type="text"
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
                className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                placeholder="Twoja odpowiedź..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="mb-1 block text-sm text-foreground">
                Gdzie najczęściej Twoi klienci będą oglądać to wideo?
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                np. strona główna www, kampania reklamowa na LinkedIn/Meta, targi branżowe
              </p>
              <input
                type="text"
                value={formData.platforms}
                onChange={(e) =>
                  setFormData({ ...formData, platforms: e.target.value })
                }
                className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                placeholder="Twoja odpowiedź..."
              />
            </motion.div>
          </div>
        </section>

        {/* Question 3: Vision & Scale */}
        <section className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              03
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
              WIZJA I SKALA
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tu określamy, czy potrzebujemy studia, aktorów, czy raczej autentycznego podejścia w Twoim biurze.
            </p>
          </motion.div>

          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <label className="mb-1 block text-sm text-foreground">
                Co musimy fizycznie pokazać w kadrze?
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                np. nasz nowy produkt w użyciu, proces świadczenia usługi u klienta, wypowiedź prezesa
              </p>
              <input
                type="text"
                value={formData.showInFrame}
                onChange={(e) =>
                  setFormData({ ...formData, showInFrame: e.target.value })
                }
                className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                placeholder="Twoja odpowiedź..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="mb-1 block text-sm text-foreground">
                Czy masz przykłady wideo, które wpadły Ci w oko?
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                Wklej 1-2 linki i napisz, co Ci się w nich podoba
              </p>
              <textarea
                value={formData.references}
                onChange={(e) =>
                  setFormData({ ...formData, references: e.target.value })
                }
                rows={3}
                className="w-full resize-none border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                placeholder="Twoja odpowiedź..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="mb-1 block text-sm text-foreground">
                Kto wystąpi przed kamerą?
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                np. nasz zespół, zadowoleni klienci, wynajęci aktorzy, a może tylko lektor w tle?
              </p>
              <input
                type="text"
                value={formData.onCamera}
                onChange={(e) =>
                  setFormData({ ...formData, onCamera: e.target.value })
                }
                className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                placeholder="Twoja odpowiedź..."
              />
            </motion.div>
          </div>
        </section>

        {/* Question 4: Collaboration Model & Budget */}
        <section className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              04
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
              MODEL WSPÓŁPRACY I BUDŻET
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Skala budżetu decyduje o wielkości ekipy, jakości sprzętu i czasie poświęconym na postprodukcję.
            </p>
          </motion.div>

          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <label className="mb-1 block text-sm text-foreground">
                Kiedy gotowy materiał musi ujrzeć światło dzienne?
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                np. za 2 tygodnie, do końca kwartału, bez presji czasowej
              </p>
              <input
                type="text"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                placeholder="Twoja odpowiedź..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="mb-3 block text-sm text-foreground">
                Jaki model współpracy najbardziej odpowiada Twoim potrzebom?
              </label>
              <div className="flex flex-col gap-3">
                {collaborationModels.map((model, index) => (
                  <button
                    key={model.label}
                    type="button"
                    onClick={() => setSelectedModel(model.label)}
                    className={`border px-5 py-4 text-left transition-all ${
                      selectedModel === model.label
                        ? "border-foreground bg-foreground"
                        : "border-foreground/30 bg-transparent hover:border-foreground/60"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium transition-colors ${
                        selectedModel === model.label
                          ? "text-background"
                          : "text-foreground"
                      }`}
                    >
                      {model.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs transition-colors ${
                        selectedModel === model.label
                          ? "text-background/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {model.hint}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence>
              {selectedModel === "Projekt jednorazowy" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <label className="mb-1 block text-sm text-foreground">
                    Przewidywany budżet
                  </label>
                  <p className="mb-3 text-xs text-muted-foreground">
                    np. 10k-20k PLN, 30k-50k PLN
                  </p>
                  <input
                    type="text"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                    placeholder="Twoje widełki budżetowe..."
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Question 5: Additional Info */}
        <section className="flex min-h-[40vh] flex-col justify-center border-t border-foreground/10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              05
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
              DODATKOWE INFORMACJE
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Czy jest coś jeszcze, o czym powinniśmy wiedzieć?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-xs text-muted-foreground">
              np. księga znaku, specyficzne wymogi korporacyjne, obawy związane z występowaniem przed kamerą
            </p>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData({ ...formData, additionalInfo: e.target.value })
              }
              rows={4}
              className="w-full resize-none border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
              placeholder="Twoja odpowiedź..."
            />
          </motion.div>
        </section>

        {/* Contact & Submit */}
        <section className="flex min-h-[50vh] flex-col justify-center border-t border-foreground/10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              06
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-foreground md:text-3xl">
              DANE KONTAKTOWE
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex gap-3"
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
              [ E-MAIL ]
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
              [ TELEFON ]
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
              value={formData.contactDetail}
              onChange={(e) =>
                setFormData({ ...formData, contactDetail: e.target.value })
              }
              className="w-full border-b border-foreground/30 bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
              placeholder={contactMethod === "email" ? "email@example.com" : "+48 XXX XXX XXX"}
            />
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover="hover"
            className="group relative w-fit overflow-hidden border border-foreground bg-foreground px-10 py-5"
          >
            <motion.div
              className="absolute inset-0 bg-background"
              variants={{
                initial: { x: "-100%" },
                hover: { x: 0 },
              }}
              initial="initial"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
            <span className="relative z-10 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-background transition-colors group-hover:text-foreground md:text-2xl">
              WYŚLIJ ZAPYTANIE
            </span>
          </motion.button>
        </section>
      </form>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
          >
            <div className="flex justify-between px-6 py-6 md:px-12">
              <div className="flex items-center gap-4">
                <AnimatedMenuButton
                  isOpen={true}
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/logo-orb.png"
                    alt="Nonoise Media"
                    className="h-5 w-5"
                  />
                  <span className="text-sm font-light tracking-[0.3em] text-foreground">
                    NONOISE MEDIA
                  </span>
                </div>
              </div>
              <div className="w-10" />
            </div>

            <nav className="flex flex-1 items-center">
              <div className="flex w-full flex-col gap-1 pl-[50%] pr-6 md:pr-12">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative w-fit font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-[0.02em] text-foreground md:text-3xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </nav>

            <div className="flex flex-col items-center gap-4 px-6 py-8 text-center text-xs tracking-widest text-muted-foreground md:flex-row md:justify-between md:px-12">
              <span>hello@nonoisemedia.com</span>
              <span>WARSAW, POLAND</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
