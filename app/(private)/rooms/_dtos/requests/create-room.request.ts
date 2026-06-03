import { DeckType, RoomVisibility, VoteMode } from "../../_types/preview-room"

export interface CreateRoomRequest {
  team: string
  numOfParticipants: string | number
  deck: DeckType | string
  roomVisibility: RoomVisibility | string
  voteMode: VoteMode | string
  roomName: string
}
