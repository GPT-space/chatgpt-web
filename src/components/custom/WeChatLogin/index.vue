<script  lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { NButton, NCard, NImage, NModal, NSpace, NSpin ,useMessage} from 'naive-ui'
import { SvgIcon } from '@/components/common'
import { useBasicLayout } from '@/hooks/useBasicLayout'

interface IEmit {
  (event: 'update:show', value: boolean): void
}

interface IProps {
  show: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits<IEmit>()

const { isMobile } = useBasicLayout()


const showModal = ref(props.show)
const hadScanned = ref(false) // 用户扫码成功
const qrCodeUrl=ref('')

const message=useMessage()

const subtitle = computed(() => {
  if (hadScanned.value)
    return '扫码成功，关注后继续免费使用'
  return '微信扫码关注后继续使用'
})



const handleSuccess=()=>{
  message.success('登录成功')
  hadScanned.value=false
  showModal.value=false
}
const handleClickCard=()=>{
  hadScanned.value=!hadScanned.value
  setTimeout(()=>{
    handleSuccess()
  },1000)
}

const handleReScan = () => {
  hadScanned.value = false
}

const getQrCodeUrl=()=>{
  // return 'https://static.runbook.run/assets/qrcode.jpg'
  setTimeout(() => {
    qrCodeUrl.value='https://static.runbook.run/assets/qrcode.jpg'
  }, 500);

}

getQrCodeUrl()

watch(() => props.show, (newValue) => {
  if (newValue !== showModal.value)
    showModal.value = newValue
})

watch(showModal, (newValue) => {
  emit('update:show', newValue)
})
</script>

<template>
  <div>
    <NModal v-model:show="showModal">
      <NCard
        :style="{ width: isMobile ? '300px' : '450px' }"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        @click="handleClickCard"
      >
        <NSpace vertical justify="center" align="center">
          <div class="flex flex-col items-center">
            <div class="flex items-center">
              <SvgIcon class="text-xl mr-1 text-[#3fab40]" icon="ri:wechat-fill" />
              <span class="text-base md:text-lg ">微信公众号【AI拓荒者】</span>
            </div>
          </div>
          <NSpin size="medium" :show="hadScanned">
            <NImage preview-disabled :src="qrCodeUrl" />
          </NSpin>
          <NButton v-show="hadScanned" type="primary" size="large" @click.stop="handleReScan">
            重新扫码
          </NButton>
          <div class="text-sm md:text-base text-neutral-600">
            {{ subtitle }}
          </div>
        </NSpace>
      </NCard>
    </NModal>
  </div>
</template>

<style>
</style>
