import { ChatModel, type IChatSchema } from 'src/schemas'

type TChatData = Required<Pick<IChatSchema, 'answer' | 'ip' | 'question'>>
/** 保存历史记录到数据库 */
export async function addChatHistory(chatData: TChatData) {
  const time = new Date()
  const chatModal = new ChatModel({ ...chatData, time })
  try {
    const resultSave = await chatModal.save()
    return resultSave
  }
  catch (err) {
    return null
  }
}

export interface IQuery {
  condition: TChatData
  pageNo: number
  pageSize: number
}
export interface IQueryRes {
  total: number
  list: IChatSchema[]
}

/** 查找历史记录 */
export async function queryChatHistory({ condition, pageNo, pageSize }: IQuery): Promise<IQueryRes> {
  const skip = (pageNo - 1) * pageSize
  try {
    const queryRes = await ChatModel.find(condition).sort({ time: -1 }).skip(skip).limit(pageSize).sort().exec()
    const total = await ChatModel.countDocuments()
    return { list: queryRes, total }
  }
  catch (error) {
    return { list: [], total: 0 }
  }
}
