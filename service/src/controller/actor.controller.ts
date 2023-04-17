import express from 'express'
import type { IQuery } from 'src/service/actor.service'
import { queryActors } from 'src/service/actor.service'
import { makeFailRes, makeSuccessRes } from 'src/utils'

const actorRouter = express.Router()

actorRouter.post('/page', async (req, res) => {
  try {
    const data = await queryActors(req.body as IQuery)
    res.json(makeSuccessRes(data))
  }
  catch (err) {
    res.status(502).send(makeFailRes('服务端错误'))
  }
})

export default actorRouter
