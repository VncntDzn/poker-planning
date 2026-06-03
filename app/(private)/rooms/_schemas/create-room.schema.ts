import * as z from "zod"
import { DeckType, RoomVisibility, VoteMode } from "../_types/preview-room"

const participantCaps = [6, 8, 12] as const

export const createRoomSchema = z.object({
  roomName: z
    .string()
    .trim()
    .min(3, "Room name must be at least 3 characters.")
    .max(60, "Room name must be 60 characters or less."),
  team: z
    .string()
    .trim()
    .min(2, "Team name must be at least 2 characters.")
    .max(50, "Team name must be 50 characters or less."),
  deck: z.enum(DeckType, {
    message: "Please choose a valid deck.",
  }),
  roomVisibility: z.enum(RoomVisibility, {
    message: "Please choose a valid room visibility.",
  }),
  voteMode: z.enum(VoteMode, {
    message: "Please choose a valid vote mode.",
  }),
  numOfParticipants: z.coerce
    .number({
      error: "Please choose the participant cap.",
    })
    .int("Participants must be a whole number.")
    .refine(
      (value) =>
        participantCaps.includes(value as (typeof participantCaps)[number]),
      {
        message: "Participants must be 6, 8, or 12.",
      }
    ),
})
