import express from 'express'
import type { RequestProps } from './types'
import type { ChatMessage } from './chatgpt'
import { chatConfig, chatReplyProcess, currentModel } from './chatgpt'
import { limiter } from './middleware/limiter'
import { isNotEmptyString } from './utils/is'
import { initDatabase } from './utils/init'
import userRouter from './controller/user.controller'
import { addChatHistory } from './service/chatHistory.service'
import { auth } from './middleware/auth'
import { actorRouter, historyRouter } from './controller'

const app = express()
const router = express.Router()
// router.use(auth)

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.post('/chat-process', [auth, limiter], async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')
  const { prompt, options = {}, systemMessage } = req.body as RequestProps
  let firstChunk = true
  let chatTemp: ChatMessage = null
  try {
    await chatReplyProcess({
      message: prompt,
      lastContext: options,
      process: (chat: ChatMessage) => {
        res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
        firstChunk = false
        // 保存起来传给数据库
        chatTemp = chat
      },
      systemMessage,
    })
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
    // 会话完成保存数据库
    if (prompt && chatTemp?.text) {
      addChatHistory({
        question: prompt,
        answer: chatTemp?.text,
        ip:
        req.headers['x-real-ip']
        || req.headers['x-forwarded-for']
        || req.headers['remote-host']
        || req.socket.remoteAddress
        || req.connection.remoteAddress,
      })
    }
  }
})

router.post('/config', async (req, res) => {
  try {
    const response = await chatConfig()
    res.send(response)
  }
  catch (error) {
    res.send(error)
  }
})

router.post('/session', async (req, res) => {
  try {
    const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
    const hasAuth = isNotEmptyString(AUTH_SECRET_KEY)
    res.send({ status: 'Success', message: '', data: { auth: hasAuth, model: currentModel() } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body as { token: string }
    if (!token)
      throw new Error('Secret key is empty')

    if (process.env.AUTH_SECRET_KEY !== token)
      throw new Error('密钥无效 | Secret key is invalid')

    res.send({ status: 'Success', message: 'Verify successfully', data: null })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

initDatabase()
app.use('', router)
app.use('/api/chat', router)
app.use('/api/chat/user', userRouter)
app.use('/api/chat/history', historyRouter)
app.use('/api/chat/actor', actorRouter)
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
