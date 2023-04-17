import express from 'express'
import type { IQuery } from 'src/service/chatHistory.service'
import { queryChatHistory } from 'src/service/chatHistory.service'
import { makeSuccessRes } from 'src/utils'

const historyRouter = express.Router()

historyRouter.post('/page', async (req, res) => {
  try {
    const data = await queryChatHistory(req.body as IQuery)
    res.json(makeSuccessRes(data))
  }
  catch (err) {
    res.status(500).send({ message: '错误', status: 'Fail' })
  }
})

export default historyRouter
