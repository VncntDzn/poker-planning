"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useId } from "react"
import { Controller, useForm } from "react-hook-form"
import type * as z from "zod"

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
import { createRoomSchema } from "../_schemas/create-room.schema"
import { PreviewRoom } from "./preview-room"
import { DeckType, RoomVisibility, VoteMode } from "../_types/preview-room"
import { useCreateRoom } from "../_services/use-create-room"

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

type CreateRoomFormValues = z.input<typeof createRoomSchema>
type CreateRoomSubmitValues = z.output<typeof createRoomSchema>

const defaultValues: CreateRoomFormValues = {
  roomName: "Sprint 24 Planning",
  team: "Core Product Squad",
  deck: deckOptions[0].value,
  roomVisibility: roomVisibilityOptions[0].value,
  voteMode: modeOptions[0].value,
  numOfParticipants: participantOptions[0].value,
}

export function CreateRoomDialog() {
  const roomNameId = useId()
  const teamId = useId()
  const { mutate: createRoom, isPending } = useCreateRoom()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateRoomFormValues, undefined, CreateRoomSubmitValues>({
    resolver: zodResolver(createRoomSchema),
    defaultValues,
  })

  const previewValues = watch()

  const handleCreateRoom = (values: CreateRoomSubmitValues) => {
    createRoom(values)
  }

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

            <form onSubmit={handleSubmit(handleCreateRoom)}>
              <div className="grid gap-6 py-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor={roomNameId}>Room name</FieldLabel>
                    <Controller
                      name="roomName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={roomNameId}
                          value={field.value ?? ""}
                          placeholder="Sprint 24 planning"
                          className="h-10"
                          aria-invalid={!!errors.roomName}
                        />
                      )}
                    />
                    <FieldError errors={[errors.roomName]} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor={teamId}>Team</FieldLabel>
                    <Controller
                      name="team"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={teamId}
                          value={field.value ?? ""}
                          placeholder="Core Product Squad"
                          className="h-10"
                          aria-invalid={!!errors.team}
                        />
                      )}
                    />
                    <FieldError errors={[errors.team]} />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field>
                    <FieldLabel>Deck</FieldLabel>
                    <Controller
                      name="deck"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className="h-10 w-full"
                            aria-invalid={!!errors.deck}
                          >
                            <SelectValue placeholder="Choose a deck" />
                          </SelectTrigger>
                          <SelectContent>
                            {deckOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError errors={[errors.deck]} />
                  </Field>

                  <Field>
                    <FieldLabel>Visibility</FieldLabel>
                    <Controller
                      name="roomVisibility"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className="h-10 w-full"
                            aria-invalid={!!errors.roomVisibility}
                          >
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            {roomVisibilityOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError errors={[errors.roomVisibility]} />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field>
                    <FieldLabel>Voting mode</FieldLabel>
                    <Controller
                      name="voteMode"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className="h-10 w-full"
                            aria-invalid={!!errors.voteMode}
                          >
                            <SelectValue placeholder="Choose voting mode" />
                          </SelectTrigger>
                          <SelectContent>
                            {modeOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError errors={[errors.voteMode]} />
                  </Field>

                  <Field>
                    <FieldLabel>Participants</FieldLabel>
                    <Controller
                      name="numOfParticipants"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={String(field.value ?? "")}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className="h-10 w-full"
                            aria-invalid={!!errors.numOfParticipants}
                          >
                            <SelectValue placeholder="Choose participant cap" />
                          </SelectTrigger>
                          <SelectContent>
                            {participantOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError errors={[errors.numOfParticipants]} />
                  </Field>
                </div>
              </div>

              <DialogFooter className="border-t border-border/70 pt-5 sm:justify-between">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create room"}
                  <ArrowRight className="size-4" />
                </Button>
              </DialogFooter>
            </form>
          </section>

          <PreviewRoom
            team={previewValues.team ?? ""}
            roomName={previewValues.roomName ?? ""}
            selectedDeck={previewValues.deck ?? deckOptions[0].value}
            selectedVoteMode={previewValues.voteMode ?? modeOptions[0].value}
            numOfParticipants={String(
              previewValues.numOfParticipants ?? participantOptions[0].value
            )}
            roomVisibility={
              previewValues.roomVisibility ?? roomVisibilityOptions[0].value
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
