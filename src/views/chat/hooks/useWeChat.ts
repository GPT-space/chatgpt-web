import { ref } from 'vue'
export default function useWeChat() {
  const weChatModalShow = ref(true)

  const showWeChatModal = () => {
    weChatModalShow.value = true
  }
  return {
    weChatModalShow,
    showWeChatModal,
  }
}
