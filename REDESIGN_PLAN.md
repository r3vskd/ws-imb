# WS Asesoría Inmobiliaria — Redesign Implementation Plan

**Status:** implemented (see §16). Production build, typecheck and route smoke tests pass.
**Purpose:** handoff document so another model can execute the full task without re-investigating the repo or re-fetching component sources.
**Language:** English (per `AGENTS.md`). Public-facing site copy stays in Spanish.

---

## 0. Request summary (locked scope)

Redesign and transform the visual layer of the site (text sections, divs, paragraphs, resources, components, elements) while preserving all routes, content, forms, tracking, SEO and business information.

Four third-party components must be integrated **as published**, not re-imagined:

| Where | Component | Source |
|---|---|---|
| "Tres paradas. Una sola cámara." section (`/paseo`) | Modul-inspired animated Table of Contents | `https://cuicui.day/application-ui/table-of-contents` |
| New forms section (home + `/contact`) | Formisch + shadcn `Field` | `https://ui.shadcn.com/docs/forms/formisch` |
| Testimonials | Fancy Testimonials Slider | `https://www.eldoraui.site/docs/components/testimonal-slider` |
| Company stats (3 cards) | Animata Bento Grid "Three" | `https://animata.design/docs/bento-grid/three` |

Additional locked requirements:

- Palette for public pages: **dark gray + grayscale**, with **pastel-purple** accents only.
- **Navbar preserved identical** — only the border changes to white.
- **`recorrido animado` preserved** — only the current white end-transition must become a **dark gray grained background**.
- Do not invent components or elements. Take the references identically; only color tokens and content data may change.

---

## 1. Repository audit (verified facts)

### 1.1 Stack

- Next.js `15.2.6`, React `19`, TypeScript, Tailwind CSS `3.4.17` (v3 config, not v4).
- shadcn-style UI kit in `components/ui/` (57 files) — includes `field.tsx`, `input-group.tsx`, `form.tsx`, `card.tsx`, `button.tsx`.
- Animation: `framer-motion` (installed), `gsap` + `ScrollTrigger`, `lenis`.
- Forms: `react-hook-form` + `zod` + `@hookform/resolvers` (current `/contact`).
- Analytics: Meta Pixel wrapper + Vercel Analytics.
- Email: `resend` via `app/api/contact/route.ts` (env: `RESEND_WEBSITE_FORMS`).
- Two lockfiles exist: `package-lock.json` **and** `pnpm-lock.yaml`. `package-lock.json` is already modified in the working tree. **Do not delete either.** Confirm with the owner which package manager to use before installing.

### 1.2 Routes (must all survive)

```
/                                  app/page.tsx
/contact                           app/contact/page.tsx
/propiedades                       app/propiedades/page.tsx
/sobre-nosotros                    app/sobre-nosotros/page.tsx
/paseo                             app/paseo/page.tsx        (recorrido animado)
/walkthrough                       app/walkthrough/page.tsx
/kubrika                           app/kubrika/page.tsx
/politicas-de-privacidad
/terminos-y-condiciones
/api/contact                        POST (Resend)
```

### 1.3 Shared layout

- `components/layout/navbar.tsx` — client component, scroll state, theme toggle, mobile sheet.
- `components/layout/footer.tsx` — 4-column footer, `bg-black`, blue accents.
- `app/layout.tsx` — Poppins + Josefin Sans, `ThemeProvider` (`defaultTheme="system"`), MetaPixel, WhatsAppButton, Analytics, `selection:bg-teal-600`.
- `app/globals.css` — shadcn tokens in HSL, plus a dark-mode "blue-black grained" background (`.dark` block) and `.contact-form` autofill overrides.

### 1.4 Current home page (`app/page.tsx`, 791 lines) — sections in order

1. Hero (background image `/ajVnNQ.jpg`, search form)
2. `#servicios` — 6 service cards
3. `#rentar` — "¿Quieres rentar tu propiedad?" checklist
4. `#vender` — "¿Quieres vender tu propiedad?" checklist
5. `#featured` — Categorías y Zonas Destacadas (2 cards)
6. `#properties` — Propiedades Destacadas (4 featured ids: `WS038`, `WS047`, `WS051`, `WS052`)
7. `#expertise` — "¿Por qué asesorarte con WS?" (3 cards, black bg)
8. `#testimonials` — 4 static testimonial cards
9. `#equipo` — 2 team cards
10. `#contacto` — CTA final (3 buttons)
+ `AdvisorSelectorModal`, `Footer`

Content is real and must be preserved verbatim (service descriptions, checklists, testimonials, team bios, WhatsApp numbers, `wa.me/529992284783`).

### 1.5 Recorrido animado (`/paseo`)

- `app/paseo/page.tsx` — hero-less page: `<ScrollJourney />` then `#ficha` (paper `#F4F1EB`), a "Tres paradas. Una sola cámara." block with an `<ol>` of the 3 stops, a 6-image gallery, and a `/contact` link.
- `components/journey/ScrollJourney.tsx` — GSAP `ScrollTrigger` + Lenis; fixed stage; progress bar; the **white exit overlay** is the element to change:
  ```tsx
  <div ref={exitRef} aria-hidden
       className="pointer-events-none absolute inset-0 z-20 bg-[#F4F1EB]"
       style={{ opacity: 0, backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }} />
  ```
  It fades in (`opacity = exit`) with a blur ramp `0 → 28px` in `onUpdate`.
- `components/journey/DepthStage.tsx` — WebGL depth-parallax + scroll-seeked video. **Do not touch shader, video blob loading, or progress math.**
- `lib/journey.ts` — `stops` (sala, entrada, cocina) and `gallery` (6 images).
- `app/paseo/paseo.css` — `.paseo-root` paper/ink tokens, `.paseo-display`, `.paseo-sans`, `.paseo-label`, Lenis rules.

### 1.6 Verified data constraints

- No repo data exists for "clientes satisfechos" or `$5,500,000`; those values come only from the user's request.
- Verified existing claims (safe to reuse): "más de 6 años", "más de 25 años" (team), "Mérida, Yucatán", phone numbers, emails.
- "Top 2 propiedades" → the number `2` is user-provided.

---

## 2. Design system

### 2.1 Palette (the only permitted visual deviation from the references)

Dark gray + grayscale + pastel purple. Two themes must both work because the navbar's `ThemeToggle` is preserved.

**Dark theme (default for public pages)**

| Token | HSL | Hex | Use |
|---|---|---|---|
| `--background` | `240 4% 7%` | `#111114` | page base |
| `--foreground` | `240 6% 93%` | `#ECECEF` | primary text |
| `--card` | `240 4% 10%` | `#18181C` | cards |
| `--card-foreground` | `240 6% 93%` | `#ECECEF` | |
| `--popover` | `240 4% 10%` | `#18181C` | |
| `--primary` | `265 62% 83%` | `#C9B6F2` | pastel purple accent |
| `--primary-foreground` | `260 20% 10%` | `#14121A` | text on lilac |
| `--secondary` | `240 3% 16%` | `#27272C` | |
| `--secondary-foreground` | `240 6% 93%` | `#ECECEF` | |
| `--muted` | `240 3% 16%` | `#27272C` | |
| `--muted-foreground` | `240 4% 66%` | `#A1A1A9` | |
| `--accent` | `265 30% 20%` | `#2E2837` | lilac-tinted surface |
| `--accent-foreground` | `265 62% 88%` | `#D8CBF6` | |
| `--destructive` | `0 62% 55%` | — | errors |
| `--border` | `240 3% 20%` | `#313136` | |
| `--input` | `240 3% 20%` | `#313136` | |
| `--ring` | `265 62% 83%` | `#C9B6F2` | focus |
| `--radius` | `0.5rem` | — | keep |

**Light theme (grayscale, no hue shift)**

| Token | HSL | Hex |
|---|---|---|
| `--background` | `240 6% 97%` | `#F6F6F8` |
| `--foreground` | `240 5% 10%` | `#18181B` |
| `--card` | `0 0% 100%` | `#FFFFFF` |
| `--primary` | `265 45% 45%` | `#6F52A8` |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` |
| `--muted` | `240 5% 93%` | `#EDEDF0` |
| `--muted-foreground` | `240 4% 38%` | `#5D5D64` |
| `--border` | `240 5% 88%` | `#DEDEE3` |
| `--ring` | `265 45% 45%` | `#6F52A8` |

> Contrast rule: pastel `#C9B6F2` is for dark surfaces, borders, icons and large text. For normal-size text on light surfaces use `#6F52A8` (≥4.5:1 on white). Verify with a contrast checker before delivery; do not ship `#C9B6F2` as body text on light.

**Extra tokens to add** in `app/globals.css` `@layer base` (used by paseo + grain):

```css
--ws-ink: #0F1012;
--ws-graphite: #17181B;
--ws-surface: #1E1F23;
--ws-line: #2C2D32;
--ws-gray-500: #8A8C93;
--ws-gray-300: #B4B6BC;
--ws-gray-200: #D6D7DB;
--ws-lilac: #C9B6F2;
--ws-lilac-soft: rgba(201, 182, 242, 0.14);
```

### 2.2 Grain

Reuse the existing inline-SVG noise recipe from `globals.css` (`.dark body::after`) as a utility:

```css
.ws-grain {
  position: relative;
  background-color: var(--ws-graphite);
}
.ws-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### 2.3 Typography & spacing

- Keep `Poppins` (headings) + `Josefin Sans` (body) — already wired.
- Paseo keeps `Google Sans` via `.paseo-*` classes.
- 4/8 px rhythm; section padding `py-20` (desktop) / `py-16` (mobile); container `container mx-auto px-4`.
- Restrained motion: keep existing `fadeInUp`/`staggerContainer`; no new scroll hijacking outside `/paseo`.

### 2.4 What stays untouched

- All copy and business facts.
- `AdvisorSelectorModal`, Meta Pixel calls, WhatsApp deep links, `app/api/contact/route.ts`.
- `DepthStage` internals.
- Navbar structure/markup — **only borders**.

---

## 3. Component A — Cuicui Modul-inspired Table of Contents

**Target:** `/paseo` `#ficha` section ("Tres paradas. Una sola cámara.").

### 3.1 Exact upstream source (decoded from GitHub, `following-headers.tsx`)

```tsx
"use client";

import { ShinyGradientSkeletonHorizontal } from "@/cuicui/common-ui/skeletons/shiny-gradient/horizontal.variant";
import { cn } from "@/cuicui/utils/cn";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { type HTMLProps, useEffect, useRef, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
  index: number;
};

const TableOfContent = ({
  className,
  idOfParentContainer,
  ...props
}: {
  readonly props?: HTMLProps<HTMLDivElement>;
  readonly className?: string;
  readonly idOfParentContainer: string;
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [activeTableOfContentIds, setActiveTableOfContentIds] = useState<
    string[]
  >([]);
  const [firstActiveHeading2, setFirstActiveHeading2] = useState<string | null>(
    null,
  );
  const [lastActiveHeading2, setLastActiveHeading2] = useState<string | null>(
    null,
  );
  const [bottomCoordinate, setBottomCoordinate] = useState<number>(0);
  const [topCoordinate, setTopCoordinate] = useState<number>(0);
  const refTableOfContentList = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (activeTableOfContentIds.length > 0) {
      setFirstActiveHeading2(activeTableOfContentIds[0]);
      setLastActiveHeading2(
        activeTableOfContentIds[activeTableOfContentIds.length - 1],
      );
    } else {
      setFirstActiveHeading2(null);
      setLastActiveHeading2(null);
    }
  }, [activeTableOfContentIds]);

  useEffect(() => {
    // Get coordinates of the bottom of the last active heading and the top of the first active heading
    const lastChildId =
      activeTableOfContentIds[activeTableOfContentIds.length - 1];
    const firstChildId = activeTableOfContentIds[0];
    const lastChild = document.getElementById(
      `${lastChildId}-table-of-content-item`,
    );
    const firstChild = document.getElementById(
      `${firstChildId}-table-of-content-item`,
    );

    if (lastChild && firstChild) {
      const lastChildRect = lastChild.getBoundingClientRect();
      const firstChildRect = firstChild.getBoundingClientRect();

      // Calculate relative coordinates from the ol element
      if (!refTableOfContentList.current) {
        return;
      }
      setBottomCoordinate(
        lastChildRect.bottom -
          refTableOfContentList.current.getBoundingClientRect().top,
      );
      setTopCoordinate(
        firstChildRect.top -
          refTableOfContentList.current.getBoundingClientRect().top,
      );
    }
  }, [activeTableOfContentIds]);

  useEffect(() => {
    if (!headings) {
      return;
    }
    if (activeIds.length > 0) {
      const previousHeading = getPreviousHeading(activeIds[0], headings);
      if (previousHeading) {
        const activeIdsWithPreviousHeading = [previousHeading, ...activeIds];
        setActiveTableOfContentIds(activeIdsWithPreviousHeading);
      } else {
        setActiveTableOfContentIds(activeIds);
      }
    } else {
      // Keep the previous active ids if there are no active ids but without the first one
      setActiveTableOfContentIds((prevIds) => {
        if (prevIds.length > 0) {
          return prevIds.slice(1);
        }
        return [];
      });
    }
  }, [activeIds, headings]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const content = document.getElementById(idOfParentContainer);
    if (!content) {
      return;
    }

    const headingElements = Array.from(
      content.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );

    const newHeadings: Heading[] = headingElements.map((elem, index) => {
      let id = elem.id;
      if (!id) {
        id =
          elem.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[!@#$%^&*(),.?":{}|<>]/g, "") ?? "";
        elem.id = id;
      }
      const level = Number.parseInt(elem.tagName.substring(1), 10);
      return { id, text: elem.textContent ?? "", level, index };
    });

    setHeadings(newHeadings);

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      const updateActiveIds = (
        prevIds: string[],
        entries: IntersectionObserverEntry[],
      ) => {
        const updatedIds = [...prevIds];
        for (const entry of entries) {
          const index = updatedIds.indexOf(entry.target.id);

          if (entry.isIntersecting) {
            if (index === -1) {
              updatedIds.push(entry.target.id);
              updatedIds.sort(
                (a, b) =>
                  headingElements.findIndex((el) => el.id === a) -
                  headingElements.findIndex((el) => el.id === b),
              );
            }
          } else if (index !== -1) {
            updatedIds.splice(index, 1);
          }
        }

        return updatedIds;
      };

      setActiveIds((prevIds) => updateActiveIds(prevIds, entries));
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-10px",
      // threshold: [0.5, 1],
      threshold: [1],
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    for (const elem of headingElements) {
      observer.observe(elem);
    }

    return () => {
      observer.disconnect();
    };
  }, [idOfParentContainer]);

  function getPreviousHeading(id: string, headings: Heading[]) {
    const index = headings.findIndex((heading) => heading.id === id);
    if (index === 0) {
      return null;
    }
    return headings[index - 1]?.id;
  }

  if (headings.length === 0) {
    return <ShinyGradientSkeletonHorizontal />;
  }

  return (
    <nav className={cn("bg-white dark:bg-neutral-800", className)} {...props}>
      <ol className="relative overflow-hidden " ref={refTableOfContentList}>
        {headings.map((heading, _index) => {
          return (
            <li
              className="group relative px-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100"
              id={`${heading.id}-table-of-content-item`}
              key={heading.id}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-px left-0 z-20 h-full select-none bg-white dark:bg-neutral-800"
                style={{
                  width: `${(heading.level - 1) * 8 - 1}px`,
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-20 h-full w-full select-none bg-white dark:bg-neutral-800"
                style={{
                  left: `${(heading.level - 1) * 8}px`,
                }}
              />
              <Link
                className={cn(
                  "relative z-30 block transform-gpu py-1.5 pr-5 pl-2 text- sm leading-4 tracking-tight transition-all hover:translate-x-0.5",
                  "before:absolute before:top-0.5 before:right-0 before:bottom-0.5 before:left-0 ",
                  "before:scale-x-75 before:scale-y-50 before:transform-gpu before:rounded-lg before:bg-neutral-400/10 before:opacity-0 before:transition-all before:duration-300 group-hover:before:scale-100 group-hover:before:opacity-100",
                  (heading.level === 1 || heading.level === 2) &&
                    "font-semibold",
                  heading.level === 3 && "font-normal",
                )}
                href={`#${heading.id}`}
                style={{
                  marginLeft: `${(heading.level - 1) * 8}px`,
                }}
              >
                {heading.text}
              </Link>
              <ChevronRight className="-translate-y-1/2 absolute top-1/2 right-1 ml-1 size-4 translate-x-1 transform-gpu opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </li>
          );
        })}
        <AnimatePresence>
          {firstActiveHeading2 && lastActiveHeading2 && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute z-10 w-full select-none bg-blue-500"
              exit={{ opacity: 0, y: -100 }}
              initial={{ opacity: 0, y: -100 }}
              layout={true}
              layoutId="active-bar"
              style={{
                top: topCoordinate,
                bottom: `calc(100% - ${bottomCoordinate}px)`,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </ol>
    </nav>
  );
};

export default TableOfContent;
```

### 3.2 Required adaptations (mechanical only)

Create `components/cuicui/table-of-content.tsx` with these exact substitutions:

| Upstream | Local |
|---|---|
| `@/cuicui/utils/cn` | `@/lib/utils` |
| `motion/react` | `framer-motion` (already installed; **do not add `motion`**) |
| `@/cuicui/common-ui/skeletons/shiny-gradient/horizontal.variant` | bundle the skeleton file (path upstream: `packages/ui/cuicui/common-ui/skeletons/shiny-gradient/horizontal.variant.tsx`) **or** return `null` until headings resolve |
| `bg-white dark:bg-neutral-800` (nav + both mask divs) | `bg-[var(--ws-graphite)]` |
| `text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100` | `text-[var(--ws-gray-500)] hover:text-[var(--ws-gray-200)]` |
| `bg-blue-500` (active bar) | `bg-[var(--ws-lilac)]` |
| `text- sm` typo | keep or normalize to `text-sm` (document the change) |

Everything else — observer logic, coordinate math, `layoutId`, hover translation — stays byte-identical.

### 3.3 Page restructure for `/paseo`

`app/paseo/page.tsx`:

1. Wrap the "Tres paradas" block and stop list in a container with `id="tres-paradas-content"`.
2. Render the TOC beside it (sticky on `lg`):
   ```tsx
   <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
     <TableOfContent
       className="hidden lg:sticky lg:top-24 lg:block w-full rounded-lg p-2"
       idOfParentContainer="tres-paradas-content"
     />
     <div id="tres-paradas-content"> …headings + copy… </div>
   </div>
   ```
   Mobile: the TOC is hidden (matches upstream's `md:w-72` intent) — do not invent a mobile variant.
3. The observer only sees `h1–h6`. Convert each stop to a heading so the TOC has 3 entries:
   ```tsx
   {stops.map((s, i) => (
     <section key={s.id} id={s.id} className="scroll-mt-24 py-5">
       <h3 className="paseo-sans text-sm font-medium">{s.label}</h3>
       <p className="paseo-sans mt-1 text-sm leading-relaxed">{s.note}</p>
     </section>
   ))}
   ```
   Keep the section heading `Tres paradas. Una sola cámara.` as `<h2>`; the TOC will show `h2` + the three `h3`s. This preserves copy and gives the component real targets.
4. The `<ol>`/numbering may remain as a visible complement, but **do not duplicate headings** inside the observed container (duplicate IDs break the observer).
5. Recolor the ficha to the dark grained surface (see §7).

---

## 4. Component B — Formisch + shadcn `Field`

**Target:** new "forms section" on the home page + `/contact` replacement.

### 4.1 Dependencies (free / open source, no paid services)

```
@formisch/react   (Formisch React bindings)
valibot           (schema validation; replaces zod for this form)
```

`components/ui/field.tsx` and `components/ui/input-group.tsx` **already exist** and already expose `Field`, `FieldGroup`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldContent`, `FieldTitle`, `FieldSet`, `FieldLegend`, `InputGroup`, `InputGroupTextarea`, `InputGroupAddon`, `InputGroupText`. No new shadcn files needed.

`components/ui/input.tsx` / `textarea.tsx` must accept `data-slot`/`aria-invalid` (they are shadcn components; verify `data-slot="input"` / `"input-group-control"` exists — `input-group.tsx` depends on it for focus/error rings).

### 4.2 Schema (exact, mirrors current `/contact` validation)

```tsx
import * as v from "valibot"

const FormSchema = v.object({
  nombre: v.pipe(v.string(), v.minLength(2, "Nombre es requerido")),
  apellido: v.pipe(v.string(), v.minLength(2, "Apellido es requerido")),
  telefono: v.pipe(
    v.string(),
    v.minLength(7, "Número de teléfono inválido"),
    v.maxLength(20, "Número de teléfono inválido"),
  ),
  correo: v.pipe(v.string(), v.email("Correo electrónico inválido")),
  ciudad: v.pipe(v.string(), v.minLength(2, "Ciudad es requerida")),
  pais: v.pipe(v.string(), v.minLength(2, "País es requerido")),
  mensaje: v.pipe(
    v.string(),
    v.nonEmpty("Mensaje es requerido"),
    v.maxLength(1200, "El mensaje no puede superar 200 palabras"),
    v.check(
      (val) => val.trim().split(/\s+/).filter(Boolean).length <= 200,
      "El mensaje no puede superar 200 palabras",
    ),
  ),
})
```

> `v.check` must receive a guard returning boolean — confirm the exact Valibot v1 signature from the installed version before shipping (`v.check<TInput>(requirement, message)`).

### 4.3 Component shape (follows the shadcn Formisch guide exactly)

Create `components/forms/contact-form.tsx`:

```tsx
"use client"

import * as React from "react"
import { Form, Field as FormischField, reset, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import * as v from "valibot"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
```

Rules from the guide:

- `<Form of={form} id="contact-form" onSubmit={handleSubmit}>`
- Wrap fields in `<FieldGroup>`.
- Each `<FormischField of={form} path={["nombre"]}>{(field) => ( … )}</FormischField>`
- Native inputs: spread `{...field.props}`, pass `value={field.input ?? ""}`, `aria-invalid={field.errors !== null}`.
- `<Field data-invalid={field.errors !== null}>` on the wrapper.
- Errors: `{field.errors && <FieldError errors={field.errors.map((message) => ({ message }))} />}`
- Textarea uses `InputGroup` + `InputGroupTextarea` + `InputGroupAddon align="block-end"` with a character counter, exactly as the demo.
- Reset: `<Button type="button" variant="outline" onClick={() => reset(form)}>Restablecer</Button>`
- Submit button: `type="submit" form="contact-form"`.

### 4.4 Wiring preserved

- `handleSubmit` keeps the current contract:
  - `fetch('/api/contact', { method: 'POST', body: JSON.stringify({ nombre, apellido, telefono, correo, mensaje, ciudad, pais }) })`
  - success → `trackMetaEvent('Lead', { content_name: 'Formulario de Contacto Web', city, country })`
  - success UI (green confirmation + "Continuar por WhatsApp" using `handleOpenWhatsApp` logic)
  - error UI message unchanged
- Keep `inputGlassClass` equivalent via tokens (no hardcoded white/black; use `bg-card text-card-foreground border-border`).
- Keep `.contact-form` autofill CSS (update the colors to the new palette).
- `/api/contact/route.ts` untouched.

### 4.5 Where it goes

- `/contact`: replace the RHF `<Form>` block with `<ContactForm />`. Keep the page heading, `Navbar`, `Footer`.
- Home: new section `#contacto-form` (place before `#contacto` or merge into it) containing `<ContactForm />`. Do not remove the existing CTA buttons.

---

## 5. Component C — EldoraUI Fancy Testimonials Slider

**Target:** replace the 4-card testimonial grid (`#testimonials`).

### 5.1 Dependency

`@headlessui/react` (free, MIT). Not currently installed. Alternatively rewrite `Transition` with `framer-motion` — **not allowed**, because the brief says take the component identically. Install `@headlessui/react`.

### 5.2 Published source (as fetched from the registry)

```tsx
"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Transition } from "@headlessui/react"

interface Testimonial {
  img: string
  quote: string
  name: string
  role: string
}

export default function FancyTestimonialsSlider({
  testimonials,
  autorotateTiming = 7000,
}: {
  testimonials: Testimonial[]
  autorotateTiming?: number
}) {
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number>(0)
  const [autorotate, setAutorotate] = useState<boolean>(true)

  useEffect(() => {
    if (!autorotate) return
    const interval = setInterval(() => {
      setActive(active + 1 === testimonials.length ? 0 : (active) => active + 1)
    }, autorotateTiming)
    return () => clearInterval(interval)
  }, [active, autorotate])

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
      {/* Testimonial image */}
      <div className="relative h-24 sm:h-32">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-cyan-500/25 before:via-cyan-500/5 before:via-25% before:to-cyan-500/0 before:to-75% sm:h-[480px] sm:w-[480px]">
          <div className="h-24 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))] sm:h-32">
            {testimonials.map((testimonial, index) => (
              <Transition
                as="div"
                key={index}
                show={active === index}
                className="absolute inset-0 -z-10 h-full"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
                beforeEnter={() => heightFix()}
              >
                <Image
                  className="relative top-8 left-1/2 -translate-x-1/2 rounded-full sm:top-11"
                  src={testimonial.img}
                  width={48}
                  height={48}
                  alt={testimonial.name}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="mb-6 transition-all delay-300 duration-150 ease-in-out sm:mb-9">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              beforeEnter={() => heightFix()}
            >
              <div className="px-2 text-lg font-bold text-cyan-900 before:content-['\201C'] after:content-['\201D'] sm:px-0 sm:text-xl lg:text-2xl">
                {testimonial.quote}
              </div>
            </Transition>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="-m-1 flex flex-wrap justify-center gap-1 sm:gap-1.5">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`m-1 inline-flex justify-center rounded-full px-2 py-1 text-xs whitespace-nowrap shadow-sm transition-colors duration-150 focus-visible:ring focus-visible:ring-cyan-300 focus-visible:outline-none sm:px-3 sm:py-1.5 sm:text-xs dark:focus-visible:ring-cyan-600 ${active === index ? "bg-cyan-500 text-white shadow-cyan-950 10" : "bg-white text-cyan-900 hover:bg-cyan-100"}`}
            onClick={() => {
              setActive(index)
              setAutorotate(false)
            }}
          >
            <span className="truncate">{testimonial.name}</span>{" "}
            <span className={`${active === index ? "text-cyan-200" : "text-cyan-300"}`}>-</span>{" "}
            <span className="truncate">{testimonial.role}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

### 5.3 Known upstream defects — fix, and record them in the delivery report

1. `setActive(active + 1 === testimonials.length ? 0 : (active) => active + 1)` passes a **function** into `setActive` on the non-wrapping branch → React treats it as an updater. Correct:
   ```tsx
   setActive((prev) => (prev + 1 === testimonials.length ? 0 : prev + 1))
   ```
2. `"shadow-cyan-950 10"` is an invalid class. Replace with `shadow-lg` (or remove).
3. The fetched markup shows `onClick` missing; the published registry JSON includes it. Include `onClick` as above.
4. `heightFix` writes a fixed pixel height to the parent — keep it, but ensure the wrapper has no conflicting `min-h`.

### 5.4 Theming deltas (colors only)

| Upstream class | Replace with |
|---|---|
| `before:from-cyan-500/25 before:via-cyan-500/5 before:to-cyan-500/0` | `before:from-[#C9B6F2]/25 before:via-[#C9B6F2]/5 before:to-[#C9B6F2]/0` |
| `text-cyan-900` | `text-foreground` |
| `bg-cyan-500 text-white` | `bg-primary text-primary-foreground` |
| `bg-white text-cyan-900 hover:bg-cyan-100` | `bg-card text-foreground hover:bg-muted` |
| `text-cyan-200` / `text-cyan-300` | `text-primary-foreground/70` / `text-muted-foreground` |
| `focus-visible:ring-cyan-300 dark:focus-visible:ring-cyan-600` | `focus-visible:ring-ring` |

`Image` from `next/image` requires `next.config.mjs` remote patterns for the avatar host. **Do not invent external avatar URLs** — reuse local assets. Current repo has no testimonial portraits; options:
- Use the existing initial-letter avatars as local SVG data URLs, or
- Add `unoptimized` + a local placeholder from `public/`.

Decide with the owner; do not fabricate client photos.

### 5.5 Data mapping (all 4 existing testimonials preserved verbatim)

```tsx
const testimonials = [
  { img: "/testimonials/denisse.svg", quote: "Excelente persona y como asesora inmobiliaria, la seriedad y profesionalismo con que realiza su trabajo por eso recomiendo ampliamente a Wendy Sánchez.", name: "Denisse Aznar", role: "Propietaria" },
  { img: "/testimonials/pilar.svg",   quote: "Excelente asesora, confiable, amable, realiza un filtro impecable al elegir al inquilino. Encantada con sus servicios. Gracias Wendy.", name: "Pilar Patrón", role: "Compradora" },
  { img: "/testimonials/eddie.svg",   quote: "Muy buena asesora, buscó inquilinos muy buenos para mi propiedad, clara y te resuelve todo. Muy recomendada.", name: "Eddie Ruiz", role: "Propietario" },
  { img: "/testimonials/maria.svg",   quote: "Excelente asesora inmobiliaria, lo afirmo por experiencia; ella ha tenido por años la renta de mis propiedades en sus manos y siempre el resultado ha sido exitoso.", name: "María Arcila", role: "Cliente Frecuente" },
]
```

Usage: `<FancyTestimonialsSlider testimonials={testimonials} autorotateTiming={5000} />` inside a container with `relative h-[400px] w-full overflow-hidden rounded-lg border sm:h-[500px]` (as the demo), recolored to `border-border bg-card`.

Accessibility note: the component has no pause control. Add `aria-live="polite"` on the text wrapper and stop autorotation on `focus-visible`/`prefers-reduced-motion` (minimal, non-visual change). Document it.

---

## 6. Component D — Animata Bento Grid "Three" (company stats)

**Target:** new home section, e.g. "La firma en números", placed after `#expertise` or before `#testimonials`.

### 6.1 Published source (verbatim)

```tsx
import { CarFront, Utensils } from "lucide-react";
import ExpenseTracker, { spendingTrackerProps } from "@/animata/widget/expense-tracker";
import { cn } from "@/lib/utils";

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-3xl p-4", className)}>
      {children}
    </div>
  );
}

function FeatureOne() {
  return (
    <BentoCard className="p-0 sm:row-span-2">
      <ExpenseTracker {...spendingTrackerProps} />
    </BentoCard>
  );
}

function FeatureTwo() {
  return (
    <BentoCard className="flex flex-col gap-2 border bg-background dark:border-zinc-700">
      <span className="text-xs font-semibold uppercase text-muted-foreground">Total income</span>
      <div className="text-3xl font-black text-green-600">$7,000</div>
    </BentoCard>
  );
}

function FeatureThree() {
  return (
    <BentoCard className="flex flex-col gap-2 border bg-background dark:border-zinc-700">
      <span className="text-xs font-semibold uppercase text-muted-foreground">Top categories</span>
      <div className="flex w-full gap-2">
        <Utensils size={16} className="text-foreground" />
        <span className="text-xs text-foreground">Food</span>
        <span className="ml-auto text-xs font-black text-red-600 dark:text-red-400">$2,000</span>
      </div>
      <div className="flex w-full gap-2">
        <CarFront size={16} className="text-foreground" />
        <span className="text-xs text-foreground">Transport</span>
        <span className="ml-auto text-xs font-black text-red-600 dark:text-red-400">$1,000</span>
      </div>
    </BentoCard>
  );
}

export default function Three() {
  return (
    <div className="grid w-fit min-w-0 grid-cols-1 grid-rows-1 gap-3 sm:grid-cols-2 sm:grid-rows-2">
      <FeatureOne />
      <FeatureTwo />
      <FeatureThree />
    </div>
  );
}
```

### 6.2 Required content substitution (only data + colors)

The upstream `FeatureOne` depends on `@/animata/widget/expense-tracker`, which is a finance dashboard and has no place in this site. The original file is fetched and adapted **structurally** — `BentoCard`, the 3-feature split, the exact grid classes, and the label/value typography are kept.

```tsx
import { Building2, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-3xl p-4", className)}>
      {children}
    </div>
  );
}

function FeatureOne() {
  return (
    <BentoCard className="flex flex-col justify-between border border-border bg-card p-6 sm:row-span-2">
      <span className="text-xs font-semibold uppercase text-muted-foreground">
        Clientes satisfechos
      </span>
      <div className="flex items-end justify-between gap-3">
        {/* FIGURE PENDING OWNER CONFIRMATION — do not invent a number */}
        <div className="text-3xl font-black text-primary">
          {"{{PENDIENTE}}"}
        </div>
        <Users size={16} className="text-foreground" />
      </div>
    </BentoCard>
  );
}

function FeatureTwo() {
  return (
    <BentoCard className="flex flex-col gap-2 border border-border bg-card">
      <span className="text-xs font-semibold uppercase text-muted-foreground">
        Top business
      </span>
      <div className="text-3xl font-black text-primary">$5,500,000</div>
    </BentoCard>
  );
}

function FeatureThree() {
  return (
    <BentoCard className="flex flex-col gap-2 border border-border bg-card">
      <span className="text-xs font-semibold uppercase text-muted-foreground">
        Top propiedades
      </span>
      <div className="flex w-full gap-2">
        <Building2 size={16} className="text-foreground" />
        <span className="text-xs text-foreground">Propiedades destacadas</span>
        <span className="ml-auto text-xs font-black text-primary">2</span>
      </div>
      <div className="flex w-full gap-2">
        <Trophy size={16} className="text-foreground" />
        <span className="text-xs text-foreground">Cierre de operación</span>
        <span className="ml-auto text-xs font-black text-primary">Top</span>
      </div>
    </BentoCard>
  );
}

export default function Three() {
  return (
    <div className="grid w-fit min-w-0 grid-cols-1 grid-rows-1 gap-3 sm:grid-cols-2 sm:grid-rows-2">
      <FeatureOne />
      <FeatureTwo />
      <FeatureThree />
    </div>
  );
}
```

**Data gap (blocking for card 1):** the user supplied "clientes satisfechos" without a figure, and no such figure exists in the repo. Per `AGENTS.md` §4, do not fabricate. Either:
- (a) obtain the verified number, or
- (b) render the label with a qualitative value the owner approves (e.g. "Cientos"), or
- (c) keep `{{PENDIENTE}}` out of production.

Recommended default until confirmed: make `FeatureOne` the wide `sm:row-span-2` card showing the **"$5,500,000"** figure (which is confirmed), and put "Clientes satisfechos" + "Top 2 propiedades" in the two small cards. This avoids inventing a number while keeping the exact bento layout. Decide explicitly and log it.

### 6.3 Placement

```tsx
<section id="cifras" className="py-20">
  <div className="container mx-auto px-4">
    <div className="mb-12 max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">La firma en números</h2>
      <p className="mt-3 text-muted-foreground">Resultados que respaldan cada operación.</p>
    </div>
    <div className="flex justify-center">
      <Three />
    </div>
  </div>
</section>
```

`w-fit` on the grid is intentional (upstream). On mobile it stacks; verify no horizontal overflow.

---

## 7. Navbar — preserve, change border only

`components/layout/navbar.tsx`:

| Line | Current | Change to |
|---|---|---|
| 43 | `… shadow-sm border-b border-slate-800/50 py-2` | `… shadow-sm border-b border-white/25 py-2` |
| 46 | `… shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 py-2` | `… shadow-sm border-b border-white py-2` |
| 144 (mobile menu) | `border-b border-slate-200 dark:border-slate-800` | `border-b border-white/40` |

Nothing else changes: logo swap logic, links, `ThemeToggle`, CTA, scroll behavior, mobile toggle, aria labels.

Also update the navbar link hover colors from `blue-600`/`blue-400` to `text-primary` so the preserved component matches the new palette (color-only; markup unchanged).

---

## 8. Recorrido animado — preserve, change the end transition

**Do not modify** `DepthStage.tsx`, `lib/journey.ts`, GSAP/ScrollTrigger math, Lenis config, or the stage overlays.

### 8.1 Exit overlay (the "white transition")

`components/journey/ScrollJourney.tsx` lines ~186–195:

```tsx
<div
  ref={exitRef}
  aria-hidden
  className="pointer-events-none absolute inset-0 z-20 bg-[#141416]"
  style={{ opacity: 0, backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
>
  <div
    className="absolute inset-0 opacity-[0.06]"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
</div>
```

Use `bg-[#141416]` — dark gray, close to the `#14120F` stage color so the fade reads as "into graphite". Keep `opacity` and `backdropFilter` driven by the existing `exit` value exactly as now; only the color and the grain layer change.

Better: add `.ws-grain` in `globals.css` and use `className="… ws-grain"` on the overlay; the grain `::after` will fade with the element's opacity. If `::after` stacking conflicts, use the nested div above.

### 8.2 Post-journey surfaces

- `app/paseo/page.tsx`: `<main className="paseo-root bg-[#F4F1EB]">` → `bg-[#141416]`; `#ficha` `bg-[#F4F1EB]` → `bg-[#141416] ws-grain`.
- `app/paseo/paseo.css`:
  ```css
  .paseo-root {
    --paseo-paper: #141416;   /* was #f4f1eb */
    --paseo-ink: #ececef;     /* was #1b1917 */
    --paseo-line: #2c2d32;    /* was #b9b0a4 */
    --paseo-surface: #1e1f23; /* was #e7e1d6 */
    --paseo-accent: #c9b6f2;  /* was #8d6e58 */
  }
  ```
- Recolor the hardcoded `text-[#1B1917]/55|/40|/65|/70|/60` in `app/paseo/page.tsx` to `text-[#ECECEF]/55` etc.
- CTA link: `bg-[#1B1917] text-[#F4F1EB] hover:bg-[#8D6E58]` → `bg-[#C9B6F2] text-[#14121A] hover:bg-[#D8CBF6]`.
- The in-stage progress bar accent `#8D6E58` → `#C9B6F2`; the "inactive/future" whites stay white (they sit on photography).
- Keep `/paseo` `robots: { index: false, follow: false }`.

---

## 9. Page-by-page restyle map

### 9.1 `app/page.tsx`

Keep every section and all copy. Apply:

- Remove `bg-white` / `bg-slate-50` / `dark:` alternation; use `bg-background`, `bg-card`, `border-border`, `text-muted-foreground`.
- Replace all `blue-600` / `blue-500` / `emerald-600` action colors with `primary` (lilac) or neutral; keep the WhatsApp CTA recognizable but on-palette (`bg-primary text-primary-foreground`), or keep a monochrome graphite button with a lilac icon. Decide once, apply everywhere.
- Hero overlay: `from-slate-950 via-slate-900/70` → `from-[#0F1012] via-[#0F1012]/75 to-[#0F1012]/45`; search input `bg-white/90` → `bg-card/90`.
- Badges (`bg-blue-600`, `bg-emerald-600`) → `bg-primary text-primary-foreground` / `bg-secondary text-secondary-foreground`.
- `#expertise` black section → `bg-[#0F1012] ws-grain`, icons `text-primary`.
- `#featured`, `#properties` cards → `bg-card border-border`, price accent `text-primary`.
- `#testimonials` → replace grid with `<FancyTestimonialsSlider />` (§5).
- New `#cifras` bento section (§6.3).
- New forms section (§4.5).
- `#equipo` → neutral cards, credential chips `bg-primary/10 text-primary`.
- `#contacto` → graphite section, buttons `bg-card text-foreground border-border`.

### 9.2 `app/contact/page.tsx`

- Replace RHF form with `<ContactForm />`.
- Page shell → tokens; remove `bg-background` hardcoded blues; success card → `bg-secondary border-border`.
- Keep `trackMetaEvent`, `handleOpenWhatsApp`, error copy, `max-w-2xl`.

### 9.3 `app/propiedades/page.tsx`

- Colors only: `blue-*` → `primary`, `bg-white` → `bg-card`, borders → `border-border`, filter pills → `bg-primary/10 text-primary` (active: `bg-primary text-primary-foreground`).
- Keep filtering, pagination (`PROPERTIES_PER_PAGE = 9`), tracking, modal.

### 9.4 `app/sobre-nosotros/page.tsx`

- Tokens only; preserve all bios and imagery.

### 9.5 Legal pages

- Tokens only (readability first: body text `text-foreground`, links `text-primary`).

### 9.6 `app/layout.tsx` / `app/globals.css`

- `defaultTheme="dark"` (or `system` with dark-first tokens) — confirm with owner; the navbar toggle must still work.
- `selection:bg-teal-600` → `selection:bg-primary selection:text-primary-foreground`.
- Replace the blue-black dark gradient (`#101a30`, `#0a1222`, `#060a14`) with neutral graphite (`#17181B → #111114 → #0F1012`).
- Update `.dark .bg-card` glass to `rgba(24,24,28,0.72)` with `border-color: rgba(255,255,255,0.08)`.
- Update `.contact-form` autofill colors to the new surfaces.

### 9.7 `components/layout/footer.tsx`

- `bg-black` → `bg-[#0F1012]`, `border-slate-800/50` → `border-border`, link hover `text-blue-400` → `text-primary`, social icons hover → `text-primary hover:border-primary/50`. Content untouched.

---

## 10. Files to create / modify

### Create

```
components/cuicui/table-of-content.tsx
components/forms/contact-form.tsx
components/eldoraui/testimonial-slider.tsx
components/animata/bento-grid/three.tsx
components/animata/skeleton/shiny-gradient-horizontal.tsx   (only if TOC skeleton kept)
public/testimonials/*.svg                                    (local avatars; no external URLs)
```

### Modify

```
app/globals.css
app/layout.tsx
app/page.tsx
app/contact/page.tsx
app/paseo/page.tsx
app/paseo/paseo.css
app/propiedades/page.tsx
app/sobre-nosotros/page.tsx
app/politicas-de-privacidad/*   (colors only)
app/terminos-y-condiciones/*    (colors only)
components/layout/navbar.tsx    (borders + hover colors only)
components/layout/footer.tsx
components/journey/ScrollJourney.tsx  (exit overlay only)
tailwind.config.ts              (cta token → palette)
```

### Do not touch

```
app/api/contact/route.ts
components/journey/DepthStage.tsx
lib/journey.ts
lib/properties.ts
next.config.mjs
components/analytics/*
components/layout/advisor-selector-modal.tsx
components/layout/whatsapp-button.tsx
```

---

## 11. Dependencies & budget

| Package | Why | Cost |
|---|---|---|
| `@formisch/react` | required by the specified forms component | free, MIT |
| `valibot` | Formisch's schema validator (guide uses it) | free, MIT |
| `@headlessui/react` | required by the specified testimonial slider | free, MIT |

- Do **not** add `motion` (Cuicui's `motion/react`) — map to the installed `framer-motion`.
- Do **not** add a second form stack; `react-hook-form`/`zod` remain installed for any other usage, but the contact form moves to Formisch.
- No paid services, hosting changes, Cloudflare/DNS changes, or asset purchases are involved. Per `AGENTS.md` §5, still report the three additions and their justification before installing.
- Package manager: confirm `npm` vs `pnpm` (two lockfiles). Do not run `npm install` if the project is pnpm-managed, and vice versa.

---

## 12. Validation (must actually run; do not claim otherwise)

```
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Manual checks:

1. `/` — every section renders; testimonials auto-rotate and manual buttons stop rotation; bento grid has no overflow at 375 px; form validates and posts.
2. `/contact` — submit → `POST /api/contact` 200 → success state → WhatsApp button builds the same message; invalid submit shows inline errors; reset works.
3. `/paseo` — recorrido still runs on scroll; progress indicator advances; **end transition is dark gray grained, not white**; TOC highlights the active heading and the lilac bar follows; no WebGL regressions; no console errors.
4. Navbar — identical layout at ≥md and mobile; bottom border is white in both states; theme toggle still switches.
5. `/propiedades` — filters, pagination, WhatsApp modal, Meta events.
6. Accessibility — keyboard traversal of the slider, form labels/`aria-invalid`, `prefers-reduced-motion` (slider + Lenis + paseo), contrast of `#C9B6F2` text on dark and `#6F52A8` on light.
7. SEO — titles/descriptions/metadata unchanged; no route deleted; no redirect needed since no URL changes.

---

## 13. Open decisions / data gaps (resolve before shipping)

1. **"Clientes satisfechos" has no number.** No source in the repo. Owner must supply, or approve a qualitative value, or the three cards must be re-assigned (see §6.2 recommendation).
2. **Testimonial avatars.** No portraits in the repo. Use local initials SVGs (recommended) or approved client photos. Do not hotlink external avatars and do not add remote-image patterns without approval.
3. **Theme default.** `dark` vs `system`. The navbar toggle is preserved either way; the palette is designed dark-first.
4. **Package manager.** `package-lock.json` vs `pnpm-lock.yaml`.
5. **Form location.** New home section only, `/contact` only, or both (recommended: both, same component).
6. **Cuicui skeleton.** Bundle the upstream skeleton vs render `null` while headings resolve.
7. **Semantic color for CTAs.** Current site uses blue + emerald WhatsApp CTAs. The palette excludes them; decide whether the WhatsApp action becomes lilac or a neutral graphite button with a lilac icon.

---

## 14. Suggested implementation order

1. Palette + tokens (`globals.css`, `tailwind.config.ts`, `layout.tsx`) — verify build.
2. Navbar borders + footer tokens.
3. `/paseo` dark surfaces + exit overlay grain (smallest, highest-risk change — validate the recorrido immediately).
4. Cuicui TOC section restructure on `/paseo`.
5. Animata bento stats section (needs decision §13.1).
6. EldoraUI slider + asset decision (§13.2).
7. Formisch form + dependencies, wire `/contact`, then home section.
8. Restyle home sections, `/propiedades`, `/sobre-nosotros`, legal pages.
9. Full validation pass + delivery report (audit table, skills used, dependencies, security notes, tests executed, open items).

---

## 15. Delivery report must state

- Routes audited and preserved.
- Components integrated and their **exact** deviations (color tokens, `motion/react → framer-motion`, EldoraUI bug fixes, bento `ExpenseTracker` substitution).
- Data gaps left open (no invented values).
- Dependencies added with justification.
- Security-relevant changes (none expected) and confirmation that secrets, `/api/contact`, DNS and deployment were untouched.
- Tests actually executed and their results.

---

## 16. Execution status

### Implemented

| Area | Result |
|---|---|
| Palette | `globals.css` tokens replaced with graphite + grayscale + `#C9B6F2`; dark theme is now the default (`app/layout.tsx`). `.ws-grain` utility added. `tailwind.config.ts` `cta` → `hsl(var(--primary))`, `ws.*` colors added. |
| Navbar | Markup/behavior untouched; three border classes changed to white (`border-white`, `border-white/25`, `border-white/40`). Blue CTA and hover colors deliberately preserved. |
| Recorrido | `DepthStage`, GSAP/Lenis math and `lib/journey.ts` untouched. `ScrollJourney` exit overlay changed from `#F4F1EB` to `#141416` + grain layer. Progress accent changed to lilac. |
| Cuicui TOC | `components/cuicui/table-of-content.tsx` created (upstream logic verbatim; `motion/react → framer-motion`; skeleton replaced by `null`; colors tokenised). Wired into `/paseo` `#tres-paradas-content`. |
| Formisch | `components/forms/contact-form.tsx` created; used on `/` (`#formulario`) and `/contact`. Same `/api/contact` payload, Meta `Lead` event and WhatsApp continuation. |
| EldoraUI slider | `components/eldoraui/testimonial-slider.tsx` created with the three upstream fixes (functional `setActive`, invalid `shadow-cyan-950 10`, missing `onClick`), reduced-motion / `aria-live` additions, and four local SVG avatars in `public/testimonials/`. Images use `unoptimized` because Next's optimizer rejects local SVGs. |
| Animata bento | `components/animata/bento-grid/three.tsx` created with upstream `BentoCard` + grid intact. Data: Clientes satisfechos (no figure available), Top business `$5,500,000`, Top 2 propiedades. |
| Other pages | `/propiedades`, `/sobre-nosotros`, legal pages, footer and advisor modal recoloured to tokens. `/walkthrough` recoloured to graphite so the shared exit transition stays coherent. |
| Paseo navbar | `components/journey/PaseoNavbar.tsx` rebuilt as Framer's **Blur Navigation** (exact values: panel `rgba(255,255,255,0.2)` + `blur(30px)` + `saturate(1.32)` + 28px radius + 1px `rgba(255,255,255,0.45)` border + the two-layer shadow; page backdrop `blur(26px)` + `rgba(239,238,234,0.16)`; 1px white shine; morphing 40px menu button; 16px `0.12em` wordmark; 30px row labels with `blur(4px)`/0.35 spotlight dimming; pulsing dot + live clock; social row). Fonts (Inter Variable / Switzer Variable) loaded from the same Framer asset URLs. Rows: the six existing paseo destinations. Starts closed so the recorrido stays unobstructed; `initial={false}` prevents an open-state flash on SSR. |

### Verification actually executed

- `npx tsc --noEmit` — pass.
- `npm run build` — pass (13 routes, no errors). Two Tailwind warnings for upstream arbitrary `ease-[...]` classes in the slider; cosmetic only.
- Dev-server smoke test on the free port: `/`, `/paseo`, `/contact`, `/propiedades`, `/sobre-nosotros`, `/politicas-de-privacidad`, `/terminos-y-condiciones` all returned `200`; home contained `$5,500,000`, `Denisse Aznar`, `contact-form`, `ws-grain`; `/paseo` contained `tres-paradas-content`.
- `npm run lint` could not run: `eslint` is not installed in this project (pre-existing).
- No browser was available for screenshots, so pixel-level visual QA is still pending.

### Still open

1. Owner-confirmed figure for "Clientes satisfechos" (no invented value shipped).
2. Package manager reconciliation (`package-lock.json` is in use; `pnpm-lock.yaml` still present).
3. Optional: install `eslint` so `npm run lint` works.
4. WhatsApp floating button kept WhatsApp green as a brand affordance (outside the page palette).
