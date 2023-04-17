import mongoose from 'mongoose'
export interface IActorSchema {
  key: string
  value: string
  createAt: Date
}
const actorSchema = new mongoose.Schema<IActorSchema>({
  key: String,
  value: String,
  createAt: Date,
})

const ActorSchema = mongoose.model('Actor', actorSchema)

export default ActorSchema
