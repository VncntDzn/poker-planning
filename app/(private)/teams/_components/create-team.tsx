"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/common/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/common/ui/field"
import { Input } from "@/common/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/select"

const teamTypeOptions = [
  { value: "product", label: "Product squad" },
  { value: "growth", label: "Growth team" },
  { value: "platform", label: "Platform team" },
  { value: "design", label: "Design team" },
] as const

const createTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Team name must be at least 2 characters.")
    .max(40, "Team name must be 40 characters or fewer."),
  lead: z
    .string()
    .trim()
    .min(2, "Team lead must be at least 2 characters.")
    .max(40, "Team lead must be 40 characters or fewer."),
  type: z.enum(["product", "growth", "platform", "design"]),
})

type CreateTeamFormValues = z.input<typeof createTeamSchema>
type CreateTeamSubmitValues = z.output<typeof createTeamSchema>

const defaultValues: CreateTeamFormValues = {
  name: "Core Delivery Squad",
  lead: "Jordan Lee",
  type: "product",
}

export function CreateTeamDialog() {
  const [open, setOpen] = useState(false)
  const nameId = useId()
  const leadId = useId()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTeamFormValues, undefined, CreateTeamSubmitValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues,
  })

  useEffect(() => {
    if (!open) {
      reset(defaultValues)
    }
  }, [open, reset])

  const handleCreateTeam = async (values: CreateTeamSubmitValues) => {
    toast(`Team created: ${values.name}`)
    setOpen(false)
    reset(defaultValues)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Create team
          <ArrowRight className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/70 p-0 sm:max-w-2xl">
        <section className="p-6 sm:p-7">
          <DialogHeader className="gap-2 border-b border-border/70 pb-5 text-left">
            <DialogTitle className="text-xl">Create team</DialogTitle>
            <DialogDescription className="max-w-xl text-sm leading-6">
              Add a new squad for planning poker so rooms, members, and team
              rituals stay grouped together.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleCreateTeam)}>
            <div className="grid gap-5 py-6">
              <div className="grid gap-5 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor={nameId}>Team name</FieldLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id={nameId}
                        value={field.value ?? ""}
                        placeholder="Core Product Squad"
                        className="h-10"
                        aria-invalid={!!errors.name}
                      />
                    )}
                  />
                  <FieldError errors={[errors.name]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor={leadId}>Team lead</FieldLabel>
                  <Controller
                    name="lead"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id={leadId}
                        value={field.value ?? ""}
                        placeholder="Maya Chen"
                        className="h-10"
                        aria-invalid={!!errors.lead}
                      />
                    )}
                  />
                  <FieldError errors={[errors.lead]} />
                </Field>
              </div>

              <Field>
                <FieldLabel>Team type</FieldLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="h-10 w-full"
                        aria-invalid={!!errors.type}
                      >
                        <SelectValue placeholder="Select team type" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.type]} />
              </Field>
            </div>

            <DialogFooter className="border-t border-border/70 pt-5 sm:justify-between">
              <p className="text-sm text-muted-foreground">
                This first pass creates a team locally for the current session.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Create team
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </DialogFooter>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  )
}
