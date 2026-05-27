import type { ElementType, ReactNode } from "react"

import {
  ArrowRight,
  Archive,
  Check,
  Clock3,
  DoorOpen,
  Layers3,
  Lock,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
  Users,
} from "lucide-react"

import { CreateRoomDialog } from "@/common/components/dialogs/create-room"
import { Button } from "@/common/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/ui/dropdown-menu"

const openRooms = [
  {
    name: "Sprint 24 Planning",
    team: "Core Product Squad",
    host: "Maya Chen",
    participants: "6 / 8 joined",
    lastActivity: "Updated 2m ago",
    status: "Voting in progress",
    deck: "Fibonacci",
    visibility: "Private",
  },
  {
    name: "Backlog Refinement",
    team: "Growth Team",
    host: "Noah Patel",
    participants: "5 / 5 joined",
    lastActivity: "Updated 7m ago",
    status: "Discussion open",
    deck: "T-shirt sizes",
    visibility: "Team access",
  },
  {
    name: "Bug Triage",
    team: "Platform",
    host: "Ava Garcia",
    participants: "4 / 6 joined",
    lastActivity: "Updated 11m ago",
    status: "Ready to reveal",
    deck: "1-10 linear",
    visibility: "Private",
  },
  {
    name: "Design QA Sweep",
    team: "Experience",
    host: "Liam Brooks",
    participants: "3 / 6 joined",
    lastActivity: "Updated 18m ago",
    status: "Waiting for votes",
    deck: "Fibonacci",
    visibility: "Public link",
  },
]

const roomStats = [
  {
    label: "Open rooms",
    value: String(openRooms.length),
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
              <CardTitle>Start a new room</CardTitle>
              <CardDescription>
                Launch the room setup dialog, tweak the defaults, and share the
                invite when you are ready.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                The popup includes room name, team, deck, visibility, voting
                mode, and a live preview so facilitators can sanity-check the
                setup before starting.
              </p>
              <div className="rounded-2xl border bg-muted/20 p-4">
                <PreviewRow
                  icon={DoorOpen}
                  label="Default room"
                  value="Sprint 24 Planning"
                />
              </div>
            </CardContent>
            <CardFooter className="gap-3">
              <CreateRoomDialog
                trigger={
                  <Button>
                    Open setup dialog
                    <ArrowRight className="size-4" />
                  </Button>
                }
              />
              <Button variant="outline">Browse templates</Button>
            </CardFooter>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Available rooms</CardTitle>
              <CardDescription>
                Open sessions your team can join or continue right away.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 rounded-2xl border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Browse open sessions</p>
                  <p className="text-sm text-muted-foreground">
                    Find rooms with active voting, ongoing discussion, or
                    estimates ready to reveal.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <Search className="size-4" />
                  {openRooms.length} rooms available
                </div>
              </div>

              {openRooms.map((room) => (
                <div
                  key={room.name}
                  className="rounded-2xl border bg-background px-4 py-4 transition-colors hover:bg-muted/20"
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
                        <MetaPill icon={Users}>{room.participants}</MetaPill>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <span>Host: {room.host}</span>
                        <span>{room.lastActivity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 lg:items-end">
                      <div className="flex w-full items-center justify-between gap-2 lg:w-auto lg:justify-end">
                        <StatusPill>{room.status}</StatusPill>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Room actions">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem>
                              <Pencil className="size-4" />
                              Edit room
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="size-4" />
                              Archive room
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              <Trash2 className="size-4" />
                              Delete room
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
