import type { GenericAbortSignal } from 'axios'
import { get, post } from '@/utils/request'

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

export function fetchWechatQRCode() {
  return get({
    url: '/wx/selectQrCode',
  })
}
