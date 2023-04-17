import { ActorModel, type IActorSchema } from 'src/schemas'

type TActorData = Required<Pick<IActorSchema, 'key' | 'value' >>
/** 保存角色到数据库 */
export async function addActor(actorData: TActorData) {
  const createAt = new Date()
  const actorModal = new ActorModel({ ...actorData, createAt })
  try {
    const resultSave = await actorModal.save()
    return resultSave
  }
  catch (err) {
    return null
  }
}

export interface IQuery {
  condition: TActorData
  pageNo: number
  pageSize: number
}
export interface IQueryRes {
  total: number
  list: IActorSchema[]
}

/** 查找角色 */
export async function queryActors({ condition, pageNo, pageSize }: IQuery): Promise<IQueryRes> {
  const skip = (pageNo - 1) * pageSize
  try {
    const queryRes = await ActorModel.find(condition).sort({ time: -1 }).skip(skip).limit(pageSize).sort().exec()
    const total = await ActorModel.countDocuments()
    return { list: queryRes, total }
  }
  catch (error) {
    return { list: [], total: 0 }
  }
}
