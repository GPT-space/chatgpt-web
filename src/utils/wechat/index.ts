export function makeQRCodeUrl(ticket:string){
  return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`
}