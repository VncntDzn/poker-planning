export interface IPaginatedResponse<T> {
  data: T
  limit?: number
  page: number
}
