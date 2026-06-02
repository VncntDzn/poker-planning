import { api } from "@/config/axios"
import { useMutation } from "@tanstack/react-query"
import { CreateRoomRequest } from "../dtos/create-room.request"

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationKey: ["create-room"],
    mutationFn: (roomRequest: CreateRoomRequest) => {
      return api.post("/room", roomRequest)
    },
    onSuccess: () => {},
    onError: () => {},
  })
}
