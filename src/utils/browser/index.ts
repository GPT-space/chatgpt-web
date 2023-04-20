export function isWechat() {
  const ua = navigator.userAgent.toLowerCase()
  const isWechat = ua.includes('micromessenger')
  if (isWechat)
    return true
  else
    return false
}
