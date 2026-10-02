'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn('h-9 w-9 rounded-xl shrink-0', className)}
    >
      {mounted ? (
        isDark ? (
          <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
        )
      ) : (
        <Sun className="h-[18px] w-[18px] opacity-0" aria-hidden="true" />
      )}
    </Button>
  )
}
