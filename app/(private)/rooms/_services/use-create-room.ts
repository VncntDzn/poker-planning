import { api } from "@/config/axios"
import { useMutation } from "@tanstack/react-query"
import { CreateRoomRequest } from "../_dtos/requests/create-room.request"
import { toast } from "sonner"

export const useCreateRoom = () => {
  return useMutation({
    mutationKey: ["create-room"],
    mutationFn: (roomRequest: CreateRoomRequest) => {
      return api.post("/rooms", roomRequest)
    },
    onSuccess: () => {
      toast("Room created!")
    },
    onError: () => {
      toast("Something went wrong.")
    },
  })
}
