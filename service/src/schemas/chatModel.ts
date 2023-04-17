import mongoose from 'mongoose'

export interface IChatSchema {
  answer: string
  question: string
  ip: string
  time: Date
}

const chatSchema = new mongoose.Schema<IChatSchema>({
  answer: String,
  question: String,
  ip: String,
  time: Date,
})

const ChatModel = mongoose.model('Chat', chatSchema)

export default ChatModel
