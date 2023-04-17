import jwt from 'jsonwebtoken'
import { isNotEmptyString } from '../utils/is'

function parseJwtToUser(token: string) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    return decoded
  }
  catch (err) {
    return null
  }
}

const auth = async (req, res, next) => {
  const AUTH_SECRET_KEY: string = process.env.AUTH_SECRET_KEY
  const ACCOUNT_NEED_LOGIN: string = process.env.ACCOUNT_NEED_LOGIN
  const Authorization = req.header('Authorization')
  const token = Authorization?.split(' ')[1]
  // 预置token
  if (isNotEmptyString(AUTH_SECRET_KEY)) {
    try {
      if (!Authorization || Authorization.replace('Bearer ', '').trim() !== AUTH_SECRET_KEY.trim())
        throw new Error('Error: 无访问权限 | No access rights')
      next()
      return
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
      return
    }
  }
  // 不需要登录验证功能
  if (ACCOUNT_NEED_LOGIN !== 'true') {
    next()
    return
  }

  // 没有token则禁止访问
  if (!Authorization || !token) {
    res.status(401).json({ code: 401, data: null, message: '未登录' })
    return
  }

  // jwt获取用户信息
  const user = parseJwtToUser(token)
  if (!user) {
    res.status(401).json({ code: 401, data: null, message: 'token error' })
    return
  }
  req.context = {
    user,
  }

  next()
}

export { auth }
