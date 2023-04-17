import express from 'express'
import { UserModel } from 'src/schemas'
import jwt from 'jsonwebtoken'

const userRouter = express.Router()

export interface IReqBody {
  username: string
  password: String
}
userRouter.post('/signup', async (req, res) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  const { username, password } = req.body as IReqBody
  try {
    const findOne = await UserModel.findOne({ username })
    if (findOne) {
      res.send({ code: 400, data: null, message: '该用户已存在' })
      return
    }
    const user = new UserModel({ username, password, createdAt: new Date() })
    const saveResult = await user.save()
    saveResult.password = undefined
    delete saveResult.password

    const payload = { user: saveResult }
    const token = jwt.sign(payload, JWT_SECRET_KEY)
    res.setHeader('Authorization', `Bearer ${token}`)
    res.send({ data: { user: saveResult, token }, message: '成功', status: 'Success' })
  }
  catch (err) {
    res.status(400).send({ code: 400, message: '错误', status: 'Fail' })
  }
})

userRouter.post('/signin', async (req, res) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  const { username, password } = req.body as IReqBody
  const userResult = await UserModel.findOne({ username, password })
  if (!userResult) {
    res.status(400).json({ code: 400, data: null, message: '帐号或密码错误' })
    return
  }

  const payload = { user: userResult }
  const token = jwt.sign(payload, JWT_SECRET_KEY)
  res.setHeader('Authorization', `Bearer ${token}`)
  res.json({ code: 200, message: '登录成功', data: { user: userResult, token }, status: 'Success' })
})

export default userRouter
