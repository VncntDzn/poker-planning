import { DeckType, RoomVisibility, VoteMode } from "../_types/preview-room"

export interface CreateRoomRequest {
  team: string
  numOfParticipants: string | number
  deck: DeckType
  roomVisibility: RoomVisibility
  voteMode: VoteMode
}
