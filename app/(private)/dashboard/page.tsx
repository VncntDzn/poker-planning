import type { ElementType, ReactNode } from "react"

import { AlertCircle, CheckCheck, Clock3, Layers3, Users } from "lucide-react"

import { Button } from "@/common/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/ui/tabs"

const overviewStats = [
  {
    label: "Active rooms",
    value: "3",
    note: "1 blocked waiting on voters",
    icon: Layers3,
  },
  {
    label: "Pending votes",
    value: "7",
    note: "Across 2 sessions",
    icon: Clock3,
  },
  {
    label: "Participants",
    value: "15",
    note: "92% joined this cycle",
    icon: Users,
  },
]

const priorityRooms = [
  {
    name: "Sprint 24 Planning",
    issue: "2 votes missing",
    detail: "Waiting on Mia and Jordan before reveal.",
    action: "Open room",
    tone: "warning" as const,
  },
  {
    name: "Bug Triage Estimation",
    issue: "Ready to reveal",
    detail: "All estimates are in and discussion can start.",
    action: "Reveal now",
    tone: "ready" as const,
  },
]

const activeRooms = [
  {
    name: "Sprint 24 Planning",
    team: "Core Product Squad",
    deck: "Fibonacci",
    participants: "6 of 8 joined",
    status: "Waiting for 2 votes",
    updated: "Updated 2m ago",
  },
  {
    name: "Backlog Refinement",
    team: "Growth Team",
    deck: "T-shirt sizes",
    participants: "5 of 5 joined",
    status: "Discussing story scope",
    updated: "Updated 7m ago",
  },
  {
    name: "Bug Triage Estimation",
    team: "Platform",
    deck: "1-10 linear",
    participants: "4 of 6 joined",
    status: "Ready to reveal",
    updated: "Updated 11m ago",
  },
]

const recentResults = [
  {
    story: "Checkout retry flow",
    result: "8 points",
    room: "Sprint 24 Planning",
    note: "Consensus reached after 1 revote",
  },
  {
    story: "Audit log filters",
    result: "5 points",
    room: "Backlog Refinement",
    note: "Clean first-pass agreement",
  },
  {
    story: "Mobile onboarding fixes",
    result: "3 points",
    room: "Bug Triage Estimation",
    note: "Narrow spread, no escalation needed",
  },
]

export default function DashboardPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-8">
      <div className="grid gap-4 md:grid-cols-3">
        {overviewStats.map((stat) => (
          <Card key={stat.label} className="border-border/70">
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

      <Tabs defaultValue="rooms" className="gap-4">
        <div className="overflow-x-auto pb-1">
          <TabsList className="min-w-max gap-1 rounded-2xl border bg-muted/30 p-1">
            <TabsTrigger value="rooms" className="rounded-xl px-4">
              Active rooms
            </TabsTrigger>
            <TabsTrigger value="attention" className="rounded-xl px-4">
              Needs attention
            </TabsTrigger>
            <TabsTrigger value="results" className="rounded-xl px-4">
              Recent results
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="rooms" className="mt-0">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Active rooms</CardTitle>
              <CardDescription>
                The rooms currently in progress and their latest state.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {activeRooms.map((room) => (
                <div
                  key={room.name}
                  className="rounded-3xl border bg-background px-4 py-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-medium">{room.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {room.team}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <MetaPill icon={Layers3}>{room.deck}</MetaPill>
                        <MetaPill icon={Users}>{room.participants}</MetaPill>
                        <MetaPill icon={Clock3}>{room.updated}</MetaPill>
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
        </TabsContent>

        <TabsContent value="attention" className="mt-0">
          <Card className="border-border/70 bg-linear-to-b from-card to-muted/20">
            <CardHeader>
              <CardTitle>Needs attention</CardTitle>
              <CardDescription>
                Only the rooms that need a decision or follow-up right now.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {priorityRooms.map((item) => (
                <div
                  key={item.name}
                  className="rounded-3xl border bg-background px-4 py-4"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <PriorityPill tone={item.tone}>{item.issue}</PriorityPill>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.detail}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      {item.action}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Recent results</CardTitle>
              <CardDescription>
                The latest estimates that are ready to feed sprint planning.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {recentResults.map((item) => (
                <div
                  key={item.story}
                  className="flex flex-col gap-3 rounded-2xl border bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{item.story}</p>
                    <p className="text-sm text-muted-foreground">{item.note}</p>
                    <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                      {item.room}
                    </p>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {item.result}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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

function PriorityPill({
  children,
  tone,
}: {
  children: ReactNode
  tone: "warning" | "ready"
}) {
  const toneClassName =
    tone === "warning"
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
      : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"

  const Icon = tone === "warning" ? AlertCircle : CheckCheck

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${toneClassName}`}
    >
      <Icon className="size-3.5" />
      {children}
    </div>
  )
}
