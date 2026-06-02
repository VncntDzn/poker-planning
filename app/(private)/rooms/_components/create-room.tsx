"use client"

import { ArrowRight } from "lucide-react"
import { useId, useState } from "react"

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
import { Field, FieldLabel } from "@/common/ui/field"
import { Input } from "@/common/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/select"
import { PreviewRoom } from "./preview-room"
import { DeckType, RoomVisibility, VoteMode } from "../_types/preview-room"

const deckOptions = [
  { value: DeckType.FIBONNACI, label: "Fibonacci" },
  { value: DeckType.TSHIRT_SIZE, label: "T-shirt sizes" },
  { value: DeckType.LINEAR, label: "1-10 linear" },
]

const roomVisibilityOptions = [
  { value: RoomVisibility.PRIVATE, label: "Private invite only" },
  { value: RoomVisibility.PUBLIC, label: "Public link" },
]

const modeOptions = [
  { value: VoteMode.ASYNC, label: "Async voting" },
  { value: VoteMode.LIVE_REVEAL, label: "Live reveal" },
]

const participantOptions = [
  { value: "6", label: "Up to 6 estimators" },
  { value: "8", label: "Up to 8 estimators" },
  { value: "12", label: "Up to 12 estimators" },
]

export function CreateRoomDialog() {
  const roomNameId = useId()
  const teamId = useId()
  const [roomName, setRoomName] = useState<string>("Sprint 24 Planning")
  const [team, setTeam] = useState<string>("Core Product Squad")
  const [deck, setDeck] = useState<DeckType | string>(deckOptions[0].value)
  const [roomVisibility, setRoomVisibility] = useState<RoomVisibility | string>(
    roomVisibilityOptions[0].value
  )
  const [voteMode, setVoteMode] = useState<VoteMode | string>(
    modeOptions[0].value
  )
  const [participants, setParticipants] = useState<string>("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create room
          <ArrowRight className="size-4" />
        </Button>
      </DialogTrigger>
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
                <Field>
                  <FieldLabel>Room name</FieldLabel>
                  <Input
                    id={roomNameId}
                    value={roomName}
                    onChange={(event) => setRoomName(event.target.value)}
                    placeholder="Sprint 24 planning"
                    className="h-10"
                  />
                </Field>

                <Field>
                  <FieldLabel>Team</FieldLabel>
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
                <Field>
                  <FieldLabel>Deck</FieldLabel>
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

                <Field>
                  <FieldLabel>Visibility</FieldLabel>
                  <Select
                    value={roomVisibility}
                    onValueChange={setRoomVisibility}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomVisibilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field>
                  <FieldLabel>Voting mode</FieldLabel>
                  <Select value={voteMode} onValueChange={setVoteMode}>
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

                <Field>
                  <FieldLabel>Participants</FieldLabel>
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
              <Button>
                Create room
                <ArrowRight className="size-4" />
              </Button>
            </DialogFooter>
          </section>

          <PreviewRoom
            team={team}
            roomName={roomName}
            selectedDeck={deck}
            selectedVoteMode={voteMode}
            numOfParticipants={participants}
            roomVisibility={roomVisibility}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
