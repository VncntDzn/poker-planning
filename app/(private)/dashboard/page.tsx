import type { ElementType, ReactNode } from "react"

import { ArrowRight, Check, Clock3, Layers3, Plus, Users } from "lucide-react"

import { Button } from "@/common/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/ui/card"

const overviewStats = [
  {
    label: "Active rooms",
    value: "3",
    note: "2 waiting for votes",
  },
  {
    label: "Stories estimated",
    value: "28",
    note: "This sprint",
  },
  {
    label: "Team participation",
    value: "92%",
    note: "Across recent sessions",
  },
  {
    label: "Avg. alignment",
    value: "1.4 pts",
    note: "Spread before discussion",
  },
]

const activeRooms = [
  {
    name: "Sprint 24 Planning",
    team: "Core Product Squad",
    status: "Waiting for 2 votes",
    deck: "Fibonacci",
    participants: "6 of 8 joined",
  },
  {
    name: "Backlog Refinement",
    team: "Growth Team",
    status: "Discussing story scope",
    deck: "T-shirt sizes",
    participants: "5 of 5 joined",
  },
  {
    name: "Bug Triage Estimation",
    team: "Platform",
    status: "Ready to reveal",
    deck: "1-10 linear",
    participants: "4 of 6 joined",
  },
]

const recentResults = [
  {
    story: "Checkout retry flow",
    result: "8 points",
    note: "Consensus reached after 1 revote",
  },
  {
    story: "Audit log filters",
    result: "5 points",
    note: "Clean first-pass agreement",
  },
  {
    story: "Mobile onboarding fixes",
    result: "3 points",
    note: "Narrow spread, no escalation needed",
  },
]

const nextSteps = [
  "Create a fresh room for the next sprint planning session",
  "Re-open an active room and continue collecting estimates",
  "Review recent results before committing sprint scope",
]

const teamPulse = [
  {
    label: "Most used deck",
    value: "Fibonacci",
  },
  {
    label: "Fastest session",
    value: "14 min",
  },
  {
    label: "Most debated item",
    value: "API rate limits",
  },
]

export default function DashboardPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-8">
      <div className="rounded-3xl border bg-card shadow-sm">
        <div className="flex flex-col gap-6 px-6 py-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Dashboard
            </p>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Your planning hub
              </h1>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Keep an eye on active poker planning rooms, recent estimation
                outcomes, and where the team may need a quick follow-up.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>
              Create room
              <Plus className="size-4" />
            </Button>
            <Button variant="outline">
              View recent sessions
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card key={stat.label} className="border-border/70">
            <CardHeader className="gap-1">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
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
              <CardTitle>Active rooms</CardTitle>
              <CardDescription>
                Rooms that are currently in progress or ready to continue.
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
                        <InlineMeta icon={Layers3} text={room.deck} />
                        <InlineMeta icon={Users} text={room.participants} />
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
              <CardTitle>Recent estimation results</CardTitle>
              <CardDescription>
                A quick look at the latest stories your team closed out.
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
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {item.result}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/70 bg-linear-to-b from-card to-muted/20">
            <CardHeader>
              <CardTitle>Next best actions</CardTitle>
              <CardDescription>
                Useful starting points for the scrum master or facilitator.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextSteps.map((step) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border bg-background px-4 py-3"
                >
                  <div className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {step}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-3">
              <Button className="w-full">
                Start new planning room
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" className="w-full">
                Review team cadence
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Team pulse</CardTitle>
              <CardDescription>
                Lightweight signals from recent poker planning activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamPulse.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-2xl border bg-background px-4 py-3"
                >
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Session rhythm</CardTitle>
              <CardDescription>
                A simple reminder of how strong planning sessions usually flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <RhythmRow
                icon={Clock3}
                title="Set the story context"
                description="Make sure the team shares the same understanding before voting begins."
              />
              <RhythmRow
                icon={Users}
                title="Collect estimates silently"
                description="Reduce anchoring by letting everyone vote before discussion."
              />
              <RhythmRow
                icon={Layers3}
                title="Discuss the spread"
                description="Focus on the highest and lowest estimates, then re-vote if needed."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function InlineMeta({ icon: Icon, text }: { icon: ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
      <Icon className="size-3.5" />
      {text}
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

function RhythmRow({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-background px-4 py-4">
      <div className="flex size-10 items-center justify-center rounded-2xl bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
