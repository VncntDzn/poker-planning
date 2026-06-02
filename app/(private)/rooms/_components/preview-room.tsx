"use client"

import { Clock3, DoorOpen, Layers3, Lock, Users } from "lucide-react"
import { type ElementType } from "react"
import { DeckType, RoomVisibility, VoteMode } from "../_types/preview-room"

interface Props {
  team: string
  roomName: string
  selectedDeck: DeckType | string
  roomVisibility: RoomVisibility | string
  selectedVoteMode: VoteMode | string
  numOfParticipants: string
}
export const PreviewRoom = ({
  team,
  roomName,
  selectedDeck,
  selectedVoteMode,
  roomVisibility,
  numOfParticipants,
}: Props) => {
  return (
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
            <PreviewRow icon={Lock} label="Visibility" value={roomVisibility} />
            <PreviewRow icon={Clock3} label="Mode" value={selectedVoteMode} />
            <PreviewRow
              icon={Users}
              label="Participants"
              value={numOfParticipants}
            />
          </div>
        </div>
      </div>
    </aside>
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
