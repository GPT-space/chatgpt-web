import type { ProxyOptions } from 'vite'

export function createViteProxy(isOpenProxy: boolean, viteEnv: ImportMetaEnv) {
  if (!isOpenProxy)
    return

  const proxy: Record<string, string | ProxyOptions> = {
    '/api': {
      target: viteEnv.VITE_APP_API_BASE_URL,
      changeOrigin: true,
      rewrite: path => path.replace('/api/', '/'),
    },
    '/prod-api': {
      target: 'http://ai.wyoto.cn:8095/',
      changeOrigin: true,
      rewrite: (path) => {
        return path.replace('/api/', '/')
      },
    },
  }

  return proxy
}
