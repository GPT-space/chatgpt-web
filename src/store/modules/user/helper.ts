import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://raw.githubusercontent.com/Chanzhaoyu/chatgpt-web/main/src/assets/avatar.jpg',
      name: 'chatGPT',
      description: 'QQ群交流 <a href="https://qm.qq.com/cgi-bin/qm/qr?k=q9FWjX_u-KG1DeNr5bB9vCVedY0ztVXp&authKey=tOEHRBOeROt0bPM3gAMb3pkD3hQ8SI90ckq2YBF2Z5zYLFKIYQOp1V+cNSjPUNBB&noverify=0" class="text-blue-500" target="_blank" >808058669</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
