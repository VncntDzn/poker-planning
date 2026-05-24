import type { ElementType, ReactNode } from "react"

import {
  ArrowRight,
  Check,
  Clock3,
  DoorOpen,
  Layers3,
  Lock,
  Plus,
  Users,
} from "lucide-react"

import { Button } from "@/common/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/ui/card"
import { Input } from "@/common/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/select"

const roomStats = [
  {
    label: "Open rooms",
    value: "4",
  },
  {
    label: "Avg. participants",
    value: "6",
  },
  {
    label: "Default deck",
    value: "Fibonacci",
  },
]

const activeRooms = [
  {
    name: "Sprint 24 Planning",
    team: "Core Product Squad",
    status: "Waiting for 2 votes",
    deck: "Fibonacci",
    visibility: "Private",
  },
  {
    name: "Backlog Refinement",
    team: "Growth Team",
    status: "Discussing estimates",
    deck: "T-shirt sizes",
    visibility: "Team access",
  },
  {
    name: "Bug Triage",
    team: "Platform",
    status: "Ready to reveal",
    deck: "1-10 linear",
    visibility: "Private",
  },
]

const roomTemplates = [
  {
    name: "Sprint planning",
    description: "For estimating the committed stories for the next sprint.",
    deck: "Fibonacci",
  },
  {
    name: "Backlog refinement",
    description: "For shaping and sizing upcoming work before sprint planning.",
    deck: "T-shirt sizes",
  },
  {
    name: "Bug triage",
    description: "For quickly sizing defects, risk, and operational tasks.",
    deck: "1-10 linear",
  },
]

const roomGuidelines = [
  "Keep rooms focused on one planning goal so discussion stays tight.",
  "Use private rooms for sprint planning, then share the link only with participants.",
  "Save a couple of templates so recurring ceremonies are faster to start.",
]

export default function RoomsPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-8">
      <div className="rounded-3xl border bg-card shadow-sm">
        <div className="flex flex-col gap-6 px-6 py-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Rooms</p>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Manage planning rooms
              </h1>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Create a room for your next scrum poker session, jump back into
                active rooms, or start from a template your team already uses.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>
              Create room
              <Plus className="size-4" />
            </Button>
            <Button variant="outline">
              Browse templates
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roomStats.map((stat) => (
          <Card key={stat.label} className="border-border/70">
            <CardHeader className="gap-1">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <div className="space-y-6">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Create room</CardTitle>
              <CardDescription>
                A lightweight setup for starting a new estimation session.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <Field label="Room name">
                <Input placeholder="Sprint 24 planning" />
              </Field>

              <Field label="Team">
                <Input placeholder="Core Product Squad" />
              </Field>

              <Field label="Deck">
                <Select defaultValue="fibonacci">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a deck" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fibonacci">Fibonacci</SelectItem>
                    <SelectItem value="tshirt">T-shirt sizes</SelectItem>
                    <SelectItem value="linear">1-10 linear</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Visibility">
                <Select defaultValue="private">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private invite only</SelectItem>
                    <SelectItem value="team">Anyone on the team</SelectItem>
                    <SelectItem value="public">Public link</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </CardContent>
            <CardFooter className="gap-3">
              <Button>
                Start room
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">Save as template</Button>
            </CardFooter>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Active rooms</CardTitle>
              <CardDescription>
                Rooms your team can continue right away.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {activeRooms.map((room) => (
                <div
                  key={room.name}
                  className="rounded-2xl border bg-background px-4 py-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <h3 className="font-medium">{room.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {room.team}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <MetaPill icon={Layers3}>{room.deck}</MetaPill>
                        <MetaPill icon={Lock}>{room.visibility}</MetaPill>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 lg:items-end">
                      <StatusPill>{room.status}</StatusPill>
                      <Button variant="outline" size="sm">
                        Open room
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Room templates</CardTitle>
              <CardDescription>
                Reusable starting points for common scrum ceremonies.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {roomTemplates.map((template) => (
                <div
                  key={template.name}
                  className="rounded-2xl border bg-background p-4"
                >
                  <div className="space-y-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-muted">
                      <DoorOpen className="size-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium capitalize">
                        {template.name}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <MetaPill icon={Layers3}>{template.deck}</MetaPill>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/70 bg-linear-to-b from-card to-muted/20">
            <CardHeader>
              <CardTitle>Room setup notes</CardTitle>
              <CardDescription>
                Small defaults that usually make scrum poker smoother.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {roomGuidelines.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border bg-background px-4 py-3"
                >
                  <div className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Default room preview</CardTitle>
              <CardDescription>
                What a fresh room would roughly look like.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PreviewRow
                icon={DoorOpen}
                label="Room name"
                value="Sprint 24 Planning"
              />
              <PreviewRow icon={Layers3} label="Deck" value="Fibonacci" />
              <PreviewRow
                icon={Users}
                label="Participants"
                value="Up to 8 estimators"
              />
              <PreviewRow icon={Clock3} label="Mode" value="Async voting" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  )
}

function MetaPill({
  icon: Icon,
  children,
}: {
  icon: ElementType
  children: ReactNode
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
      <Icon className="size-3.5" />
      {children}
    </div>
  )
}

function StatusPill({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {children}
    </div>
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
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  )
}
