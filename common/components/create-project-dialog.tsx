"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useEffect, useId } from "react"
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

const projectTypeOptions = [
  { value: "product", label: "Product project" },
  { value: "growth", label: "Growth initiative" },
  { value: "platform", label: "Platform workstream" },
  { value: "design", label: "Design track" },
] as const

const projectPlanOptions = [
  { value: "Enterprise", label: "Enterprise" },
  { value: "Startup", label: "Startup" },
  { value: "Free", label: "Free" },
] as const

const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters.")
    .max(40, "Project name must be 40 characters or fewer."),
  plan: z.enum(["Enterprise", "Startup", "Free"]),
  kind: z.enum(["product", "growth", "platform", "design"]),
})

type CreateProjectFormValues = z.input<typeof createProjectSchema>
type CreateProjectSubmitValues = z.output<typeof createProjectSchema>

const defaultValues: CreateProjectFormValues = {
  name: "New Product Project",
  plan: "Startup",
  kind: "product",
}

export type CreateProjectPayload = CreateProjectSubmitValues

type CreateProjectDialogProps = {
  existingProjectNames: string[]
  onCreateProject: (values: CreateProjectPayload) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function CreateProjectDialog({
  existingProjectNames,
  onCreateProject,
  onOpenChange,
  open,
}: CreateProjectDialogProps) {
  const nameId = useId()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectFormValues, undefined, CreateProjectSubmitValues>({
    resolver: zodResolver(
      createProjectSchema.superRefine((values, ctx) => {
        const normalizedName = values.name.trim().toLowerCase()
        const alreadyExists = existingProjectNames.some(
          (projectName) => projectName.trim().toLowerCase() === normalizedName
        )

        if (alreadyExists) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "A project with this name already exists.",
            path: ["name"],
          })
        }
      })
    ),
    defaultValues,
  })

  useEffect(() => {
    if (!open) {
      reset(defaultValues)
    }
  }, [open, reset])

  const handleCreateProject = (values: CreateProjectSubmitValues) => {
    onCreateProject(values)
    toast("Project created!")
    onOpenChange(false)
    reset(defaultValues)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border/70 p-0 sm:max-w-xl">
        <section className="p-6 sm:p-7">
          <DialogHeader className="gap-2 border-b border-border/70 pb-5 text-left">
            <DialogTitle className="text-xl">Create project</DialogTitle>
            <DialogDescription className="max-w-lg text-sm leading-6">
              Add a new project to your workspace so it can own rooms and
              planning sessions.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleCreateProject)}>
            <div className="grid gap-5 py-6">
              <Field>
                <FieldLabel htmlFor={nameId}>Project name</FieldLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id={nameId}
                      value={field.value ?? ""}
                      placeholder="Core Product Roadmap"
                      className="h-10"
                      aria-invalid={!!errors.name}
                    />
                  )}
                />
                <FieldError errors={[errors.name]} />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field>
                  <FieldLabel>Plan</FieldLabel>
                  <Controller
                    name="plan"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className="h-10 w-full"
                          aria-invalid={!!errors.plan}
                        >
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectPlanOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.plan]} />
                </Field>

                <Field>
                  <FieldLabel>Project type</FieldLabel>
                  <Controller
                    name="kind"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className="h-10 w-full"
                          aria-invalid={!!errors.kind}
                        >
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.kind]} />
                </Field>
              </div>
            </div>

            <DialogFooter className="border-t border-border/70 pt-5 sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Projects created here are added locally for this workspace session.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create project
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
