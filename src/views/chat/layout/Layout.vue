<script setup lang='ts'>
import { computed } from 'vue'
import { NLayout, NLayoutContent } from 'naive-ui'
import { useRouter } from 'vue-router'
import Sider from './sider/index.vue'
import Permission from './Permission.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore, useAuthStore, useChatStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()
const authStore = useAuthStore()

const checkRouter = async () => {
  const active = chatStore.active
  // 如果当前对话有历史记录则打开空对话
  if (active) {
    const chats = chatStore.getChatByUuid(chatStore.active || undefined)
    if (chats.length > 0) {
    // 如果最新的对话长度大于0则打开新对话
      const firstChat = chatStore.getFirstChat
      if (firstChat.data.length > 0) {
        chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
        return
      }
      else {
        router.replace({ name: 'Chat', params: { uuid: firstChat.uuid } })
        chatStore.updateHistory(active, { isEdit: false })
        await chatStore.setActive(firstChat.uuid)
        return
      }
    }
  }
  router.replace({ name: 'Chat', params: { uuid: chatStore.active } })
}

checkRouter()

const { isMobile } = useBasicLayout()

const collapsed = computed(() => appStore.siderCollapsed)

const needPermission = computed(() => !!authStore.session?.auth && !authStore.token)

const getMobileClass = computed(() => {
  if (isMobile.value)
    return ['rounded-none', 'shadow-none']
  return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800']
})

const getContainerClass = computed(() => {
  return [
    'h-full',
    { 'pl-[260px]': !isMobile.value && !collapsed.value },
  ]
})
</script>

<template>
  <div class="h-full dark:bg-[#24272e] transition-all" :class="[isMobile ? 'p-0' : 'p-4']">
    <div class="h-full overflow-hidden" :class="getMobileClass">
      <NLayout class="z-40 transition" :class="getContainerClass" has-sider>
        <Sider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
    <Permission :visible="needPermission" />
  </div>
</template>
