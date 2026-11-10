"use client"

import * as React from "react"
import { Field as FormischField, Form, reset, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import * as v from "valibot"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { trackMetaEvent } from "@/components/analytics/meta-pixel"
import { useLocale } from "@/lib/i18n"
import { dict } from "@/lib/i18n-dict"
import { ArrowRight, CheckCircle2, MessageCircle, Send } from "lucide-react"

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
    v.check(
      (value) => value.trim().split(/\s+/).filter(Boolean).length <= 200,
      "El mensaje no puede superar 200 palabras",
    ),
  ),
})

const initialInput = {
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  ciudad: "",
  pais: "",
  mensaje: "",
}

const wordCount = (value: string) =>
  value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0

export function ContactForm({
  className,
  title,
  description,
}: {
  className?: string
  title?: string
  description?: string
}) {
  const { locale } = useLocale()
  const c = dict.contact
  const resolvedTitle = title ?? c.titulo[locale]
  const resolvedDescription = description ?? c.subtitulo[locale]

  const form = useForm({
    schema: FormSchema,
    initialInput,
    validate: "blur",
    revalidate: "input",
  })

  const [sending, setSending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [sent, setSent] = React.useState<v.InferOutput<typeof FormSchema> | null>(
    null,
  )

  const handleSubmit: SubmitHandler<typeof FormSchema> = async (output) => {
    setSending(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: output.nombre,
          apellido: output.apellido,
          telefono: output.telefono,
          correo: output.correo,
          mensaje: output.mensaje,
          ciudad: output.ciudad,
          pais: output.pais,
        }),
      })
      if (!res.ok) throw new Error("Error al enviar")
      trackMetaEvent("Lead", {
        content_name: "Formulario de Contacto Web",
        city: output.ciudad,
        country: output.pais,
      })
      setSent(output)
    } catch {
      setError(c.error[locale])
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    const phone = "529992284783"
    const whatsappMessage = encodeURIComponent(
      `Hola Wendy, mi nombre es ${sent.nombre} ${sent.apellido} (${sent.telefono}). Les escribo desde ${sent.ciudad}, ${sent.pais}. Mensaje: ${sent.mensaje}`,
    )
    const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMessage}`

    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <CheckCircle2 className="h-12 w-12 text-foreground" aria-hidden />
          <h2 className="text-2xl font-bold text-foreground">
            {c.successTitulo[locale]}
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {c.successDesc[locale]}
          </p>
          <Button
            asChild
            className="group mt-2 h-9 rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <MessageCircle className="mr-2 size-4" aria-hidden />
              {c.successCta[locale]}
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{resolvedTitle}</CardTitle>
        <CardDescription>{resolvedDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} id="contact-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormischField of={form} path={["nombre"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="contact-nombre">{c.nombre[locale]}</FieldLabel>
                    <Input
                      {...field.props}
                      id="contact-nombre"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder={c.nombrePh[locale]}
                      autoComplete="given-name"
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>

              <FormischField of={form} path={["apellido"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="contact-apellido">{c.apellido[locale]}</FieldLabel>
                    <Input
                      {...field.props}
                      id="contact-apellido"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder={c.apellidoPh[locale]}
                      autoComplete="family-name"
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormischField of={form} path={["telefono"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="contact-telefono">
                      {c.telefono[locale]}
                    </FieldLabel>
                    <Input
                      {...field.props}
                      id="contact-telefono"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder={c.telefonoPh[locale]}
                      autoComplete="tel"
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>

              <FormischField of={form} path={["correo"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="contact-correo">
                      {c.correo[locale]}
                    </FieldLabel>
                    <Input
                      {...field.props}
                      id="contact-correo"
                      type="email"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder={c.correoPh[locale]}
                      autoComplete="email"
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormischField of={form} path={["ciudad"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="contact-ciudad">{c.ciudad[locale]}</FieldLabel>
                    <Input
                      {...field.props}
                      id="contact-ciudad"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder={c.ciudadPh[locale]}
                      autoComplete="address-level2"
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>

              <FormischField of={form} path={["pais"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="contact-pais">{c.pais[locale]}</FieldLabel>
                    <Input
                      {...field.props}
                      id="contact-pais"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder={c.paisPh[locale]}
                      autoComplete="country-name"
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
            </div>

            <FormischField of={form} path={["mensaje"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="contact-mensaje">{c.mensaje[locale]}</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field.props}
                      id="contact-mensaje"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder={c.mensajePh[locale]}
                      rows={6}
                      className="min-h-24 resize-none"
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {wordCount(field.input ?? "")} / 200 {c.palabras[locale]}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    {c.mensajeHelp[locale]}
                  </FieldDescription>
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            onClick={() => reset(form)}
            className="h-9 w-full rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:w-auto"
          >
            {c.restablecer[locale]}
          </Button>
          <Button
            type="submit"
            form="contact-form"
            disabled={sending}
            className="group h-9 w-full rounded-md border-0 bg-foreground/10 px-4 text-xs font-semibold text-foreground backdrop-blur-sm hover:bg-foreground/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:w-auto"
          >
            <Send className="mr-2 size-4" aria-hidden />
            {sending ? c.enviando[locale] : c.enviar[locale]}
            <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Button>
        </div>
      </CardFooter>
      {error && (
        <p className="px-6 pb-6 text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </Card>
  )
}

export default ContactForm
