import mongoose from 'mongoose'
export interface IUserSchema {
  username: string
  email: string
  password: string
  createdAt: Date
}
const userSchema = new mongoose.Schema<IUserSchema>({
  username: String,
  email: String,
  password: { type: String, select: false },
  createdAt: Date,
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
