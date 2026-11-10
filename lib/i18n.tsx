"use client"

import * as React from "react"

export type Locale = "es" | "en"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = "ws-locale"

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("es")

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "es") setLocaleState(stored)
  }, [])

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.lang = next
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider")
  return ctx
}

/** Picks the string for the active locale; falls back to es. */
export function pick(locale: Locale, es: string, en: string) {
  return locale === "en" ? en : es
}
