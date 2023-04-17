import mongoose from 'mongoose'

export function initDatabase() {
  const DATABASE_NAME = process.env.DATABASE_NAME
  const DATABASE_HOST_NAME = process.env.DATABASE_HOST_NAME
  const DATABASE_USER_NAME = process.env.DATABASE_USER_NAME
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
  const DATABASE_PORT = process.env.DATABASE_PORT || 27017
  globalThis.console.log(`DATABASE_NAME: ${process.env.DATABASE_NAME}
  DATABASE_HOST_NAME: ${process.env.DATABASE_HOST_NAME}
  DATABASE_USER_NAME: ${process.env.DATABASE_USER_NAME}
  DATABASE_PASSWORD: ${process.env.DATABASE_PASSWORD?.replace(/./g, '*')}
  DATABASE_PORT: ${process.env.DATABASE_PORT || 27017}`)
  return mongoose.connect(`mongodb://${DATABASE_USER_NAME}:${DATABASE_PASSWORD}@${DATABASE_HOST_NAME}:${DATABASE_PORT}/${DATABASE_NAME}`)
    .then(() => globalThis.console.log('Connected to MongoDB'))
    .catch(error => console.error(error))
}
