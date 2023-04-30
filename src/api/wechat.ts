import { get } from '@/utils/request'

export function fetchWechatQRCode() {
  return get({
    url: '/wx/selectQrCode',
  })
}

// wx/getUserStatus
export function fetchUserStatus(ticket:string){
  return get({
    url:'wx/getUserStatus',
    data:{
      ticket
    }
  })

}
