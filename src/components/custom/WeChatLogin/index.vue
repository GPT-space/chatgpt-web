<script  lang="ts" setup >
import { ref, watch } from 'vue'
import { NCard, NModal ,NImage,NSpace} from 'naive-ui'
import { SvgIcon } from '@/components/common';
import { useBasicLayout } from '@/hooks/useBasicLayout';

const {isMobile}=useBasicLayout()

interface IEmit {
  (event: 'update:show', value: boolean): void
}

interface IProps {
  show: boolean
}
const props = defineProps<IProps>()
const emit = defineEmits<IEmit>()

const showModal = ref(props.show)

watch(() => props.show, (newValue) => {
  if (newValue !== showModal.value)
    showModal.value = newValue
})

watch( showModal, (newValue) => {
  emit('update:show', newValue)
})
</script>

<template>
  <div>
    <n-modal v-model:show="showModal" 
    >
    
    <n-card
      :style="{width:isMobile?'300px':'450px'}"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <NSpace vertical justify="center" align="center">
        <div class="flex flex-col items-center">
         <div class="flex items-center"> 
           <SvgIcon class="text-xl mr-1 text-[#3fab40]" icon="ri:wechat-fill" />
          <span class="text-base md:text-lg ">微信公众号【AI拓荒者】</span> 
        </div>
          <div class="text-sm md:text-base text-neutral-600"> 
            微信扫码关注后继续使用
          </div>
        </div>
      <NImage  preview-disabled src="https://static.runbook.run/assets/qrcode.jpg"></NImage>
      </NSpace>
    </n-card>
  </n-modal>
  </div>
</template>

<style>
</style>
