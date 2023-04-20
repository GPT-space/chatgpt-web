import { ref } from 'vue'
export default function useWeChat() {
  const weChatModalShow = ref(false)

  const showWeChatModal = () => {
    weChatModalShow.value = true
  }
  const handleLogin = () => {
    // 设置用户store
  }
  return {
    weChatModalShow,
    showWeChatModal,
    handleLogin,
  }
}
