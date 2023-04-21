import { get } from '@/utils/request'

export function fetchWechatQRCode() {
  return get({
    url: '/wx/selectQrCode',
  })
}
