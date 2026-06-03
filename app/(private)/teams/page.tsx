import type { ElementType, ReactNode } from "react"

import {
  Check,
  Crown,
  DoorOpen,
  MoreHorizontal,
  Pencil,
  Search,
  ShieldCheck,
  Trash2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/ui/dropdown-menu"
import { CreateTeamDialog } from "./_components/create-team"

const teams = [
  {
    name: "Core Product Squad",
    members: "8 members",
    rooms: "2 active rooms",
    status: "Sprint planning in progress",
    lead: "Maya Chen",
    lastActivity: "Updated 3m ago",
    focus: "Checkout and onboarding roadmap work for Sprint 24.",
  },
  {
    name: "Growth Team",
    members: "5 members",
    rooms: "1 active room",
    status: "Refinement session later today",
    lead: "Noah Patel",
    lastActivity: "Updated 9m ago",
    focus: "Acquisition experiments and cleanup work for next week.",
  },
  {
    name: "Platform",
    members: "6 members",
    rooms: "1 active room",
    status: "Bug triage ready to reveal",
    lead: "Ava Garcia",
    lastActivity: "Updated 14m ago",
    focus: "Reliability fixes and operational sizing with the platform group.",
  },
  {
    name: "Experience",
    members: "4 members",
    rooms: "No live rooms",
    status: "Preparing next design QA sweep",
    lead: "Liam Brooks",
    lastActivity: "Updated 22m ago",
    focus: "Cross-functional QA reviews and design validation sessions.",
  },
]

const teamStats = [
  {
    label: "Teams",
    icon: Crown,
    value: String(teams.length),
    note: "3 currently planning work",
  },
  {
    label: "Active members",
    icon: Users,
    value: "23",
    note: "Across product, growth, platform, and design",
  },
  {
    label: "Rooms in progress",
    icon: DoorOpen,
    value: "4",
    note: "1 room ready for reveal",
  },
]

const teamStructures = [
  {
    name: "Sprint planning squad",
    description:
      "A cross-functional setup for committed sprint estimation and delivery planning.",
    type: "Product squad",
  },
  {
    name: "Platform triage group",
    description:
      "A structure for defects, reliability work, and operational sizing sessions.",
    type: "Platform team",
  },
  {
    name: "Design QA pod",
    description:
      "A lighter-weight team setup for review-heavy planning and design validation.",
    type: "Design team",
  },
]

const teamGuidelines = [
  "Create teams before rooms so ownership stays clear across recurring planning ceremonies.",
  "Use a single team lead per squad to keep room facilitation and follow-up decisions obvious.",
  "Review inactive teams regularly so the workspace stays focused on active delivery groups.",
]

export default function TeamsPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-8">
      <div className="grid gap-4 md:grid-cols-3">
        {teamStats.map((stat) => (
          <Card
            key={stat.label}
            className="border-border/70 bg-linear-to-b from-card to-muted/20"
          >
            <CardHeader className="gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-3xl">{stat.value}</CardTitle>
                </div>
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <stat.icon className="size-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{stat.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <div className="space-y-6">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Start a new team</CardTitle>
              <CardDescription>
                Launch the team setup dialog, define an owner, and keep rooms
                grouped under the right squad from the start.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                The popup includes team name, team lead, and squad type so you
                can organize planning work before the next room is created.
              </p>
            </CardContent>
            <CardFooter className="gap-3">
              <CreateTeamDialog />
              <Button variant="outline">Browse team structures</Button>
            </CardFooter>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Available teams</CardTitle>
              <CardDescription>
                Active squads your workspace can open, manage, or assign rooms
                to right away.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 rounded-2xl border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Browse active squads</p>
                  <p className="text-sm text-muted-foreground">
                    Find teams with live planning work, clear ownership, or room
                    setup needs before the next ceremony starts.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <Search className="size-4" />
                  {teams.length} teams available
                </div>
              </div>

              {teams.map((team) => (
                <div
                  key={team.name}
                  className="rounded-2xl border bg-background px-4 py-4 transition-colors hover:bg-muted/20"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <h3 className="font-medium">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Team lead: {team.lead}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <MetaPill icon={Users}>{team.members}</MetaPill>
                        <MetaPill icon={DoorOpen}>{team.rooms}</MetaPill>
                        <MetaPill icon={ShieldCheck}>{team.status}</MetaPill>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <span>{team.focus}</span>
                        <span>{team.lastActivity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 lg:items-end">
                      <div className="flex w-full items-center justify-between gap-2 lg:w-auto lg:justify-end">
                        <StatusPill>{team.status}</StatusPill>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label="Team actions"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem>
                              <Pencil className="size-4" />
                              Edit team
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="size-4" />
                              Manage members
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              <Trash2 className="size-4" />
                              Delete team
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Button variant="outline" size="sm">
                        Open team
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/70 bg-linear-to-b from-card to-muted/20">
            <CardHeader>
              <CardTitle>Team setup notes</CardTitle>
              <CardDescription>
                Small defaults that usually make team-based planning smoother.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamGuidelines.map((item) => (
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
              <CardTitle>Structures</CardTitle>
              <CardDescription>
                Reusable starting points for common team setups.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamStructures.map((structure) => (
                <div
                  key={structure.name}
                  className="rounded-2xl border bg-background px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <Crown className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium">{structure.name}</h3>
                        <MetaPill icon={ShieldCheck}>{structure.type}</MetaPill>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {structure.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Browse team structures
              </Button>
            </CardFooter>
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
