<script  lang="ts" setup>
import { NH2, NLayout, NLayoutContent, NLayoutHeader, NSpace } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'
const { isMobile } = useBasicLayout()
</script>

<template>
  <div class="h-full" :class="[isMobile ? 'p-0' : 'p-4']">
    <NLayout class="h-full">
      <NLayoutHeader bordered>
        <NSpace justify="center">
          <NH2>总览</NH2>
        </NSpace>
      </NLayoutHeader>
      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<style scoped lang='stylus'>
</style>
