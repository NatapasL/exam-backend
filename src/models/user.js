import mongoose, { Schema } from 'mongoose'

const MODEL_NAME = 'User'

const messageSchema = new Schema({
  name: String,
})

const Message = mongoose.model(MODEL_NAME, messageSchema)
export default Message
