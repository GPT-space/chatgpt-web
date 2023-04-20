import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post,get } from '@/utils/request'
import { useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchWechatQRCode(){
  return get({
    url:'/prod-api/wx/selectQrCode',
  })
}