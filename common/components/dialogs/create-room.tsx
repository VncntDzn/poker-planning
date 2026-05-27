"use client"

import { useId, useState, type ElementType, type ReactNode } from "react"
import { ArrowRight, Clock3, DoorOpen, Layers3, Lock, Users } from "lucide-react"

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
import { Input } from "@/common/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/select"

const deckOptions = [
  { value: "fibonacci", label: "Fibonacci" },
  { value: "tshirt", label: "T-shirt sizes" },
  { value: "linear", label: "1-10 linear" },
]

const visibilityOptions = [
  { value: "private", label: "Private invite only" },
  { value: "team", label: "Anyone on the team" },
  { value: "public", label: "Public link" },
]

const modeOptions = [
  { value: "async", label: "Async voting" },
  { value: "live", label: "Live reveal" },
]

const participantOptions = [
  { value: "6", label: "Up to 6 estimators" },
  { value: "8", label: "Up to 8 estimators" },
  { value: "12", label: "Up to 12 estimators" },
]

export function CreateRoomDialog({ trigger }: { trigger: ReactNode }) {
  const roomNameId = useId()
  const teamId = useId()
  const [roomName, setRoomName] = useState("Sprint 24 Planning")
  const [team, setTeam] = useState("Core Product Squad")
  const [deck, setDeck] = useState(deckOptions[0].value)
  const [visibility, setVisibility] = useState(visibilityOptions[0].value)
  const [mode, setMode] = useState(modeOptions[0].value)
  const [participants, setParticipants] = useState(participantOptions[1].value)

  const selectedDeck =
    deckOptions.find((option) => option.value === deck)?.label ?? "Fibonacci"
  const selectedVisibility =
    visibilityOptions.find((option) => option.value === visibility)?.label ??
    "Private invite only"
  const selectedMode =
    modeOptions.find((option) => option.value === mode)?.label ?? "Async voting"
  const selectedParticipants =
    participantOptions.find((option) => option.value === participants)?.label ??
    "Up to 8 estimators"

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border/70 p-0 sm:max-w-4xl">
        <div className="grid md:grid-cols-[minmax(0,1fr)_320px]">
          <section className="p-6 sm:p-7">
            <DialogHeader className="gap-2 border-b border-border/70 pb-5 text-left">
              <DialogTitle className="text-xl">Create room</DialogTitle>
              <DialogDescription className="max-w-xl text-sm leading-6">
                Set up a planning room for your next estimation session.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-6">
              <div className="grid gap-5 md:grid-cols-2">
                <Field htmlFor={roomNameId} label="Room name">
                  <Input
                    id={roomNameId}
                    value={roomName}
                    onChange={(event) => setRoomName(event.target.value)}
                    placeholder="Sprint 24 planning"
                    className="h-10"
                  />
                </Field>

                <Field htmlFor={teamId} label="Team">
                  <Input
                    id={teamId}
                    value={team}
                    onChange={(event) => setTeam(event.target.value)}
                    placeholder="Core Product Squad"
                    className="h-10"
                  />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Deck">
                  <Select value={deck} onValueChange={setDeck}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Choose a deck" />
                    </SelectTrigger>
                    <SelectContent>
                      {deckOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Visibility">
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Voting mode">
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Choose voting mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {modeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Participants">
                  <Select value={participants} onValueChange={setParticipants}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Choose participant cap" />
                    </SelectTrigger>
                    <SelectContent>
                      {participantOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>

            <DialogFooter className="border-t border-border/70 pt-5 sm:justify-between">
              <Button variant="outline">Save as template</Button>
              <Button>
                Start room
                <ArrowRight className="size-4" />
              </Button>
            </DialogFooter>
          </section>

          <aside className="border-t border-border/70 bg-muted/20 p-6 md:border-t-0 md:border-l">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Preview</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A quick summary before you create the room.
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <DoorOpen className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {roomName.trim() || "Untitled room"}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {team.trim() || "No team assigned"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <PreviewRow icon={Layers3} label="Deck" value={selectedDeck} />
                  <PreviewRow
                    icon={Lock}
                    label="Visibility"
                    value={selectedVisibility}
                  />
                  <PreviewRow icon={Clock3} label="Mode" value={selectedMode} />
                  <PreviewRow
                    icon={Users}
                    label="Participants"
                    value={selectedParticipants}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  children,
  htmlFor,
}: {
  label: string
  children: ReactNode
  htmlFor?: string
}) {
  return (
    <label className="grid gap-2 text-sm" htmlFor={htmlFor}>
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

function PreviewRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-3">
      <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
