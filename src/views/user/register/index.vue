<script lang="ts">
import { defineComponent, ref } from 'vue'
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
} from 'naive-ui'
import {
  NButton,
  NCol,
  NForm,
  NFormItem,
  NInput,
  NRow,
  useMessage,
} from 'naive-ui'
import { useRouter } from 'vue-router'
import { register } from '@/api'
import { useAuthStore } from '@/store'
import { SvgIcon } from '@/components/common'

interface ModelType {
  username: string | null
  password: string | null
  confirmPassword: string | null
}

export default defineComponent({
  components: {
    NForm,
    NCol,
    NRow,
    NButton,
    NFormItem,
    NInput,
    SvgIcon,
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      username: 'name',
      password: '123456',
      confirmPassword: '123456',
    })
    const rules: FormRules = {
      username: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value)
              return new Error('请填写用户名')

            return true
          },
          trigger: ['input', 'blur'],
        },
      ],
      password: [
        {
          required: true,
          // message: '请输入密码',
          validator(rule: FormItemRule, value: string) {
            if (!value)
              return new Error('请确认密码')
            if (value.length < 6)
              return new Error('密码长度必须大于6')
            if (!/^[a-zA-Z0-9_]+$/.test(value))
              return new Error('密码只能包含数字、字母、_')
            return true
          },
          trigger: ['blur'],
        },
      ],
      confirmPassword: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value)
              return new Error('请确认密码')
            if (value.length < 6)
              return new Error('密码长度必须大于6')
            if (modelRef.value.password !== value)
              return new Error('密码不一致')
            return true
          },
          trigger: ['input', 'blur'],
        },
      ],
    }

    const handleValidateButtonClick = (e: MouseEvent) => {
      e.preventDefault()
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          const { username, password } = modelRef.value

          try {
            const res = await register<any>(username || '', password || '')
            if (res.status === 'Success') {
              authStore.setToken(res.data.token)
              message.success('注册成功')
              router.push({
                name: 'Root',
              })
            }
            else {
              message.error(res.message || '发生错误')
            }
          }
          catch (err: any) {
            message.error((err as Error).message || '未知错误')
          }
        }
        else {
          // message.error('验证失败')
        }
      })
    }

    // 直接登录
    const handleLogin = () => {
      router.push({
        name: 'Signin',
      })
    }
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handleValidateButtonClick,
      handleLogin,
    }
  },
})
</script>

<template>
  <div class="h-full max-w-4  p-4 mx-auto" style="max-width: 360px;">
    <div class="text-[28px] dark:text-white flex items-center justify-center">
      <a href="https://qm.qq.com/cgi-bin/qm/qr?k=q9FWjX_u-KG1DeNr5bB9vCVedY0ztVXp&authKey=tOEHRBOeROt0bPM3gAMb3pkD3hQ8SI90ckq2YBF2Z5zYLFKIYQOp1V+cNSjPUNBB&noverify=0" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" width="1em" height="1em">
          <path d="M29.71,13.09A8.09,8.09,0,0,0,20.34,2.68a8.08,8.08,0,0,0-13.7,2.9A8.08,8.08,0,0,0,2.3,18.9,8,8,0,0,0,3,25.45a8.08,8.08,0,0,0,8.69,3.87,8,8,0,0,0,6,2.68,8.09,8.09,0,0,0,7.7-5.61,8,8,0,0,0,5.33-3.86A8.09,8.09,0,0,0,29.71,13.09Zm-12,16.82a6,6,0,0,1-3.84-1.39l.19-.11,6.37-3.68a1,1,0,0,0,.53-.91v-9l2.69,1.56a.08.08,0,0,1,.05.07v7.44A6,6,0,0,1,17.68,29.91ZM4.8,24.41a6,6,0,0,1-.71-4l.19.11,6.37,3.68a1,1,0,0,0,1,0l7.79-4.49V22.8a.09.09,0,0,1,0,.08L13,26.6A6,6,0,0,1,4.8,24.41ZM3.12,10.53A6,6,0,0,1,6.28,7.9v7.57a1,1,0,0,0,.51.9l7.75,4.47L11.85,22.4a.14.14,0,0,1-.09,0L5.32,18.68a6,6,0,0,1-2.2-8.18Zm22.13,5.14-7.78-4.52L20.16,9.6a.08.08,0,0,1,.09,0l6.44,3.72a6,6,0,0,1-.9,10.81V16.56A1.06,1.06,0,0,0,25.25,15.67Zm2.68-4-.19-.12-6.36-3.7a1,1,0,0,0-1.05,0l-7.78,4.49V9.2a.09.09,0,0,1,0-.09L19,5.4a6,6,0,0,1,8.91,6.21ZM11.08,17.15,8.38,15.6a.14.14,0,0,1-.05-.08V8.1a6,6,0,0,1,9.84-4.61L18,3.6,11.61,7.28a1,1,0,0,0-.53.91ZM12.54,14,16,12l3.47,2v4L16,20l-3.47-2Z" fill="currentColor" />
        </svg>
      </a>
      <span>ChatGPT</span>
    </div>
    <div class="text-[#808695] flex justify-center">
      永久免费，注册账号后免费使用
    </div>
    <a class="text-blue-500 text-[12px] flex justify-center" href="https://qm.qq.com/cgi-bin/qm/qr?k=q9FWjX_u-KG1DeNr5bB9vCVedY0ztVXp&authKey=tOEHRBOeROt0bPM3gAMb3pkD3hQ8SI90ckq2YBF2Z5zYLFKIYQOp1V+cNSjPUNBB&noverify=0" target="_blank">联系我们QQ群：808058669</a>
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem path="username" label="用户名">
        <NInput v-model:value="model.username" placeholder="用户名" @keydown.enter.prevent>
          <template #prefix>
            <!-- <i class="ri-account-circle-line"></i> -->
            <SvgIcon icon="ri:account-circle-line" class="text-xl text-[#4b9e5f]" />
          </template>
        </NInput>
      </NFormItem>
      <NFormItem path="password" label="密码">
        <NInput
          v-model:value="model.password"
          type="password"
          show-password-on="mousedown"
          placeholder="密码"
          @keydown.enter.prevent
        >
          <template #prefix>
            <SvgIcon icon="ri:lock-line" class="text-xl text-[#4b9e5f]" />
          </template>
        </NInput>
      </NFormItem>
      <NFormItem path="confirmPassword" label="确认密码">
        <NInput
          v-model:value="model.confirmPassword"
          type="password"
          show-password-on="mousedown"
          placeholder="确认密码"
          @keydown.enter.prevent
        >
          <template #prefix>
            <SvgIcon icon="ri:lock-line" class="text-xl text-[#4b9e5f]" />
          </template>
        </NInput>
      </NFormItem>
      <NRow :gutter="[0, 24]">
        <NCol :span="24">
          <div style="display: flex; justify-content: flex-end">
            <NButton
              style="width:100%;"
              :disabled="!(model.username && model.password)"
              round
              type="primary"
              @click="handleValidateButtonClick"
            >
              注册
            </NButton>
          </div>
        </NCol>
      </NRow>
    </NForm>
    <div class="flex mt-4">
      <div class="ml-auto ">
        <span>已有账号？</span>
        <a class="text-blue-500" href="javascript:" @click="handleLogin">直接登录</a>
      </div>
    </div>
  </div>
</template>
