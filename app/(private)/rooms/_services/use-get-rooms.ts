import { api } from "@/config/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetRooms = () => {
  return useQuery({ queryKey: [], queryFn: () => api.get("/rooms") })
}
