import type { IHistory } from '@/interface/history'
import { post } from '@/utils/request'

export interface IHistoryPayload {
  condition: Partial<IHistory>
  pageNo: number
  pageSize: number
}
export interface IHistoryRes {
  total: number
  list: IHistory[]
}
// 注册
export function fetchHistory(payload: IHistoryPayload) {
  return post<IHistoryRes>({
    url: '/chat/history/page',
    data: payload,
  })
}
