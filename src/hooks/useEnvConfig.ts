
export default function useEnvConfig(){
  return {
    /**提问多少次后需要登录 0代表无限制 */
    APP_TIMES_LOGIN:parseInt(import.meta.env.VITE_APP_TIMES_LOGIN)||0
  }
}